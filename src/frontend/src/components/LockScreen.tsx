import { useState, FormEvent } from 'react';
import { Lock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import QuizShell from './QuizShell';

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (password === 'angel') {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  return (
    <QuizShell>
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-romantic-primary rounded-full blur-2xl opacity-20 animate-pulse" />
            <div className="relative bg-romantic-accent rounded-full p-6 shadow-romantic-lg">
              <Lock className="w-12 h-12 text-romantic-primary" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="font-cursive text-5xl md:text-6xl text-romantic-primary">
            Kholo Dil Ka Darwaza
          </h1>
          <p className="text-lg text-muted-foreground">
            Password daal ke andar aao ❤️
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-left block text-base">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Password enter karein..."
              className={`text-center text-lg h-12 transition-all ${
                error 
                  ? 'border-destructive focus-visible:ring-destructive' 
                  : 'border-romantic-border focus-visible:ring-romantic-primary'
              } ${isShaking ? 'animate-shake' : ''}`}
              aria-invalid={error}
              aria-describedby={error ? 'password-error' : undefined}
              autoFocus
            />
            {error && (
              <p 
                id="password-error" 
                className="text-sm text-destructive text-center animate-fade-in"
                role="alert"
              >
                Galat password! Phir se try karo 💔
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-romantic-primary hover:bg-romantic-primary-hover text-white font-semibold text-lg h-12 shadow-romantic transition-all hover:scale-105"
          >
            <Heart className="w-5 h-5 mr-2 fill-current" />
            Unlock Karo
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Heart className="w-4 h-4 fill-romantic-primary text-romantic-primary" />
          <span>Sirf tumhare liye hai ye</span>
          <Heart className="w-4 h-4 fill-romantic-primary text-romantic-primary" />
        </div>
      </div>
    </QuizShell>
  );
}
