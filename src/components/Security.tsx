"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, HardDrive, Lock, ShieldAlert } from "lucide-react";

export default function Security() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const securityFeatures = [
    {
      title: "Cero Almacenamiento de Audios",
      desc: "Los archivos de voz se procesan exclusivamente en memoria volátil de forma temporal. Una vez finalizada la extracción de parámetros bioacústicos, el archivo es eliminado de forma inmediata e irreversible mediante sobrescritura binaria.",
      icon: <HardDrive className="w-5 h-5 text-indigo-600" />,
    },
    {
      title: "Cifrado de Extremo a Extremo",
      desc: "El canal de recepción opera con protocolos criptográficos de alta seguridad. Su identidad y sus registros están blindados ante cualquier tipo de intercepción o filtración externa.",
      icon: <Lock className="w-5 h-5 text-indigo-600" />,
    },
    {
      title: "Cumplimiento Estricto GDPR",
      desc: "Aplicamos los estándares de protección de datos más rigurosos del marco europeo. Usted mantiene el control absoluto y confidencial sobre su información en todo momento.",
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
    },
  ];

  return (
    <section id="seguridad" ref={containerRef} className="py-24 relative overflow-hidden bg-white/60 border-b border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase border-b border-indigo-200 pb-1 mb-4 inline-block font-mono">
            Seguridad & GDPR
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-5">
            Absolutamente Confidencial
          </h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
            Garantizamos la protección y privacidad total en el procesamiento de la evidencia digital bajo los más estrictos marcos internacionales.
          </p>
        </div>

        {/* Security Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {securityFeatures.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 60, damping: 15, delay: idx * 0.1 }}
              className="p-7 rounded-2xl border border-slate-200/90 bg-white/80 hover:bg-white hover:border-slate-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300 flex flex-col backdrop-blur-xl"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5 shadow-xs">
                {feat.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Privacy Pledge Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="p-8 rounded-2xl border border-slate-200/90 bg-gradient-to-r from-white via-slate-50/80 to-white flex flex-col md:flex-row items-center gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] relative overflow-hidden group backdrop-blur-xl"
        >
          {/* Subtle side highlight line */}
          <div className="absolute top-0 left-0 bottom-0 w-[2.5px] bg-indigo-600" />
          
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 mb-1.5 uppercase tracking-wider font-mono">
              Compromiso de Privacidad Forense Xemotional
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              No almacenamos, no vendemos y no entrenamos modelos con sus audios. Cada análisis es un proceso cerrado, anónimo y efímero diseñado para la máxima seguridad personal e institucional.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
