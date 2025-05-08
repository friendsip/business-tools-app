import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';

// Use lazy loading for all components
const BusinessCalculator = lazy(() => import('./components/BusinessCalculator'));
const BusinessDiagnostic = lazy(() => import('./components/BusinessDiagnostic'));
const MarketPulse = lazy(() => import('./components/MarketPulse'));
const DealFlow = lazy(() => import('./components/DealFlow'));
const IndustryComparison = lazy(() => import('./components/IndustryComparison'));
const DayInLife = lazy(() => import('./components/DayInLife'));
const PersonalizedJourney = lazy(() => import('./components/PersonalizedJourney'));
const InteractiveBusinessJourney = lazy(() => import('./components/InteractiveBusinessJourney'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-900 text-white">
        <Navigation />
        <div className="flex-1 lg:ml-72 pt-16 lg:pt-0">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/business-calculator" element={<BusinessCalculator />} />
              <Route path="/business-diagnostic" element={<BusinessDiagnostic />} />
              <Route path="/market-pulse" element={<MarketPulse />} />
              <Route path="/deal-flow" element={<DealFlow />} />
              <Route path="/industry-comparison" element={<IndustryComparison />} />
              <Route path="/day-in-life" element={<DayInLife />} />
              <Route path="/personalized-journey" element={<PersonalizedJourney />} />
              <Route path="/interactive-business-journey" element={<InteractiveBusinessJourney />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;