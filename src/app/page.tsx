import Image from "next/image";
import Link from "next/link";
import { MACHINES, PRICING } from "../constants/data";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 히어로 섹션 */}
      <section className="relative h-[500px] rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-amber-50 bg-opacity-50 z-0">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("/popcorn-pattern.svg")', backgroundSize: '200px', opacity: 0.1 }} />
        </div>
        <Image
          src="https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=1470&auto=format&fit=crop"
          alt="뻥튀기 기계"
          fill
          className="object-cover z-10"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 flex flex-col justify-center items-center text-white p-4 z-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center drop-shadow-lg">그린농장 뻥튀기 기계 대여</h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl drop-shadow-md">특별한 행사를 위한 최고의 선택, 간편한 예약으로 즐거운 추억을 만들어보세요</p>
          <Link href="/reservation" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg text-lg">
            지금 예약하기
          </Link>
        </div>
      </section>

      {/* 서비스 소개 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-amber-800">뻥튀기 기계 대여 서비스</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-amber-700">간편한 예약</h3>
            <p className="text-gray-600">원하는 날짜에 맞춰 쉽고 빠르게 예약하세요</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-amber-700">다양한 옵션</h3>
            <p className="text-gray-600">일반 쌀부터 단호박, 자색고구마 쌀까지 다양한 원재료 선택 가능</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-amber-700">편리한 결제</h3>
            <p className="text-gray-600">온라인으로 간편하게 결제하고 이용하세요</p>
          </div>
        </div>
      </section>

      {/* 기계 소개 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">뻥튀기 기계 소개</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MACHINES.map((machine) => (
            <div key={machine.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image
                  src={machine.image}
                  alt={machine.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{machine.name}</h3>
                <p className="text-gray-600 mb-4">{machine.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${machine.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {machine.available ? '대여 가능' : '대여 중'}
                  </span>
                  <Link href={`/reservation?machine=${machine.id}`} className="text-amber-600 hover:text-amber-700 font-medium">
                    예약하기 →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 가격 정보 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-amber-800">대여 가격 안내</h2>
        <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-lg overflow-hidden border border-amber-100">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-amber-700">기본 대여 가격</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-amber-100">
                <p className="text-lg font-medium mb-3 text-amber-800">평일</p>
                <p className="text-3xl font-bold text-amber-600">{PRICING.WEEKDAY.toLocaleString()}원</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-amber-100">
                <p className="text-lg font-medium mb-3 text-amber-800">주말</p>
                <p className="text-3xl font-bold text-amber-600">{PRICING.WEEKEND.toLocaleString()}원</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-amber-700">주말 장기 대여 할인</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-amber-100">
                <p className="text-lg font-medium mb-3 text-amber-800">1주일 이내</p>
                <p className="text-2xl font-bold text-amber-600">{PRICING.WEEKEND_DISCOUNT.ONE_WEEK.toLocaleString()}원</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-amber-100">
                <p className="text-lg font-medium mb-3 text-amber-800">1~2주일</p>
                <p className="text-xl font-bold text-amber-600">{PRICING.WEEKEND_DISCOUNT.TWO_WEEKS.toLocaleString()}원</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-amber-100">
                <p className="text-lg font-medium mb-3 text-amber-800">2~3주일</p>
                <p className="text-xl font-bold text-amber-600">{PRICING.WEEKEND_DISCOUNT.THREE_WEEKS.toLocaleString()}원</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-amber-100">
                <p className="text-lg font-medium mb-3 text-amber-800">3주일 이상</p>
                <p className="text-xl font-bold text-amber-600">{PRICING.WEEKEND_DISCOUNT.FOUR_WEEKS.toLocaleString()}원</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">※ 4주일 이상 대여 시 주말 가격도 평일과 동일한 {PRICING.WEEKEND_DISCOUNT.OVER_FOUR_WEEKS.toLocaleString()}원으로 적용됩니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl p-12 text-center mb-16 shadow-lg border border-amber-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-amber-800">지금 바로 예약하세요</h2>
          <p className="text-xl mb-8 text-amber-700">특별한 행사를 위한 뻥튀기 기계, 지금 바로 예약하고 즐거운 추억을 만들어보세요.</p>
          <Link href="/reservation" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg text-xl inline-block">
            예약 페이지로 이동
          </Link>
        </div>
      </section>
    </div>
  );
}
