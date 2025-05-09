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
const PersonalizedJourney = lazy(() => import('./components/PersonalizedJourney'));
const SuccessStories = lazy(() => import('./components/SuccessStories'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-900 text-white relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-75"
          style={{ filter: 'brightness(0.6)' }}
        >
          <source src="/hub9.m4v" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-slate-900/30 z-0"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
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
              <Route path="/personalized-journey" element={<PersonalizedJourney />} />
              <Route path="/success-stories" element={<SuccessStories />} />
            </Routes>
          </Suspense>
          <div className="py-4 px-6 mt-8 text-center text-white text-sm text-shadow">
            <p className="drop-shadow-md">To make this into a full prototype app go to <a href="https://blinkprototype.com" className="text-blue-300 hover:text-blue-200">BlinkPrototype_</a></p>
            <p className="drop-shadow-md">©2025 <a href="https://www.clouddev.group" className="text-blue-300 hover:text-blue-200">Cloud Development Group Limited</a>. All rights reserved.</p>
          </div>
        </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;