import type { ApiError } from '@/lib/apiClient';
import { useMutation } from '@tanstack/react-query';
import { submitLead, type SubmitLeadPayload, type SubmitLeadResponse } from './lead-intake.service';

export function useSubmitLeadMutation() {
  return useMutation<SubmitLeadResponse, ApiError, SubmitLeadPayload>({
    mutationFn: submitLead,
  });
}
