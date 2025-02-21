'use client';
import React, { useRef, useEffect, useState } from 'react';
import {
  setupGLContext,
  setPremultipliedAlpha,
  drawVideo,
} from 'stacked-alpha-video/gl-helpers';
import type { AnimationV } from '@/types';

const VideoCanvas: React.FC<AnimationV> = ({
  url,
  top = 50,
  left = 50,
  ...rest
}) => {
  const videoCanvasRef = useRef<HTMLCanvasElement>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const videoCtxRef = useRef<WebGLRenderingContext | null>(null); // Referencia al contexto WebGL

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const videoCanvas = videoCanvasRef.current;
    const mainCanvas = mainCanvasRef.current;
    const video = videoRef.current;

    if (!videoCanvas || !mainCanvas || !video) return;

    let animationFrameId: number;
    let isSetup = false;

    const handleLoadedMetadata = () => {
      if (isSetup) return;
      isSetup = true;

      const fullHeight = video.videoHeight;
      const height = fullHeight / 2;

      // Set canvas dimensions
      videoCanvas.width = video.videoWidth;
      videoCanvas.height = height;
      mainCanvas.width = 1920;
      mainCanvas.height = 940;

      // Setup WebGL context
      const videoCtx = setupGLContext(videoCanvas);
      if (!videoCtx) return;
      videoCtxRef.current = videoCtx; // Guardar el contexto WebGL
      setPremultipliedAlpha(videoCtx, false);

      const mainCtx = mainCanvas.getContext('2d');
      if (!mainCtx) return;

      const draw = () => {
        if (video.paused || video.ended) {
          return;
        }

        // Render video to video canvas
        drawVideo(videoCtx, video);

        // Calculate position
        const offsetX = (mainCanvas.width * left) / 100 - video.videoWidth / 2;
        const offsetY = (mainCanvas.height * top) / 100 - video.videoWidth / 2;

        // Clear and draw to main canvas
        mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        mainCtx.drawImage(
          videoCanvas,
          0,
          0,
          video.videoWidth,
          video.videoHeight,
          offsetX,
          offsetY,
          video.videoWidth,
          video.videoHeight
        );

        animationFrameId = requestAnimationFrame(draw);
      };

      // Start playback and animation
      video.play().catch((error) => {
        console.error('Error playing video:', error);
      });

      draw();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Cleanup function
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (video) {
        video.pause();
      }
      // Liberar el contexto WebGL
      if (videoCtxRef.current) {
        const gl = videoCtxRef.current;
        const loseContextExt = gl.getExtension('WEBGL_lose_context');
        if (loseContextExt) {
          loseContextExt.loseContext(); // Liberar el contexto WebGL
        }
        videoCtxRef.current = null;
      }
    };
  }, [isMounted, url, top, left]);

  if (!isMounted) {
    return null; // Return null on server-side
  }

  return (
    <div
      className="w-full h-screen flex justify-center items-center overflow-hidden"
      {...rest}
    >
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        muted
        autoPlay
        loop
        playsInline
        crossOrigin=""
      >
        <source
          src={url.chrome}
          type="video/mp4; codecs=av01.0.08M.08.0.110.01.01.01.1"
        />
        <source src={url.safari} type="video/mp4; codecs=hvc1.1.6.H120.b0" />
      </video>
      <canvas
        ref={mainCanvasRef}
        className="w-full h-full object-cover pointer-events-none select-none"
      />
      <canvas
        ref={videoCanvasRef}
        style={{
          display: 'none',
        }}
      />
    </div>
  );
};

export default VideoCanvas;
