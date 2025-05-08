import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle, Clock, BarChart2, Percent, DollarSign, RefreshCw } from 'lucide-react';

interface MarketData {
  month: string;
  deals: number;
  value: number;
  avgMultiple: number;
  sentiment: number;
}

interface SectorData {
  name: string;
  currentMultiple: number;
  change: number;
  dealPipeline: number;
  activeAcquirers: number;
  sentiment: number;
  hotSectors: string[];
  recentDeals: Array<{
    company: string;
    sector: string;
    value: string;
    multiple: string;
    date: string;
  }>;
  keyTrends: Array<{
    trend: string;
    impact: 'positive' | 'negative' | 'neutral';
  }>;
}

interface SectorDataMap {
  [key: string]: SectorData;
}

const MarketPulseDashboard: React.FC = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('3m');
  const [sectorFilter, setSectorFilter] = useState('all');
  
  // Market data
  const marketTrends: Record<string, MarketData[]> = {
    '3m': [
      { month: 'Mar', deals: 42, value: 1250, avgMultiple: 5.8, sentiment: 68 },
      { month: 'Apr', deals: 38, value: 980, avgMultiple: 5.6, sentiment: 65 },
      { month: 'May', deals: 45, value: 1320, avgMultiple: 5.9, sentiment: 72 }
    ],
    '6m': [
      { month: 'Dec', deals: 32, value: 870, avgMultiple: 5.4, sentiment: 62 },
      { month: 'Jan', deals: 35, value: 940, avgMultiple: 5.5, sentiment: 63 },
      { month: 'Feb', deals: 38, value: 1050, avgMultiple: 5.7, sentiment: 65 },
      { month: 'Mar', deals: 42, value: 1250, avgMultiple: 5.8, sentiment: 68 },
      { month: 'Apr', deals: 38, value: 980, avgMultiple: 5.6, sentiment: 65 },
      { month: 'May', deals: 45, value: 1320, avgMultiple: 5.9, sentiment: 72 }
    ],
    '12m': [
      { month: 'Jun 24', deals: 28, value: 780, avgMultiple: 5.2, sentiment: 59 },
      { month: 'Jul 24', deals: 30, value: 820, avgMultiple: 5.3, sentiment: 60 },
      { month: 'Aug 24', deals: 33, value: 850, avgMultiple: 5.3, sentiment: 61 },
      { month: 'Sep 24', deals: 30, value: 810, avgMultiple: 5.2, sentiment: 58 },
      { month: 'Oct 24', deals: 35, value: 890, avgMultiple: 5.3, sentiment: 60 },
      { month: 'Nov 24', deals: 34, value: 920, avgMultiple: 5.4, sentiment: 61 },
      { month: 'Dec 24', deals: 32, value: 870, avgMultiple: 5.4, sentiment: 62 },
      { month: 'Jan 25', deals: 35, value: 940, avgMultiple: 5.5, sentiment: 63 },
      { month: 'Feb 25', deals: 38, value: 1050, avgMultiple: 5.7, sentiment: 65 },
      { month: 'Mar 25', deals: 42, value: 1250, avgMultiple: 5.8, sentiment: 68 },
      { month: 'Apr 25', deals: 38, value: 980, avgMultiple: 5.6, sentiment: 65 },
      { month: 'May 25', deals: 45, value: 1320, avgMultiple: 5.9, sentiment: 72 }
    ]
  };
  
  // Sector-specific data
  const sectorData: SectorDataMap = {
    all: {
      name: 'All Sectors',
      currentMultiple: 5.9,
      change: 0.3,
      dealPipeline: 245,
      activeAcquirers: 87,
      sentiment: 72,
      hotSectors: ['Technology', 'Healthcare', 'Business Services'],
      recentDeals: [
        { company: 'TechSolutions Ltd', sector: 'Technology', value: '£28.5M', multiple: '7.2x', date: '2 days ago' },
        { company: 'HealthPlus Group', sector: 'Healthcare', value: '£42.3M', multiple: '6.5x', date: '5 days ago' },
        { company: 'Manufacturing Pro', sector: 'Manufacturing', value: '£18.7M', multiple: '5.1x', date: '1 week ago' },
        { company: 'Service Partners', sector: 'Business Services', value: '£15.2M', multiple: '5.8x', date: '2 weeks ago' }
      ],
      keyTrends: [
        { trend: 'Cross-border interest strengthening despite geopolitical tensions', impact: 'positive' },
        { trend: 'Private equity dry powder at record levels seeking quality businesses', impact: 'positive' },
        { trend: 'Rising interest rates impacting some deal structures', impact: 'negative' },
        { trend: 'ESG credentials increasingly important in valuation assessments', impact: 'neutral' }
      ]
    },
    technology: {
      name: 'Technology',
      currentMultiple: 7.8,
      change: 0.6,
      dealPipeline: 78,
      activeAcquirers: 32,
      sentiment: 85,
      hotSectors: ['SaaS', 'Cybersecurity', 'FinTech'],
      recentDeals: [
        { company: 'CloudSecure Ltd', sector: 'Cybersecurity', value: '£23.5M', multiple: '8.2x', date: '3 days ago' },
        { company: 'SaaS Innovate', sector: 'SaaS', value: '£35.8M', multiple: '9.5x', date: '1 week ago' },
        { company: 'DataViz Solutions', sector: 'Data Analytics', value: '£18.3M', multiple: '7.6x', date: '2 weeks ago' }
      ],
      keyTrends: [
        { trend: 'Recurring revenue models commanding significant premiums', impact: 'positive' },
        { trend: 'Strategic buyers seeking tech capability acquisition', impact: 'positive' },
        { trend: 'Increasing focus on profitability vs growth-at-all-costs', impact: 'neutral' },
        { trend: 'Talent retention a key factor in deal completion', impact: 'neutral' }
      ]
    },
    manufacturing: {
      name: 'Manufacturing',
      currentMultiple: 5.4,
      change: 0.3,
      dealPipeline: 42,
      activeAcquirers: 18,
      sentiment: 64,
      hotSectors: ['Precision Engineering', 'Green Manufacturing', 'Automation'],
      recentDeals: [
        { company: 'Precision Parts Ltd', sector: 'Engineering', value: '£12.8M', multiple: '5.3x', date: '1 week ago' },
        { company: 'GreenTech Manufacturing', sector: 'Green Manufacturing', value: '£24.5M', multiple: '5.8x', date: '3 weeks ago' },
        { company: 'AutoSystems Inc', sector: 'Automation', value: '£18.2M', multiple: '5.2x', date: '4 weeks ago' }
      ],
      keyTrends: [
        { trend: 'Supply chain resilience increasingly valuable to acquirers', impact: 'positive' },
        { trend: 'Automation and technology integration driving premium valuations', impact: 'positive' },
        { trend: 'Energy costs and sustainability challenges impacting margins', impact: 'negative' },
        { trend: 'Reshoring trends creating new strategic opportunities', impact: 'positive' }
      ]
    },
    healthcare: {
      name: 'Healthcare',
      currentMultiple: 6.5,
      change: 0.4,
      dealPipeline: 58,
      activeAcquirers: 25,
      sentiment: 76,
      hotSectors: ['Digital Health', 'Specialty Care', 'Medical Devices'],
      recentDeals: [
        { company: 'MediTech Solutions', sector: 'Digital Health', value: '£32.5M', multiple: '7.2x', date: '5 days ago' },
        { company: 'Specialty Care Group', sector: 'Specialty Care', value: '£45.8M', multiple: '6.4x', date: '2 weeks ago' },
        { company: 'MedDevice Innovations', sector: 'Medical Devices', value: '£28.3M', multiple: '6.8x', date: '3 weeks ago' }
      ],
      keyTrends: [
        { trend: 'Digital health solutions attracting premium valuations', impact: 'positive' },
        { trend: 'Aging demographics driving long-term sector attractiveness', impact: 'positive' },
        { trend: 'Regulatory hurdles increasing complexity in deal completion', impact: 'negative' },
        { trend: 'Integration of AI and data analytics creating new value drivers', impact: 'positive' }
      ]
    }
  };
  
  // Get current sector data
  const currentSectorData = sectorData[sectorFilter];
  
  // Get relevant time series data
  const timeSeriesData = marketTrends[activeTimeframe];
  
  // Calculate market indicators
  const latestMonth = timeSeriesData[timeSeriesData.length - 1];
  const previousMonth = timeSeriesData[timeSeriesData.length - 2];
  
  const dealVolumeChange = ((latestMonth.deals - previousMonth.deals) / previousMonth.deals) * 100;
  const valueChange = ((latestMonth.value - previousMonth.value) / previousMonth.value) * 100;
  const multipleChange = latestMonth.avgMultiple - previousMonth.avgMultiple;
  const sentimentChange = latestMonth.sentiment - previousMonth.sentiment;
  
  // Format currency
  const formatCurrency = (value: number) => {
    return `£${value}M`;
  };
  
  // Timeframe options
  const timeframeOptions = [
    { id: '3m', label: '3 Months' },
    { id: '6m', label: '6 Months' },
    { id: '12m', label: '12 Months' }
  ];
  
  // Sector options
  const sectorOptions = [
    { id: 'all', label: 'All Sectors' },
    { id: 'technology', label: 'Technology' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'healthcare', label: 'Healthcare' }
  ];

  return (
    <div className="w-full bg-slate-900 text-white rounded-lg overflow-hidden max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">M&A Market Pulse</h2>
            <p className="text-blue-100">Live market trends and activity dashboard</p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <RefreshCw size={14} className="mr-2 text-blue-200" />
            <span className="text-sm text-blue-200">Last updated: Today, 10:45 AM</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div>
            <div className="text-sm text-slate-400 mb-2">Timeframe</div>
            <div className="flex bg-slate-800 rounded-lg p-1">
              {timeframeOptions.map(option => (
                <button
                  key={option.id}
                  className={`px-4 py-1.5 rounded-md text-sm transition-colors
                            ${activeTimeframe === option.id 
                              ? 'bg-blue-600 text-white' 
                              : 'text-slate-300 hover:bg-slate-700'}`}
                  onClick={() => setActiveTimeframe(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-slate-400 mb-2">Sector Focus</div>
            <div className="flex bg-slate-800 rounded-lg p-1">
              {sectorOptions.map(option => (
                <button
                  key={option.id}
                  className={`px-4 py-1.5 rounded-md text-sm transition-colors
                            ${sectorFilter === option.id 
                              ? 'bg-blue-600 text-white' 
                              : 'text-slate-300 hover:bg-slate-700'}`}
                  onClick={() => setSectorFilter(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Top metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg p-5">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg mr-3">
                <BarChart2 size={20} className="text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">EBITDA Multiple</div>
                <div className="text-xl font-bold">{currentSectorData.currentMultiple}x</div>
              </div>
            </div>
            <div className={`flex items-center text-sm ${currentSectorData.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {currentSectorData.change >= 0 ? (
                <TrendingUp size={16} className="mr-1" />
              ) : (
                <TrendingDown size={16} className="mr-1" />
              )}
              <span>{currentSectorData.change >= 0 ? '+' : ''}{currentSectorData.change.toFixed(1)}x YTD</span>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-5">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-lg mr-3">
                <DollarSign size={20} className="text-emerald-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Deal Pipeline</div>
                <div className="text-xl font-bold">{currentSectorData.dealPipeline}</div>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-slate-400">{currentSectorData.activeAcquirers} active acquirers</span>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-5">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-amber-500/20 rounded-lg mr-3">
                <Percent size={20} className="text-amber-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Deal Volume</div>
                <div className="text-xl font-bold">{latestMonth.deals}</div>
              </div>
            </div>
            <div className={`flex items-center text-sm ${dealVolumeChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {dealVolumeChange >= 0 ? (
                <TrendingUp size={16} className="mr-1" />
              ) : (
                <TrendingDown size={16} className="mr-1" />
              )}
              <span>{dealVolumeChange >= 0 ? '+' : ''}{dealVolumeChange.toFixed(1)}% MoM</span>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-5">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-rose-500/20 rounded-lg mr-3">
                <AlertCircle size={20} className="text-rose-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Market Sentiment</div>
                <div className="text-xl font-bold">{currentSectorData.sentiment}/100</div>
              </div>
            </div>
            <div className={`flex items-center text-sm ${sentimentChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {sentimentChange >= 0 ? (
                <TrendingUp size={16} className="mr-1" />
              ) : (
                <TrendingDown size={16} className="mr-1" />
              )}
              <span>{sentimentChange >= 0 ? '+' : ''}{sentimentChange} points</span>
            </div>
          </div>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 p-5 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Deal Volume Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={timeSeriesData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorDeals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
                    formatter={(value) => [`${value} deals`, 'Volume']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="deals" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorDeals)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-slate-800 p-5 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Valuation Multiple Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timeSeriesData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="month" />
                  <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
                    formatter={(value) => [`${value}x`, 'EBITDA Multiple']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgMultiple" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Recent deals and hot sectors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-slate-800 rounded-lg p-5">
            <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-slate-400 border-b border-slate-700">
                    <th className="pb-3 font-medium">Company</th>
                    <th className="pb-3 font-medium">Sector</th>
                    <th className="pb-3 font-medium">Value</th>
                    <th className="pb-3 font-medium">Multiple</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSectorData.recentDeals.map((deal, index) => (
                    <tr key={index} className="border-b border-slate-700/50 last:border-b-0">
                      <td className="py-3 font-medium">{deal.company}</td>
                      <td className="py-3">{deal.sector}</td>
                      <td className="py-3">{deal.value}</td>
                      <td className="py-3">{deal.multiple}</td>
                      <td className="py-3 text-slate-400">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>{deal.date}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-5">
            <h3 className="text-lg font-bold mb-4">Hot Sectors</h3>
            <div className="space-y-4 mb-6">
              {currentSectorData.hotSectors.map((sector, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3
                                 ${index === 0 ? 'bg-amber-500/20 text-amber-400' : 
                                   index === 1 ? 'bg-blue-500/20 text-blue-400' : 
                                   'bg-emerald-500/20 text-emerald-400'}`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{sector}</div>
                    <div className="text-sm text-slate-400">
                      {index === 0 ? 'High demand, strong multiples' : 
                       index === 1 ? 'Growing interest, active buyers' : 
                       'Emerging opportunity'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="h-48 mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Deal Value', value: latestMonth.value },
                    { name: 'Previous', value: previousMonth.value }
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
                    formatter={(value) => [formatCurrency(value as number), 'Total Value']}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Market trends */}
        <div className="bg-slate-800 rounded-lg p-5">
          <h3 className="text-lg font-bold mb-4">Key Market Trends</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentSectorData.keyTrends.map((trend, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-l-4 
                          ${trend.impact === 'positive' ? 'border-emerald-500 bg-emerald-500/10' : 
                            trend.impact === 'negative' ? 'border-rose-500 bg-rose-500/10' : 
                            'border-amber-500 bg-amber-500/10'}`}
              >
                <div className="flex items-center">
                  {trend.impact === 'positive' && <TrendingUp size={16} className="mr-2 text-emerald-400" />}
                  {trend.impact === 'negative' && <TrendingDown size={16} className="mr-2 text-rose-400" />}
                  {trend.impact === 'neutral' && <AlertCircle size={16} className="mr-2 text-amber-400" />}
                  <span>{trend.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPulseDashboard;