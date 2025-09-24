"use client"; // must be first line

import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";

export default function MusicPlayer() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && (pathname === "/" || pathname === "/lobby")) {
      audioRef.current.play().catch(() => {});
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [pathname]);

  // Only render audio on "/" and "/lobby"
  if (!(pathname === "/" || pathname === "/lobby")) return null;

  return (
    <audio
      ref={audioRef}
      src="/music/background.mp3"
      autoPlay
      loop
      controls={false}
    />
  );
}
