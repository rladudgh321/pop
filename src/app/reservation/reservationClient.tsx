'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { calculateTotalPrice } from '../../utils/pricing';
import type { ReservationFormData } from './context/FormContext';
import HeroSection from './components/HeroSection';
import ProgressSteps from './components/ProgressSteps';
import MachineSelection from './components/MachineSelection';
import DateSelection from './components/DateSelection';
import RiceOptionSelection from './components/RiceOptionSelection';
import DeliveryOptionSelection from './components/DeliveryOptionSelection';
import ReservationSummary from './components/ReservationSummary';

const ReservationClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMachineId = searchParams.get('machine') ? parseInt(searchParams.get('machine') as string) : null;

  const methods = useForm<ReservationFormData>({
    // mode: 'onChange',
    defaultValues: {
      selectedMachine: initialMachineId,
      // startDate: '',
      // endDate: '',
      // selectedRiceOption: null,
      // deliveryOption: null,
      // customerName: '',
      // customerPhone: '',
      // customerEmail: ''
    }
  });

  const { watch } = methods;

  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  const selectedMachine = watch('selectedMachine'); // 기계선택
  const startDate = watch('startDate'); // 날짜선택 시작일
  const endDate = watch('endDate'); // 날짜선택 종료일
  const selectedRiceOption = watch('selectedRiceOption'); // 원재료 옵션 선택
  const deliveryOption = watch('deliveryOption'); // 용달 옵션 선택
  const customerName = watch('customerName'); // 고객 이름
  const customerPhone = watch('customerPhone'); // 고객 번호
  const customerEmail = watch('customerEmail'); // 고객 이메일
  console.log('기계선택', selectedMachine);
  console.log('원재료 옵션 선택', selectedRiceOption);
  console.log('날짜선택 시작일', startDate);
  console.log('날짜선택 종료일', endDate);
  // 가격 계산
  const calculatePrice = useCallback(() => {
    try {
      const price = calculateTotalPrice(new Date(startDate), new Date(endDate), selectedRiceOption) +
        (deliveryOption ? (deliveryOption.isRoundTrip ? deliveryOption.price * 2 : deliveryOption.price) : 0);
    
      setTotalPrice(price);
      setIsCalculated(true);
    } catch (error) {
      console.error('가격 계산 중 오류 발생:', error);
      alert('가격 계산 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }, [deliveryOption, selectedRiceOption, startDate, endDate]);

  // 결제 처리
  const onSubmit: SubmitHandler<ReservationFormData> = (data) => {
    if (!isCalculated) {
      alert('가격을 먼저 계산해주세요.');
      return;
    }

    if (!data.customerName?.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!data.customerPhone?.trim()) {
      alert('연락처를 입력해주세요.');
      return;
    }

    if (!data.customerEmail?.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 가격이 계산되면 isCalculated를 false로 리셋
  useEffect(() => {
    const hasChanges = 
      selectedMachine !== methods.getValues('selectedMachine') ||
      startDate !== methods.getValues('startDate') ||
      endDate !== methods.getValues('endDate') ||
      selectedRiceOption !== methods.getValues('selectedRiceOption') ||
      JSON.stringify(deliveryOption) !== JSON.stringify(methods.getValues('deliveryOption'));

    if (hasChanges && isCalculated) {
      setIsCalculated(false);
    }
  }, [selectedMachine, startDate, endDate, selectedRiceOption, deliveryOption, methods, isCalculated]);

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto px-4 py-8 relative">
        <div style={{ backgroundImage: 'url("/popcorn-pattern.svg")', backgroundSize: '200px', opacity: 0.1 }} />
        
        <HeroSection />
        <ProgressSteps 
          selectedMachine={selectedMachine} 
          hasDateSelected={!!(startDate && endDate)}
          hasRiceOptionSelected={!!selectedRiceOption}
          hasDeliveryOptionSelected={!!(deliveryOption?.distance && deliveryOption?.isRoundTrip !== undefined)}
          isCalculated={isCalculated} 
        />
        <MachineSelection />
        <DateSelection />
        <RiceOptionSelection />
        <DeliveryOptionSelection />

        <form onSubmit={methods.handleSubmit(onSubmit)} className="text-center">
          {/* 가격 계산 버튼 */}
          <div className="mb-12">
            <button 
              type="button"
              onClick={calculatePrice}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={!selectedMachine || !startDate || !endDate}
            >
              가격 계산하기
            </button>
          </div>

          {/* 가격 정보 및 결제 */}
          {isCalculated && (
            <ReservationSummary 
              totalPrice={totalPrice}
            />
          )} 

          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg text-xl"
          >
            결제하기
          </button>
        </form>
        
      </div>
    </FormProvider>
  );
};

export default ReservationClient;