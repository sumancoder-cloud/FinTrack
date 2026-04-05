import { useMemo } from 'react';

const bubbles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 90 + 20,
  left: Math.random() * 100,
  duration: Math.random() * 14 + 12,
  delay: Math.random() * 8,
}));

export default function Background() {
  const items = useMemo(() => bubbles, []);
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-950 dark:via-gray-900 dark:to-orange-950/20" />
      {items.map(b => (
        <div
          key={b.id}
          className="absolute rounded-full animate-bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            background: b.id % 3 === 0
              ? 'radial-gradient(circle at 30% 30%, rgba(251,146,60,0.25), rgba(249,115,22,0.08))'
              : b.id % 3 === 1
              ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), rgba(253,186,116,0.1))'
              : 'radial-gradient(circle at 30% 30%, rgba(234,88,12,0.15), rgba(249,115,22,0.05))',
          }}
        />
      ))}
    </div>
  );
}
