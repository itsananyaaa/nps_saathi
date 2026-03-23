import { useState } from 'react';
import { BookOpen, Search, Download, ExternalLink, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { POLICY_CATEGORIES } from '@/utils/constants';
import type { PolicyDocument } from '@/types';

const mockDocuments: PolicyDocument[] = [
  {
    id: '1',
    title: 'NPS Withdrawal Rules (2024)',
    category: 'Withdrawal',
    source: 'PFRDA Circular No. 2024/03',
    summary: 'Complete guidelines on premature withdrawal, partial withdrawal, and exit rules for NPS subscribers including new provisions for tier-II accounts.',
    content: '',
    pdfUrl: '#',
    publishedDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'Tax Benefits under NPS',
    category: 'Tax',
    source: 'Income Tax Act, Section 80CCD',
    summary: 'Detailed explanation of tax deductions available under Section 80CCD(1), 80CCD(1B), and 80CCD(2) for NPS contributions.',
    content: '',
    pdfUrl: '#',
    publishedDate: '2023-12-01',
  },
  {
    id: '3',
    title: 'UPS vs NPS: Comparison Guide',
    category: 'NPS',
    source: 'Ministry of Finance Notification',
    summary: 'Key differences between Unified Pension Scheme and National Pension System for government employees.',
    content: '',
    pdfUrl: '#',
    publishedDate: '2024-02-20',
  },
  {
    id: '4',
    title: 'NPS Fund Manager Performance',
    category: 'Regulations',
    source: 'PFRDA Annual Report',
    summary: 'Performance comparison of all 7 NPS fund managers across different asset classes and schemes.',
    content: '',
    pdfUrl: '#',
    publishedDate: '2024-03-01',
  },
  {
    id: '5',
    title: 'Annuity Service Provider Guidelines',
    category: 'Annuity',
    source: 'PFRDA Circular No. 2023/18',
    summary: 'Guidelines for selecting annuity service providers and available annuity options under NPS.',
    content: '',
    pdfUrl: '#',
    publishedDate: '2023-09-10',
  },
  {
    id: '6',
    title: 'NPS Tier-II Account Operations',
    category: 'NPS',
    source: 'PFRDA Circular No. 2024/01',
    summary: 'Operational guidelines for Tier-II accounts including withdrawal procedures and tax implications.',
    content: '',
    pdfUrl: '#',
    publishedDate: '2024-01-05',
  },
];

export function PolicyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [documents] = useState<PolicyDocument[]>(mockDocuments);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'NPS': 'bg-blue-100 text-blue-700',
      'UPS': 'bg-purple-100 text-purple-700',
      'Tax': 'bg-emerald-100 text-emerald-700',
      'Withdrawal': 'bg-amber-100 text-amber-700',
      'Annuity': 'bg-pink-100 text-pink-700',
      'Regulations': 'bg-gray-100 text-gray-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Policy Knowledge Base</h2>
          <p className="text-sm text-gray-500">Search pension rules, circulars, and regulatory guidelines</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pension rules, circulars, and guidelines..."
              className="pl-10 py-6 text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {POLICY_CATEGORIES.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className={getCategoryColor(doc.category)}>
                      {doc.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{doc.source}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{doc.summary}</p>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400">
                      Published: {new Date(doc.publishedDate).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Read
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-sm text-gray-500">
                Try adjusting your search terms or category filter
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Connected to RAG */}
      <div className="flex items-center justify-center gap-2 p-4 bg-blue-50 rounded-lg">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-sm text-blue-700">
          Connected to RAG Knowledge Base with real-time policy updates
        </span>
        <ExternalLink className="w-4 h-4 text-blue-600" />
      </div>
    </div>
  );
}
