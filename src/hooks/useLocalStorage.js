import { useState, useCallback } from 'react';
import { radioStations } from '../data/stations';

/**
 * Custom hook for managing localStorage with JSON serialization
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Hook for managing favorites.
 * Stores only station IDs to avoid stale data when station objects change.
 * Migrates old format (full objects) to new format (IDs) on first load.
 */
export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useLocalStorage('favoriteIds', () => {
    // Migrate old 'favorites' key (full objects) → extract IDs
    try {
      const old = window.localStorage.getItem('favorites');
      if (old) {
        const parsed = JSON.parse(old);
        if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object') {
          window.localStorage.removeItem('favorites');
          return parsed.map(s => s.id);
        }
      }
    } catch { /* ignore */ }
    return [];
  });

  const favorites = radioStations.filter(s => favoriteIds.includes(s.id));

  const isFavorite = useCallback((stationId) => favoriteIds.includes(stationId), [favoriteIds]);

  const toggleFavorite = useCallback((station) => {
    setFavoriteIds(prev =>
      prev.includes(station.id)
        ? prev.filter(id => id !== station.id)
        : [...prev, station.id]
    );
  }, [setFavoriteIds]);

  return { favorites, isFavorite, toggleFavorite };
};

/**
 * Hook for managing play counts and stats
 */
export const usePlayStats = () => {
  const [playCounts, setPlayCounts] = useLocalStorage('playCounts', {});

  const incrementPlayCount = (stationId) => {
    setPlayCounts((prev) => ({
      ...prev,
      [stationId]: (prev[stationId] || 0) + 1
    }));
  };

  const getPlayCount = (stationId) => {
    return playCounts[stationId] || 0;
  };

  const getMostPlayed = useCallback((stations, limit = 5) => {
    return stations
      .map(station => ({
        ...station,
        playCount: playCounts[station.id] || 0
      }))
      .filter(station => station.playCount > 0)
      .sort((a, b) => b.playCount - a.playCount)
      .slice(0, limit);
  }, [playCounts]);

  return {
    playCounts,
    incrementPlayCount,
    getPlayCount,
    getMostPlayed
  };
};
