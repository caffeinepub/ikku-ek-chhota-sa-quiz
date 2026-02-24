import { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { useSessionState } from '../hooks/useSessionState';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useSessionState('music-playing', false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const actuallyPlayingRef = useRef(false);

  useEffect(() => {
    const audio = new Audio('/assets/audio/romantic-instrumental-loop.mp3');
    audio.loop = true;
    audio.volume = 0.15;
    audioRef.current = audio;

    const handleCanPlay = () => {
      setIsLoaded(true);
      setHasError(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoaded(true); // Still mark as "loaded" so button isn't permanently disabled
      actuallyPlayingRef.current = false;
    };

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current || !isLoaded || hasError) return;

    if (isPlaying) {
      audioRef.current.play()
        .then(() => {
          actuallyPlayingRef.current = true;
        })
        .catch(() => {
          // Play failed (e.g., no user gesture yet, autoplay policy)
          setIsPlaying(false);
          actuallyPlayingRef.current = false;
        });
    } else {
      audioRef.current.pause();
      actuallyPlayingRef.current = false;
    }
  }, [isPlaying, isLoaded, hasError, setIsPlaying]);

  const toggleMusic = () => {
    if (hasError) return; // Don't toggle if there's an error
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleMusic}
      disabled={!isLoaded || hasError}
      className="fixed top-4 right-4 z-50 p-3 bg-card/80 backdrop-blur-sm hover:bg-card border border-romantic-border rounded-full shadow-romantic transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-romantic-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      title={hasError ? 'Music unavailable' : isPlaying ? 'Pause music' : 'Play music'}
    >
      {!isLoaded ? (
        <Music className="w-5 h-5 text-muted-foreground animate-pulse" />
      ) : hasError ? (
        <VolumeX className="w-5 h-5 text-muted-foreground opacity-50" />
      ) : isPlaying ? (
        <Volume2 className="w-5 h-5 text-romantic-primary" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
    </button>
  );
}
