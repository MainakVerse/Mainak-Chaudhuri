'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentPhraseIndex, setPhraseIndex] = useState(0);

  // Overlay states for movie trailer effect
  const [showIntro, setShowIntro] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const router = useRouter();

  // Movie trailer scenes
  const scenes = [
    { id: 0, text: "Welcome", stay: 3000 },
    { id: 1, text: "To the profile of the Mysterious Polymath", stay: 3000 },
    { id: 2, text: "Be ready for the Game", stay: 3000 },
  ];

  // Scrolling phrases (not rendered yet, but available)
  const phrases = ["Data Engineer", "AI Engineer", "ML Engineer", "MERN Stack Dev"];

  // Code text for right lens (reserved for expansion)
  const codeLines = [
    "function detectGesture() {",
    "  const hand = camera.track();",
    "  if (hand.gesture === 'tap') {",
    "    executeCommand();",
    "  }",
    "  return processFrame();",
    "}"
  ];

  // Typewriter effect hook
  const useTypewriter = (text: string, speed = 80) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
      setDisplayedText("");
      setCurrentIndex(0);
      setIsComplete(false);
      setIsTyping(true);
      setShowCursor(true);
    }, [text]);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
      } else {
        setIsComplete(true);
        setIsTyping(false);
        // Keep cursor visible for a moment after typing completes
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, [currentIndex, text, speed]);

    return { displayedText, isComplete };
  };

  // Three.js background
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // 🌊 Fabric mesh
    const geometry = new THREE.PlaneGeometry(20, 20, 50, 50);
    const material = new THREE.MeshBasicMaterial({
      color: 0x0066cc,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 🌄 Static mountain skyline
    const mountainGeo = new THREE.PlaneGeometry(40, 10, 100, 10);
    const mountainMat = new THREE.MeshBasicMaterial({
      color: 0x0066cc,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    const mountainMesh = new THREE.Mesh(mountainGeo, mountainMat);

    // Shape the skyline
    const mPositions = mountainGeo.attributes.position;
    for (let i = 0; i < mPositions.count; i++) {
      const x = mPositions.getX(i);
      const y = mPositions.getY(i);
      if (y > 0) {
        const peakHeight = Math.sin(x * 0.3) * 2 + Math.random() * 1.5;
        mPositions.setZ(i, peakHeight);
      }
    }
    mPositions.needsUpdate = true;

    mountainMesh.rotation.x = -Math.PI / 2.5;
    mountainMesh.position.y = -5;
    mountainMesh.position.z = -5;
    scene.add(mountainMesh);

    camera.position.z = 10;

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);

      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.005;

      const positions = mesh.geometry.attributes.position;
      const time = Date.now() * 0.002;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 0.5;
        positions.setZ(i, z);
      }
      positions.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Phrase rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  // Get current scene text for typewriter
  const currentSceneText = scenes[sceneIndex]?.text || "";
  const { displayedText: typedText, isComplete: typingComplete } = useTypewriter(
    showIntro ? currentSceneText : "", 
    sceneIndex === 0 ? 120 : 60 // Slower typing for first scene
  );

  // Movie trailer sequence management
  useEffect(() => {
    if (!showIntro) return;

    const scene = scenes[sceneIndex];
    if (!scene) return;

    // Fade in the container
    setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Wait for typing to complete plus stay duration, then transition
    let transitionTimeout: NodeJS.Timeout;
    
    const checkTransition = () => {
      if (typingComplete) {
        transitionTimeout = setTimeout(() => {
          setIsVisible(false);
          
          // After fade out, move to next scene or navigate
          setTimeout(() => {
            if (sceneIndex < scenes.length - 1) {
              setSceneIndex(prev => prev + 1);
            } else {
              // All scenes done, navigate to lobby
              router.push("/lobby");
            }
          }, 800); // Wait for fade out animation
          
        }, scene.stay);
      } else {
        // Check again in 100ms if typing isn't complete
        setTimeout(checkTransition, 100);
      }
    };

    checkTransition();

    return () => {
      if (transitionTimeout) clearTimeout(transitionTimeout);
    };
  }, [sceneIndex, showIntro, typingComplete, router]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-500/5 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-9xl font-bold bg-gradient-to-r from-cyan-200 via-purple-400 to-cyan-200 bg-clip-text text-transparent mb-6 animate-pulse font-orbitron">
            MAINAK VERSE
          </h1>

          {/* Explore button */}
          {!showIntro && (
            <button
              onClick={() => setShowIntro(true)}
              className="relative mt-8 px-8 py-3 text-lg font-bold rounded-xl 
                         bg-gradient-to-r from-green-400 via-green-500 to-green-600 
                         text-black shadow-lg 
                         transition-transform duration-300 ease-in-out 
                         hover:scale-110 hover:shadow-[0_0_20px_rgba(34,197,94,0.8)] 
                         hover:from-green-500 hover:to-green-400"
            >
              <span className="relative z-10">Explore</span>
              <span className="absolute inset-0 rounded-xl animate-pulse bg-green-400 opacity-20"></span>
            </button>
          )}
        </div>
      </div>

      {/* Floating Elements */}
      <div
        className="absolute top-20 left-10 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-40 right-20 w-3 h-3 bg-purple-400/30 rounded-full animate-bounce"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-40 left-20 w-5 h-5 bg-blue-400/30 rounded-full animate-bounce"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-20 right-10 w-2 h-2 bg-green-400/30 rounded-full animate-bounce"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Cinematic Movie Trailer Overlay */}
      {showIntro && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-black to-gray-900/20"></div>
          
          {/* Ambient light effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
       
          {/* Main text container */}
<div className="relative z-10 text-center px-8 max-w-4xl">
  <div
    className={`transition-all duration-1000 ease-in-out ${
      isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-8 scale-95"
    }`}
  >
    <div className="relative">
      <p
        className="text-white text-3xl md:text-5xl lg:text-6xl font-bold font-orbitron 
                   drop-shadow-2xl tracking-wide leading-relaxed min-h-[1.2em]"
      >
        <span className="bg-gradient-to-r from-green-300 via-white to-green-300 bg-clip-text text-transparent">
          {/* Directly show scene text (no typewriter) */}
          {currentSceneText}
        </span>
      </p>

      {/* Dramatic glow effect under text */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/20 to-transparent 
                   blur-2xl transform translate-y-4"
      ></div>
    </div>
  </div>
</div>

          
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent 
                           transform -skew-x-12 animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;