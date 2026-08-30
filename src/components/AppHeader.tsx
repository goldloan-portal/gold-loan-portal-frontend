import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Gem, LayoutList } from 'lucide-react';
import { NavLink } from 'react-router';

export function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border px-5 py-4">
      <NavLink to="/" className="flex items-center gap-2 text-foreground">
        <Gem className="size-5 text-primary" />
        <span className="font-heading text-lg font-medium">Gold Loan Portal</span>
      </NavLink>
      <NavLink
        to="/admin"
        className={({ isActive }) =>
          cn(buttonVariants({ variant: isActive ? 'secondary' : 'ghost', size: 'sm' }), 'gap-1.5')
        }
      >
        <LayoutList />
        View Leads
      </NavLink>
    </header>
  );
}
