import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { Language, PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  lang: Language;
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  lang,
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; labelEn: string; labelFa: string }[] = [
    { id: 'home', labelEn: 'Home', labelFa: 'صفحه اصلی' },
    { id: 'work', labelEn: 'Selected Work', labelFa: 'پروژه‌ها' },
    { id: 'about', labelEn: 'About', labelFa: 'درباره من' },
    { id: 'experience', labelEn: 'Experience', labelFa: 'سوابق کاری' },
    { id: 'articles', labelEn: 'Articles & Research', labelFa: 'مقالات' },
    { id: 'contact', labelEn: 'Contact', labelFa: 'تماس' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFa = lang === 'fa';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className={`flex items-center gap-3 group cursor-pointer text-inherit ${isFa ? 'text-right' : 'text-left'}`}
          >
            <div className="w-10 h-10 rounded-2xl bg-neutral-950 text-white flex items-center justify-center font-black font-display text-sm tracking-tight group-hover:bg-amber-600 transition-colors shrink-0">
              SJ
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-neutral-950 group-hover:text-amber-600 transition-colors whitespace-nowrap">
                {PROFILE_DATA.name[lang]}
              </span>
              <span className="text-[10px] font-display font-medium text-neutral-500 tracking-wider uppercase whitespace-nowrap">
                {lang === 'en' ? 'Art & Creative Director' : 'مدیر هنری و خلاقیت'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs sm:text-sm font-bold text-neutral-600">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-neutral-950 text-white shadow-xs font-black'
                      : 'hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  {lang === 'en' ? item.labelEn : item.labelFa}
                </button>
              );
            })}
          </nav>

          {/* Actions & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher Button */}
            <button
              onClick={onToggleLang}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors cursor-pointer"
              title="Switch Language / تغییر زبان"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-600" />
              <span className="font-display uppercase tracking-wider">{lang === 'en' ? 'FA' : 'EN'}</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-neutral-950 hover:bg-neutral-800 rounded-full shadow-xs hover:shadow transition-all whitespace-nowrap cursor-pointer"
            >
              <span>{lang === 'en' ? 'Discuss a Project' : 'گفتگو درباره پروژه'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger (Hamburger) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-2xl text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-30 bg-white/95 backdrop-blur-xl md:hidden flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-neutral-400 block px-4 uppercase tracking-wider">
              {lang === 'en' ? 'Navigation Menu' : 'منوی ناوبری'}
            </span>
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full py-4 px-5 rounded-2xl text-base font-black flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-neutral-950 text-white'
                        : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    <span>{lang === 'en' ? item.labelEn : item.labelFa}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-70" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-100 space-y-4">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>{lang === 'en' ? 'Discuss a Project — Let’s Talk' : 'شروع همکاری — درباره یک پروژه صحبت کنیم'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
