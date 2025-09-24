'use client';
import React, { useState } from "react";
import HeroSection from "@/components/hero";
import NeonPreloader from "@/components/preloader";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <NeonPreloader onComplete={() => setIsLoaded(true)} />
      )}
      {isLoaded && <HeroSection />}
    </>
  );
}
