import { create } from 'zustand';
import type { CustomerGoldDetailsFormValues } from './lead-intake.schema';

interface LeadIntakeState {
  customerDetails: CustomerGoldDetailsFormValues | null;
  selectedPlanId: string | null;
  setCustomerDetails: (details: CustomerGoldDetailsFormValues) => void;
  setSelectedPlanId: (planId: string) => void;
}

export const useLeadIntakeStore = create<LeadIntakeState>((set) => ({
  customerDetails: null,
  selectedPlanId: null,
  setCustomerDetails: (customerDetails) => set({ customerDetails }),
  setSelectedPlanId: (selectedPlanId) => set({ selectedPlanId }),
}));
