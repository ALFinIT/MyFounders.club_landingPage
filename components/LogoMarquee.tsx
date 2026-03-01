"use client"

import React from 'react'

const brandNames = [
  'Telr', 'Unifonic', 'Zeebu', 'Zoodmall', 'Fatima Fund', 'MATS Capital', 'Lemonade',
  'Maze', 'Foresight', 'Emertech', 'ADIB', 'FAB', 'Etihad', 'Aramco', 'Saudi PIF'
]

export default function LogoMarquee({ count = 7, speedSeconds = 20 }: { count?: number; speedSeconds?: number }) {
  // Use brand names instead of images - eliminates 404 errors
  const logos = brandNames.slice(0, count)
  const logosDup = [...logos, ...logos]

  return (
    <div className="logo-marquee w-full overflow-hidden py-6 sm:py-8">
      <div className="marquee-track-wrap">
        <div className="marquee-track" aria-hidden>
          {logosDup.map((name, idx) => (
            <div key={idx} className="logo-item-wrapper">
              <div className="logo-item">
                <span className="text-white/70 text-sm sm:text-base font-medium">{name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .logo-marquee { position: relative; }
        .marquee-track-wrap { overflow: hidden; }

        :root { --visible-xs: 3; --visible-md: 7; }

        .marquee-track { display: flex; align-items: center; gap: 2rem; animation: marquee ${speedSeconds}s linear infinite; will-change: transform; }
        .marquee-track:hover { animation-play-state: paused; }

        .logo-item-wrapper { flex: 0 0 calc(100% / var(--visible-xs)); box-sizing: border-box; padding: 0.25rem 0.5rem; display: flex; align-items: center; justify-content: center; min-height: 60px; }
        
        .logo-item { 
          width: 100%; 
          height: auto; 
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }

        .logo-item-wrapper:hover .logo-item {
          border-color: rgba(255,91,35,0.4);
          background: rgba(255,91,35,0.05);
        }

        @media (min-width: 640px) {
          .logo-item-wrapper { flex: 0 0 calc(100% / 5); }
          .logo-item span { font-size: 0.95rem; }
        }

        @media (min-width: 768px) {
          .logo-item-wrapper { flex: 0 0 calc(100% / var(--visible-md)); }
          .logo-item span { font-size: 1rem; }
        }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
