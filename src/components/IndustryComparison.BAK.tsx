import React from 'react';
import { BarChart2 } from 'lucide-react';

const IndustryComparison: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 text-white rounded-lg overflow-hidden max-w-7xl mx-auto p-8">
      <div className="text-center mb-12">
        <BarChart2 size={48} className="mx-auto mb-4 text-blue-500" />
        <h2 className="text-3xl font-bold mb-2">Industry Comparison Tool</h2>
        <p className="text-xl text-slate-400">Compare performance metrics across different industries and sectors</p>
      </div>

      <div className="bg-slate-800 p-8 rounded-lg text-center">
        <p className="text-lg text-slate-300 mb-4">This component is currently being implemented.</p>
        <p className="text-slate-400">The Industry Comparison Tool will allow you to compare key metrics like valuation multiples, growth rates, and profitability across different industries.</p>
      </div>
    </div>
  );
};

export default IndustryComparison;