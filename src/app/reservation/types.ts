export interface ReservationFormData {
  selectedMachine: number | null;
  startDate: string;
  endDate: string;
  selectedRiceOptions: {
    id: number;
    quantity: number;
  }[];
  deliveryOption: {
    distance: string;
    isRoundTrip: boolean;
    price: number;
  } | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
} 