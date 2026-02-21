import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterTabs, CategoryFilter } from './components/FilterTabs';
import { StationCard } from './components/StationCard';
import { MiniPlayer } from './components/MiniPlayer';
import { SleepTimerModal } from './components/SleepTimerModal';
import { EmptyState } from './components/EmptyState';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useLocalStorage, useFavorites, usePlayStats } from './hooks/useLocalStorage';
import { useSleepTimer } from './hooks/useSleepTimer';
import { useNowPlaying } from './hooks/useNowPlaying';
import { radioStations, getCategories } from './data/stations';

function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Modal state
  const [showSleepTimer, setShowSleepTimer] = useState(false);

  // Audio player hook
  const {
    play,
    pause,
    togglePlay,
    changeVolume,
    toggleMute,
    isPlaying,
    volume,
    isMuted,
    currentStation,
    isLoading,
    error,
  } = useAudioPlayer();

  // Favorites hook
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  // Play stats hook
  const { incrementPlayCount, getPlayCount, getMostPlayed } = usePlayStats();

  // Now playing metadata hook
  const nowPlaying = useNowPlaying(currentStation, isPlaying);

  // Sleep timer hook
  const sleepTimer = useSleepTimer(() => {
    pause();
  });

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Space bar shortcut for play/pause
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (currentStation) togglePlay();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentStation, togglePlay]);

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.error('Service Worker registration failed:', err));
    }
  }, []);

  // Handle station play
  const handlePlay = (station) => {
    play(station);
    incrementPlayCount(station.id);
  };

  // Random play
  const handleRandomPlay = () => {
    const randomIndex = Math.floor(Math.random() * radioStations.length);
    const randomStation = radioStations[randomIndex];
    handlePlay(randomStation);
  };

  // Filter stations based on active tab, search, and category
  const filteredStations = useMemo(() => {
    let stations = radioStations;

    // Filter by tab
    if (activeTab === 'favorites') {
      stations = favorites;
    } else if (activeTab === 'most-played') {
      stations = getMostPlayed(radioStations, 10);
    }

    // Filter by search
    if (searchQuery) {
      stations = stations.filter(station =>
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      stations = stations.filter(station => station.category === selectedCategory);
    }

    return stations;
  }, [activeTab, searchQuery, selectedCategory, favorites, getMostPlayed]);

  // Get categories for filter
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      {/* Header */}
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-32">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
          />
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <FilterTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            favoritesCount={favorites.length}
          />
        </div>

        {/* Category Filter */}
        {activeTab === 'all' && (
          <div className="mb-6">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-red-700 dark:text-red-400 text-sm">
              {error}
            </p>
          </div>
        )}

        {/* Stations Grid */}
        {filteredStations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredStations.map((station) => (
              <StationCard
                key={station.id}
                station={station}
                isPlaying={isPlaying}
                isCurrentStation={currentStation?.id === station.id}
                isFavorite={isFavorite(station.id)}
                playCount={getPlayCount(station.id)}
                onPlay={handlePlay}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            type={
              activeTab === 'favorites' 
                ? 'favorites' 
                : activeTab === 'most-played'
                ? 'mostPlayed'
                : 'search'
            } 
          />
        )}
      </main>

      {/* Mini Player */}
      <MiniPlayer
        currentStation={currentStation}
        isPlaying={isPlaying}
        isLoading={isLoading}
        volume={volume}
        isMuted={isMuted}
        nowPlaying={nowPlaying}
        onTogglePlay={togglePlay}
        onVolumeChange={changeVolume}
        onToggleMute={toggleMute}
        onRandomPlay={handleRandomPlay}
        onOpenSleepTimer={() => setShowSleepTimer(true)}
        sleepTimerActive={sleepTimer.isActive}
        sleepTimerFormatted={sleepTimer.formatTime(sleepTimer.timeLeft)}
      />

      {/* Sleep Timer Modal */}
      <SleepTimerModal
        isOpen={showSleepTimer}
        onClose={() => setShowSleepTimer(false)}
        onStartTimer={sleepTimer.startTimer}
        isActive={sleepTimer.isActive}
        timeLeft={sleepTimer.timeLeft}
        formatTime={sleepTimer.formatTime}
        onStopTimer={sleepTimer.stopTimer}
      />
    </div>
  );
}

export default App;
