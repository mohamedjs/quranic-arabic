'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export interface UseAudioPlayerOptions {
  initialSpeed?: number;
  autoPlay?: boolean;
  arabicFallbackText?: string;
}

export function useAudioPlayer(src: string | null, options: UseAudioPlayerOptions = {}) {
  const { initialSpeed = 1.0, autoPlay = false, arabicFallbackText = '' } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(initialSpeed);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Playback via native SpeechSynthesis fallback
  const speakWithSpeechSynthesis = useCallback((text: string, rate: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setError('Audio playback is not supported on this device.');
      setIsPlaying(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = rate === 0.75 ? 0.75 : 1.0;

      // Pick Arabic voice if available
      const voices = window.speechSynthesis.getVoices();
      const arVoice = voices.find((v) => v.lang.startsWith('ar'));
      if (arVoice) {
        utterance.voice = arVoice;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        setError(null);
      };
      utterance.onend = () => {
        setIsPlaying(false);
      };
      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('SpeechSynthesis failed:', e);
      setIsPlaying(false);
    }
  }, []);

  // Initialize audio element
  useEffect(() => {
    if (!src) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      setIsLoaded(false);
      return;
    }

    const audio = new Audio();
    audio.src = src;
    audioRef.current = audio;
    audio.playbackRate = playbackSpeed;
    audio.preload = 'auto';

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoaded(true);
      setError(null);
      if (autoPlay) {
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      // If audio file fails (404, CORS, network), don't break; prepare to fallback
      setIsLoaded(false);
      setIsPlaying(false);
      console.warn(`Failed to load audio: ${src}. Will use speech synthesis fallback if triggered.`);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [src, autoPlay, playbackSpeed]);

  const play = useCallback(() => {
    // 1. If audio element is available and valid
    if (audioRef.current && audioRef.current.src && !audioRef.current.error) {
      audioRef.current.currentTime = 0;
      audioRef.current.playbackRate = playbackSpeed;

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setError(null);
          })
          .catch((err) => {
            console.warn('Audio play failed, falling back to speech synthesis:', err);
            if (arabicFallbackText) {
              speakWithSpeechSynthesis(arabicFallbackText, playbackSpeed);
            } else {
              setIsPlaying(false);
            }
          });
        return;
      }
    }

    // 2. Fallback to Web Speech API directly
    if (arabicFallbackText) {
      speakWithSpeechSynthesis(arabicFallbackText, playbackSpeed);
    }
  }, [playbackSpeed, arabicFallbackText, speakWithSpeechSynthesis]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const changeSpeed = useCallback((newSpeed: number) => {
    setPlaybackSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  }, []);

  return {
    isPlaying,
    isLoaded,
    playbackSpeed,
    duration,
    currentTime,
    error,
    play,
    pause,
    togglePlay,
    changeSpeed,
  };
}
