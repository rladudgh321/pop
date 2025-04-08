import { Machine, RiceOption } from '../types';

// 뻥튀기 기계 데이터
export const MACHINES: Machine[] = [
  {
    id: 1,
    name: '뻥튀기 기계 A',
    description: '소형 뻥튀기 기계, 시간당 최대 50개 생산 가능',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=1470&auto=format&fit=crop',
    available: true,
  },
  {
    id: 2,
    name: '뻥튀기 기계 B',
    description: '중형 뻥튀기 기계, 시간당 최대 100개 생산 가능',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1472&auto=format&fit=crop',
    available: true,
  },
  {
    id: 3,
    name: '뻥튀기 기계 C',
    description: '대형 뻥튀기 기계, 시간당 최대 200개 생산 가능',
    image: 'https://images.unsplash.com/photo-1612200385488-e3e8ec94d42a?q=80&w=1470&auto=format&fit=crop',
    available: true,
  },
];

// 원재료 옵션 데이터
export const RICE_OPTIONS: RiceOption[] = [
  {
    id: 1,
    name: '일반 쌀',
    price: 0, // 기본 옵션이므로 추가 비용 없음
    description: '기본 제공되는 일반 쌀',
  },
  {
    id: 2,
    name: '단호박 쌀',
    price: 70000, // 7만원
    description: '달콤한 맛이 특징인 단호박 쌀',
  },
  {
    id: 3,
    name: '자색고구마 쌀',
    price: 93000, // 9만 3천원
    description: '영양가가 높고 색이 고운 자색고구마 쌀',
  },
];

// 가격 계산 관련 상수
export const PRICING = {
  WEEKDAY: 50000, // 평일 가격: 5만원
  WEEKEND: 100000, // 주말 가격: 10만원
  WEEKEND_DISCOUNT: {
    ONE_WEEK: 100000, // 1주일 이내: 10만원 (할인 없음)
    TWO_WEEKS: 80000, // 1~2주일: 8만원
    THREE_WEEKS: 70000, // 2~3주일: 7만원
    FOUR_WEEKS: 60000, // 3~4주일: 6만원
    OVER_FOUR_WEEKS: 50000, // 4주일 이상: 5만원
  },
};

// 배송 거리별 가격
export const DELIVERY_PRICES = [
  { distance: 5, price: 20000 },
  { distance: 10, price: 23000 },
  { distance: 15, price: 27000 },
  { distance: 20, price: 30000 },
  { distance: 25, price: 35000 },
  { distance: 30, price: 38000 },
  { distance: 35, price: 42000 },
  { distance: 40, price: 48000 },
  { distance: 45, price: 54000 },
  { distance: 50, price: 58000 },
  { distance: 60, price: 64000 },
  { distance: 70, price: 68000 },
  { distance: 80, price: 75000 },
  { distance: 90, price: 80000 },
  { distance: 100, price: 85000 },
  { distance: 150, price: 100000 },
  { distance: 200, price: 140000 },
  { distance: 250, price: 170000 },
  { distance: 300, price: 200000 },
  { distance: 350, price: 230000 },
];