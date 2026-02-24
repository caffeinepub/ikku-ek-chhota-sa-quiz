import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import QuizShell from './QuizShell';
import HeartBurst from './HeartBurst';
import { quizData } from '../lib/quizData';

interface QuizScreenProps {
  questionIndex: number;
  onComplete: (questionIndex: number, answerIndex: number) => void;
  selectedAnswer?: number;
}

export default function QuizScreen({ questionIndex, onComplete, selectedAnswer: initialAnswer }: QuizScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(initialAnswer ?? null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const question = quizData[questionIndex];
  const isCorrect = selectedAnswer !== null && selectedAnswer === question.correctAnswer;

  useEffect(() => {
    setSelectedAnswer(initialAnswer ?? null);
    setShowFeedback(false);
    setShowHearts(false);
  }, [questionIndex, initialAnswer]);

  useEffect(() => {
    // Auto-advance after 2.5 seconds for incorrect answers
    if (showFeedback && !isCorrect && selectedAnswer !== null) {
      const timer = setTimeout(() => {
        onComplete(questionIndex, selectedAnswer);
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [showFeedback, isCorrect, selectedAnswer, questionIndex, onComplete]);

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    if (index === question.correctAnswer) {
      setShowHearts(true);
    }
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      onComplete(questionIndex, selectedAnswer);
    }
  };

  return (
    <QuizShell>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-romantic-accent rounded-full text-sm font-medium text-romantic-primary">
            <span>Question {questionIndex + 1} of 3</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight px-4">
            {question.question}
          </h2>
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isThisCorrect = index === question.correctAnswer;
            const showCorrectState = showFeedback && isThisCorrect;
            const showIncorrectState = showFeedback && isSelected && !isThisCorrect;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showFeedback}
                className={`
                  w-full p-4 md:p-5 rounded-2xl text-left transition-all duration-300
                  border-2 font-medium text-base md:text-lg
                  ${showCorrectState
                    ? 'border-romantic-success bg-romantic-success/10 text-romantic-success'
                    : showIncorrectState
                    ? 'border-destructive bg-destructive/10 text-destructive'
                    : isSelected 
                    ? 'border-romantic-primary bg-romantic-primary/5 text-romantic-primary'
                    : 'border-border bg-card hover:border-romantic-primary/50 hover:bg-romantic-accent/50 text-foreground'
                  }
                  ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02] hover:shadow-md'}
                  focus:outline-none focus:ring-4 focus:ring-romantic-primary/30
                `}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="text-center space-y-4 animate-fade-in">
            {isCorrect ? (
              <>
                <p className="text-romantic-success font-medium text-lg">
                  {question.feedback}
                </p>
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-romantic-primary hover:bg-romantic-primary-hover text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-romantic focus:outline-none focus:ring-4 focus:ring-romantic-primary/30"
                >
                  <span>Aage Badhein</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <p className="text-destructive font-medium text-lg">
                    Galat jawab! 😔
                  </p>
                  <p className="text-romantic-success font-medium">
                    Sahi jawab: {question.options[question.correctAnswer]}
                  </p>
                </div>
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-romantic-primary hover:bg-romantic-primary-hover text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-romantic focus:outline-none focus:ring-4 focus:ring-romantic-primary/30"
                >
                  <span>Aage Badhein</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        )}

        {showHearts && <HeartBurst />}
      </div>
    </QuizShell>
  );
}
