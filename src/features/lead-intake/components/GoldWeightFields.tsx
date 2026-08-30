import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { PURITY_OPTIONS } from '../lead-intake.schema';

interface GoldWeightFieldsProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
}

export function GoldWeightFields<TFieldValues extends FieldValues>({
  control,
}: GoldWeightFieldsProps<TFieldValues>) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name={'grossWeightGrams' as Path<TFieldValues>}
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <FormLabel>Gross Weight (g)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" min="0" value={value} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={'netWeightGrams' as Path<TFieldValues>}
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <FormLabel>Net Weight (g)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" min="0" value={value} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name={'purityKarat' as Path<TFieldValues>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Purity</FormLabel>
            <Select onValueChange={field.onChange} value={field.value} name={field.name}>
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
    </>
  );
}
