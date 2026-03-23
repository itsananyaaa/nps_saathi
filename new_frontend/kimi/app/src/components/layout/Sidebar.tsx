import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  Calculator,
  TrendingUp,
  Lightbulb,
  BookOpen,
  User,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NAV_ITEMS } from '@/utils/constants';
import { useLanguage } from '@/context/LanguageContext';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Bot,
  Calculator,
  TrendingUp,
  Lightbulb,
  BookOpen,
  User,
};

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const getNavLabel = (label: string) => {
    switch(label) {
      case 'Dashboard': return t('dashboard');
      case 'AI Assistant': return t('aiAssistant');
      case 'Pension Simulator': return t('simulatorKey');
      case 'Retirement Forecast': return t('forecastKey');
      case 'Investment Advice': return t('adviceKey');
      case 'Policy Knowledge': return t('policyKey');
      case 'Account': return t('account');
      default: return label;
    }
  };

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Mobile Close Button */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b">
        <span className="font-bold text-lg">Menu</span>
        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon];
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-colors duration-200
                ${active 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-blue-700' : 'text-gray-400'}`} />
              <span className={`${!isOpen && 'hidden lg:hidden'} lg:inline`}>{getNavLabel(item.label)}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
            text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <HelpCircle className="w-5 h-5 text-gray-400" />
          <span className={`${!isOpen && 'hidden lg:hidden'} lg:inline`}>Help & Support</span>
        </button>
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
            text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          <span className={`${!isOpen && 'hidden lg:hidden'} lg:inline`}>{t('logout')}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="fixed bottom-4 right-4 z-50 bg-white shadow-lg">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200
          transition-all duration-300 z-40
          ${isOpen ? 'w-64' : 'w-20'}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Toggle Button */}
          <div className="p-2 border-b border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="w-full flex items-center justify-center"
            >
              <Menu className="w-4 h-4" />
              {isOpen && <span className="ml-2">Collapse</span>}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = iconMap[item.icon];
              const active = isActive(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium
                    transition-colors duration-200
                    ${active 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  title={!isOpen ? item.label : undefined}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-blue-700' : 'text-gray-400'}`} />
                  {isOpen && <span>{getNavLabel(item.label)}</span>}
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-2 border-t border-gray-200 space-y-1">
            <button
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium
                text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              title={!isOpen ? 'Help & Support' : undefined}
            >
              <HelpCircle className="w-5 h-5 text-gray-400" />
              {isOpen && <span>Help</span>}
            </button>
            <button
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium
                text-red-600 hover:bg-red-50 transition-colors"
              title={!isOpen ? 'Logout' : undefined}
            >
              <LogOut className="w-5 h-5 text-red-500" />
              {isOpen && <span>{t('logout')}</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
