import React, { useState } from 'react';
import { ArrowRight, Check, Clock, User, DollarSign, ChevronRight, Info } from 'lucide-react';

// Define types for our content structure
interface Service {
  id: number;
  title: string;
  description: string;
}

interface CaseStudy {
  id: number;
  title: string;
  description: string;
}

interface Resource {
  id: number;
  title: string;
  type: string;
}

interface PersonalizedContent {
  title: string;
  description: string;
  services: Service[];
  caseStudies: CaseStudy[];
  resources: Resource[];
}

const PersonalizedJourney = () => {
  const [businessStage, setBusinessStage] = useState<string | null>(null);
  const [businessSize, setBusinessSize] = useState<string | null>(null);
  const [businessGoal, setBusinessGoal] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  
  // Business stage options
  const stageOptions = [
    { id: 'startup', label: 'Startup (1-3 years)', icon: <Clock size={20} /> },
    { id: 'growth', label: 'Growth Stage (3-10 years)', icon: <ArrowRight size={20} /> },
    { id: 'mature', label: 'Mature Business (10+ years)', icon: <Check size={20} /> }
  ];
  
  // Business size options
  const sizeOptions = [
    { id: 'micro', label: 'Micro (1-9 employees)', value: '1-9' },
    { id: 'small', label: 'Small (10-49 employees)', value: '10-49' },
    { id: 'medium', label: 'Medium (50-249 employees)', value: '50-249' },
    { id: 'large', label: 'Large (250+ employees)', value: '250+' }
  ];
  
  // Business goals options
  const goalOptions = [
    { id: 'sell', label: 'Sell my business', icon: <DollarSign size={20} /> },
    { id: 'growth', label: 'Accelerate growth', icon: <ArrowRight size={20} /> },
    { id: 'succession', label: 'Plan succession', icon: <User size={20} /> }
  ];
  
  // Function to get personalized content based on user selections
  const getPersonalizedContent = (): PersonalizedContent => {
    // Content tailored based on user selections
    let content: PersonalizedContent = {
      title: '',
      description: '',
      services: [],
      caseStudies: [],
      resources: []
    };
    
    // Tailor content based on business goal
    if (businessGoal === 'sell') {
      content.title = `Exit Planning for ${businessSize === 'micro' ? 'Small' : businessSize === 'small' ? 'Growing' : 'Established'} Businesses`;
      
      if (businessStage === 'startup') {
        content.description = "Early-stage exit planning requires special considerations. While it's relatively early in your journey, planning now puts you in a stronger position for future opportunities.";
        content.services = [
          { id: 1, title: 'Early-Stage Valuation', description: 'Understand your current value and growth potential' },
          { id: 2, title: 'Exit Strategy Development', description: 'Build a roadmap for maximizing value over the next 1-3 years' },
          { id: 3, title: 'Growth Acceleration', description: 'Strategic initiatives to increase attractiveness to buyers' }
        ];
        content.caseStudies = [
          { id: 1, title: 'TechStart Acquisition', description: 'How a 3-year-old SaaS platform prepared for and achieved acquisition' }
        ];
      } else if (businessStage === 'growth') {
        content.description = "Growth-stage businesses have significant potential to optimize value before exit. With the right strategy, you can maximize your business value over the next 2-3 years.";
        content.services = [
          { id: 1, title: 'Comprehensive Business Valuation', description: 'Detailed assessment of current market value' },
          { id: 2, title: 'Value Enhancement Strategy', description: 'Targeted improvements to maximize business value' },
          { id: 3, title: 'Exit Options Analysis', description: 'Explore trade sales, MBOs, EOTs and other alternatives' }
        ];
        content.caseStudies = [
          { id: 1, title: 'ManufactureTech Sale', description: 'How a manufacturing business increased value by 40% before exit' },
          { id: 2, title: 'ServicePro MBO', description: 'Successful management buyout of a professional services firm' }
        ];
      } else {
        content.description = "Mature businesses have unique advantages in the M&A market. With established operations and proven track records, your business represents a valuable opportunity for the right buyer.";
        content.services = [
          { id: 1, title: 'Strategic Exit Planning', description: 'Comprehensive exit strategy for established businesses' },
          { id: 2, title: 'Business Transition Support', description: 'Ensure smooth transition and integration post-sale' },
          { id: 3, title: 'Legacy Planning', description: 'Protect and extend your business legacy through succession' },
          { id: 4, title: 'Employee Ownership Trust', description: 'Tax-efficient exit while preserving company culture' }
        ];
        content.caseStudies = [
          { id: 1, title: 'IndustryCorp Acquisition', description: 'International acquisition of a 15-year manufacturing business' },
          { id: 2, title: 'FamilyBiz Succession', description: 'Family business transition to next generation leadership' },
          { id: 3, title: 'TechServices EOT', description: 'Transition to employee ownership while preserving culture' }
        ];
      }
      
      content.resources = [
        { id: 1, title: 'Exit Planning Guide', type: 'Guide' },
        { id: 2, title: 'Business Valuation Checklist', type: 'Checklist' },
        { id: 3, title: 'Tax Considerations for Business Sellers', type: 'Article' }
      ];
    } 
    else if (businessGoal === 'growth') {
      content.title = `Growth Strategies for ${businessStage === 'startup' ? 'Early-Stage' : businessStage === 'growth' ? 'Scaling' : 'Mature'} Businesses`;
      
      if (businessStage === 'startup') {
        content.description = "Early-stage growth requires focus on building strong foundations while scaling efficiently. Our strategies help you avoid common pitfalls while accelerating your growth trajectory.";
        content.services = [
          { id: 1, title: 'Market Expansion Strategy', description: 'Identify and capture new market opportunities' },
          { id: 2, title: 'Growth Funding Options', description: 'Access capital to fuel your next phase of growth' },
          { id: 3, title: 'Scalable Operations Design', description: 'Build systems that support efficient scaling' }
        ];
        content.caseStudies = [
          { id: 1, title: 'TechInnovate Funding', description: 'Securing £1.5M growth funding for technology scale-up' }
        ];
      } else if (businessStage === 'growth') {
        content.description = "Mid-sized businesses face unique challenges in maintaining growth momentum. Our strategies focus on optimizing operations while pursuing strategic expansion opportunities.";
        content.services = [
          { id: 1, title: 'Growth Strategy Development', description: 'Comprehensive roadmap for sustainable growth' },
          { id: 2, title: 'Acquisition Targeting', description: 'Identify and acquire complementary businesses' },
          { id: 3, title: 'International Expansion', description: 'Strategic entry into new geographic markets' }
        ];
        content.caseStudies = [
          { id: 1, title: 'ServiceCo Expansion', description: 'Successful expansion into three new regional markets' },
          { id: 2, title: 'TechSolutions Acquisition', description: 'Strategic acquisition of complementary technology provider' }
        ];
      } else {
        content.description = "Mature businesses can achieve new growth through innovation, diversification, and strategic partnerships. Our approach leverages your established strengths while exploring new opportunities.";
        content.services = [
          { id: 1, title: 'Business Diversification', description: 'Expand into adjacent markets and service offerings' },
          { id: 2, title: 'Acquisition Strategy', description: 'Growth through strategic acquisitions' },
          { id: 3, title: 'Digital Transformation', description: 'Leverage technology for competitive advantage' },
          { id: 4, title: 'Strategic Partnerships', description: 'Identify and develop key strategic alliances' }
        ];
        content.caseStudies = [
          { id: 1, title: 'ManufactureCo Diversification', description: 'Successful entry into two complementary market segments' },
          { id: 2, title: 'RetailTech Digital Transformation', description: 'E-commerce integration increasing revenue by 35%' }
        ];
      }
      
      content.resources = [
        { id: 1, title: 'Business Growth Roadmap Template', type: 'Template' },
        { id: 2, title: 'Funding Options Comparison', type: 'Guide' },
        { id: 3, title: 'Market Expansion Strategy Toolkit', type: 'Toolkit' }
      ];
    }
    else if (businessGoal === 'succession') {
      content.title = `Succession Planning for ${businessSize === 'micro' ? 'Small' : businessSize === 'small' ? 'Growing' : 'Established'} Businesses`;
      
      if (businessStage === 'startup') {
        content.description = "While succession may seem distant for early-stage businesses, building the right foundations now ensures more options later. Our approach focuses on creating sustainable systems and leadership development.";
        content.services = [
          { id: 1, title: 'Business Continuity Planning', description: 'Ensure business resilience regardless of leadership' },
          { id: 2, title: 'Early Leadership Development', description: 'Identify and nurture future leadership potential' },
          { id: 3, title: 'Ownership Structure Planning', description: 'Design optimal ownership structures for future transitions' }
        ];
        content.caseStudies = [
          { id: 1, title: 'TechStart Leadership', description: 'Building a leadership team in a fast-growing startup' }
        ];
      } else if (businessStage === 'growth') {
        content.description = "Mid-sized businesses benefit from proactive succession planning. Our strategies ensure business continuity while developing internal talent and exploring ownership transition options.";
        content.services = [
          { id: 1, title: 'Management Succession Planning', description: 'Develop your next generation of leaders' },
          { id: 2, title: 'Management Buyout Preparation', description: 'Structure and finance management team acquisition' },
          { id: 3, title: 'Employee Ownership Exploration', description: 'Assess EOT suitability for your business' }
        ];
        content.caseStudies = [
          { id: 1, title: 'ServiceTeam MBO', description: 'Successful transition to management ownership' },
          { id: 2, title: 'TechConsult Leadership', description: 'Structured leadership development program outcomes' }
        ];
      } else {
        content.description = "Mature businesses require comprehensive succession strategies. Our approach addresses leadership transition, ownership transfer, and preserving business legacy through detailed planning.";
        content.services = [
          { id: 1, title: 'Comprehensive Succession Strategy', description: 'Holistic planning for leadership and ownership transition' },
          { id: 2, title: 'Family Business Transfer', description: 'Navigate the complexities of family succession' },
          { id: 3, title: 'Employee Ownership Trust', description: 'Tax-efficient transfer to employee ownership' },
          { id: 4, title: 'Legacy Preservation Planning', description: 'Ensure your business values and vision continue' }
        ];
        content.caseStudies = [
          { id: 1, title: 'ManufactureFam Transition', description: 'Successful transition to second-generation leadership' },
          { id: 2, title: 'EngineeringCo EOT', description: 'Employee ownership trust implementation case study' },
          { id: 3, title: 'RetailGroup Succession', description: 'Phased leadership transition while preserving brand values' }
        ];
      }
      
      content.resources = [
        { id: 1, title: 'Succession Planning Framework', type: 'Guide' },
        { id: 2, title: 'Leadership Development Toolkit', type: 'Toolkit' },
        { id: 3, title: 'Employee Ownership Trust Guide', type: 'Guide' }
      ];
    }
    
    return content;
  };
  
  // Handle form completion
  const handleComplete = () => {
    setShowContent(true);
  };
  
  // Reset the form
  const handleReset = () => {
    setBusinessStage(null);
    setBusinessSize(null);
    setBusinessGoal(null);
    setShowContent(false);
  };
  
  // Get personalized content based on selections
  const personalizedContent = getPersonalizedContent();

  return (
    <div className="w-full bg-slate-900 text-white rounded-lg overflow-hidden">
      {!showContent ? (
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-2 text-center">Your Business Journey</h2>
          <p className="text-slate-400 text-center mb-8">Tell us about your business to receive personalized guidance</p>

          <div className="max-w-2xl mx-auto">
            {/* Business Stage Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">1. Where are you in your Business Journey?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stageOptions.map(option => (
                  <button
                    key={option.id}
                    className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center text-center
                              ${businessStage === option.id
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-slate-700 hover:border-slate-500 bg-slate-800'}`}
                    onClick={() => setBusinessStage(option.id)}
                  >
                    <div className={`p-3 rounded-full mb-2 ${businessStage === option.id ? 'bg-blue-500/20' : 'bg-slate-700'}`}>
                      {option.icon}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Business Size Selection */}
            {businessStage && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">2. What is the size of your business?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {sizeOptions.map(option => (
                    <button
                      key={option.id}
                      className={`p-4 rounded-lg border-2 transition-all
                                ${businessSize === option.id
                                  ? 'border-blue-500 bg-blue-500/10'
                                  : 'border-slate-700 hover:border-slate-500 bg-slate-800'}`}
                      onClick={() => setBusinessSize(option.id)}
                    >
                      <div className="text-center">
                        <div className="font-medium mb-1">{option.label}</div>
                        <div className="text-sm text-slate-400">{option.value} employees</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Business Goal Selection */}
            {businessSize && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">3. What is your primary goal?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {goalOptions.map(option => (
                    <button
                      key={option.id}
                      className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center text-center
                                ${businessGoal === option.id
                                  ? 'border-blue-500 bg-blue-500/10'
                                  : 'border-slate-700 hover:border-slate-500 bg-slate-800'}`}
                      onClick={() => setBusinessGoal(option.id)}
                    >
                      <div className={`p-3 rounded-full mb-2 ${businessGoal === option.id ? 'bg-blue-500/20' : 'bg-slate-700'}`}>
                        {option.icon}
                      </div>
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            {businessGoal && (
              <div className="flex justify-center mt-6">
                <button
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium mr-4"
                  onClick={handleComplete}
                >
                  View Personalized Guidance
                </button>
                <button
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          <div className="py-4 mt-8 text-center text-slate-400 text-sm">
            <p>To make this into a full prototype app go to <a href="https://blinkprototype.com" className="text-blue-500 hover:text-blue-400">BlinkPrototype_</a></p>
            <p>©2025 <a href="https://www.clouddev.group" className="text-blue-500 hover:text-blue-400">Cloud Development Group Limited</a>. All rights reserved.</p>
          </div>
        </div>
      ) : (
        <div>
          {/* Personalized content display */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <button
                  className="flex items-center text-sm text-white/80 hover:text-white"
                  onClick={handleReset}
                >
                  <ArrowRight size={16} className="mr-1 transform rotate-180" />
                  Change selections
                </button>

                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                    {stageOptions.find(o => o.id === businessStage)?.label}
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                    {sizeOptions.find(o => o.id === businessSize)?.label}
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                    {goalOptions.find(o => o.id === businessGoal)?.label}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-4">{personalizedContent.title}</h1>
              <p className="text-lg text-white/90">{personalizedContent.description}</p>
            </div>
          </div>

          <div className="p-8 max-w-4xl mx-auto">
            {/* Services section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Recommended Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personalizedContent.services.map(service => (
                  <div key={service.id} className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors">
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-slate-300 mb-4">{service.description}</p>
                    <button className="flex items-center text-blue-400 hover:text-blue-300 font-medium">
                      Learn more <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Case studies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Relevant Case Studies</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {personalizedContent.caseStudies.map(caseStudy => (
                  <div key={caseStudy.id} className="bg-slate-800 rounded-lg overflow-hidden group">
                    <div className="h-40 bg-slate-700 relative overflow-hidden">
                      <img src="/api/placeholder/400/240" alt={caseStudy.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{caseStudy.title}</h3>
                      <p className="text-sm text-slate-300 mb-3">{caseStudy.description}</p>
                      <button className="text-sm flex items-center text-blue-400 hover:text-blue-300">
                        Read case study <ChevronRight size={14} className="ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Recommended Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {personalizedContent.resources.map(resource => (
                  <div key={resource.id} className="flex bg-slate-800 rounded-lg p-4 hover:bg-slate-700 transition-colors">
                    <div className="p-2 bg-blue-500/20 rounded mr-3">
                      <Info size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{resource.title}</h3>
                      <div className="text-xs px-2 py-1 bg-slate-700 rounded inline-block text-slate-300">
                        {resource.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to take the next step?</h2>
              <p className="text-slate-300 max-w-2xl mx-auto mb-6">
                Our expert advisors can provide personalized guidance tailored to your specific business situation.
              </p>
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
                Schedule a Consultation
              </button>
            </div>

            <div className="py-4 mt-8 text-center text-slate-400 text-sm">
              <p>To make this into a full prototype app go to <a href="https://blinkprototype.com" className="text-blue-500 hover:text-blue-400">BlinkPrototype_</a></p>
              <p>©2025 <a href="https://www.clouddev.group" className="text-blue-500 hover:text-blue-400">Cloud Development Group Limited</a>. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalizedJourney;