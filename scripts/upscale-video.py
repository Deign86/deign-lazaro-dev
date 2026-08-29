import os
import subprocess
import shutil
import time

def main():
    root = os.path.abspath(os.getcwd())
    input_video = os.path.join(root, 'public', 'liquid-metal.mp4')
    tools_dir = os.path.join(root, 'tools', 'realesrgan')
    exe_path = os.path.join(tools_dir, 'realesrgan-ncnn-vulkan.exe')

    temp_dir = os.path.join(root, 'temp_upscale')
    frames_in = os.path.join(temp_dir, 'in')
    frames_out = os.path.join(temp_dir, 'out')

    os.makedirs(frames_in, exist_ok=True)
    os.makedirs(frames_out, exist_ok=True)

    # Check if frames already exist
    existing_out_frames = [f for f in os.listdir(frames_out) if f.endswith('.png')] if os.path.exists(frames_out) else []

    if len(existing_out_frames) < 240:
        print('=== STEP 1: Extracting frames from source video ===')
        t0 = time.time()
        subprocess.run([
            'ffmpeg', '-y',
            '-i', input_video,
            '-qscale:v', '1',
            os.path.join(frames_in, 'frame_%05d.png')
        ], check=True)
        frame_count = len(os.listdir(frames_in))
        print(f'Extracted {frame_count} frames in {time.time() - t0:.2f}s')

        print('\n=== STEP 2: Running Real-ESRGAN AI 4x Super-Resolution on GPU ===')
        t1 = time.time()
        cmd = [
            exe_path,
            '-i', frames_in,
            '-o', frames_out,
            '-n', 'realesr-animevideov3',
            '-g', '1',
            '-s', '4',
            '-j', '2:4:4',
            '-f', 'png'
        ]
        subprocess.run(cmd, cwd=tools_dir, check=True)
        print(f'AI 4x Upscaling completed in {time.time() - t1:.2f}s')
    else:
        print(f'=== Found {len(existing_out_frames)} upscaled 5K AI frames in cache, proceeding to hardware GPU encoding! ===')

    # Output 4K Video (3840x2160) - High compatibility H.264
    print('\n=== STEP 3: Encoding 4K Ultra HD (3840x2160) Video with GPU NVENC ===')
    output_4k = os.path.join(root, 'public', 'liquid-metal-4k.mp4')
    output_target = os.path.join(root, 'public', 'liquid-metal.mp4')

    subprocess.run([
        'ffmpeg', '-y',
        '-framerate', '24',
        '-i', os.path.join(frames_out, 'frame_%05d.png'),
        '-vf', 'scale=3840:2160:flags=lanczos',
        '-c:v', 'h264_nvenc',
        '-preset', 'p7',
        '-tune', 'hq',
        '-cq', '18',
        '-pix_fmt', 'yuv420p',
        '-an',
        '-movflags', '+faststart',
        output_4k
    ], check=True)
    print(f'Created 4K video: {output_4k}')

    # Output 8K Video (7680x4320) Master with NVENC
    print('\n=== STEP 4: Encoding 8K Ultra HD (7680x4320) Master with GPU NVENC ===')
    output_8k = os.path.join(root, 'public', 'liquid-metal-8k.mp4')
    subprocess.run([
        'ffmpeg', '-y',
        '-framerate', '24',
        '-i', os.path.join(frames_out, 'frame_%05d.png'),
        '-vf', 'scale=7680:4320:flags=lanczos',
        '-c:v', 'hevc_nvenc',
        '-preset', 'p7',
        '-tune', 'hq',
        '-cq', '18',
        '-pix_fmt', 'yuv420p',
        '-an',
        '-movflags', '+faststart',
        output_8k
    ], check=True)
    print(f'Created 8K video: {output_8k}')

    # Output 8K H.264 version as well
    output_8k_h264 = os.path.join(root, 'public', 'liquid-metal-8k-h264.mp4')
    subprocess.run([
        'ffmpeg', '-y',
        '-framerate', '24',
        '-i', os.path.join(frames_out, 'frame_%05d.png'),
        '-vf', 'scale=7680:4320:flags=lanczos',
        '-c:v', 'h264_nvenc',
        '-preset', 'p7',
        '-tune', 'hq',
        '-cq', '19',
        '-pix_fmt', 'yuv420p',
        '-an',
        '-movflags', '+faststart',
        output_8k_h264
    ], check=True)
    print(f'Created 8K H.264 video: {output_8k_h264}')

    # Copy the 4K version to the main liquid-metal.mp4 for the website (best balance of 4K fidelity and ultra-smooth web decoding)
    shutil.copy2(output_4k, output_target)
    print(f'Updated main public/liquid-metal.mp4 with 4K resolution!')

    # Cleanup temporary frame files
    print('\n=== STEP 5: Cleaning up temporary frame artifacts ===')
    shutil.rmtree(temp_dir, ignore_errors=True)
    temp_test = os.path.join(root, 'temp_test')
    if os.path.exists(temp_test):
        shutil.rmtree(temp_test, ignore_errors=True)

    print('\n All 4K and 8K AI upscaling finished successfully!')

if __name__ == '__main__':
    main()
