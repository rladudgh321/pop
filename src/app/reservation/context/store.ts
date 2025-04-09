import { create } from "zustand";


type Delivery = {
  isRoundTrip: boolean;
  setIsRoundTrip: () => void;
}

export const reservationDeliveryOptionStore = create<Delivery>()((set) => ({
  isRoundTrip: false,
  setIsRoundTrip: () => set((state) => ({isRoundTrip: !state.isRoundTrip})),
}))