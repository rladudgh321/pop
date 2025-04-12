"use client"

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DELIVERY_PRICES } from '../../../constants/data';

interface FormData {
  deliveryOption: {
    distance: string;
    isRoundTrip: boolean;
  };
}

const DeliveryOptionSelection = () => {
  const { register, watch, formState: { errors } } = useFormContext<FormData>();
  const deliveryOption = watch('deliveryOption');
  console.log('deliveryOption**', deliveryOption)
  // 로컬 상태 추가
  const [selectedDistance, setSelectedDistance] = useState<string>('');
  const [isRoundTrip, setIsRoundTrip] = useState<boolean | null>(null);

  // 배송 거리 변경 핸들러
  const handleDistanceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistance(e.target.value);
  };

  // 배송 방식 변경 핸들러
  const handleTripTypeChange = (value: string) => {
    setIsRoundTrip(value === 'true');
  };

  return (
    <section className="mb-12 relative bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 shadow-lg border border-amber-100">
      <h2 className="text-2xl font-semibold mb-6">4. 용달 옵션 선택</h2>
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300">
            <label htmlFor="deliveryDistance" className="block text-gray-700 mb-2">배송 거리</label>
            <select
              id="deliveryDistance"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all ${errors.deliveryOption?.distance ? 'border-red-500' : ''}`}
              {...register('deliveryOption.distance', { required: '배송 거리를 선택해주세요.' })}
              onChange={(e) => {
                register('deliveryOption.distance').onChange(e);
                handleDistanceChange(e);
              }}
            >
              <option value="">거리를 선택하세요</option>
              {DELIVERY_PRICES.map((option) => (
                <option key={option.distance} value={option.distance}>
                  {option.distance}km - {option.price.toLocaleString()}원
                </option>
              ))}
            </select>
            {errors.deliveryOption?.distance && (
              <p className="mt-1 text-sm text-red-500">{errors.deliveryOption?.distance?.message}</p>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300">
            <label className="block text-gray-700 mb-2">배송 방식</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="onewayprice"
                  className="form-radio text-amber-600"
                  disabled={!selectedDistance}
                  {...register('deliveryOption.isRoundTrip', { required: '배송 방식을 선택해주세요.' })}
                  onChange={(e) => {
                    register('deliveryOption.isRoundTrip').onChange(e);
                    handleTripTypeChange(e.target.value);
                  }}
                />
                <span>일주일 이상 이벤트가 - 편도</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="twowayprice"
                  className="form-radio text-amber-600"
                  disabled={!selectedDistance}
                  {...register('deliveryOption.isRoundTrip', { required: '배송 방식을 선택해주세요.' })}
                  onChange={(e) => {
                    register('deliveryOption.isRoundTrip').onChange(e);
                    handleTripTypeChange(e.target.value);
                  }}
                />
                <span>기본가 - 왕복 (편도 가격의 2배)</span>
              </label>
              {errors.deliveryOption?.isRoundTrip && (
                <p className="mt-1 text-sm text-red-500">{errors.deliveryOption.isRoundTrip.message}</p>
              )}
            </div>
          </div>
        </div>
        {selectedDistance && isRoundTrip !== null && (
          <div className="mt-4 p-4 bg-amber-50 rounded-lg">
            <p className="text-amber-700">
              선택한 배송 옵션: {selectedDistance}km {isRoundTrip ? '왕복' : '편도'} -
              {((isRoundTrip ? 
                (DELIVERY_PRICES.find(p => p.distance === Number(selectedDistance))?.price || 0) * 2 : 
                DELIVERY_PRICES.find(p => p.distance === Number(selectedDistance))?.price || 0
              )).toLocaleString()}원
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DeliveryOptionSelection; 