// app/components/MusicWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import MusicPlayer from "./music";

export default function MusicWrapper() {
  const pathname = usePathname();

  // Only show music on home page
  if (pathname !== "/") return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <MusicPlayer />
    </div>
  );
}
