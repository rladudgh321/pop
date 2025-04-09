import { useFormContext } from 'react-hook-form';

const DateSelection = () => {
  const { register, watch, formState: { errors } } = useFormContext()
  const startDate = watch('startDate');

  return (
    <section className="mb-12 relative bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 shadow-lg border border-amber-100">
      <h2 className="text-2xl font-semibold mb-6">2. 대여 기간 선택</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300">
          <label className="block text-gray-700 mb-2">시작일</label>
          <input 
            type="date" 
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all ${errors.startDate ? 'border-red-500' : ''}`}
            {...register('startDate', { required: '시작일을 선택해주세요.' })}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-500">{errors.startDate.message?.toString()}</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300">
          <label className="block text-gray-700 mb-2">종료일</label>
          <input 
            type="date" 
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all ${errors.endDate ? 'border-red-500' : ''}`}
            {...register('endDate', { required: '종료일을 선택해주세요.' })}
            min={startDate || new Date().toISOString().split('T')[0]}
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-500">{errors.endDate.message?.toString()}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DateSelection; 