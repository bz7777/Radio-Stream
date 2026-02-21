import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for managing radio audio playback
 * Handles play/pause, volume, metadata, and stream errors
 */
export const useAudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('volume');
    return saved !== null ? parseFloat(saved) : 0.7;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [currentStation, setCurrentStation] = useState(null);
  const [metadata, setMetadata] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize audio element once on mount
  useEffect(() => {
    const audio = new Audio();
    audio.volume = parseFloat(localStorage.getItem('volume') ?? '0.7');
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setError(null);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    const handleError = (e) => {
      console.error('Audio error:', e);
      setError('Transmetimi dështoi. Provo përsëri.');
      setIsLoading(false);
      setIsPlaying(false);
    };

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Update Media Session metadata when station changes
  useEffect(() => {
    if (!currentStation) return;
    try {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: currentStation.name,
          artist: metadata || 'Live Radio',
          artwork: currentStation.logo
            ? [{ src: currentStation.logo, sizes: '512x512', type: 'image/png' }]
            : [],
        });
      }
    } catch (err) {
      console.error('MediaSession error:', err);
    }
  }, [currentStation, metadata]);

  // Play station
  const play = useCallback(async (station) => {
    if (!audioRef.current || !station) return;

    try {
      setError(null);
      setIsLoading(true);
      
      // If same station, just resume
      if (currentStation?.id === station.id && audioRef.current.src) {
        await audioRef.current.play();
        return;
      }

      // Load new station
      setCurrentStation(station);
      audioRef.current.src = station.streamUrl;
      audioRef.current.load();
      await audioRef.current.play();

      // Save last played station
      localStorage.setItem('lastPlayedStation', JSON.stringify(station));
    } catch (err) {
      console.error('Playback error:', err);
      setError('Transmetimi dështoi. Provo përsëri.');
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, [currentStation]);

  // Pause playback
  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else if (currentStation) {
      play(currentStation);
    }
  }, [isPlaying, currentStation, play, pause]);

  // Change volume
  const changeVolume = useCallback((newVolume) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      localStorage.setItem('volume', newVolume);
      if (newVolume > 0) setIsMuted(false);
    }
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  // Handle visibility change (keep playing in background)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying && audioRef.current) {
        // Keep playing in background
        audioRef.current.play().catch(err => console.error('Background play error:', err));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  return {
    play,
    pause,
    togglePlay,
    changeVolume,
    toggleMute,
    isPlaying,
    volume,
    isMuted,
    currentStation,
    metadata,
    isLoading,
    error,
    setMetadata
  };
};
