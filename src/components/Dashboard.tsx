import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, BarChart2, Users, Activity, TrendingUp, LineChart, Briefcase, Zap } from 'lucide-react';

const Dashboard: React.FC = () => {
  const tools = [
    {
      name: 'Business Calculator',
      description: 'Calculate the estimated value of your business based on industry benchmarks and financial metrics',
      icon: <Calculator size={24} className="text-blue-400" />,
      path: '/business-calculator',
      category: 'calculator'
    },
    {
      name: 'Business Diagnostic',
      description: 'Assess your business readiness and receive recommendations for improvement',
      icon: <Activity size={24} className="text-blue-400" />,
      path: '/business-diagnostic',
      category: 'calculator'
    },
    {
      name: 'Market Pulse',
      description: 'Interactive dashboard showing current market trends and M&A activity',
      icon: <BarChart2 size={24} className="text-emerald-400" />,
      path: '/market-pulse',
      category: 'visualization'
    },
    {
      name: 'Deal Flow',
      description: 'Visualize current deal flow and transaction trends in the market',
      icon: <TrendingUp size={24} className="text-emerald-400" />,
      path: '/deal-flow',
      category: 'visualization'
    },
    {
      name: 'Industry Comparison',
      description: 'Compare performance metrics across different industries and sectors',
      icon: <LineChart size={24} className="text-emerald-400" />,
      path: '/industry-comparison',
      category: 'visualization'
    },
    {
      name: 'Client Journey',
      description: 'Explore the typical client journey through the M&A process',
      icon: <Users size={24} className="text-amber-400" />,
      path: '/day-in-life',
      category: 'journey'
    },
    {
      name: 'Personalized Journey',
      description: 'Get personalized guidance based on your business profile and goals',
      icon: <Zap size={24} className="text-amber-400" />,
      path: '/personalized-journey',
      category: 'journey'
    },
    {
      name: 'Business Journey',
      description: 'Interactive business journey visualization and planning tool',
      icon: <Briefcase size={24} className="text-amber-400" />,
      path: '/interactive-business-journey',
      category: 'journey'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Business Advisory Tools</h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Explore our comprehensive suite of interactive tools designed to help you assess, 
          plan, and optimize your business journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors border border-slate-700 hover:border-blue-500"
          >
            <div className="flex items-start">
              <div className="mt-1 mr-4">
                {tool.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-slate-300">{tool.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;