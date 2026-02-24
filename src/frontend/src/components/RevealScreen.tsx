import { Heart, RotateCcw } from 'lucide-react';
import QuizShell from './QuizShell';

interface RevealScreenProps {
  onRestart: () => void;
}

export default function RevealScreen({ onRestart }: RevealScreenProps) {
  return (
    <QuizShell>
      <div className="text-center space-y-8">
        <div className="relative inline-block">
          <img
            src="/assets/generated/hearts-icons.dim_256x256.png"
            alt=""
            className="w-24 h-24 mx-auto opacity-90 animate-pulse"
            aria-hidden="true"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-cursive text-romantic-primary leading-tight">
            Tumhare liye ek shayri
          </h1>

          <div className="space-y-4 max-w-lg mx-auto">
            <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
              Teri muskurahat meri aadat ban gayi,
            </p>
            <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
              Tera naam meri ibadat ban gayi,
            </p>
            <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
              Har khushi tere naam kar doon Angel,
            </p>
            <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
              Kyuki tu hi meri sabse khoobsurat chahat ban gayi 🤍
            </p>
          </div>

          <div className="pt-4 pb-2">
            <div className="inline-flex items-center gap-2 text-romantic-primary">
              <Heart className="w-5 h-5 fill-current" />
              <Heart className="w-4 h-4 fill-current" />
              <Heart className="w-3 h-3 fill-current" />
            </div>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-6 py-3 bg-romantic-muted hover:bg-romantic-muted/80 text-foreground rounded-full font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-romantic-primary/30"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Phir Se Dekhein</span>
        </button>
      </div>
    </QuizShell>
  );
}
