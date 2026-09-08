"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Scale, Users, ShieldAlert, Briefcase } from "lucide-react";

interface CaseCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  usages: string[];
}

function CaseCard({ title, desc, icon, usages }: CaseCardProps) {
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

    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Subtle 3D tilt
    setRotateX(-(y / (height / 2)) * 6);
    setRotateY((x / (width / 2)) * 6);

    // Glowing coordinate spotlight
    const glowX = e.clientX - rect.left;
    const glowY = e.clientY - rect.top;
    setGlowStyle({
      background: `radial-gradient(circle 220px at ${glowX}px ${glowY}px, rgba(99,102,241,0.07), transparent 85%)`,
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
        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="relative flex flex-col p-7 rounded-2xl border border-slate-200/90 bg-white/80 hover:bg-white hover:border-indigo-300 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(79,70,229,0.07)] overflow-hidden group cursor-pointer backdrop-blur-xl transition-all duration-300"
    >
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" style={glowStyle} />

      <div className="flex items-center gap-4 mb-5">
        <div className="w-11 h-11 rounded-lg bg-indigo-50/80 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:text-indigo-700 transition-all duration-300 shadow-xs">
          {icon}
        </div>
        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h3>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed font-normal mb-6">
        {desc}
      </p>

      <ul className="flex flex-col gap-2 mt-auto border-t border-slate-100 pt-4 w-full">
        {usages.map((usage, idx) => (
          <li key={idx} className="text-[11px] font-medium text-slate-600 flex items-center gap-2 group-hover:text-slate-800 transition-colors">
            <span className="text-indigo-600 font-bold font-mono">→</span>
            <span>{usage}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Cases() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const cases = [
    {
      title: "Litigación y Peritaje Judicial",
      desc: "Evaluación de credibilidad de testimonios, declaraciones grabadas y grabaciones telefónicas. Reportes listos para presentación pericial.",
      icon: <Scale className="w-5 h-5" />,
      usages: [
        "Credibilidad pericial de testimonios",
        "Validación de amenazas y coacciones",
        "Análisis de grabaciones telefónicas",
      ],
    },
    {
      title: "Recursos Humanos y Selección",
      desc: "Evaluación de veracidad y nivel de estrés en entrevistas de selección crítica y cargos de alta confianza de forma automatizada.",
      icon: <Users className="w-5 h-5" />,
      usages: [
        "Cargos de alta seguridad y dirección",
        "Verificación de declaraciones",
        "Detección de fatiga y tensión encubierta",
      ],
    },
    {
      title: "Seguridad y Cumplimiento",
      desc: "Auditorías de cumplimiento normativo (Compliance) mediante el análisis de canales telefónicos de atención y soporte confidencial.",
      icon: <ShieldAlert className="w-5 h-5" />,
      usages: [
        "Prevención y detección de fraude",
        "Verificación de identidad vocal",
        "Auditoría técnica de llamadas críticas",
      ],
    },
    {
      title: "Consultoría Privada de Crisis",
      desc: "Análisis confidenciales para asesoría legal y toma de decisiones corporativas o personales extremadamente sensibles.",
      icon: <Briefcase className="w-5 h-5" />,
      usages: [
        "Negociaciones y arbitrajes complejos",
        "Verificaciones corporativas internas",
        "Asesoría legal preventiva de riesgo",
      ],
    },
  ];

  return (
    <section id="aplicaciones" ref={containerRef} className="py-24 relative overflow-hidden bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase border-b border-indigo-200 pb-1 mb-4 inline-block font-mono">
            Casos de Uso
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-5">
            Aplicaciones del análisis forense de voz
          </h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
            Nuestra tecnología se despliega en ámbitos donde la precisión y el rigor técnico son determinantes para la toma de decisiones críticas.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cases.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 60, damping: 15, delay: idx * 0.1 }}
            >
              <CaseCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
