export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  feedback: string;
}

export const quizData: QuizQuestion[] = [
  {
    question: 'Agar koi tumhari smile dekh kar khush ho jaye…\nToh wo kya hoga?',
    options: [
      'Normal',
      'Cute',
      'Pagal',
      'Thoda sa pyaar me ❤️',
    ],
    correctAnswer: 3,
    feedback: '❤️ Bilkul sahi... thoda sa nahi, bahut zyada pyaar me!',
  },
  {
    question: 'Kaun hai jo bina reason bhi yaad aa jata hai?',
    options: [
      'Chocolate',
      'Music',
      'Phone',
      'Angel 💕',
    ],
    correctAnswer: 3,
    feedback: '💕 Haan... Angel hi toh yaad aati hai har pal!',
  },
  {
    question: 'Agar dil kisi ek naam pe ruk jaye…\nToh wo naam?',
    options: [
      'Random',
      'Secret',
      'Angel 🤍',
      'Nahi pata',
    ],
    correctAnswer: 2,
    feedback: '🤍 Bilkul sahi... Angel hi toh hai wo naam!',
  },
];
