import { useState, useEffect } from 'react';
import { getForecast } from '../services/apiService';
import { globalUserProfile } from '../store/userProfile';
import { TrendingUp, Wallet, PiggyBank, Banknote, Edit3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { GrowthChart } from '@/components/charts/GrowthChart';
import { formatCurrency, abbreviateNumber } from '@/utils/formatters';
import type { ForecastResults, TimelinePoint } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface UserProfile {
  age: number;
  monthlyIncome: number;
  monthlyContribution: number;
  currentCorpus: number;
  expectedReturn: number;
  retirementAge: number;
}

export function ForecastPage() {
  const [profile] = useState<UserProfile>({
    age: globalUserProfile.age,
    monthlyIncome: globalUserProfile.salary / 12,
    monthlyContribution: globalUserProfile.monthly_contribution,
    currentCorpus: 350000,
    expectedReturn: globalUserProfile.expected_return * 100,
    retirementAge: globalUserProfile.retirement_age,
  });

  const [results, setResults] = useState<ForecastResults | null>(null);

  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    async function loadForecast() {
      try {
        setLoading(true);
        const res = await getForecast(globalUserProfile);
        const data = res.financial_data || {};

        const years = profile.retirementAge - profile.age;
        const totalCorpus = data.projected_corpus || data.tier1_balance || Math.round(profile.currentCorpus * Math.pow(1 + profile.expectedReturn / 100, years) + profile.monthlyContribution * ((Math.pow(1 + (profile.expectedReturn / 100 / 12), years * 12) - 1) / (profile.expectedReturn / 100 / 12)) * (1 + (profile.expectedReturn / 100 / 12)));
        
        const lumpSum = data.lump_sum || Math.round(totalCorpus * 0.6);
        const annuity = data.annuity || Math.round(totalCorpus * 0.4);
        const monthlyPension = data.monthly_pension || Math.round(annuity * 0.0085);

        // Generate mock timeline gracefully since backend doesn't output time series yet
        const timeline: TimelinePoint[] = [];
        for (let i = 0; i <= years; i += 2) {
          const age = profile.age + i;
          const corpusAtAge = profile.currentCorpus * Math.pow(1 + profile.expectedReturn / 100, i) +
            profile.monthlyContribution * 12 * i * Math.pow(1 + profile.expectedReturn / 100, i / 2);
          const contributionAtAge = profile.monthlyContribution * 12 * i;
          timeline.push({
            age,
            corpus: Math.round(corpusAtAge),
            contribution: contributionAtAge,
          });
        }

        setResults({
          projectedCorpus: totalCorpus,
          lumpSumAmount: lumpSum,
          annuityAmount: annuity,
          monthlyPension,
          timeline,
        });

      } catch(e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadForecast();
  }, [profile]);

  if (loading || !results) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t('forecastKey')}</h2>
            <p className="text-sm text-gray-500">{t('deterministicProjections')}</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Edit3 className="w-4 h-4 mr-2" />
          {t('editProfile')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">{t('yourProfile')}</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">{t('age')}</span>
                <span className="font-medium">{profile.age} years</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">{t('monthlyIncome')}</span>
                <span className="font-medium">{formatCurrency(profile.monthlyIncome)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">{t('contributions')}</span>
                <span className="font-medium">{formatCurrency(profile.monthlyContribution)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">{t('currentCorpus')}</span>
                <span className="font-medium">{formatCurrency(profile.currentCorpus)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">{t('expectedReturn')}</span>
                <span className="font-medium">{profile.expectedReturn}%</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">{t('retirementAge')}</span>
                <span className="font-medium">{profile.retirementAge}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projection Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Total Corpus */}
          <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                  <Wallet className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm">{t('projectedCorpusTotal')}</p>
                  <h3 className="text-3xl font-bold">{formatCurrency(results.projectedCorpus)}</h3>
                  <p className="text-blue-100 text-sm">{t('atAge')} {profile.retirementAge}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <PiggyBank className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('lumpSum')}</p>
                    <p className="text-xl font-bold text-gray-900">
                      {abbreviateNumber(results.lumpSumAmount)}
                    </p>
                  </div>
                </div>
                <Progress value={60} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Banknote className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('annuity')}</p>
                    <p className="text-xl font-bold text-gray-900">
                      {abbreviateNumber(results.annuityAmount)}
                    </p>
                  </div>
                </div>
                <Progress value={40} className="h-2" />
              </CardContent>
            </Card>
          </div>

          {/* Monthly Pension */}
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-600 font-medium">{t('monthlyPensionTotal')}</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {formatCurrency(results.monthlyPension)}
                  </p>
                  <p className="text-xs text-emerald-600 mt-1">{t('fromAnnuity')}</p>
                </div>
                <div className="w-16 h-16 bg-emerald-200 rounded-full flex items-center justify-center">
                  <Banknote className="w-8 h-8 text-emerald-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Growth Timeline */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">{t('corpusGrowth')}</h3>
          <p className="text-sm text-gray-500 mb-6">
            {t('projectedGrowth')} {profile.age} to {profile.retirementAge}
          </p>
          <GrowthChart data={results.timeline} height={350} />
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-sm text-gray-600">{t('totalCorpus')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
              <span className="text-sm text-gray-600">{t('totalContribution')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
