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
    <section id="reporte" className="py-24 relative bg-white border-y border-slate-200/90 overflow-hidden">
      {/* Soft Ambient Light Background */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-indigo-50/70 rounded-full blur-[130px] pointer-events-none" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Side: Content & Bullets */}
        <motion.div
          className="lg:col-span-6 flex flex-col items-start"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase border-b border-indigo-200 pb-1 mb-4 inline-block font-mono">
            Evidencia Pericial
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
            Un reporte forense de estándares científicos
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal mb-6">
            Cada análisis genera un informe técnico PDF estructurado con la metodología aplicada, los parámetros medidos y un veredicto fundamentado en evidencia bioacústica objetiva y replicable.
          </p>

          <ul className="flex flex-col gap-3.5 mb-8 w-full">
            {bulletPoints.map((bullet, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-3 text-xs font-medium text-slate-700"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + idx * 0.08, duration: 0.4 }}
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mt-0.5 shadow-xs">
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
            className="btn-glow px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 shadow-[0_4px_16px_rgba(16,185,129,0.25)] transition-all duration-300 group"
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
            className="w-full max-w-md rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.07)] overflow-hidden relative backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-slate-50/90 px-6 py-4 border-b border-slate-200/80 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-700">
                XEMOTIONAL · REPORTE FORENSE
              </span>
              <span className="text-[9px] font-mono text-slate-500 font-semibold">
                REF: XEM-2026-04782
              </span>
            </div>

            {/* Classification */}
            <div className="bg-slate-50/50 border-b border-slate-200/80 px-6 py-2.5 flex items-center gap-2">
              <span className="text-[9px] font-mono font-extrabold text-indigo-700 border border-indigo-200 bg-indigo-50 px-2 py-0.5 rounded uppercase">
                CONFIDENCIAL
              </span>
              <span className="text-[9px] font-mono text-slate-500">
                Análisis Bioacústico · Motor Forense IA V9
              </span>
            </div>

            {/* Fields */}
            <div className="px-6 py-4 flex flex-col gap-2.5 text-xs border-b border-slate-200/80">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-semibold">Fecha de Emisión</span>
                <span className="text-slate-800 font-bold">04/07/2026 · 22:46 UTC</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-semibold">Duración del Audio</span>
                <span className="text-slate-800 font-bold">0:47 seg · formato OGG</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-semibold">Hablantes Detectados</span>
                <span className="text-slate-800 font-bold">1 hablante identificado</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-500 font-semibold">Calidad de Señal</span>
                <span className="text-slate-800 font-bold text-indigo-600">Alta — SNR: 28.4 dB</span>
              </div>
            </div>

            {/* Interactive Metrics Grid */}
            <div className="p-6 grid grid-cols-2 gap-4">
              {/* Credibility */}
              <div
                onMouseEnter={() => setActiveMetric("credibility")}
                className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  activeMetric === "credibility"
                    ? "border-emerald-300 bg-emerald-50/80 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-500 uppercase mb-2 font-mono">
                  <span>Credibilidad</span>
                  <Info className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-2xl font-black font-mono text-emerald-600">87%</span>
                <div className="w-full h-1 bg-slate-100 rounded-full mt-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500 rounded-full"
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
                    ? "border-indigo-300 bg-indigo-50/80 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                    : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-500 uppercase mb-2 font-mono">
                  <span>Estrés Vocal</span>
                  <Info className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <span className="text-2xl font-black font-mono text-indigo-600">Bajo</span>
                <div className="w-full h-1 bg-slate-100 rounded-full mt-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full"
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
                    ? "border-indigo-300 bg-indigo-50/80 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                    : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-500 uppercase mb-2 font-mono">
                  <span>Jitter F0</span>
                  <Info className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <span className="text-2xl font-black font-mono text-slate-800">0.8%</span>
                <div className="w-full h-1 bg-slate-100 rounded-full mt-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full"
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
                    ? "border-indigo-300 bg-indigo-50/80 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                    : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-500 uppercase mb-2 font-mono">
                  <span>HNR Ratio</span>
                  <Info className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <span className="text-2xl font-black font-mono text-slate-800">22.3 dB</span>
                <div className="w-full h-1 bg-slate-100 rounded-full mt-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "75%" } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </div>
              </div>
            </div>

            {/* Verdict */}
            <div className="bg-slate-50 px-6 py-4.5 border-t border-slate-200/80 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider font-mono">
                Veredicto Forense Final
              </span>
              <span className="text-base font-black font-mono text-emerald-600 tracking-wider">
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
              className="p-4 rounded-xl border border-slate-200/90 bg-white/90 shadow-sm text-xs font-semibold text-slate-600"
            >
              {activeMetric ? (
                <div>
                  <h4 className="font-bold text-indigo-600 mb-1.5">
                    {metricDetails[activeMetric].name}
                  </h4>
                  <p className="mb-1 text-slate-700 leading-relaxed font-normal">
                    {metricDetails[activeMetric].desc}
                  </p>
                  <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                    {metricDetails[activeMetric].detail}
                  </p>
                </div>
              ) : (
                <div className="text-center py-2 text-slate-500 font-normal text-xs">
                  Coloca el cursor sobre las tarjetas de métricas del reporte pericial para inspeccionar su significado científico.
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
