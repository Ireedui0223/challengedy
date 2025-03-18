import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const badges: Record<string, string> = {
  Fitness: 'dumbbell.png',
  Health: 'healthcare.png',
  Creativity: 'creative-brain.png',
  Art: 'mona-lisa.png',
  Lifestyle: 'life.png',
  'Personal Growth': 'growth.png',
  Photography: 'photographer.png'
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateBadge = (badge: string) => {
  return badges[badge];
};
