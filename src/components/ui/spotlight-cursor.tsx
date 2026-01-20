'use client';
import { useRef, useEffect, useState, HTMLAttributes } from 'react';

interface SpotlightConfig {
  radius?: number;
  brightness?: number;
  color?: string;
  smoothing?: number;
}

const useSpotlightEffect = (config: SpotlightConfig) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect GPU tier for adaptive quality
    const detectGPUTier = (): 'high' | 'low' => {
      // Check for battery saver mode or reduced motion preference
      if (typeof navigator !== 'undefined') {
        const connection = (navigator as any).connection;
        if (connection?.saveData) return 'low';
      }
      
      // Detect based on hardware concurrency (rough heuristic)
      const cores = navigator.hardwareConcurrency || 4;
      const memory = (performance as any).memory?.jsHeapSizeLimit || 0;
      
      // Low-end: <= 4 cores or low memory
      if (cores <= 4 || memory < 1000000000) return 'low';
      return 'high';
    };

    const gpuTier = detectGPUTier();
    const isLowEnd = gpuTier === 'low';

    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true,
      willReadFrequently: false,
    });
    if (!ctx) return;

    let mouseX = -1000;
    let mouseY = -1000;
    let lastDrawnX = -1000;
    let lastDrawnY = -1000;
    let rafId: number | null = null;
    let lastFrameTime = 0;
    
    // Adaptive frame rate: 60fps for high-end, 30fps for low-end
    const targetFrameTime = isLowEnd ? 1000 / 30 : 1000 / 60;
    const moveThreshold = isLowEnd ? 5 : 2; // Larger threshold for low-end

    // Pre-calculate values for better performance
    const hexToRgb = (hex: string) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r},${g},${b}`;
    };
    const rgbColor = hexToRgb(config.color || '#ffffff');
    const radius = config.radius || 200;
    const brightness = config.brightness || 0.15;

    const resizeCanvas = () => {
      // Adaptive DPR: 1x for low-end (iGPU), up to 2x for high-end (dGPU)
      const dpr = isLowEnd ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      // Force redraw on resize
      lastDrawnX = -2000;
      lastDrawnY = -2000;
    };

    const draw = (currentTime: number) => {
      // Throttle to 60fps even on high refresh rate displays
      const deltaTime = currentTime - lastFrameTime;
      
      if (deltaTime < targetFrameTime) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      // Only redraw if mouse actually moved
      const dx = mouseX - lastDrawnX;
      const dy = mouseY - lastDrawnY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < moveThreshold && mouseX !== -1000) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      lastFrameTime = currentTime;
      lastDrawnX = mouseX;
      lastDrawnY = mouseY;

      // Clear only the area we need (full canvas for simplicity, could optimize further)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouseX !== -1000 && mouseY !== -1000) {
        // Use simpler gradient for low-end GPUs
        if (isLowEnd) {
          // Simpler single-pass fill
          const gradient = ctx.createRadialGradient(
            mouseX, mouseY, 0,
            mouseX, mouseY, radius
          );
          gradient.addColorStop(0, `rgba(${rgbColor}, ${brightness})`);
          gradient.addColorStop(0.5, `rgba(${rgbColor}, ${brightness * 0.5})`);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
          // Higher quality gradient for high-end GPUs
          const gradient = ctx.createRadialGradient(
            mouseX, mouseY, 0,
            mouseX, mouseY, radius
          );
          
          gradient.addColorStop(0, `rgba(${rgbColor}, ${brightness})`);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    let isDrawing = false;
    const startDrawLoop = () => {
      if (!isDrawing) {
        isDrawing = true;
        rafId = requestAnimationFrame(draw);
      }
    };

    const stopDrawLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      isDrawing = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      startDrawLoop();
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      lastDrawnX = -1000;
      lastDrawnY = -1000;
      
      // Draw one final frame to clear, then stop
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stopDrawLoop();
    };

    resizeCanvas();
    
    // Passive listeners for scroll performance
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      stopDrawLoop();
    };
  }, [config.radius, config.brightness, config.color]);

  return canvasRef;
};

interface SpotlightCursorProps extends HTMLAttributes<HTMLCanvasElement> {
  config?: SpotlightConfig;
}

export const SpotlightCursor = ({
  config = {},
  className = '',
  ...rest
}: SpotlightCursorProps) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };
    setIsTouchDevice(checkTouchDevice());
  }, []);

  const spotlightConfig = {
    radius: 250,
    brightness: 0.06,
    color: '#ffffff',
    smoothing: 0.1,
    ...config,
  };

  const canvasRef = useSpotlightEffect(spotlightConfig);

  // Don't render on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ willChange: 'transform' }}
      className={`fixed top-0 left-0 pointer-events-none z-0 w-full h-full ${className}`}
      {...rest}
    />
  );
};
