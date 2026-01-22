'use client';

import React, { useRef, useEffect, useState, CSSProperties } from 'react';

interface NoiseConfig {
    opacity: number;
    scale: number;
}

interface EtherealShadowVideoProps {
    sizing?: 'fill' | 'stretch';
    noise?: NoiseConfig;
    style?: CSSProperties;
    className?: string;
    children?: React.ReactNode;
    /** Base path for video files (without extension). Will auto-select fps variant based on refresh rate */
    videoSrc?: string;
    /** Fallback color if video fails to load */
    fallbackColor?: string;
    /** Available fps variants to choose from */
    availableFps?: number[];
}

/**
 * Detects the display's refresh rate using requestAnimationFrame timing
 */
function useRefreshRate(): number {
    const [refreshRate, setRefreshRate] = useState(60);

    useEffect(() => {
        let frameCount = 0;
        let startTime = 0;
        let rafId: number;

        const measureRefreshRate = (timestamp: number) => {
            if (frameCount === 0) {
                startTime = timestamp;
            }
            frameCount++;

            // Measure for 500ms to get accurate reading
            if (timestamp - startTime < 500) {
                rafId = requestAnimationFrame(measureRefreshRate);
            } else {
                const elapsed = (timestamp - startTime) / 1000;
                const measuredRate = Math.round(frameCount / elapsed);
                
                // Snap to common refresh rates
                const commonRates = [30, 60, 90, 120, 144, 165, 240];
                const snapped = commonRates.reduce((prev, curr) => 
                    Math.abs(curr - measuredRate) < Math.abs(prev - measuredRate) ? curr : prev
                );
                
                setRefreshRate(snapped);
            }
        };

        rafId = requestAnimationFrame(measureRefreshRate);
        return () => cancelAnimationFrame(rafId);
    }, []);

    return refreshRate;
}

/**
 * Selects the best video fps variant based on display refresh rate
 */
function selectVideoFps(refreshRate: number, availableFps: number[]): number {
    // Find the highest available fps that divides evenly into refresh rate
    // or is close to refresh rate for smooth playback
    const sorted = [...availableFps].sort((a, b) => b - a);
    
    for (const fps of sorted) {
        // Perfect divisor (e.g., 60fps on 120Hz, 30fps on 60Hz)
        if (refreshRate % fps === 0) return fps;
        // Within 20% of refresh rate
        if (fps <= refreshRate && fps >= refreshRate * 0.8) return fps;
    }
    
    // Return highest available that's <= refresh rate, or lowest if none match
    return sorted.find(fps => fps <= refreshRate) || sorted[sorted.length - 1];
}

/**
 * Performance-optimized version of EtherealShadow that uses a pre-rendered
 * looping video instead of expensive real-time SVG filter animations.
 * 
 * Benefits:
 * - GPU-accelerated video decoding vs CPU-intensive SVG filters
 * - Consistent performance across all devices
 * - Reduced battery drain on mobile devices
 * - Adaptive fps based on display refresh rate (30fps, 60fps, 120fps)
 */
export function EtherealShadowVideo({
    sizing = 'fill',
    noise,
    style,
    className,
    children,
    videoSrc = '/ethereal-shadow',
    fallbackColor = 'rgba(80, 80, 80, 1)',
    availableFps = [30, 60]
}: EtherealShadowVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const refreshRate = useRefreshRate();
    const [selectedFps, setSelectedFps] = useState(60);

    // Select best fps based on detected refresh rate
    useEffect(() => {
        const bestFps = selectVideoFps(refreshRate, availableFps);
        setSelectedFps(bestFps);
    }, [refreshRate, availableFps]);

    // Construct video path with fps suffix
    const videoPath = videoSrc.endsWith('.mp4') || videoSrc.endsWith('.webm')
        ? videoSrc
        : `${videoSrc}-${selectedFps}fps.mp4`;

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Ensure video plays and loops
        video.play().catch(() => {
            // Autoplay may be blocked, video will show first frame as fallback
            console.warn('Video autoplay blocked, showing static frame');
        });

        return () => {
            video.pause();
        };
    }, [videoPath]);

    return (
        <div
            className={className}
            style={{
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                height: '100%',
                // Isolate stacking context for consistent cross-browser compositing
                isolation: 'isolate',
                // Contain layout for performance and rendering consistency
                contain: 'layout paint',
                // Force GPU acceleration
                transform: 'translateZ(0)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
                ...style
            }}
        >
            {/* Video background layer */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                }}
            >
                <video
                    ref={videoRef}
                    key={videoPath} // Force remount when fps changes
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    // @ts-expect-error - colorspace is a valid attribute for video color management
                    colorspace="srgb"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        // Use translate3d for consistent GPU compositing across browsers
                        transform: 'translate3d(-50%, -50%, 0)',
                        minWidth: '100%',
                        minHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: sizing === 'stretch' ? 'fill' : 'cover',
                        // Force consistent rendering pipeline
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                        // Prevent color interpolation differences
                        imageRendering: 'auto',
                        // Force layer isolation for consistent compositing
                        isolation: 'isolate',
                    }}
                >
                    <source src={videoPath} type="video/mp4" />
                    <source src={videoPath.replace('.mp4', '.webm').replace(/-\d+fps/, '')} type="video/webm" />
                </video>
            </div>

            {/* Children slot for overlay content */}
            {children}

            {/* Noise overlay */}
            {noise && noise.opacity > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`,
                        backgroundSize: noise.scale * 200,
                        backgroundRepeat: 'repeat',
                        opacity: noise.opacity / 2,
                        pointerEvents: 'none',
                        // Force consistent overlay rendering
                        mixBlendMode: 'overlay',
                        transform: 'translateZ(0)',
                        willChange: 'opacity',
                    }}
                />
            )}
        </div>
    );
}
