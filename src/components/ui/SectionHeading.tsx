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
        "relative z-10 text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-text transition-transform duration-500 group-hover:-translate-y-1 pb-1 md:pb-2 leading-normal md:leading-normal",
        align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right',
        headingClassName
      )}>
        {children}
      </h2>
      
      {/* Accent Divider */}
      <div className={cn(
        "flex items-center gap-1.5 mt-2 mb-2 transition-all duration-500",
        align === 'center' ? 'justify-center' : align === 'left' ? 'justify-start' : 'justify-end'
      )}>
        <span className="h-1.5 w-3 rounded-full bg-brand-primary/20 transition-all duration-500 group-hover:w-8 group-hover:bg-brand-primary/40"></span>
        <span className="h-1.5 w-16 rounded-full bg-brand-primary/60 transition-all duration-500 group-hover:w-10 group-hover:bg-brand-primary"></span>
        <span className="h-1.5 w-3 rounded-full bg-brand-primary/20 transition-all duration-500 group-hover:w-8 group-hover:bg-brand-primary/40"></span>
      </div>
    </div>
  );
}
