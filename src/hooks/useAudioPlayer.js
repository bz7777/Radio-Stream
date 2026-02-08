import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for managing radio audio playback
 * Handles play/pause, volume, metadata, and stream errors
 */
export const useAudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStation, setCurrentStation] = useState(null);
  const [metadata, setMetadata] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    audioRef.current.crossOrigin = "anonymous";

    // Event listeners for audio state
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
      setError('Failed to load stream');
      setIsLoading(false);
      setIsPlaying(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    // Metadata handling (for Icecast/Shoutcast streams)
    const handleMetadata = () => {
      try {
        if ('mediaSession' in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: currentStation?.name || 'Radio Stream',
            artist: metadata || 'Live Radio',
            artwork: [
              { src: currentStation?.logo || '', sizes: '512x512', type: 'image/png' }
            ]
          });
        }
      } catch (err) {
        console.error('MediaSession error:', err);
      }
    };

    audioRef.current.addEventListener('play', handlePlay);
    audioRef.current.addEventListener('pause', handlePause);
    audioRef.current.addEventListener('error', handleError);
    audioRef.current.addEventListener('loadstart', handleLoadStart);
    audioRef.current.addEventListener('canplay', handleCanPlay);
    audioRef.current.addEventListener('loadedmetadata', handleMetadata);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.removeEventListener('loadstart', handleLoadStart);
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('loadedmetadata', handleMetadata);
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
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
      setError('Failed to play station');
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
