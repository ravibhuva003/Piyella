import { Variants } from 'motion/react';

export const DURATIONS = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  page: 0.8,
};

export const EASINGS = {
  easeOut: [0.0, 0.0, 0.2, 1] as const,
  easeInOut: [0.4, 0.0, 0.2, 1] as const,
  spring: [0.175, 0.885, 0.32, 1.275] as const,
  luxury: [0.6, 0.01, -0.05, 0.95] as const,
};

export const SPRING_CONFIGS = {
  gentle: { type: 'spring', stiffness: 100, damping: 20 },
  bouncy: { type: 'spring', stiffness: 200, damping: 15 },
  stiff: { type: 'spring', stiffness: 300, damping: 25 },
};

export const STAGGER_DELAYS = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.2,
};

export const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: DURATIONS.slow, 
      ease: EASINGS.luxury 
    } 
  },
};

export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAYS.normal,
    },
  },
};
