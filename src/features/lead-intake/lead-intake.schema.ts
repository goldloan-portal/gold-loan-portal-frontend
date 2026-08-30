import { z } from 'zod';

export const customerGoldDetailsSchema = z
  .object({
    customerName: z.string().min(1, 'Customer name is required'),
    mobileNumber: z.string().regex(/^[6-9]\d{9}$/, 'Mobile number must be a valid 10-digit number'),
    grossWeightGrams: z.coerce.number().positive('Gross weight must be positive'),
    netWeightGrams: z.coerce.number().positive('Net weight must be positive'),
    purityKarat: z.coerce.number().refine((value) => value === 18 || value === 22 || value === 24, {
      message: 'Purity karat must be 18, 22, or 24',
    }),
  })
  .refine((data) => data.netWeightGrams <= data.grossWeightGrams, {
    message: 'Net weight cannot exceed gross weight',
    path: ['netWeightGrams'],
  });

export type CustomerGoldDetailsFormInput = z.input<typeof customerGoldDetailsSchema>;
export type CustomerGoldDetailsFormValues = z.output<typeof customerGoldDetailsSchema>;
