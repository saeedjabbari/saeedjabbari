import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Language, PageId, ProjectCategory, ProjectItem } from '../types';

interface WorkPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  selectedProject: ProjectItem | null;
  onSelectProject: (project: ProjectItem | null) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({
  lang,
  onNavigate,
  selectedProject,
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const categories: { id: string; labelEn: string; labelFa: string }[] = [
    { id: 'all', labelEn: 'All Work', labelFa: 'همه پروژه‌ها' },
    { id: 'brand_identity', labelEn: 'Brand Identity', labelFa: 'طراحی برند و هویت بصری' },
    { id: 'packaging', labelEn: 'Packaging & Product', labelFa: 'طراحی بسته‌بندی و محصول' },
    { id: 'industrial_b2b', labelEn: 'Industrial & B2B', labelFa: 'ارتباطات بصری صنعتی و B2B' },
    { id: 'art_direction_motion', labelEn: 'Art Direction & Motion', labelFa: 'مدیریت هنری و موشن' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  // If a project is selected, render the dedicated in-depth case study view (Section 4.C)
  if (selectedProject) {
    const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === selectedProject.id);
    const nextProject = PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length];
    const prevProject =
      PROJECTS_DATA[(currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length];

    return (
      <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16 ${isFa ? 'text-right' : 'text-left'}`}>
        {/* Top Back Action Bar */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-6">
          <button
            onClick={() => onSelectProject(null)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
          >
            <ChevronRight className={`w-4 h-4 ${isFa ? '' : 'rotate-180'}`} />
            <span>{lang === 'en' ? 'Back to All Projects' : 'بازگشت به آرشیو پروژه‌ها'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectProject(prevProject)}
              className="p-2 rounded-full border border-neutral-200 hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Previous Project"
            >
              <ChevronRight className={`w-4 h-4 ${isFa ? '' : 'rotate-180'}`} />
            </button>
            <button
              onClick={() => onSelectProject(nextProject)}
              className="p-2 rounded-full border border-neutral-200 hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Next Project"
            >
              <ChevronLeft className={`w-4 h-4 ${isFa ? '' : 'rotate-180'}`} />
            </button>
          </div>
        </div>

        {/* Case Study Header (Section 4.C Item 1 & 2) */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-neutral-500 font-display uppercase tracking-wider">
            <span className="text-amber-600">{selectedProject.categoryLabel[lang]}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedProject.client[lang]}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedProject.year}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
            {selectedProject.title[lang]}
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 font-bold">
            {selectedProject.role[lang]} · {selectedProject.industry[lang]}
          </p>
        </div>

        {/* Hero Visual Slot */}
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-16/10 bg-neutral-900 border border-neutral-200/80 shadow-xl">
          <img
            src={selectedProject.heroImage}
            alt={selectedProject.title[lang]}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Narrative Flow (Section 4.C Items 3 to 7) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8 space-y-12">
            {/* 3. Context & Challenge (زمینه و مسئله) */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-600 font-display uppercase tracking-wider block">
                01. {lang === 'en' ? 'Context & Problem Definition' : 'زمینه و صورت مسئله'}
              </span>
              <h2 className="text-2xl font-black text-neutral-950">
                {lang === 'en' ? 'The Business Context' : 'بستر تجاری و چالش پروژه'}
              </h2>
              <p className="text-base text-neutral-700 leading-relaxed font-medium">
                {selectedProject.context[lang]}
              </p>
            </div>

            {/* 4. Creative Direction (جهت‌گیری خلاقانه) */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-600 font-display uppercase tracking-wider block">
                02. {lang === 'en' ? 'Strategic Creative Direction' : 'جهت‌گیری خلاقانه'}
              </span>
              <h2 className="text-2xl font-black text-neutral-950">
                {lang === 'en' ? 'The Creative Concept' : 'ایده اصلی و رویکرد بصری'}
              </h2>
              <p className="text-base text-neutral-700 leading-relaxed font-medium">
                {selectedProject.creativeDirection[lang]}
              </p>
            </div>

            {/* 5. Design Development (فرآیند توسعه طراحی) */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-600 font-display uppercase tracking-wider block">
                03. {lang === 'en' ? 'Design Development' : 'فرآیند توسعه طراحی'}
              </span>
              <h2 className="text-2xl font-black text-neutral-950">
                {lang === 'en' ? 'Execution & System Components' : 'تصمیم‌های کلیدی و اجزای سیستم'}
              </h2>
              <p className="text-base text-neutral-700 leading-relaxed font-medium">
                {selectedProject.designDevelopment[lang]}
              </p>
            </div>

            {/* 6. Deliverables (خروجی‌های نهایی) */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-600 font-display uppercase tracking-wider block">
                04. {lang === 'en' ? 'Delivered Assets' : 'خروجی‌های نهایی پروژه'}
              </span>
              <h2 className="text-2xl font-black text-neutral-950">
                {lang === 'en' ? 'Key Deliverables' : 'اقلام پیاده‌سازی شده'}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {selectedProject.deliverables[lang].map((item, idx) => (
                  <li
                    key={idx}
                    className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-start gap-3 text-xs sm:text-sm font-bold text-neutral-800"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 7. Real-world Impact (کاربردها و نتایج) */}
            <div className="p-6 sm:p-8 bg-neutral-950 text-white rounded-xl sm:rounded-2xl space-y-4">
              <span className="text-xs font-bold text-amber-400 font-display uppercase tracking-wider block">
                {lang === 'en' ? 'Commercial Application & Results' : 'کاربردها و نتایج واقعی'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {lang === 'en' ? 'Outcomes & Business Impact' : 'اثرگذاری در بازار و نتایج ثبت‌شده'}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-medium">
                {selectedProject.outcomesAndImpact[lang]}
              </p>
              {selectedProject.stats && (
                <div className="pt-3 border-t border-white/10 flex items-center gap-3">
                  <div className="text-2xl font-black font-display text-emerald-400">
                    {selectedProject.stats.value}
                  </div>
                  <div className="text-xs text-neutral-400 font-medium">
                    {selectedProject.stats.label[lang]}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Metadata (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-neutral-50 border border-neutral-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 space-y-5 text-xs">
              <span className="font-bold text-neutral-400 font-display uppercase tracking-wider block">
                {lang === 'en' ? 'Project Credits' : 'اعتبارات و عوامل پروژه'}
              </span>
              <p className="font-bold text-neutral-800 leading-relaxed">
                {selectedProject.credits[lang]}
              </p>

              <div className="pt-4 border-t border-neutral-200/80 space-y-2">
                <span className="font-bold text-neutral-400 block font-display uppercase tracking-wider">
                  {lang === 'en' ? 'Industry' : 'صنعت'}
                </span>
                <span className="font-bold text-neutral-900 block">
                  {selectedProject.industry[lang]}
                </span>
              </div>

              <div className="pt-4 border-t border-neutral-200/80 space-y-2">
                <span className="font-bold text-neutral-400 block font-display uppercase tracking-wider">
                  {lang === 'en' ? 'Timeline' : 'سال پروژه'}
                </span>
                <span className="font-bold text-neutral-900 block font-display">
                  {selectedProject.year}
                </span>
              </div>

              <div className="pt-4 border-t border-neutral-200/80">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white font-black rounded-xl sm:rounded-2xl shadow-sm transition-all cursor-pointer text-xs"
                >
                  {lang === 'en' ? 'Inquire for Similar Project' : 'استعلام برای پروژه مشابه'}
                </button>
              </div>
            </div>

            {/* Next Project Card (Item 9) */}
            <div
              onClick={() => onSelectProject(nextProject)}
              className="bg-white border border-neutral-200/80 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs text-neutral-400 font-bold uppercase tracking-wider">
                <span>{lang === 'en' ? 'Next Project' : 'پروژه بعدی'}</span>
                <ArrowIcon className="w-4 h-4 text-neutral-950 group-hover:translate-x-1 transition-transform" />
              </div>
              <h4 className="text-base font-black text-neutral-950 group-hover:text-amber-600 transition-colors">
                {nextProject.title[lang]}
              </h4>
              <span className="text-xs text-neutral-500 font-medium block">
                {nextProject.categoryLabel[lang]}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Gallery View
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12 ${isFa ? 'text-right' : 'text-left'}`}>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs font-bold font-display uppercase tracking-wider">
            <span>{lang === 'en' ? 'Portfolio Archive' : 'آرشیو آثار منتخب'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight">
            {lang === 'en' ? 'Selected Work & Case Studies' : 'پروژه‌های شاخص و مطالعات موردی'}
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed font-medium">
            {lang === 'en'
              ? 'A curated selection of brand identity systems, consumer packaging architectures, and industrial visual communications.'
              : 'گزیده‌ای از سیستم‌های هویت بصری، معماری بسته‌بندی کالاهای مصرفی و ارتباطات بصری صنعتی.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-100 rounded-2xl max-w-fit">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-neutral-950 text-white shadow-xs font-black'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {lang === 'en' ? cat.labelEn : cat.labelFa}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="group bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-2xl hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div className="relative aspect-16/11 bg-neutral-100 overflow-hidden">
              <img
                src={project.heroImage}
                alt={project.title[lang]}
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-950 shadow-sm group-hover:bg-neutral-950 group-hover:text-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] text-white/80 font-medium">
                  {project.categoryLabel[lang]} · {project.year}
                </span>
                <h3 className="text-base sm:text-lg font-black text-white mt-1">
                  {project.title[lang]}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-neutral-900 block">
                  {project.client[lang]}
                </span>
                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed font-medium">
                  {project.context[lang]}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                {project.stats ? (
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-display">
                    {project.stats.value}
                  </span>
                ) : (
                  <span className="text-neutral-500 font-medium">
                    {project.industry[lang]}
                  </span>
                )}
                <span className="font-bold text-neutral-950 group-hover:text-amber-600 transition-colors">
                  {lang === 'en' ? 'Explore Case Study →' : 'بررسی مطالعه موردی ←'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
