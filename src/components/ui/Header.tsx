'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-amber-50 shadow-sm sticky top-0 z-50 overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("/popcorn-pattern.svg")', backgroundSize: '200px' }} />
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-3xl font-bold text-amber-600 group-hover:scale-105 transition-transform">그린농장</span>
          <span className="text-sm text-amber-700">뻥튀기 기계 대여</span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-amber-700 hover:text-amber-600 hover:scale-105 transition-all">
            홈
          </Link>
          <Link href="/machines" className="text-amber-700 hover:text-amber-600 hover:scale-105 transition-all">
            기계 소개
          </Link>
          <Link href="/reservation" className="text-amber-700 hover:text-amber-600 hover:scale-105 transition-all">
            예약하기
          </Link>
          <Link href="/qna" className="text-amber-700 hover:text-amber-600 hover:scale-105 transition-all">
            고객 문의
          </Link>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button 
          className="md:hidden text-amber-700 hover:text-amber-600 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden bg-amber-50 border-t border-amber-200">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <Link 
              href="/" 
              className="text-amber-700 hover:text-amber-600 hover:scale-105 transition-all py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              홈
            </Link>
            <Link 
              href="/machines" 
              className="text-amber-700 hover:text-amber-600 hover:scale-105 transition-all py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              기계 소개
            </Link>
            <Link 
              href="/reservation" 
              className="text-amber-700 hover:text-amber-600 hover:scale-105 transition-all py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              예약하기
            </Link>
            <Link 
              href="/qna" 
              className="text-amber-700 hover:text-amber-600 hover:scale-105 transition-all py-2"
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