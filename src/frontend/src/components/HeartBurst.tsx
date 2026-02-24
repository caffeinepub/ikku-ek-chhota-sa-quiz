import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export default function HeartBurst() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      delay: Math.random() * 0.3,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute w-6 h-6 text-romantic-primary fill-current animate-heart-burst"
          style={{
            '--heart-x': `${heart.x}px`,
            animationDelay: `${heart.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
