import { BrowserRouter, Route, Routes } from 'react-router';
import { CustomerGoldDetailsPage } from './features/lead-intake/pages/CustomerGoldDetailsPage';
import { LoanCalculatorPage } from './features/lead-intake/pages/LoanCalculatorPage';
import { LeadsDashboardPage } from './features/leads-dashboard/pages/LeadsDashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerGoldDetailsPage />} />
        <Route path="/loan-calculator" element={<LoanCalculatorPage />} />
        <Route path="/admin" element={<LeadsDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
