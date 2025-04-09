interface ProgressStepsProps {
  selectedMachine: number | null;
  hasDateSelected: boolean;
  hasRiceOptionSelected: boolean;
  hasDeliveryOptionSelected: boolean;
  isCalculated: boolean;
}

const ProgressSteps = ({ 
  selectedMachine, 
  hasDateSelected, 
  hasRiceOptionSelected,
  hasDeliveryOptionSelected,
  isCalculated 
}: ProgressStepsProps) => {
  // 각 단계의 활성화 상태를 결정하는 함수
  const getStepStatus = (step: number) => {
    switch (step) {
      case 1: // 기계 선택
        return selectedMachine ? 'active' : 'inactive';
      case 2: // 날짜 선택
        return !selectedMachine ? 'disabled' 
          : hasDateSelected ? 'active' 
          : 'inactive';
      case 3: // 원재료 선택
        return !hasDateSelected ? 'disabled'
          : hasRiceOptionSelected ? 'active'
          : 'inactive';
      case 4: // 용달 옵션 선택
        return !hasDateSelected || !hasRiceOptionSelected ? 'disabled'
          : hasDeliveryOptionSelected ? 'active'
          : 'inactive';
      case 5: // 결제
        return !hasDateSelected || !hasRiceOptionSelected || !hasDeliveryOptionSelected ? 'disabled'
          : isCalculated ? 'active'
          : 'inactive';
      default:
        return 'inactive';
    }
  };

  const getStepClasses = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-amber-600 text-white';
      case 'inactive':
        return 'bg-gray-200 text-gray-600';
      case 'disabled':
        return 'bg-gray-100 text-gray-400';
      default:
        return 'bg-gray-200';
    }
  };

  const getLineClasses = (fromStep: number) => {
    const currentStatus = getStepStatus(fromStep);
    const nextStatus = getStepStatus(fromStep + 1);

    if (currentStatus === 'active' && (nextStatus === 'active' || nextStatus === 'inactive')) {
      return 'bg-amber-600';
    }
    return 'bg-gray-200';
  };

  return (
    <div className="mb-12">
      <div className="flex justify-center items-center mb-8">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${getStepClasses(getStepStatus(1))}`}>1</div>
        <div className={`h-1 w-12 transition-all ${getLineClasses(1)}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${getStepClasses(getStepStatus(2))}`}>2</div>
        <div className={`h-1 w-12 transition-all ${getLineClasses(2)}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${getStepClasses(getStepStatus(3))}`}>3</div>
        <div className={`h-1 w-12 transition-all ${getLineClasses(3)}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${getStepClasses(getStepStatus(4))}`}>4</div>
        <div className={`h-1 w-12 transition-all ${getLineClasses(4)}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${getStepClasses(getStepStatus(5))}`}>5</div>
      </div>
      <div className="flex justify-center text-sm space-x-8">
        <span className={getStepStatus(1) === 'disabled' ? 'text-gray-400' : 'text-gray-600'}>기계 선택</span>
        <span className={getStepStatus(2) === 'disabled' ? 'text-gray-400' : 'text-gray-600'}>날짜 선택</span>
        <span className={getStepStatus(3) === 'disabled' ? 'text-gray-400' : 'text-gray-600'}>원재료 선택</span>
        <span className={getStepStatus(4) === 'disabled' ? 'text-gray-400' : 'text-gray-600'}>용달 옵션</span>
        <span className={getStepStatus(5) === 'disabled' ? 'text-gray-400' : 'text-gray-600'}>결제</span>
      </div>
    </div>
  );
};

export default ProgressSteps; 