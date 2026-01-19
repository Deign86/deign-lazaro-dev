"use client"
import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"

interface Pixel {
  id: number
  x: number
  y: number
  opacity: number
  age: number
}

const PIXEL_SIZE = 12
const TRAIL_LENGTH = 40
const FADE_SPEED = 0.04

interface PixelCursorTrailProps {
  /** Whether to show the trail as a fixed fullscreen background */
  fullscreen?: boolean
  /** Custom className for the container */
  className?: string
  /** Whether to hide the default cursor */
  hideCursor?: boolean
  /** Show helper text */
  showHelper?: boolean
}

export function PixelCursorTrail({ 
  fullscreen = false, 
  className = "",
  hideCursor = false,
  showHelper = false,
}: PixelCursorTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pixels, setPixels] = useState<Pixel[]>([])
  const pixelIdRef = useRef(0)
  const lastPositionRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)

  const createPixel = useCallback((x: number, y: number) => {
    return {
      id: pixelIdRef.current++,
      x,
      y,
      opacity: 1,
      age: 0,
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const dx = x - lastPositionRef.current.x
      const dy = y - lastPositionRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > PIXEL_SIZE) {
        const newPixel = createPixel(x, y)
        setPixels((prev) => [...prev.slice(-TRAIL_LENGTH), newPixel])
        lastPositionRef.current = { x, y }
      }
    },
    [createPixel],
  )

  useEffect(() => {
    const animate = () => {
      setPixels((prev) =>
        prev
          .map((pixel) => ({
            ...pixel,
            opacity: pixel.opacity - FADE_SPEED,
            age: pixel.age + 1,
          }))
          .filter((pixel) => pixel.opacity > 0),
      )
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const baseClasses = fullscreen 
    ? "fixed inset-0 w-screen h-screen overflow-hidden select-none pointer-events-auto z-0"
    : "absolute inset-0 w-full h-full overflow-hidden select-none"

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`${baseClasses} ${hideCursor ? 'cursor-none' : ''} ${className}`}
    >
      {pixels.map((pixel) => {
        // Calculate size based on age - older pixels are smaller
        const sizeMultiplier = Math.max(0.3, 1 - pixel.age / 100)
        const currentSize = PIXEL_SIZE * sizeMultiplier

        return (
          <div
            key={pixel.id}
            className="absolute pointer-events-none bg-foreground"
            style={{
              left: pixel.x - currentSize / 2,
              top: pixel.y - currentSize / 2,
              width: currentSize,
              height: currentSize,
              opacity: pixel.opacity * 0.6,
              transition: "width 0.1s ease-out, height 0.1s ease-out",
            }}
          />
        )
      })}
      {showHelper && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-foreground/20">Move cursor</span>
        </div>
      )}
    </div>
  )
}
