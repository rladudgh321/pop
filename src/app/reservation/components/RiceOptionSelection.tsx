import { useFormContext } from 'react-hook-form';
import { RICE_OPTIONS } from '../../../constants/data';
import { useState } from 'react';
import { ReservationFormData } from '../context/FormContext';

type RiceOption = {
  id: number;
  quantity: number;
};

const RiceOptionSelection = () => {
  const { setValue, watch } = useFormContext<ReservationFormData>();
  const selectedRiceOptions = watch('selectedRiceOptions') || [];
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  console.log('selectedRiceOptionㅡㅡㅡㅡ', selectedRiceOptions);

  const handleQuantityChange = (optionId: number, value: number) => {
    if (value < 1) return;
    setQuantities(prev => ({ ...prev, [optionId]: value }));
    
    const updatedOptions = selectedRiceOptions.map((option: RiceOption) => 
      option.id === optionId ? { ...option, quantity: value } : option
    );
    setValue('selectedRiceOptions', updatedOptions);
  };

  const handleOptionClick = (optionId: number) => {
    const isSelected = selectedRiceOptions.some((option: RiceOption) => option.id === optionId);
    let updatedOptions;
    
    if (isSelected) {
      updatedOptions = selectedRiceOptions.filter((option: RiceOption) => option.id !== optionId);
      setQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[optionId];
        return newQuantities;
      });
    } else {
      const currentQuantity = quantities[optionId] || 1;
      updatedOptions = [...selectedRiceOptions, { id: optionId, quantity: currentQuantity }];
    }
    
    setValue('selectedRiceOptions', updatedOptions);
  };

  return (
    <section className="mb-12 relative bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 shadow-lg border border-amber-100">
      <h2 className="text-2xl font-semibold mb-6">3. 원재료 옵션 선택</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RICE_OPTIONS.map((option) => (
          <div 
            key={option.id} 
            className={`border rounded-lg p-6 transition-all transform hover:scale-105 ${
              selectedRiceOptions.some((o: RiceOption) => o.id === option.id)
                ? 'border-amber-600 ring-2 ring-amber-600 shadow-lg bg-amber-50' 
                : 'border-gray-200 hover:border-amber-300 hover:shadow-md bg-white'
            }`}
          >
            <div 
              className="cursor-pointer"
              onClick={() => handleOptionClick(option.id)}
            >
              <h3 className="text-lg font-semibold mb-2">{option.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{option.description}</p>
              <p className="text-amber-600 font-bold">
                {option.price > 0 ? `+${option.price.toLocaleString()}원` : '기본 제공'}
              </p>
            </div>

            {selectedRiceOptions.some((o: RiceOption) => o.id === option.id) && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(option.id, (quantities[option.id] || 1) - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-amber-100 text-amber-600 rounded-full hover:bg-amber-200 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantities[option.id] || 1}
                    onChange={(e) => handleQuantityChange(option.id, parseInt(e.target.value) || 1)}
                    className="w-16 text-center border rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(option.id, (quantities[option.id] || 1) + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-amber-100 text-amber-600 rounded-full hover:bg-amber-200 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-amber-600 font-semibold">
                  {(option.price * (quantities[option.id] || 1)).toLocaleString()}원
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default RiceOptionSelection; 