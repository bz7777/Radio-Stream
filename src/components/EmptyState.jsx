import { Radio, Heart, TrendingUp, Search } from 'lucide-react';

/**
 * Empty state component for different scenarios
 */
export const EmptyState = ({ type = 'search' }) => {
  const states = {
    search: {
      icon: Search,
      title: 'Asnjë stacion nuk u gjet',
      description: 'Provo të ndryshosh kërkimin ose filtrat'
    },
    favorites: {
      icon: Heart,
      title: 'Ende nuk ke të preferuara',
      description: 'Shto stacione tek të preferuarat për t\'i parë këtu'
    },
    mostPlayed: {
      icon: TrendingUp,
      title: 'Ende nuk ka histori dëgjimi',
      description: 'Fillo të dëgjosh për të parë stacionet më të dëgjuara'
    },
    error: {
      icon: Radio,
      title: 'Diçka shkoi keq',
      description: 'Ju lutem provo përsëri më vonë'
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
