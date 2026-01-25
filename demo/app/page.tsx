"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; life: number }>
  >([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });

      // Create particles
      setParticles((prev) => [
        ...prev,
        {
          id: Math.random(),
          x,
          y,
          life: 1,
        },
      ]);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life - 0.02 }))
          .filter((p) => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-linear-to-br from-zinc-900 via-black to-zinc-900"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(59,130,246,0.1),transparent_80%)] pointer-events-none transition-all duration-100" />

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="pointer-events-none absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            opacity: particle.life * 0.6,
            transform: `scale(${particle.life})`,
            boxShadow: `0 0 ${8 * particle.life}px rgba(96, 165, 250, ${particle.life})`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-2xl text-center">
          {/* Header */}
          <div className="mb-8 inline-block">
            <div className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
              <span className="text-blue-300 text-sm font-medium">
                Cursor-Driven Animations
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
            Pointr Animation
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-zinc-400 mb-8 leading-relaxed">
            Lightweight, cursor-driven animations for modern web experiences.
            Move your cursor to see the magic happen.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Responsive",
                desc: "Smooth animations that follow your cursor",
              },
              {
                title: "Lightweight",
                desc: "Minimal bundle size, maximum performance",
              },
              {
                title: "Modern",
                desc: "Built for React with TypeScript support",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors duration-300"
              >
                <h3 className="font-semibold text-blue-300 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-3 rounded-lg border border-blue-500/30 text-blue-300 font-semibold hover:bg-blue-500/10 transition-colors duration-300">
              View Docs
            </button>
          </div>

          {/* Footer hint */}
          <p className="mt-12 text-sm text-zinc-500">
            💡 Tip: Move your cursor around to see the animation in action
          </p>
        </div>
      </div>

      {/* Cursor glow effect */}
      <div
        className="pointer-events-none fixed w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"
        style={{
          left: `${mousePos.x - 64}px`,
          top: `${mousePos.y - 64}px`,
          transition: "all 0.1s ease-out",
        }}
      />
    </div>
  );
}
