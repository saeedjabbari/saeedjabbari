import React from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  Layers,
  Sparkles,
  Building2,
  Package,
  Compass,
  CheckCircle2,
  Award,
  ExternalLink,
  BookOpen,
  Clock,
  Phone,
  MessageCircle,
  Send,
  Boxes,
  FileCheck,
  TrendingUp,
  Cpu,
  Factory,
  ShoppingBag,
  Rocket,
  ShieldCheck,
  Palette,
  Maximize2,
  Calendar,
  Users,
} from 'lucide-react';
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

  // 4-Step Collaborative Roadmap (inspired by warm human agency workflows)
  const roadmapSteps = [
    {
      num: '۰۱',
      numEn: '01',
      titleFa: 'گفت‌وگوی اولیه و نیازسنجی بی‌تکلف',
      titleEn: 'Discovery & Honest Consultation',
      descFa: 'در یک تماس تلفنی یا چت صمیمی، چالش محصول، هویت فعلی، اهداف بازار و محدودیت‌های بودجه را با هم واکاوی می‌کنیم؛ بدون فرم‌های اداری پیچیده و بوروکراسی.',
      descEn: 'A warm, direct conversation exploring product challenges, market audience, and project goals without bureaucratic friction.',
      badgeFa: 'نیازسنجی و شفاف‌سازی',
      badgeEn: 'Needs & Alignment',
      icon: MessageCircle,
    },
    {
      num: '۰۲',
      numEn: '02',
      titleFa: 'برآورد شفاف زمان، مسیر و تعهدات',
      titleEn: 'Clear Scope, Timeline & Milestones',
      descFa: 'ارائه پروپوزال مکتوب، تعیین دقیق اقلام تحویلی و جدول زمان‌بندی واقع‌بینانه تا هیچ ابهام یا هزینه‌ پنهانی در طول مسیر همکاری پیش نیاید.',
      descEn: 'A structured proposal with defined deliverables, production phases, and realistic timelines with zero hidden surprises.',
      badgeFa: 'زمان‌بندی روشن',
      badgeEn: 'Transparent Roadmap',
      icon: Calendar,
    },
    {
      num: '۰۳',
      numEn: '03',
      titleFa: 'اتودهای مرحله‌ای و جلسات بازخورد',
      titleEn: 'Iterative Concepts & Direct Feedback',
      descFa: 'خلق کانسپت‌های هدفمند، رندرهای سه‌بعدی و نمونه‌های اولیه قابل لمس؛ همراه با جلسات همفکری برای چکش‌کاری طرح تا رسیدن به نتیجه مطلوب.',
      descEn: 'Developing tangible design prototypes and 3D mockups through collaborative feedback loops until the visual system clicks.',
      badgeFa: 'اجرا و چکش‌کاری',
      badgeEn: 'Iterative Co-Creation',
      icon: Palette,
    },
    {
      num: '۰۴',
      numEn: '04',
      titleFa: 'آماده‌سازی مسترفایل‌ها و نظارت فنی چاپ',
      titleEn: 'Production-Ready Delivery & Print QC',
      descFa: 'تحویل فایل‌های وکتور استاندارد (AI, PDF, EPS)، تفکیک رنگ دقیق CMYK/Pantone، آماده‌سازی خط تیغ و هماهنگی نهایی با چاپخانه تا لحظه خروج اولین تیراژ.',
      descEn: 'Delivery of clean vector master files, CMYK/Pantone separations, structural dielines, and pressroom quality coordination.',
      badgeFa: 'خروجی بدون نقص چاپ',
      badgeEn: 'Pressroom Precision',
      icon: FileCheck,
    },
  ];

  // Studio Dossiers (Service Tracks with physical atelier credibility)
  const studioDossiers = [
    {
      tag: 'DOSSIER 01',
      titleFa: 'هویت بصری، بازسازی لوگو و نشان تجاری',
      titleEn: 'Visual Identity, Brand Marks & Logotypes',
      subtitleFa: '«گاهی برند عوض نشده؛ فقط لباسش کهنه شده است.»',
      subtitleEn: '“Sometimes the brand has not changed; its wardrobe simply grew outdated.”',
      descFa: 'خلق سیستم‌های اصیل برند، بازطراحی نشان‌های فرسوده، کتابچه راهنمای هویت (Brand Book)، پالت رنگی استاندارد و ست کامل اوراق اداری جهت تمایز پایدار.',
      descEn: 'Authoritative brand systems, logo redesigns, comprehensive brand books, licensed typography, and executive corporate stationery.',
      deliverablesFa: ['لوگو و مونوگرام اختصاصی', 'گایدلاین رنگی CMYK و Pantone', 'فایل‌های مستر AI / PDF / SVG', 'ست اداری چاپی و دیجیتال'],
      deliverablesEn: ['Custom Logotype & Marks', 'CMYK / Pantone Specifications', 'Master AI / PDF / SVG Assets', 'Full Corporate Stationery'],
      accentColor: 'indigo',
      badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      actionTextFa: 'بررسی پروژه‌های هویت',
      actionTextEn: 'Explore Identity Work',
    },
    {
      tag: 'DOSSIER 02',
      titleFa: 'مهندسی استراکچر و گرافیک بسته‌بندی شلف',
      titleEn: 'Structural Packaging Engineering & Shelf Labels',
      subtitleFa: '«بسته‌بندی در ۳ ثانیه اول باید چشم خریدار را قفل کند.»',
      subtitleEn: '“Packaging must captivate buyer instinct in the first 3 seconds.”',
      descFa: 'طراحی خطوط تیغ مقوایی و کارتن مادر، هاردباکس‌های مگنتی لوکس VIP، سیستم معماری لیبل محصولات آرایشی، دارویی و غذایی با رعایت خواب الیاف کاغذ و فینیشینگ‌های متالیک.',
      descEn: 'Engineered dielines, folding cartons, luxury rigid magnetic boxes, and FMCG shelf labels crafted for high-speed manufacturing lines.',
      deliverablesFa: ['خط تیغ آماده تیغ‌زنی (Dielines)', 'جعبه‌های هاردباکس لوکس VIP', 'لیبل‌های ضدآب و متالیک شیشه', 'موکاپ‌های سه‌بعدی چیدمان شلف'],
      deliverablesEn: ['Press-Ready Vector Dielines', 'Prestige Rigid VIP Boxes', 'Waterproof Cosmetic Labels', 'Retail Shelf 3D Renders'],
      accentColor: 'emerald',
      badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      actionTextFa: 'بررسی پروژه‌های بسته‌بندی',
      actionTextEn: 'Explore Packaging Work',
    },
    {
      tag: 'DOSSIER 03',
      titleFa: 'کاتالوگ جامع صنعتی و نشر تجاری',
      titleEn: 'Comprehensive Technical Catalogues & Prepress',
      subtitleFa: '«تبدیل صدها قطعه پیچیده به ارتباط بصری روان برای خریداران خارجی.»',
      subtitleEn: '“Translating dense technical schematics into clear export sales tools.”',
      descFa: 'صفحه‌آرایی کاتالوگ‌های چندصد صفحه‌ای قطعات سنگین تجاری و تجهیزات پزشکی، جدول مشخصات فنی استاندارد، دیاگرام‌های انفجاری و نظارت حضوری بر فرآیند لیتوگرافی و چاپ افست.',
      descEn: 'High-volume publications spanning 200+ pages of pharmaceutical and heavy transport parts, data matrices, and pressroom offset supervision.',
      deliverablesFa: ['کتابچه و کاتالوگ تا ۲۰۰ صفحه', 'جداول تمیز مشخصات فنی مهندسی', 'دیاگرام‌های انفجاری قطعات', 'تفکیک رنگ دقیق و کنترل ترام'],
      deliverablesEn: ['Up to 200-Page Catalogues', 'Clean Engineering Data Grids', 'Exploded Mechanical Views', 'Strict Prepress Plate Checks'],
      accentColor: 'rose',
      badgeStyle: 'bg-rose-50 text-rose-700 border-rose-200',
      actionTextFa: 'بررسی پروژه‌های کاتالوگ',
      actionTextEn: 'Explore Catalogue Work',
    },
    {
      tag: 'DOSSIER 04',
      titleFa: 'مدل‌سازی ۳D و رندرهای تبلیغاتی محصول',
      titleEn: 'Photorealistic 3D Visualization & Product Motion',
      subtitleFa: '«نمایش واقع‌بینانه محصول، پیش از ورود به خط تولید انبوه.»',
      subtitleEn: '“Photorealistic product presence before mass manufacturing.”',
      descFa: 'بازسازی سه‌بعدی محصولات با بافت‌های دقیق متریال، نورپردازی صنعتی، رندرهای زاویه دید مشتری، پرزنت پاویون‌های نمایشگاهی (ایران‌مال) و ویدئوهای موشن‌گرافیک معرفی قطعات.',
      descEn: 'Detailed 3D product visualizations, retail lighting, expo exhibition backdrops (Iran Mall), and cinematic product motion reels.',
      deliverablesFa: ['مدل‌سازی دقیق متریال و بافت', 'رندرهای باکیفیت زاویه شلف', 'پرزنت نمایشگاهی و پاویون', 'موشن‌گرافیک معرفی کارکرد'],
      deliverablesEn: ['Detailed Material Textures', 'Shelf Angle Visualizations', 'Expo Pavilion Backdrops', 'Motion Demonstration Reels'],
      accentColor: 'violet',
      badgeStyle: 'bg-violet-50 text-violet-700 border-violet-200',
      actionTextFa: 'بررسی رندرهای سه‌بعدی',
      actionTextEn: 'Explore 3D Work',
    },
  ];

  // Who is this for (Business Archetypes)
  const clientProfiles = [
    {
      titleFa: 'صنایع، کارخانجات و تولیدکنندگان B2B',
      titleEn: 'Industrial Manufacturers & B2B Enterprises',
      descFa: 'مجموعه‌هایی که قطعات سنگین، ماشین‌آلات یا تجهیزات صنعتی تولید می‌کنند و برای مذاکرات تجاری و صادرات، به کاتالوگ‌های مهندسی‌شده، موشن و هویت مقتدر نیاز دارند.',
      descEn: 'Enterprises manufacturing technical components and heavy machinery requiring authoritative export collateral and schematics.',
      icon: Factory,
      tagFa: 'صنعت و صادرات',
      tagEn: 'B2B & Trade',
    },
    {
      titleFa: 'برندهای مصرفی، FMCG و صنایع غذایی/دارویی',
      titleEn: 'Consumer Goods, Food & Pharmaceutical Brands',
      descFa: 'تولیدکنندگانی که محصولاتشان مستقیماً روی قفسه فروشگاه‌ها یا داروخانه‌ها قرار می‌گیرد و به خط تیغ دقیق، بسته‌بندی جذاب و رندرینگ ۳D شلف نیازمندند.',
      descEn: 'Consumer products competing on retail shelves requiring tactile packaging dielines, regulatory accuracy, and 3D presence.',
      icon: ShoppingBag,
      tagFa: 'قفسه و خرده‌فروشی',
      tagEn: 'Retail & Shelf',
    },
    {
      titleFa: 'کسب‌وکارهای در حال توسعه و استارتاپ‌ها',
      titleEn: 'High-Growth Ventures & Brand Transformations',
      descFa: 'سازمان‌هایی که از هویت قدیمی و ناهماهنگ خود عبور کرده‌اند و برای ورود قدرتمند به بازارهای جدید، خواستار بازطراحی لوگو، ست اداری و گایدلاین مدرن هستند.',
      descEn: 'Organizations transforming legacy marks into cohesive, contemporary visual systems to scale market authority.',
      icon: Rocket,
      tagFa: 'رشد و تحول برند',
      tagEn: 'Growth & Modernization',
    },
  ];

  return (
    <div className={`space-y-24 md:space-y-32 pb-24 ${isFa ? 'text-right' : 'text-left'}`}>
      {/* 1. HERO SECTION (Warm Human Designer Atelier Voice) */}
      <section className="relative pt-6 pb-10 md:pt-14 md:pb-18 overflow-hidden">
        {/* Subtle warm ambient lighting */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-[140px] -z-10 pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Copy Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Studio Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold font-display tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span>
                  {lang === 'en'
                    ? 'Creative Direction Atelier · Saeed Jabbari'
                    : 'استودیو دیزاین و هدایت هنری سعید جباری'}
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-neutral-950 tracking-tight leading-[1.16]">
                  {lang === 'en'
                    ? 'Brand Identity Systems, Packaging Engineering & Product Communication'
                    : 'طراحی سیستم‌های هویت بصری، مهندسی بسته‌بندی و ارتباطات برند'}
                </h1>
                <p className="text-sm sm:text-base font-bold text-indigo-950 font-display">
                  {lang === 'en'
                    ? 'Bridging Engineering Precision with Enduring Visual Distinction'
                    : 'پیوند انضباط مهندسی با تمایز اصیل بصری — مدیریت هنری و تولید خروجی‌های استاندارد صنعتی'}
                </p>
              </div>

              {/* Human Designer Manifesto Copy */}
              <p className="text-base sm:text-lg text-neutral-700 font-medium leading-relaxed max-w-2xl">
                {lang === 'en'
                  ? 'Effective design is never mere decoration; it solves commercial distribution, shelf presence, and export credibility. Partnering with founders and manufacturers from initial sketch and 3D modeling to dielines, prepress color separation, and pressroom supervision.'
                  : 'دیزاین اثربخش فقط زیبایی ظاهری نیست؛ حل چالش فروش، ایجاد تمایز حقیقی در قفسه و ساختن اعتباری ماندگار برای برند شماست. همراه شما از تحلیل کسب‌وکار و اتود دستی تا خطوط تیغ، تفکیک رنگ لیتوگرافی و نظارت بر خروجی چاپخانه.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('work')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-black text-white bg-neutral-950 hover:bg-neutral-800 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer font-display"
                >
                  <span>{lang === 'en' ? 'View Selected Work' : 'مشاهده پروژه‌های شاخص'}</span>
                  <ArrowIcon className="w-4 h-4 text-amber-400" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-bold text-neutral-800 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-full transition-all cursor-pointer shadow-2xs font-display"
                >
                  <span>{lang === 'en' ? 'Discuss a Project' : 'شروع گفت‌وگوی دوستانه'}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                </button>
              </div>

              {/* Trust Indicators (Physical & Authentic) */}
              <div className="pt-6 border-t border-neutral-200/90 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-bold text-neutral-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{lang === 'en' ? '10+ Years Practice' : '۱۰+ سال تجربه دیزاین تخصصی'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{lang === 'en' ? 'Offset & Prepress Rigor' : 'تسلط بر لیتوگرافی و چاپ افست'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{lang === 'en' ? 'B2B & FMCG Focus' : 'تمرکز بر صنایع B2B و FMCG'}</span>
                </div>
              </div>
            </div>

            {/* Visual Hero Showcase (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative bg-white border border-neutral-200/90 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-xl shadow-neutral-200/60 group">
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
                      {PROFILE_DATA.name[lang]}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-medium block">
                      {lang === 'en' ? 'Art & Creative Director' : 'مدیر هنری و خلاقیت'}
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

      {/* 2. THE 4-STEP COLLABORATION ROADMAP (Clear, Reassuring & Human-First) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold font-display">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            <span>{lang === 'en' ? 'How We Work Together' : 'مسیر همکاری شفاف با استودیو'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-neutral-950 tracking-tight leading-snug">
            {lang === 'en' ? (
              'A Reassuring, Step-by-Step Partnership'
            ) : (
              <>
                <span className="block sm:inline">فرآیندی شفاف، مطمئن و گام‌به‌گام </span>
                <span className="block sm:inline">برای موفقیت پروژه شما</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium">
            {lang === 'en'
              ? 'Zero ambiguity, zero bureaucratic friction. Every phase is clearly planned, structured, and communicated directly with your designer.'
              : 'بدون ابهام، بدون فرم‌های پیچیده اداری و بدون غافلگیری؛ در هر مرحله دقیقاً می‌دانید چه کاری در حال انجام است و چه خروجی استانداردی تحویل می‌گیرید.'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roadmapSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-neutral-200/90 p-6 space-y-4 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl sm:text-2xl font-black text-indigo-600 tracking-tight">
                      {isFa ? step.num : step.numEn}
                    </span>
                    <span className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Icon className="w-4 h-4" />
                    </span>
                  </div>

                  <h3 className="text-base font-black text-neutral-950 leading-snug">
                    {isFa ? step.titleFa : step.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                    {isFa ? step.descFa : step.descEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100">
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded-full border border-indigo-100 inline-block font-display">
                    {isFa ? step.badgeFa : step.badgeEn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. STUDIO DOSSIER & SERVICE TRACKS (Tactile Designer Atelier Aesthetic) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/80 pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider block">
              {lang === 'en' ? 'Specialized Practice Areas' : 'پرونده‌های تخصصی استودیو'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-neutral-950 tracking-tight">
              {lang === 'en'
                ? 'Tangible Design Solutions for Real Business Challenges'
                : 'خدمات ملموس و قابل‌اتکا برای چالش‌های واقعی برند شما'}
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-medium">
              {lang === 'en'
                ? 'From logo modernization and luxury rigid box dielines to 200-page medical catalogues and exhibition 3D pavilions.'
                : 'از بازسازی نشان‌های قدیمی تا محاسبه خط تیغ هاردباکس و کاتالوگ ۲۰۰ صفحه‌ای صنعتی با نظارت چاپ.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('work')}
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 hover:text-indigo-600 transition-colors cursor-pointer shrink-0 font-display"
          >
            <span>{lang === 'en' ? 'View Work Portfolio' : 'مشاهده پروژه‌ها در هر بخش'}</span>
            <ArrowIcon className="w-4 h-4 text-indigo-600" />
          </button>
        </div>

        {/* 4 Organic Dossier Cards Grid (Styled directly from ScreenHunter_285 reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {studioDossiers.map((dossier, idx) => {
            // ScreenHunter_285 color themes:
            // 0: Obsidian Dark with lime accents
            // 1: Electric Lime #d4ff14 with bold black typography
            // 2: Tactile Prepress White with graphite borders & ISO stamp
            // 3: Obsidian Charcoal with lime & amber highlights
            const isDark = idx === 0 || idx === 3;
            const isLime = idx === 1;
            const isWhite = idx === 2;

            const cardTheme = isLime
              ? {
                  cardBg: 'bg-[#d4ff14] text-neutral-950 border border-[#c2eb00] shadow-sm',
                  tabBg: 'bg-[#d4ff14] text-neutral-950 border-t border-x border-[#c2eb00]',
                  tabDot: 'bg-neutral-950',
                  metaText: 'text-neutral-800',
                  titleText: 'text-neutral-950',
                  subtitleText: 'text-neutral-900 font-bold',
                  descText: 'text-neutral-800 font-medium',
                  deliverableBg: 'bg-black/10 border-black/15 text-neutral-950',
                  deliverableCheck: 'text-neutral-950',
                  actionBtn: 'bg-neutral-950 text-[#d4ff14] hover:bg-neutral-900',
                  stampBorder: 'border-neutral-950/40 text-neutral-950',
                  stampBg: 'bg-black/5',
                }
              : isWhite
              ? {
                  cardBg: 'bg-white text-neutral-950 border border-neutral-300 shadow-sm',
                  tabBg: 'bg-white text-neutral-900 border-t border-x border-neutral-300',
                  tabDot: 'bg-indigo-600',
                  metaText: 'text-neutral-500',
                  titleText: 'text-neutral-950',
                  subtitleText: 'text-amber-700 font-bold',
                  descText: 'text-neutral-600 font-medium',
                  deliverableBg: 'bg-neutral-50 border-neutral-200/80 text-neutral-800',
                  deliverableCheck: 'text-indigo-600',
                  actionBtn: 'bg-neutral-950 text-white hover:bg-neutral-800',
                  stampBorder: 'border-neutral-300 text-neutral-700',
                  stampBg: 'bg-neutral-100',
                }
              : {
                  cardBg: idx === 0 ? 'bg-[#121316] text-white border border-neutral-800 shadow-xl' : 'bg-[#16171b] text-white border border-neutral-800 shadow-xl',
                  tabBg: idx === 0 ? 'bg-[#121316] text-[#d4ff14] border-t border-x border-neutral-800' : 'bg-[#16171b] text-[#d4ff14] border-t border-x border-neutral-800',
                  tabDot: 'bg-[#d4ff14]',
                  metaText: 'text-neutral-400',
                  titleText: 'text-white',
                  subtitleText: 'text-amber-400 font-bold',
                  descText: 'text-neutral-300 font-medium',
                  deliverableBg: 'bg-white/5 border-white/10 text-neutral-200',
                  deliverableCheck: 'text-[#d4ff14]',
                  actionBtn: 'bg-[#d4ff14] text-neutral-950 hover:bg-[#c2eb00]',
                  stampBorder: 'border-white/20 text-neutral-300',
                  stampBg: 'bg-white/5',
                };

            // Asymmetric organic curves matching folder tabs
            const asymmetricShape = isFa
              ? 'rounded-tl-[36px] rounded-b-[36px] rounded-tr-none'
              : 'rounded-tr-[36px] rounded-b-[36px] rounded-tl-none';

            return (
              <div key={idx} className="relative group flex flex-col pt-3">
                {/* Physical Manila / Archive Folder Tab Sticking Up */}
                <div className="flex items-center justify-between px-2">
                  <div
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-t-2xl font-mono text-xs font-black tracking-wider uppercase ${cardTheme.tabBg} -mb-px z-10`}
                  >
                    <span className={`w-2 h-2 rounded-full ${cardTheme.tabDot} animate-pulse`} />
                    <span>// {dossier.tag}</span>
                  </div>

                  <span className={`text-[10px] font-mono tracking-widest ${cardTheme.metaText} uppercase`}>
                    REF: 0{idx + 1}-{isLime ? 'EXPO' : isWhite ? 'PREPRESS' : 'SYS'}
                  </span>
                </div>

                {/* Main Asymmetric Organic Card Container */}
                <div
                  className={`${cardTheme.cardBg} ${asymmetricShape} p-7 sm:p-9 space-y-6 flex-1 flex flex-col justify-between transition-all duration-300 group-hover:scale-[1.01]`}
                >
                  <div className="space-y-4">
                    {/* Top Meta Line with Arrow */}
                    <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                      <span className={`text-xs font-mono font-bold tracking-widest uppercase ${cardTheme.metaText}`}>
                        {idx === 0
                          ? (lang === 'en' ? 'IDENTITY · PACKAGING · GOVERNANCE' : 'هویت برند · بسته‌بندی · راهبری')
                          : idx === 1
                          ? (lang === 'en' ? 'GLOBAL TRADE SHOW PRESENCE' : 'حضور بین‌المللی نمایشگاهی · پاویون ۳D')
                          : idx === 2
                          ? (lang === 'en' ? 'ISO 12647-2 CERTIFIED PRE-PRESS' : 'استاندارد لیتوگرافی و چاپ افست')
                          : (lang === 'en' ? '3D CGI · ADVANCED RENDERING' : 'رندرینگ ۳D · شبیه‌سازی محصول')}
                      </span>
                      <ArrowUpRight className={`w-5 h-5 ${cardTheme.metaText} group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform`} />
                    </div>

                    {/* Headline Title */}
                    <h3 className={`text-2xl sm:text-3xl font-black tracking-tight leading-tight ${cardTheme.titleText}`}>
                      {isFa ? dossier.titleFa : dossier.titleEn}
                    </h3>

                    {/* Human Designer Subtitle Hook */}
                    <p className={`text-xs sm:text-sm ${cardTheme.subtitleText}`}>
                      {isFa ? dossier.subtitleFa : dossier.subtitleEn}
                    </p>

                    {/* Summary Description */}
                    <p className={`text-xs sm:text-sm leading-relaxed ${cardTheme.descText}`}>
                      {isFa ? dossier.descFa : dossier.descEn}
                    </p>

                    {/* Tangible Deliverables Check Grid */}
                    <div className="space-y-2 pt-2">
                      <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${cardTheme.metaText}`}>
                        {lang === 'en' ? 'Standard Deliverables:' : 'اقلام تحویلی استاندارد:'}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(isFa ? dossier.deliverablesFa : dossier.deliverablesEn).map((del, dIdx) => (
                          <div
                            key={dIdx}
                            className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold ${cardTheme.deliverableBg}`}
                          >
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${cardTheme.deliverableCheck}`} />
                            <span className="truncate">{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar: Action Button + Atelier Quality Stamp */}
                  <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onNavigate('work')}
                      className={`px-5 py-2.5 rounded-full text-xs font-black font-display inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs ${cardTheme.actionBtn}`}
                    >
                      <span>{isFa ? dossier.actionTextFa : dossier.actionTextEn}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </button>

                    {/* Quality Stamp Pill */}
                    <div
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${cardTheme.stampBorder} ${cardTheme.stampBg} inline-flex items-center gap-1.5`}
                    >
                      <span>
                        {idx === 0
                          ? '✔ 99.4% Production Success'
                          : idx === 1
                          ? '1:1 Print Scale Proof'
                          : idx === 2
                          ? 'ISO 12647-2 Certified'
                          : 'Photorealistic 3D'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. WHO WE PARTNER WITH (Client Business Archetypes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider block">
            {lang === 'en' ? 'Ideal Collaboration Fits' : 'مناسب برای چه مجموعه‌هایی؟'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
            {lang === 'en'
              ? 'Tailored for Distinct Commercial Arenas'
              : 'این خدمات برای چه کسب‌وکارهایی بالاترین بازدهی را دارد؟'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {clientProfiles.map((profile, pIdx) => {
            const Icon = profile.icon;
            return (
              <div
                key={pIdx}
                className="bg-white rounded-2xl border border-neutral-200/90 p-6 space-y-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-display">
                      {isFa ? profile.tagFa : profile.tagEn}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-neutral-950 leading-snug">
                    {isFa ? profile.titleFa : profile.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                    {isFa ? profile.descFa : profile.descEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer font-display"
                  >
                    <span>{lang === 'en' ? 'Start a conversation' : 'گفتگو پیرامون پروژه'}</span>
                    <ArrowIcon className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. TANGIBLE CRAFT & TECHNICAL PROOF (What AI Can Never Replicate) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-10 md:p-14 space-y-8 relative overflow-hidden border border-neutral-800">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
              // PRODUCTION ATELIER · PHYSICAL PROOF
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug">
              {lang === 'en'
                ? 'Crafted for Physical Manufacturing & Pressrooms'
                : 'اصالت کارگاهی، درک فیزیک کاغذ و تسلط بر چاپ صنعتی'}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-medium">
              {lang === 'en'
                ? 'Design on a screen is only half the battle. Every dieline, foil stamp, and catalog page is engineered with deep prepress knowledge gained through years on factory floors and pressrooms.'
                : 'دیزاین روی مانیتور تنها نیمی از مسیر است. هر خط تیغ، سررسید نفیس، جعبه مقوایی و کاتالوگی که طراحی می‌کنم، بر پایه تجربیات عملی کارگاهی و ۲+ سال نظارت تخصصی لیتوگرافی در چاپخانه خیام آماده می‌شود؛ بدون خطای رنگی، بدون شکستگی مقوا در تیغ‌زنی و با بیشترین جلوه در دست مخاطب.'}
            </p>
          </div>

          {/* Technical Proof Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono font-bold">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-indigo-400 block text-[11px]">// PREPRESS</span>
              <span className="text-white block font-display">
                {lang === 'en' ? 'CMYK Separation' : 'تفکیک رنگ CMYK'}
              </span>
              <span className="text-[10px] text-neutral-400 block">
                {lang === 'en' ? 'Dot Gain & Density Control' : 'کنترل ترام و دانسیته'}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-emerald-400 block text-[11px]">// PANTONE</span>
              <span className="text-white block font-display">
                {lang === 'en' ? 'Spot & Metallic Inks' : 'رنگ‌های اسپات و متالیک'}
              </span>
              <span className="text-[10px] text-neutral-400 block">
                {lang === 'en' ? 'Hot Foil & Selective UV' : 'فویل طلاکوب و یووی موضعی'}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-amber-400 block text-[11px]">// DIELINES</span>
              <span className="text-white block font-display">
                {lang === 'en' ? 'Packaging Geometry' : 'هندسه خط تیغ و لچکی'}
              </span>
              <span className="text-[10px] text-neutral-400 block">
                {lang === 'en' ? 'Paper Grain Alignment' : 'محاسبه خواب الیاف مقوا'}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-sky-400 block text-[11px]">// 3D EXPO</span>
              <span className="text-white block font-display">
                {lang === 'en' ? 'Pavilion Structures' : 'پاویون و استراکچر'}
              </span>
              <span className="text-[10px] text-neutral-400 block">
                {lang === 'en' ? 'Shelf Angles & Lighting' : 'رندرهای شلف و نمایشگاه'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SELECTED CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider">
              {lang === 'en' ? 'Portfolio Artifacts' : 'پروژه‌های شاخص'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-neutral-950 tracking-tight">
              {lang === 'en' ? 'Featured Client Case Studies' : 'گزیده‌ای از سوابق و پروژه‌های شاخص'}
            </h2>
          </div>

          <button
            onClick={() => onNavigate('work')}
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 hover:text-indigo-600 transition-colors cursor-pointer font-display"
          >
            <span>{lang === 'en' ? 'View All Projects' : 'مشاهده تمامی پروژه‌ها و آرشیو'}</span>
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
                  <span className="text-xs font-bold text-neutral-900 block font-display">
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
                  <span className="font-bold text-neutral-950 group-hover:text-indigo-600 transition-colors font-display">
                    {lang === 'en' ? 'Explore Case Study →' : 'بررسی مطالعه موردی ←'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WARM HUMAN CALL TO ACTION / DIRECT CONSULTATION (Inspired by Tarahi Online) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-neutral-900 via-slate-900 to-neutral-950 text-white rounded-3xl p-8 sm:p-12 md:p-16 space-y-8 shadow-xl border border-neutral-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold font-display">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>{lang === 'en' ? 'Direct Designer Access' : 'مشاوره صمیمی و بدون تعارف'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {lang === 'en'
                ? 'For Starters, a Simple Direct Conversation is All It Takes'
                : 'برای شروع، فقط یک گفت‌وگوی ساده و صمیمی کافی است'}
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-medium">
              {lang === 'en'
                ? 'Whether you are launching a new consumer line, engineering a technical parts catalog, or redesigning an outdated mark — let’s connect directly on Telegram, WhatsApp, or phone to explore the best path forward.'
                : 'اگر هنوز مطمئن نیستید پروژه شما به چه سطحی از سرمایه‌گذاری، چه نوع متریال چاپی یا چه ابعادی از دیزاین نیاز دارد، در تلگرام پیام بدهید یا تماس بگیرید تا چالش برند شما را با هم بررسی کنیم.'}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            {/* Direct Call Button */}
            <a
              href={`tel:${PROFILE_DATA.links.phone}`}
              className="px-6 py-3.5 bg-white text-neutral-950 hover:bg-neutral-100 font-black text-sm rounded-full transition-all flex items-center gap-2 shadow-md cursor-pointer font-display"
            >
              <Phone className="w-4 h-4 text-neutral-950" />
              <span>{lang === 'en' ? 'Direct Call' : 'تماس مستقیم تلفنی'}</span>
            </a>

            {/* Direct Telegram Button */}
            <a
              href={PROFILE_DATA.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-black text-sm rounded-full transition-all flex items-center gap-2 shadow-md cursor-pointer font-display"
            >
              <Send className="w-4 h-4 text-white" />
              <span>{lang === 'en' ? 'Telegram' : 'تلگرام'}</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href={PROFILE_DATA.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-full transition-all flex items-center gap-2 shadow-md cursor-pointer font-display"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp</span>
            </a>

            {/* Contact Page Link */}
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-full border border-white/20 transition-all cursor-pointer font-display"
            >
              <span>{lang === 'en' ? 'View Contact Details' : 'فرم استعلام و جزییات تماس'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
