import { Skeleton } from '@/components/ui/skeleton';

export function LoanSchemeCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border p-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3.5 w-44" />
    </div>
  );
}
