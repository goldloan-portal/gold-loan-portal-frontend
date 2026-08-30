import { BrowserRouter, Route, Routes } from 'react-router';
import { AppHeader } from './components/AppHeader';
import { CustomerGoldDetailsPage } from './features/lead-intake/pages/CustomerGoldDetailsPage';
import { LoanCalculatorPage } from './features/lead-intake/pages/LoanCalculatorPage';
import { SubmitConfirmationPage } from './features/lead-intake/pages/SubmitConfirmationPage';
import { LeadsDashboardPage } from './features/leads-dashboard/pages/LeadsDashboardPage';

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path="/" element={<CustomerGoldDetailsPage />} />
        <Route path="/loan-calculator" element={<LoanCalculatorPage />} />
        <Route path="/review" element={<SubmitConfirmationPage />} />
        <Route path="/admin" element={<LeadsDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
