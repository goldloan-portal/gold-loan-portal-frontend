import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { CustomerGoldDetailsForm } from '../components/CustomerGoldDetailsForm';
import type { CustomerGoldDetailsFormValues } from '../lead-intake.schema';

export function CustomerGoldDetailsPage() {
  const [submittedDetails, setSubmittedDetails] = useState<CustomerGoldDetailsFormValues | null>(
    null,
  );

  return (
    <main className="flex flex-1 flex-col items-center gap-8 px-5 py-16">
      <div className="max-w-md text-center">
        <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">Step 1 of 3</p>
        <h1 className="font-heading text-3xl font-medium text-foreground">
          Customer &amp; Gold Details
        </h1>
        <p className="mt-3 text-muted-foreground">
          Enter the customer and collateral details to start a gold loan application.
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{submittedDetails ? 'Details Captured' : 'Application Details'}</CardTitle>
        </CardHeader>
        <CardContent>
          {submittedDetails ? (
            <div className="flex flex-col items-start gap-4">
              <p className="text-sm text-muted-foreground">
                Details captured for{' '}
                <span className="font-medium text-foreground">{submittedDetails.customerName}</span>
                .
              </p>
              <Button variant="outline" onClick={() => setSubmittedDetails(null)}>
                Edit details
              </Button>
            </div>
          ) : (
            <CustomerGoldDetailsForm onSubmit={setSubmittedDetails} />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
