import { useState } from 'react';
import { 
  Globe, 
  Mic, 
  User, 
  ChevronDown, 
  LogOut, 
  Settings,
  Landmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LANGUAGES } from '@/utils/constants';
import { useLanguage } from '@/context/LanguageContext';

interface HeaderProps {
  onVoiceClick: () => void;
  isVoiceActive: boolean;
  userName: string;
}

export function Header({ 
  onVoiceClick, 
  isVoiceActive,
  userName 
}: HeaderProps) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
          <Landmark className="w-6 h-6 text-white" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-bold text-gray-900">{t('npsSaathi')}</h1>
          <p className="text-xs text-gray-500 -mt-0.5">{t('aiAdvisory')}</p>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Language Selector */}
        <DropdownMenu open={isLangOpen} onOpenChange={setIsLangOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{currentLang.nativeName}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {LANGUAGES.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsLangOpen(false);
                }}
                className={language === lang.code ? 'bg-blue-50' : ''}
              >
                <span className="flex-1">{lang.nativeName}</span>
                <span className="text-gray-400 text-sm">{lang.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Voice Button */}
        <Button
          variant={isVoiceActive ? 'default' : 'ghost'}
          size="sm"
          onClick={onVoiceClick}
          className={`flex items-center gap-2 ${isVoiceActive ? 'bg-blue-600 animate-pulse' : ''}`}
        >
          <Mic className="w-4 h-4" />
          <span className="hidden md:inline">Ask Voice</span>
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden lg:inline font-medium">{userName}</span>
              <ChevronDown className="w-4 h-4 hidden lg:inline" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2">
              <p className="font-medium">{userName}</p>
              <p className="text-sm text-gray-500">rahul.sharma@email.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
