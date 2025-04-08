export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 회사 정보 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">팝콘팝</h3>
            <p className="text-gray-600 mb-2">뻥튀기 기계 대여 전문 업체</p>
            <p className="text-gray-600">사업자 등록번호: 123-45-67890</p>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">연락처</h3>
            <p className="text-gray-600 mb-2">전화: 02-123-4567</p>
            <p className="text-gray-600 mb-2">이메일: info@popcornpop.com</p>
            <p className="text-gray-600">주소: 서울특별시 강남구 테헤란로 123</p>
          </div>

          {/* 바로가기 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <a href="/machines" className="text-gray-600 hover:text-amber-600 transition-colors">기계 소개</a>
              </li>
              <li>
                <a href="/reservation" className="text-gray-600 hover:text-amber-600 transition-colors">예약하기</a>
              </li>
              <li>
                <a href="/qna" className="text-gray-600 hover:text-amber-600 transition-colors">고객 문의</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} 팝콘팝. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}