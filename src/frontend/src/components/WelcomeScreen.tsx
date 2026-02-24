import { Heart } from 'lucide-react';
import QuizShell from './QuizShell';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <QuizShell>
      <div className="text-center space-y-8">
        <div className="relative inline-block">
          <img
            src="/assets/generated/hearts-icons.dim_256x256.png"
            alt=""
            className="w-20 h-20 mx-auto opacity-80 animate-pulse"
            aria-hidden="true"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-cursive text-romantic-primary leading-tight">
            Hi Angel 🤍
          </h1>
          <p className="text-lg md:text-xl text-foreground max-w-md mx-auto leading-relaxed">
            Aaj tumhare liye kuch special hai…
          </p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            Par pehle ek chhota sa quiz 😉
          </p>
        </div>

        <button
          onClick={onContinue}
          className="group relative inline-flex items-center gap-2 px-8 py-4 bg-romantic-primary hover:bg-romantic-primary-hover text-white rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-romantic focus:outline-none focus:ring-4 focus:ring-romantic-primary/30"
        >
          <span>Chalo Shuru Karein</span>
          <Heart className="w-5 h-5 group-hover:fill-current transition-all" />
        </button>
      </div>
    </QuizShell>
  );
}
