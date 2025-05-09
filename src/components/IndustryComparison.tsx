import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Filter, ArrowUpDown, Check, Info, Zap, AlertTriangle } from 'lucide-react';

// Type definitions
interface IndustryData {
  name: string;
  color: string;
  valuationMultiple: number;
  growthRate: number;
  profitMargin: number;
  dealVolume: number;
  exitReadiness: number;
  valuationTrend: Array<{year: number, multiple: number}>;
  insights: Array<{
    type: string;
    text: string;
  }>;
}

interface IndustriesData {
  [key: string]: IndustryData;
}

interface MetricDefinition {
  id: string;
  label: string;
  description: string;
  accessor: keyof IndustryData;
  format: (value: number) => string | number;
  chartType: string;
}

interface MetricsData {
  [key: string]: MetricDefinition;
}

const IndustryComparisonTool = () => {
  const [selectedIndustries, setSelectedIndustries] = useState(['technology', 'manufacturing']);
  const [primaryMetric, setPrimaryMetric] = useState('valuation');
  const [comparisonView, setComparisonView] = useState('bar');
  
  // Industry data
  const industryData: IndustriesData = {
    technology: {
      name: 'Technology',
      color: '#3b82f6',
      valuationMultiple: 8.7,
      growthRate: 21.4,
      profitMargin: 18.2,
      dealVolume: 142,
      exitReadiness: 82,
      valuationTrend: [
        { year: 2019, multiple: 5.8 },
        { year: 2020, multiple: 6.2 },
        { year: 2021, multiple: 7.5 },
        { year: 2022, multiple: 8.1 },
        { year: 2023, multiple: 8.5 },
        { year: 2024, multiple: 8.7 }
      ],
      insights: [
        {
          type: 'positive',
          text: 'SaaS companies commanding premium multiples of 10-12x EBITDA'
        },
        {
          type: 'trend',
          text: 'Strategic buyers seeking tech capabilities driving strong valuations'
        },
        {
          type: 'caution',
          text: 'Funding environment tightening; focus on profitability growing'
        }
      ]
    },
    manufacturing: {
      name: 'Manufacturing',
      color: '#f59e0b',
      valuationMultiple: 5.4,
      growthRate: 8.3,
      profitMargin: 12.6,
      dealVolume: 87,
      exitReadiness: 78,
      valuationTrend: [
        { year: 2019, multiple: 3.9 },
        { year: 2020, multiple: 3.6 },
        { year: 2021, multiple: 4.2 },
        { year: 2022, multiple: 4.7 },
        { year: 2023, multiple: 5.1 },
        { year: 2024, multiple: 5.4 }
      ],
      insights: [
        {
          type: 'positive',
          text: 'Supply chain technology integration adding significant value'
        },
        {
          type: 'trend',
          text: 'Reshoring trends creating new opportunities for UK manufacturers'
        },
        {
          type: 'caution',
          text: 'Energy costs and regulatory pressures impacting profitability'
        }
      ]
    },
    healthcare: {
      name: 'Healthcare',
      color: '#10b981',
      valuationMultiple: 6.8,
      growthRate: 12.7,
      profitMargin: 15.2,
      dealVolume: 68,
      exitReadiness: 74,
      valuationTrend: [
        { year: 2019, multiple: 4.6 },
        { year: 2020, multiple: 5.2 },
        { year: 2021, multiple: 5.8 },
        { year: 2022, multiple: 6.3 },
        { year: 2023, multiple: 6.6 },
        { year: 2024, multiple: 6.8 }
      ],
      insights: [
        {
          type: 'positive',
          text: 'Digital health solutions attracting significant investor interest'
        },
        {
          type: 'trend',
          text: 'Aging demographic driving demand for innovative care solutions'
        },
        {
          type: 'caution',
          text: 'Regulatory compliance costs increasing operational complexity'
        }
      ]
    },
    retail: {
      name: 'Retail',
      color: '#a855f7',
      valuationMultiple: 4.2,
      growthRate: 5.6,
      profitMargin: 8.4,
      dealVolume: 56,
      exitReadiness: 65,
      valuationTrend: [
        { year: 2019, multiple: 3.5 },
        { year: 2020, multiple: 2.9 },
        { year: 2021, multiple: 3.4 },
        { year: 2022, multiple: 3.8 },
        { year: 2023, multiple: 4.0 },
        { year: 2024, multiple: 4.2 }
      ],
      insights: [
        {
          type: 'positive',
          text: 'Omnichannel capabilities driving premium valuations'
        },
        {
          type: 'trend',
          text: 'Sustainable and ethical practices increasingly important to buyers'
        },
        {
          type: 'caution',
          text: 'High street retailers facing continued margin pressure'
        }
      ]
    },
    services: {
      name: 'Professional Services',
      color: '#f43f5e',
      valuationMultiple: 5.8,
      growthRate: 9.2,
      profitMargin: 16.8,
      dealVolume: 92,
      exitReadiness: 80,
      valuationTrend: [
        { year: 2019, multiple: 4.2 },
        { year: 2020, multiple: 4.5 },
        { year: 2021, multiple: 5.0 },
        { year: 2022, multiple: 5.4 },
        { year: 2023, multiple: 5.6 },
        { year: 2024, multiple: 5.8 }
      ],
      insights: [
        {
          type: 'positive',
          text: 'Recurring revenue models commanding 20-30% valuation premiums'
        },
        {
          type: 'trend',
          text: 'Consolidation increasing as firms seek efficiency through scale'
        },
        {
          type: 'caution',
          text: 'Key person dependency remains a significant value detractor'
        }
      ]
    },
    construction: {
      name: 'Construction',
      color: '#64748b',
      valuationMultiple: 4.5,
      growthRate: 6.8,
      profitMargin: 9.6,
      dealVolume: 48,
      exitReadiness: 70,
      valuationTrend: [
        { year: 2019, multiple: 3.3 },
        { year: 2020, multiple: 3.1 },
        { year: 2021, multiple: 3.6 },
        { year: 2022, multiple: 4.0 },
        { year: 2023, multiple: 4.3 },
        { year: 2024, multiple: 4.5 }
      ],
      insights: [
        {
          type: 'positive',
          text: 'Sustainable construction specialists seeing increased demand'
        },
        {
          type: 'trend',
          text: 'Technology adoption improving margins and attracting buyers'
        },
        {
          type: 'caution',
          text: 'Project-based revenue creating valuation challenges'
        }
      ]
    }
  };
  
  // Metric definitions
  const metrics: MetricsData = {
    valuation: {
      id: 'valuation',
      label: 'Valuation Multiple',
      description: 'Average EBITDA multiple achieved in business sales',
      accessor: 'valuationMultiple',
      format: (value: number) => `${value}x`,
      chartType: 'bar'
    },
    growth: {
      id: 'growth',
      label: 'Growth Rate',
      description: 'Average annual revenue growth',
      accessor: 'growthRate',
      format: (value: number) => `${value}%`,
      chartType: 'bar'
    },
    profitability: {
      id: 'profitability',
      label: 'Profit Margin',
      description: 'Average EBITDA as percentage of revenue',
      accessor: 'profitMargin',
      format: (value: number) => `${value}%`,
      chartType: 'bar'
    },
    dealVolume: {
      id: 'dealVolume',
      label: 'Deal Volume',
      description: 'Number of transactions in the past 12 months',
      accessor: 'dealVolume',
      format: (value: number) => value,
      chartType: 'bar'
    },
    exitReadiness: {
      id: 'exitReadiness',
      label: 'Exit Readiness',
      description: 'Overall exit readiness score based on multiple factors',
      accessor: 'exitReadiness',
      format: (value: number) => `${value}/100`,
      chartType: 'radar'
    }
  };
  
  // Available chart views
  const chartViews = [
    { id: 'bar', label: 'Bar Chart', icon: 'bars' },
    { id: 'line', label: 'Trend Line', icon: 'trend' },
    { id: 'pie', label: 'Comparison', icon: 'pie' }
  ];
  
  // Industry selection handler
  const handleIndustrySelection = (industryId: string) => {
    if (selectedIndustries.includes(industryId)) {
      // Remove if already selected
      if (selectedIndustries.length > 1) {
        setSelectedIndustries(selectedIndustries.filter(id => id !== industryId));
      }
    } else {
      // Add if not already selected (limit to 3)
      if (selectedIndustries.length < 3) {
        setSelectedIndustries([...selectedIndustries, industryId]);
      }
    }
  };
  
  interface ComparisonDataPoint {
    name: string;
    value: number;
    color: string;
  }

  // Prepare data for charts based on selected industries
  const getComparisonData = (): ComparisonDataPoint[] => {
    return selectedIndustries.map(id => ({
      name: industryData[id].name,
      value: industryData[id][metrics[primaryMetric].accessor] as number,
      color: industryData[id].color
    }));
  };
  
  const getTrendData = () => {
    interface TrendDataPoint {
      year: number;
      [key: string]: number;
    }
    
    const data: TrendDataPoint[] = [];
    
    // Combine trend data from all selected industries
    industryData[selectedIndustries[0]].valuationTrend.forEach((yearData, index) => {
      const dataPoint: TrendDataPoint = { year: yearData.year };
      
      selectedIndustries.forEach(industry => {
        dataPoint[industry] = industryData[industry].valuationTrend[index].multiple;
      });
      
      data.push(dataPoint);
    });
    
    return data;
  };

  return (
    <div className="w-full bg-slate-900 text-white rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
        <h2 className="text-2xl font-bold mb-2">Industry Comparison Tool</h2>
        <p className="text-blue-100">Compare key metrics across industries to benchmark your business</p>
      </div>

      <div className="p-6">
        {/* Control panel */}
        <div className="bg-slate-800 p-4 rounded-lg mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Industry selection */}
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-2">Select Industries (max 3)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(industryData).map(([id, industry]) => (
                  <button
                    key={id}
                    className={`px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors
                              ${selectedIndustries.includes(id)
                                ? `bg-${industry.color.replace('#', '')}/20 border border-${industry.color.replace('#', '')}/40`
                                : 'bg-slate-700 hover:bg-slate-600'}`}
                    onClick={() => handleIndustrySelection(id)}
                    style={{
                      backgroundColor: selectedIndustries.includes(id)
                        ? `${industry.color}20`
                        : '',
                      borderColor: selectedIndustries.includes(id)
                        ? `${industry.color}40`
                        : ''
                    }}
                  >
                    <span>{industry.name}</span>
                    {selectedIndustries.includes(id) && (
                      <Check size={14} style={{ color: industry.color }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Metric selection */}
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-2">Compare By</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(metrics).map(([id, metric]) => (
                  <button
                    key={id}
                    className={`px-3 py-2 rounded-lg text-xs text-left transition-colors
                              ${primaryMetric === id
                                ? 'bg-blue-600'
                                : 'bg-slate-700 hover:bg-slate-600'}`}
                    onClick={() => setPrimaryMetric(id)}
                  >
                    <div className="font-medium">{metric.label}</div>
                    <div className="text-xs opacity-80">{metric.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* View selection */}
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-2">Chart Type</h3>
              <div className="grid grid-cols-3 gap-2">
                {chartViews.map(view => (
                  <button
                    key={view.id}
                    className={`px-3 py-2 rounded-lg text-xs flex flex-col items-center justify-center transition-colors
                              ${comparisonView === view.id
                                ? 'bg-blue-600'
                                : 'bg-slate-700 hover:bg-slate-600'}`}
                    onClick={() => setComparisonView(view.id)}
                  >
                    {view.icon === 'bars' && <ArrowUpDown size={18} className="mb-1" />}
                    {view.icon === 'trend' && <Filter size={18} className="mb-1" />}
                    {view.icon === 'pie' && <Info size={18} className="mb-1" />}
                    <span>{view.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Visualization area */}
        <div className="bg-slate-800 p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              {metrics[primaryMetric].label} by Industry
            </h3>
            <div className="text-sm text-slate-400">
              Comparison of {selectedIndustries.length} industries
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {comparisonView === 'bar' ? (
                <BarChart
                  data={getComparisonData()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [metrics[primaryMetric].format(value as number), metrics[primaryMetric].label]} />
                  <Bar dataKey="value" name={metrics[primaryMetric].label} radius={[4, 4, 0, 0]}>
                    {getComparisonData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              ) : comparisonView === 'line' ? (
                <LineChart
                  data={getTrendData()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value: any, name: string) => {
                    return [`${value}x`, industryData[name as keyof typeof industryData]?.name || name];
                  }} />
                  <Legend />
                  {selectedIndustries.map(industry => (
                    <Line
                      key={industry}
                      type="monotone"
                      dataKey={industry}
                      name={industryData[industry].name}
                      stroke={industryData[industry].color}
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              ) : (
                <PieChart>
                  <Pie
                    data={getComparisonData()}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => {
                      const foundData = getComparisonData().find(d => d.name === name);
                      return foundData ? `${name}: ${metrics[primaryMetric].format(foundData.value)}` : name;
                    }}
                    labelLine={false}
                  >
                    {getComparisonData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [metrics[primaryMetric].format(value as number), metrics[primaryMetric].label]} />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Industry insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedIndustries.map(industry => (
            <div
              key={industry}
              className="bg-slate-800 rounded-lg p-6 border-t-4"
              style={{ borderColor: industryData[industry].color }}
            >
              <h3 className="text-lg font-bold mb-4">{industryData[industry].name} Insights</h3>

              <div className="space-y-4">
                {industryData[industry].insights.map((insight, index) => (
                  <div key={index} className="flex">
                    <div className="mr-3 mt-0.5">
                      {insight.type === 'positive' && (
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <Check size={14} className="text-emerald-400" />
                        </div>
                      )}
                      {insight.type === 'trend' && (
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <Zap size={14} className="text-blue-400" />
                        </div>
                      )}
                      {insight.type === 'caution' && (
                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <AlertTriangle size={14} className="text-amber-400" />
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-slate-300">{insight.text}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700">
                <div className="flex justify-between items-center text-sm">
                  <div className="text-slate-400">Key Metrics:</div>
                  <div className="font-medium" style={{ color: industryData[industry].color }}>
                    {metrics.valuation.format(industryData[industry].valuationMultiple)} EBITDA
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <div className="text-slate-400">Growth Rate:</div>
                  <div>{metrics.growth.format(industryData[industry].growthRate)}</div>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <div className="text-slate-400">Profit Margin:</div>
                  <div>{metrics.profitability.format(industryData[industry].profitMargin)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default IndustryComparisonTool;