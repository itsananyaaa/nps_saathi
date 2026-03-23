import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getForecast } from '../services/apiService';
import { globalUserProfile } from '../store/userProfile';
import { 
  Wallet, 
  TrendingUp, 
  Banknote, 
  Calculator, 
  Bot, 
  User,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatCard } from '@/components/shared/StatCard';
import { InsightCard } from '@/components/shared/InsightCard';
import { GaugeChart } from '@/components/charts/GaugeChart';
import { formatCurrency, calculateReadinessScore, getReadinessLabel } from '@/utils/formatters';
import { useLanguage } from '@/context/LanguageContext';

export function DashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { t } = useLanguage();
  const [dashboardData, setDashboardData] = useState({
    projectedCorpus: 0,
    monthlyPension: 0,
    insights: [] as string[]
  });

  const baseProfile = {
    name: 'Rahul Sharma',
    currentCorpus: 350000,
    monthlyIncome: 80000,
  };

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const forecast = await getForecast(globalUserProfile);
        const financial = forecast.financial_data || {};

        setDashboardData({
          projectedCorpus: financial.projected_corpus || financial.tier1_balance || 12500000,
          monthlyPension: financial.monthly_pension || 52000,
          insights: [
            'Increase equity exposure by 10% for better long-term growth potential.',
            'Consider NPS Tier II for additional tax benefits under Section 80CCD(1B).'
          ]
        });
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const readinessScore = calculateReadinessScore(
    globalUserProfile.age,
    globalUserProfile.retirement_age,
    globalUserProfile.monthly_contribution,
    baseProfile.monthlyIncome,
    baseProfile.currentCorpus
  );

  if (loading) {
    return (
      <div className="flex h-full min-h-[500px] items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-[500px] items-center justify-center text-red-600 font-medium">
        Failed to fetch dashboard data. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-1">{t('welcomeBack')}, {baseProfile.name}! 👋</h2>
        <p className="text-blue-100">{t('retirementOverview')}</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<Wallet className="w-5 h-5" />}
          title={t('contributions')}
          value={formatCurrency(globalUserProfile.monthly_contribution)}
          subtitle={t('monthlyContributionSub')}
          trend="up"
          trendValue="+5%"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          title={t('projectedCorpus')}
          value={formatCurrency(dashboardData.projectedCorpus)}
          subtitle={`${t('projectedCorpusSub')} ${globalUserProfile.retirement_age}`}
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          icon={<Banknote className="w-5 h-5" />}
          title={t('monthlyPension')}
          value={formatCurrency(dashboardData.monthlyPension)}
          subtitle={t('monthlyPensionSub')}
        />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Readiness Score */}
        <Card className="h-full">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">{t('readinessScore')}</h3>
            <div className="flex flex-col items-center">
              <GaugeChart value={readinessScore} size={220} />
              <p className="mt-4 text-lg font-medium" style={{ 
                color: readinessScore >= 80 ? '#22c55e' : 
                       readinessScore >= 60 ? '#3b82f6' : 
                       readinessScore >= 40 ? '#f59e0b' : '#ef4444'
              }}>
                {getReadinessLabel(readinessScore)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {t('basedOnCurrent')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <InsightCard 
          insights={dashboardData.insights}
          onAction={() => navigate('/ai-assistant')}
          actionLabel="Ask AI Assistant"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">{t('quickActions')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-blue-50 hover:border-blue-200"
              onClick={() => navigate('/simulator')}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calculator className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-center">
                <span className="block font-medium">{t('runSimulation')}</span>
                <span className="text-xs text-gray-500">{t('testScenarios')}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Button>

            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-purple-50 hover:border-purple-200"
              onClick={() => navigate('/ai-assistant')}
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-center">
                <span className="block font-medium">{t('askAI')}</span>
                <span className="text-xs text-gray-500">{t('askAISub')}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Button>

            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-emerald-50 hover:border-emerald-200"
              onClick={() => navigate('/account')}
            >
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-center">
                <span className="block font-medium">{t('updateProfile')}</span>
                <span className="text-xs text-gray-500">{t('yourDetails')}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
