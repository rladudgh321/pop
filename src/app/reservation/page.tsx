import { Metadata } from 'next';
import ReservationClient from './reservationClient';

export const metadata: Metadata = {
  title: '뻥튀기 기계 예약',
  description: '그린농장의 뻥튀기 기계를 예약하고 대여하세요. 다양한 기계와 원재료 옵션을 제공합니다.',
};

export default function ReservationPage() {
  return (
      <ReservationClient />
  );
}