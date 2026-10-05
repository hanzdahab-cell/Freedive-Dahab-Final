import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { storyConfig } from '../../config/storyConfig';

export function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSoundAvailable, setHasSoundAvailable] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  const audioSrc = storyConfig.media.audio?.src || '/ambient-ocean.mp3';

  // Toggle audio
  const handleToggle = async () => {
    if (isPlaying) {
      // Pause
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthCtxRef.current && synthCtxRef.current.state === 'running') {
        synthCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      // Try playing audio file first
      try {
        if (!audioRef.current) {
          const audio = new Audio(audioSrc);
          audio.loop = true;
          audio.volume = 0.35;
          audioRef.current = audio;
        }

        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        // Fallback: gentle web audio synth ocean swell
        try {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (!synthCtxRef.current && AudioContextClass) {
            const ctx = new AudioContextClass();
            synthCtxRef.current = ctx;

            // Generate soft filtered ambient noise
            const bufferSize = ctx.sampleRate * 2;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const output = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
              output[i] = Math.random() * 2 - 1;
            }

            const whiteNoise = ctx.createBufferSource();
            whiteNoise.buffer = buffer;
            whiteNoise.loop = true;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(320, ctx.currentTime);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.04, ctx.currentTime);

            whiteNoise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            whiteNoise.start(0);
            noiseNodeRef.current = whiteNoise;
          }

          if (synthCtxRef.current && synthCtxRef.current.state === 'suspended') {
            await synthCtxRef.current.resume();
          }
          setIsPlaying(true);
        } catch (synthErr) {
          setHasSoundAvailable(false);
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthCtxRef.current) {
        synthCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  if (!hasSoundAvailable) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        type="button"
        onClick={handleToggle}
        title={isPlaying ? 'Mute ambient ocean' : 'Play ambient ocean sound'}
        aria-label={isPlaying ? 'Mute ambient ocean sound' : 'Play ambient ocean sound'}
        className="group flex items-center gap-2.5 px-3 py-2 rounded-full bg-slate-950/70 border border-white/10 hover:border-[#2EC4B6]/50 backdrop-blur-xl shadow-lg transition-all duration-300 text-slate-300 hover:text-white cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-[#2EC4B6] animate-pulse" />
            <span className="hidden sm:inline text-[11px] font-mono tracking-wider uppercase text-cyan-200">
              Ocean Audio ON
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
            <span className="hidden sm:inline text-[11px] font-mono tracking-wider uppercase text-slate-400 group-hover:text-slate-200">
              Ocean Audio
            </span>
          </>
        )}
      </button>
    </div>
  );
}
