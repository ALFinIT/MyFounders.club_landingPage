"use client"

import { useEffect, useRef } from "react"

export default function GridBackground() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}px`)
      document.documentElement.style.setProperty("--y", `${e.clientY}px`)

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener("mousemove", handleMove)
    
    return () => {
      window.removeEventListener("mousemove", handleMove)
    }
  }, [])

  return (
    <>
      {/* Matte black background base - lowest layer */}
      <div
        className="fixed inset-0 -z-30 pointer-events-none"
        style={{
          backgroundColor: '#0f0f0f',
        }}
      />

      {/* Static dim orange grid background above black base */}
      <div
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,106,0,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,106,0,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          backgroundPosition: '0 0',
        }}
      />

      {/* Vertical Comets - falling down */}
      <div
        className="fixed inset-0 -z-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, transparent 0%, rgba(255,106,0,0.08) 40%, rgba(255,106,0,0.25) 70%, #ff6a00 90%, #ffae00 96%, #ffffff 100%),
            linear-gradient(to bottom, transparent 0%, rgba(255,106,0,0.08) 40%, rgba(255,106,0,0.25) 70%, #ff6a00 90%, #ffae00 96%, #ffffff 100%),
            linear-gradient(to bottom, transparent 0%, rgba(255,106,0,0.08) 40%, rgba(255,106,0,0.25) 70%, #ff6a00 90%, #ffae00 96%, #ffffff 100%),
            linear-gradient(to bottom, transparent 0%, rgba(255,106,0,0.08) 40%, rgba(255,106,0,0.25) 70%, #ff6a00 90%, #ffae00 96%, #ffffff 100%),
            linear-gradient(to bottom, transparent 0%, rgba(255,106,0,0.08) 40%, rgba(255,106,0,0.25) 70%, #ff6a00 90%, #ffae00 96%, #ffffff 100%),
            linear-gradient(to bottom, transparent 0%, rgba(255,106,0,0.08) 40%, rgba(255,106,0,0.25) 70%, #ff6a00 90%, #ffae00 96%, #ffffff 100%)
          `,
          backgroundSize: '2px 160px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '100px -150px, 300px -420px, 500px -260px, 700px -780px, 900px -510px, 1100px -900px',
          animation: 'fall 7.5s linear infinite',
        }}
      />

      {/* Horizontal Comets - sliding left to right */}
      <div
        className="fixed inset-0 -z-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, transparent 0%, rgba(255,106,0,0.08) 40%, rgba(255,106,0,0.25) 70%, #ff6a00 90%, #ffae00 96%, #ffffff 100%),
            linear-gradient(to right, transparent 0%, rgba(255,106,0,0.08) 40%, rgba(255,106,0,0.25) 70%, #ff6a00 90%, #ffae00 96%, #ffffff 100%),
            linear-gradient(to right, transparent 0%, rgba(255,106,0,0.08) 40%, rgba(255,106,0,0.25) 70%, #ff6a00 90%, #ffae00 96%, #ffffff 100%),
            linear-gradient(to right, transparent 0%, rgba(255,106,0,0.08) 40%, rgba(255,106,0,0.25) 70%, #ff6a00 90%, #ffae00 96%, #ffffff 100%),
            linear-gradient(to right, transparent 0%, rgba(255,106,0,0.08) 40%, rgba(255,106,0,0.25) 70%, #ff6a00 90%, #ffae00 96%, #ffffff 100%),
            linear-gradient(to right, transparent 0%, rgba(255,106,0,0.08) 40%, rgba(255,106,0,0.25) 70%, #ff6a00 90%, #ffae00 96%, #ffffff 100%)
          `,
          backgroundSize: '160px 2px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '-250px 200px, -600px 400px, -150px 600px, -800px 800px, -450px 1000px, -900px 1200px',
          animation: 'slide 9.2s linear infinite',
        }}
      />

      {/* Subtle radial glow following cursor */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(320px at var(--x) var(--y), rgba(255,90,0,0.15), transparent 65%)',
        }}
      />

      {/* Custom + cursor following mouse */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          width: '24px',
          height: '24px',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#ff6a00',
          textShadow: '0 0 8px #ff6a00, 0 0 16px rgba(255, 106, 0, 0.6)',
        }}
      >
        +
      </div>

      {/* Keyframe animations */}
      <style jsx global>{`
        @keyframes fall {
          to {
            background-position: 100px 120vh, 300px 120vh, 500px 120vh, 700px 120vh, 900px 120vh, 1100px 120vh;
          }
        }
        @keyframes slide {
          to {
            background-position: 120vw 200px, 120vw 400px, 120vw 600px, 120vw 800px, 120vw 1000px, 120vw 1200px;
          }
        }
      `}</style>
    </>
  )
}
