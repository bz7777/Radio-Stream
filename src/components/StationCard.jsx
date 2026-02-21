import { Play, Pause, Heart, MapPin, Tag } from 'lucide-react';

/**
 * Individual station card component
 */
export const StationCard = ({ 
  station, 
  isPlaying, 
  isCurrentStation, 
  isFavorite,
  playCount,
  onPlay, 
  onToggleFavorite 
}) => {
  const handlePlayClick = (e) => {
    e.stopPropagation();
    onPlay(station);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(station);
  };

  return (
    <div 
      className={`
        group relative bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl 
        transition-all duration-300 overflow-hidden cursor-pointer
        ${isCurrentStation ? 'ring-2 ring-primary-500 shadow-primary-500/20' : ''}
      `}
      onClick={handlePlayClick}
    >
      {/* Background gradient overlay */}
      <div className={`
        absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 
        group-hover:opacity-100 transition-opacity duration-300
        ${isCurrentStation ? 'opacity-100' : ''}
      `} />

      <div className="relative p-4">
        <div className="flex gap-4">
          {/* Station Logo */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 shadow-lg">
              <img 
                src={station.logo} 
                alt={station.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect width="80" height="80" fill="%230ea5e9"/%3E%3Ctext x="50%25" y="50%25" fill="white" font-size="32" text-anchor="middle" dy=".3em"%3E📻%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
            
            {/* Playing indicator */}
            {isCurrentStation && isPlaying && (
              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1 shadow-lg animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            )}
          </div>

          {/* Station Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1 truncate">
              {station.name}
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-medium rounded-md">
                <Tag className="w-3 h-3" />
                {station.category}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-md">
                <MapPin className="w-3 h-3" />
                {station.country}
              </span>
            </div>

            {playCount > 0 && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dëgjuar {playCount} herë
              </p>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayClick}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium
              transition-all duration-200 hover:scale-105
              ${isCurrentStation && isPlaying
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                : 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/30'
              }
            `}
          >
            {isCurrentStation && isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Pauzë</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 ml-0.5" />
                <span>Luaj</span>
              </>
            )}
          </button>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={`
              p-3 rounded-xl transition-all duration-200 hover:scale-110
              ${isFavorite
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
              }
            `}
            aria-label={isFavorite ? 'Hiq nga të preferuarat' : 'Shto tek të preferuarat'}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
