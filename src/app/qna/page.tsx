import { Metadata } from 'next';
import { Question } from '@/types';
import QnAClient from './qnaClient';

export const metadata: Metadata = {
  title: '고객 문의',
  description: '그린농장 기계 대여 서비스에 대한 문의를 남겨주세요.',
};

import mockQuestions from './mockQuestions.json';

interface JsonQuestion extends Omit<Question, 'createdAt' | 'answer'> {
  createdAt: string;
  answer?: {
    id: number;
    questionId: number;
    content: string;
    createdAt: string;
  } | null;
}

const parsedQuestions: Question[] = mockQuestions.map((q: JsonQuestion) => ({
  ...q,
  createdAt: new Date(q.createdAt),
  answer: q.answer ? {
    ...q.answer,
    createdAt: new Date(q.answer.createdAt)
  } : null
}));

export default function QnAPage() {
  return <QnAClient questions={parsedQuestions} />;
}