import { Heart, TrendingUp, Globe, Music } from 'lucide-react';

/**
 * Filter tabs for navigating between different views
 */
export const FilterTabs = ({ activeTab, onTabChange, favoritesCount }) => {
  const tabs = [
    { id: 'all', label: 'All Stations', icon: Music },
    { id: 'favorites', label: 'Favorites', icon: Heart, count: favoritesCount },
    { id: 'most-played', label: 'Most Played', icon: TrendingUp },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200
              ${isActive
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-bold
                ${isActive ? 'bg-white/20' : 'bg-primary-500 text-white'}
              `}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

/**
 * Category filter chips
 */
export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onCategoryChange('all')}
        className={`
          px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200
          ${selectedCategory === 'all'
            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }
        `}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200
            ${selectedCategory === category
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
