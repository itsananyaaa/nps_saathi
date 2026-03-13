import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calculator, IndianRupee, TrendingUp, Loader2 } from 'lucide-react';
import { apiService } from '@/services/apiService';
import { toast } from 'sonner';

interface SimResult {
  projectedCorpus: number;
  projectedMonthlyPension: number;
  scenarios?: any;
}

export default function SimulatorPage() {
  const { t } = useTranslation();
  const [age, setAge] = useState(30);
  const [salary, setSalary] = useState(50000);
  const [contribution, setContribution] = useState(5000);
  const [risk, setRisk] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');
  const [result, setResult] = useState<SimResult | null>(null);
  const [loading, setLoading] = useState(false);

  const calculate = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiService.runSimulation({
        age: age,
        salary: salary,
        monthly_contribution: contribution,
        risk_preference: risk,
        retirement_age: 60,
        expected_return: 0.10,
        volatility: 0.15
      });

      if (res.financial_data) {
        const mappedResult: SimResult = {
          projectedCorpus: res.financial_data.median_corpus,
          projectedMonthlyPension: res.financial_data.median_monthly_pension,
          scenarios: {
            conservative: { projectedCorpus: res.financial_data.worst_case_corpus, estimatedMonthlyPension: res.financial_data.worst_case_pension },
            balanced: { projectedCorpus: res.financial_data.median_corpus, estimatedMonthlyPension: res.financial_data.median_monthly_pension },
            aggressive: { projectedCorpus: res.financial_data.best_case_corpus, estimatedMonthlyPension: res.financial_data.best_case_pension }
          }
        };
        setResult(mappedResult);
        toast.success(t('simulator.success'));
      }
    } catch (error: any) {
      toast.error(error.message || t('simulator.error'));
    } finally {
      setLoading(false);
    }
  }, [age, contribution, salary, risk, t]);

  const scenarioData = result?.scenarios ? [
    {
      name: t('simulator.conservative'),
      corpus: result.scenarios.conservative.projectedCorpus,
      pension: result.scenarios.conservative.estimatedMonthlyPension,
    },
    {
      name: t('simulator.balanced'),
      corpus: result.scenarios.balanced.projectedCorpus,
      pension: result.scenarios.balanced.estimatedMonthlyPension,
    },
    {
      name: t('simulator.aggressive'),
      corpus: result.scenarios.aggressive.projectedCorpus,
      pension: result.scenarios.aggressive.estimatedMonthlyPension,
    },
  ] : [];

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">{t('simulator.title')}</h1>
        <p className="mt-1 text-muted-foreground senior-text-boost">{t('simulator.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="gov-card space-y-6">
          <div className="space-y-2">
            <Label htmlFor="age" className="text-base font-medium">{t('simulator.age')}: {age}</Label>
            <Slider id="age" min={18} max={58} step={1} value={[age]} onValueChange={([v]) => setAge(v)} className="mt-2" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary" className="text-base font-medium">{t('simulator.salary')}</Label>
            <Input id="salary" type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} className="text-lg" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contribution" className="text-base font-medium">{t('simulator.contribution')}</Label>
            <Input id="contribution" type="number" value={contribution} onChange={(e) => setContribution(Number(e.target.value))} className="text-lg" />
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">{t('simulator.risk')}</Label>
            <Select value={risk} onValueChange={(v) => setRisk(v as typeof risk)}>
              <SelectTrigger className="text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">{t('simulator.conservative')}</SelectItem>
                <SelectItem value="balanced">{t('simulator.balanced')}</SelectItem>
                <SelectItem value="aggressive">{t('simulator.aggressive')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculate} size="lg" className="w-full gap-2 text-lg senior-btn-boost" disabled={loading}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Calculator className="h-5 w-5" />}
            {t('simulator.calculate')}
          </Button>
        </motion.div>

        {/* Results */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          {result && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="gov-card text-center">
                <IndianRupee className="mx-auto mb-2 h-8 w-8 text-primary" />
                <div className="text-sm text-muted-foreground">{t('simulator.projected_corpus')}</div>
                <div className="mt-1 text-2xl font-bold text-primary">₹{result.projectedCorpus.toLocaleString('en-IN')}</div>
              </div>
              <div className="gov-card text-center">
                <TrendingUp className="mx-auto mb-2 h-8 w-8 text-success" />
                <div className="text-sm text-muted-foreground">{t('simulator.monthly_pension')}</div>
                <div className="mt-1 text-2xl font-bold text-success">₹{result.projectedMonthlyPension.toLocaleString('en-IN')}</div>
              </div>
            </div>
          )}

          {scenarioData.length > 0 && (
            <div className="gov-card">
              <h3 className="mb-4 font-display text-lg font-semibold text-foreground">{t('simulator.scenario_comparison')}</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scenarioData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                    <XAxis dataKey="name" tick={{ fontSize: 13 }} />
                    <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} tick={{ fontSize: 13 }} />
                    <Tooltip formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']} contentStyle={{ borderRadius: '0.75rem' }} />
                    <Legend />
                    <Bar dataKey="corpus" name="Corpus" fill="hsl(214, 80%, 32%)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="pension" name="Monthly Pension" fill="hsl(142, 71%, 35%)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
