import { BrowserRouter, Route, Routes } from 'react-router';
import { CustomerGoldDetailsPage } from './features/lead-intake/pages/CustomerGoldDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerGoldDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
