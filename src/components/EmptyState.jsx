import { Radio, Heart, TrendingUp, Search } from 'lucide-react';

/**
 * Empty state component for different scenarios
 */
export const EmptyState = ({ type = 'search' }) => {
  const states = {
    search: {
      icon: Search,
      title: 'No stations found',
      description: 'Try adjusting your search or filters'
    },
    favorites: {
      icon: Heart,
      title: 'No favorites yet',
      description: 'Add stations to your favorites to see them here'
    },
    mostPlayed: {
      icon: TrendingUp,
      title: 'No play history',
      description: 'Start listening to see your most played stations'
    },
    error: {
      icon: Radio,
      title: 'Something went wrong',
      description: 'Please try again later'
    }
  };

  const state = states[type] || states.search;
  const Icon = state.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
        <Icon className="w-12 h-12 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        {state.title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm">
        {state.description}
      </p>
    </div>
  );
};
