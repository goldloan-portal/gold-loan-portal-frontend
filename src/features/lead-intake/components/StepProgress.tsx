import { cn } from '@/lib/utils';

const STEP_LABELS = ['Customer & Gold Details', 'Loan Calculator', 'Review & Submit'];

interface StepProgressProps {
  step: 1 | 2 | 3;
}

export function StepProgress({ step }: StepProgressProps) {
  return (
    <div className="mb-2 flex flex-col items-center gap-2">
      <div className="flex gap-1.5">
        {STEP_LABELS.map((label, index) => (
          <span
            key={label}
            className={cn(
              'h-1.5 w-10 rounded-full transition-colors',
              index < step ? 'bg-primary' : 'bg-muted',
            )}
          />
        ))}
      </div>
      <p className="text-sm font-medium tracking-wide text-primary uppercase">
        Step {step} of {STEP_LABELS.length}
      </p>
    </div>
  );
}
