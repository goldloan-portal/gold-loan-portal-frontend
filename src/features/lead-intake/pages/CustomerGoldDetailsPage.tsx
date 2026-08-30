import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router';
import { CustomerGoldDetailsForm } from '../components/CustomerGoldDetailsForm';
import { StepProgress } from '../components/StepProgress';
import type {
  CustomerGoldDetailsFormInput,
  CustomerGoldDetailsFormValues,
} from '../lead-intake.schema';
import { useLeadIntakeStore } from '../leadIntakeStore';

export function CustomerGoldDetailsPage() {
  const navigate = useNavigate();
  const customerDetails = useLeadIntakeStore((state) => state.customerDetails);
  const setCustomerDetails = useLeadIntakeStore((state) => state.setCustomerDetails);

  function handleSubmit(values: CustomerGoldDetailsFormValues) {
    setCustomerDetails(values);
    void navigate('/loan-calculator');
  }

  const defaultValues: CustomerGoldDetailsFormInput | undefined = customerDetails
    ? {
        customerName: customerDetails.customerName,
        mobileNumber: customerDetails.mobileNumber,
        grossWeightGrams: String(customerDetails.grossWeightGrams),
        netWeightGrams: String(customerDetails.netWeightGrams),
        purityKarat: String(customerDetails.purityKarat),
      }
    : undefined;

  return (
    <main className="flex flex-1 flex-col items-center gap-8 px-4 py-10 sm:px-5 sm:py-16">
      <div className="max-w-md text-center sm:max-w-lg">
        <StepProgress step={1} />
        <h1 className="font-heading text-3xl font-medium text-foreground">
          Customer &amp; Gold Details
        </h1>
        <p className="mt-3 text-muted-foreground">
          Enter the customer and collateral details to start a gold loan application.
        </p>
      </div>

      <Card className="w-full max-w-md sm:max-w-lg">
        <CardHeader>
          <CardTitle>Application Details</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerGoldDetailsForm onSubmit={handleSubmit} defaultValues={defaultValues} />
        </CardContent>
      </Card>
    </main>
  );
}
