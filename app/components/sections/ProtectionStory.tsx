// app/page.tsx
'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: 1,
    tag: "INTERSTELLAR",
    title: "The Silent Void",
    color: "bg-blue-900",
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    tag: "NEBULA",
    title: "Stellar Nurseries",
    color: "bg-purple-900",
    img: "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    tag: "HORIZON",
    title: "Event Perspective",
    color: "bg-red-900",
    img: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 4,
    tag: "ECLIPSE",
    title: "Shadow Dance",
    color: "bg-zinc-900",
    img: "https://images.unsplash.com/photo-1538370910416-059664e4c743?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 5,
    tag: "COSMOS",
    title: "Infinite Reach",
    color: "bg-indigo-900",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
  }
];

export default function ProtectionStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.card');
    const images = gsap.utils.toArray<HTMLElement>('.card-img');

    // Initial State: First card visible, others stacked below
    gsap.set(cards.slice(1), { yPercent: 100 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stickyRef.current,
        start: "top top",
        end: `+=${(cards.length - 1) * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1, // Smooth out pinning entry
      }
    });

    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;

      const currentCard = card;
      const nextCard = cards[i + 1];
      const currentImg = images[i];

      // The "Peeling" effect: current card scales down while next slides up
      tl.to(currentCard, {
        scale: 0.85,
        rotate: -2,
        opacity: 0.4,
        ease: "none"
      }, i)
        .to(currentImg, {
          scale: 1.4,
          ease: "none"
        }, i)
        .to(nextCard, {
          yPercent: 0,
          ease: "none"
        }, i);
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative pt-16 min-h-screen bg-zinc-950 text-white font-sans overflow-x-hidden selection:bg-white selection:text-black">
      {/* Intro Section */}
      <section className="flex flex-col items-center justify-center p-10 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-transparent to-transparent opacity-50 pointer-events-none" />
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 z-10">
          SCROLL TO <span className="text-zinc-500 italic font-light text-5xl md:text-7xl">REVEAL</span>
        </h1>
        <p className="text-zinc-400 max-w-md uppercase tracking-widest text-xs z-10">
          A layered card animation inspired by high-end design portfolios
        </p>
        <div className="mt-20 animate-bounce text-zinc-600 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-widest uppercase">Explore</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Sticky Animation Section */}
      <section ref={stickyRef} className="relative h-screen overflow-hidden flex items-center justify-center bg-zinc-950">
        <div className="relative w-[92vw] h-[75vh] md:w-[65vw] md:h-[65vh]">
          {CARDS.map((card, index) => (
            <div
              key={card.id}
              className={`card absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 ${card.color}`}
              style={{ zIndex: index }}
            >
              <img
                src={card.img}
                alt={card.title}
                className="card-img absolute inset-0 w-full h-full object-cover"
              />

              {/* Card Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-8 md:p-12 pointer-events-none">
                <div className="flex justify-between items-start">
                  <span className="bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-full text-[10px] font-mono tracking-wider border border-white/20">
                    {card.tag}
                  </span>
                  <span className="text-white/30 font-mono text-sm">0{index + 1}</span>
                </div>
                <div>
                  <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none mb-4">
                    {card.title}
                  </h2>
                  <div className="h-px w-12 bg-white/40 mb-4" />
                  <p className="text-zinc-300 text-xs font-medium tracking-widest uppercase opacity-80">
                    Deep Space Exploration Protocol
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Outro Section */}
      <section className="h-screen flex items-center justify-center bg-zinc-950 p-20 relative">
        <div className="text-center z-10">
          <h3 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6">
            JOURNEY ENDS
          </h3>
          <p className="text-zinc-500 uppercase tracking-[0.2em] text-[10px] mb-12">
            Experience complete — scroll up to restart
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group relative px-10 py-4 overflow-hidden rounded-full border border-white/20 transition-all hover:border-white/40"
          >
            <span className="relative z-10 font-bold uppercase tracking-widest text-xs">Return to Origin</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="absolute inset-0 flex items-center justify-center text-black font-bold uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              Return to Origin
            </span>
          </button>
        </div>
      </section>

    </div>
  );
}