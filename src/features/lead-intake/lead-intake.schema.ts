import { z } from 'zod';

export const PURITY_OPTIONS = [
  { value: '18', label: '18K' },
  { value: '22', label: '22K' },
  { value: '24', label: '24K' },
];

const goldWeightFields = {
  grossWeightGrams: z.coerce.number().positive('Gross weight must be positive'),
  netWeightGrams: z.coerce.number().positive('Net weight must be positive'),
  purityKarat: z.coerce.number().refine((value) => value === 18 || value === 22 || value === 24, {
    message: 'Purity karat must be 18, 22, or 24',
  }),
};

const netNotExceedingGross = {
  message: 'Net weight cannot exceed gross weight',
  path: ['netWeightGrams'],
};

export const customerGoldDetailsSchema = z
  .object({
    customerName: z.string().min(1, 'Customer name is required'),
    mobileNumber: z.string().regex(/^[6-9]\d{9}$/, 'Mobile number must be a valid 10-digit number'),
    ...goldWeightFields,
  })
  .refine((data) => data.netWeightGrams <= data.grossWeightGrams, netNotExceedingGross);

export const goldCalculatorSchema = z
  .object(goldWeightFields)
  .refine((data) => data.netWeightGrams <= data.grossWeightGrams, netNotExceedingGross);

export type CustomerGoldDetailsFormInput = z.input<typeof customerGoldDetailsSchema>;
export type CustomerGoldDetailsFormValues = z.output<typeof customerGoldDetailsSchema>;
export type GoldCalculatorFormInput = z.input<typeof goldCalculatorSchema>;
export type GoldCalculatorFormValues = z.output<typeof goldCalculatorSchema>;
