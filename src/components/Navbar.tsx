"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, MessageCircle } from "lucide-react";

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
          ? "py-3.5 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-[0_4px_15px_rgba(79,70,229,0.25)] overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <img src="/LogoWhap.png" alt="Xemotional Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
              Xemotional
            </span>
            <span className="text-[8px] font-mono tracking-widest text-indigo-500 uppercase -mt-1 font-bold">
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
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 uppercase tracking-wider relative py-1 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-indigo-600 after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA & Actions */}
        <div className="hidden md:flex items-center gap-3.5">
          <Link
            href="/app"
            className="text-xs font-bold text-slate-700 hover:text-slate-900 transition-all duration-300 border border-slate-200/90 hover:border-slate-300 bg-white/70 backdrop-blur-md px-4 py-2.5 rounded-xl hover:shadow-sm"
          >
            Acceder al Analizador
          </Link>
          <a
            href="https://wa.me/50663823708?text=Hola%2C%20quiero%20iniciar%20una%20consulta%20forense"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow relative text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 px-5 py-2.5 rounded-xl shadow-[0_4px_16px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_22px_rgba(16,185,129,0.35)] flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Consulta Confidencial</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg shadow-sm"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 top-[64px] z-40 bg-white/98 backdrop-blur-xl border-t border-slate-200/90 md:hidden transition-transform duration-500 ease-in-out ${
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
                className="text-lg font-bold text-slate-800 hover:text-indigo-600 border-b border-slate-100 pb-3 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-indigo-500 text-sm">→</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3.5">
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center font-bold text-slate-800 hover:text-indigo-600 border border-slate-200 bg-white py-3.5 rounded-xl shadow-sm"
            >
              Acceder al Analizador Web
            </Link>
            <a
              href="https://wa.me/50663823708?text=Hola%2C%20quiero%20iniciar%20una%20consulta%20forense"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center font-bold text-white bg-emerald-600 hover:bg-emerald-500 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Consulta Confidencial</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
