import { useFormContext } from 'react-hook-form';
import { MACHINES, RICE_OPTIONS, DELIVERY_PRICES } from '../../../constants/data';
import CustomerInformation from './CustomerInformation';
import { useEffect, useState } from 'react';

const ReservationSummary = ({ totalPrice }: { totalPrice: number }) => {
  const { watch } = useFormContext();
  const selectedMachine = watch('selectedMachine');
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const selectedRiceOption = watch('selectedRiceOption');
  const deliveryOption = watch('deliveryOption');
  console.log('deliveryOption', deliveryOption);


  const [calculatedPrice, setCalculatedPrice] = useState(totalPrice);

  const selectedMachineData = MACHINES.find(m => m.id === selectedMachine);
  const selectedRiceOptionData = selectedRiceOption ? RICE_OPTIONS.find(o => o.id === selectedRiceOption) : null;
  const deliveryPrice = deliveryOption?.distance ? 
    (DELIVERY_PRICES.find(p => p.distance === Number(deliveryOption.distance))?.price || 0) : 0;

  console.log('deliveryPrice', deliveryPrice);

  // 날짜 차이 계산 함수
  const calculateDaysDifference = (start: string, end: string) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1을 해서 당일도 포함
  };

  // 실시간 가격 계산
  useEffect(() => {
    if (selectedMachineData && startDate && endDate) {
      const days = calculateDaysDifference(startDate, endDate);
      const machinePrice = selectedMachineData.pricePerDay * days;
      const riceOptionPrice = selectedRiceOptionData?.price || 0;
      const deliveryOption = watch('deliveryOption');
      const deliveryTotalPrice = deliveryOption?.isRoundTrip ? deliveryPrice * 2 : deliveryPrice;
      const total = machinePrice + riceOptionPrice + deliveryTotalPrice;
      setCalculatedPrice(total);
    }
  }, [selectedMachineData, startDate, endDate, selectedRiceOptionData, deliveryOption, deliveryPrice, watch]);

  return (
    <section className="mb-12 bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 shadow-lg border border-amber-100 transform transition-all hover:shadow-xl">
      <h2 className="text-2xl font-semibold mb-6">5. 예약 정보 확인 및 결제</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">예약 정보</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
            <p className="text-gray-600 mb-1">선택한 기계</p>
            <p className="text-lg font-semibold">{selectedMachineData?.name || '-'}</p>
            {selectedMachineData && startDate && endDate && (
              <p className="text-sm text-amber-600 mt-2">
                {calculateDaysDifference(startDate, endDate)}일 × {selectedMachineData.pricePerDay.toLocaleString()}원 = {(calculateDaysDifference(startDate, endDate) * selectedMachineData.pricePerDay).toLocaleString()}원
              </p>
            )}
          </div>
          <div className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
            <p className="text-gray-600 mb-1">선택한 원재료</p>
            <p className="text-lg font-semibold">{selectedRiceOptionData?.name || '일반 쌀'}</p>
            {selectedRiceOptionData && selectedRiceOptionData.price > 0 && (
              <p className="text-sm text-amber-600 mt-2">
                추가 비용: {selectedRiceOptionData.price.toLocaleString()}원
              </p>
            )}
          </div>
          <div className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
            <p className="text-gray-600 mb-1">대여 시작일</p>
            <p className="text-lg font-semibold">{startDate ? new Date(startDate).toLocaleDateString() : '-'}</p>
          </div>
          <div className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
            <p className="text-gray-600 mb-1">대여 종료일</p>
            <p className="text-lg font-semibold">{endDate ? new Date(endDate).toLocaleDateString() : '-'}</p>
          </div>
          {deliveryOption?.distance && (
            <div className="md:col-span-2 border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
              <p className="text-gray-600 mb-1">배송 옵션</p>
              <p className="text-lg font-semibold">
                { console.log('deliveryOption!!!!!!!!! 배송옵션', deliveryOption.isRoundTrip) }
                {deliveryOption.distance}km {deliveryOption.isRoundTrip === true ? '왕복' : '편도'} - 
                {((deliveryOption.isRoundTrip ? Number(deliveryPrice) * 2 : deliveryPrice) || 0).toLocaleString()}원
              </p>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-lg p-6 mb-6 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl">
          <div className="flex justify-between items-center text-white">
            <p className="text-lg font-semibold">총 결제 금액</p>
            <p className="text-3xl font-bold">{calculatedPrice.toLocaleString()}원</p>
          </div>
        </div>

        <CustomerInformation />
      </div>
    </section>
  );
};

export default ReservationSummary; 