import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-neon-cyan text-space-void hover:bg-neon-cyan/90",
    secondary: "bg-space-accent text-white hover:bg-space-accent/80",
    outline: "border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10",
  };

  return (
    <button
      className={cn(
        'relative overflow-hidden rounded-lg px-8 py-3 font-bold transition-all duration-300',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
