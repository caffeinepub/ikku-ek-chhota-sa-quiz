import { type ReactNode, useEffect, useState } from 'react';

interface AnimatedStepProps {
  children: ReactNode;
  currentKey: string;
}

export default function AnimatedStep({ children, currentKey }: AnimatedStepProps) {
  const [displayedKey, setDisplayedKey] = useState(currentKey);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (currentKey !== displayedKey) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayedKey(currentKey);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentKey, displayedKey]);

  return (
    <div
      className={`
        transition-all duration-300 ease-in-out
        ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
      `}
    >
      {children}
    </div>
  );
}
