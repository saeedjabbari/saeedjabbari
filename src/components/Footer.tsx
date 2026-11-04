import { ArrowUp, ArrowUpRight, ExternalLink, Globe, Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { Language, PageId } from '../types';

interface FooterProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onToggleLang: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onNavigate,
  onToggleLang,
}) => {
  const isFa = lang === 'fa';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: PageId; labelEn: string; labelFa: string }[] = [
    { id: 'home', labelEn: 'Home', labelFa: 'صفحه اصلی' },
    { id: 'work', labelEn: 'Selected Work', labelFa: 'پروژه‌های شاخص' },
    { id: 'about', labelEn: 'About & Philosophy', labelFa: 'درباره من و رویکرد طراحی' },
    { id: 'experience', labelEn: 'Experience & Career', labelFa: 'سوابق و مجموعه‌ها' },
    { id: 'articles', labelEn: 'Articles & Research', labelFa: 'مقالات و پژوهش‌ها' },
    { id: 'contact', labelEn: 'Contact & Inquiries', labelFa: 'تماس و مشاوره' },
  ];

  return (
    <footer className={`border-t border-neutral-200/80 bg-white text-neutral-900 pt-16 pb-12 ${isFa ? 'text-right' : 'text-left'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1: Wordmark & Bio (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-neutral-950 text-white font-black font-display flex items-center justify-center text-sm">
                SJ
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-neutral-950 font-display">
                  {PROFILE_DATA.name[lang]}
                </span>
                <span className="text-[11px] font-display font-medium text-neutral-500 uppercase tracking-wider">
                  {lang === 'en' ? 'Art & Creative Director' : 'مدیر هنری و خلاقیت'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md font-medium">
              {PROFILE_DATA.shortBio[lang]}
            </p>

            {/* Fast Action Icons (Phone, WhatsApp, Telegram, Email, LinkedIn, Behance) */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-bold text-neutral-800">
              <a
                href={`tel:${PROFILE_DATA.links.phone}`}
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-amber-500 hover:text-neutral-950 flex items-center justify-center transition-all cursor-pointer shadow-2xs group"
                title={lang === 'en' ? 'Direct Phone Call' : 'تماس تلفنی'}
                aria-label="Direct Phone Call"
              >
                <Phone className="w-4 h-4 text-neutral-700 group-hover:text-neutral-950" />
              </a>
              <a
                href={PROFILE_DATA.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs group"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-neutral-700 group-hover:text-white" />
              </a>
              <a
                href={PROFILE_DATA.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-sky-500 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs group"
                title="Telegram"
                aria-label="Telegram"
              >
                <Send className="w-3.5 h-3.5 text-neutral-700 group-hover:text-white" />
              </a>
              <a
                href={`mailto:${PROFILE_DATA.links.email}`}
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs group"
                title={PROFILE_DATA.links.email}
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-neutral-700 group-hover:text-white" />
              </a>
              <a
                href={PROFILE_DATA.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors text-xs font-bold"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <a
                href={PROFILE_DATA.links.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors text-xs font-bold"
              >
                <span>Behance</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Pages (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider block">
              {lang === 'en' ? 'Navigation' : 'بخش‌های سایت'}
            </span>
            <ul className="space-y-2 text-xs sm:text-sm font-bold text-neutral-700">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? link.labelEn : link.labelFa}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Focus Domains (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider block">
              {lang === 'en' ? 'Core Sectors' : 'صنایع تمرکز'}
            </span>
            <ul className="space-y-2 text-xs font-medium text-neutral-600">
              <li>{lang === 'en' ? 'B2B & Industrial Machinery' : 'صنایع سنگین و ماشین‌آلات'}</li>
              <li>{lang === 'en' ? 'Commercial Trailers & Axles' : 'تریلرهای تجاری و قطعات'}</li>
              <li>{lang === 'en' ? 'FMCG Food & Retail Packaging' : 'بسته‌بندی کالاهای مصرفی'}</li>
              <li>{lang === 'en' ? 'Prestige Skincare & Cosmetics' : 'محصولات پوستی و زیبایی'}</li>
            </ul>
          </div>

          {/* Col 4: Direct Action & Language Switch (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider block">
              {lang === 'en' ? 'Quick Contact' : 'ارتباط سریع'}
            </span>
            <div className="space-y-2.5 text-xs font-bold">
              <a
                href={`tel:${PROFILE_DATA.links.phone}`}
                className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-full transition-colors text-center inline-flex items-center justify-center gap-2 font-display text-xs tracking-tight"
                title={lang === 'en' ? 'Call Directly' : 'برقراری تماس مستقیم'}
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'en' ? 'Direct Call' : 'تماس مستقیم'}</span>
              </a>
              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-full transition-colors cursor-pointer text-center block"
              >
                {lang === 'en' ? 'Start a Project' : 'شروع همکاری'}
              </button>

              <button
                onClick={onToggleLang}
                className="w-full py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-full transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-neutral-500" />
                <span>{lang === 'en' ? 'Switch to Persian' : 'تغییر به زبان انگلیسی'}</span>
              </button>

              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-950 pt-2 cursor-pointer font-bold"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Back to top' : 'بازگشت به بالا'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-medium">
          <p>
            © {new Date().getFullYear()} {PROFILE_DATA.name[lang]} · Art Direction & Brand Architecture.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-display">
              Verified: linkedin.com/in/saeedjabbari · behance.net/saeedjabbari
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
