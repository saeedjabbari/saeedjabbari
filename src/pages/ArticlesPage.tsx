import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Tag,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  BookmarkCheck,
  Compass,
  MessageSquare,
} from 'lucide-react';
import { ARTICLES_DATA } from '../data/articlesData';
import { ArticleItem, Language, PageId } from '../types';

interface ArticlesPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  selectedArticle: ArticleItem | null;
  onSelectArticle: (article: ArticleItem | null) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({
  lang,
  onNavigate,
  selectedArticle,
  onSelectArticle,
}) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top when an article is selected or changed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedArticle?.id]);

  const categories = [
    { id: 'all', labelEn: 'All Articles', labelFa: 'همه مقالات' },
    { id: 'packaging', labelEn: 'Packaging Architecture', labelFa: 'معماری بسته‌بندی' },
    { id: 'industrial_b2b', labelEn: 'Industrial & B2B', labelFa: 'سیستم‌های صنعتی B2B' },
    { id: 'ai_methodology', labelEn: 'AI & Creative Pipeline', labelFa: 'هوش مصنوعی و متدولوژی' },
    { id: 'brand_strategy', labelEn: 'Brand & Shelf Strategy', labelFa: 'استراتژی برند و شلف' },
    { id: 'technical_print', labelEn: 'Technical Prepress', labelFa: 'دانش چاپ و لیتوگرافی' },
  ];

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  /* ------------------------------------------------------------- */
  /* CASE 1: FULL-PAGE DEDICATED ARTICLE VIEW (No popups / modals) */
  /* ------------------------------------------------------------- */
  if (selectedArticle) {
    const currentIndex = ARTICLES_DATA.findIndex((a) => a.id === selectedArticle.id);
    const prevArticle = ARTICLES_DATA[(currentIndex - 1 + ARTICLES_DATA.length) % ARTICLES_DATA.length];
    const nextArticle = ARTICLES_DATA[(currentIndex + 1) % ARTICLES_DATA.length];
    const relatedArticles = ARTICLES_DATA.filter((a) => a.id !== selectedArticle.id).slice(0, 2);

    return (
      <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12 sm:space-y-16 ${isFa ? 'text-right' : 'text-left'}`}>
        {/* Top Breadcrumb & Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-6">
          <button
            onClick={() => onSelectArticle(null)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer group"
          >
            <ChevronRight className={`w-4 h-4 transition-transform ${isFa ? 'group-hover:translate-x-1' : 'rotate-180 group-hover:-translate-x-1'}`} />
            <span>{lang === 'en' ? 'Back to All Articles' : 'بازگشت به آرشیو مقالات'}</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Share link button */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 text-xs font-bold text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
              title={lang === 'en' ? 'Copy Link' : 'کپی پیوند'}
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{lang === 'en' ? 'Link Copied!' : 'پیوند کپی شد!'}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Share' : 'اشتراک‌گذاری'}</span>
                </>
              )}
            </button>

            {/* Prev Article Navigation */}
            <button
              onClick={() => onSelectArticle(prevArticle)}
              className="p-2 rounded-full border border-neutral-200 hover:bg-neutral-100 transition-colors cursor-pointer text-neutral-700"
              title={lang === 'en' ? `Previous: ${prevArticle.title.en}` : `مقاله قبلی: ${prevArticle.title.fa}`}
            >
              <ChevronRight className={`w-4 h-4 ${isFa ? '' : 'rotate-180'}`} />
            </button>

            {/* Next Article Navigation */}
            <button
              onClick={() => onSelectArticle(nextArticle)}
              className="p-2 rounded-full border border-neutral-200 hover:bg-neutral-100 transition-colors cursor-pointer text-neutral-700"
              title={lang === 'en' ? `Next: ${nextArticle.title.en}` : `مقاله بعدی: ${nextArticle.title.fa}`}
            >
              <ChevronLeft className={`w-4 h-4 ${isFa ? '' : 'rotate-180'}`} />
            </button>
          </div>
        </div>

        {/* Article Header & Lead */}
        <header className="space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-neutral-500">
            <span className="px-3 py-1 bg-amber-400/20 text-neutral-950 border border-amber-300 rounded-full font-black">
              {selectedArticle.categoryLabel[lang]}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              {selectedArticle.readTime[lang]}
            </span>
            <span>•</span>
            <span>{selectedArticle.publishedDate[lang]}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight leading-[1.2]">
            {selectedArticle.title[lang]}
          </h1>

          <p className="text-base sm:text-xl text-neutral-600 leading-relaxed font-medium">
            {selectedArticle.subtitle[lang]}
          </p>
        </header>

        {/* Hero Cover Image */}
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-21/9 bg-neutral-950 border border-neutral-200/80 shadow-md">
          <img
            src={selectedArticle.coverImage}
            alt={selectedArticle.title[lang]}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Author Byline Bar */}
        <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/assets/aistudio/me_3_90d03478.png"
              alt="Saeed Jabbari"
              className="w-14 h-14 rounded-full object-cover object-top border-2 border-white shadow-sm shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm sm:text-base font-black text-neutral-950">
                  {lang === 'en' ? 'Saeed Jabbari' : 'سعید جباری'}
                </h4>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-800">
                  {lang === 'en' ? 'M.Sc. Civil Engineering' : 'فوق لیسانس مهندسی عمران'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-medium">
                {lang === 'en'
                  ? 'Art Director & Brand Designer · Visual Systems Specialist'
                  : 'مدیر هنری و طراح برند · متخصص سیستم‌های بصری و بسته‌بندی'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => onNavigate('contact')}
              className="text-xs font-bold px-4 py-2 bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-200 rounded-full transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'en' ? 'Consultation' : 'مشاوره اختصاصی'}</span>
            </button>
          </div>
        </div>

        {/* Featured Quote Callout */}
        {selectedArticle.quote && (
          <div className="p-6 sm:p-8 bg-amber-400/10 border-r-4 border-amber-500 rounded-2xl space-y-2">
            <p className="text-base sm:text-lg md:text-xl font-bold text-neutral-950 italic leading-relaxed">
              «{selectedArticle.quote[lang]}»
            </p>
            <span className="text-xs sm:text-sm font-bold text-amber-800 block">
              — {lang === 'en' ? 'Saeed Jabbari, Art Direction Perspective' : 'دیدگاه سعید جباری در هدایت هنری و طراحی ساختاری'}
            </span>
          </div>
        )}

        {/* Full In-Depth Body Sections */}
        <article className="space-y-12 max-w-4xl">
          {selectedArticle.sections.map((section, sIdx) => (
            <section key={sIdx} className="space-y-5 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black font-mono text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  {String(sIdx + 1).padStart(2, '0')}
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-950 tracking-tight">
                  {section.heading[lang]}
                </h2>
              </div>

              <div className="space-y-4 text-neutral-700 leading-relaxed font-medium text-base sm:text-lg">
                {section.paragraphs[lang].map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {section.keyTakeaway && (
                <div className="p-5 sm:p-6 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-start gap-3.5 text-xs sm:text-sm text-emerald-950 font-bold shadow-2xs">
                  <BookmarkCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-wider text-emerald-700 font-black block">
                      {lang === 'en' ? 'Key Takeaway / Standard' : 'جمع‌بندی اجرایی و خط قرمز دیزاین'}
                    </span>
                    <span className="leading-relaxed">{section.keyTakeaway[lang]}</span>
                  </div>
                </div>
              )}
            </section>
          ))}
        </article>

        {/* Tags & Metadata Footer */}
        <div className="pt-8 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-neutral-400" />
            {selectedArticle.tags[lang].map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-xs font-bold text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <button
            onClick={handleCopyLink}
            className="text-xs font-bold text-neutral-600 hover:text-neutral-950 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? (lang === 'en' ? 'Link Copied' : 'پیوند کپی شد') : (lang === 'en' ? 'Share Article' : 'اشتراک‌گذاری مقاله')}</span>
          </button>
        </div>

        {/* Previous & Next Article Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div
            onClick={() => onSelectArticle(prevArticle)}
            className="p-5 bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-400 transition-all cursor-pointer space-y-2 group"
          >
            <span className="text-xs font-bold text-neutral-400 inline-flex items-center gap-1">
              <ChevronRight className={`w-3.5 h-3.5 ${isFa ? '' : 'rotate-180'}`} />
              <span>{lang === 'en' ? 'Previous Article' : 'مقاله قبلی'}</span>
            </span>
            <h4 className="text-sm sm:text-base font-black text-neutral-950 group-hover:text-amber-600 transition-colors line-clamp-1">
              {prevArticle.title[lang]}
            </h4>
            <span className="text-xs text-neutral-500 font-medium block">
              {prevArticle.readTime[lang]}
            </span>
          </div>

          <div
            onClick={() => onSelectArticle(nextArticle)}
            className="p-5 bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-400 transition-all cursor-pointer space-y-2 group text-left sm:text-right"
          >
            <span className="text-xs font-bold text-neutral-400 inline-flex items-center gap-1">
              <span>{lang === 'en' ? 'Next Article' : 'مقاله بعدی'}</span>
              <ChevronLeft className={`w-3.5 h-3.5 ${isFa ? '' : 'rotate-180'}`} />
            </span>
            <h4 className="text-sm sm:text-base font-black text-neutral-950 group-hover:text-amber-600 transition-colors line-clamp-1">
              {nextArticle.title[lang]}
            </h4>
            <span className="text-xs text-neutral-500 font-medium block">
              {nextArticle.readTime[lang]}
            </span>
          </div>
        </div>

        {/* Related Articles Exploration */}
        {relatedArticles.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-neutral-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-black text-neutral-950">
                {lang === 'en' ? 'More Insights & Research' : 'سایر پژوهش‌ها و یادداشت‌های تخصصی'}
              </h3>
              <button
                onClick={() => onSelectArticle(null)}
                className="text-xs font-black text-amber-600 hover:text-amber-700 cursor-pointer inline-flex items-center gap-1"
              >
                <span>{lang === 'en' ? 'View Archive' : 'مشاهده همه'}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-400 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer shadow-2xs"
                >
                  <div className="aspect-16/9 overflow-hidden bg-neutral-100">
                    <img
                      src={article.coverImage}
                      alt={article.title[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[11px] font-bold text-amber-600">
                      {article.categoryLabel[lang]}
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-neutral-950 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {article.title[lang]}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-2 font-medium">
                      {article.subtitle[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action Banner */}
        <section className="bg-neutral-950 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'Engineering & Art Direction in Action' : 'اجرای این اصول در پروژه شما'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {lang === 'en'
                ? 'Ready to apply these structural principles to your packaging or brand?'
                : 'آیا برای پیاده‌سازی این متدولوژی در سیستم هویت یا بسته‌بندی خود آماده‌اید؟'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-medium">
              {lang === 'en'
                ? 'From packaging die-lines and prepress color separation to enterprise B2B sales collateral, let us ensure your product communicates with precision.'
                : 'از خطوط تیغ و نظارت چاپ لیتوگرافی تا ابزارهای فروش B2B، خروجی برند شما با حداکثر دقت مهندسی و تمایز دیزاین خلق می‌شود.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-sm rounded-full transition-all shadow-md shrink-0 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>{lang === 'en' ? 'Start a Project Inquiry' : 'ثبت درخواست همکاری و مشاوره'}</span>
            <ArrowUpRight className="w-4 h-4 text-neutral-950" />
          </button>
        </section>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* CASE 2: MAIN ARTICLES ARCHIVE (Catalog view with filters)      */
  /* ------------------------------------------------------------- */
  const filteredArticles =
    selectedCategory === 'all'
      ? ARTICLES_DATA
      : ARTICLES_DATA.filter((item) => item.category === selectedCategory);

  const featuredArticle = ARTICLES_DATA.find((item) => item.featured) || ARTICLES_DATA[0];

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 ${isFa ? 'text-right' : 'text-left'}`}>
      {/* 1. Header & Context */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-neutral-950 text-xs font-bold border border-amber-300">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>{lang === 'en' ? 'Essays, Research & Technical Field Notes' : 'یادداشت‌ها، پژوهش‌های فنی و مقالات دیزاین'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
          {lang === 'en' ? 'Articles & Technical Insights' : 'مقالات و پژوهش‌های تخصصی دیزاین'}
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-medium">
          {lang === 'en'
            ? 'Bridging civil engineering structural principles, FMCG packaging tolerances, industrial B2B sales catalogs, and AI-accelerated art direction.'
            : 'تلاقی انضباط تحلیلی مهندسی عمران، تلرانس‌های فیزیکی بسته‌بندی، معماری کاتالوگ‌های صنعتی B2B و کاربرد عملی هوش مصنوعی در استودیو دیزاین.'}
        </p>
      </section>

      {/* 2. Featured Lead Article Banner */}
      {featuredArticle && (
        <section
          onClick={() => onSelectArticle(featuredArticle)}
          className="bg-neutral-950 text-white rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-900 shadow-xl relative group cursor-pointer"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Image (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden bg-neutral-900">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title[lang]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-amber-500 text-neutral-950 text-xs font-black uppercase tracking-wider rounded-full">
                  {lang === 'en' ? 'Featured Essay' : 'مقاله برگزیده'}
                </span>
              </div>
            </div>

            {/* Content (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-amber-400">
                  <span className="px-2.5 py-1 bg-white/10 rounded-md">
                    {featuredArticle.categoryLabel[lang]}
                  </span>
                  <span className="flex items-center gap-1 text-neutral-400">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredArticle.readTime[lang]}
                  </span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-neutral-400">{featuredArticle.publishedDate[lang]}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug group-hover:text-amber-400 transition-colors">
                  {featuredArticle.title[lang]}
                </h2>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-medium">
                  {featuredArticle.subtitle[lang]}
                </p>

                {featuredArticle.quote && (
                  <div className="p-4 bg-white/5 border-l-2 border-amber-400 rounded-r-xl text-xs sm:text-sm italic text-neutral-300 font-medium">
                    «{featuredArticle.quote[lang]}»
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-800">
                <div className="flex flex-wrap gap-2">
                  {featuredArticle.tags[lang].map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-bold text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectArticle(featuredArticle);
                  }}
                  className="px-6 py-3 bg-white text-neutral-950 hover:bg-amber-400 font-black text-xs sm:text-sm rounded-full transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>{lang === 'en' ? 'Read Full Analysis' : 'مطالعه کامل مقاله'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Category Filter Tabs */}
      <section className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-neutral-200 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-neutral-950 text-white shadow-xs font-black'
                      : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200/80'
                  }`}
                >
                  {lang === 'en' ? cat.labelEn : cat.labelFa}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-bold text-neutral-500">
            {filteredArticles.length} {lang === 'en' ? 'publications found' : 'مقاله تخصصی'}
          </span>
        </div>

        {/* 4. Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 hover:border-neutral-400 transition-all shadow-xs hover:shadow-md overflow-hidden flex flex-col justify-between group cursor-pointer"
              onClick={() => onSelectArticle(article)}
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

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs font-bold text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {article.readTime[lang]}
                    </span>
                    <span>•</span>
                    <span>{article.publishedDate[lang]}</span>
                  </div>

                  <h3 className="text-lg font-black text-neutral-950 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                    {article.title[lang]}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed font-medium">
                    {article.subtitle[lang]}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-100 mt-4 flex items-center justify-between gap-2">
                <span className="text-xs font-black text-neutral-900 group-hover:text-amber-600 transition-colors inline-flex items-center gap-1.5">
                  <span>{lang === 'en' ? 'Read Article' : 'مطالعه مقاله'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </span>

                <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-bold">
                  <Tag className="w-3 h-3" />
                  <span>{article.tags[lang][0]}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Consultation & Collaboration Banner */}
      <section className="bg-amber-400/10 border-2 border-amber-300 rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-black text-amber-800 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{lang === 'en' ? 'Direct Application to Your Project' : 'کاربرد مستقیم این اصول در پروژه شما'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-neutral-950">
            {lang === 'en'
              ? 'Have an upcoming packaging run or industrial catalog challenge?'
              : 'آیا چالشی در طراحی بسته‌بندی یا کاتالوگ صنعتی دارید؟'}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
            {lang === 'en'
              ? 'Saeed Jabbari applies these exact technical and structural methods directly to client engagements—from initial die-cut prototype to factory printing checks.'
              : 'سعید جباری همین اصول دقیق مهندسی و متدولوژی‌های بصری را مستقیماً در پروژه‌های هویت سازمانی، خطوط تیغ و نظارت چاپخانه‌ای پیاده‌سازی می‌کند.'}
          </p>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white font-black text-sm rounded-full transition-all shadow-md shrink-0 inline-flex items-center gap-2 cursor-pointer"
        >
          <span>{lang === 'en' ? 'Schedule a Discovery Call' : 'رزرو وقت مشاوره و بررسی پروژه'}</span>
          <ArrowUpRight className="w-4 h-4 text-amber-400" />
        </button>
      </section>
    </div>
  );
};
