import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Compass, Cpu, Layers, Palette, ShieldCheck, Terminal, Award, ExternalLink, Sparkles } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { Language, PageId } from '../types';

interface AboutPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang, onNavigate }) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const toolsets = [
    {
      categoryEn: 'Brand Systems & Vector',
      categoryFa: 'سیستم‌های هویت بصری و وکتور',
      tools: ['Figma', 'Adobe Illustrator', 'Adobe InDesign', 'Photoshop'],
    },
    {
      categoryEn: '3D Visualization & Packaging',
      categoryFa: 'مدل‌سازی سه‌بعدی و استراکچر بسته‌بندی',
      tools: ['Cinema 4D', 'Blender', 'KeyShot', 'Structural Dielines'],
    },
    {
      categoryEn: 'Motion & Visual Production',
      categoryFa: 'موشن گرافیک و کارگردانی ویدئو',
      tools: ['After Effects', 'Premiere Pro', 'Commercial Reels', 'Sound Design'],
    },
    {
      categoryEn: 'Generative AI & Modern Direction',
      categoryFa: 'ابزارهای مولد هوش مصنوعی و کانسپت',
      tools: ['Midjourney', 'Runway Gen-3', 'Photoreal Prototyping', 'Prompt Engineering'],
    },
  ];

  const pillars = [
    {
      index: '01',
      titleEn: 'Structured Problem Solving',
      titleFa: 'حل مسئله با رویکرد مهندسی',
      descEn:
        'A design is only as good as the problem it solves. My civil engineering background gives me the discipline to analyze complex commercial workflows, production constraints, and product anatomies before laying down a single pixel.',
      descFa:
        'دیزاین تنها زمانی اثربخش است که مسئله درستی را حل کند. پیشینه تحصیلی‌ام در مهندسی عمران به من انضباط تحلیلی می‌دهد تا پیش از هر تصمیمی، ساختار پیچیده محصول، محدودیت‌های خط تولید و رفتار مخاطب هدف را به دقت واکاوی کنم.',
    },
    {
      index: '02',
      titleEn: 'Engineering Feasibility & Prepress Rigor',
      titleFa: 'امکان‌پذیری فنی و تسلط بر فرآیند چاپ',
      descEn:
        'From high-speed FMCG packaging lines and flexographic presses to multi-thousand page technical catalogs, every design asset is architected to perform flawlessly in physical manufacturing environments.',
      descFa:
        'از خطوط بسته‌بندی پرسرعت صنایع غذایی و چاپ فلکسو تا کاتالوگ‌های چندصد صفحه‌ای تجهیزات سنگین، کلیه خروجی‌ها با نظارت دقیق فنی بر فرآیند لیتوگرافی، تیغ و متریال آماده‌سازی می‌شوند.',
    },
    {
      index: '03',
      titleEn: 'Commercial Distinction Over Slop',
      titleFa: 'تمایز تجاری و پرهیز از ترندهای گذرا',
      descEn:
        'Avoiding short-lived visual fads in favor of enduring, confident brand expressions that build lasting equity for business founders, corporate holdings, and high-growth consumer products.',
      descFa:
        'دوری از کلیشه‌های تکراری و مدهای مقطعی به سود خلق دارایی‌های بصری پایدار و اصیل که در بازارهای بین‌المللی و رقابتی به برندها اعتبار و تمایز حقیقی می‌بخشد.',
    },
  ];

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-20 ${isFa ? 'text-right' : 'text-left'}`}>
      {/* 1. HERO BIO SPLIT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Typographic Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs font-bold font-display uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>{lang === 'en' ? 'About Saeed Jabbari' : 'درباره سعید جباری'}</span>
          </div>

          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-bold text-neutral-500 font-display uppercase tracking-widest block">
              {PROFILE_DATA.name[lang]}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
              {lang === 'en'
                ? 'Art & Creative Director'
                : 'مدیر هنری و خلاقیت'}
            </h1>
          </div>

          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-medium">
            {lang === 'en'
              ? 'I help consumer brands, industrial manufacturers, and B2B enterprises translate complex technical realities into clear, authoritative, and compelling visual communications. Over the past decade, my work has spanned complete brand identities, high-volume FMCG packaging systems, multi-page engineering catalogs, and viral product video direction.'
              : 'من به برندهای مصرفی، کارخانجات صنعتی و مجموعه‌های تجاری B2B کمک می‌کنم تا واقعیت‌های پیچیده فنی و مزیت‌های تجاری خود را به زبان بصری شفاف، معتبر و اثرگذار تبدیل کنند. طی بیش از یک دهه گذشته، حوزه فعالیت من شامل طراحی سیستم‌های جامع هویت بصری، معماری بسته‌بندی شلف، کاتالوگ‌های جامع مهندسی و کارگردانی محتوای ویدئویی محصول بوده است.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-neutral-800">
            <div className="flex items-center gap-2 bg-neutral-50 px-4 py-2.5 rounded-2xl border border-neutral-100">
              <Award className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{lang === 'en' ? '10+ Years Professional Practice' : '۱۰+ سال فعالیت حرفه‌ای دیزاین'}</span>
            </div>
            <div className="flex items-center gap-2 bg-neutral-50 px-4 py-2.5 rounded-2xl border border-neutral-100">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{lang === 'en' ? 'Art & Creative Director' : 'مدیر هنری و خلاقیت'}</span>
            </div>
            <div className="flex items-center gap-2 bg-neutral-50 px-4 py-2.5 rounded-2xl border border-neutral-100">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{lang === 'en' ? 'FMCG · B2B · Industrial Focus' : 'تخصص در B2B، صنایع و FMCG'}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onNavigate('work')}
              className="px-6 py-3.5 bg-neutral-950 text-white hover:bg-neutral-800 font-black text-sm rounded-full transition-all cursor-pointer shadow-xs inline-flex items-center justify-center gap-2"
            >
              <span>{lang === 'en' ? 'Explore Portfolio Work' : 'مشاهده پروژه‌های شاخص'}</span>
              <ArrowIcon className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-white text-neutral-900 hover:bg-neutral-50 border border-neutral-200 font-bold text-sm rounded-full transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>{lang === 'en' ? 'Discuss a Project' : 'گفتگو و استعلام پروژه'}</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Visual Frame (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-neutral-200/80 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-xl shadow-neutral-100 group">
            <div className="aspect-4/5 rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 relative">
              <img
                src="/assets/aistudio/me_3_90d03478.png"
                alt="Saeed Jabbari — Art Director & Brand Designer"
                className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white text-right">
                <span className="text-[11px] text-amber-400 font-bold font-display uppercase tracking-wider">
                  Saeed Jabbari
                </span>
                <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                  {lang === 'en' ? 'Art Director & Brand Designer' : 'مدیر هنری و طراح برند'}
                </h3>
                <p className="text-[11px] text-neutral-300 mt-0.5 font-medium">
                  {lang === 'en' ? 'Bridging engineering precision with visual identity' : 'پیوند دقت مهندسی با هویت بصری'}
                </p>
              </div>
            </div>

            <div className="mt-3.5 p-3.5 sm:p-4 bg-neutral-50 rounded-xl sm:rounded-2xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-neutral-900 block font-display">
                  {PROFILE_DATA.name[lang]}
                </span>
                <span className="text-[11px] text-neutral-500 font-medium block">
                  LinkedIn: saeedjabbari · Behance: saeedjabbari
                </span>
              </div>
              <a
                href={PROFILE_DATA.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-amber-600 transition-colors"
                title="LinkedIn"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE CIVIL ENGINEERING ANCHOR & PERSPECTIVE */}
      <section className="bg-neutral-950 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 space-y-8 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-amber-400 font-display uppercase tracking-widest block">
            {lang === 'en' ? 'Unique Academic Advantage' : 'مزیت منحصربه‌فرد تحصیلی و فکری'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            {lang === 'en'
              ? 'Why a Civil Engineering Degree Makes Better Brand Systems'
              : 'چرا پیشینه مهندسی عمران، سیستم‌های برند قدرتمندتری خلق می‌کند؟'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-medium">
            {lang === 'en'
              ? 'Civil engineering is fundamentally the study of structural integrity, load-bearing capacities, material tolerances, and precise spatial mathematics. When applied to visual communications, this discipline eradicates decorative guesswork.'
              : 'مهندسی عمران در بنیاد خود، علم درک بارگذاری، یکپارچگی سازه، تحلیل تنش مصالح و هندسه دقیق فضایی است. وقتی این انضباط فکری به حوزه ارتباطات بصری وارد می‌شود، حدس و گمان‌های صرفاً تزیینی کنار می‌روند.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 sm:p-6 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl space-y-3">
            <h3 className="text-base font-black text-white">
              {lang === 'en' ? 'Technical Comprehension' : 'درک عمیق محصول فنی'}
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-medium">
              {lang === 'en'
                ? 'I can read technical schematics, engineering blueprints, axle tolerances, and CAD cross-sections without needing them simplified by a client.'
                : 'توانایی تحلیل نقشه‌های فنی، تلرانس‌های مکانیکی قطعات صنعتی، دیاگرام‌های انفجاری و فایل‌های CAD بدون نیاز به ساده‌سازی اولیه توسط کارفرما.'}
            </p>
          </div>

          <div className="p-5 sm:p-6 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl space-y-3">
            <h3 className="text-base font-black text-white">
              {lang === 'en' ? 'Packaging Structural Physics' : 'فیزیک و خط تیغ بسته‌بندی'}
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-medium">
              {lang === 'en'
                ? 'Understanding board weights, folding carton grain directions, rigid box magnet placements, and how packaging withstands transport stresses.'
                : 'تسلط بر گرماژ مقوا، جهت خواب الیاف کاغذ، محل آهنرباهای هاردباکس و استقامت کارتن مادر در برابر فشارهای حمل‌ونقل و رطوبت انبار.'}
            </p>
          </div>

          <div className="p-5 sm:p-6 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl space-y-3">
            <h3 className="text-base font-black text-white">
              {lang === 'en' ? 'Industrial B2B Empathy' : 'همدلی با ادبیات تجاری B2B'}
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-medium">
              {lang === 'en'
                ? 'Speaking the language of factory directors, operations managers, and procurement buyers who make buying decisions based on specs, not fluff.'
                : 'آشنایی کامل با زبان مدیران کارخانه، مهندسان خرید و تصمیم‌گیرندگان بازرگانی که قراردادها را بر پایه کارایی و ارقام شفاف امضا می‌کنند.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. THREE CORE DESIGN PILLARS */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider block">
            {lang === 'en' ? 'Methodology & Standards' : 'اصول و رویکرد طراحی'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
            {lang === 'en' ? 'How I Approach Design Challenges' : 'رویکرد من در مواجهه با چالش‌های دیزاین'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((pillar) => (
            <div
              key={pillar.index}
              className="bg-white rounded-xl sm:rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs space-y-3.5 hover:shadow-md transition-all"
            >
              <span className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center font-display font-black text-xs text-neutral-900">
                {pillar.index}
              </span>
              <h3 className="text-base sm:text-lg font-black text-neutral-900">
                {lang === 'en' ? pillar.titleEn : pillar.titleFa}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                {lang === 'en' ? pillar.descEn : pillar.descFa}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PROFESSIONAL TOOLSET & PRODUCTION STACK */}
      <section className="bg-neutral-50 rounded-2xl sm:rounded-3xl border border-neutral-200/80 p-6 sm:p-10 space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider block">
            {lang === 'en' ? 'Software & Production Stack' : 'جعبه‌ابزار و فناوری‌های تولید'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
            {lang === 'en' ? 'Crafting at the Highest Industry Standards' : 'تجهیز به استانداردهای تراز اول صنعت دیزاین'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {toolsets.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-5 border border-neutral-200/60 shadow-2xs space-y-3">
              <h3 className="text-sm font-black text-neutral-900">
                {lang === 'en' ? item.categoryEn : item.categoryFa}
              </h3>
              <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                {item.tools.map((tool, tIdx) => (
                  <div key={tIdx} className="text-xs font-bold text-neutral-700 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {lang === 'en'
            ? 'Have a Project in Mind?'
            : 'پروژه‌ای برای گفتگو و توسعه دارید؟'}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed font-medium">
          {lang === 'en'
            ? 'Available for creative direction, packaging architecture, and brand identity projects with forward-thinking enterprises.'
            : 'آماده همکاری و هدایت هنری پروژه‌های بسته‌بندی، هویت بصری و ارتباطات بصری صنعتی با کسب‌وکارهای متعهد به کیفیت.'}
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-neutral-950 font-black text-sm rounded-full hover:bg-neutral-100 transition-all cursor-pointer"
          >
            {lang === 'en' ? 'Start a Conversation' : 'شروع ارتباط و گفتگو'}
          </button>
          <a
            href={PROFILE_DATA.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-white/10 text-white font-bold text-sm rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            <span>LinkedIn: saeedjabbari</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </section>
    </div>
  );
};
