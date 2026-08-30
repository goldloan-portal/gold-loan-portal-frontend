import { BrowserRouter, Route, Routes } from 'react-router';
import { CustomerGoldDetailsPage } from './features/lead-intake/pages/CustomerGoldDetailsPage';
import { LoanCalculatorPage } from './features/lead-intake/pages/LoanCalculatorPage';
import { SubmitConfirmationPage } from './features/lead-intake/pages/SubmitConfirmationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerGoldDetailsPage />} />
        <Route path="/loan-calculator" element={<LoanCalculatorPage />} />
        <Route path="/review" element={<SubmitConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
