import React from 'react';
import { cn } from '@/src/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  children: React.ReactNode;
  containerClassName?: string;
  dir?: string;
}

export function Section({ id, className, children, containerClassName, ...props }: SectionProps) {
  return (
    <section id={id} className={cn("py-12 md:py-20", className)} {...props}>
      <div className={cn("max-w-7xl mx-auto px-6 md:px-12", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
