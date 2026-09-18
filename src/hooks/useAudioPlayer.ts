'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export interface UseAudioPlayerOptions {
  initialSpeed?: number;
  autoPlay?: boolean;
}

export function useAudioPlayer(src: string | null, options: UseAudioPlayerOptions = {}) {
  const { initialSpeed = 1.0, autoPlay = false } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(initialSpeed);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize or update audio instance
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

    const audio = new Audio(src);
    audioRef.current = audio;
    audio.playbackRate = playbackSpeed;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
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
      setError('Unable to load recitation audio.');
      setIsPlaying(false);
      setIsLoaded(false);
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
  }, [src, autoPlay]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.warn('Playback error:', e);
          setIsPlaying(false);
        });
    }
  }, [playbackSpeed]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
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
