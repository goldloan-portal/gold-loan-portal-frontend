import { apiGet } from '@/lib/apiClient';

export type Lead = {
  id: string;
  customerName: string;
  mobileNumber: string;
  netWeightGrams: number;
  status: string;
  maxEligibleLoan: number;
  plan: { id: string; name: string };
  createdAt: string;
};

export function fetchLeads(): Promise<Lead[]> {
  return apiGet<Lead[]>('/api/v1/leads');
}
