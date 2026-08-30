import { create } from 'zustand';
import type { CustomerGoldDetailsFormValues } from './lead-intake.schema';
import type { LoanCalculation } from './lead-intake.service';

interface LeadIntakeState {
  customerDetails: CustomerGoldDetailsFormValues | null;
  selectedPlanId: string | null;
  lastCalculation: LoanCalculation | null;
  applicationId: string | null;
  setCustomerDetails: (details: CustomerGoldDetailsFormValues) => void;
  setSelectedPlanId: (planId: string) => void;
  setLastCalculation: (calculation: LoanCalculation) => void;
  setApplicationId: (applicationId: string) => void;
  reset: () => void;
}

export const useLeadIntakeStore = create<LeadIntakeState>((set) => ({
  customerDetails: null,
  selectedPlanId: null,
  lastCalculation: null,
  applicationId: null,
  setCustomerDetails: (customerDetails) => set({ customerDetails }),
  setSelectedPlanId: (selectedPlanId) => set({ selectedPlanId }),
  setLastCalculation: (lastCalculation) => set({ lastCalculation }),
  setApplicationId: (applicationId) => set({ applicationId }),
  reset: () =>
    set({
      customerDetails: null,
      selectedPlanId: null,
      lastCalculation: null,
      applicationId: null,
    }),
}));
