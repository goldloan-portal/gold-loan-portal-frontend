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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  customerGoldDetailsSchema,
  type CustomerGoldDetailsFormInput,
  type CustomerGoldDetailsFormValues,
} from '../lead-intake.schema';

interface CustomerGoldDetailsFormProps {
  onSubmit: (values: CustomerGoldDetailsFormValues) => void;
}

const PURITY_OPTIONS = [
  { value: '18', label: '18K' },
  { value: '22', label: '22K' },
  { value: '24', label: '24K' },
];

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
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="grossWeightGrams"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel>Gross Weight (g)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" value={value as string} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="netWeightGrams"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel>Net Weight (g)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" value={value as string} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="purityKarat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purity</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value as string}
                name={field.name}
              >
                <FormControl>
                  <SelectTrigger className="w-full" onBlur={field.onBlur} ref={field.ref}>
                    <SelectValue placeholder="Select purity" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PURITY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="mt-2">
          Continue
        </Button>
      </form>
    </Form>
  );
}
