import { X, Timer, Clock } from 'lucide-react';

/**
 * Sleep Timer Modal Component
 */
export const SleepTimerModal = ({ 
  isOpen, 
  onClose, 
  onStartTimer, 
  isActive, 
  timeLeft,
  formatTime,
  onStopTimer 
}) => {
  if (!isOpen) return null;

  const timerOptions = [
    { label: '15 min', value: 15 },
    { label: '30 min', value: 30 },
    { label: '45 min', value: 45 },
    { label: '60 min', value: 60 },
  ];

  const handleStartTimer = (minutes) => {
    onStartTimer(minutes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-md animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
              <Timer className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Kohëmatës gjumi
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isActive ? (
            <div className="text-center">
              <div className="mb-6">
                <Clock className="w-16 h-16 mx-auto text-primary-500 mb-4 animate-pulse" />
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Muzika do të ndalojë pas
                </p>
                <p className="text-5xl font-bold text-slate-900 dark:text-white mb-1">
                  {formatTime(timeLeft)}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  minuta të mbetura
                </p>
              </div>
              <button
                onClick={() => {
                  onStopTimer();
                  onClose();
                }}
                className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors duration-200"
              >
                Anulo kohëmatësin
              </button>
            </div>
          ) : (
            <div>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
                Zgjidhni sa kohë dëshironi të dëgjoni
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {timerOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleStartTimer(option.value)}
                    className="p-4 bg-slate-100 dark:bg-slate-700 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 text-slate-900 dark:text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  >
                    <Timer className="w-5 h-5 mx-auto mb-2" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
