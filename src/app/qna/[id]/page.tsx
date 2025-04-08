import { Question } from '@/types';
import mockQuestions from '../mockQuestions.json';

interface JsonQuestion extends Omit<Question, 'createdAt' | 'answer'> {
  createdAt: string;
  answer?: {
    id: number;
    questionId: number;
    content: string;
    createdAt: string;
  } | null;
}

const parseQuestionDates = (q: JsonQuestion): Question => ({
  ...q,
  createdAt: new Date(q.createdAt),
  answer: q.answer ? {
    ...q.answer,
    createdAt: new Date(q.answer.createdAt)
  } : null
});

const parsedQuestions: Question[] = mockQuestions.map(parseQuestionDates);

export default function QnADetailPage({ params }: { params: { id: string } }) {
  const question = parsedQuestions.find(q => q.id === Number(params.id));
  
  if (!question) {
    return <div>문의를 찾을 수 없습니다.</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-600 mb-6">고객 문의</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
          <p className="text-gray-600 text-sm">{question.authorName} • {question.createdAt.toLocaleDateString()}</p>
          <p className="text-gray-700 mt-4">{question.content}</p>
          
          {question.isAnswered && question.answer && (
            <div className="mt-6 p-4 bg-amber-50 rounded">
              <h3 className="font-medium text-amber-800 mb-2">답변</h3>
              <p className="text-gray-700">{question.answer.content}</p>
              <p className="text-gray-500 text-sm mt-2">
                {question.answer.createdAt.toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}