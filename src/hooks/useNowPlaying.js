import { useState, useEffect, useRef } from 'react';

const POLL_INTERVAL_MS = 20000; // poll every 20 seconds

// Generic placeholder titles that stations broadcast when no real metadata exists
const PLACEHOLDERS = ['station online', 'live', 'stream online', 'online'];

const isPlaceholder = (title) =>
  !title || PLACEHOLDERS.includes(title.toLowerCase().trim());

const parseNowPlaying = (data, type, mount) => {
  try {
    if (type === 'azuracast') {
      const song = data?.now_playing?.song;
      if (!song?.title || isPlaceholder(song.title)) return null;
      return song.artist ? `${song.artist} - ${song.title}` : song.title;
    }

    if (type === 'icecast') {
      let sources = data?.icestats?.source;
      if (!sources) return null;
      if (!Array.isArray(sources)) sources = [sources];
      const source = sources.find(s =>
        mount ? s.listenurl?.includes(mount) : true
      ) || sources[0];
      return source?.title || null;
    }
  } catch {
    return null;
  }
  return null;
};

/**
 * Polls a station's metadata endpoint and returns the currently playing song string.
 * Returns null when the station has no metadataUrl or on network/CORS errors.
 */
export const useNowPlaying = (station, isPlaying) => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!station?.metadataUrl || !isPlaying) {
      setNowPlaying(null);
      return;
    }

    const fetch_metadata = async () => {
      try {
        const res = await fetch(station.metadataUrl);
        if (!res.ok) return;
        const data = await res.json();
        const title = parseNowPlaying(data, station.metadataType, station.metadataMount);
        setNowPlaying(title);
      } catch {
        // CORS or network error — silently ignore
      }
    };

    fetch_metadata();
    intervalRef.current = setInterval(fetch_metadata, POLL_INTERVAL_MS);

    return () => clearInterval(intervalRef.current);
  }, [station?.id, isPlaying]);

  return nowPlaying;
};
