import React from 'react';
import { Users } from 'lucide-react';

const DayInLife: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 text-white rounded-lg overflow-hidden max-w-7xl mx-auto p-8">
      <div className="text-center mb-12">
        <Users size={48} className="mx-auto mb-4 text-blue-500" />
        <h2 className="text-3xl font-bold mb-2">Client Journey Experience</h2>
        <p className="text-xl text-slate-400">Explore the typical client journey through the M&A process</p>
      </div>

      <div className="bg-slate-800 p-8 rounded-lg text-center">
        <p className="text-lg text-slate-300 mb-4">This component is currently being implemented.</p>
        <p className="text-slate-400">The Client Journey Experience will guide you through the typical stages of an M&A transaction, from initial consultation through to deal completion.</p>
      </div>

    </div>
  );
};

export default DayInLife;