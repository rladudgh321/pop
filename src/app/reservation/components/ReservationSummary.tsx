import { useFormContext } from 'react-hook-form';
import { MACHINES, RICE_OPTIONS, DELIVERY_PRICES, PRICING } from '../../../constants/data';
import CustomerInformation from './CustomerInformation';
import { useEffect, useState } from 'react';
import { getDaysBetween, getWeekdaysAndWeekends, getWeekendPriceByDuration } from '@/utils/pricing';

const ReservationSummary = ({ totalPrice }: { totalPrice: number }) => {
  const { watch } = useFormContext();
  const selectedMachine = watch('selectedMachine');
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  interface SelectedRiceOptionProps {
    id: number;
    quantity: number;
  }
  const selectedRiceOption: SelectedRiceOptionProps[] = watch('selectedRiceOptions');
  const deliveryOption = watch('deliveryOption');
  console.log('deliveryOption', deliveryOption);
  console.log('selectedRiceOptionㅡㅡㅡㅡ', selectedRiceOption);
  console.log('RICE_OPTIONSㅡㅡㅡㅡ', RICE_OPTIONS);
  const price = selectedRiceOption.map((v) => {
    const riceName = RICE_OPTIONS.find(o => o.id === v.id)?.name || '';
    const ricePrice = RICE_OPTIONS.find(o => o.id === v.id)?.price || 0;
    const riceQuantity = v.quantity || 0;
    return { riceName, ricePrice: Number(ricePrice), riceQuantity: Number(riceQuantity) };
  });
  console.log('price', price);

  const [calculatedPrice, setCalculatedPrice] = useState(totalPrice);

  const selectedMachineData = MACHINES.find(m => m.id === selectedMachine);
  const selectedRiceOptionData = selectedRiceOption ? RICE_OPTIONS.find(o => 
    selectedRiceOption.map((v) => (
      o.id === v.id
  ))) : null;
  
  const deliveryPrice = deliveryOption?.distance ? 
    (DELIVERY_PRICES.find(p => p.distance === Number(deliveryOption.distance))?.price || 0) : 0;
    console.log('selectedMachineData', selectedMachineData)
  console.log('selectedRiceOptionData', selectedRiceOptionData);
  console.log('deliveryPrice', deliveryPrice);

    const totalDays = getDaysBetween(startDate, endDate);
    const weekendPrice = getWeekendPriceByDuration(totalDays);
    
    const { weekdays, weekends } = getWeekdaysAndWeekends(startDate, endDate);
    const basePrice = (weekdays * PRICING.WEEKDAY) + (weekends * weekendPrice);
    console.log('!!@@basePrice', basePrice);

  // 실시간 가격 계산
  useEffect(() => {
    if (selectedMachineData && startDate && endDate) {
      const machinePrice = weekdays * 50000 + weekends * weekendPrice;
      const riceOptionPrice = price.map((v) => v.ricePrice * v.riceQuantity).reduce((acc, curr) => acc + curr, 0)
      const deliveryOption = watch('deliveryOption');
      const deliveryTotalPrice = (deliveryOption.isRoundTrip === 'twowayprice' ? Number(deliveryPrice) * 2 : deliveryPrice);
      const total = machinePrice + riceOptionPrice + deliveryTotalPrice;
      setCalculatedPrice(total);
    }
  }, [deliveryPrice, endDate, price, selectedMachineData, startDate, watch, weekdays, weekendPrice, weekends]);

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
                {weekdays}일 × 50,000원 + {weekends}일 × {(weekendPrice).toLocaleString()}원 = {(basePrice).toLocaleString()}원
              </p>
            )}
          </div>
          <div className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
            <p className="text-gray-600 mb-1">선택한 원재료</p>
            <div>
              <p className='text-lg font-semibold'>{price.map((v) => v.riceName).join(', ')}</p>
            </div>
            {selectedRiceOptionData && selectedRiceOptionData.price > 0 && (
              <p className="text-sm text-amber-600 mt-2">
                {price[0]?.riceQuantity && price[0]?.riceName} {price[0]?.riceQuantity && 'X'} {price[0]?.riceQuantity} {price[1]?.riceQuantity && ' + '}
                {price[1]?.riceQuantity && price[1]?.riceName} {price[1]?.riceQuantity && 'X'} {price[1]?.riceQuantity} {price[2]?.riceQuantity && ' + '}
                {price[2]?.riceQuantity && price[2]?.riceName} {price[2]?.riceQuantity && 'X'} {price[2]?.riceQuantity} &nbsp;=&nbsp;&nbsp;
                {price.map((v) => v.ricePrice * v.riceQuantity).reduce((acc, curr) => acc + curr, 0).toLocaleString()}원
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
                {deliveryOption.distance}km {deliveryOption.isRoundTrip === 'twowayprice' ? '왕복' : '편도'} - 
                {((deliveryOption.isRoundTrip === 'twowayprice' ? Number(deliveryPrice) * 2 : deliveryPrice) || 0).toLocaleString()}원
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