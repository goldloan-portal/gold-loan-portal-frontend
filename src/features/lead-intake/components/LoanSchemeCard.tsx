import { cn } from '@/lib/utils';
import type { LoanScheme } from '../lead-intake.service';

interface LoanSchemeCardProps {
  scheme: LoanScheme;
  selected: boolean;
  onSelect: (schemeId: string) => void;
}

export function LoanSchemeCard({ scheme, selected, onSelect }: LoanSchemeCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(scheme.id)}
      className={cn(
        'flex flex-col gap-1 rounded-xl border p-4 text-left transition-colors',
        selected
          ? 'border-primary bg-primary/10 ring-2 ring-primary/40'
          : 'border-border hover:border-primary/50',
      )}
    >
      <span className="font-heading text-base font-medium text-foreground">{scheme.name}</span>
      <span className="text-sm text-muted-foreground">
        {scheme.interestRate}% interest &middot; up to {scheme.maxLtv}% LTV
      </span>
    </button>
  );
}
