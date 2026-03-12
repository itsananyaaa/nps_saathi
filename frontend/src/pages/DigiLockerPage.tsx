import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, FileCheck, Award, Download, ExternalLink, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

const iconMap: Record<string, any> = {
  nps_statement: FileText,
  kyc_docs: FileCheck,
  pension_cert: Award,
};

export default function DigiLockerPage() {
  const { t } = useTranslation();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response: any = await api.get('/documents/digilocker');
      if (response.success) {
        setDocuments(response.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || t('digilocker.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold text-foreground">{t('digilocker.title')}</h1>
        <Button className="gap-2 senior-btn-boost" onClick={fetchDocuments} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ExternalLink className="h-4 w-4" />}
          {t('digilocker.fetch')}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc, i) => {
          const Icon = iconMap[doc.key] || FileText;
          return (
            <motion.div
              key={doc.id || doc.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="gov-card flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-1 font-display text-lg font-semibold text-foreground">{doc.document_type || t(`digilocker.${doc.key}`)}</h3>
              <p className="mb-2 text-xs text-muted-foreground">{doc.authority}</p>
              <span className={`gov-badge mb-4 ${doc.status === 'available' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                {doc.status === 'available' ? 'Available' : 'Pending'}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2" 
                disabled={doc.status !== 'available'}
                onClick={() => doc.downloadUrl && doc.downloadUrl !== '#' && window.open(doc.downloadUrl, '_blank')}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </motion.div>
          );
        })}
      </div>
      {documents.length === 0 && !loading && (
        <div className="text-center py-12 text-muted-foreground">
          No documents found. Click "Fetch from DigiLocker" to begin.
        </div>
      )}
    </div>
  );
}
