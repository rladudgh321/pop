'use client';

import { useState } from 'react';
import { Question } from '@/types';
import Pagination from './Pagination';
import Image from 'next/image';

interface QnAClientProps {
  questions: Question[];
}

export default function QnAClient({ questions }: QnAClientProps) {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const currentItems = questions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white bg-[url('/popcorn-pattern.svg')] bg-repeat bg-opacity-10 px-4 py-12">
      <div className="container mx-auto">

        {/* 히어로 섹션 */}
        <section className="relative h-[400px] rounded-xl overflow-hidden mb-12">
            <div className="absolute inset-0 bg-amber-50 bg-opacity-50 z-0">
                <div className="absolute inset-0" style={{ backgroundImage: 'url("/popcorn-pattern.svg")', backgroundSize: '200px', opacity: 0.1 }} />
            </div>
            <Image
                src="https://images.unsplash.com/photo-1578849278619-e73505e9610f?q=80&w=1470&auto=format&fit=crop"
                alt="뻥튀기 기계 전시"
                fill
                className="object-cover z-10"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 flex flex-col justify-center items-center text-white p-4 z-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-500">고객 문의</h1>
                <p className="text-xl md:text-2xl text-center max-w-2xl drop-shadow-md ">최고의 품질과 서비스로 특별한 순간을 만들어드립니다</p>
            </div>
        </section>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-amber-100">
          <h2 className="text-2xl font-semibold mb-6 text-amber-800">문의 목록</h2>
          <div className="space-y-6">
            {currentItems.map((question) => (
              <div 
                key={question.id} 
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100 hover:border-amber-200 transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xl font-medium text-amber-900">{question.title}</h3>
                  <span 
                    className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                      question.isAnswered 
                        ? 'bg-gradient-to-r from-green-500 to-green-400 text-white' 
                        : 'bg-gradient-to-r from-amber-500 to-amber-400 text-white'
                    }`}
                  >
                    {question.isAnswered ? '답변 완료' : '답변 대기'}
                  </span>
                </div>
                <p className="text-amber-700 text-sm mt-2 flex items-center gap-2">
                  <span className="font-medium">{question.authorName}</span>
                  <span className="text-amber-400">•</span>
                  <span>{question.createdAt.toLocaleDateString()}</span>
                </p>
                <p className="text-gray-700 mt-3 line-clamp-2">{question.content}</p>
                {question.isAnswered && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl border border-amber-200">
                    <p className="font-medium text-amber-800 mb-2">답변</p>
                    <p className="text-amber-900">{question.answer?.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <Pagination 
            totalPages={totalPages} 
            currentPage={currentPage} 
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </main>
  );
}