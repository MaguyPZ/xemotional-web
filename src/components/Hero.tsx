"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Fingerprint, Clock, ArrowRight, MessageCircle } from "lucide-react";
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
    hidden: { opacity: 0, y: 25 },
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
      icon: <Fingerprint className="w-4 h-4 text-indigo-600" />,
      text: "Cero retención de datos — procesamiento exclusivo en memoria volátil",
    },
    {
      icon: <ShieldAlert className="w-4 h-4 text-emerald-600" />,
      text: "Canal cifrado de extremo a extremo · Cumplimiento estricto GDPR",
    },
    {
      icon: <Clock className="w-4 h-4 text-indigo-600" />,
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
          {/* Subtle Modern Pill Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-indigo-200/80 bg-white/80 backdrop-blur-md text-[11px] font-bold tracking-wider text-indigo-700 shadow-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <span>Análisis Forense · IA Bioacústica V9</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight mb-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-700 bg-clip-text text-transparent"
          >
            Análisis Forense <br />
            de Voz<span className="text-indigo-600">.</span> <br />
            Precisión Inapelable<span className="text-indigo-600">.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed mb-8 font-normal"
          >
            Evaluamos los parámetros bioacústicos de la voz humana mediante inteligencia artificial forense de última generación. Obtenga un reporte técnico detallado de credibilidad, estrés cognitivo y micro-temblores vocales, de forma completamente confidencial.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10"
          >
            <a
              href="https://wa.me/50663823708?text=Hola%2C%20quiero%20analizar%20un%20audio"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow px-7 py-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2.5 shadow-[0_8px_25px_-5px_rgba(16,185,129,0.35)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.5)] transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Iniciar Consulta por WhatsApp</span>
            </a>
            <a
              href="#metodologia"
              className="px-7 py-4 rounded-xl font-bold text-sm border border-slate-200/90 hover:border-slate-300 bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 backdrop-blur-md shadow-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-md"
            >
              <span>Ver Metodología</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3.5 border-t border-slate-200/80 pt-6 w-full max-w-xl"
          >
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-xs font-semibold text-slate-600"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-white border border-slate-200/90 flex items-center justify-center shadow-xs">
                  {badge.icon}
                </div>
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: WhatsApp Mockup with Refined Glassmorphism */}
        <motion.div
          className="lg:col-span-5 flex justify-center w-full"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.5 }}
        >
          <div className="w-full max-w-sm rounded-3xl border border-slate-200/90 bg-white/80 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] overflow-hidden relative group backdrop-blur-xl">
            {/* Top decorative header */}
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-700 font-bold">XEM-FORENSIC-V9</span>
              </div>
              <span className="text-indigo-600 font-bold">EN LÍNEA</span>
            </div>

            {/* Glossy sheen reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />
            
            <img 
              src="/LogoWhap.png" 
              alt="Ejemplo de Análisis WhatsApp" 
              className="w-full h-auto object-cover"
            />

            {/* Bottom status readout */}
            <div className="px-5 py-2.5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>CIFRADO E2E</span>
              <span className="text-emerald-600 font-bold">VEREDICTO PERICIAL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
