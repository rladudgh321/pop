'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-amber-600">팝콘팝</span>
          <span className="text-sm text-gray-500">뻥튀기 기계 대여</span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors">
            홈
          </Link>
          <Link href="/machines" className="text-gray-700 hover:text-amber-600 transition-colors">
            기계 소개
          </Link>
          <Link href="/reservation" className="text-gray-700 hover:text-amber-600 transition-colors">
            예약하기
          </Link>
          <Link href="/qna" className="text-gray-700 hover:text-amber-600 transition-colors">
            고객 문의
          </Link>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-amber-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              홈
            </Link>
            <Link 
              href="/machines" 
              className="text-gray-700 hover:text-amber-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              기계 소개
            </Link>
            <Link 
              href="/reservation" 
              className="text-gray-700 hover:text-amber-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              예약하기
            </Link>
            <Link 
              href="/qna" 
              className="text-gray-700 hover:text-amber-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              고객 문의
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}