import React from 'react';
import { cn } from '@/src/lib/utils';
import { MessageCircle } from 'lucide-react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  as?: 'button' | 'a';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
  showWhatsAppIcon?: boolean;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  as,
  href,
  children,
  showWhatsAppIcon = false,
  icon,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center w-fit font-bold uppercase transition-all duration-200 gap-2";
  
  const variants = {
    primary: "bg-brand-primary text-white shadow-sm hover:bg-brand-primary-hover hover:-translate-y-0.5 hover:shadow-md",
    secondary: "bg-brand-surface text-brand-text hover:bg-brand-secondary shadow-sm",
    outline: "bg-white border-2 border-brand-border text-brand-primary shadow-sm hover:border-brand-primary hover:shadow-md hover:-translate-y-0.5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-2.5 text-base rounded-xl",
    lg: "px-8 py-3 text-lg rounded-xl",
  };

  const Component = as === 'button' || props.type === 'submit' || props.type === 'button' || (!href && !as) ? 'button' : 'a';
  
  const isInternal = href?.startsWith('#');
  
  const linkProps = Component === 'a' ? { 
    href: href || 'https://wa.me/201001060503', 
    target: isInternal ? undefined : '_blank', 
    rel: isInternal ? undefined : 'noopener noreferrer' 
  } : {};

  return (
    <Component
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...linkProps}
      {...(props as any)}
    >
      {showWhatsAppIcon && <MessageCircle className="w-5 h-5" />}
      {icon}
      {children}
    </Component>
  );
}
