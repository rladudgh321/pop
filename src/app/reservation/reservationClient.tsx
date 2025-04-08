'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { object, string, number, boolean, date } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MACHINES, RICE_OPTIONS, DELIVERY_PRICES } from '../../constants/data';
import { calculateTotalPrice } from '../../utils/pricing';

interface DeliveryOption {
  distance: number;
  price: number;
  isRoundTrip: boolean;
}

interface ReservationFormData {
  selectedMachine: number | null;
  startDate: string;
  endDate: string;
  selectedRiceOption: number | null;
  deliveryOption: DeliveryOption | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

const validationSchema = object().shape({
  selectedMachine: number().nullable().required('기계를 선택해주세요.'),
  startDate: string().required('대여 시작일을 선택해주세요.'),
  endDate: string().required('대여 종료일을 선택해주세요.'),
  selectedRiceOption: number().nullable(),
  customerName: string().when('isCalculated', {
    is: true,
    then: string().required('이름을 입력해주세요.')
  }),
  customerPhone: string().when('isCalculated', {
    is: true,
    then: string().required('연락처를 입력해주세요.')
      .matches(/^\d{2,3}-\d{3,4}-\d{4}$/, '올바른 전화번호 형식이 아닙니다.')
  }),
  customerEmail: string().when('isCalculated', {
    is: true,
    then: string().required('이메일을 입력해주세요.')
      .email('올바른 이메일 형식이 아닙니다.')
  })
});

const ReservationClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMachineId = searchParams.get('machine') ? parseInt(searchParams.get('machine') as string) : null;

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<ReservationFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      selectedMachine: initialMachineId,
      startDate: '',
      endDate: '',
      selectedRiceOption: null,
      deliveryOption: null,
      customerName: '',
      customerPhone: '',
      customerEmail: ''
    }
  });

  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  const selectedMachine = watch('selectedMachine');
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  // 가격 계산
  const calculatePrice = () => {
    if (!selectedMachine || !startDate || !endDate) return;
  
    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(endDate + 'T00:00:00');
  
    if (start > end) {
      alert('종료일은 시작일 이후여야 합니다.');
      return;
    }
  
    const selectedRiceOption = watch('selectedRiceOption');
    const deliveryOption = watch('deliveryOption');
  
    const price = calculateTotalPrice(start, end, selectedRiceOption) +
      (deliveryOption ? (deliveryOption.isRoundTrip ? deliveryOption.price * 2 : deliveryOption.price) : 0);
  
    setTotalPrice(price);
    setIsCalculated(true);
  };

  // 결제 처리
  const onSubmit = async (data: ReservationFormData) => {
    try {
      // 결제 처리 (백엔드 구현 전 콘솔에 출력)
      console.log('===== 결제 정보 =====');
      console.log('예약 정보:', data);
      console.log(`결제 금액: ${totalPrice.toLocaleString()}원`);

      // 결제 완료 후 완료 페이지로 이동
      alert('예약 및 결제가 완료되었습니다. 감사합니다!');
      router.push('/');
    } catch (error) {
      console.error('결제 처리 중 오류 발생:', error);
      alert('결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
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

  // 폼 값 변경 시 자동 가격 계산
  useEffect(() => {
    if (selectedMachine && startDate && endDate) {
      calculatePrice();
    }
  }, [selectedMachine, startDate, endDate]);
  return (
    <div className="container mx-auto px-4 py-8 relative">
    <div className="absolute inset-0" style={{ backgroundImage: 'url("/popcorn-pattern.svg")', backgroundSize: '200px', opacity: 0.1 }} />
      
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-500">뻥튀기 기계 예약</h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl drop-shadow-md ">최고의 품질과 서비스로 특별한 순간을 만들어드립니다</p>
        </div>
      </section>

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
      <section id="machine-selection" className="mb-12 relative bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 shadow-lg border border-amber-100">
        <h2 className="text-2xl font-semibold mb-6">1. 기계 선택</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MACHINES.map((machine) => (
            <div 
              key={machine.id} 
              className={`bg-white border-2 rounded-lg overflow-hidden cursor-pointer transition-all transform hover:scale-105 ${selectedMachine === machine.id ? 'border-amber-600 ring-2 ring-amber-600 shadow-xl' : 'border-amber-200 hover:border-amber-400 shadow-lg hover:shadow-xl'}`}
              onClick={() => setValue('selectedMachine', machine.id)}
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
      <section className="mb-12 relative bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 shadow-lg border border-amber-100">
        <h2 className="text-2xl font-semibold mb-6">2. 대여 기간 선택</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300">
            <label className="block text-gray-700 mb-2">시작일</label>
            <input 
              type="date" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
              {...register('startDate')}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all ${errors.startDate ? 'border-red-500' : ''}`}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300">
            <label className="block text-gray-700 mb-2">종료일</label>
            <input 
              type="date" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
              {...register('endDate')}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all ${errors.endDate ? 'border-red-500' : ''}`}
              min={startDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
      </section>

      {/* 원재료 옵션 */}
      <section className="mb-12 relative bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 shadow-lg border border-amber-100">
        <h2 className="text-2xl font-semibold mb-6">3. 원재료 옵션 선택</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RICE_OPTIONS.map((option) => (
            <div 
              key={option.id} 
              className={`border rounded-lg p-6 cursor-pointer transition-all transform hover:scale-105 ${selectedRiceOption === option.id ? 'border-amber-600 ring-2 ring-amber-600 shadow-lg bg-amber-50' : 'border-gray-200 hover:border-amber-300 hover:shadow-md bg-white'}`}
              onClick={() => setValue('selectedRiceOption', option.id)}
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

      {/* 용달 옵션 */}
      <section className="mb-12 relative bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 shadow-lg border border-amber-100">
        <h2 className="text-2xl font-semibold mb-6">4. 용달 옵션 선택</h2>
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300">
              <label className="block text-gray-700 mb-2">배송 거리</label>
              <select
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
                {...register('deliveryOption.distance')}
                onChange={(e) => {
                  const distance = parseInt(e.target.value);
                  const price = DELIVERY_PRICES.find(p => p.distance === distance)?.price || 0;
                  setValue('deliveryOption', {
                    distance,
                    price,
                    isRoundTrip: watch('deliveryOption')?.isRoundTrip || false
                  });
                }}
                value={watch('deliveryOption')?.distance || ''}
              >
                <option value="">거리를 선택하세요</option>
                {DELIVERY_PRICES.map((option) => (
                  <option key={option.distance} value={option.distance}>
                    {option.distance}km - {option.price.toLocaleString()}원
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300">
              <label className="block text-gray-700 mb-2">배송 방식</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={deliveryOption?.isRoundTrip === false} onChange={() => setDeliveryOption(prev => prev ? { ...prev, isRoundTrip: false } : { distance: 0, price: 0, isRoundTrip: false })} className="form-radio text-amber-600"
                  />
                  <span>일주일 이상 이벤트가 - 편도</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={deliveryOption?.isRoundTrip === true} onChange={() => setDeliveryOption(prev => prev ? { ...prev, isRoundTrip: true } : { distance: 0, price: 0, isRoundTrip: true })} className="form-radio text-amber-600"
                  />
                  <span>기본가 - 왕복 (편도 가격의 2배)</span>
                </label>
              </div>
            </div>
          </div>
          {deliveryOption && (
            <div className="mt-4 p-4 bg-amber-50 rounded-lg">
              <p className="text-amber-700">
                선택한 배송 옵션: {deliveryOption.distance}km {deliveryOption.isRoundTrip ? '왕복' : '편도'} -
                {(deliveryOption.isRoundTrip ? deliveryOption.price * 2 : deliveryOption.price).toLocaleString()}원
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 가격 계산 버튼 */}
      <div className="mb-12 text-center">
        <button 
          onClick={handleSubmit(calculatePrice)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          disabled={!selectedMachine || !startDate || !endDate || isSubmitting}
        >
          가격 계산하기
        </button>
      </div>

      {/* 가격 정보 및 결제 */}
      {isCalculated && (
        <section className="mb-12 bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 shadow-lg border border-amber-100 transform transition-all hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">5. 예약 정보 확인 및 결제</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">예약 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
                <p className="text-gray-600 mb-1">선택한 기계</p>
                <p className="text-lg font-semibold">{MACHINES.find(m => m.id === selectedMachine)?.name}</p>
              </div>
              <div className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
                <p className="text-gray-600 mb-1">선택한 원재료</p>
                <p className="text-lg font-semibold">{selectedRiceOption ? RICE_OPTIONS.find(o => o.id === selectedRiceOption)?.name : '일반 쌀'}</p>
              </div>
              <div className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
                <p className="text-gray-600 mb-1">대여 시작일</p>
                <p className="text-lg font-semibold">{new Date(startDate).toLocaleDateString()}</p>
              </div>
              <div className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
                <p className="text-gray-600 mb-1">대여 종료일</p>
                <p className="text-lg font-semibold">{new Date(endDate).toLocaleDateString()}</p>
              </div>
              {deliveryOption && (
                <div className="md:col-span-2 border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
                  <p className="text-gray-600 mb-1">배송 옵션</p>
                  <p className="text-lg font-semibold">
                    {deliveryOption.distance}km {deliveryOption.isRoundTrip ? '왕복' : '편도'} - 
                    {(deliveryOption.isRoundTrip ? deliveryOption.price * 2 : deliveryOption.price).toLocaleString()}원
                  </p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-lg p-6 mb-6 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl">
              <div className="flex justify-between items-center text-white">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">총 결제 금액</p>
                <p className="text-3xl font-bold text-amber-600">{totalPrice.toLocaleString()}원</p>
              </div>
            </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">고객 정보 입력</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300">
                  <label className="block text-gray-700 mb-2">이름</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
                    {...register('customerName')}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all ${errors.customerName ? 'border-red-500' : ''}`}
                  />
                  {errors.customerName && (
                    <p className="mt-1 text-sm text-red-500">{errors.customerName.message}</p>
                  )
                    placeholder="이름을 입력하세요"
                  />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300">
                  <label className="block text-gray-700 mb-2">연락처</label>
                  <input 
                    type="tel" 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
                    {...register('customerPhone')}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all ${errors.customerPhone ? 'border-red-500' : ''}`}
                  />
                  {errors.customerPhone && (
                    <p className="mt-1 text-sm text-red-500">{errors.customerPhone.message}</p>
                  )
                    placeholder="연락처를 입력하세요"
                  />
                </div>
                <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <label className="block text-gray-700 mb-2">이메일</label>
                  <input 
                    type="email" 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
                    {...register('customerEmail')}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all ${errors.customerEmail ? 'border-red-500' : ''}`}
                  />
                  {errors.customerEmail && (
                    <p className="mt-1 text-sm text-red-500">{errors.customerEmail.message}</p>
                  )
                    placeholder="이메일을 입력하세요"
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={handlePayment}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-12 rounded-full transition-all transform hover:scale-105 shadow-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={!customerName || !customerPhone || !customerEmail}
              >
                결제하기
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ReservationClient;