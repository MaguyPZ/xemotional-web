"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Brain, Layers, Search, ArrowRight, ArrowLeft } from "lucide-react";

interface ModuleData {
  id: string;
  module: string;
  title: string;
  desc: string;
  color: string;
  glowColor: string;
  icon: React.ReactNode;
  metrics: { label: string; val: string }[];
}

export default function Storytelling() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMovingBack, setIsMovingBack] = useState<number | null>(null);

  const wavePath1Ref = useRef<SVGPathElement>(null);
  const wavePath2Ref = useRef<SVGPathElement>(null);
  const wavePath3Ref = useRef<SVGPathElement>(null);
  const hzTextRef = useRef<SVGTextElement>(null);
  const metricTextRef = useRef<SVGTextElement>(null);
  const statusTextRef = useRef<SVGTextElement>(null);

  const timeRef = useRef(0);
  const activeIndexRef = useRef(0);

  const modules: ModuleData[] = [
    {
      id: "mod-1",
      module: "Módulo 01 · Estrés Autónomo",
      title: "Detección de Estrés Autónomo Vocal",
      desc: "Identifica micro-temblores musculares involuntarios en las cuerdas vocales (8-12 Hz) asociados a la activación de la amígdala cerebral ante el engaño o incomodidad severa.",
      color: "from-cyan-500 to-blue-600",
      glowColor: "rgba(6,182,212,0.3)",
      icon: <Brain className="w-6 h-6 text-cyan-400" />,
      metrics: [
        { label: "Rango de Detección", val: "8-12 Hz" },
        { label: "Muestreo Forense", val: "24-bit" },
        { label: "Latencia Analítica", val: "<0.4s" },
      ],
    },
    {
      id: "mod-2",
      module: "Módulo 02 · Micro-inestabilidad",
      title: "Parámetros de Micro-perturbación",
      desc: "Analiza las variaciones periódicas ciclo a ciclo en la amplitud (shimmer) y frecuencia (jitter) para detectar micro-anomalías fonadoras involuntarias del hablante.",
      color: "from-cyan-400 to-teal-500",
      glowColor: "rgba(34,211,238,0.3)",
      icon: <Activity className="w-6 h-6 text-cyan-300" />,
      metrics: [
        { label: "Jitter Basal", val: "0.2% - 1.5%" },
        { label: "Shimmer Abs", val: "0.08 - 0.4 dB" },
        { label: "Análisis F0", val: "Continuo" },
      ],
    },
    {
      id: "mod-3",
      module: "Módulo 03 · Resonancia",
      title: "Análisis de Resonancia Bioacústica",
      desc: "Mide el cociente de energía harmónica frente a ruido (HNR). Permite catalogar el agotamiento del tracto vocal y evaluar la calidad y veracidad del aire exhalado durante el habla.",
      color: "from-emerald-500 to-teal-600",
      glowColor: "rgba(16,185,129,0.3)",
      icon: <Layers className="w-6 h-6 text-emerald-400" />,
      metrics: [
        { label: "HNR Promedio", val: "22.8 dB" },
        { label: "Ruido Glótico", val: "Mínimo" },
        { label: "Armónicos", val: "F1 - F4" },
      ],
    },
    {
      id: "mod-4",
      module: "Módulo 04 · Diarización",
      title: "Separación Digital de Hablantes",
      desc: "Segmentación y catalogación automatizada de las firmas acústicas de múltiples interlocutores en un solo registro. Permite aislar voces en entornos ruidosos.",
      color: "from-violet-500 to-purple-600",
      glowColor: "rgba(139,92,246,0.3)",
      icon: <Search className="w-6 h-6 text-violet-400" />,
      metrics: [
        { label: "Filtro de SNR", val: "Hasta -12dB" },
        { label: "Diarización Múltiple", val: "4 Voces" },
        { label: "Aislamiento Vocal", val: "Activo" },
      ],
    },
  ];

  // Sync ref with state to prevent closure stale states in render loop
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // requestAnimationFrame render loop for the Voice Oscilloscope
  useEffect(() => {
    let animationId: number;

    const generateWavePath = (t: number, index: number, waveIdx: number) => {
      const width = 400;
      const height = 300;
      const centerY = height / 2;
      const points: string[] = [];

      for (let x = 0; x <= width; x += 4) {
        let y = centerY;

        if (index === 0) {
          // Módulo 01: Estrés Autónomo (Tensed, high-frequency muscle tremor simulation)
          const baseFreq = 0.025;
          const stressFreq = 0.16;
          const baseAmp = waveIdx === 0 ? 30 : waveIdx === 1 ? 16 : 8;
          const phase = t * (waveIdx === 0 ? 3.5 : waveIdx === 1 ? -2.5 : 1.8);
          
          y += Math.sin(x * baseFreq + phase) * baseAmp;
          // Stress Micro-tremor (8-12Hz)
          y += Math.sin(x * stressFreq + t * 8.5) * (waveIdx === 0 ? 6 : 2.5);
          // Noise factor
          y += Math.sin(x * 0.45 - t * 13) * (waveIdx === 0 ? 2 : 0.8);
        } else if (index === 1) {
          // Módulo 02: Micro-inestabilidad (Jitter / Shimmer modulation)
          const f0 = 0.035 + Math.sin(t * 0.4) * 0.005; 
          const jitterNoise = Math.sin(x * 0.8 + t * 15) * (waveIdx === 0 ? 3.5 : 1.5);
          const shimmerAmpMod = 1 + Math.sin(x * 0.02 + t * 2) * 0.4;
          const baseAmp = (waveIdx === 0 ? 35 : waveIdx === 1 ? 20 : 10) * shimmerAmpMod;
          
          y += Math.sin(x * f0 + t * (waveIdx === 0 ? 4 : -3)) * baseAmp + jitterNoise;
        } else if (index === 2) {
          // Módulo 03: Resonancia Harmónica (HNR Pure Sine Harmonics)
          const f1 = Math.sin(x * 0.03 + t * 3.2) * (waveIdx === 0 ? 32 : 18);
          const f2 = Math.sin(x * 0.06 + t * 4.8) * (waveIdx === 0 ? 12 : 7);
          const f3 = Math.sin(x * 0.09 + t * 6.4) * (waveIdx === 0 ? 6 : 3);
          
          y += f1 + f2 + f3;
        } else {
          // Módulo 04: Diarización (Multi-speaker voice separation)
          const speaker1 = Math.sin(x * 0.028 + t * 3) * (waveIdx === 0 ? 25 : 14);
          const speaker2 = Math.cos(x * 0.065 - t * 4.5) * (waveIdx === 0 ? 18 : 9);
          
          y += speaker1 + speaker2;
        }

        if (x === 0) {
          points.push(`M ${x} ${y}`);
        } else {
          points.push(`L ${x} ${y}`);
        }
      }

      return points.join(" ");
    };

    const updateTextReadouts = (t: number, index: number) => {
      if (!hzTextRef.current || !metricTextRef.current || !statusTextRef.current) return;

      if (index === 0) {
        const pitch = Math.floor(134 + Math.sin(t * 2) * 12);
        hzTextRef.current.textContent = `PITCH: ${pitch} Hz [TREMOR: 9.8 Hz]`;
        metricTextRef.current.textContent = `STRESS RATIO: ${(0.42 + Math.sin(t * 3) * 0.05).toFixed(3)}`;
        statusTextRef.current.textContent = `STATUS: ESCANEANDO MICRO-TEMBLOR`;
      } else if (index === 1) {
        const jitter = (0.78 + Math.sin(t * 1.5) * 0.12).toFixed(2);
        const shimmer = (0.24 + Math.cos(t * 1.2) * 0.04).toFixed(2);
        hzTextRef.current.textContent = `F0 VARIATION: ±1.4%`;
        metricTextRef.current.textContent = `JITTER: ${jitter}% · SHIMMER: ${shimmer} dB`;
        statusTextRef.current.textContent = `STATUS: EXTRACCIÓN DE PERTURBACIÓN`;
      } else if (index === 2) {
        const hnr = (23.4 + Math.sin(t * 2.5) * 1.2).toFixed(1);
        hzTextRef.current.textContent = `RESONANCIA: F1-F4 VALIDADO`;
        metricTextRef.current.textContent = `HNR COEF: ${hnr} dB [PUREZA ÓPTIMA]`;
        statusTextRef.current.textContent = `STATUS: MODELADO DE TRACTO VOCAL`;
      } else {
        const activeSpeakers = 2;
        hzTextRef.current.textContent = `DIARIZACIÓN: ${activeSpeakers} VOCES DETECTADAS`;
        metricTextRef.current.textContent = `CLUSTER ACCURACY: 98.4%`;
        statusTextRef.current.textContent = `STATUS: SEGMENTACIÓN AISLADA`;
      }
    };

    const renderLoop = () => {
      timeRef.current += 0.05;
      const t = timeRef.current;
      const index = activeIndexRef.current;

      const p1 = generateWavePath(t, index, 0);
      const p2 = generateWavePath(t, index, 1);
      const p3 = generateWavePath(t, index, 2);

      if (wavePath1Ref.current) wavePath1Ref.current.setAttribute("d", p1);
      if (wavePath2Ref.current) wavePath2Ref.current.setAttribute("d", p2);
      if (wavePath3Ref.current) wavePath3Ref.current.setAttribute("d", p3);

      updateTextReadouts(t, index);

      animationId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Stack calculation logic
  const getCardStyles = (cardIdx: number) => {
    const total = modules.length;
    let offset = cardIdx - activeIndex;
    if (offset < 0) offset += total;

    const isFront = offset === 0;

    const scale = 1 - offset * 0.045;
    const translateY = offset * 14; 
    const translateZ = -offset * 35;
    const opacity = 1 - offset * 0.25;
    const zIndex = total - offset;

    return {
      scale,
      y: translateY,
      z: translateZ,
      opacity,
      zIndex,
      isFront
    };
  };

  const handleNext = () => {
    setIsMovingBack(activeIndex);
    setActiveIndex((prev) => (prev + 1) % modules.length);
    setTimeout(() => setIsMovingBack(null), 600);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + modules.length) % modules.length);
  };

  // Cyber stroke colors for waveforms
  const getStrokeColors = (idx: number) => {
    switch (idx) {
      case 0:
        return { w1: "stroke-cyan-400", w2: "stroke-indigo-500/60", w3: "stroke-cyan-300/20" };
      case 1:
        return { w1: "stroke-cyan-300", w2: "stroke-teal-400/60", w3: "stroke-cyan-500/20" };
      case 2:
        return { w1: "stroke-emerald-400", w2: "stroke-emerald-500/60", w3: "stroke-emerald-300/20" };
      case 3:
      default:
        return { w1: "stroke-violet-400", w2: "stroke-indigo-400/60", w3: "stroke-violet-300/20" };
    }
  };

  const currentStrokes = getStrokeColors(activeIndex);

  return (
    <section id="ciencia" className="py-24 relative overflow-hidden bg-[#050813] border-b border-slate-800/80">
      
      {/* Dynamic background glow matching active module */}
      <div
        style={{
          boxShadow: `0 0 140px 50px ${modules[activeIndex].glowColor}`,
          transition: "box-shadow 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-transparent opacity-30 pointer-events-none blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase border-b border-cyan-500/40 pb-1 mb-4 inline-block font-mono">
            Ciencia & Bioacústica
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-5">
            Análisis Forense en Tiempo Real
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed font-normal">
            Explore los 4 pilares tecnológicos de nuestro analizador bioacústico. Interactúe con las tarjetas o use los controles para calibrar la telemetría en pantalla.
          </p>
        </div>

        {/* Main Columns Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          
          {/* Left Column: Voice Spectrogram / Oscilloscope Canvas */}
          <div className="w-full lg:w-1/2 flex items-center justify-center relative">
            {/* Oscilloscope Container Frame */}
            <div className="w-full max-w-[340px] md:max-w-[440px] aspect-[4/3] rounded-2xl bg-[#090E1F]/90 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] p-4 flex flex-col relative overflow-hidden backdrop-blur-xl">
              {/* Top Bar with scan dots */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-2 relative z-20">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                  </span>
                  <span className="text-[10px] font-extrabold tracking-widest text-cyan-300 uppercase font-mono">
                    SPECTROGRAM MONITOR V9
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/30" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                </div>
              </div>

              {/* Main Wave Plot Screen */}
              <div className="flex-1 bg-[#03060F] rounded-xl relative border border-cyan-500/20 overflow-hidden">
                {/* Digital Grid Background */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100%" height="100%" fill="url(#oscilloscope-grid)" />
                  <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(6, 182, 212, 0.15)" strokeDasharray="3,3" strokeWidth="1" />
                </svg>

                {/* Dynamic Oscilloscope Wave SVG */}
                <svg viewBox="0 0 400 300" className="w-full h-full relative z-10">
                  <path ref={wavePath3Ref} fill="none" className={`transition-all duration-800 ${currentStrokes.w3}`} strokeWidth="1.2" />
                  <path ref={wavePath2Ref} fill="none" className={`transition-all duration-800 ${currentStrokes.w2}`} strokeWidth="1.8" />
                  <path ref={wavePath1Ref} fill="none" className={`transition-all duration-800 ${currentStrokes.w1}`} strokeWidth="2.8" strokeLinecap="round" />

                  {/* Text overlays inside scope */}
                  <g className="font-mono font-bold text-[9px] fill-cyan-400 select-none">
                    <text ref={hzTextRef} x="12" y="22">PITCH: --- Hz</text>
                    <text ref={metricTextRef} x="12" y="38">METRIC: ---</text>
                    <text ref={statusTextRef} x="12" y="280">STATUS: INIT</text>
                  </g>
                </svg>

                {/* CRT Scan line reflection effect */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-40 animate-[pulse_3s_infinite]" />
              </div>
            </div>
          </div>

          {/* Right Column: 3D Stacked Card Deck Carousel */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
            
            {/* The Stack Container */}
            <div className="relative w-full max-w-[340px] md:max-w-[420px] h-[340px] md:h-[380px] flex items-center justify-center perspective-[1000px]">
              {modules.map((mod, idx) => {
                const styles = getCardStyles(idx);
                const isThisCardMovingBack = isMovingBack === idx;

                const animateProps = isThisCardMovingBack
                  ? {
                      x: [0, "85%", 0],
                      rotate: [0, 16, 0],
                      scale: [1, 0.95, styles.scale],
                      y: [0, 15, styles.y],
                      opacity: [1, 0.8, styles.opacity],
                      zIndex: [styles.zIndex + 5, styles.zIndex + 5, styles.zIndex]
                    }
                  : {
                      x: 0,
                      rotate: 0,
                      scale: styles.scale,
                      y: styles.y,
                      opacity: styles.opacity,
                      zIndex: styles.zIndex
                    };

                return (
                  <motion.div
                    key={mod.id}
                    style={{
                      transformOrigin: "center bottom",
                      pointerEvents: styles.isFront ? "auto" : "none"
                    }}
                    animate={animateProps}
                    transition={{
                      duration: isThisCardMovingBack ? 0.6 : 0.45,
                      ease: "easeInOut"
                    }}
                    onClick={() => styles.isFront && handleNext()}
                    className={`absolute inset-0 w-full h-full max-w-[340px] md:max-w-[420px] rounded-2xl border border-slate-800/90 bg-[#090E1F]/90 backdrop-blur-xl p-6 md:p-8 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.6)] cursor-pointer group hover:border-cyan-500/50 transition-colors duration-300 select-none`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest font-mono">
                          {mod.module}
                        </span>
                        <div className="w-10 h-10 rounded-lg bg-cyan-950/50 border border-cyan-800/50 flex items-center justify-center">
                          {mod.icon}
                        </div>
                      </div>

                      {/* Card Title & Desc */}
                      <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-3">
                        {mod.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
                        {mod.desc}
                      </p>
                    </div>

                    {/* Module Specific Metrics (Bottom) */}
                    <div>
                      <div className="grid grid-cols-3 gap-2 border-t border-slate-800/80 pt-4 mb-2">
                        {mod.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="flex flex-col">
                            <span className="text-[8px] md:text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
                              {metric.label}
                            </span>
                            <span className="text-xs font-mono font-bold text-cyan-300 mt-0.5">
                              {metric.val}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Hint for front card */}
                      {styles.isFront && (
                        <div className="text-[9px] font-extrabold text-cyan-400 flex items-center justify-end gap-1 uppercase tracking-widest mt-2 group-hover:translate-x-1 transition-transform duration-300">
                          <span>Siguiente Módulo</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation and Indicators Below Stack */}
            <div className="flex items-center justify-between w-full max-w-[340px] md:max-w-[420px] mt-6 px-1">
              {/* Back Arrow */}
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full border border-slate-800 hover:border-cyan-500/50 bg-slate-900/80 shadow-md flex items-center justify-center text-slate-400 hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer"
                aria-label="Previous module"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Progress Dots */}
              <div className="flex gap-2">
                {modules.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx ? "w-6 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "w-1.5 bg-slate-800 hover:bg-slate-700"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Next Arrow */}
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full border border-slate-800 hover:border-cyan-500/50 bg-slate-900/80 shadow-md flex items-center justify-center text-slate-400 hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer"
                aria-label="Next module"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Global CSS pattern definitions */}
      <svg className="hidden">
        <defs>
          <pattern id="oscilloscope-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="0.8"/>
          </pattern>
        </defs>
      </svg>
    </section>
  );
}
