"use client";

import React, { useRef, useEffect } from "react";

export default function Oscilloscope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 160;
    let time = 0;
    let animationId: number;

    // Generate random static noise for realistic micro-jitter
    const NOISE = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) {
      NOISE[i] = (Math.random() - 0.5) * 4.0;
    }

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        W = canvas.width = parent.clientWidth;
        H = canvas.height = 160;
      }
    };

    window.addEventListener("resize", resize);
    resize();

    const drawGrid = () => {
      const cols = 10;
      const rows = 5;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(129, 138, 248, 0.15)"; // Indigo-400 transparent
      ctx.lineWidth = 0.5;

      for (let i = 0; i <= cols; i++) {
        const x = (i / cols) * W;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
      }
      for (let j = 0; j <= rows; j++) {
        const y = (j / rows) * H;
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      ctx.stroke();

      // Draw middle horizontal line
      ctx.beginPath();
      ctx.strokeStyle = "rgba(99, 102, 241, 0.3)";
      ctx.lineWidth = 1;
      ctx.moveTo(0, H / 2);
      ctx.lineTo(W, H / 2);
      ctx.stroke();
    };

    const drawWave = () => {
      const cy = H / 2;
      const amp = 42; // Wave amplitude

      // Clean background
      ctx.fillStyle = "rgba(10, 15, 30, 0.3)";
      ctx.fillRect(0, 0, W, H);

      drawGrid();

      // Render secondary shadow/background trace
      ctx.beginPath();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.25)"; // Cyan-500 transparent
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += 3) {
        const t = (x / W) * Math.PI * 6.5;
        const y =
          cy +
          Math.sin(t * 1.2 + time * 0.02) * (amp * 0.3) +
          Math.sin(t * 2.8 + time * 0.012) * (amp * 0.12);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Render primary voice/biological trace
      ctx.beginPath();
      ctx.strokeStyle = "#6366F1"; // Vibrant Indigo-500
      ctx.lineWidth = 1.8;
      for (let x = 0; x <= W; x++) {
        const t = (x / W) * Math.PI * 5.5;
        const noiseIndex = Math.floor(x + time * 0.7) & 1023;
        const voice =
          Math.sin(t + time * 0.02) * amp +
          Math.sin(t * 2.2 + time * 0.015) * (amp * 0.26) +
          Math.sin(t * 4.4 + time * 0.008) * (amp * 0.1) +
          NOISE[noiseIndex];
        const y = cy + voice;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const loop = () => {
      time++;
      drawWave();
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-[160px] bg-slate-950/50"
    />
  );
}
