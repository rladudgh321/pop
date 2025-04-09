'use client';

import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { MACHINES } from '../../../constants/data';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';


const MachineSelection = () => {
  const router = useRouter();
  const { register, setValue, formState: { errors }, watch } = useFormContext();
  const selectedMachine = watch('selectedMachine');
  // console.log('selectedMachine',  selectedMachine);

  const onClickRadio = useCallback(() => {
    router.push(`/reservation?machine=${selectedMachine}`, { scroll: false})
  },[router, selectedMachine])

  useEffect(() => {
    onClickRadio();
  },[onClickRadio])

  return (
    <section id="machine-selection" className="mb-12 relative bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 shadow-lg border border-amber-100">
      <h2 className="text-2xl font-semibold mb-6">1. 기계 선택</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MACHINES.map((machine) => (
          <div 
            key={machine.id} 
            className={`bg-white border-2 rounded-lg overflow-hidden cursor-pointer transition-all transform hover:scale-105 ${
              selectedMachine === machine.id 
                ? 'border-amber-600 ring-2 ring-amber-600 shadow-xl' 
                : 'border-amber-200 hover:border-amber-400 shadow-lg hover:shadow-xl'
            }`}
            onClick={() => setValue('selectedMachine', machine.id)}
          >
            <div className="relative h-48">
              <Image
                src={machine.image}
                alt={machine.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{machine.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{machine.description}</p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs ${machine.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {machine.available ? '대여 가능' : '대여 중'}
                </span>
                <span className="text-amber-600 font-bold">
                  {machine.pricePerDay.toLocaleString()}원 / 일
                </span>
              </div>
            </div>
            <input
              type="radio"
              id={`machine-${machine.id}`}
              value={machine.id}
              onClick={onClickRadio}
              className="hidden"
              {...register('selectedMachine', { required: '기계를 선택해주세요.' })}
            />
          </div>
        ))}
      </div>
      {errors.selectedMachine && (
        <p className="text-red-500 mt-2">{errors.selectedMachine.message?.toString()}</p>
      )}
    </section>
  );
};

export default MachineSelection; 