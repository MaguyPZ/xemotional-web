"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Metodología", href: "#metodologia" },
    { name: "Ciencia", href: "#ciencia" },
    { name: "Reporte", href: "#reporte" },
    { name: "Aplicaciones", href: "#aplicaciones" },
    { name: "Seguridad", href: "#seguridad" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#050813]/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.4)] overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-[7px] bg-[#050813] flex items-center justify-center overflow-hidden">
              <img src="/LogoWhap.png" alt="Xemotional Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent group-hover:to-cyan-300 transition-all duration-300">
              Xemotional
            </span>
            <span className="text-[8px] font-mono tracking-widest text-cyan-400 uppercase -mt-1 opacity-80">
              Bioacoustic AI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Link Items */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold text-slate-300 hover:text-cyan-300 uppercase tracking-wider relative py-1 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-cyan-400 after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA & Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/app"
            className="text-xs font-semibold text-slate-300 hover:text-white transition-all duration-300 border border-slate-700/80 hover:border-cyan-500/50 bg-slate-900/60 backdrop-blur-md px-4 py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            Acceder al Analizador
          </Link>
          <a
            href="https://wa.me/50663823708?text=Hola%2C%20quiero%20iniciar%20una%20consulta%20forense"
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative text-xs font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 transition-all duration-300 px-5 py-2.5 rounded-lg shadow-[0_0_25px_rgba(16,185,129,0.35)] flex items-center gap-1.5 overflow-hidden"
          >
            <span className="relative z-10">Consulta Confidencial</span>
            <ArrowUpRight className="relative z-10 w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 rounded-lg"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 top-[60px] z-40 bg-[#050813]/98 backdrop-blur-2xl border-t border-slate-800/80 md:hidden transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-8 gap-6 h-full justify-between pb-24">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold text-slate-200 hover:text-cyan-400 border-b border-slate-800/80 pb-3 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-cyan-500 text-sm">→</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center font-bold text-slate-200 hover:text-white border border-slate-700 bg-slate-900/80 py-3.5 rounded-lg"
            >
              Acceder al Analizador Web
            </Link>
            <a
              href="https://wa.me/50663823708?text=Hola%2C%20quiero%20iniciar%20una%20consulta%20forense"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 py-3.5 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-1.5"
            >
              <span>Consulta Confidencial</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
