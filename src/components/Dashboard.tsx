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
      name: 'Personalized Journey',
      description: 'Get personalized guidance based on your business profile and goals',
      icon: <Zap size={24} className="text-amber-400" />,
      path: '/personalized-journey',
      category: 'journey'
    },
    {
      name: 'Success Stories',
      description: 'Explore success stories and case studies from our clients',
      icon: <Briefcase size={24} className="text-amber-400" />,
      path: '/success-stories',
      category: 'journey'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 pb-1">Ideas for Apps</h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Explore some interactive tools build with AI as part of a demonstration by Mark T - 8th May 2025
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="bg-slate-800/60 backdrop-blur-md rounded-lg p-6 hover:bg-slate-700/70 transition-colors border border-slate-700/60 hover:border-blue-500 shadow-lg"
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