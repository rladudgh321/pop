'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { MACHINES, RICE_OPTIONS } from '../../constants/data';
import { calculateTotalPrice } from '../../utils/pricing';

function ReservationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMachineId = searchParams.get('machine') ? parseInt(searchParams.get('machine') as string) : null;

  // 상태 관리
  const [selectedMachine, setSelectedMachine] = useState<number | null>(initialMachineId);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedRiceOption, setSelectedRiceOption] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  // 가격 계산
  const calculatePrice = () => {
    if (!selectedMachine || !startDate || !endDate) {
      alert('기계와 대여 기간을 선택해주세요.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      alert('종료일은 시작일 이후여야 합니다.');
      return;
    }

    const price = calculateTotalPrice(start, end, selectedRiceOption);
    setTotalPrice(price);
    setIsCalculated(true);

    // 콘솔에 예약 정보 출력 (백엔드 구현 전 임시)
    console.log('===== 예약 정보 =====');
    console.log(`선택한 기계: ${MACHINES.find(m => m.id === selectedMachine)?.name}`);
    console.log(`대여 시작일: ${start.toLocaleDateString()}`);
    console.log(`대여 종료일: ${end.toLocaleDateString()}`);
    console.log(`선택한 원재료: ${selectedRiceOption ? RICE_OPTIONS.find(o => o.id === selectedRiceOption)?.name : '일반 쌀'}`);
    console.log(`총 가격: ${price.toLocaleString()}원`);
  };

  // 결제 처리
  const handlePayment = () => {
    if (!customerName || !customerPhone || !customerEmail) {
      alert('고객 정보를 모두 입력해주세요.');
      return;
    }

    // 결제 처리 (백엔드 구현 전 콘솔에 출력)
    console.log('===== 결제 정보 =====');
    console.log(`고객명: ${customerName}`);
    console.log(`연락처: ${customerPhone}`);
    console.log(`이메일: ${customerEmail}`);
    console.log(`결제 금액: ${totalPrice.toLocaleString()}원`);
    console.log('결제가 완료되었습니다.');

    // 결제 완료 후 완료 페이지로 이동
    alert('예약 및 결제가 완료되었습니다. 감사합니다!');
    router.push('/');
  };

  // 초기 기계 선택 시 스크롤
  useEffect(() => {
    if (initialMachineId) {
      const element = document.getElementById('machine-selection');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [initialMachineId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">뻥튀기 기계 예약</h1>

      {/* 예약 단계 */}
      <div className="mb-12">
        <div className="flex justify-center items-center mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedMachine ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>1</div>
          <div className={`h-1 w-16 ${startDate && endDate ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${startDate && endDate ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>2</div>
          <div className={`h-1 w-16 ${isCalculated ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCalculated ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>3</div>
        </div>
        <div className="flex justify-center text-sm text-gray-600 space-x-12">
          <span>기계 선택</span>
          <span>날짜 선택</span>
          <span>결제</span>
        </div>
      </div>

      {/* 기계 선택 */}
      <section id="machine-selection" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">1. 기계 선택</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MACHINES.map((machine) => (
            <div 
              key={machine.id} 
              className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${selectedMachine === machine.id ? 'border-amber-600 ring-2 ring-amber-600' : 'border-gray-200 hover:border-amber-300'}`}
              onClick={() => setSelectedMachine(machine.id)}
            >
              <div className="relative h-48">
                <Image
                  src={machine.image}
                  alt={machine.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{machine.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{machine.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${machine.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {machine.available ? '대여 가능' : '대여 중'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 날짜 선택 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">2. 대여 기간 선택</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">시작일</label>
            <input 
              type="date" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">종료일</label>
            <input 
              type="date" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
      </section>

      {/* 원재료 옵션 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">3. 원재료 옵션 선택</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RICE_OPTIONS.map((option) => (
            <div 
              key={option.id} 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedRiceOption === option.id ? 'border-amber-600 ring-2 ring-amber-600' : 'border-gray-200 hover:border-amber-300'}`}
              onClick={() => setSelectedRiceOption(option.id)}
            >
              <h3 className="text-lg font-semibold mb-2">{option.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{option.description}</p>
              <p className="text-amber-600 font-bold">
                {option.price > 0 ? `+${option.price.toLocaleString()}원` : '기본 제공'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 가격 계산 버튼 */}
      <div className="mb-12 text-center">
        <button 
          onClick={calculatePrice}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
          disabled={!selectedMachine || !startDate || !endDate}
        >
          가격 계산하기
        </button>
      </div>

      {/* 가격 정보 및 결제 */}
      {isCalculated && (
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">4. 예약 정보 확인 및 결제</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">예약 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <p className="text-gray-600 mb-1">선택한 기계</p>
                <p className="text-lg font-semibold">{MACHINES.find(m => m.id === selectedMachine)?.name}</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-gray-600 mb-1">선택한 원재료</p>
                <p className="text-lg font-semibold">{selectedRiceOption ? RICE_OPTIONS.find(o => o.id === selectedRiceOption)?.name : '일반 쌀'}</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-gray-600 mb-1">대여 시작일</p>
                <p className="text-lg font-semibold">{new Date(startDate).toLocaleDateString()}</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-gray-600 mb-1">대여 종료일</p>
                <p className="text-lg font-semibold">{new Date(endDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">총 결제 금액</p>
                <p className="text-2xl font-bold text-amber-600">{totalPrice.toLocaleString()}원</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">고객 정보 입력</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">이름</label>
                <input 
                  type="text" 
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">연락처</label>
                <input 
                  type="tel" 
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="연락처를 입력하세요"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">이메일</label>
                <input 
                  type="email" 
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="이메일을 입력하세요"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={handlePayment}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
              disabled={!customerName || !customerPhone || !customerEmail}
            >
              결제하기
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default function ReservationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReservationContent />
    </Suspense>
  );
}