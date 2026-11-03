import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, Briefcase, Calendar, CheckCircle2, ChevronRight, ExternalLink, MapPin } from 'lucide-react';
import { EXPERIENCE_DATA, PROFILE_DATA } from '../data/portfolioData';
import { Language, PageId } from '../types';

interface ExperiencePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({
  lang,
  onNavigate,
}) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16 ${isFa ? 'text-right' : 'text-left'}`}>
      {/* 1. PAGE HEADER */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs font-bold font-display uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>{lang === 'en' ? 'Professional Track Record' : 'سوابق و مسیر حرفه‌ای'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
          {lang === 'en'
            ? 'Experience & Organizations'
            : 'سوابق کاری، مجموعه‌ها و پروژه‌های شاخص'}
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-medium">
          {lang === 'en'
            ? 'A decade of creative leadership, art direction, and packaging architecture across commercial transportation, heavy industrial suppliers, FMCG food, and prestige cosmetics.'
            : 'بیش از ۱۰ سال سابقه در هدایت هنری، طراحی سیستم‌های هویت سازمانی، معماری بسته‌بندی و ارتباطات بصری صنعتی در مجموعه‌های تولیدی، صنایع سنگین و برندهای مصرفی.'}
        </p>
      </div>

      {/* 2. QUANTITATIVE IMPACT BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-8 bg-neutral-950 text-white rounded-2xl sm:rounded-3xl">
        <div className="space-y-1">
          <span className="text-2xl sm:text-3xl font-black font-display text-amber-400">
            10+
          </span>
          <span className="text-xs text-neutral-300 font-bold block">
            {lang === 'en' ? 'Years Design Practice' : 'سال فعالیت تخصصی دیزاین'}
          </span>
        </div>
        <div className="space-y-1">
          <span className="text-2xl sm:text-3xl font-black font-display text-emerald-400">
            310K+
          </span>
          <span className="text-xs text-neutral-300 font-bold block">
            {lang === 'en' ? 'Organic Video Impressions' : 'بازدید ارگانیک ویدئوی محصول'}
          </span>
        </div>
        <div className="space-y-1">
          <span className="text-2xl sm:text-3xl font-black font-display text-sky-400">
            40+
          </span>
          <span className="text-xs text-neutral-300 font-bold block">
            {lang === 'en' ? 'Brand & Packaging Systems' : 'سیستم بسته‌بندی و هویت بصری'}
          </span>
        </div>
        <div className="space-y-1">
          <span className="text-2xl sm:text-3xl font-black font-display text-neutral-200">
            100%
          </span>
          <span className="text-xs text-neutral-300 font-bold block">
            {lang === 'en' ? 'Prepress Print Compliance' : 'تطابق فنی با استاندارد چاپ'}
          </span>
        </div>
      </div>

      {/* 3. CHRONOLOGICAL TIMELINE CARDS */}
      <div className="space-y-6 sm:space-y-8">
        {EXPERIENCE_DATA.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 p-5 sm:p-8 md:p-10 shadow-xs hover:shadow-lg transition-all space-y-5"
          >
            {/* Top Bar with Role & Period */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-neutral-500 font-display">
                  <span className="text-amber-600 font-black">0{idx + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.type[lang]}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-neutral-400" />
                    {item.location[lang]}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-950 tracking-tight">
                  {item.company[lang]}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="text-xs font-bold px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full font-display">
                    {item.badge}
                  </span>
                )}
                <span className="text-xs font-bold text-neutral-500 bg-neutral-50 px-3 py-1 rounded-full border border-neutral-200/60 font-display">
                  {item.period[lang]}
                </span>
              </div>
            </div>

            {/* Role Title */}
            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-black text-neutral-900">
                {item.role[lang]}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed font-medium">
                {item.summary[lang]}
              </p>
            </div>

            {/* Quantified Accomplishments */}
            <div className="space-y-2.5 pt-1">
              <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider block">
                {lang === 'en' ? 'Key Deliverables & Responsibilities' : 'مسئولیت‌ها و دستاوردهای کلیدی'}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {item.highlights[lang].map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-100/80 flex items-start gap-2.5 text-xs font-bold text-neutral-800 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. VERIFIED PLATFORMS & SOCIAL CONNECTIVITY */}
      <section className="bg-neutral-50 rounded-2xl sm:rounded-3xl border border-neutral-200/80 p-6 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider block">
            {lang === 'en' ? 'Professional Footprint' : 'پروفایل‌های رسمی و رزومه'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-950">
            {lang === 'en' ? 'Connect on Verified Platforms' : 'ارتباط در پلتفرم‌های تخصصی'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
            {lang === 'en'
              ? 'Find full case studies, motion reels, client testimonials, and professional endorsements on LinkedIn and Behance under the handle @saeedjabbari.'
              : 'مشاهده سوابق تکمیلی، ویدئوها، موشن‌گرافیک‌ها و رضایت‌نامه‌های کارفرمایان در لینکدین و بیهنس با آیدی saeedjabbari.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          <a
            href={PROFILE_DATA.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl border border-neutral-200/80 hover:border-neutral-400 transition-all flex items-center justify-between group shadow-2xs"
          >
            <div>
              <span className="text-xs text-neutral-500 font-medium block">
                LinkedIn Profile
              </span>
              <span className="text-sm sm:text-base font-black text-neutral-950 group-hover:text-amber-600 transition-colors font-display">
                /in/saeedjabbari
              </span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href={PROFILE_DATA.links.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl border border-neutral-200/80 hover:border-neutral-400 transition-all flex items-center justify-between group shadow-2xs"
          >
            <div>
              <span className="text-xs text-neutral-500 font-medium block">
                Behance Portfolio
              </span>
              <span className="text-sm sm:text-base font-black text-neutral-950 group-hover:text-amber-600 transition-colors font-display">
                behance.net/saeedjabbari
              </span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>
      </section>

      {/* 5. BOTTOM NAVIGATION CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 bg-neutral-950 text-white rounded-2xl sm:rounded-3xl">
        <div className="space-y-1 text-center sm:text-right">
          <h3 className="text-lg font-black text-white">
            {lang === 'en' ? 'Interested in Working Together?' : 'علاقه‌مند به همکاری و شروع پروژه هستید؟'}
          </h3>
          <p className="text-xs text-neutral-400 font-medium">
            {lang === 'en'
              ? 'Reach out directly for creative direction, packaging, or brand strategy consultations.'
              : 'جهت دریافت مشاوره برای هویت بصری، بسته‌بندی یا کاتالوگ صنعتی در ارتباط باشید.'}
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="px-7 py-3.5 bg-white text-neutral-950 hover:bg-neutral-100 font-black text-sm rounded-full transition-all cursor-pointer shadow-md"
        >
          {lang === 'en' ? 'Contact Saeed Jabbari' : 'ارسال پیام و استعلام پروژه'}
        </button>
      </div>
    </div>
  );
};
