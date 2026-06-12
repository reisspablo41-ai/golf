'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  to: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({ to, suffix = '', duration = 2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const totalFrames = Math.round(duration * 60);
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (frame >= totalFrames) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}
