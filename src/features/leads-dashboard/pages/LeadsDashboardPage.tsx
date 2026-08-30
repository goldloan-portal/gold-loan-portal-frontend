import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { LeadsTable } from '../components/LeadsTable';
import { fetchLeads } from '../leads-dashboard.service';
import { leadsDashboardQueryKeys } from '../queryKeys';

export function LeadsDashboardPage() {
  const leadsQuery = useQuery({
    queryKey: leadsDashboardQueryKeys.leads,
    queryFn: fetchLeads,
  });

  return (
    <main className="flex flex-1 flex-col items-center gap-8 px-5 py-16">
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
            <p className="text-sm text-muted-foreground">Loading leads&hellip;</p>
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
