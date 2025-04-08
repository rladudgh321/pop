import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '기계 소개',
  description: '팝콘팝에서 대여 가능한 뻥튀기 기계들을 소개합니다.',
};

export default function MachinesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-600 mb-8">기계 소개</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 기계 1 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">기계 이미지</span>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">프리미엄 뻥튀기 기계</h2>
            <p className="text-gray-600 mb-4">최신 기술이 적용된 고성능 뻥튀기 기계로, 다양한 종류의 뻥튀기를 만들 수 있습니다.</p>
            <div className="flex justify-between items-center">
              <span className="text-amber-600 font-bold">일일 대여료: 50,000원</span>
              <Link href="/reservation?machine=1" className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors">예약하기</Link>
            </div>
          </div>
        </div>

        {/* 기계 2 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">기계 이미지</span>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">표준 뻥튀기 기계</h2>
            <p className="text-gray-600 mb-4">가성비 좋은 표준형 뻥튀기 기계로, 기본적인 뻥튀기 제작에 최적화되어 있습니다.</p>
            <div className="flex justify-between items-center">
              <span className="text-amber-600 font-bold">일일 대여료: 35,000원</span>
              <Link href="/reservation?machine=2" className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors">예약하기</Link>
            </div>
          </div>
        </div>

        {/* 기계 3 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">기계 이미지</span>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">미니 뻥튀기 기계</h2>
            <p className="text-gray-600 mb-4">소형화된 디자인의 뻥튀기 기계로, 공간이 협소한 장소에서도 사용하기 좋습니다.</p>
            <div className="flex justify-between items-center">
              <span className="text-amber-600 font-bold">일일 대여료: 25,000원</span>
              <Link href="/reservation?machine=3" className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors">예약하기</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}