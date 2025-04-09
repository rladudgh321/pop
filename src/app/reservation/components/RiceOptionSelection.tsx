import { useFormContext } from 'react-hook-form';
import { RICE_OPTIONS } from '../../../constants/data';


const RiceOptionSelection = () => {
  const { setValue, watch } = useFormContext()
  const selectedRiceOption = watch('selectedRiceOption');

  return (
    <section className="mb-12 relative bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 shadow-lg border border-amber-100">
      <h2 className="text-2xl font-semibold mb-6">3. 원재료 옵션 선택</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RICE_OPTIONS.map((option) => (
          <div 
            key={option.id} 
            className={`border rounded-lg p-6 cursor-pointer transition-all transform hover:scale-105 ${
              selectedRiceOption === option.id 
                ? 'border-amber-600 ring-2 ring-amber-600 shadow-lg bg-amber-50' 
                : 'border-gray-200 hover:border-amber-300 hover:shadow-md bg-white'
            }`}
            onClick={() => setValue('selectedRiceOption', option.id)}
          >
            <h3 className="text-lg font-semibold mb-2">{option.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{option.description}</p>
            <p className="text-amber-600 font-bold">
              {option.price > 0 ? `+${option.price.toLocaleString()}원` : '기본 제공'}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RiceOptionSelection; 