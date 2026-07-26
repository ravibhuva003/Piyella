'use client';

import { useRef, useMemo, ElementType } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  splitBy?: 'chars' | 'words' | 'lines';
}

export function TextReveal({
  children,
  className,
  as: Tag = 'h2',
  delay = 0,
  splitBy = 'words',
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  const getSplitContent = () => {
    if (splitBy === 'words') {
      return children.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 mr-[0.25em]">
          <span className="reveal-element inline-block opacity-0 translate-y-full">
            {word}
          </span>
        </span>
      ));
    }
    
    if (splitBy === 'chars') {
      return children.split('').map((char, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1">
          <span className="reveal-element inline-block opacity-0 translate-y-full">
            {char === ' ' ? '\\u00A0' : char}
          </span>
        </span>
      ));
    }

    return children.split('\\n').map((line, i) => (
      <span key={i} className="block overflow-hidden pb-1">
        <span className="reveal-element block opacity-0 translate-y-full">
          {line}
        </span>
      </span>
    ));
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const elements = containerRef.current.querySelectorAll('.reveal-element');
      
      gsap.to(elements, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        stagger: splitBy === 'chars' ? 0.02 : 0.05,
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      });
    },
    { scope: containerRef, dependencies: [children, delay, splitBy] }
  );

  return (
    <Tag ref={containerRef} className={cn('m-0', className)}>
      {getSplitContent()}
    </Tag>
  );
}
