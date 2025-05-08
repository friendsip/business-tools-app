import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Filter, ArrowDown, ChevronRight, Activity, Info } from 'lucide-react';

const DealFlow = () => {
  const [activeView, setActiveView] = useState('overview');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeYear, setActiveYear] = useState(2024);
  
  // Deal data
  const dealsByIndustry = [
    { name: 'Technology', value: 45, color: '#3b82f6' },
    { name: 'Manufacturing', value: 28, color: '#f59e0b' },
    { name: 'Healthcare', value: 18, color: '#10b981' },
    { name: 'Retail', value: 12, color: '#a855f7' },
    { name: 'Services', value: 22, color: '#f43f5e' },
    { name: 'Other', value: 15, color: '#6b7280' }
  ];
  
  const dealsBySize = [
    { name: '£1-5M', value: 35, color: '#3b82f6' },
    { name: '£5-10M', value: 24, color: '#10b981' },
    { name: '£10-25M', value: 18, color: '#f59e0b' },
    { name: '£25-50M', value: 10, color: '#a855f7' },
    { name: '£50M+', value: 5, color: '#f43f5e' }
  ];
  
  const dealsByType = [
    { name: 'Trade Sale', value: 42, color: '#3b82f6' },
    { name: 'MBO', value: 15, color: '#10b981' },
    { name: 'EOT', value: 22, color: '#f59e0b' },
    { name: 'PE Backed', value: 18, color: '#a855f7' },
    { name: 'Cross-border', value: 13, color: '#f43f5e' }
  ];
  
  const dealTrends = [
    { year: 2019, deals: 68, avgValue: 8.2 },
    { year: 2020, deals: 62, avgValue: 7.8 },
    { year: 2021, deals: 85, avgValue: 12.5 },
    { year: 2022, deals: 102, avgValue: 15.2 },
    { year: 2023, deals: 128, avgValue: 18.7 },
    { year: 2024, deals: 140, avgValue: 22.5 }
  ];
  
  const monthlyDeals2024 = [
    { month: 'Jan', deals: 8, value: 18.5 },
    { month: 'Feb', deals: 12, value: 24.2 },
    { month: 'Mar', deals: 15, value: 32.8 },
    { month: 'Apr', deals: 14, value: 28.5 },
    { month: 'May', deals: 10, value: 21.3 },
    { month: 'Jun', deals: 16, value: 35.7 },
    { month: 'Jul', deals: 13, value: 27.8 },
    { month: 'Aug', deals: 10, value: 22.4 },
    { month: 'Sep', deals: 11, value: 25.6 },
    { month: 'Oct', deals: 14, value: 29.8 },
    { month: 'Nov', deals: 9, value: 19.4 },
    { month: 'Dec', deals: 8, value: 17.2 }
  ];
  
  // Feature deals
  const featureDeals = [
    {
      id: 1,
      company: 'TechInnovate Ltd',
      industry: 'Technology',
      type: 'Trade Sale',
      value: '£15.2M',
      highlight: 'Achieved 7.5x EBITDA multiple',
      year: 2024
    },
    {
      id: 2,
      company: 'ManufacturePro Holdings',
      industry: 'Manufacturing',
      type: 'EOT',
      value: '£32.5M',
      highlight: 'Successful transition to employee ownership',
      year: 2024
    },
    {
      id: 3,
      company: 'HealthPlus Solutions',
      industry: 'Healthcare',
      type: 'PE Backed',
      value: '£18.7M',
      highlight: 'Strategic exit to private equity',
      year: 2023
    },
    {
      id: 4,
      company: 'RetailConnect Group',
      industry: 'Retail',
      type: 'MBO',
      value: '£8.5M',
      highlight: 'Management buy-out with innovative financing',
      year: 2023
    },
    {
      id: 5,
      company: 'ServicesStar International',
      industry: 'Services',
      type: 'Cross-border',
      value: '£24.3M',
      highlight: 'Cross-border sale to strategic buyer',
      year: 2024
    }
  ];
  
  // Filtered deals
  const filteredDeals = featureDeals.filter(deal => {
    if (activeFilter === 'all') return true;
    return deal.industry.toLowerCase() === activeFilter || deal.type.toLowerCase().replace(' ', '-') === activeFilter;
  }).filter(deal => {
    return deal.year === activeYear;
  });

  // Tab options
  const tabOptions = [
    { id: 'overview', label: 'Market Overview' },
    { id: 'trends', label: 'Deal Trends' },
    { id: 'highlights', label: 'Deal Highlights' }
  ];
  
  // Filter options
  const filterOptions = [
    { id: 'all', label: 'All Deals' },
    { id: 'technology', label: 'Technology' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'retail', label: 'Retail' },
    { id: 'services', label: 'Services' },
    { id: 'trade-sale', label: 'Trade Sale' },
    { id: 'mbo', label: 'MBO' },
    { id: 'eot', label: 'EOT' },
    { id: 'pe-backed', label: 'PE Backed' },
    { id: 'cross-border', label: 'Cross-border' }
  ];
  
  // Year options
  const yearOptions = [2024, 2023, 2022, 2021, 2020, 2019];

  return (
    <div className="w-full bg-slate-900 text-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
        <h2 className="text-2xl font-bold mb-2">Entrepreneurs Hub Deal Flow</h2>
        <p className="text-blue-100">Interactive visualization of M&A activity and market trends</p>
      </div>
      
      {/* Tab Navigation */}
      <div className="bg-slate-800 px-6 border-b border-slate-700">
        <div className="flex overflow-x-auto">
          {tabOptions.map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors
                        ${activeView === tab.id 
                          ? 'border-blue-500 text-blue-400' 
                          : 'border-transparent text-slate-400 hover:text-slate-300'}`}
              onClick={() => setActiveView(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        {/* Filter controls */}
        <div className="mb-8 flex flex-wrap items-center">
          <div className="flex items-center mr-4 mb-2">
            <Filter size={16} className="mr-2 text-slate-400" />
            <span className="text-sm text-slate-400 mr-2">Filter:</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mr-6 mb-2">
            {filterOptions.map(filter => (
              <button
                key={filter.id}
                className={`px-3 py-1 text-xs rounded-full transition-colors
                          ${activeFilter === filter.id 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center mb-2">
            <span className="text-sm text-slate-400 mr-2">Year:</span>
            <select
              className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm"
              value={activeYear}
              onChange={(e) => setActiveYear(Number(e.target.value))}
            >
              {yearOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Market Overview View */}
        {activeView === 'overview' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Deals by Industry</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dealsByIndustry}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {dealsByIndustry.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} deals`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Deals by Size</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dealsBySize}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip formatter={(value) => [`${value} deals`, 'Count']} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {dealsBySize.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Deals by Type</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dealsByType}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {dealsByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} deals`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Key Market Insights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-700 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center mb-2">
                    <Activity size={18} className="mr-2 text-blue-400" />
                    <h4 className="font-medium">Most Active Sectors</h4>
                  </div>
                  <p className="text-sm text-slate-300">Technology and manufacturing continue to lead deal activity, representing over 50% of transactions in 2024.</p>
                </div>
                
                <div className="bg-slate-700 p-4 rounded-lg border-l-4 border-emerald-500">
                  <div className="flex items-center mb-2">
                    <ArrowDown size={18} className="mr-2 text-emerald-400 transform rotate-180" />
                    <h4 className="font-medium">Valuation Trends</h4>
                  </div>
                  <p className="text-sm text-slate-300">Average EBITDA multiples have increased to 6.2x in 2024, with technology firms commanding premiums of 7-8x.</p>
                </div>
                
                <div className="bg-slate-700 p-4 rounded-lg border-l-4 border-amber-500">
                  <div className="flex items-center mb-2">
                    <Info size={18} className="mr-2 text-amber-400" />
                    <h4 className="font-medium">Emerging Trend</h4>
                  </div>
                  <p className="text-sm text-slate-300">Employee Ownership Trusts (EOTs) continue to gain popularity, with a 35% increase in EOT transactions over the past year.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Deal Trends View */}
        {activeView === 'trends' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Annual Deal Volume</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dealTrends}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [value, name === 'deals' ? 'Number of Deals' : 'Avg. Deal Value (£M)']} />
                      <Bar dataKey="deals" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Average Deal Value Trend</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dealTrends}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`£${value}M`, 'Avg. Deal Value']} />
                      <Line type="monotone" dataKey="avgValue" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 p-4 rounded-lg mb-8">
              <h3 className="text-lg font-medium mb-4">Monthly Deal Activity ({activeYear})</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyDeals2024}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value, name) => [name === 'deals' ? `${value} deals` : `£${value}M`, name === 'deals' ? 'Number of Deals' : 'Total Value']} />
                    <Bar yAxisId="left" dataKey="deals" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Market Trend Analysis</h3>
              
              <div className="space-y-4">
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Steady Growth in Deal Volume</h4>
                  <p className="text-sm text-slate-300">
                    Deal activity has shown consistent year-on-year growth since 2020, with 2024 on track to exceed last year's record of 128 transactions. This indicates a robust M&A market despite broader economic uncertainties.
                  </p>
                </div>
                
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Rising Valuations</h4>
                  <p className="text-sm text-slate-300">
                    Average deal values have increased by 175% since 2019, reflecting both inflationary pressures and genuine value growth. Technology and healthcare sectors continue to command premium valuations.
                  </p>
                </div>
                
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Seasonal Patterns</h4>
                  <p className="text-sm text-slate-300">
                    Monthly data reveals distinct seasonality in deal completions, with peaks typically occurring in March, June, and October. This pattern allows both buyers and sellers to plan strategic timing for transactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Deal Highlights View */}
        {activeView === 'highlights' && (
          <div>
            {filteredDeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDeals.map(deal => (
                  <div key={deal.id} className="bg-slate-800 p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">{deal.company}</h3>
                      <div className="text-2xl font-bold text-blue-400">{deal.value}</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-slate-700 rounded-full text-xs">{deal.industry}</span>
                      <span className="px-3 py-1 bg-slate-700 rounded-full text-xs">{deal.type}</span>
                      <span className="px-3 py-1 bg-slate-700 rounded-full text-xs">{deal.year}</span>
                    </div>
                    
                    <div className="bg-blue-900/20 border border-blue-800/30 rounded p-3 mb-4">
                      <div className="flex items-center">
                        <div className="p-1 bg-blue-500/20 rounded mr-2">
                          <Info size={16} className="text-blue-400" />
                        </div>
                        <div className="text-sm font-medium text-blue-300">{deal.highlight}</div>
                      </div>
                    </div>
                    
                    <div className="border-t border-slate-700 pt-4 mt-4">
                      <button className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium">
                        View full case study <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800 p-8 rounded-lg text-center">
                <Filter size={48} className="mx-auto mb-4 text-slate-500" />
                <h3 className="text-xl font-medium mb-2">No matching deals found</h3>
                <p className="text-slate-400 mb-4">Try adjusting your filter criteria to see more deals</p>
                <button 
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium"
                  onClick={() => setActiveFilter('all')}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DealFlow;