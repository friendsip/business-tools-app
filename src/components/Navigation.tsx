import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Calculator, BarChart2, TrendingUp, Activity, Briefcase, LineChart, Zap } from 'lucide-react';

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  category: 'calculators' | 'visualization' | 'journey';
}

const navigationItems: NavigationItem[] = [
  // Calculators/Tools
  { 
    name: 'Business Calculator', 
    path: '/business-calculator', 
    icon: <Calculator size={20} />,
    category: 'calculators'
  },
  { 
    name: 'Business Diagnostic', 
    path: '/business-diagnostic', 
    icon: <Activity size={20} />,
    category: 'calculators'
  },
  
  // Data Visualization
  { 
    name: 'Market Pulse', 
    path: '/market-pulse', 
    icon: <BarChart2 size={20} />,
    category: 'visualization'
  },
  { 
    name: 'Deal Flow', 
    path: '/deal-flow', 
    icon: <TrendingUp size={20} />,
    category: 'visualization'
  },
  { 
    name: 'Industry Comparison', 
    path: '/industry-comparison', 
    icon: <LineChart size={20} />,
    category: 'visualization'
  },
  
  // Journey/Experience
  { 
    name: 'Personalized Journey', 
    path: '/personalized-journey', 
    icon: <Zap size={20} />,
    category: 'journey'
  },
  { 
    name: 'Success Stories', 
    path: '/success-stories', 
    icon: <Briefcase size={20} />,
    category: 'journey'
  }
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const renderNavigationItems = (category: NavigationItem['category']) => {
    return navigationItems
      .filter(item => item.category === category)
      .map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `
            flex items-center px-4 py-3 text-base font-medium rounded-lg
            ${isActive 
              ? 'bg-blue-600 text-white' 
              : 'text-slate-300 hover:bg-slate-700'}
          `}
          onClick={() => setIsOpen(false)}
        >
          <span className="mr-3">{item.icon}</span>
          {item.name}
        </NavLink>
      ));
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 z-40 w-full bg-slate-800 lg:hidden">
        <div className="px-4 py-3 flex justify-between items-center">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">App Ideas</h1>
          </Link>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-slate-800 overflow-y-auto">
          <div className="flex items-center h-16 px-4">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">App Ideas</h1>
            </Link>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto px-3 py-4 space-y-6">
            <div>
              <h2 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Calculators & Tools
              </h2>
              <div className="mt-3 space-y-2">
                {renderNavigationItems('calculators')}
              </div>
            </div>
            <div>
              <h2 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Market Visualization
              </h2>
              <div className="mt-3 space-y-2">
                {renderNavigationItems('visualization')}
              </div>
            </div>
            <div>
              <h2 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Journey & Experience
              </h2>
              <div className="mt-3 space-y-2">
                {renderNavigationItems('journey')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="fixed inset-0 flex z-40 lg:hidden">
          <div className="fixed inset-0 bg-slate-900 opacity-75" onClick={toggleMenu}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleMenu}
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            <div className="flex items-center h-16 px-4 border-b border-slate-700">
              <Link to="/" className="hover:opacity-80 transition-opacity" onClick={toggleMenu}>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">App Ideas</h1>
              </Link>
            </div>
            <div className="flex-1 h-0 overflow-y-auto px-3 py-4 space-y-6">
              <div>
                <h2 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Calculators & Tools
                </h2>
                <div className="mt-3 space-y-2">
                  {renderNavigationItems('calculators')}
                </div>
              </div>
              <div>
                <h2 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Market Visualization
                </h2>
                <div className="mt-3 space-y-2">
                  {renderNavigationItems('visualization')}
                </div>
              </div>
              <div>
                <h2 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Journey & Experience
                </h2>
                <div className="mt-3 space-y-2">
                  {renderNavigationItems('journey')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;