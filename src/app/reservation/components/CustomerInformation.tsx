import { useFormContext } from 'react-hook-form';

const CustomerInformation = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">고객 정보 입력</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300">
          <label htmlFor="customerName" className="block text-gray-700 mb-2">이름</label>
          <input 
            id="customerName"
            type="text" 
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all ${errors.customerName ? 'border-red-500' : ''}`}
            {...register('customerName', { required: '이름을 입력해주세요.' })}
            placeholder="이름을 입력하세요"
          />
          {errors.customerName && (
            <p className="mt-1 text-sm text-red-500">{errors.customerName.message?.toString()}</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300">
          <label htmlFor="customerPhone" className="block text-gray-700 mb-2">연락처</label>
          <input 
            id="customerPhone"
            type="tel" 
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all ${errors.customerPhone ? 'border-red-500' : ''}`}
            {...register('customerPhone', { 
              required: '연락처를 입력해주세요.',
              pattern: {
                value: /^\d{2,3}-\d{3,4}-\d{4}$/,
                message: '올바른 전화번호 형식이 아닙니다.'
              }
            })}
            placeholder="010-0000-0000"
          />
          {errors.customerPhone && (
            <p className="mt-1 text-sm text-red-500">{errors.customerPhone.message?.toString()}</p>
          )}
        </div>
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300">
          <label htmlFor="customerEmail" className="block text-gray-700 mb-2">이메일</label>
          <input 
            id="customerEmail"
            type="email" 
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all ${errors.customerEmail ? 'border-red-500' : ''}`}
            {...register('customerEmail', { 
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '올바른 이메일 형식이 아닙니다.'
              }
            })}
            placeholder="example@email.com"
          />
          {errors.customerEmail && (
            <p className="mt-1 text-sm text-red-500">{errors.customerEmail.message?.toString()}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerInformation; 