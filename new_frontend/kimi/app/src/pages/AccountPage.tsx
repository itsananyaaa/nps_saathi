import { useState } from 'react';
import { User, Camera, Save, Mail, Phone, Briefcase, Wallet, TrendingUp, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { OCCUPATIONS, RISK_LEVELS } from '@/utils/constants';
// formatCurrency utility imported for future use

export function AccountPage() {
  const [profile, setProfile] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    age: 32,
    occupation: 'Private Sector Employee',
    monthlyIncome: 80000,
    monthlyContribution: 15000,
    currentCorpus: 350000,
    expectedReturn: 10,
    retirementAge: 60,
    riskAppetite: 'moderate',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    monthlySummary: true,
    whatsappAlerts: false,
    aiInsights: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile saved successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-sm text-gray-500">Manage your profile and preferences</p>
        </div>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {profile.phone}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              Personal Details
            </h3>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Select 
                value={profile.occupation} 
                onValueChange={(value) => setProfile({ ...profile, occupation: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OCCUPATIONS.map((occ) => (
                    <SelectItem key={occ} value={occ}>{occ}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retirementAge">Retirement Age</Label>
              <Input
                id="retirementAge"
                type="number"
                value={profile.retirementAge}
                onChange={(e) => setProfile({ ...profile, retirementAge: parseInt(e.target.value) || 0 })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Financial Details */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-gray-400" />
              Financial Details
            </h3>

            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Monthly Income</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={profile.monthlyIncome}
                  onChange={(e) => setProfile({ ...profile, monthlyIncome: parseInt(e.target.value) || 0 })}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <Input
                  id="monthlyContribution"
                  type="number"
                  value={profile.monthlyContribution}
                  onChange={(e) => setProfile({ ...profile, monthlyContribution: parseInt(e.target.value) || 0 })}
                  className="pl-8"
                />
              </div>
              <p className="text-xs text-gray-500">
                {Math.round((profile.monthlyContribution / profile.monthlyIncome) * 100)}% of monthly income
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentCorpus">Current NPS Corpus</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <Input
                  id="currentCorpus"
                  type="number"
                  value={profile.currentCorpus}
                  onChange={(e) => setProfile({ ...profile, currentCorpus: parseInt(e.target.value) || 0 })}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Expected Return: {profile.expectedReturn}%</Label>
              <Slider
                value={[profile.expectedReturn]}
                onValueChange={([value]) => setProfile({ ...profile, expectedReturn: value })}
                min={5}
                max={15}
                step={0.5}
              />
            </div>

            <div className="space-y-2">
              <Label>Risk Appetite</Label>
              <Select 
                value={profile.riskAppetite} 
                onValueChange={(value) => setProfile({ ...profile, riskAppetite: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RISK_LEVELS.map((risk) => (
                    <SelectItem key={risk.value} value={risk.value}>{risk.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preferences */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            Preferences
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive market updates and alerts</p>
                </div>
              </div>
              <Switch
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between py-2 border-t">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">Monthly Summary</p>
                  <p className="text-sm text-gray-500">Get monthly retirement summary</p>
                </div>
              </div>
              <Switch
                checked={preferences.monthlySummary}
                onCheckedChange={(checked) => setPreferences({ ...preferences, monthlySummary: checked })}
              />
            </div>

            <div className="flex items-center justify-between py-2 border-t">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">WhatsApp Alerts</p>
                  <p className="text-sm text-gray-500">Contribution reminders on WhatsApp</p>
                </div>
              </div>
              <Switch
                checked={preferences.whatsappAlerts}
                onCheckedChange={(checked) => setPreferences({ ...preferences, whatsappAlerts: checked })}
              />
            </div>

            <div className="flex items-center justify-between py-2 border-t">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">AI-Powered Insights</p>
                  <p className="text-sm text-gray-500">Personalized recommendations from AI</p>
                </div>
              </div>
              <Switch
                checked={preferences.aiInsights}
                onCheckedChange={(checked) => setPreferences({ ...preferences, aiInsights: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="px-8"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Info Note */}
      <div className="p-4 bg-blue-50 rounded-lg flex items-start gap-3">
        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-white text-xs font-bold">i</span>
        </div>
        <p className="text-sm text-blue-700">
          These values are used by the forecasting and simulation engines to provide personalized recommendations. 
          Keep them updated for accurate projections.
        </p>
      </div>
    </div>
  );
}
