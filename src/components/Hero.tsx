"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Fingerprint, Clock, ArrowRight, MessageCircle, Activity } from "lucide-react";
import ThreeBackground from "./ThreeBackground";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 18,
      },
    },
  };

  const trustBadges = [
    {
      icon: <Fingerprint className="w-4 h-4 text-cyan-400" />,
      text: "Cero retención de datos — procesamiento exclusivo en memoria volátil",
    },
    {
      icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />,
      text: "Canal cifrado de extremo a extremo · Cumplimiento estricto GDPR",
    },
    {
      icon: <Clock className="w-4 h-4 text-cyan-400" />,
      text: "Reporte técnico PDF disponible en menos de 10 minutos",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden">
      {/* 3D WebGL Floating Particle Background */}
      <ThreeBackground />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 w-full">
        {/* Left Column: Hero Texts */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Cyber Status Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md text-[10px] font-bold tracking-widest text-cyan-300 uppercase mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span>Análisis Forense · IA Bioacústica V9</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight mb-6 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
          >
            Análisis Forense <br />
            de Voz<span className="text-cyan-400">.</span> <br />
            Precisión Inapelable<span className="text-emerald-400">.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed mb-8 font-normal"
          >
            Evaluamos los parámetros bioacústicos de la voz humana mediante inteligencia artificial forense de última generación. Obtenga un reporte técnico pericial de credibilidad, estrés cognitivo y micro-temblores vocales de forma completamente confidencial.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10"
          >
            <a
              href="https://wa.me/50663823708?text=Hola%2C%20quiero%20analizar%20un%20audio"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow px-7 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Iniciar Consulta por WhatsApp</span>
            </a>
            <a
              href="#metodologia"
              className="px-7 py-4 rounded-xl font-bold text-sm border border-slate-700/80 hover:border-cyan-500/50 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-white backdrop-blur-md flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
            >
              <span>Ver Metodología</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 border-t border-slate-800/80 pt-6 w-full max-w-xl"
          >
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-xs font-semibold text-slate-300"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-center">
                  {badge.icon}
                </div>
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: WhatsApp Mockup with Dark Glassmorphism Frame */}
        <motion.div
          className="lg:col-span-5 flex justify-center w-full"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.5 }}
        >
          <div className="w-full max-w-sm rounded-3xl border border-cyan-500/30 bg-slate-950/70 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden relative group backdrop-blur-xl">
            {/* Top decorative status bar */}
            <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-900/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-bold">XEM-FORENSIC-V9</span>
              </div>
              <span className="text-cyan-400 font-bold">ONLINE</span>
            </div>

            {/* Glossy sheen reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />
            
            <img 
              src="/LogoWhap.png" 
              alt="Ejemplo de Análisis WhatsApp" 
              className="w-full h-auto object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* Bottom forensic telemetry readout */}
            <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-900/80 flex items-center justify-between text-[9px] font-mono text-slate-400">
              <span>CANAL CIFRADO E2E</span>
              <span className="text-emerald-400">VEREDICTO VERIFICADO</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
