import { BrowserRouter, Route, Routes } from 'react-router';
import { CustomerGoldDetailsPage } from './features/lead-intake/pages/CustomerGoldDetailsPage';
import { LoanCalculatorPage } from './features/lead-intake/pages/LoanCalculatorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerGoldDetailsPage />} />
        <Route path="/loan-calculator" element={<LoanCalculatorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
