import { Play, Pause, Volume2, VolumeX, Shuffle, Timer } from 'lucide-react';
import { Equalizer } from './Equalizer';

/**
 * Mini player - sticky bottom player component
 */
export const MiniPlayer = ({
  currentStation,
  isPlaying,
  isLoading,
  volume,
  isMuted,
  nowPlaying,
  onTogglePlay,
  onVolumeChange,
  onToggleMute,
  onRandomPlay,
  onOpenSleepTimer,
  sleepTimerActive,
  sleepTimerFormatted
}) => {
  if (!currentStation) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-2xl backdrop-blur-lg bg-opacity-95 dark:bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Mobile Layout */}
        <div className="flex items-center gap-4">
          {/* Station Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Station Logo */}
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-lg flex items-center justify-center">
                {currentStation.logo ? (
                  <img
                    src={currentStation.logo}
                    alt={currentStation.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <span className="text-2xl">📻</span>
                )}
              </div>
              {isPlaying && (
                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1 shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              )}
            </div>

            {/* Station Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-900 dark:text-white truncate text-sm">
                  {currentStation.name}
                </h3>
                {isPlaying && (
                  <span className="flex-shrink-0 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                    LIVE
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {isPlaying && <Equalizer isPlaying={isPlaying} />}
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {nowPlaying || `${currentStation.category} • ${currentStation.country}`}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Random Button - Desktop */}
            <button
              onClick={onRandomPlay}
              className="hidden sm:flex p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-105"
              aria-label="Random station"
            >
              <Shuffle className="w-5 h-5" />
            </button>

            {/* Sleep Timer Button - Desktop */}
            <button
              onClick={onOpenSleepTimer}
              className={`
                hidden sm:flex items-center gap-1 p-2 rounded-lg transition-all duration-200 hover:scale-105
                ${sleepTimerActive
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }
              `}
              aria-label="Sleep timer"
            >
              <Timer className="w-5 h-5" />
              {sleepTimerActive && (
                <span className="text-xs font-bold">{sleepTimerFormatted}</span>
              )}
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={onTogglePlay}
              disabled={isLoading}
              className="p-3 rounded-full bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/30 transition-all duration-200 hover:scale-105 disabled:opacity-50"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" />
              )}
            </button>

            {/* Volume Control - Desktop Only */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={onToggleMute}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-105"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-24 accent-primary-500"
                aria-label="Volume"
              />
            </div>
          </div>
        </div>

        {/* Mobile Volume Control */}
        <div className="md:hidden mt-3 flex items-center gap-3">
          <button
            onClick={onToggleMute}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="flex-1 accent-primary-500"
            aria-label="Volume"
          />
          <button
            onClick={onRandomPlay}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
            aria-label="Random station"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
