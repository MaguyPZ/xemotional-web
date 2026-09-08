"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, MessageCircle, Info } from "lucide-react";

export default function InteractiveReport() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const report = reportRef.current;
    if (!report) return;

    const rect = report.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setRotateX(-(y / (rect.height / 2)) * 4);
    setRotateY((x / (rect.width / 2)) * 4);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const bulletPoints = [
    "Veredicto de credibilidad con índice de confianza porcentual",
    "Tabla de 42 métricas bioacústicas detalladas y clasificadas",
    "Espectrograma de frecuencias e historial de F0 del hablante",
    "Análisis cuantitativo de estrés cognitivo y micro-temblor vocal",
    "Identificación y diarización de hablantes múltiples (si aplica)",
    "Número de referencia único para seguimiento confidencial del caso",
  ];

  const metricDetails: { [key: string]: { name: string; desc: string; detail: string } } = {
    credibility: {
      name: "Credibilidad Bioacústica (87%)",
      desc: "Probabilidad estadística de correspondencia cognitiva en el relato verbal.",
      detail: "Indica un grado de veracidad alto. El modelo compara los patrones de micro-temblor contra respuestas basales calibradas para calcular este valor porcentual.",
    },
    stress: {
      name: "Estrés Vocal Autónomo (Bajo)",
      desc: "Presencia de micro-temblores (micro-tremors) en frecuencias de 8-12 Hz.",
      detail: "Relacionado con la activación involuntaria del sistema nervioso autónomo. Niveles basales descartan estrés agudo durante la enunciación.",
    },
    jitter: {
      name: "Jitter F0 (0.8%)",
      desc: "Variabilidad periódica ciclo a ciclo en la frecuencia fundamental de la voz.",
      detail: "Valores menores al 1.04% corresponden a cuerdas vocales estables y sin tensiones fisiológicas involuntarias que indiquen engaño forzado.",
    },
    hnr: {
      name: "HNR Ratio (22.3 dB)",
      desc: "Relación Harmónico a Ruido (Harmonics-to-Noise Ratio).",
      detail: "Mide la pureza y resonancia de la señal glótica. Una proporción alta garantiza la integridad espectral necesaria para certificar las demás mediciones.",
    },
  };

  return (
    <section id="reporte" className="py-24 relative bg-[#050813] border-b border-slate-800/80 overflow-hidden">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Side: Content & Bullets */}
        <motion.div
          className="lg:col-span-6 flex flex-col items-start"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase border-b border-cyan-500/40 pb-1 mb-4 inline-block font-mono">
            Evidencia Pericial
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-5 leading-tight">
            Un reporte forense de estándares científicos
          </h2>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base font-normal mb-6">
            Cada análisis genera un informe técnico PDF estructurado con la metodología aplicada, los parámetros medidos y un veredicto fundamentado en evidencia bioacústica objetiva y replicable.
          </p>

          <ul className="flex flex-col gap-3.5 mb-8 w-full">
            {bulletPoints.map((bullet, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-3 text-xs font-medium text-slate-300"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + idx * 0.08, duration: 0.4 }}
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mt-0.5 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                  <ShieldCheck className="w-3 h-3" />
                </div>
                <span className="leading-normal">{bullet}</span>
              </motion.li>
            ))}
          </ul>

          <a
            href="https://wa.me/50663823708?text=Hola%2C%20quiero%20solicitar%20un%20análisis%20forense"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 text-white flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all duration-300 group"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Solicitar Análisis Ahora</span>
          </a>
        </motion.div>

        {/* Right Side: Interactive Report Mockup */}
        <motion.div
          className="lg:col-span-6 flex flex-col items-center"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {/* Glass Report Body */}
          <div
            ref={reportRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: "transform 0.15s ease-out",
            }}
            className="w-full max-w-md rounded-2xl border border-cyan-500/30 bg-[#090E1F]/90 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden relative backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-[#03060F] px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400">
                XEMOTIONAL · REPORTE FORENSE
              </span>
              <span className="text-[9px] font-mono text-slate-400 font-semibold">
                REF: XEM-2026-04782
              </span>
            </div>

            {/* Classification */}
            <div className="bg-slate-900/60 border-b border-slate-800/80 px-6 py-2.5 flex items-center gap-2">
              <span className="text-[9px] font-mono font-extrabold text-emerald-400 border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 rounded uppercase">
                CONFIDENCIAL
              </span>
              <span className="text-[9px] font-mono text-slate-400">
                Análisis Bioacústico · Motor Forense IA V9
              </span>
            </div>

            {/* Fields */}
            <div className="px-6 py-4 flex flex-col gap-2.5 text-xs border-b border-slate-800/80 font-mono">
              <div className="flex justify-between border-b border-slate-800/40 pb-2">
                <span className="text-slate-400">Fecha de Emisión:</span>
                <span className="text-slate-200 font-bold">04/07/2026 · 22:46 UTC</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/40 pb-2">
                <span className="text-slate-400">Duración del Audio:</span>
                <span className="text-slate-200 font-bold">0:47 seg · formato OGG</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/40 pb-2">
                <span className="text-slate-400">Hablantes Detectados:</span>
                <span className="text-slate-200 font-bold">1 hablante identificado</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-400">Calidad de Señal:</span>
                <span className="text-cyan-400 font-bold">Alta — SNR: 28.4 dB</span>
              </div>
            </div>

            {/* Interactive Metrics Grid */}
            <div className="p-6 grid grid-cols-2 gap-4">
              {/* Credibility */}
              <div
                onMouseEnter={() => setActiveMetric("credibility")}
                className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  activeMetric === "credibility"
                    ? "border-emerald-400/60 bg-emerald-950/40 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                    : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-400 uppercase mb-2 font-mono">
                  <span>Credibilidad</span>
                  <Info className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-2xl font-black font-mono text-emerald-400">87%</span>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "87%" } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>

              {/* Stress */}
              <div
                onMouseEnter={() => setActiveMetric("stress")}
                className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  activeMetric === "stress"
                    ? "border-cyan-400/60 bg-cyan-950/40 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                    : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-400 uppercase mb-2 font-mono">
                  <span>Estrés Vocal</span>
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="text-2xl font-black font-mono text-cyan-400">Bajo</span>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "22%" } : {}}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </div>
              </div>

              {/* Jitter */}
              <div
                onMouseEnter={() => setActiveMetric("jitter")}
                className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  activeMetric === "jitter"
                    ? "border-cyan-400/60 bg-cyan-950/40 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                    : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-400 uppercase mb-2 font-mono">
                  <span>Jitter F0</span>
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="text-2xl font-black font-mono text-slate-200">0.8%</span>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "8%" } : {}}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
              </div>

              {/* HNR */}
              <div
                onMouseEnter={() => setActiveMetric("hnr")}
                className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  activeMetric === "hnr"
                    ? "border-cyan-400/60 bg-cyan-950/40 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                    : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-400 uppercase mb-2 font-mono">
                  <span>HNR Ratio</span>
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="text-2xl font-black font-mono text-slate-200">22.3 dB</span>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "75%" } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </div>
              </div>
            </div>

            {/* Verdict */}
            <div className="bg-[#03060F] border-t border-slate-800/80 px-6 py-4.5 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Veredicto Forense Final
              </span>
              <span className="text-base font-black font-mono text-emerald-400 tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                HONESTO
              </span>
            </div>
          </div>

          {/* Metric Details Panel */}
          <div className="w-full max-w-md mt-4 min-h-[90px]">
            <motion.div
              key={activeMetric || "none"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-xl border border-slate-800/80 bg-[#090E1F]/80 shadow-md text-xs text-slate-300 backdrop-blur-md"
            >
              {activeMetric ? (
                <div>
                  <h4 className="font-mono font-bold text-cyan-400 mb-1.5">
                    {metricDetails[activeMetric].name}
                  </h4>
                  <p className="mb-1 text-slate-200 leading-relaxed font-normal">
                    {metricDetails[activeMetric].desc}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                    {metricDetails[activeMetric].detail}
                  </p>
                </div>
              ) : (
                <div className="text-center py-2 text-slate-500 font-mono text-[11px]">
                  Coloque el cursor sobre las métricas del reporte pericial para inspeccionar su valor científico.
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
