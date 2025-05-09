import React, { useState } from 'react';
import { Check, AlertTriangle, HelpCircle, Info, ArrowRight, Activity, BarChart2, Target } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: Array<{ value: number; text: string }>;
  section: string;
  sectionTitle: string;
  sectionColor: string;
}

interface SectionScore {
  raw: number;
  percentage: number;
  color: string;
  title: string;
  icon: React.ReactNode;
}

interface Scores {
  [key: string]: any; // Use any to bypass TypeScript index signature checks
  overall: {
    raw: number;
    percentage: number;
  };
}

interface Recommendation {
  type: string;
  priority: string;
  text: string;
}

const BusinessDiagnosticTool: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  
  // Define diagnostic questions grouped by category
  const diagnosticSections = [
    {
      id: 'growthPotential',
      title: 'Growth Potential',
      icon: <Activity size={20} />,
      color: 'bg-blue-500',
      questions: [
        {
          id: 'marketPosition',
          text: 'How would you describe your current market position?',
          options: [
            { value: 1, text: 'Struggling to establish presence' },
            { value: 2, text: 'Small but stable market share' },
            { value: 3, text: 'Growing steadily' },
            { value: 4, text: 'Established with strong reputation' },
            { value: 5, text: 'Market leader in our niche' }
          ]
        },
        {
          id: 'growthRate',
          text: 'What is your annual revenue growth rate?',
          options: [
            { value: 1, text: 'Flat or declining (<0%)' },
            { value: 2, text: 'Slow growth (0-5%)' },
            { value: 3, text: 'Moderate growth (5-15%)' },
            { value: 4, text: 'Strong growth (15-30%)' },
            { value: 5, text: 'Rapid growth (>30%)' }
          ]
        },
        {
          id: 'marketTrend',
          text: 'How is the overall market trend for your industry?',
          options: [
            { value: 1, text: 'Declining significantly' },
            { value: 2, text: 'Slight decline' },
            { value: 3, text: 'Stable' },
            { value: 4, text: 'Growing steadily' },
            { value: 5, text: 'Rapid growth/emerging market' }
          ]
        }
      ]
    },
    {
      id: 'financialHealth',
      title: 'Financial Health',
      icon: <BarChart2 size={20} />,
      color: 'bg-emerald-500',
      questions: [
        {
          id: 'profitability',
          text: 'How would you describe your current profitability?',
          options: [
            { value: 1, text: 'Consistently unprofitable' },
            { value: 2, text: 'Break-even or occasional profit' },
            { value: 3, text: 'Moderately profitable' },
            { value: 4, text: 'Consistently profitable' },
            { value: 5, text: 'Highly profitable (>20% margin)' }
          ]
        },
        {
          id: 'cashFlow',
          text: 'How stable is your cash flow?',
          options: [
            { value: 1, text: 'Frequently negative cash flow' },
            { value: 2, text: 'Occasionally negative cash flow' },
            { value: 3, text: 'Generally stable' },
            { value: 4, text: 'Consistently positive' },
            { value: 5, text: 'Strong positive with significant reserves' }
          ]
        },
        {
          id: 'financingNeeds',
          text: 'What are your current financing needs?',
          options: [
            { value: 5, text: 'Self-funding with surplus' },
            { value: 4, text: 'Self-funding, stable' },
            { value: 3, text: 'Moderate external funding needs' },
            { value: 2, text: 'Significant funding required' },
            { value: 1, text: 'Urgent capital required' }
          ]
        }
      ]
    },
    {
      id: 'operationalReadiness',
      title: 'Operational Readiness',
      icon: <Target size={20} />,
      color: 'bg-amber-500',
      questions: [
        {
          id: 'systemsProcesses',
          text: 'How formalized are your business systems and processes?',
          options: [
            { value: 1, text: 'Ad-hoc/informal processes' },
            { value: 2, text: 'Basic documentation and systems' },
            { value: 3, text: 'Moderately developed systems' },
            { value: 4, text: 'Well-documented and efficient' },
            { value: 5, text: 'Optimized, scalable processes' }
          ]
        },
        {
          id: 'teamStructure',
          text: 'How developed is your management team structure?',
          options: [
            { value: 1, text: 'Owner-operated, no formal management' },
            { value: 2, text: 'Basic team with high owner dependency' },
            { value: 3, text: 'Developing team with moderate delegation' },
            { value: 4, text: 'Strong team with key positions filled' },
            { value: 5, text: 'Complete team operating independently' }
          ]
        },
        {
          id: 'customerDiversity',
          text: 'How diverse is your customer base?',
          options: [
            { value: 1, text: 'Highly concentrated (1-2 major customers)' },
            { value: 2, text: 'Several key accounts (>50% of revenue)' },
            { value: 3, text: 'Moderate diversity' },
            { value: 4, text: 'Well-diversified customer base' },
            { value: 5, text: 'Highly diversified across markets/segments' }
          ]
        }
      ]
    }
  ];
  
  // Flatten questions for navigation
  const allQuestions: Question[] = diagnosticSections.flatMap(section => 
    section.questions.map(question => ({
      ...question,
      section: section.id,
      sectionTitle: section.title,
      sectionColor: section.color
    }))
  );
  
  // Track total questions
  const totalQuestions = allQuestions.length;
  
  // Handle answer selection
  const handleAnswer = (questionId: string, value: number) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
    
    // Move to next question or show results if complete
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  
  // Go to previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  // Calculate scores by section
  const calculateScores = (): Scores => {
    const scores: any = {};
    
    diagnosticSections.forEach(section => {
      const sectionQuestions = section.questions;
      let totalScore = 0;
      let maxPossible = sectionQuestions.length * 5; // 5 is max score per question
      
      sectionQuestions.forEach(question => {
        if (answers[question.id]) {
          totalScore += answers[question.id];
        }
      });
      
      scores[section.id] = {
        raw: totalScore,
        percentage: Math.round((totalScore / maxPossible) * 100),
        color: section.color,
        title: section.title,
        icon: section.icon
      };
    });
    
    // Calculate overall score
    let totalScore = 0;
    let totalMaxPossible = totalQuestions * 5;
    
    Object.values(answers).forEach(score => {
      totalScore += score;
    });
    
    scores.overall = {
      raw: totalScore,
      percentage: Math.round((totalScore / totalMaxPossible) * 100)
    };
    
    return scores;
  };
  
  // Generate recommendations based on scores
  const generateRecommendations = (scores: Scores): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    
    // Growth potential recommendations
    if (scores.growthPotential.percentage < 40) {
      recommendations.push({
        type: 'growth',
        priority: 'high',
        text: 'Consider strategic pivot or market repositioning to find growth opportunities.'
      });
    } else if (scores.growthPotential.percentage < 70) {
      recommendations.push({
        type: 'growth',
        priority: 'medium',
        text: 'Invest in market development and expansion strategies to accelerate growth.'
      });
    } else {
      recommendations.push({
        type: 'growth',
        priority: 'low',
        text: 'Focus on sustaining momentum and exploring adjacent market opportunities.'
      });
    }
    
    // Financial recommendations
    if (scores.financialHealth.percentage < 40) {
      recommendations.push({
        type: 'financial',
        priority: 'high',
        text: 'Prioritize financial restructuring and stabilization before considering exit options.'
      });
    } else if (scores.financialHealth.percentage < 70) {
      recommendations.push({
        type: 'financial',
        priority: 'medium',
        text: 'Implement profit enhancement strategies to improve financial attractiveness.'
      });
    } else {
      recommendations.push({
        type: 'financial',
        priority: 'low',
        text: 'Focus on maintaining strong financial performance while preparing for potential exit.'
      });
    }
    
    // Operational recommendations
    if (scores.operationalReadiness.percentage < 40) {
      recommendations.push({
        type: 'operational',
        priority: 'high',
        text: 'Formalize business systems and reduce owner dependency before considering exit.'
      });
    } else if (scores.operationalReadiness.percentage < 70) {
      recommendations.push({
        type: 'operational',
        priority: 'medium',
        text: 'Strengthen management structure and operational documentation for better transition readiness.'
      });
    } else {
      recommendations.push({
        type: 'operational',
        priority: 'low',
        text: 'Further refine operational excellence to maximize business value upon exit.'
      });
    }
    
    // Exit readiness recommendation
    if (scores.overall.percentage < 50) {
      recommendations.push({
        type: 'exit',
        priority: 'advisory',
        text: 'Your business may need 2-3 years of strategic preparation before optimal exit readiness.'
      });
    } else if (scores.overall.percentage < 70) {
      recommendations.push({
        type: 'exit',
        priority: 'advisory',
        text: 'With targeted improvements, your business could be exit-ready within 12-18 months.'
      });
    } else {
      recommendations.push({
        type: 'exit',
        priority: 'advisory',
        text: 'Your business shows strong exit readiness. Consider exploring market opportunities now.'
      });
    }
    
    return recommendations;
  };
  
  // Only calculate scores if we're showing results
  const scores = showResults ? calculateScores() : null;
  const recommendations = showResults && scores ? generateRecommendations(scores) : null;

  return (
    <div className="w-full bg-slate-900 text-white rounded-lg overflow-hidden max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
        <h2 className="text-2xl font-bold mb-2">Business Readiness Diagnostic</h2>
        <p className="text-blue-100">Assess your business value and exit readiness</p>
      </div>

      {!showResults ? (
        <div className="p-6">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between mb-2 text-sm text-slate-400">
              <div>Question {currentQuestion + 1} of {totalQuestions}</div>
              <div>Section: {allQuestions[currentQuestion].sectionTitle}</div>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${allQuestions[currentQuestion].sectionColor}`}
                style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current question */}
          <div className="bg-slate-800 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-6">{allQuestions[currentQuestion].text}</h3>

            <div className="space-y-3">
              {allQuestions[currentQuestion].options.map(option => (
                <button
                  key={option.value}
                  className={`w-full p-4 rounded-lg text-left transition-colors border-2
                            ${answers[allQuestions[currentQuestion].id] === option.value
                              ? `${allQuestions[currentQuestion].sectionColor.replace('bg', 'border')} bg-slate-700`
                              : 'border-slate-700 bg-slate-800 hover:bg-slate-700'}`}
                  onClick={() => handleAnswer(allQuestions[currentQuestion].id, option.value)}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border-2
                                    ${answers[allQuestions[currentQuestion].id] === option.value
                                      ? `${allQuestions[currentQuestion].sectionColor.replace('bg', 'border')} ${allQuestions[currentQuestion].sectionColor}`
                                      : 'border-slate-600'}`}
                    >
                      {answers[allQuestions[currentQuestion].id] === option.value && <Check size={14} />}
                    </div>
                    <span>{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>

            <div className="text-slate-400 flex items-center">
              {Object.keys(answers).length} of {totalQuestions} answered
            </div>

            {currentQuestion === totalQuestions - 1 && Object.keys(answers).length === totalQuestions && (
              <button
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                onClick={() => setShowResults(true)}
              >
                View Results
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6">
          {/* Results overview */}
          <div className="bg-slate-800 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-6">Your Business Readiness Score</h3>

            <div className="mb-8">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold mb-2">{scores!.overall.percentage}%</div>
                <div className="text-sm text-slate-400">Overall Readiness Score</div>
              </div>

              <div className="h-3 bg-slate-700 rounded-full overflow-hidden mb-1">
                <div
                  className={`h-full rounded-full ${
                    scores!.overall.percentage >= 70 ? 'bg-emerald-500' :
                    scores!.overall.percentage >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${scores!.overall.percentage}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <div>Needs Work</div>
                <div>Progressing</div>
                <div>Exit Ready</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(scores!).map(([key, score]) => {
                if (key === 'overall') return null;

                // We know all non-overall scores are SectionScore objects
                const sectionScore = score as SectionScore;

                return (
                  <div key={key} className="bg-slate-700 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-lg ${sectionScore.color} mr-3`}>
                        {sectionScore.icon}
                      </div>
                      <h4 className="font-medium">{sectionScore.title}</h4>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="text-2xl font-bold">{sectionScore.percentage}%</div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        sectionScore.percentage >= 70 ? 'bg-emerald-500/20 text-emerald-300' :
                        sectionScore.percentage >= 40 ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {sectionScore.percentage >= 70 ? 'Strong' :
                         sectionScore.percentage >= 40 ? 'Moderate' : 'Needs Improvement'}
                      </div>
                    </div>

                    <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className={sectionScore.color}
                        style={{ width: `${sectionScore.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-slate-800 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-6">Key Recommendations</h3>

            <div className="space-y-4">
              {recommendations!.map((rec, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    rec.priority === 'high' ? 'border-rose-500 bg-rose-500/10' :
                    rec.priority === 'medium' ? 'border-amber-500 bg-amber-500/10' :
                    rec.priority === 'low' ? 'border-emerald-500 bg-emerald-500/10' : 'border-blue-500 bg-blue-500/10'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="mt-0.5 mr-3">
                      {rec.priority === 'high' && <AlertTriangle size={18} className="text-rose-400" />}
                      {rec.priority === 'medium' && <Info size={18} className="text-amber-400" />}
                      {rec.priority === 'low' && <Check size={18} className="text-emerald-400" />}
                      {rec.priority === 'advisory' && <HelpCircle size={18} className="text-blue-400" />}
                    </div>
                    <div>
                      <div className="font-medium mb-1">
                        {rec.priority === 'high' ? 'Critical Priority: ' :
                         rec.priority === 'medium' ? 'Medium Priority: ' :
                         rec.priority === 'low' ? 'Enhancement: ' : 'Exit Timeline: '}
                        {rec.type === 'growth' ? 'Growth Strategy' :
                         rec.type === 'financial' ? 'Financial Performance' :
                         rec.type === 'operational' ? 'Operational Structure' : 'Exit Planning'}
                      </div>
                      <p className="text-sm text-slate-300">{rec.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next steps */}
          <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Next Steps</h3>
            <p className="text-slate-300 mb-6">
              Based on your diagnostic results, our advisors can help you develop a tailored strategy
              to enhance your business value and prepare for a successful exit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center justify-center">
                Book a Strategy Session <ArrowRight size={18} className="ml-2" />
              </button>

              <button className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium" onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
              }}>
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="py-4 mt-8 text-center text-slate-400 text-sm">
        <p>To make this into a full prototype app go to <a href="https://blinkprototype.com" className="text-blue-500 hover:text-blue-400">BlinkPrototype_</a></p>
        <p>©2025 <a href="https://www.clouddev.group" className="text-blue-500 hover:text-blue-400">Cloud Development Group Limited</a>. All rights reserved.</p>
      </div>
    </div>
  );
};

export default BusinessDiagnosticTool;