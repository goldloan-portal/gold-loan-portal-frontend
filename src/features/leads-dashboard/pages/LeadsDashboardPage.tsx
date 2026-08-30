import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLeadIntakeStore } from '@/features/lead-intake/leadIntakeStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { LeadsTable } from '../components/LeadsTable';
import { LeadsTableSkeleton } from '../components/LeadsTableSkeleton';
import { fetchLeads } from '../leads-dashboard.service';
import { leadsDashboardQueryKeys } from '../queryKeys';

export function LeadsDashboardPage() {
  const leadsQuery = useQuery({
    queryKey: leadsDashboardQueryKeys.leads,
    queryFn: fetchLeads,
  });

  // Leaving the intake flow to view the dashboard invalidates any in-progress
  // application — returning to step 1 should start fresh, not resume stale values.
  const resetLeadIntake = useLeadIntakeStore((state) => state.reset);
  useEffect(() => {
    resetLeadIntake();
  }, [resetLeadIntake]);

  return (
    <main className="flex flex-1 flex-col items-center gap-8 px-4 py-10 sm:px-5 sm:py-16">
      <div className="max-w-md text-center">
        <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">
          Admin / Partner
        </p>
        <h1 className="font-heading text-3xl font-medium text-foreground">Leads Dashboard</h1>
        <p className="mt-3 text-muted-foreground">
          Track every submitted application and its calculated loan value.
        </p>
      </div>

      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Submitted Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {leadsQuery.isPending ? (
            <LeadsTableSkeleton />
          ) : leadsQuery.isError ? (
            <p className="text-sm text-destructive">Could not load leads. Try again.</p>
          ) : leadsQuery.data.length === 0 ? (
            <p className="text-sm text-muted-foreground">No leads submitted yet.</p>
          ) : (
            <LeadsTable leads={leadsQuery.data} />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
