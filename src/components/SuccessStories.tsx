import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building, Users, Clock, TrendingUp, Filter } from 'lucide-react';

const SuccessStories = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredStory, setHoveredStory] = useState<number | null>(null);
  
  // Sample success story data
  const successStories = [
    {
      id: 1,
      companyName: 'TechInnovate',
      industry: 'technology',
      dealType: 'acquisition',
      year: 2023,
      growthData: [
        { year: 2018, value: 1.2 },
        { year: 2019, value: 1.8 },
        { year: 2020, value: 2.4 },
        { year: 2021, value: 3.6 },
        { year: 2022, value: 5.2 },
        { year: 2023, value: 7.5 },
      ],
      description: 'Successfully sold to a strategic buyer achieving 3x initial valuation',
      imageUrl: '/api/placeholder/300/200',
      highlight: 'Achieved 525% growth over 5 years'
    },
    {
      id: 2,
      companyName: 'ManufactPro',
      industry: 'manufacturing',
      dealType: 'eot',
      year: 2022,
      growthData: [
        { year: 2018, value: 4.2 },
        { year: 2019, value: 4.8 },
        { year: 2020, value: 5.1 },
        { year: 2021, value: 7.2 },
        { year: 2022, value: 8.9 },
      ],
      description: 'Transitioned to an Employee Ownership Trust preserving company culture',
      imageUrl: '/api/placeholder/300/200',
      highlight: 'Successfully preserved legacy while rewarding employees'
    },
    {
      id: 3,
      companyName: 'HealthPlus',
      industry: 'healthcare',
      dealType: 'investment',
      year: 2024,
      growthData: [
        { year: 2019, value: 0.8 },
        { year: 2020, value: 1.2 },
        { year: 2021, value: 2.1 },
        { year: 2022, value: 3.4 },
        { year: 2023, value: 5.8 },
        { year: 2024, value: 8.2 },
      ],
      description: 'Secured growth investment to expand into new markets',
      imageUrl: '/api/placeholder/300/200',
      highlight: 'Valuation increased by 400% over 3 years'
    },
    {
      id: 4,
      companyName: 'RetailConnect',
      industry: 'retail',
      dealType: 'acquisition',
      year: 2021,
      growthData: [
        { year: 2017, value: 2.1 },
        { year: 2018, value: 2.8 },
        { year: 2019, value: 3.2 },
        { year: 2020, value: 4.1 },
        { year: 2021, value: 6.5 },
      ],
      description: 'Cross-border acquisition by international retail group',
      imageUrl: '/api/placeholder/300/200',
      highlight: 'Negotiated 30% above market valuation'
    },
    {
      id: 5,
      companyName: 'ServicesUnited',
      industry: 'services',
      dealType: 'mbo',
      year: 2024,
      growthData: [
        { year: 2020, value: 1.5 },
        { year: 2021, value: 2.2 },
        { year: 2022, value: 3.8 },
        { year: 2023, value: 4.9 },
        { year: 2024, value: 6.7 },
      ],
      description: 'Management buyout with innovative financing structure',
      imageUrl: '/api/placeholder/300/200',
      highlight: 'Seamless transition to the leadership team'
    }
  ];
  
  // Filter types
  const filters = [
    { id: 'all', label: 'All Deals', icon: <Building size={16} /> },
    { id: 'acquisition', label: 'Acquisitions', icon: <TrendingUp size={16} /> },
    { id: 'eot', label: 'EOT', icon: <Users size={16} /> },
    { id: 'investment', label: 'Investment', icon: <TrendingUp size={16} /> },
    { id: 'mbo', label: 'MBO', icon: <Users size={16} /> }
  ];
  
  // Industry types for visual categorization
  const industries = [
    { id: 'technology', color: 'bg-blue-500' },
    { id: 'manufacturing', color: 'bg-amber-500' },
    { id: 'healthcare', color: 'bg-emerald-500' },
    { id: 'retail', color: 'bg-purple-500' },
    { id: 'services', color: 'bg-rose-500' }
  ];
  
  // Filter stories based on active filter
  const filteredStories = activeFilter === 'all' 
    ? successStories 
    : successStories.filter(story => story.dealType === activeFilter);

  return (
    <div className="w-full bg-slate-900 text-white p-8 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Success Stories</h2>

        <div className="flex space-x-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all
                ${activeFilter === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span className="mr-2">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visual timeline with interactive elements */}
      <div className="relative mb-12 px-8">
        <div className="absolute left-0 right-0 h-1 bg-slate-700 top-1/2 transform -translate-y-1/2"></div>

        <div className="flex justify-between relative">
          {filteredStories.map((story) => {
            const industryInfo = industries.find(i => i.id === story.industry);
            const industryColor = industryInfo ? industryInfo.color : 'bg-gray-500';

            return (
              <div
                key={story.id}
                className="relative"
                onMouseEnter={() => setHoveredStory(story.id)}
                onMouseLeave={() => setHoveredStory(null)}
              >
                <div
                  className={`w-6 h-6 rounded-full ${industryColor}
                    ${hoveredStory === story.id ? 'ring-4 ring-white/30' : ''}
                    cursor-pointer transition-all duration-300`}
                />

                <div className="absolute bottom-full mb-2 whitespace-nowrap">
                  <span className="text-sm font-medium">{story.year}</span>
                </div>

                {/* Popup card on hover */}
                {hoveredStory === story.id && (
                  <div className="absolute z-10 w-64 bg-slate-800 rounded-lg shadow-xl p-4 -translate-x-1/2 left-1/2 top-8">
                    <div
                      className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45
                                  ${industryColor}`}
                    />

                    <img
                      src={story.imageUrl}
                      alt={story.companyName}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />

                    <h3 className="font-bold text-lg mb-1">{story.companyName}</h3>

                    <div className="flex items-center mb-2">
                      <span
                        className={`inline-block w-3 h-3 rounded-full mr-2
                                  ${industryColor}`}
                      />
                      <span className="text-sm capitalize">{story.industry}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm capitalize">{story.dealType}</span>
                    </div>

                    <p className="text-sm text-slate-300 mb-3">{story.description}</p>

                    <div className="bg-slate-700 p-2 rounded flex items-center">
                      <TrendingUp size={16} className="mr-2 text-green-400" />
                      <span className="text-sm font-medium">{story.highlight}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured success story with interactive growth chart */}
      {filteredStories.length > 0 && (
        <div className="bg-slate-800 rounded-lg p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div
                className={`w-10 h-10 rounded-lg ${industries.find(i => i.id === filteredStories[0].industry)?.color || 'bg-gray-500'}
                          flex items-center justify-center mr-3`}
              >
                {filteredStories[0].dealType === 'acquisition' ? <Building size={20} /> :
                 filteredStories[0].dealType === 'eot' ? <Users size={20} /> :
                 filteredStories[0].dealType === 'investment' ? <TrendingUp size={20} /> :
                 <Users size={20} />}
              </div>
              <div>
                <h3 className="text-xl font-bold">{filteredStories[0].companyName}</h3>
                <div className="flex items-center">
                  <span className="text-sm capitalize">{filteredStories[0].industry}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm capitalize">{filteredStories[0].dealType}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm flex items-center">
                    <Clock size={14} className="mr-1" />
                    {filteredStories[0].year}
                  </span>
                </div>
              </div>
            </div>

            <img
              src={filteredStories[0].imageUrl}
              alt={filteredStories[0].companyName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <p className="text-slate-300">{filteredStories[0].description}</p>

            <div className="mt-4 bg-slate-700 p-3 rounded-lg">
              <div className="font-medium mb-1">Key Achievements</div>
              <div className="flex items-center">
                <TrendingUp size={16} className="mr-2 text-green-400" />
                <span>{filteredStories[0].highlight}</span>
              </div>
            </div>

            <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors">
              Read Full Case Study
            </button>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Growth Trajectory</h4>
            <div className="bg-slate-700 p-4 rounded-lg h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredStories[0].growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis
                    dataKey="year"
                    stroke="#cbd5e1"
                  />
                  <YAxis
                    stroke="#cbd5e1"
                    label={{ value: 'Revenue (£M)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#cbd5e1' } }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={getColorForIndustry(filteredStories[0].industry)}
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="bg-slate-700 p-3 rounded-lg text-center">
                <div className="text-sm text-slate-400">Initial Value</div>
                <div className="text-lg font-bold">£{filteredStories[0].growthData[0].value}M</div>
              </div>
              <div className="bg-slate-700 p-3 rounded-lg text-center">
                <div className="text-sm text-slate-400">Exit Value</div>
                <div className="text-lg font-bold">£{filteredStories[0].growthData[filteredStories[0].growthData.length - 1].value}M</div>
              </div>
              <div className="bg-slate-700 p-3 rounded-lg text-center">
                <div className="text-sm text-slate-400">Growth</div>
                <div className="text-lg font-bold text-green-400">
                  {Math.round((filteredStories[0].growthData[filteredStories[0].growthData.length - 1].value / filteredStories[0].growthData[0].value - 1) * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No results message */}
      {filteredStories.length === 0 && (
        <div className="bg-slate-800 p-8 rounded-lg text-center">
          <Filter size={48} className="mx-auto mb-4 text-slate-500" />
          <h3 className="text-xl font-medium mb-2">No matching success stories</h3>
          <p className="text-slate-400">Try changing your filter selection to see more success stories</p>
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
            onClick={() => setActiveFilter('all')}
          >
            Show all stories
          </button>
        </div>
      )}

      <div className="py-4 mt-8 text-center text-slate-400 text-sm">
        <p>To make this into a full prototype app go to <a href="https://blinkprototype.com" className="text-blue-500 hover:text-blue-400">BlinkPrototype_</a></p>
        <p>©2025 <a href="https://www.clouddev.group" className="text-blue-500 hover:text-blue-400">Cloud Development Group Limited</a>. All rights reserved.</p>
      </div>
    </div>
  );
};

// Helper function to convert Tailwind color classes to hex colors
function getColorForIndustry(industry: string): string {
  const colorMap: Record<string, string> = {
    'technology': '#3b82f6', // blue-500
    'manufacturing': '#f59e0b', // amber-500
    'healthcare': '#10b981', // emerald-500
    'retail': '#a855f7', // purple-500
    'services': '#f43f5e', // rose-500
  };
  
  return colorMap[industry] || '#64748b'; // Default to slate-500
}

export default SuccessStories;