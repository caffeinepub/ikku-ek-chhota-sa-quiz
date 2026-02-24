import { type ReactNode } from 'react';

interface QuizShellProps {
  children: ReactNode;
}

export default function QuizShell({ children }: QuizShellProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute -top-4 -right-4 w-16 h-16 opacity-20 pointer-events-none">
          <img
            src="/assets/generated/sparkles-icons.dim_256x256.png"
            alt=""
            className="w-full h-full animate-spin-slow"
            aria-hidden="true"
          />
        </div>
        <div className="absolute -bottom-4 -left-4 w-12 h-12 opacity-20 pointer-events-none">
          <img
            src="/assets/generated/sparkles-icons.dim_256x256.png"
            alt=""
            className="w-full h-full animate-spin-slow"
            style={{ animationDelay: '1s' }}
            aria-hidden="true"
          />
        </div>
        
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-romantic-lg border border-romantic-border p-8 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
