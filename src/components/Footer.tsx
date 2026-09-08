"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#03060F] border-t border-slate-800/80 pt-24 pb-12 overflow-hidden">
      
      {/* Background ambient glow behind CTA */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ==================== FINAL CALL TO ACTION ==================== */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="relative rounded-3xl border border-cyan-500/30 bg-[#090E1F]/90 p-10 md:p-14 text-center overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.15)] backdrop-blur-xl">
            {/* Ambient cyan highlight */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-cyan-500/15 via-transparent to-emerald-500/10 opacity-70 pointer-events-none" />

            <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase mb-4 inline-block font-mono">
              Consulta Confidencial
            </span>
            
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-5 max-w-2xl mx-auto leading-tight">
              ¿Necesita evaluar un registro de audio?
            </h2>
            
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-normal max-w-xl mx-auto mb-8">
              Póngase en contacto de forma totalmente anónima. Reciba su reporte bioacústico forense en minutos directamente en su chat de WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/50663823708?text=Hola%2C%20quiero%20iniciar%20una%20consulta%20forense"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 text-white flex items-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.45)] transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <MessageSquare className="w-4.5 h-4.5 fill-current" />
                <span>Iniciar Consulta por WhatsApp</span>
              </a>
              <Link
                href="/app"
                className="px-6 py-3.5 rounded-xl font-bold text-sm border border-slate-700/80 hover:border-cyan-500/50 bg-slate-900/80 text-slate-200 hover:text-white transition-all duration-300 w-full sm:w-auto justify-center flex items-center gap-1.5 backdrop-blur-md hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              >
                <span>Acceder al Analizador Web</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </Link>
            </div>

            <p className="text-[10px] text-slate-400 font-mono mt-6 tracking-wider uppercase">
              Procesamiento en memoria volátil · Cero retención de registros
            </p>
          </div>
        </div>

        {/* ==================== FOOTER LINKS ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-slate-800/80 pb-16">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.4)] overflow-hidden">
                <div className="w-full h-full rounded-[6px] bg-[#050813] flex items-center justify-center overflow-hidden">
                  <img src="/LogoWhap.png" alt="Xemotional Logo" className="w-full h-full object-cover" />
                </div>
              </div>
              <span className="font-black text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Xemotional
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-normal max-w-sm">
              Plataforma forense bioacústica de credibilidad y estrés vocal mediante inteligencia artificial. Operaciones periciales y consultoría global confidencial.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-2 font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Memoria Volátil Garantizada</span>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2.5 flex flex-col items-start">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-4 font-mono">
              Plataforma
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-medium text-slate-400">
              <Link href="/app" className="hover:text-cyan-300 transition-colors duration-300">
                Analizador Web
              </Link>
              <Link href="/admin" className="hover:text-cyan-300 transition-colors duration-300">
                Panel Administrativo
              </Link>
              <a href="#metodologia" className="hover:text-cyan-300 transition-colors duration-300">
                Metodología
              </a>
              <a href="#ciencia" className="hover:text-cyan-300 transition-colors duration-300">
                Ciencia & Bioacústica
              </a>
            </div>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2.5 flex flex-col items-start">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-4 font-mono">
              Seguridad
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-medium text-slate-400">
              <a href="#seguridad" className="hover:text-cyan-300 transition-colors duration-300">
                Cumplimiento GDPR
              </a>
              <a href="#seguridad" className="hover:text-cyan-300 transition-colors duration-300">
                Memoria Volátil
              </a>
              <a href="#seguridad" className="hover:text-cyan-300 transition-colors duration-300">
                Cifrado Extremo a Extremo
              </a>
            </div>
          </div>

          {/* Links Column 3 */}
          <div className="md:col-span-2 flex flex-col items-start">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-4 font-mono">
              Contacto
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-medium text-slate-400">
              <a
                href="https://wa.me/50663823708"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors duration-300 flex items-center gap-1.5"
              >
                <span>Canal WhatsApp</span>
              </a>
              <a
                href="mailto:support@xemotional.com"
                className="hover:text-cyan-300 transition-colors duration-300 flex items-center gap-1.5"
              >
                <span>Email Pericial</span>
              </a>
            </div>
          </div>
        </div>

        {/* ==================== FOOTER BOTTOM ==================== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 text-[10px] font-medium text-slate-500 uppercase tracking-wider font-mono">
          <span>
            © {new Date().getFullYear()} Xemotional Forensics. Todos los derechos reservados.
          </span>
          <div className="flex gap-6">
            <span className="text-slate-400">Canal Cifrado</span>
            <span className="text-emerald-400">GDPR Compliant</span>
          </div>
        </div>
      </div>

      {/* ==================== FLOATING WHATSAPP BUTTON ==================== */}
      <a
        href="https://wa.me/50663823708?text=Hola%2C%20quiero%20iniciar%20una%20consulta%20forense"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-emerald-600 to-teal-500 text-white p-4 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 transition-all duration-300 flex items-center justify-center group"
        aria-label="Contact support on WhatsApp"
      >
        <MessageSquare className="w-5.5 h-5.5 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] group-hover:ml-2.5 transition-all duration-500 ease-out text-xs font-bold whitespace-nowrap">
          Consulta Confidencial
        </span>
      </a>

    </footer>
  );
}
