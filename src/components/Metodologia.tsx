"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Activity, FileText } from "lucide-react";

interface StepCardProps {
  phase: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function StepCard({ phase, title, description, icon }: StepCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative cursor coordinates from center of card
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Tilt factor
    const maxRotate = 8;
    setRotateX(-(y / (height / 2)) * maxRotate);
    setRotateY((x / (width / 2)) * maxRotate);

    // Glowing coordinate highlights
    const glowX = e.clientX - rect.left;
    const glowY = e.clientY - rect.top;
    setGlowStyle({
      background: `radial-gradient(circle 220px at ${glowX}px ${glowY}px, rgba(6,182,212,0.15), transparent 80%)`,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowStyle({});
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="relative flex flex-col items-start p-8 rounded-2xl border border-slate-800/80 bg-slate-950/60 hover:bg-slate-900/80 hover:border-cyan-500/50 shadow-[0_10px_35px_rgba(0,0,0,0.5)] overflow-hidden group cursor-pointer backdrop-blur-xl transition-all duration-300"
    >
      {/* Light spotlight highlight following mouse */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" style={glowStyle} />
      
      {/* Corner cyan spotlight glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-cyan-500/10 blur-2xl transition-colors duration-500 pointer-events-none" />

      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-mono mb-6 block">
        {phase}
      </span>

      <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-800/50 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:scale-105 group-hover:border-cyan-500/60 transition-all duration-300 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
        {icon}
      </div>

      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
        {title}
      </h3>

      <p className="text-sm text-slate-400 leading-relaxed font-normal">
        {description}
      </p>
    </div>
  );
}

export default function Metodologia() {
  const steps = [
    {
      phase: "Fase 01 · Remisión",
      title: "Remisión Segura del Audio",
      description:
        "Reenvíe la nota de voz o archivo de audio a nuestro canal de WhatsApp. El canal opera con cifrado E2E. No es necesario registrarse ni proporcionar datos personales de ningún tipo.",
      icon: <MessageSquare className="w-5.5 h-5.5" />,
    },
    {
      phase: "Fase 02 · Análisis",
      title: "Extracción Bioacústica con IA",
      description:
        "El motor de IA extrae más de 42 parámetros físicos del habla: frecuencia fundamental, jitter, shimmer, HNR, micro-temblor vocal, cadencia y coherencia cognitiva del hablante.",
      icon: <Activity className="w-5.5 h-5.5" />,
    },
    {
      phase: "Fase 03 · Entrega",
      title: "Entrega del Reporte Forense PDF",
      description:
        "Reciba el informe técnico completo en su conversación privada. Incluye el veredicto, métricas detalladas y conclusiones del análisis. El audio es eliminado de forma inmediata e irreversible.",
      icon: <FileText className="w-5.5 h-5.5" />,
    },
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardAnimVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 60, damping: 15 },
    },
  };

  return (
    <section id="metodologia" className="py-24 relative overflow-hidden bg-[#050813] border-t border-slate-800/80">
      {/* Ambient radial glow in background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase border-b border-cyan-500/40 pb-1 mb-4 inline-block font-mono">
            Protocolo Forense
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-5">
            Protocolo de análisis en tres fases
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed font-normal">
            Un proceso estructurado, seguro y completamente confidencial para obtener un reporte pericial de precisión clínica.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {steps.map((step, idx) => (
            <motion.div key={idx} variants={cardAnimVariants}>
              <StepCard {...step} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
