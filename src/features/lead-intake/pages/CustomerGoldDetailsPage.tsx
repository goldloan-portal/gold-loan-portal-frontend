import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router';
import { CustomerGoldDetailsForm } from '../components/CustomerGoldDetailsForm';
import type { CustomerGoldDetailsFormValues } from '../lead-intake.schema';
import { useLeadIntakeStore } from '../leadIntakeStore';

export function CustomerGoldDetailsPage() {
  const navigate = useNavigate();
  const setCustomerDetails = useLeadIntakeStore((state) => state.setCustomerDetails);

  function handleSubmit(values: CustomerGoldDetailsFormValues) {
    setCustomerDetails(values);
    void navigate('/loan-calculator');
  }

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
          <CardTitle>Application Details</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerGoldDetailsForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </main>
  );
}
