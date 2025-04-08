'use client';

import { PRICING, DELIVERY_PRICES } from "@/constants/data";

export default function PriceTable() {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-lg overflow-hidden border border-amber-100">
      <div className="p-8">
        {/* 기본 대여 가격 */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-amber-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            기본 대여 가격
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-amber-100">
              <p className="text-lg font-medium mb-3 text-amber-800">평일</p>
              <p className="text-3xl font-bold text-amber-600">{PRICING.WEEKDAY.toLocaleString()}원</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-amber-100">
              <p className="text-lg font-medium mb-3 text-amber-800">주말</p>
              <p className="text-3xl font-bold text-amber-600">{PRICING.WEEKEND.toLocaleString()}원</p>
            </div>
          </div>
        </div>

        {/* 주말 장기 대여 할인 */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-amber-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            주말 장기 대여 할인
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: '1주일 이내', price: PRICING.WEEKEND_DISCOUNT.ONE_WEEK },
              { label: '1~2주일', price: PRICING.WEEKEND_DISCOUNT.TWO_WEEKS },
              { label: '2~3주일', price: PRICING.WEEKEND_DISCOUNT.THREE_WEEKS },
              { label: '3주일 이상', price: PRICING.WEEKEND_DISCOUNT.FOUR_WEEKS },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-amber-100">
                <p className="text-lg font-medium mb-3 text-amber-800">{item.label}</p>
                <p className="text-2xl font-bold text-amber-600">{item.price.toLocaleString()}원</p>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-amber-700">※ 4주일 이상 대여 시 주말 가격도 평일과 동일한 {PRICING.WEEKEND_DISCOUNT.OVER_FOUR_WEEKS.toLocaleString()}원으로 적용됩니다.</p>
          </div>
        </div>

        {/* 택배 편도비 안내 */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-amber-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
            택배 편도비 안내
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-amber-100">
                    <th className="py-4 px-6 text-left text-amber-800 font-bold border-b border-amber-200">거리</th>
                    <th className="py-4 px-6 text-right text-amber-800 font-bold border-b border-amber-200">가격</th>
                  </tr>
                </thead>
                <tbody>
                  {DELIVERY_PRICES.slice(0, Math.ceil(DELIVERY_PRICES.length / 2)).map((item) => (
                    <tr
                      key={item.distance}
                      className="border-b border-amber-100 hover:bg-amber-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-6 text-amber-800 font-medium">{item.distance}km</td>
                      <td className="py-4 px-6 text-amber-600 font-bold text-right">{item.price.toLocaleString()}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-amber-100">
                    <th className="py-4 px-6 text-left text-amber-800 font-bold border-b border-amber-200">거리</th>
                    <th className="py-4 px-6 text-right text-amber-800 font-bold border-b border-amber-200">가격</th>
                  </tr>
                </thead>
                <tbody>
                  {DELIVERY_PRICES.slice(Math.ceil(DELIVERY_PRICES.length / 2)).map((item) => (
                    <tr
                      key={item.distance}
                      className="border-b border-amber-100 hover:bg-amber-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-6 text-amber-800 font-medium">{item.distance}km</td>
                      <td className="py-4 px-6 text-amber-600 font-bold text-right">{item.price.toLocaleString()}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg mt-4">
            <p className="text-amber-700">※ 왕복 배송비는 편도 가격의 2배입니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}