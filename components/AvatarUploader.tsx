 'use client'

import { useRef, useState, useEffect } from 'react'

export default function AvatarUploader({ userId }: { userId: string }) {
  const [src, setSrc] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(`user_image_${userId}`)
    if (saved) setSrc(saved)
  }, [userId])

  const onFile = (file: File | null) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setSrc(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    last.current = { x: e.clientX, y: e.clientY }
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y
    last.current = { x: e.clientX, y: e.clientY }
    setPos((p) => ({ x: p.x + dx, y: p.y + dy }))
  }
  const handleMouseUp = () => { dragging.current = false }

  const saveCropped = () => {
    if (!src) return
    const img = new Image()
    img.src = src
    img.onload = () => {
      // increase saved avatar resolution for higher quality exports
      const size = 512
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')!
      // draw scaled image centered according to pos
      const iw = img.width * scale
      const ih = img.height * scale
      // center position adjustments
      const cx = (canvas.width - iw) / 2 + pos.x
      const cy = (canvas.height - ih) / 2 + pos.y
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, size, size)
      ctx.drawImage(img, cx, cy, iw, ih)
      // encode at full quality
      const data = canvas.toDataURL('image/png')
      localStorage.setItem(`user_image_${userId}`, data)
      setSrc(data)
      alert('Avatar saved')
    }
  }

  return (
    <div className="space-y-3">
      <div className="w-32 h-32 rounded-full overflow-hidden bg-white/5 border border-white/10 relative" ref={containerRef}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        {src ? (
          <img src={src} style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`, cursor: 'grab' }} alt="avatar" />
        ) : (
          <div className="flex items-center justify-center h-full text-white/60">No image</div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
        <input type="range" min="0.5" max="2" step="0.01" value={scale} onChange={(e) => setScale(Number(e.target.value))} />
      </div>

      <div className="flex gap-2">
        <button onClick={() => { setPos({ x: 0, y: 0 }); setScale(1); }} className="px-3 py-1 bg-white/5 rounded">Reset</button>
        <button onClick={saveCropped} className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded">Save Avatar</button>
      </div>
    </div>
  )
}
