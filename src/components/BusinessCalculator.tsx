import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, Briefcase, Award, ChevronRight } from 'lucide-react';

const BusinessValueCalculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    industry: '',
    revenue: 1000000,
    ebitda: 250000,
    growthRate: 15,
    employees: 10,
    yearsOperation: 5
  });
  const [valuation, setValuation] = useState<any>(null);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  
  // Industry multipliers (simplified example)
  const industryMultipliers = {
    technology: { base: 6.5, growth: 0.4 },
    manufacturing: { base: 4.8, growth: 0.2 },
    healthcare: { base: 7.2, growth: 0.3 },
    retail: { base: 3.9, growth: 0.15 },
    services: { base: 5.2, growth: 0.25 }
  };
  
  // Calculate valuation when form data changes
  useEffect(() => {
    if (formData.industry && formData.revenue && formData.ebitda) {
      calculateValuation();
    }
  }, [formData]);
  
  const calculateValuation = () => {
    const multiplier = industryMultipliers[formData.industry as keyof typeof industryMultipliers];
    if (!multiplier) return;
    
    // Base calculation
    let baseValue = formData.ebitda * multiplier.base;
    
    // Growth adjustment
    const growthAdjustment = (formData.growthRate / 10) * multiplier.growth;
    
    // Experience adjustment
    const experienceMultiplier = Math.min(1 + (formData.yearsOperation * 0.03), 1.3);
    
    // Team value adjustment
    const teamMultiplier = Math.min(1 + (formData.employees * 0.005), 1.2);
    
    // Calculate final value
    const finalValue = baseValue * (1 + growthAdjustment) * experienceMultiplier * teamMultiplier;
    
    setValuation({
      total: Math.round(finalValue),
      ebitdaMultiple: (finalValue / formData.ebitda).toFixed(2),
      revenuePercentage: ((finalValue / formData.revenue) * 100).toFixed(1)
    });
    
    // Generate 5-year projection data
    const projectionYears = 5;
    const projections = [];
    
    for (let i = 0; i <= projectionYears; i++) {
      const yearlyGrowth = Math.pow(1 + (formData.growthRate / 100), i);
      const projectedRevenue = formData.revenue * yearlyGrowth;
      const projectedEbitda = formData.ebitda * yearlyGrowth;
      const projectedValue = finalValue * Math.pow(1 + ((formData.growthRate * 0.8) / 100), i);
      
      projections.push({
        year: new Date().getFullYear() + i,
        revenue: Math.round(projectedRevenue),
        ebitda: Math.round(projectedEbitda),
        value: Math.round(projectedValue)
      });
    }
    
    setProjectionData(projections);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'industry' ? value : Number(value)
    }));
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const nextStep = () => {
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="w-full bg-slate-900 text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Business Value Calculator</h2>

      {/* Progress indicator */}
      <div className="flex justify-between mb-8 relative">
        <div className="absolute h-1 bg-slate-700 top-4 left-0 right-0 z-0"></div>

        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="z-10 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2
                ${step >= stepNumber ? 'bg-blue-600' : 'bg-slate-700'}`}
            >
              {stepNumber}
            </div>
            <span className="text-sm text-slate-400">
              {stepNumber === 1 ? 'Business Details' :
               stepNumber === 2 ? 'Financial Information' : 'Valuation Results'}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 p-6 rounded-lg">
        {/* Step 1: Business Details */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Tell us about your business</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2">Industry Sector</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="" disabled>Select an industry...</option>
                  <option value="technology">Technology</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="retail">Retail</option>
                  <option value="services">Professional Services</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Years in Operation</label>
                <input
                  type="range"
                  name="yearsOperation"
                  min="1"
                  max="20"
                  value={formData.yearsOperation}
                  onChange={handleChange}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-slate-400 mt-1">
                  <span>1 year</span>
                  <span>{formData.yearsOperation} years</span>
                  <span>20+ years</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Number of Employees</label>
                <input
                  type="range"
                  name="employees"
                  min="1"
                  max="100"
                  value={formData.employees}
                  onChange={handleChange}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-slate-400 mt-1">
                  <span>1</span>
                  <span>{formData.employees} employees</span>
                  <span>100+</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={nextStep}
                disabled={!formData.industry}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center
                  ${formData.industry ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 cursor-not-allowed'}`}
              >
                Next Step <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Financial Information */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Financial Information</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-slate-300 mb-2">
                  Annual Revenue <span className="text-slate-400 text-sm">(£)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">£</span>
                  <input
                    type="number"
                    name="revenue"
                    min="100000"
                    step="50000"
                    value={formData.revenue}
                    onChange={handleChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 pl-8 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  Current: {formatCurrency(formData.revenue)}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">
                  Annual EBITDA <span className="text-slate-400 text-sm">(£)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">£</span>
                  <input
                    type="number"
                    name="ebitda"
                    min="0"
                    step="10000"
                    value={formData.ebitda}
                    onChange={handleChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 pl-8 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  Current: {formatCurrency(formData.ebitda)} ({((formData.ebitda / formData.revenue) * 100).toFixed(1)}% margin)
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Annual Growth Rate (%)</label>
                <input
                  type="range"
                  name="growthRate"
                  min="0"
                  max="50"
                  value={formData.growthRate}
                  onChange={handleChange}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-slate-400 mt-1">
                  <span>0%</span>
                  <span>{formData.growthRate}%</span>
                  <span>50%</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={prevStep}
                className="py-3 px-6 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium"
              >
                Back
              </button>

              <button
                onClick={nextStep}
                className="py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
              >
                Calculate Value
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && valuation && (
          <div>
            <h3 className="text-xl font-semibold mb-6">Your Business Valuation</h3>

            <div className="bg-slate-900 p-6 rounded-lg mb-8 border border-blue-500/30">
              <div className="text-center">
                <div className="text-slate-400 mb-1">Estimated Business Value</div>
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {formatCurrency(valuation.total)}
                </div>
                <div className="text-sm text-slate-400">
                  Based on {formData.industry} industry benchmarks
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm text-slate-400">EBITDA Multiple</div>
                  <div className="text-xl font-semibold">{valuation.ebitdaMultiple}x</div>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm text-slate-400">% of Revenue</div>
                  <div className="text-xl font-semibold">{valuation.revenuePercentage}%</div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-medium mb-3">5-Year Projection</h4>
              <div className="bg-slate-800 p-4 rounded-lg" style={{ height: '240px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" tickFormatter={(value) => `£${value/1000000}M`} />
                    <Tooltip
                      formatter={(value) => [`${formatCurrency(value as number)}`, '']}
                      labelFormatter={(value) => `Year: ${value}`}
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      name="Business Value"
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-medium mb-3">Key Value Drivers</h4>
              <div className="space-y-3">
                <div className="flex items-center bg-slate-800 p-3 rounded-lg">
                  <div className="p-2 bg-amber-500/20 rounded-lg mr-3">
                    <TrendingUp size={18} className="text-amber-500" />
                  </div>
                  <div>
                    <div className="font-medium">Growth Trajectory</div>
                    <div className="text-sm text-slate-400">
                      {formData.growthRate}% annual growth - {
                        formData.growthRate <= 5 ? 'modest growth potential'
                        : formData.growthRate <= 15 ? 'solid growth trajectory'
                        : 'exceptional growth profile'
                      }
                    </div>
                  </div>
                </div>

                <div className="flex items-center bg-slate-800 p-3 rounded-lg">
                  <div className="p-2 bg-blue-500/20 rounded-lg mr-3">
                    <DollarSign size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium">Profit Margin</div>
                    <div className="text-sm text-slate-400">
                      {((formData.ebitda / formData.revenue) * 100).toFixed(1)}% EBITDA margin - {
                        formData.ebitda / formData.revenue <= 0.15 ? 'potential for improvement'
                        : formData.ebitda / formData.revenue <= 0.25 ? 'healthy profitability'
                        : 'excellent margin profile'
                      }
                    </div>
                  </div>
                </div>

                <div className="flex items-center bg-slate-800 p-3 rounded-lg">
                  <div className="p-2 bg-emerald-500/20 rounded-lg mr-3">
                    <Award size={18} className="text-emerald-500" />
                  </div>
                  <div>
                    <div className="font-medium">Business Maturity</div>
                    <div className="text-sm text-slate-400">
                      {formData.yearsOperation} years in operation - {
                        formData.yearsOperation <= 3 ? 'early stage business'
                        : formData.yearsOperation <= 8 ? 'established business'
                        : 'mature business with proven track record'
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={prevStep}
                className="py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium"
              >
                Adjust Inputs
              </button>

              <button
                className="py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
              >
                Speak to an Advisor
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="py-4 mt-8 text-center text-slate-400 text-sm">
        <p>To make this into a full prototype app go to <a href="https://blinkprototype.com" className="text-blue-500 hover:text-blue-400">BlinkPrototype_</a></p>
        <p>©2025 <a href="https://www.clouddev.group" className="text-blue-500 hover:text-blue-400">Cloud Development Group Limited</a>. All rights reserved.</p>
      </div>
    </div>
  );
};

export default BusinessValueCalculator;