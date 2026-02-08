import { useState, useEffect } from 'react';

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
 * Hook for managing favorites
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const addFavorite = (station) => {
    setFavorites((prev) => {
      if (prev.find(s => s.id === station.id)) return prev;
      return [...prev, station];
    });
  };

  const removeFavorite = (stationId) => {
    setFavorites((prev) => prev.filter(s => s.id !== stationId));
  };

  const isFavorite = (stationId) => {
    return favorites.some(s => s.id === stationId);
  };

  const toggleFavorite = (station) => {
    if (isFavorite(station.id)) {
      removeFavorite(station.id);
    } else {
      addFavorite(station);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  };
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

  const getMostPlayed = (stations, limit = 5) => {
    return stations
      .map(station => ({
        ...station,
        playCount: getPlayCount(station.id)
      }))
      .filter(station => station.playCount > 0)
      .sort((a, b) => b.playCount - a.playCount)
      .slice(0, limit);
  };

  return {
    playCounts,
    incrementPlayCount,
    getPlayCount,
    getMostPlayed
  };
};
