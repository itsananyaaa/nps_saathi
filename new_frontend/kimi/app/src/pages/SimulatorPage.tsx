import { useState } from 'react';
import { runSimulation as runSimulationApi } from '../services/apiService';
import { globalUserProfile } from '../store/userProfile';
import { Calculator, TrendingDown, TrendingUp, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RISK_LEVELS, EXPECTED_RETURNS } from '@/utils/constants';
import { ProbabilityChart } from '@/components/charts/ProbabilityChart';
import { formatCurrency, abbreviateNumber } from '@/utils/formatters';
import type { SimulationInputs, SimulationResults } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export function SimulatorPage() {
  const [inputs, setInputs] = useState<SimulationInputs>({
    age: globalUserProfile.age,
    retirementAge: globalUserProfile.retirement_age,
    monthlyContribution: globalUserProfile.monthly_contribution,
    expectedReturn: globalUserProfile.expected_return * 100, // convert back to percentage visually
    riskLevel: globalUserProfile.risk_preference as any,
  });

  const [results, setResults] = useState<SimulationResults | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const { t } = useLanguage();

  const runSimulation = async () => {
    setIsSimulating(true);
    try {
      const res = await runSimulationApi({
        ...globalUserProfile,
        age: inputs.age,
        retirement_age: inputs.retirementAge,
        monthly_contribution: inputs.monthlyContribution,
        expected_return: inputs.expectedReturn / 100,
        risk_preference: inputs.riskLevel
      });

      const financialData = res.financial_data || {};

      const simulatedResults: SimulationResults = {
        worstCase: financialData.worst_case_corpus || 0,
        medianCase: financialData.median_corpus || 0,
        bestCase: financialData.best_case_corpus || 0,
        probabilityDistribution: [
          { range: 'Worst Case', probability: financialData.worst_case_corpus || 0, isMedian: false },
          { range: 'Median', probability: financialData.median_corpus || 0, isMedian: true },
          { range: 'Best Case', probability: financialData.best_case_corpus || 0, isMedian: false },
        ],
      };

      setResults(simulatedResults);
    } catch (e) {
      console.error(e);
      alert('Failed to run simulation. Please verify API connection.');
    } finally {
      setIsSimulating(false);
    }
  };

  const handleRiskChange = (risk: typeof inputs.riskLevel) => {
    setInputs({
      ...inputs,
      riskLevel: risk,
      expectedReturn: EXPECTED_RETURNS[risk],
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{t('simulatorKey')}</h2>
          <p className="text-sm text-gray-500">{t('simulatorDesc')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardContent className="p-6 space-y-6">
            <h3 className="font-semibold text-gray-900">{t('inputParams')}</h3>

            {/* Age Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Current Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={inputs.age}
                  onChange={(e) => setInputs({ ...inputs, age: parseInt(e.target.value) || 0 })}
                  min={18}
                  max={70}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retirementAge">Retirement Age</Label>
                <Input
                  id="retirementAge"
                  type="number"
                  value={inputs.retirementAge}
                  onChange={(e) => setInputs({ ...inputs, retirementAge: parseInt(e.target.value) || 0 })}
                  min={50}
                  max={75}
                />
              </div>
            </div>

            {/* Monthly Contribution */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>{t('contributions')}</Label>
                <span className="text-sm font-medium text-blue-600">
                  {formatCurrency(inputs.monthlyContribution)}
                </span>
              </div>
              <Slider
                value={[inputs.monthlyContribution]}
                onValueChange={([value]) => setInputs({ ...inputs, monthlyContribution: value })}
                min={1000}
                max={100000}
                step={1000}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹1,000</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Expected Return */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>{t('expectedReturn')}</Label>
                <span className="text-sm font-medium text-blue-600">
                  {inputs.expectedReturn}%
                </span>
              </div>
              <Slider
                value={[inputs.expectedReturn]}
                onValueChange={([value]) => setInputs({ ...inputs, expectedReturn: value })}
                min={5}
                max={15}
                step={0.5}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>5%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Risk Level */}
            <div className="space-y-2">
              <Label>{t('riskLevel')}</Label>
              <div className="grid grid-cols-2 gap-2">
                {RISK_LEVELS.map((risk) => (
                  <button
                    key={risk.value}
                    onClick={() => handleRiskChange(risk.value as typeof inputs.riskLevel)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      inputs.riskLevel === risk.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-sm">{risk.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{risk.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <Button 
              onClick={runSimulation} 
              disabled={isSimulating}
              className="w-full"
            >
              {isSimulating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Running Simulation...
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4 mr-2" />
                  {t('runSimulation')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <div className="space-y-4">
          {results ? (
            <>
              {/* Scenario Cards */}
              <div className="grid grid-cols-3 gap-3">
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-4 text-center">
                    <TrendingDown className="w-6 h-6 text-red-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-1">Worst Case</p>
                    <p className="text-lg font-bold text-red-700">
                      {abbreviateNumber(results.worstCase)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <Activity className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-1">Median Case</p>
                    <p className="text-lg font-bold text-blue-700">
                      {abbreviateNumber(results.medianCase)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-emerald-50 border-emerald-200">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-1">Best Case</p>
                    <p className="text-lg font-bold text-emerald-700">
                      {abbreviateNumber(results.bestCase)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Probability Distribution */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Probability Distribution</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Based on 10,000 Monte Carlo simulations with {inputs.riskLevel} risk profile
                  </p>
                  <ProbabilityChart data={results.probabilityDistribution} />
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Run a Simulation</h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Adjust the parameters and click &quot;Run Simulation&quot; to see potential outcomes 
                  based on market uncertainty.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
