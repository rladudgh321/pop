'use client';

import { ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

export interface DeliveryOption {
  distance: number;
  price: number;
  isRoundTrip: boolean;
}

export interface ReservationFormData {
  selectedMachine: number | null;
  startDate: string;
  endDate: string;
  selectedRiceOptions: {
    id: number;
    quantity: number;
  }[];
  deliveryOption: DeliveryOption | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

interface ReservationFormProviderProps {
  children: ReactNode;
  initialMachineId?: number | null;
}

export const ReservationFormProvider = ({ 
  children, 
  initialMachineId = null 
}: ReservationFormProviderProps) => {
  const methods = useForm<ReservationFormData>({
    mode: 'onChange',
    defaultValues: {
      selectedMachine: initialMachineId,
      startDate: '',
      endDate: '',
      selectedRiceOptions: [],
      deliveryOption: null,
      customerName: '',
      customerPhone: '',
      customerEmail: ''
    }
  });

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  );
}; 