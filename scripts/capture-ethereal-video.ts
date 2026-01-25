/**
 * Ethereal Shadow Video Generator (Puppeteer-based)
 * 
 * Captures the ACTUAL EtherealShadow SVG filter component rendering
 * to create a pixel-perfect SEAMLESS looping video.
 * 
 * Usage:
 *   npx tsx scripts/capture-ethereal-video.ts
 */

import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

const CONFIG = {
    width: 1920,
    height: 1080,
    // Original animation: mapRange(40, 1, 100, 1000, 50) / 25 ≈ 24.8 seconds
    duration: 24, // seconds - matches original SVG animation speed exactly
    fps: 60, // 60fps for smooth high-refresh-rate playback
    outputDir: path.join(process.cwd(), 'public'),
};

async function main() {
    console.log('🎬 Ethereal Shadow Seamless Loop Generator');
    console.log('==========================================\n');
    console.log('Creating SEAMLESS looping video...\n');

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--use-gl=egl',
        ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: CONFIG.width, height: CONFIG.height });

    // Recreate the EXACT original EtherealShadow component with its SVG filters
    const html = `
<!DOCTYPE html>
<html>
<head>
    <style>
        * { margin: 0; padding: 0; }
        body { 
            background: #000; 
            overflow: hidden;
            width: ${CONFIG.width}px;
            height: ${CONFIG.height}px;
        }
        .container {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
        }
        .shadow-layer {
            position: absolute;
            inset: -100px;
            filter: url(#ethereal-filter) blur(4px);
        }
        .color-layer {
            width: 100%;
            height: 100%;
            background-color: rgba(80, 80, 80, 1);
            mask-image: url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png');
            -webkit-mask-image: url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png');
            mask-size: cover;
            -webkit-mask-size: cover;
            mask-repeat: no-repeat;
            -webkit-mask-repeat: no-repeat;
            mask-position: center;
            -webkit-mask-position: center;
        }
        .noise-overlay {
            position: absolute;
            inset: 0;
            background-image: url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png");
            background-size: 200px;
            background-repeat: repeat;
            opacity: 0.3;
            pointer-events: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <svg style="position: absolute; width: 0; height: 0;">
            <defs>
                <filter id="ethereal-filter" x="-50%" y="-50%" width="200%" height="200%">
                    <feTurbulence
                        result="undulation"
                        numOctaves="2"
                        baseFrequency="0.0005,0.002"
                        seed="0"
                        type="turbulence"
                    />
                    <feColorMatrix
                        id="hueRotate"
                        in="undulation"
                        type="hueRotate"
                        values="0"
                    />
                    <feColorMatrix
                        in="dist"
                        result="circulation"
                        type="matrix"
                        values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="circulation"
                        scale="100"
                        result="dist"
                    />
                    <feDisplacementMap
                        in="dist"
                        in2="undulation"
                        scale="100"
                        result="output"
                    />
                </filter>
            </defs>
        </svg>
        
        <div class="shadow-layer">
            <div class="color-layer"></div>
        </div>
        
        <div class="noise-overlay"></div>
    </div>

    <script>
        const hueRotateEl = document.getElementById('hueRotate');
        
        window.setHue = function(hue) {
            hueRotateEl.setAttribute('values', String(hue % 360));
        };
        
        window.ready = new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = 'https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png';
        });
    </script>
</body>
</html>`;

    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.evaluate(() => (window as unknown as { ready: Promise<void> }).ready);
    await new Promise(r => setTimeout(r, 1000));

    // Create temp directory for frames
    const tempDir = path.join(process.cwd(), '.ethereal-frames');
    if (fs.existsSync(tempDir)) {
        const existingFiles = fs.readdirSync(tempDir);
        for (const file of existingFiles) {
            fs.unlinkSync(path.join(tempDir, file));
        }
    } else {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const totalFrames = CONFIG.fps * CONFIG.duration;
    console.log(`Capturing ${totalFrames} frames at ${CONFIG.fps}fps...\n`);

    // Capture frames with SEAMLESS loop
    // Linear progression through 360° (matching original ease: "linear")
    // Exclude the last frame since frame 0 = frame N (both are hue 0°)
    for (let frame = 0; frame < totalFrames; frame++) {
        // Linear progression like the original animation
        const hue = (frame / totalFrames) * 360;
        
        await page.evaluate((h: number) => {
            (window as unknown as { setHue: (h: number) => void }).setHue(h);
        }, hue);

        await new Promise(r => setTimeout(r, 16));

        const paddedFrame = String(frame).padStart(5, '0');
        const framePath = path.join(tempDir, `frame_${paddedFrame}.png`);
        
        await page.screenshot({ path: framePath, type: 'png' });

        const pct = Math.floor(((frame + 1) / totalFrames) * 100);
        process.stdout.write(`\rCapturing: ${frame + 1}/${totalFrames} (${pct}%)`);
    }

    console.log('\n✓ All frames captured\n');
    await browser.close();

    console.log('Encoding seamless looping videos...\n');
    
    const framePattern = path.join(tempDir, 'frame_%05d.png');

    // Generate 60fps version only
    const fpsVersions = [60];
    
    for (const targetFps of fpsVersions) {
        const mp4Path = path.join(CONFIG.outputDir, `ethereal-shadow-${targetFps}fps.mp4`);
        
        // Direct encode - linear 0-360° progression naturally loops seamlessly
        await new Promise<void>((resolve) => {
            const ffmpeg = spawn('ffmpeg', [
                '-y',
                '-framerate', String(CONFIG.fps),
                '-i', framePattern,
                '-c:v', 'libx264',
                '-pix_fmt', 'yuv420p',
                '-preset', 'slow',
                '-crf', '18',
                '-movflags', '+faststart',
                mp4Path
            ]);

            ffmpeg.on('close', (code) => {
                if (code === 0) {
                    console.log(`✓ ${targetFps}fps MP4 saved: ${mp4Path}`);
                }
                resolve();
            });
            ffmpeg.on('error', () => resolve());
        });
    }

    // Copy 60fps as default
    const defaultMp4 = path.join(CONFIG.outputDir, 'ethereal-shadow.mp4');
    fs.copyFileSync(path.join(CONFIG.outputDir, 'ethereal-shadow-60fps.mp4'), defaultMp4);
    console.log(`✓ Default MP4 copied to: ${defaultMp4}`);

    // Create WebM with seamless loop
    const webmPath = path.join(CONFIG.outputDir, 'ethereal-shadow.webm');
    await new Promise<void>((resolve) => {
        const ffmpeg = spawn('ffmpeg', [
            '-y',
            '-framerate', String(CONFIG.fps),
            '-i', framePattern,
            '-c:v', 'libvpx-vp9',
            '-pix_fmt', 'yuv420p',
            '-crf', '24',
            '-b:v', '0',
            '-deadline', 'good',
            webmPath
        ]);

        ffmpeg.on('close', (code) => {
            if (code === 0) console.log(`✓ WebM saved: ${webmPath}`);
            resolve();
        });
        ffmpeg.on('error', () => resolve());
    });

    // Cleanup
    console.log('\nCleaning up...');
    const files = fs.readdirSync(tempDir);
    for (const file of files) {
        fs.unlinkSync(path.join(tempDir, file));
    }
    fs.rmdirSync(tempDir);

    // Show file sizes
    console.log('\n📊 Generated seamless loop videos:');
    const outputFiles = fs.readdirSync(CONFIG.outputDir)
        .filter(f => f.startsWith('ethereal-shadow'))
        .map(f => {
            const stats = fs.statSync(path.join(CONFIG.outputDir, f));
            return { name: f, size: (stats.size / 1024 / 1024).toFixed(2) + ' MB' };
        });
    
    for (const file of outputFiles) {
        console.log(`  ${file.name}: ${file.size}`);
    }

    console.log('\n✅ Seamless loop video generation complete!');
}

main().catch(console.error);
