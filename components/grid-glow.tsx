'use client'

export function GridGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Grid background with hot orange */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 140, 0, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 140, 0, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Top-left glow - hot orange */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(255, 140, 0, 0.6) 0%, rgba(255, 100, 0, 0.3) 50%, transparent 100%)',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />
      
      {/* Bottom-right glow - hot orange */}
      <div 
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(255, 120, 0, 0.5) 0%, rgba(255, 80, 0, 0.2) 50%, transparent 100%)',
          animation: 'pulse 5s ease-in-out infinite 1s',
        }}
      />
      
      {/* Center glow - subtle hot orange */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 140, 0, 0.3) 0%, transparent 70%)',
          animation: 'pulse 6s ease-in-out infinite 0.5s',
        }}
      />
    </div>
  )
}
