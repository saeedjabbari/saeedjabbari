import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Compass,
  FileText,
  HardHat,
  Layers,
  LayoutGrid,
  List,
  MapPin,
  Maximize2,
  MessageCircle,
  Minimize2,
  Package,
  Phone,
  Search,
  Send,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react';
import { EXPERIENCE_DATA, PROFILE_DATA } from '../data/portfolioData';
import { ExperienceItem, Language, PageId } from '../types';

interface ExperiencePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

type FilterCategory = 'all' | 'flagship' | 'brand_digital' | 'packaging_3d' | 'editorial_print' | 'civil_engineering';
type ViewMode = 'proportional_bento' | 'timeline';

interface ScopeScaleMeta {
  tier: 'flagship' | 'significant' | 'focused';
  scopeBadgeFa: string;
  scopeBadgeEn: string;
  scopeMetricFa: string;
  scopeMetricEn: string;
  colSpanDesktop: string;
  isHighImpact: boolean;
}

// Explicit reverse-chronological rank (Newest 2025/1404 -> Oldest 2015/1394)
const EXPERIENCE_CHRONO_MAP: Record<string, number> = {
  exp_rst: 202505, // 2023 – Present (Ongoing)
  exp_tanabi: 202504, // October 2024 – May 2025 (مهر ۱۴۰۳ تا اردیبهشت ۱۴۰۴)
  exp_khesht_avval: 202503, // October 2024 – May 2025 (مهر ۱۴۰۳ تا اردیبهشت ۱۴۰۴)
  exp_pransa: 202412, // December 2024 (آذر ۱۴۰۳)
  exp_urmia_fda: 202409, // August – September 2024 (مرداد تا شهریور ۱۴۰۳)
  exp_urmia_med_uni: 202406, // April – June 2024 (فروردین تا خرداد ۱۴۰۳)
  exp_ofogh_iranian: 202405, // December 2023 – July 2024 (آذر ۱۴۰۲ تا تیر ۱۴۰۳)
  exp_maral: 202404, // 2023 – 2024 (۱۴۰۲ - ۱۴۰۳)
  exp_nuve: 202403, // 2023 – 2024 (۱۴۰۲ - ۱۴۰۳)
  exp_khayyam_print: 202402, // January 2022 – March 2024 (دی ۱۴۰۰ تا اسفند ۱۴۰۲)
  exp_cic_nowhere: 202311, // September – November 2023 (شهریور تا آبان ۱۴۰۲)
  exp_spoota: 202306, // 2022 – 2023 (۱۴۰۱ - ۱۴۰۲)
  exp_behrad: 202303, // March 2020 – March 2023 (اسفند ۱۳۹۸ تا اسفند ۱۴۰۱)
  exp_urmia_municipality: 202002, // December 2018 – February 2020 (آذر ۱۳۹۷ تا بهمن ۱۳۹۸)
  exp_nasb_niroo: 201812, // September 2016 – December 2018 (شهریور ۱۳۹۵ تا آذر ۱۳۹۷)
  exp_ministry_energy: 201609, // April 2015 – September 2016 (فروردین ۱۳۹۴ تا شهریور ۱۳۹۵)
};

const EXPERIENCE_SCALE_MAP: Record<string, ScopeScaleMeta> = {
  exp_urmia_fda: {
    tier: 'flagship',
    scopeBadgeFa: 'وسعت: کتاب جامع ۲۰۰ صفحه‌ای · ۳۱ کارخانه دارویی و تجهیزات پزشکی',
    scopeBadgeEn: 'Scope: 200-Page Comprehensive Catalog · 31 Pharma Manufacturers',
    scopeMetricFa: '۲۰۰ صفحه · ۳۱ شرکت',
    scopeMetricEn: '200 Pgs · 31 Firms',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    isHighImpact: true,
  },
  exp_pransa: {
    tier: 'flagship',
    scopeBadgeFa: 'وسعت: مدل‌سازی و رندرینگ ۳D از ۲۲ محصول · پاویون نمایشگاهی ایران‌مال',
    scopeBadgeEn: 'Scope: Photorealistic 3D Modeling of 22 Products · Iran Mall Expo',
    scopeMetricFa: '۲۲ محصول ۳D · پاویون ایران‌مال',
    scopeMetricEn: '22 3D Models · Expo',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    isHighImpact: true,
  },
  exp_tanabi: {
    tier: 'flagship',
    scopeBadgeFa: 'وسعت: هویت بصری جامع ۳۶۰° + مدیریت مستمر وب‌سایت، محصولات و مقالات',
    scopeBadgeEn: 'Scope: Full 360° Visual Identity + Continuous Web & Product Architecture',
    scopeMetricFa: 'هویت جامع + مدیریت وب و محتوا',
    scopeMetricEn: '360° Brand + Web Ops',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    isHighImpact: true,
  },
  exp_khesht_avval: {
    tier: 'flagship',
    scopeBadgeFa: 'وسعت: هویت برند، سیستم آموزش مهندسی، انتشارات و بسته هدایای نوروز',
    scopeBadgeEn: 'Scope: Brand Identity, Engineering System Prep, Publications & Norouz Gifts',
    scopeMetricFa: 'هویت سازمانی + انتشارات و نوروز',
    scopeMetricEn: 'Brand + Publications',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    isHighImpact: true,
  },
  exp_maral: {
    tier: 'flagship',
    scopeBadgeFa: 'ایمپکت: ۳۱۰K+ بازدید ویدئو محصول · هدایت هنری، تلفیق AI و کاتالوگ صادراتی',
    scopeBadgeEn: 'Impact: 310K+ Organic Video Views · AI Art Direction & Export Collateral',
    scopeMetricFa: '۳۱۰K+ ویو · تلفیق AI',
    scopeMetricEn: '310K+ Views · AI Synthesis',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    isHighImpact: true,
  },
  exp_rst: {
    tier: 'flagship',
    scopeBadgeFa: 'وسعت: کاتالوگ جامع قطعات و محورهای سنگین · موشن‌گرافیک قطعات و بازرگانی بین‌المللی',
    scopeBadgeEn: 'Scope: Comprehensive Axle Parts Catalog · Exploded Motion & Foreign Trade',
    scopeMetricFa: 'کاتالوگ جامع قطعات · موشن صادرات',
    scopeMetricEn: 'Axle Catalog · B2B Motion',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    isHighImpact: true,
  },
  exp_spoota: {
    tier: 'flagship',
    scopeBadgeFa: 'وسعت: هویت یکپارچه هلدینگ مادر · غرفه بین‌المللی، بسته‌بندی و سررسید سازمانی',
    scopeBadgeEn: 'Scope: Holding Visual Governance · International Expo Pavilion & Packaging',
    scopeMetricFa: 'هلدینگ مادر + پاویون بین‌المللی',
    scopeMetricEn: 'Conglomerate Brand + Expo',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    isHighImpact: true,
  },
  exp_khayyam_print: {
    tier: 'significant',
    scopeBadgeFa: 'وسعت: ۲+ سال فعالیت تخصصی پیش‌ازچاپ، تفکیک رنگ CMYK و نظارت لیتوگرافی',
    scopeBadgeEn: 'Scope: 2+ Years Prepress Plate Supervision, Dielines & CMYK Separation',
    scopeMetricFa: '۲+ سال لیتوگرافی و چاپ افست',
    scopeMetricEn: '2+ Yrs Prepress & Offset',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_behrad: {
    tier: 'significant',
    scopeBadgeFa: 'وسعت: ۳ سال طراحی کاتالوگ‌های شرکتی، هویت برند و اوراق اداری تجاری',
    scopeBadgeEn: 'Scope: 3 Years Corporate Print Publications & Multi-Industry Collateral',
    scopeMetricFa: '۳ سال انتشارات و چاپ تجاری',
    scopeMetricEn: '3 Yrs Commercial Print',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_cic_nowhere: {
    tier: 'significant',
    scopeBadgeFa: 'وسعت: ۴ هویت بصری مستقل برای واحدهای تخصصی رمزارز، نرم‌افزار، مارکتینگ و استودیو',
    scopeBadgeEn: 'Scope: 4 Dedicated Brand Units (Crypto, Software, Marketing, Design)',
    scopeMetricFa: '۴ واحد سازمانی و برند مستقل',
    scopeMetricEn: '4 Dedicated Brand Units',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_ofogh_iranian: {
    tier: 'significant',
    scopeBadgeFa: 'وسعت: ۸ ماه کمپین‌های تبلیغاتی چندکاناله، هویت بصری و گرافیک تجاری',
    scopeBadgeEn: 'Scope: 8 Months Multi-Channel Marketing Campaigns & Client Branding',
    scopeMetricFa: 'کمپین‌های چندکاناله بازاریابی',
    scopeMetricEn: 'Multi-Channel Campaigns',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_urmia_med_uni: {
    tier: 'focused',
    scopeBadgeFa: 'وسعت: طراحی نشان تجاری رسمی و گایدلاین هویت معاونت پژوهش و فناوری',
    scopeBadgeEn: 'Scope: Official Emblem, Typography & Identity Manual for Academic Deputy',
    scopeMetricFa: 'نشان رسمی و تایپوگرافی',
    scopeMetricEn: 'Official Academic Mark',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_nuve: {
    tier: 'focused',
    scopeBadgeFa: 'وسعت: طراحی شیشه، استراکچر هاردباکس لوکس VIP و تصاویر محصول',
    scopeBadgeEn: 'Scope: Prestige Shimmer Lotion Structural Labeling & VIP Rigid Box',
    scopeMetricFa: 'بسته‌بندی هاردباکس لوکس',
    scopeMetricEn: 'Prestige VIP Box',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_urmia_municipality: {
    tier: 'focused',
    scopeBadgeFa: 'پیشینه: مدیریت فنی و نظارت بر پروژه‌های زیرساختی و عمرانی شهری',
    scopeBadgeEn: 'Roots: Municipal Infrastructure & Urban Civil Engineering Supervision',
    scopeMetricFa: 'پروژه‌های زیرساختی شهری',
    scopeMetricEn: 'Urban Infrastructure',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_nasb_niroo: {
    tier: 'focused',
    scopeBadgeFa: 'پیشینه: نظارت بر سازه‌های سنگین نیروگاهی بتنی و فلزی و کنترل کیفی',
    scopeBadgeEn: 'Roots: Heavy Power Plant Concrete & Steel Quality Control',
    scopeMetricFa: 'احداث نیروگاه و سازه بتنی',
    scopeMetricEn: 'Power Plant QC',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_ministry_energy: {
    tier: 'focused',
    scopeBadgeFa: 'پیشینه: سدسازی، مدیریت منابع آب و بررسی نقشه‌های هیدرولیکی',
    scopeBadgeEn: 'Roots: Hydraulic Dam Construction & Geotechnical Soil Mechanics',
    scopeMetricFa: 'سدسازی و منابع آب',
    scopeMetricEn: 'Dam Hydraulics',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
};

export const ExperiencePage: React.FC<ExperiencePageProps> = ({
  lang,
  onNavigate,
}) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('proportional_bento');

  // Track expanded cards; flagship cards are open by default
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    exp_tanabi: true,
    exp_khesht_avval: true,
    exp_pransa: true,
    exp_urmia_fda: true,
    exp_rst: true,
    exp_maral: true,
  });

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleAll = (expand: boolean) => {
    const updated: Record<string, boolean> = {};
    if (expand) {
      EXPERIENCE_DATA.forEach((item) => {
        updated[item.id] = true;
      });
    }
    setExpandedCards(updated);
  };

  const isAllExpanded = useMemo(() => {
    return EXPERIENCE_DATA.length > 0 && EXPERIENCE_DATA.every((item) => expandedCards[item.id]);
  }, [expandedCards]);

  const categories: {
    id: FilterCategory;
    labelEn: string;
    labelFa: string;
    icon: React.ElementType;
    activeColor: string;
    activeBadge: string;
  }[] = [
    {
      id: 'all',
      labelEn: 'All Records',
      labelFa: 'همه سوابق',
      icon: Briefcase,
      activeColor: 'bg-slate-950 text-white shadow-xs',
      activeBadge: 'bg-slate-800 text-white',
    },
    {
      id: 'flagship',
      labelEn: 'Flagship & Major Scope',
      labelFa: 'پروژه‌های کلان و شاخص',
      icon: Star,
      activeColor: 'bg-indigo-600 text-white shadow-xs',
      activeBadge: 'bg-indigo-700 text-white',
    },
    {
      id: 'brand_digital',
      labelEn: 'Brand & Digital Systems',
      labelFa: 'هویت برند و دیجیتال',
      icon: Sparkles,
      activeColor: 'bg-violet-600 text-white shadow-xs',
      activeBadge: 'bg-violet-700 text-white',
    },
    {
      id: 'packaging_3d',
      labelEn: 'Packaging & 3D Visualization',
      labelFa: 'بسته‌بندی و ۳D',
      icon: Package,
      activeColor: 'bg-emerald-600 text-white shadow-xs',
      activeBadge: 'bg-emerald-700 text-white',
    },
    {
      id: 'editorial_print',
      labelEn: 'Catalogs & Prepress',
      labelFa: 'کاتالوگ و چاپ',
      icon: Layers,
      activeColor: 'bg-rose-600 text-white shadow-xs',
      activeBadge: 'bg-rose-700 text-white',
    },
    {
      id: 'civil_engineering',
      labelEn: 'Civil Engineering Roots',
      labelFa: 'پیشینه مهندسی عمران',
      icon: HardHat,
      activeColor: 'bg-sky-600 text-white shadow-xs',
      activeBadge: 'bg-sky-700 text-white',
    },
  ];

  // Filter and sort chronologically (Newest to Oldest)
  const filteredExperiences = useMemo(() => {
    const list = EXPERIENCE_DATA.filter((item) => {
      // Category check
      if (activeCategory === 'flagship') {
        const meta = EXPERIENCE_SCALE_MAP[item.id];
        if (!meta || meta.tier !== 'flagship') return false;
      } else if (activeCategory !== 'all') {
        if (item.category !== activeCategory) return false;
      }

      // Search query check
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchCompany =
        item.company.en.toLowerCase().includes(q) ||
        item.company.fa.toLowerCase().includes(q);
      const matchRole =
        item.role.en.toLowerCase().includes(q) ||
        item.role.fa.toLowerCase().includes(q);
      const matchSummary =
        item.summary.en.toLowerCase().includes(q) ||
        item.summary.fa.toLowerCase().includes(q);
      const matchLocation =
        item.location.en.toLowerCase().includes(q) ||
        item.location.fa.toLowerCase().includes(q);
      const matchBadge = item.badge?.toLowerCase().includes(q);

      return matchCompany || matchRole || matchSummary || matchLocation || matchBadge;
    });

    // Sort strictly from Newest to Oldest
    return [...list].sort((a, b) => {
      const scoreA = EXPERIENCE_CHRONO_MAP[a.id] || 0;
      const scoreB = EXPERIENCE_CHRONO_MAP[b.id] || 0;
      return scoreB - scoreA;
    });
  }, [activeCategory, searchQuery]);

  // Design track vs civil engineering track (both sorted newest to oldest)
  const designExperiences = useMemo(
    () => filteredExperiences.filter((item) => item.category !== 'civil_engineering'),
    [filteredExperiences]
  );

  const engineeringExperiences = useMemo(
    () => filteredExperiences.filter((item) => item.category === 'civil_engineering'),
    [filteredExperiences]
  );

  // Vibrant, tasteful category color coding with distinct accents
  const getCategoryTheme = (category?: string, tier?: 'flagship' | 'significant' | 'focused') => {
    if (tier === 'flagship') {
      return {
        badge: 'bg-indigo-50 text-indigo-900 border-indigo-200/90 font-bold',
        dot: 'bg-indigo-600',
        borderHover: 'hover:border-indigo-400 hover:shadow-indigo-500/10',
        ring: 'ring-1 ring-indigo-200/60',
        counterBg: 'bg-indigo-600 text-white shadow-xs',
        scopeBg: 'bg-indigo-50/90 text-indigo-950 border-indigo-200/80',
        scopeIcon: 'text-indigo-600',
        pillBg: 'bg-indigo-900 text-white font-bold',
        deliverableCheck: 'text-indigo-600',
        deliverableDot: 'bg-indigo-500',
        deliverableCard: 'bg-indigo-50/40 border-indigo-100',
      };
    }

    switch (category) {
      case 'packaging_3d':
        return {
          badge: 'bg-emerald-50 text-emerald-900 border-emerald-200/90 font-bold',
          dot: 'bg-emerald-500',
          borderHover: 'hover:border-emerald-400 hover:shadow-emerald-500/10',
          ring: '',
          counterBg: 'bg-emerald-600 text-white',
          scopeBg: 'bg-emerald-50/80 text-emerald-950 border-emerald-200/70',
          scopeIcon: 'text-emerald-600',
          pillBg: 'bg-emerald-800 text-white font-semibold',
          deliverableCheck: 'text-emerald-600',
          deliverableDot: 'bg-emerald-500',
          deliverableCard: 'bg-emerald-50/30 border-emerald-100',
        };
      case 'brand_digital':
        return {
          badge: 'bg-violet-50 text-violet-900 border-violet-200/90 font-bold',
          dot: 'bg-violet-500',
          borderHover: 'hover:border-violet-400 hover:shadow-violet-500/10',
          ring: '',
          counterBg: 'bg-violet-600 text-white',
          scopeBg: 'bg-violet-50/80 text-violet-950 border-violet-200/70',
          scopeIcon: 'text-violet-600',
          pillBg: 'bg-violet-800 text-white font-semibold',
          deliverableCheck: 'text-violet-600',
          deliverableDot: 'bg-violet-500',
          deliverableCard: 'bg-violet-50/30 border-violet-100',
        };
      case 'editorial_print':
        return {
          badge: 'bg-rose-50 text-rose-900 border-rose-200/90 font-bold',
          dot: 'bg-rose-500',
          borderHover: 'hover:border-rose-400 hover:shadow-rose-500/10',
          ring: '',
          counterBg: 'bg-rose-600 text-white',
          scopeBg: 'bg-rose-50/80 text-rose-950 border-rose-200/70',
          scopeIcon: 'text-rose-600',
          pillBg: 'bg-rose-800 text-white font-semibold',
          deliverableCheck: 'text-rose-600',
          deliverableDot: 'bg-rose-500',
          deliverableCard: 'bg-rose-50/30 border-rose-100',
        };
      case 'civil_engineering':
        return {
          badge: 'bg-sky-50 text-sky-900 border-sky-200/90 font-bold',
          dot: 'bg-sky-500',
          borderHover: 'hover:border-sky-400 hover:shadow-sky-500/10',
          ring: '',
          counterBg: 'bg-sky-700 text-white',
          scopeBg: 'bg-sky-50/80 text-sky-950 border-sky-200/70',
          scopeIcon: 'text-sky-600',
          pillBg: 'bg-sky-800 text-white font-semibold',
          deliverableCheck: 'text-sky-600',
          deliverableDot: 'bg-sky-500',
          deliverableCard: 'bg-sky-50/30 border-sky-100',
        };
      default:
        return {
          badge: 'bg-slate-100 text-slate-800 border-slate-200 font-bold',
          dot: 'bg-slate-600',
          borderHover: 'hover:border-slate-400',
          ring: '',
          counterBg: 'bg-slate-800 text-white',
          scopeBg: 'bg-slate-100 text-slate-900 border-slate-200',
          scopeIcon: 'text-slate-600',
          pillBg: 'bg-slate-900 text-white font-semibold',
          deliverableCheck: 'text-slate-700',
          deliverableDot: 'bg-slate-500',
          deliverableCard: 'bg-slate-50 border-slate-100',
        };
    }
  };

  // Render a single card with dynamic proportional scale and vibrant theme
  const renderProportionalCard = (item: ExperienceItem, idx: number) => {
    const isExpanded = expandedCards[item.id] ?? false;
    const scaleMeta = EXPERIENCE_SCALE_MAP[item.id] || {
      tier: 'significant',
      scopeBadgeFa: item.type.fa,
      scopeBadgeEn: item.type.en,
      scopeMetricFa: item.type.fa,
      scopeMetricEn: item.type.en,
      colSpanDesktop: 'col-span-1',
      isHighImpact: false,
    };

    const isFlagship = scaleMeta.tier === 'flagship';
    const isFocused = scaleMeta.tier === 'focused';
    const theme = getCategoryTheme(item.category, scaleMeta.tier);
    const isCivil = item.category === 'civil_engineering';
    const highlights = item.highlights[lang] || [];

    // Flagship cards span 2 columns on desktop to reflect their high volume and scale
    const colSpanClass = isFlagship ? 'col-span-1 md:col-span-2 lg:col-span-2' : 'col-span-1';

    return (
      <div
        key={item.id}
        className={`${colSpanClass} group bg-white rounded-2xl border transition-all duration-300 shadow-2xs hover:shadow-lg flex flex-col justify-between ${
          isFlagship
            ? 'border-indigo-200/90 ring-1 ring-indigo-100/70 bg-linear-to-b from-indigo-50/15 via-white to-white p-5 sm:p-7'
            : isCivil
            ? 'border-sky-200/80 bg-linear-to-b from-sky-50/15 to-white p-4 sm:p-5'
            : isFocused
            ? 'border-neutral-200/80 bg-white p-4 sm:p-5'
            : 'border-neutral-200 bg-white p-5 sm:p-6'
        } ${theme.borderHover} gap-4`}
      >
        {/* Top Scope / Scale Bar */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center ${theme.counterBg}`}
              >
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>

              {isFlagship && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[11px] font-display shadow-2xs">
                  <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                  <span>{lang === 'en' ? 'Flagship Scope' : 'پروژه کلان و شاخص'}</span>
                </span>
              )}

              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border font-display flex items-center gap-1.5 ${theme.badge}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                <span>{item.badge}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-600 bg-neutral-100/90 px-3 py-1 rounded-full border border-neutral-200/70 font-display flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>{item.period[lang]}</span>
              </span>
            </div>
          </div>

          {/* Explicit Scope & Volume Indicator Tag */}
          <div className="flex items-center gap-2">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold font-display border ${theme.scopeBg}`}
            >
              <TrendingUp className={`w-3.5 h-3.5 ${theme.scopeIcon}`} />
              <span>{lang === 'en' ? scaleMeta.scopeBadgeEn : scaleMeta.scopeBadgeFa}</span>
            </div>
          </div>

          {/* Company Name & Role Title */}
          <div className="space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h3
                className={`font-black text-neutral-950 tracking-tight leading-snug group-hover:text-indigo-900 transition-colors ${
                  isFlagship ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
                }`}
              >
                {item.company[lang]}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                <MapPin className="w-3 h-3 text-neutral-400" />
                <span>{item.location[lang]}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className={`px-2.5 py-1 text-xs font-bold rounded-lg font-display ${theme.pillBg}`}>
                {item.role[lang]}
              </span>
              <span className="text-neutral-400 text-xs font-medium">·</span>
              <span className="text-neutral-600 text-xs font-semibold">{item.type[lang]}</span>
            </div>
          </div>
        </div>

        {/* Narrative Summary */}
        <div className="space-y-2 grow">
          <p
            className={`text-neutral-700 leading-relaxed font-medium ${
              isFlagship ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
            }`}
          >
            {item.summary[lang]}
          </p>
        </div>

        {/* Key Achievements & Deliverables (Proportional Display) */}
        {highlights.length > 0 && (
          <div className="pt-2 border-t border-neutral-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-600 font-display flex items-center gap-1.5">
                <CheckCircle2 className={`w-3.5 h-3.5 ${theme.deliverableCheck}`} />
                <span>
                  {lang === 'en'
                    ? `Scope & Achievements (${highlights.length})`
                    : `دستاوردها و دامنه مسئولیت‌ها (${highlights.length} مورد)`}
                </span>
              </span>

              <button
                type="button"
                onClick={() => toggleExpand(item.id)}
                className="text-xs font-bold text-neutral-600 hover:text-neutral-950 inline-flex items-center gap-1 py-1 px-2 rounded-md hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <span>
                  {isExpanded
                    ? lang === 'en'
                      ? 'Collapse details'
                      : 'بستن جزئیات'
                    : lang === 'en'
                    ? 'View all deliverables'
                    : 'مشاهده همه موارد'}
                </span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* In flagship cards, we show key highlights; when expanded we show all of them */}
            <div className={`space-y-1.5 ${isFlagship && !isExpanded ? 'block' : ''}`}>
              {(isExpanded
                ? highlights
                : isFlagship
                ? highlights.slice(0, 3)
                : []
              ).map((hl, hIdx) => (
                <div
                  key={hIdx}
                  className={`p-2.5 rounded-xl border flex items-start gap-2.5 text-xs text-neutral-800 leading-relaxed ${theme.deliverableCard}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${theme.deliverableDot}`} />
                  <span className="font-medium">{hl}</span>
                </div>
              ))}

              {isFlagship && !isExpanded && highlights.length > 3 && (
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  className="text-xs font-bold text-indigo-700 hover:text-indigo-900 pt-1 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>
                    {lang === 'en'
                      ? `+ ${highlights.length - 3} more deliverables...`
                      : `+ ${highlights.length - 3} دستاورد و مسئولیت دیگر...`}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Timeline Stream Render with Colorful Nodes
  const renderTimelineItem = (item: ExperienceItem, idx: number) => {
    const isExpanded = expandedCards[item.id] ?? false;
    const scaleMeta = EXPERIENCE_SCALE_MAP[item.id] || {
      tier: 'significant',
      scopeBadgeFa: item.type.fa,
      scopeBadgeEn: item.type.en,
      scopeMetricFa: item.type.fa,
      scopeMetricEn: item.type.en,
      colSpanDesktop: 'col-span-1',
      isHighImpact: false,
    };

    const isFlagship = scaleMeta.tier === 'flagship';
    const theme = getCategoryTheme(item.category, scaleMeta.tier);
    const highlights = item.highlights[lang] || [];

    return (
      <div key={item.id} className="relative pl-6 sm:pl-8 rtl:pl-0 rtl:pr-6 rtl:sm:pr-8 pb-8 group">
        {/* Timeline Connecting Line */}
        <div className="absolute top-2 bottom-0 left-2 rtl:left-auto rtl:right-2 w-0.5 bg-neutral-200 group-last:hidden" />

        {/* Node Dot with Category Color */}
        <div
          className={`absolute top-1.5 left-0 rtl:left-auto rtl:right-0 w-5 h-5 rounded-full border-2 border-white shadow-xs flex items-center justify-center ${theme.counterBg} ring-4 ring-neutral-100`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>

        {/* Timeline Card */}
        <div
          className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all shadow-2xs hover:shadow-md space-y-3.5 ${
            isFlagship
              ? 'border-indigo-200/90 ring-1 ring-indigo-100/70 bg-linear-to-b from-indigo-50/10 to-white'
              : 'border-neutral-200/90'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-neutral-400">
                #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>
              <h3 className="font-black text-neutral-950 text-base sm:text-lg">
                {item.company[lang]}
              </h3>
              {isFlagship && (
                <span className="px-2 py-0.5 bg-indigo-600 text-white font-bold text-[10px] rounded-full">
                  {lang === 'en' ? 'Flagship' : 'پروژه کلان'}
                </span>
              )}
            </div>

            <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
              {item.period[lang]}
            </span>
          </div>

          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${theme.scopeBg}`}>
            <TrendingUp className={`w-3.5 h-3.5 ${theme.scopeIcon}`} />
            <span>{lang === 'en' ? scaleMeta.scopeBadgeEn : scaleMeta.scopeBadgeFa}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md ${theme.pillBg}`}>
              {item.role[lang]}
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-600 font-semibold">{item.type[lang]}</span>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-neutral-400" />
              {item.location[lang]}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
            {item.summary[lang]}
          </p>

          {highlights.length > 0 && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => toggleExpand(item.id)}
                className="text-xs font-bold text-neutral-700 hover:text-neutral-950 inline-flex items-center gap-1.5 cursor-pointer py-1"
              >
                <span>
                  {isExpanded
                    ? lang === 'en'
                      ? 'Hide details'
                      : 'بستن جزئیات'
                    : lang === 'en'
                    ? `Show all ${highlights.length} deliverables`
                    : `مشاهده ${highlights.length} دستاورد و مسئولیت`}
                </span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {isExpanded && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 animate-fadeIn">
                  {highlights.map((hl, hIdx) => (
                    <div
                      key={hIdx}
                      className={`p-2.5 rounded-xl border flex items-start gap-2 text-xs text-neutral-800 leading-relaxed ${theme.deliverableCard}`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${theme.deliverableCheck}`} />
                      <span className="font-medium">{hl}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12 ${isFa ? 'text-right' : 'text-left'}`}>
      {/* 1. PAGE HEADER */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs font-bold font-display uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-indigo-600" />
          <span>{lang === 'en' ? 'Professional Career & Impact' : 'سوابق سازمانی بر اساس جدیدترین به قدیمی‌ترین'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
          {lang === 'en'
            ? 'Professional Experience & Career Record'
            : 'سوابق حرفه‌ای، پروژه‌های شاخص و مجموعه‌ها'}
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium">
          {lang === 'en'
            ? 'Arranged chronologically from the newest engagements down to foundational milestones — with visual scale proportional to the depth, volume, and quality of each role.'
            : 'دسته‌بندی منظم از جدیدترین سوابق (۱۴۰۴-۱۴۰۳) تا پیشینه‌های مهندسی با مقیاس بصری متناسب با وسعت و کیفیت عملکرد در هر حوزه.'}
        </p>
      </div>

      {/* 2. SCALE OVERVIEW METRIC CHIPS (Vibrant & Strictly Bilingual) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 p-5 sm:p-6 bg-linear-to-r from-slate-950 via-slate-900 to-zinc-950 text-white rounded-2xl border border-slate-800 shadow-sm">
        <div className="space-y-1 p-3 rounded-xl bg-white/5 border border-white/5">
          <span className="text-xl sm:text-2xl font-black font-display text-indigo-400">
            {isFa ? '۷ موقعیت' : '7 Flagships'}
          </span>
          <span className="text-[11px] text-neutral-300 font-bold block">
            {lang === 'en' ? 'Flagship & Major Scope' : 'پروژه‌های کلان، ۳۶۰° و شاخص'}
          </span>
        </div>
        <div className="space-y-1 p-3 rounded-xl bg-white/5 border border-white/5">
          <span className="text-xl sm:text-2xl font-black font-display text-rose-400">
            {isFa ? '۲۰۰ صفحه' : '200 Pages'}
          </span>
          <span className="text-[11px] text-neutral-300 font-bold block">
            {lang === 'en' ? 'Medical Equipment Catalog' : 'کتاب مرجع ۳۱ کارخانه دارویی'}
          </span>
        </div>
        <div className="space-y-1 p-3 rounded-xl bg-white/5 border border-white/5">
          <span className="text-xl sm:text-2xl font-black font-display text-emerald-400">
            {isFa ? '۲۲ محصول' : '22 Products'}
          </span>
          <span className="text-[11px] text-neutral-300 font-bold block">
            {lang === 'en' ? '3D Cosmetic Visualizations' : 'مدل‌سازی و رندرینگ سه‌بعدی شلف'}
          </span>
        </div>
        <div className="space-y-1 p-3 rounded-xl bg-white/5 border border-white/5">
          <span className="text-xl sm:text-2xl font-black font-display text-sky-400">
            {isFa ? 'کارشناسی ارشد' : 'M.Sc.'}
          </span>
          <span className="text-[11px] text-neutral-300 font-bold block">
            {lang === 'en' ? 'Civil Engineering Rigor' : 'فوق‌لیسانس مهندسی عمران'}
          </span>
        </div>
      </div>

      {/* 3. CONTROLS BAR: CATEGORIES, SEARCH & VIEW SWITCHER */}
      <div className="space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-neutral-50 p-3 rounded-2xl border border-neutral-200/80">
          {/* Category Filter Pills with Vibrant Active States */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? EXPERIENCE_DATA.length
                  : cat.id === 'flagship'
                  ? Object.values(EXPERIENCE_SCALE_MAP).filter((m) => m.tier === 'flagship').length
                  : EXPERIENCE_DATA.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-display ${
                    isSelected
                      ? cat.activeColor
                      : 'bg-white hover:bg-neutral-200/70 text-neutral-700 border border-neutral-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? cat.labelEn : cat.labelFa}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? cat.activeBadge : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Controls: Search & View Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className={`w-3.5 h-3.5 text-neutral-400 absolute top-1/2 -translate-y-1/2 ${isFa ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'en' ? 'Search records, scope...' : 'جستجو در شرکت، وسعت، نقش...'}
                className={`w-full text-xs font-medium bg-white border border-neutral-200 rounded-xl py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  isFa ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'
                }`}
              />
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-white border border-neutral-200 rounded-xl p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('proportional_bento')}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'proportional_bento' ? 'bg-indigo-600 text-white' : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title={lang === 'en' ? 'Proportional Bento Grid' : 'بنتوگرید متناسب با وسعت'}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('timeline')}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'timeline' ? 'bg-indigo-600 text-white' : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title={lang === 'en' ? 'Timeline Stream' : 'نمایش تایم‌لاین'}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Expand / Collapse All Toggle */}
            <button
              type="button"
              onClick={() => handleToggleAll(!isAllExpanded)}
              className="px-3 py-2 bg-white border border-neutral-200 hover:bg-neutral-100 rounded-xl text-xs font-bold text-neutral-700 transition-colors cursor-pointer flex items-center gap-1.5"
              title={isAllExpanded ? (lang === 'en' ? 'Collapse all' : 'بستن همه') : (lang === 'en' ? 'Expand all' : 'باز کردن همه')}
            >
              {isAllExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">
                {isAllExpanded ? (lang === 'en' ? 'Collapse' : 'بستن همه') : (lang === 'en' ? 'Expand' : 'باز کردن همه')}
              </span>
            </button>
          </div>
        </div>

        {/* Filter State Note */}
        {(activeCategory !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1 font-medium">
            <span>
              {lang === 'en'
                ? `Showing ${filteredExperiences.length} of ${EXPERIENCE_DATA.length} positions (Newest to Oldest)`
                : `نمایش ${filteredExperiences.length} از ${EXPERIENCE_DATA.length} سابقه کاری (به ترتیب از جدیدترین به قدیمی‌ترین)`}
            </span>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer"
            >
              {lang === 'en' ? 'Reset filters' : 'پاک کردن فیلتر'}
            </button>
          </div>
        )}
      </div>

      {/* 4. MAIN CONTENT (PROPORTIONAL BENTO OR TIMELINE) */}
      {viewMode === 'timeline' ? (
        /* TIMELINE STREAM VIEW */
        <div className="space-y-3">
          {filteredExperiences.map((item, idx) => renderTimelineItem(item, idx))}
        </div>
      ) : activeCategory === 'all' && !searchQuery ? (
        /* PROPORTIONAL DUAL-TRACK BENTO GRID */
        <div className="space-y-14">
          {/* Track 1: Design, Brand, 3D & Prepress Track (Sorted Newest to Oldest) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                    {lang === 'en'
                      ? 'Design, Brand & Art Direction Portfolio'
                      : 'سوابق تخصصی دیزاین، هویت برند، کاتالوگ و بسته‌بندی'}
                  </h2>
                  <span className="text-xs text-neutral-500 font-medium">
                    {lang === 'en'
                      ? 'Chronologically arranged (Newest to Oldest) · Flagships span 2 columns'
                      : 'چیدمان زمانی از جدیدترین به قدیمی‌ترین · پروژه‌های کلان در ۲ ستون'}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-neutral-400 font-mono">
                {designExperiences.length} {lang === 'en' ? 'Roles' : 'موقعیت'}
              </span>
            </div>

            {/* DYNAMIC BENTO GRID (Supports 1-col and 2-col cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6">
              {designExperiences.map((item, idx) => renderProportionalCard(item, idx))}
            </div>
          </div>

          {/* Track 2: Civil Engineering Foundation (Blueprint Structure) */}
          <div className="space-y-6">
            <div className="bg-linear-to-r from-slate-900 via-slate-900 to-sky-950 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-3 border border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-400 font-display uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>
                  {lang === 'en'
                    ? 'Engineering Rigor & Structural Mindset'
                    : 'پیشینه تحصیلی و حرفه‌ای مهندسی عمران (M.Sc.)'}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                {lang === 'en'
                  ? 'Civil Engineering & Infrastructure Foundation'
                  : 'سوابق حرفه‌ای پیشین — مهندسی عمران، سازه و مدیریت پروژه'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium max-w-3xl">
                {lang === 'en'
                  ? 'Before dedicating full-time practice to art direction and brand architecture, Saeed worked as a civil engineer on major infrastructure projects. This background provides mathematical precision and blueprint discipline.'
                  : 'پیش از تمرکز تمام‌وقت بر مدیریت هنری و دیزاین، تجربه فعالیت مهندسی در شهرداری، پروژه‌های نیروگاهی و سدسازی، زیربنای تفکر ساختارمند، درک هندسی، تسلط بر نقشه‌های فنی و شناخت محدودیت‌های اجرای صنعتی را شکل داده است.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {engineeringExperiences.map((item, idx) =>
                renderProportionalCard(item, designExperiences.length + idx)
              )}
            </div>
          </div>
        </div>
      ) : (
        /* FILTERED PROPORTIONAL GRID */
        <div>
          {filteredExperiences.length === 0 ? (
            <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-3">
              <p className="text-sm font-bold text-neutral-600">
                {lang === 'en'
                  ? 'No experience records match your search criteria.'
                  : 'هیچ سابقه کاری منطبق با فیلتر جستجوی شما یافت نشد.'}
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
              >
                {lang === 'en' ? 'Show all records' : 'نمایش همه سوابق'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6">
              {filteredExperiences.map((item, idx) => renderProportionalCard(item, idx))}
            </div>
          )}
        </div>
      )}

      {/* 5. DIRECT CONTACT CALLOUT (Icon-First Actions, No Plain Phone Digits) */}
      <section className="bg-linear-to-r from-slate-950 to-neutral-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-neutral-800 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-indigo-400 font-display uppercase tracking-wider block">
              {lang === 'en' ? 'Direct Communication' : 'مشاوره و استعلام مستقیم'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {lang === 'en'
                ? 'Ready to elevate your product communication?'
                : 'آماده همکاری در زمینه ارتقای هویت و ارتباطات بصری محصول'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-medium">
              {lang === 'en'
                ? 'Available for strategic brand identities, 3D packaging visualization, and comprehensive industrial publishing.'
                : 'آماده هدایت هنری پروژه‌ها، خلق سیستم‌های هویت بصری، رندرینگ سه‌بعدی و کاتالوگ‌های جامع صنعتی.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Quick Action Icons */}
            <a
              href={`tel:${PROFILE_DATA.links.phone}`}
              className="p-3 bg-neutral-800/90 hover:bg-neutral-700 text-white rounded-xl transition-colors inline-flex items-center justify-center border border-neutral-700 hover:border-indigo-400"
              title={lang === 'en' ? 'Call Directly' : 'تماس تلفنی'}
              aria-label="Phone"
            >
              <Phone className="w-4 h-4" />
            </a>

            <a
              href={PROFILE_DATA.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-neutral-800/90 hover:bg-neutral-700 text-emerald-400 rounded-xl transition-colors inline-flex items-center justify-center border border-neutral-700 hover:border-emerald-400"
              title="WhatsApp"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <a
              href={PROFILE_DATA.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-neutral-800/90 hover:bg-neutral-700 text-sky-400 rounded-xl transition-colors inline-flex items-center justify-center border border-neutral-700 hover:border-sky-400"
              title="Telegram"
              aria-label="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 rounded-xl bg-white text-neutral-950 hover:bg-neutral-100 font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-2 shadow-xs font-display"
            >
              <span>{lang === 'en' ? 'Contact Page' : 'صفحه تماس و شبکه‌ها'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
