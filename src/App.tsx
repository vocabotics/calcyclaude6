import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CalculatorPage } from '@/pages/CalculatorPage';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

function App() {
  const baseUrl = import.meta.env.BASE_URL || '/';

  return (
    <Router basename={baseUrl}>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<CalculatorPage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;