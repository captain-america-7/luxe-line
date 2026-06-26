"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);

  const initAudioContext = () => {
    if (audioContextRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;

      if (audioRef.current) {
        // Configure crossOrigin to prevent CORS issues with Web Audio API
        audioRef.current.crossOrigin = "anonymous";
        const source = audioCtx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        audioContextRef.current = audioCtx;
        analyserRef.current = analyser;
        sourceRef.current = source;
      }
    } catch {
      console.warn("Web Audio API is not fully supported in this browser.");
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      initAudioContext();
      
      // Resume AudioContext if suspended (browser security)
      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }

      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setAudioError(false);
        })
        .catch((err) => {
          console.error("Audio playback failed: ", err);
          setAudioError(true);
        });
    }
  };

  // Draw visualizer wave
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isDark = document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDark ? "#C7A46C" : "#4A3525"; // gold or walnut

      const barWidth = 3;
      const gap = 2;
      const barCount = 6;
      
      if (isPlaying && analyserRef.current) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        for (let i = 0; i < barCount; i++) {
          // Map frequency data to height
          const percent = dataArray[i] / 255;
          const height = Math.max(3, percent * canvas.height);
          const x = i * (barWidth + gap);
          const y = canvas.height - height;
          ctx.fillRect(x, y, barWidth, height);
        }
      } else {
        // Draw static wave
        for (let i = 0; i < barCount; i++) {
          const x = i * (barWidth + gap);
          ctx.fillRect(x, canvas.height - 3, barWidth, 3);
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="flex items-center gap-3">
      {/* Visualizer Canvas */}
      <canvas
        ref={canvasRef}
        width={28}
        height={18}
        className="opacity-75 transition-opacity duration-300 pointer-events-none"
      />

      <button
        onClick={togglePlay}
        className="flex items-center justify-center p-2 rounded-full border border-gold/30 hover:border-gold/70 bg-transparent text-gold hover:text-gold-hover hover:scale-105 transition-all duration-300"
        title={isPlaying ? "Mute Background Music" : "Play Ambient Music"}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </button>

      {/* Premium smooth chill lounge loop */}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
        loop
        preload="none"
      />

      {audioError && (
        <span className="text-[10px] text-red-500 uppercase tracking-widest hidden lg:inline">
          Audio blocked by browser. Click play to listen.
        </span>
      )}
    </div>
  );
}
