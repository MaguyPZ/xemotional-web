"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Metodologia from "@/components/Metodologia";
import InteractiveReport from "@/components/InteractiveReport";
import Storytelling from "@/components/Storytelling";
import Cases from "@/components/Cases";
import Security from "@/components/Security";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // Synchronize ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing for smoother animation ticking
    gsap.ticker.lagSmoothing(0);

    // Initial load-in animation for header sections
    gsap.fromTo(
      "body",
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power1.inOut" }
    );

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-600">
      {/* Navigation header */}
      <Navbar />

      {/* Hero section */}
      <Hero />

      {/* Methodology Section (Fase 1, 2, 3) */}
      <Metodologia />

      {/* Pinned Storytelling Section (GSAP ScrollTrigger) */}
      <Storytelling />

      {/* Interactive PDF Mockup Report Detail */}
      <InteractiveReport />

      {/* Use Cases Section (Aplicaciones) */}
      <Cases />

      {/* Security & GDPR privacy guarantees */}
      <Security />

      {/* FAQ Accordion Section */}
      <FAQ />

      {/* CTA Box & Site Footer */}
      <Footer />
    </div>
  );
}
