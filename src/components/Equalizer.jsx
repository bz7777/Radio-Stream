/**
 * Animated equalizer bars component
 */
export const Equalizer = ({ isPlaying }) => {
  return (
    <div className="flex items-center gap-1 h-5">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={`
            w-1 bg-primary-500 rounded-full transition-all duration-100
            ${isPlaying ? 'animate-pulse' : 'h-1'}
          `}
          style={{
            height: isPlaying ? '100%' : '4px',
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${0.6 + i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};
