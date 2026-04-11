"use client"

import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

interface StickerMarker {
  id: string
  location: [number, number]
  sticker: string
}

interface ProjectGlobeProps {
  markers?: StickerMarker[]
  className?: string
  speed?: number
}

// Project locations based on Featured Projects
const projectMarkers: StickerMarker[] = [
  { id: "florida", location: [27.66, -81.51], sticker: "✈️" },
  { id: "seattle", location: [47.60, -122.33], sticker: "🛩️" },
  { id: "mauritius", location: [-20.34, 57.55], sticker: "🏦" },
  { id: "virginia", location: [37.43, -78.65], sticker: "💻" },
  { id: "india", location: [28.61, 77.21], sticker: "🎓" },
  { id: "dubai", location: [25.20, 55.27], sticker: "🌍" },
  { id: "colorado", location: [39.73, -104.99], sticker: "⚙️" },
]

export function ProjectGlobe({
  markers = projectMarkers,
  className = "",
  speed = 0.003,
}: ProjectGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let phi = 0
    let inView = true
    let intersectionObserver: IntersectionObserver | null = null

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      // Detect low-end devices for cheaper globe settings.
      const isLowEnd =
        window.matchMedia("(pointer: coarse)").matches ||
        (navigator as any).hardwareConcurrency <= 4 ||
        window.innerWidth < 768
      const dpr = Math.min(window.devicePixelRatio || 1, isLowEnd ? 1.5 : 2)
      const mapSamples = isLowEnd ? 8000 : 16000
      const renderScale = isLowEnd ? 1.5 : 2

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * renderScale,
        height: width * renderScale,
        phi: 0,
        theta: 0.2,
        dark: 0,
        diffuse: 1.5,
        mapSamples,
        mapBrightness: 8,
        baseColor: [1, 1, 1],
        markerColor: [0.85, 0.35, 0.6],
        glowColor: [0.94, 0.93, 0.91],
        markers: markers.map((m) => ({ location: m.location, size: 0.06 })),
      })

      function animate() {
        if (inView && !isPausedRef.current) phi += speed
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
        })
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))

      // Skip advancing phi when the globe is scrolled out of view.
      intersectionObserver = new IntersectionObserver(
        (entries) => { inView = entries[0]?.isIntersecting ?? true },
        { rootMargin: "100px" }
      )
      intersectionObserver.observe(canvas)
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (intersectionObserver) intersectionObserver.disconnect()
      if (globe) globe.destroy()
    }
  }, [markers, speed])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="sticker-outline">
            <feMorphology in="SourceAlpha" result="Dilated" operator="dilate" radius="2" />
            <feFlood floodColor="#ffffff" result="OutlineColor" />
            <feComposite in="OutlineColor" in2="Dilated" operator="in" result="Outline" />
            <feMerge>
              <feMergeNode in="Outline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
      {markers.map((m, i) => (
        <div
          key={m.id}
          style={{
            position: "absolute",
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            fontSize: "1.5rem",
            lineHeight: 1,
            transform: `rotate(${[-8, 6, -4, 10, -6, 8, -10][i % 7]}deg)`,
            filter: "url(#sticker-outline) drop-shadow(0 2px 3px rgba(0,0,0,0.3))",
            pointerEvents: "none" as const,
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            transition: "opacity 0.2s, filter 0.2s",
          } as React.CSSProperties}
        >
          {m.sticker}
        </div>
      ))}

      {/* Legend */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] text-muted-foreground whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span>7+ Global Clients</span>
      </div>
    </div>
  )
}
