import React, { useState, useEffect } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

const NeonPreloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-50 font-[var(--font-orbitron)]">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="grid grid-cols-12 grid-rows-12 w-full h-full gap-px">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="bg-cyan-500/5 animate-pulse"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Loader Content */}
      <div className="relative z-10 text-center">
        {/* Neon Logo/Title */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4 relative">
            LOADING
          </h1>

          {/* Loading text animation */}
          <div className="text-cyan-300 text-lg mb-8">
            <span className="animate-pulse">Initializing</span>
            <span className="animate-bounce">.</span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              .
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
              .
            </span>
          </div>
        </div>

        {/* Neon Loading Bar */}
        <div className="relative w-80 md:w-96 mx-auto mb-8">
          {/* Background bar */}
          <div className="w-full h-2 bg-gray-800 rounded-full border border-cyan-500/30 overflow-hidden">
            {/* Progress fill */}
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full transition-all duration-300 relative"
              style={{ width: `${Math.min(loadingProgress, 100)}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>

          {/* Glow effects */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-md rounded-full"
            style={{ width: `${Math.min(loadingProgress, 100)}%` }}
          />

          {/* Progress percentage */}
          <div className="text-center mt-4 text-cyan-300 text-sm">
            {Math.round(loadingProgress)}%
          </div>
        </div>

        {/* Orbiting Elements */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Center core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />
          </div>

          {/* Orbiting rings */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-cyan-400/30 rounded-full animate-spin"
              style={{
                animationDuration: `${3 + i * 2}s`,
                animationDelay: `${i * 0.5}s`,
                transform: `scale(${0.3 + i * 0.3})`,
              }}
            >
              <div className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full -top-1 left-1/2 transform -translate-x-1/2" />
            </div>
          ))}
        </div>

        {/* Binary Rain Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-cyan-400/60 text-xs animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: "4s",
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </div>
          ))}
        </div>

        {/* Status Messages */}
        <div className="text-cyan-400/80 text-sm space-y-1">
          {loadingProgress > 20 && (
            <div className="animate-fadeIn">Loading resources...</div>
          )}
          {loadingProgress > 50 && (
            <div className="animate-fadeIn">Initializing systems...</div>
          )}
          {loadingProgress > 80 && (
            <div className="animate-fadeIn">Almost ready...</div>
          )}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50" />
    </div>
  );
};

export default NeonPreloader;
