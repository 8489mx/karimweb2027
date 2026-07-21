import React from 'react';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  headingClassName?: string;
  align?: 'left' | 'center' | 'right';
}

export function SectionHeading({ children, className, headingClassName, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={cn(
      "relative flex flex-col group w-fit cursor-default",
      align === 'center' ? 'mx-auto items-center text-center' : align === 'left' ? 'mr-auto items-start text-left' : 'ml-auto items-end text-right',
      className
    )}>
      {/* Heading Text */}
      <h2 className={cn(
        "relative z-10 text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-text tracking-tight transition-transform duration-500 group-hover:-translate-y-1",
        align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right',
        headingClassName
      )}>
        {children}
      </h2>

      {/* Animated Decorative Accent */}
      <div className="mt-4 md:mt-5 flex items-center gap-1.5 sm:gap-2 transition-transform duration-500 group-hover:translate-y-1">
        <div className="h-[4px] md:h-[5px] w-2 sm:w-3 bg-brand-primary/30 rounded-full transition-all duration-500 group-hover:w-8 sm:group-hover:w-12 group-hover:bg-brand-primary" />
        <div className="h-[4px] md:h-[5px] w-16 sm:w-20 bg-brand-primary rounded-full relative overflow-hidden">
          {/* Shine effect inside the main line */}
          <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/90 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%] pointer-events-none delay-75" />
        </div>
        <div className="h-[4px] md:h-[5px] w-2 sm:w-3 bg-brand-primary/30 rounded-full transition-all duration-500 group-hover:w-8 sm:group-hover:w-12 group-hover:bg-brand-primary" />
      </div>
    </div>
  );
}
