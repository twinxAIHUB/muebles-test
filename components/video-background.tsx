"use client"

import { useEffect, useRef } from "react"

interface VideoBackgroundProps {
  src: string
  poster?: string
}

export function VideoBackground({ src, poster }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Reproducir automáticamente cuando sea posible
    const playVideo = () => {
      video.play().catch((error) => {
        console.log("Reproducción automática no permitida:", error)
      })
    }

    playVideo()

    // Intentar reproducir cuando el usuario interactúa con la página
    const handleInteraction = () => {
      playVideo()
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
    }

    document.addEventListener("click", handleInteraction)
    document.addEventListener("touchstart", handleInteraction)

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
    }
  }, [])

  return (
    <video ref={videoRef} className="video-background" autoPlay muted loop playsInline poster={poster}>
      <source src={src} type="video/mp4" />
      Tu navegador no soporta videos HTML5.
    </video>
  )
}
