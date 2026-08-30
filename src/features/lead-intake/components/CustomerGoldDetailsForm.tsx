import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  customerGoldDetailsSchema,
  type CustomerGoldDetailsFormInput,
  type CustomerGoldDetailsFormValues,
} from '../lead-intake.schema';
import { GoldWeightFields } from './GoldWeightFields';

interface CustomerGoldDetailsFormProps {
  onSubmit: (values: CustomerGoldDetailsFormValues) => void;
}

export function CustomerGoldDetailsForm({ onSubmit }: CustomerGoldDetailsFormProps) {
  const form = useForm<CustomerGoldDetailsFormInput, unknown, CustomerGoldDetailsFormValues>({
    resolver: zodResolver(customerGoldDetailsSchema),
    mode: 'onBlur',
    defaultValues: {
      customerName: '',
      mobileNumber: '',
      grossWeightGrams: '',
      netWeightGrams: '',
      purityKarat: '',
    },
  });

  return (
    <Form {...form}>
      <form
        className="grid gap-5"
        onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
        noValidate
      >
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input type="tel" inputMode="numeric" autoComplete="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <GoldWeightFields control={form.control} />
        <Button type="submit" size="lg" className="mt-2">
          Continue
        </Button>
      </form>
    </Form>
  );
}
