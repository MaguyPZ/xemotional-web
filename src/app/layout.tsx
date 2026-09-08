import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Xemotional — Análisis Forense de Voz con Inteligencia Artificial",
  description: "Servicio profesional de análisis forense de voz con IA. Evaluación de credibilidad, estrés vocal y emociones para litigación, RRHH y peritaje judicial. 100% confidencial, cero datos almacenados.",
  keywords: ["análisis forense de voz", "peritaje de audio", "credibilidad vocal", "estrés vocal", "inteligencia artificial", "consultoría bioacústica", "análisis de audio WhatsApp"],
  authors: [{ name: "Xemotional" }],
  openGraph: {
    title: "Xemotional — Análisis Forense de Voz",
    description: "Evaluación bioacústica de credibilidad, estrés cognitivo y emociones mediante IA forense. Confidencial. Sin datos almacenados.",
    type: "website",
    url: "https://xemotional.com",
    images: [
      {
        url: "https://xemotional.com/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Xemotional — Análisis Forense de Voz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://xemotional.com/og-preview.png"],
  },
  alternates: {
    canonical: "https://xemotional.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* Meta Pixel Code — Xemotional */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1664455858206047');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1664455858206047&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-full bg-[#F8FAFC] text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-600 flex flex-col">
        {children}
      </body>
    </html>
  );
}
