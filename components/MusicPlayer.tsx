"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react"; // optional icons

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center justify-center">
      <audio ref={audioRef} src="/music/song.mp3" preload="auto" loop />
      <button
        onClick={togglePlay}
        className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </div>
  );
}
