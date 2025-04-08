'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MACHINES } from '../../constants/data';

export default function MachinesClient() {
  return (
    <div className="container mx-auto px-4 py-8">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center drop-shadow-lg">뻥튀기 기계 소개</h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl drop-shadow-md">최고의 품질과 서비스로 특별한 순간을 만들어드립니다</p>
        </div>
      </section>

      {/* 기계 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MACHINES.map((machine) => (
          <div key={machine.id} className="bg-gradient-to-br from-amber-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-amber-100">
            <div className="relative h-64">
              <Image
                src={machine.image}
                alt={machine.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-3 text-amber-800">{machine.name}</h2>
              <p className="text-gray-600 mb-6">{machine.description}</p>
              <div className="flex flex-col space-y-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${machine.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {machine.available ? '대여 가능' : '대여 중'}
                </span>
                <Link 
                  href={`/reservation?machine=${machine.id}`} 
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 shadow-md text-center"
                >
                  예약하기
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA 섹션 */}
      <section className="mt-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl p-12 text-center shadow-lg border border-amber-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-amber-800">맞춤형 뻥튀기 기계를 찾아보세요</h2>
          <p className="text-xl mb-8 text-amber-700">다양한 크기와 성능의 뻥튀기 기계를 준비했습니다.<br />행사 규모와 목적에 맞는 최적의 기계를 선택하세요.</p>
          <Link href="/reservation" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg text-xl inline-block">
            지금 예약하기
          </Link>
        </div>
      </section>
    </div>
  );
}