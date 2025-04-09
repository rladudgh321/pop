// 기계 타입 정의
export type Machine = {
  id: number;
  name: string;
  description: string;
  image: string;
  available: boolean;
  pricePerDay: number;
};

// 원재료 옵션 타입 정의
export type RiceOption = {
  id: number;
  name: string;
  price: number;
  description: string;
};

// 예약 타입 정의
export type Reservation = {
  id: number;
  machineId: number;
  startDate: Date;
  endDate: Date;
  riceOptionId: number | null;
  totalPrice: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
};

// QnA 게시판 질문 타입 정의
export type Question = {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  createdAt: Date;
  isAnswered: boolean;
  answer: Answer | null;
};

// QnA 게시판 답변 타입 정의
export type Answer = {
  id: number;
  questionId: number;
  content: string;
  createdAt: Date;
};