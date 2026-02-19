import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export function GlassCard({ children, className, hover = false, gradient = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-2xl p-6 md:p-8',
        hover && 'hover-lift cursor-pointer',
        gradient && 'gradient-border',
        className
      )}
    >
      {children}
    </div>
  );
}

export default GlassCard;
