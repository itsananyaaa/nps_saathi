import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { IndianRupee, Calendar, TrendingUp, PiggyBank, ShieldCheck, Lightbulb, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { apiService } from '@/services/apiService';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { t } = useTranslation();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dummyProfile = {
          age: 30,
          salary: 80000,
          monthly_contribution: 5000,
          risk_preference: 'balanced',
          years_of_service: 5,
          retirement_age: 60,
          expected_return: 0.10,
          volatility: 0.15
        };
        const [forecastRes, recRes] = await Promise.all([
          apiService.getForecast(dummyProfile),
          apiService.getRecommendation(dummyProfile)
        ]);

        if (forecastRes.financial_data) {
          setData({
            pensionAccount: { tier1_balance: forecastRes.financial_data.projected_corpus },
            latestSimulation: { 
              projectedMonthlyPension: forecastRes.financial_data.monthly_pension, 
              yearlyProjectionData: [] 
            },
            financialProfile: { retirement_age: 60, monthly_contribution: 5000, risk_appetite: 'Balanced' },
            user: { name: 'User' },
            recommendations: [recRes.response]
          });
        }
      } catch (error: any) {
        toast.error(error.message || t('dashboard.error'));
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [t]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const dashboardCards = [
    { 
      key: 'nps_balance', 
      value: `₹${(data?.pensionAccount?.tier1_balance || 0).toLocaleString('en-IN')}`, 
      icon: IndianRupee, 
      color: 'bg-primary/10 text-primary' 
    },
    { 
      key: 'monthly_pension', 
      value: data?.latestSimulation?.projectedMonthlyPension ? `₹${data.latestSimulation.projectedMonthlyPension.toLocaleString('en-IN')}` : '---', 
      icon: TrendingUp, 
      color: 'bg-success/10 text-success' 
    },
    { 
      key: 'retirement_age', 
      value: data?.financialProfile?.retirement_age || '60', 
      icon: Calendar, 
      color: 'bg-info/10 text-info' 
    },
    { 
      key: 'contributions', 
      value: `₹${(data?.financialProfile?.monthly_contribution || 0).toLocaleString('en-IN')}/mo`, 
      icon: PiggyBank, 
      color: 'bg-warning/10 text-warning' 
    },
    { 
      key: 'risk_profile', 
      value: data?.financialProfile?.risk_appetite || 'Balanced', 
      icon: ShieldCheck, 
      color: 'bg-accent/10 text-accent' 
    },
  ];

  const projectionData = data?.latestSimulation?.yearlyProjectionData || [];

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-foreground">{t('dashboard.title')}</h1>
        <div className="text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full capitalize">
          {data?.user?.name || 'User'}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {dashboardCards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="gov-card"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.color}`}>
                <card.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-sm text-muted-foreground senior-text-boost">{t(`dashboard.${card.key}`)}</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{card.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="gov-card"
      >
        <h2 className="mb-6 font-display text-xl font-semibold text-foreground">{t('dashboard.projection_title')}</h2>
        <div className="h-[350px]">
          {projectionData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="corpusGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(214, 80%, 32%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(214, 80%, 32%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                <XAxis dataKey="age" label={{ value: 'Age', position: 'bottom', offset: -10 }} tick={{ fontSize: 13 }} />
                <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} tick={{ fontSize: 13 }} />
                <Tooltip
                  formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Corpus']}
                  labelFormatter={(label) => `Age: ${label}`}
                  contentStyle={{ borderRadius: '0.75rem', border: '1px solid hsl(214, 20%, 88%)' }}
                />
                <Area type="monotone" dataKey="corpus" stroke="hsl(214, 80%, 32%)" strokeWidth={3} fill="url(#corpusGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <TrendingUp className="h-10 w-10 opacity-20" />
              <p>Run a simulation to see your projected growth</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="gov-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-accent" />
          <h2 className="font-display text-xl font-semibold text-foreground">{t('dashboard.recommendations')}</h2>
        </div>
        <div className="space-y-3">
          {data?.recommendations ? data.recommendations.map((rec: string, i: number) => (
            <div key={i} className="flex items-start gap-3 rounded-lg bg-secondary/50 p-4">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                {i + 1}
              </div>
              <p className="text-sm text-foreground senior-text-boost">{rec}</p>
            </div>
          )) : [1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg bg-secondary/50 p-4">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                {i}
              </div>
              <p className="text-sm text-foreground senior-text-boost">{t(`dashboard.rec_${i}`)}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
