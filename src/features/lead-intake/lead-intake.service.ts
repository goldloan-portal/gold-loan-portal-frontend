import { apiGet, apiPost } from '@/lib/apiClient';
import type { CustomerGoldDetailsFormValues, GoldCalculatorFormValues } from './lead-intake.schema';

export type LoanScheme = {
  id: string;
  name: string;
  interestRate: number;
  maxLtv: number;
};

export type LoanCalculation = {
  pureGoldWeight: number;
  maxEligibleLoan: number;
};

export type SubmitLeadPayload = CustomerGoldDetailsFormValues & { selectedPlanId: string };

export type SubmitLeadResponse = {
  applicationId: string;
};

export function fetchLoanSchemes(): Promise<LoanScheme[]> {
  return apiGet<LoanScheme[]>('/api/v1/loan-schemes');
}

export function calculateLoanPreview(input: GoldCalculatorFormValues): Promise<LoanCalculation> {
  return apiPost<LoanCalculation>('/api/v1/leads/calculate', input);
}

export function submitLead(input: SubmitLeadPayload): Promise<SubmitLeadResponse> {
  return apiPost<SubmitLeadResponse>('/api/v1/leads/submit', input);
}
