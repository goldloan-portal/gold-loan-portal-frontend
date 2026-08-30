import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrencyINR } from '@/lib/format';
import type { Lead } from '../leads-dashboard.service';

interface LeadsTableProps {
  leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer Name</TableHead>
          <TableHead>Mobile</TableHead>
          <TableHead>Net Weight</TableHead>
          <TableHead>Selected Plan</TableHead>
          <TableHead className="text-right">Calculated Loan Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell className="font-medium text-foreground">{lead.customerName}</TableCell>
            <TableCell>{lead.mobileNumber}</TableCell>
            <TableCell>{lead.netWeightGrams.toFixed(2)} g</TableCell>
            <TableCell>{lead.plan.name}</TableCell>
            <TableCell className="text-right">{formatCurrencyINR(lead.maxEligibleLoan)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
