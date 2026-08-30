import { Loader2 } from 'lucide-react';

export function CalculatingIndicator() {
  return (
    <div className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" />
      Calculating&hellip;
    </div>
  );
}
