interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'w-6 h-6 text-xl',
    md: 'w-8 h-8 text-2xl',
    lg: 'w-12 h-12 text-4xl',
    xl: 'w-16 h-16 text-5xl',
  };

  return (
    <div
      className={`${sizes[size]} rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center ${className}`}
    >
      <span className="font-serif italic font-bold text-white leading-none -mt-1">
        TM
      </span>
    </div>
  );
}
