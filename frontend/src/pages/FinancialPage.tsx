import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Banknote, TrendingUp, IndianRupee, PieChart, Link2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import api from '@/lib/api';
import { toast } from 'sonner';

export default function FinancialPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [totalCorpus, setTotalCorpus] = useState(0);

  const fetchFinancialData = async (consentId: string) => {
    try {
      const response: any = await api.get(`/aggregator/data/${consentId}`);
      if (response.success && response.data) {
        setData(response.data.formattedData || []);
        setTotalCorpus(response.data.totalCorpus || 0);
        toast.success(t('financial.success'));
      }
    } catch (error: any) {
      toast.error(error.message || t('financial.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    setLoading(true);
    try {
      const response: any = await api.post('/aggregator/consent', {
        fipId: 'FIP-SANDBOX-01',
        purpose: 'Retirement Planning'
      });
      if (response.success) {
        toast.info(t('financial.consent_initiated'));
        fetchFinancialData(response.data.consentId);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || t('financial.error'));
      setLoading(false);
    }
  };

  const itemsMap: Record<string, any> = {
    bank_accounts: { icon: Banknote, color: 'bg-primary/10 text-primary' },
    investments: { icon: TrendingUp, color: 'bg-success/10 text-success' },
    nps_balance: { icon: IndianRupee, color: 'bg-warning/10 text-warning' },
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold text-foreground">{t('financial.title')}</h1>
        <Button 
          variant="outline" 
          className="gap-2 senior-btn-boost" 
          onClick={handleConnect} 
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
          {t('financial.aa_connect')}
        </Button>
      </div>

      {/* Total Corpus */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="gov-card text-center">
        <PieChart className="mx-auto mb-2 h-8 w-8 text-primary" />
        <div className="text-sm text-muted-foreground">{t('financial.total_corpus')}</div>
        <div className="mt-1 text-3xl font-bold text-foreground">
          ₹{totalCorpus > 0 ? totalCorpus.toLocaleString('en-IN') : '---'}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Cards */}
        <div className="space-y-4">
          {data.length > 0 ? data.map((item, i) => {
            const config = itemsMap[item.key] || { icon: Banknote, color: 'bg-primary/10 text-primary' };
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="gov-card flex items-center gap-4"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${config.color}`}>
                  <config.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t(`financial.${item.key}`)}</div>
                  <div className="text-xl font-bold text-foreground">₹{item.value.toLocaleString('en-IN')}</div>
                </div>
              </motion.div>
            );
          }) : (
            <div className="gov-card flex items-center justify-center py-12 text-muted-foreground">
              Connect Account Aggregator to view breakdown
            </div>
          )}
        </div>

        {/* Pie Chart */}
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="gov-card">
          <div className="h-[300px]">
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={60} paddingAngle={3}>
                    {data.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
                </RechartsPie>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </div>
          <div className="flex justify-center flex-wrap gap-4 mt-2">
            {data.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
