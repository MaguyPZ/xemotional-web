"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      q: "¿Cómo garantizan que mis audios no serán almacenados?",
      a: "Nuestro servidor de análisis bioacústico opera con discos en memoria volátil (RAM-only). Tras realizar la extracción de las 42 métricas físicas, el archivo de audio se sobrescribe con ceros binarios mediante la utilidad shred y se libera de la memoria. No existe ningún tipo de respaldo físico ni digital.",
    },
    {
      q: "¿Qué tipo de archivos puedo enviar y cuál es el límite?",
      a: "Aceptamos archivos en formatos .wav, .mp3, .m4a, .ogg y notas de voz nativas de WhatsApp. Recomendamos grabaciones de entre 10 segundos y 3 minutos para asegurar la estabilidad del análisis de frecuencia fundamental.",
    },
    {
      q: "¿En qué consiste el veredicto de credibilidad?",
      a: "No realizamos juicios de valor morales o éticos. El modelo compara las micro-perturbaciones (Jitter/Shimmer) y los índices de estrés autónomo contra una base de datos calibrada de patrones bioacústicos de control. El porcentaje resultante indica la correspondencia cognitiva y estabilidad psicofisiológica con la que el relato fue verbalizado.",
    },
    {
      q: "¿Es admisible el reporte en un juicio o litigio?",
      a: "El reporte técnico de Xemotional constituye una prueba documental bioacústica de parte. Aporta evidencia cuantitativa objetiva sobre el estado fonador del hablante. Puede ser ratificado y defendido por un perito informático o bioacústico para su incorporación formal en el expediente judicial.",
    },
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#050813]">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase border-b border-cyan-500/40 pb-1 mb-4 inline-block font-mono">
            Preguntas Frecuentes
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-5">
            Resolvemos sus dudas técnicas
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed font-normal">
            Respuestas detalladas sobre el procesamiento de datos, metodologías forenses y validez judicial.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4 border-t border-slate-800/80 pt-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="border-b border-slate-800/80 pb-4"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4 flex items-center justify-between text-left gap-4 font-bold text-slate-200 hover:text-cyan-300 transition-colors duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4.5 h-4.5 text-cyan-400/80 group-hover:text-cyan-300 transition-colors flex-shrink-0" />
                    <span className="text-sm md:text-base font-semibold">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-cyan-400" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-4 pl-7.5 text-xs md:text-sm text-slate-400 font-normal leading-relaxed max-w-3xl">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
