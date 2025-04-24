// src/components/HeroBanner.jsx

import React from "react";
import bgVideo from "../assets/webm_page_bg_spanish.webm";

const HeroBanner = () => {
  return (
    <section className="relative h-[400px] overflow-hidden flex items-center justify-start px-8 py-6">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[0.8]"
      >
        <source src={bgVideo} type="video/mp4" />
        Tu navegador no soporta el video en HTML5.
      </video>

      <div className="relative z-10 text-white">
        <h1 className="text-4xl font-bold">Novedades</h1>
        <p className="text-lg mt-2">Descubre los títulos más recientes</p>
        <a
          href="#"
          className="inline-block mt-4 bg-[#66c0f4] text-[#1b2838] px-6 py-3 font-bold rounded hover:bg-[#417a9b] transition-colors"
        >
          Ver novedades
        </a>
      </div>
    </section>
  );
};

export default HeroBanner;
