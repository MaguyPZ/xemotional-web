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
      background: `radial-gradient(circle 220px at ${glowX}px ${glowY}px, rgba(99,102,241,0.08), transparent 80%)`,
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
      className="relative flex flex-col items-start p-8 rounded-2xl border border-slate-200/90 bg-white/80 hover:bg-white hover:border-indigo-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(79,70,229,0.08)] overflow-hidden group cursor-pointer backdrop-blur-xl transition-all duration-300"
    >
      {/* Light spotlight highlight following mouse */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" style={glowStyle} />
      
      {/* Corner subtle glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-indigo-500/5 blur-2xl transition-colors duration-500 pointer-events-none" />

      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest font-mono mb-6 block">
        {phase}
      </span>

      <div className="w-12 h-12 rounded-xl bg-indigo-50/80 border border-indigo-100/90 flex items-center justify-center text-indigo-600 group-hover:text-indigo-700 group-hover:scale-105 group-hover:border-indigo-200 transition-all duration-300 mb-6 shadow-xs">
        {icon}
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
        {title}
      </h3>

      <p className="text-sm text-slate-600 leading-relaxed font-normal">
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
    <section id="metodologia" className="py-24 relative overflow-hidden bg-[#F8FAFC] border-t border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-100/60 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase border-b border-indigo-200 pb-1 mb-4 inline-block font-mono">
            Protocolo Forense
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-5">
            Protocolo de análisis en tres fases
          </h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
            Un proceso estructurado, seguro y completamente confidencial para obtener un reporte técnico de precisión clínica.
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
