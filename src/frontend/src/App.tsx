import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import QuizScreen from './components/QuizScreen';
import RevealScreen from './components/RevealScreen';
import LockScreen from './components/LockScreen';
import WelcomeScreen from './components/WelcomeScreen';
import MusicToggle from './components/MusicToggle';
import AnimatedStep from './components/AnimatedStep';
import AmbientHearts from './components/AmbientHearts';
import { useSessionState } from './hooks/useSessionState';

type AppState = 'locked' | 'welcome' | 'intro' | 'q1' | 'q2' | 'q3' | 'reveal';

function App() {
  const [isUnlocked, setIsUnlocked] = useSessionState('app-unlocked', false);
  const [currentState, setCurrentState] = useState<AppState>(isUnlocked ? 'welcome' : 'locked');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const handleUnlock = () => {
    setIsUnlocked(true);
    setCurrentState('welcome');
  };

  const handleWelcomeContinue = () => {
    setCurrentState('intro');
  };

  const handleStart = () => {
    setCurrentState('q1');
  };

  const handleQuestionComplete = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
    
    if (questionIndex === 0) {
      setCurrentState('q2');
    } else if (questionIndex === 1) {
      setCurrentState('q3');
    } else if (questionIndex === 2) {
      setCurrentState('reveal');
    }
  };

  const handleRestart = () => {
    setCurrentState('intro');
    setSelectedAnswers({});
  };

  const getQuestionIndex = (): number => {
    if (currentState === 'q1') return 0;
    if (currentState === 'q2') return 1;
    if (currentState === 'q3') return 2;
    return 0;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-pink-950/20 dark:via-background dark:to-rose-950/20" />
      <div className="fixed inset-0 opacity-[0.03] dark:opacity-[0.02] bg-hearts-pattern" />
      
      <AmbientHearts />
      <MusicToggle />
      
      <main className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AnimatedStep currentKey={currentState}>
          {currentState === 'locked' && <LockScreen onUnlock={handleUnlock} />}
          {currentState === 'welcome' && <WelcomeScreen onContinue={handleWelcomeContinue} />}
          {currentState === 'intro' && <IntroScreen onStart={handleStart} />}
          {(currentState === 'q1' || currentState === 'q2' || currentState === 'q3') && (
            <QuizScreen
              questionIndex={getQuestionIndex()}
              onComplete={handleQuestionComplete}
              selectedAnswer={selectedAnswers[getQuestionIndex()]}
            />
          )}
          {currentState === 'reveal' && <RevealScreen onRestart={handleRestart} />}
        </AnimatedStep>
      </main>
    </div>
  );
}

export default App;
