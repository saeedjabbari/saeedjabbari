import { ArrowLeft, ArrowUpRight, ArrowRight, Layers, Sparkles, Building2, Package, Compass, CheckCircle2, Award, ExternalLink, BookOpen, Clock, Phone, MessageCircle, Send } from 'lucide-react';
import { PROFILE_DATA, PROJECTS_DATA, AREAS_OF_EXPERTISE, EXPERIENCE_DATA } from '../data/portfolioData';
import { ARTICLES_DATA } from '../data/articlesData';
import { ArticleItem, Language, PageId, ProjectItem } from '../types';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectArticle?: (article: ArticleItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
  onSelectProject,
  onSelectArticle,
}) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  return (
    <div className={`space-y-24 md:space-y-32 pb-24 ${isFa ? 'text-right' : 'text-left'}`}>
      {/* 1. HERO SECTION (High-Impact Editorial Art Direction) */}
      <section className="relative pt-8 pb-12 md:pt-16 md:pb-20 overflow-hidden">
        {/* Ambient subtle light wash */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-neutral-200/50 rounded-full blur-[140px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Copy Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Service Offering Kicker */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs font-bold font-display tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <span>{lang === 'en' ? 'Design Services & Studio Solutions' : 'ارائه خدمات تخصصی دیزاین و برندینگ'}</span>
              </div>

              {/* Main Service Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-neutral-950 tracking-tight leading-[1.14]">
                  {lang === 'en'
                    ? 'Brand Identity Systems, Packaging Engineering & Product Communication'
                    : 'طراحی سیستم‌های هویت بصری، مهندسی بسته‌بندی و ارتباطات برند'}
                </h1>
                <p className="text-sm sm:text-base font-bold text-indigo-950 font-display">
                  {lang === 'en'
                    ? 'Creative Direction & Visual Systems by Saeed Jabbari · Art & Creative Director'
                    : 'راهکارهای یکپارچه دیزاین، هویت سازمانی، ساختار بسته‌بندی و کاتالوگ صنعتی — سعید جباری (مدیر هنری و خلاقیت)'}
                </p>
              </div>

              {/* Tagline & Subtext */}
              <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed max-w-2xl">
                {lang === 'en'
                  ? 'We design authoritative brand identities, retail packaging dielines, photorealistic 3D product visualizations, and comprehensive industrial publications that command attention and drive commercial market success.'
                  : 'خلق نشان‌های تجاری معتبر، سیستم‌های هویت بصری، مهندسی خطوط تیغ و جعبه‌های بسته‌بندی، تصویرسازی سه‌بعدی محصولات و کاتالوگ‌های جامع مهندسی با رویکردی ساختارمند و خروجی چاپی و دیجیتال بی‌نقص.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('work')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-black text-white bg-neutral-950 hover:bg-neutral-800 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>{lang === 'en' ? 'View Selected Work' : 'مشاهده پروژه‌های منتخب'}</span>
                  <ArrowIcon className="w-4 h-4 text-amber-400" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-bold text-neutral-800 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-full transition-all cursor-pointer shadow-2xs"
                >
                  <span>{lang === 'en' ? 'Discuss a Project' : 'ارتباط و شروع همکاری'}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-neutral-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-bold text-neutral-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>{lang === 'en' ? '10+ Years Design Experience' : '۱۰+ سال تجربه دیزاین تخصصی'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>{lang === 'en' ? 'Consumer, FMCG & Industrial' : 'برندهای مصرفی، FMCG و صنعتی'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>{lang === 'en' ? 'Civil Engineering Background' : 'پیشینه مهندسی عمران'}</span>
                </div>
              </div>
            </div>

            {/* Visual Hero Showcase (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative bg-white border border-neutral-200/80 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-xl shadow-neutral-200/60 group">
                <div className="relative aspect-4/5 rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950">
                  <img
                    src="/assets/aistudio/__Take_control_of_your_money__shape_your_future__1a829075.jpg"
                    alt="Saeed Jabbari Selected Visual Work"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white text-right">
                    <span className="text-[11px] text-amber-400 font-bold font-display uppercase tracking-wider">
                      Featured Case Study
                    </span>
                    <h3 className="text-base sm:text-xl font-black text-white mt-1">
                      {lang === 'en' ? 'Packaging & Brand Architecture' : 'معماری بسته‌بندی و هویت بصری'}
                    </h3>
                    <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                      {lang === 'en'
                        ? 'Strategic shelf presence and luxury tactile finishes for consumer goods.'
                        : 'خلق حضور متمایز در قفسه و فینیشینگ‌های لوکس برای محصولات مصرفی.'}
                    </p>
                  </div>
                </div>

                {/* Floating summary bar */}
                <div className="mt-3.5 p-3.5 sm:p-4 bg-neutral-50 rounded-xl sm:rounded-2xl flex items-center justify-between">
                  <div className="text-right">
                    <span className="text-xs font-black text-neutral-900 block font-display">
                      Saeed Jabbari Portfolio
                    </span>
                    <span className="text-[11px] text-neutral-500 font-medium block">
                      {lang === 'en' ? 'Visual Identity · Packaging · B2B' : 'هویت بصری · بسته‌بندی · سیستم‌های B2B'}
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigate('work')}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SELECTED PROJECTS (5 Flagship Case Studies) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider">
              {lang === 'en' ? 'Selected Case Studies' : 'پروژه‌های منتخب'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight">
              {lang === 'en' ? 'Featured Work & Projects' : 'گزیده‌ای از سوابق و پروژه‌های شاخص'}
            </h2>
          </div>

          <button
            onClick={() => onNavigate('work')}
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <span>{lang === 'en' ? 'View All Projects Archive' : 'مشاهده تمامی پروژه‌ها و آرشیو'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROJECTS_DATA.slice(0, 6).map((project) => (
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
      </section>

      {/* 3. AREAS OF EXPERTISE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider">
            {lang === 'en' ? 'Capabilities' : 'حوزه‌های تخصصی'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight">
            {lang === 'en' ? 'Core Fields of Practice' : 'حوزه‌های اصلی تخصص و هدایت هنری'}
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed font-medium">
            {lang === 'en'
              ? 'Combining creative leadership, engineering precision, and market psychology to build coherent brand ecosystems.'
              : 'تلفیق هدایت خلاقانه، دقت مهندسی و شناخت رفتار بازار جهت خلق سیستم‌های یکپارچه و اثربخش برند.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AREAS_OF_EXPERTISE.map((area, idx) => (
            <div
              key={area.id}
              className="bg-white rounded-xl sm:rounded-2xl border border-neutral-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center font-display font-black text-xs text-neutral-900">
                  0{idx + 1}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-black text-neutral-900">
                  {area.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                  {area.description[lang]}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex flex-wrap gap-1.5">
                {area.skills[lang].map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[11px] font-medium text-neutral-700 bg-neutral-100 px-2.5 py-0.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SHORT INTRO & CIVIL ENGINEERING BACKGROUND STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-950 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 space-y-8 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-amber-400 font-display uppercase tracking-widest">
              {lang === 'en' ? 'Background & Perspective' : 'رویکرد و تمایز حرفه‌ای'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug">
              {lang === 'en'
                ? 'Engineering Rigor Meets Aesthetic Vision'
                : 'پیوند دقت مهندسی با بینش زیبایی‌شناختی'}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-medium">
              {lang === 'en'
                ? 'With an academic foundation in Civil Engineering and over a decade of creative experience, I approach design not as mere decoration, but as structured problem-solving. This background enables me to deeply understand technical industrial products, production constraints, and complex B2B sales dynamics.'
                : 'با پیشینه تحصیلی در مهندسی عمران و بیش از ۱۰ سال سابقه در حوزه طراحی، رویکرد من به دیزاین نه صرفاً یک تزیین بصری، بلکه فرآیندی ساختارمند برای حل مسئله است. این پیشینه به من امکان می‌دهد ساختار محصولات فنی، محدودیت‌های خطوط تولید صنعتی و دینامیک‌های پیچیده فروش B2B را به درستی درک کنم.'}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-neutral-950 hover:bg-neutral-100 font-bold text-sm rounded-full transition-all cursor-pointer shadow-sm"
            >
              <span>{lang === 'en' ? 'Read More About My Background' : 'مطالعه بیشتر درباره من و سوابق'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('experience')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-full border border-white/20 transition-all cursor-pointer"
            >
              <span>{lang === 'en' ? 'View Career Track' : 'مشاهده سوابق کاری و شرکت‌ها'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. SELECTED EXPERIENCE STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider">
              {lang === 'en' ? 'Career Highlights' : 'سوابق کاری منتخب'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              {lang === 'en' ? 'Selected Organizations & Roles' : 'مجموعه‌ها و نقش‌های کلیدی'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('experience')}
            className="text-xs sm:text-sm font-bold text-neutral-900 hover:text-amber-600 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>{lang === 'en' ? 'View Full Career Timeline' : 'مشاهده سوابق کامل کاری'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXPERIENCE_DATA.slice(0, 4).map((exp) => (
            <div
              key={exp.id}
              onClick={() => onNavigate('experience')}
              className="bg-white rounded-xl sm:rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-3 cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs text-neutral-400 font-display">
                <span>{exp.period[lang]}</span>
                {exp.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800">
                    {exp.badge}
                  </span>
                )}
              </div>
              <h3 className="text-base font-black text-neutral-950 group-hover:text-amber-600 transition-colors">
                {exp.company[lang]}
              </h3>
              <p className="text-xs font-bold text-neutral-500">
                {exp.role[lang]}
              </p>
              <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed font-medium pt-1 border-t border-neutral-100">
                {exp.summary[lang]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5.5 FEATURED ARTICLES & RESEARCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider">
              {lang === 'en' ? 'Knowledge & Engineering Insights' : 'یادداشت‌ها و پژوهش‌های تحلیلی'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              {lang === 'en' ? 'Articles & Technical Field Notes' : 'مقالات و پژوهش‌های دیزاین'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('articles')}
            className="text-xs sm:text-sm font-bold text-neutral-900 hover:text-amber-600 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>{lang === 'en' ? 'Explore All Articles' : 'مشاهده همه مقالات و پژوهش‌ها'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES_DATA.slice(0, 3).map((article) => (
            <article
              key={article.id}
              onClick={() => {
                if (onSelectArticle) {
                  onSelectArticle(article);
                } else {
                  onNavigate('articles');
                }
              }}
              className="bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-400 transition-all shadow-xs hover:shadow-md overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="aspect-16/10 overflow-hidden bg-neutral-100 relative">
                  <img
                    src={article.coverImage}
                    alt={article.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-neutral-950/80 backdrop-blur-md text-white text-[11px] font-bold rounded-full">
                      {article.categoryLabel[lang]}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-500">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{article.readTime[lang]}</span>
                    <span>•</span>
                    <span>{article.publishedDate[lang]}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-neutral-950 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                    {article.title[lang]}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed font-medium">
                    {article.subtitle[lang]}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 border-t border-neutral-100 mt-2 flex items-center justify-between">
                <span className="text-xs font-black text-neutral-900 group-hover:text-amber-600 transition-colors inline-flex items-center gap-1.5">
                  <span>{lang === 'en' ? 'Read Analysis' : 'مطالعه یادداشت'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] font-bold text-neutral-400">
                  #{article.tags[lang][0]}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION / CONNECT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-400 font-display uppercase tracking-widest">
              {lang === 'en' ? 'Collaboration & Inquiries' : 'همکاری و استعلام پروژه'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {lang === 'en' ? 'Let’s Discuss Your Next Project' : 'درباره پروژه بعدی شما صحبت کنیم'}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-medium">
              {lang === 'en'
                ? 'Whether you are launching a consumer brand, engineering packaging systems, or transforming B2B communications — I am available for select creative direction and design collaborations.'
                : 'چه در حال راه‌اندازی برند جدید باشید، چه نیازمند مهندسی بسته‌بندی یا ارتقای کاتالوگ و ارتباطات B2B — آماده گفتگو و همکاری در پروژه‌های شاخص هستم.'}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-sm sm:text-base rounded-full shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{lang === 'en' ? 'Discuss a Project' : 'ارتباط و شروع همکاری'}</span>
              <ArrowIcon className="w-4 h-4 text-neutral-950" />
            </button>

            {/* Direct Action Icons */}
            <div className="flex items-center gap-2">
              <a
                href={`tel:${PROFILE_DATA.links.phone}`}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-amber-500 hover:text-neutral-950 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md group"
                title={lang === 'en' ? 'Direct Phone Call' : 'تماس تلفنی'}
                aria-label="Direct Phone Call"
              >
                <Phone className="w-5 h-5 text-neutral-200 group-hover:text-neutral-950" />
              </a>

              <a
                href={PROFILE_DATA.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-emerald-600 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md group"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-neutral-200 group-hover:text-white" />
              </a>

              <a
                href={PROFILE_DATA.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-sky-500 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md group"
                title="Telegram"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4 text-neutral-200 group-hover:text-white" />
              </a>
            </div>

            <a
              href={PROFILE_DATA.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base rounded-full border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-4 h-4 opacity-70" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
