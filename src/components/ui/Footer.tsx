import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-amber-50 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("/popcorn-pattern.svg")', backgroundSize: '200px' }} />
      <div className="container mx-auto px-4 py-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 회사 정보 */}
          <div>
            <h3 className="text-lg font-bold text-amber-600 mb-4">그린농장</h3>
            <p className="text-gray-600 mb-2">뻥튀기 기계 대여 전문 업체</p>
            <p className="text-gray-600">사업자 등록번호: 867-13-02115</p>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-lg font-bold text-amber-600 mb-4">연락처</h3>
            <p className="text-gray-600 mb-2">전화: 010-2757-6638</p>
            <p className="text-gray-600 mb-2">이메일: jiou00@naver.com</p>
            <p className="text-gray-600">주소: 대전광역시 동구 가양동 323-21</p>
          </div>

          {/* 바로가기 */}
          <div>
            <h3 className="text-lg font-bold text-amber-600 mb-4">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/machines" className="text-gray-600 hover:text-amber-600 transition-colors">기계 소개</Link>
              </li>
              <li>
                <Link href="/reservation" className="text-gray-600 hover:text-amber-600 transition-colors">예약하기</Link>
              </li>
              <li>
                <Link href="/qna" className="text-gray-600 hover:text-amber-600 transition-colors">고객 문의</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-200 mt-8 pt-6 text-center text-amber-700 text-sm">
          <p>© {new Date().getFullYear()} 그린농장. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}