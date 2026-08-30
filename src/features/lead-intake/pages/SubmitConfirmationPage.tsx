import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type ApiError, isFieldErrorArray } from '@/lib/apiClient';
import { formatCurrencyINR, maskMobileNumber } from '@/lib/format';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate } from 'react-router';
import type { SubmitLeadPayload } from '../lead-intake.service';
import { fetchLoanSchemes } from '../lead-intake.service';
import { useLeadIntakeStore } from '../leadIntakeStore';
import { leadIntakeQueryKeys } from '../queryKeys';
import { useSubmitLeadMutation } from '../useLeadIntakeMutations';

export function SubmitConfirmationPage() {
  const navigate = useNavigate();
  const customerDetails = useLeadIntakeStore((state) => state.customerDetails);
  const selectedPlanId = useLeadIntakeStore((state) => state.selectedPlanId);
  const lastCalculation = useLeadIntakeStore((state) => state.lastCalculation);
  const applicationId = useLeadIntakeStore((state) => state.applicationId);
  const setApplicationId = useLeadIntakeStore((state) => state.setApplicationId);
  const reset = useLeadIntakeStore((state) => state.reset);

  const loanSchemesQuery = useQuery({
    queryKey: leadIntakeQueryKeys.loanSchemes,
    queryFn: fetchLoanSchemes,
  });
  const submitLeadMutation = useSubmitLeadMutation();

  if (!customerDetails || !selectedPlanId || !lastCalculation) {
    return <Navigate to="/" replace />;
  }

  const selectedPlan = loanSchemesQuery.data?.find((scheme) => scheme.id === selectedPlanId);

  function handleSubmit() {
    const payload: SubmitLeadPayload = { ...customerDetails!, selectedPlanId: selectedPlanId! };
    submitLeadMutation.mutate(payload, {
      onSuccess: (response) => setApplicationId(response.applicationId),
    });
  }

  function handleStartOver() {
    reset();
    void navigate('/');
  }

  if (applicationId) {
    return (
      <main className="flex flex-1 flex-col items-center gap-8 px-5 py-16">
        <div className="max-w-md text-center">
          <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">
            Application Submitted
          </p>
          <h1 className="font-heading text-3xl font-medium text-foreground">
            You&rsquo;re all set!
          </h1>
        </div>

        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Application ID</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="rounded-lg border border-border bg-muted/30 p-4 text-center font-mono text-lg text-foreground">
              {applicationId}
            </p>
            <dl className="grid grid-cols-2 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Mobile number</dt>
              <dd className="text-right font-medium text-foreground">
                {maskMobileNumber(customerDetails.mobileNumber)}
              </dd>
              <dt className="text-muted-foreground">Plan</dt>
              <dd className="text-right font-medium text-foreground">
                {selectedPlan?.name ?? 'Selected plan'}
              </dd>
              <dt className="text-muted-foreground">Loan amount</dt>
              <dd className="text-right font-medium text-foreground">
                {formatCurrencyINR(lastCalculation.maxEligibleLoan)}
              </dd>
            </dl>
            <Button onClick={handleStartOver}>Start a New Application</Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center gap-8 px-5 py-16">
      <div className="max-w-md text-center">
        <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">Step 3 of 3</p>
        <h1 className="font-heading text-3xl font-medium text-foreground">Review &amp; Submit</h1>
        <p className="mt-3 text-muted-foreground">
          Confirm your details before submitting your application.
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{customerDetails.customerName}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-muted-foreground">Mobile number</dt>
            <dd className="text-right font-medium text-foreground">
              {customerDetails.mobileNumber}
            </dd>
            <dt className="text-muted-foreground">Gross weight</dt>
            <dd className="text-right font-medium text-foreground">
              {customerDetails.grossWeightGrams} g
            </dd>
            <dt className="text-muted-foreground">Net weight</dt>
            <dd className="text-right font-medium text-foreground">
              {customerDetails.netWeightGrams} g
            </dd>
            <dt className="text-muted-foreground">Purity</dt>
            <dd className="text-right font-medium text-foreground">
              {customerDetails.purityKarat}K
            </dd>
            <dt className="text-muted-foreground">Pure gold weight</dt>
            <dd className="text-right font-medium text-foreground">
              {lastCalculation.pureGoldWeight.toFixed(2)} g
            </dd>
            <dt className="text-muted-foreground">Plan</dt>
            <dd className="text-right font-medium text-foreground">
              {selectedPlan?.name ?? 'Selected plan'}
            </dd>
            <dt className="text-muted-foreground">Max eligible loan</dt>
            <dd className="text-right font-medium text-foreground">
              {formatCurrencyINR(lastCalculation.maxEligibleLoan)}
            </dd>
          </dl>

          {submitLeadMutation.isError && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              <SubmitErrorMessage error={submitLeadMutation.error} />
            </div>
          )}

          <Button onClick={handleSubmit} disabled={submitLeadMutation.isPending}>
            {submitLeadMutation.isPending ? 'Submitting…' : 'Submit Application'}
          </Button>
        </CardContent>
      </Card>

      <Button variant="outline" onClick={() => void navigate('/loan-calculator')}>
        Back
      </Button>
    </main>
  );
}

function SubmitErrorMessage({ error }: { error: ApiError }) {
  if (error.code === 'ValidationError' && isFieldErrorArray(error.details)) {
    return (
      <ul className="list-disc space-y-1 pl-4">
        {error.details.map((detail) => (
          <li key={detail.field}>{detail.message}</li>
        ))}
      </ul>
    );
  }

  if (error.code === 'DuplicateLeadError') {
    return <p>{error.message}</p>;
  }

  return <p>Something went wrong submitting your application. Please try again.</p>;
}
