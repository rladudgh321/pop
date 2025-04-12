import { PRICING, RICE_OPTIONS } from '../constants/data';

/**
 * 주말인지 확인하는 함수 (토요일 또는 일요일)
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // 0: 일요일, 6: 토요일
};

/**
 * 두 날짜 사이의 일수를 계산하는 함수
 */
export const getDaysBetween = (startDate: Date, endDate: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000; // 밀리초 단위의 하루
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // 시간 정보 제거 (날짜만 비교)
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  // 두 날짜 사이의 밀리초 차이를 일수로 변환
  const diffDays = Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay));
  
  // 대여 당일도 포함하므로 +1
  return diffDays + 1;
};

/**
 * 대여 기간에 따른 주말 가격을 계산하는 함수
 */
export const getWeekendPriceByDuration = (totalDays: number): number => {
  if (totalDays >= 28) { // 4주 이상
    return PRICING.WEEKEND_DISCOUNT.OVER_FOUR_WEEKS;
  } else if (totalDays >= 21) { // 3주 이상
    return PRICING.WEEKEND_DISCOUNT.FOUR_WEEKS;
  } else if (totalDays >= 14) { // 2주 이상
    return PRICING.WEEKEND_DISCOUNT.THREE_WEEKS;
  } else if (totalDays >= 7) { // 1주 이상
    return PRICING.WEEKEND_DISCOUNT.TWO_WEEKS;
  } else { // 1주 미만
    return PRICING.WEEKEND_DISCOUNT.ONE_WEEK;
  }
};

/**
 * 대여 기간 동안의 평일과 주말 일수를 계산하는 함수
 */
export const getWeekdaysAndWeekends = (startDate: Date, endDate: Date): { weekdays: number; weekends: number } => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // 시간 정보 제거 (날짜만 비교)
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  let weekdays = 0;
  let weekends = 0;
  
  // 시작일부터 종료일까지 각 날짜를 확인
  const current = new Date(start);
  while (current <= end) {
    if (isWeekend(current)) {
      weekends++;
    } else {
      weekdays++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return { weekdays, weekends };
};

/**
 * 원재료 옵션에 따른 추가 가격을 계산하는 함수
 */
export const getRiceOptionPrice = (selectedRiceOptions: { id: number; quantity: number }[]): number => {
  if (!selectedRiceOptions || selectedRiceOptions.length === 0) return 0;
  
  return selectedRiceOptions.reduce((total, option) => {
    const riceOption = RICE_OPTIONS.find(o => o.id === option.id);
    return total + (riceOption ? riceOption.price * option.quantity : 0);
  }, 0);
};

/**
 * 원재료 옵션에 따른 계산
 */


/**
 * 총 대여 가격을 계산하는 함수
 */
export const calculateTotalPrice = (
  startDate: Date,
  endDate: Date,
  riceOptionId: number | null
): number => {
  // 콘솔에 계산 과정 출력 (백엔드 구현 전 임시)
  console.log(`대여 시작일: ${startDate.toLocaleDateString()}`);
  console.log(`대여 종료일: ${endDate.toLocaleDateString()}`);
  
  // 총 대여 일수 계산
  const totalDays = getDaysBetween(startDate, endDate);
  console.log(`총 대여 일수: ${totalDays}일`);
  
  // 평일과 주말 일수 계산
  const { weekdays, weekends } = getWeekdaysAndWeekends(startDate, endDate);
  console.log(`평일: ${weekdays}일, 주말: ${weekends}일`);
  
  // 주말 가격 (대여 기간에 따라 할인)
  const weekendPrice = getWeekendPriceByDuration(totalDays);
  console.log(`적용된 주말 가격: ${weekendPrice.toLocaleString()}원`);
  
  // 기본 대여 가격 계산
  const basePrice = (weekdays * PRICING.WEEKDAY) + (weekends * weekendPrice);
  console.log(`기본 대여 가격: ${basePrice.toLocaleString()}원`);
  
  // 원재료 옵션 추가 가격
  const optionPrice = getRiceOptionPrice(riceOptionId);
  console.log('riceOptionId', riceOptionId);
  console.log(`원재료 옵션 추가 가격: ${optionPrice.toLocaleString()}원`);
  
  // 총 가격
  const totalPrice = basePrice + optionPrice;
  console.log(`최종 가격: ${totalPrice.toLocaleString()}원`);
  
  return totalPrice;
};
