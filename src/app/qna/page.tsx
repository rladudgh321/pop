import { Metadata } from 'next';
import { Question } from '@/types';
import Pagination from './Pagination';

export const metadata: Metadata = {
  title: '고객 문의',
  description: '팝콘팝 기계 대여 서비스에 대한 문의를 남겨주세요.',
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
  const itemsPerPage = 5;
  const currentPage = 1;
  
  const totalPages = Math.ceil(parsedQuestions.length / itemsPerPage);
  const currentItems = parsedQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-600 mb-6">고객 문의</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4">문의 목록</h2>
          <div className="space-y-4">
            {currentItems.map((question) => (
              <div key={question.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">{question.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${question.isAnswered ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {question.isAnswered ? '답변 완료' : '답변 대기'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{question.authorName} • {question.createdAt.toLocaleDateString()}</p>
                <p className="text-gray-700 mt-2 line-clamp-2">{question.content}</p>
                {question.isAnswered && (
                  <div className="mt-3 p-3 bg-amber-50 rounded">
                    <p className="font-medium text-amber-800">답변</p>
                    <p className="text-gray-700">{question.answer?.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      </div>
    </main>
  );
}