import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { formatCurrencyINR } from '@/lib/format';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router';
import { CalculatingIndicator } from '../components/CalculatingIndicator';
import { GoldWeightFields } from '../components/GoldWeightFields';
import { LoanSchemeCard } from '../components/LoanSchemeCard';
import { LoanSchemeCardSkeleton } from '../components/LoanSchemeCardSkeleton';
import { StepProgress } from '../components/StepProgress';
import {
  goldCalculatorSchema,
  type GoldCalculatorFormInput,
  type GoldCalculatorFormValues,
} from '../lead-intake.schema';
import { calculateLoanPreview, fetchLoanSchemes } from '../lead-intake.service';
import { useLeadIntakeStore } from '../leadIntakeStore';
import { leadIntakeQueryKeys } from '../queryKeys';

const DEBOUNCE_MS = 400;

export function LoanCalculatorPage() {
  const navigate = useNavigate();
  const customerDetails = useLeadIntakeStore((state) => state.customerDetails);
  const selectedPlanId = useLeadIntakeStore((state) => state.selectedPlanId);
  const setCustomerDetails = useLeadIntakeStore((state) => state.setCustomerDetails);
  const setSelectedPlanId = useLeadIntakeStore((state) => state.setSelectedPlanId);
  const setLastCalculation = useLeadIntakeStore((state) => state.setLastCalculation);

  const form = useForm<GoldCalculatorFormInput, unknown, GoldCalculatorFormValues>({
    resolver: zodResolver(goldCalculatorSchema),
    mode: 'onChange',
    defaultValues: customerDetails
      ? {
          grossWeightGrams: String(customerDetails.grossWeightGrams),
          netWeightGrams: String(customerDetails.netWeightGrams),
          purityKarat: String(customerDetails.purityKarat),
        }
      : { grossWeightGrams: '', netWeightGrams: '', purityKarat: '' },
  });

  const watchedValues = useWatch({ control: form.control });
  const debouncedValues = useDebouncedValue(watchedValues, DEBOUNCE_MS);
  const parsedInput = goldCalculatorSchema.safeParse(debouncedValues);

  const calculationQuery = useQuery({
    queryKey: leadIntakeQueryKeys.calculate(debouncedValues),
    queryFn: () => calculateLoanPreview(parsedInput.data!),
    enabled: parsedInput.success,
  });

  const loanSchemesQuery = useQuery({
    queryKey: leadIntakeQueryKeys.loanSchemes,
    queryFn: fetchLoanSchemes,
  });

  useEffect(() => {
    const parsed = goldCalculatorSchema.safeParse(debouncedValues);
    if (!parsed.success) return;
    const currentDetails = useLeadIntakeStore.getState().customerDetails;
    if (currentDetails) {
      setCustomerDetails({ ...currentDetails, ...parsed.data });
    }
  }, [debouncedValues, setCustomerDetails]);

  useEffect(() => {
    if (calculationQuery.data) {
      setLastCalculation(calculationQuery.data);
    }
  }, [calculationQuery.data, setLastCalculation]);

  if (!customerDetails) {
    return <Navigate to="/" replace />;
  }

  const canContinue = Boolean(selectedPlanId) && Boolean(calculationQuery.data);

  return (
    <main className="flex flex-1 flex-col items-center gap-8 px-4 py-10 sm:px-5 sm:py-16">
      <div className="max-w-md text-center sm:max-w-lg">
        <StepProgress step={2} />
        <h1 className="font-heading text-3xl font-medium text-foreground">Loan Calculator</h1>
        <p className="mt-3 text-muted-foreground">
          Adjust the collateral details to see your live loan estimate, then choose a plan.
        </p>
      </div>

      <Card className="w-full max-w-md sm:max-w-lg">
        <CardHeader>
          <CardTitle>{customerDetails.customerName}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Form {...form}>
            <div className="grid gap-4 sm:grid-cols-2">
              <GoldWeightFields control={form.control} />
            </div>
          </Form>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            {calculationQuery.isFetching ? (
              <CalculatingIndicator />
            ) : calculationQuery.isError ? (
              <p className="text-sm text-destructive">
                Could not calculate your estimate. Try again.
              </p>
            ) : calculationQuery.data ? (
              <dl className="grid grid-cols-2 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Pure gold weight</dt>
                <dd className="text-right font-medium text-foreground">
                  {calculationQuery.data.pureGoldWeight.toFixed(2)} g
                </dd>
                <dt className="text-muted-foreground">Max eligible loan</dt>
                <dd className="text-right font-medium text-foreground">
                  {formatCurrencyINR(calculationQuery.data.maxEligibleLoan)}
                </dd>
              </dl>
            ) : (
              <p className="text-sm text-muted-foreground">
                Enter a valid weight and purity to see your estimate.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md sm:max-w-lg">
        <CardHeader>
          <CardTitle>Choose a Plan</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {loanSchemesQuery.isPending && (
            <>
              <LoanSchemeCardSkeleton />
              <LoanSchemeCardSkeleton />
            </>
          )}
          {loanSchemesQuery.isError && (
            <p className="col-span-full text-sm text-destructive">Could not load loan plans.</p>
          )}
          {loanSchemesQuery.data?.map((scheme) => (
            <LoanSchemeCard
              key={scheme.id}
              scheme={scheme}
              selected={scheme.id === selectedPlanId}
              onSelect={setSelectedPlanId}
            />
          ))}
        </CardContent>
      </Card>

      <div className="flex w-full max-w-md flex-col-reverse gap-3 sm:max-w-lg sm:flex-row">
        <Button variant="outline" className="flex-1" onClick={() => void navigate('/')}>
          Back
        </Button>
        <Button className="flex-1" disabled={!canContinue} onClick={() => void navigate('/review')}>
          Continue
        </Button>
      </div>
    </main>
  );
}
