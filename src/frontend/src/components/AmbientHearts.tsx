import { useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function AmbientHearts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const heartsRef = useRef<Set<number>>(new Set());
  const nextIdRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const MAX_HEARTS = 15;
    const SPAWN_INTERVAL = 2000;

    const createHeart = () => {
      if (heartsRef.current.size >= MAX_HEARTS) return;

      const id = nextIdRef.current++;
      heartsRef.current.add(id);

      const heart = document.createElement('div');
      heart.className = 'ambient-heart';
      heart.setAttribute('data-heart-id', id.toString());
      
      const startX = Math.random() * 100;
      const drift = (Math.random() - 0.5) * 30;
      const duration = 8 + Math.random() * 4;
      const size = 16 + Math.random() * 12;
      const delay = Math.random() * 1;
      const rotation = (Math.random() - 0.5) * 30;

      heart.style.cssText = `
        left: ${startX}%;
        --drift-x: ${drift}px;
        --duration: ${duration}s;
        --delay: ${delay}s;
        --rotation: ${rotation}deg;
        width: ${size}px;
        height: ${size}px;
      `;

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'currentColor');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z');
      
      svg.appendChild(path);
      heart.appendChild(svg);
      container.appendChild(heart);

      setTimeout(() => {
        heart.remove();
        heartsRef.current.delete(id);
      }, (duration + delay) * 1000);
    };

    const interval = setInterval(createHeart, SPAWN_INTERVAL);
    
    // Create initial hearts
    for (let i = 0; i < 3; i++) {
      setTimeout(createHeart, i * 500);
    }

    return () => {
      clearInterval(interval);
      container.innerHTML = '';
      heartsRef.current.clear();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden"
      aria-hidden="true"
    />
  );
}
