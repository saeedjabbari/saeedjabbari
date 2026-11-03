import React, { useState, useMemo, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Compass,
  HardHat,
  Layers,
  LayoutGrid,
  LineChart,
  MapPin,
  MessageCircle,
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
type LocationFilter = 'all' | 'tehran' | 'urmia' | 'istanbul_global';
type DesktopViewMode = 'timeline_chart' | 'all_grid';

interface ScopeScaleMeta {
  tier: 'flagship' | 'significant' | 'focused';
  scopeBadgeFa: string;
  scopeBadgeEn: string;
  scopeMetricFa: string;
  scopeMetricEn: string;
  yearFa: string;
  yearEn: string;
  timelineYearFa: string;
  timelineYearEn: string;
  volumeScore: number; // 0 - 100 for stock market chart elevation
  locationHub: 'tehran' | 'urmia' | 'istanbul_global';
  cityLabelFa: string;
  cityLabelEn: string;
  tickerFa: string;
  tickerEn: string;
  colSpanDesktop: string;
  isHighImpact: boolean;
}

// Reverse chronological rank in 2026 (Newest 2026/1404 -> Oldest 2016/1395)
const EXPERIENCE_CHRONO_MAP: Record<string, number> = {
  exp_rst: 202601, // 2023 – Present (Active in 2026)
  exp_tanabi: 202505, // October 2024 – May 2025
  exp_khesht_avval: 202504, // October 2024 – May 2025
  exp_pransa: 202412, // December 2024
  exp_urmia_fda: 202409, // August – September 2024
  exp_urmia_med_uni: 202406, // April – June 2024
  exp_ofogh_iranian: 202405, // December 2023 – July 2024
  exp_maral: 202404, // 2023 – 2024
  exp_nuve: 202403, // 2023 – 2024
  exp_cic_nowhere: 202311, // September – November 2023
  exp_spoota: 202306, // 2022 – 2023
  exp_khayyam_print: 202301, // 2022 – 2024
  exp_behrad: 202201, // 2020 – 2023
  exp_urmia_municipality: 201901, // 2018 – 2020
  exp_nasb_niroo: 201701, // 2016 – 2018
  exp_ministry_energy: 201601, // 2015 – 2016
};

const EXPERIENCE_SCALE_MAP: Record<string, ScopeScaleMeta> = {
  exp_rst: {
    tier: 'flagship',
    scopeBadgeFa: 'کاتالوگ جامع قطعات و محورهای سنگین · موشن‌گرافیک قطعات و بازرگانی بین‌المللی',
    scopeBadgeEn: 'Comprehensive Axle Parts Catalog · Exploded Motion & Foreign Trade',
    scopeMetricFa: 'کاتالوگ جامع قطعات · موشن صادرات',
    scopeMetricEn: 'Axle Catalog · B2B Motion',
    yearFa: '۱۴۰۲ - اکنون (۱۴۰۴-۱۴۰۵)',
    yearEn: '2023 – Present (2026)',
    timelineYearFa: '۱۴۰۴ (اکنون)',
    timelineYearEn: '2026 (Now)',
    volumeScore: 96,
    locationHub: 'tehran',
    cityLabelFa: 'تهران و بین‌المللی',
    cityLabelEn: 'Tehran & Global',
    tickerFa: 'راد سامان توس',
    tickerEn: 'RST Trade',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    isHighImpact: true,
  },
  exp_tanabi: {
    tier: 'flagship',
    scopeBadgeFa: 'هویت بصری جامع ۳۶۰° + مدیریت مستمر وب‌سایت، محصولات و مقالات',
    scopeBadgeEn: 'Full 360° Visual Identity + Continuous Web & Product Architecture',
    scopeMetricFa: 'هویت جامع + مدیریت وب و محتوا',
    scopeMetricEn: '360° Brand + Web Ops',
    yearFa: '۱۴۰۳ - ۱۴۰۴',
    yearEn: '2024 – 2025',
    timelineYearFa: '۱۴۰۴',
    timelineYearEn: '2025',
    volumeScore: 92,
    locationHub: 'urmia',
    cityLabelFa: 'ارومیه',
    cityLabelEn: 'Urmia',
    tickerFa: 'بازرگانی تنابی',
    tickerEn: 'Tanabi Group',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    isHighImpact: true,
  },
  exp_khesht_avval: {
    tier: 'flagship',
    scopeBadgeFa: 'هویت برند، سیستم آموزش مهندسی، انتشارات و بسته هدایای نوروز',
    scopeBadgeEn: 'Brand Identity, Engineering System Prep, Publications & Norouz Gifts',
    scopeMetricFa: 'هویت سازمانی + انتشارات و نوروز',
    scopeMetricEn: 'Brand + Publications',
    yearFa: '۱۴۰۳ - ۱۴۰۴',
    yearEn: '2024 – 2025',
    timelineYearFa: '۱۴۰۴',
    timelineYearEn: '2025',
    volumeScore: 88,
    locationHub: 'urmia',
    cityLabelFa: 'ارومیه',
    cityLabelEn: 'Urmia',
    tickerFa: 'خشت اول',
    tickerEn: 'Khesht Avval',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    isHighImpact: true,
  },
  exp_pransa: {
    tier: 'flagship',
    scopeBadgeFa: 'مدل‌سازی و رندرینگ ۳D از ۲۲ محصول · پاویون نمایشگاهی ایران‌مال',
    scopeBadgeEn: 'Photorealistic 3D Modeling of 22 Products · Iran Mall Expo',
    scopeMetricFa: '۲۲ محصول ۳D · پاویون ایران‌مال',
    scopeMetricEn: '22 3D Models · Expo',
    yearFa: '۱۴۰۳',
    yearEn: '2024',
    timelineYearFa: '۱۴۰۳',
    timelineYearEn: '2024',
    volumeScore: 86,
    locationHub: 'tehran',
    cityLabelFa: 'تهران (ایران‌مال)',
    cityLabelEn: 'Tehran (Iran Mall)',
    tickerFa: 'پرانسا کازمتیکس',
    tickerEn: 'Pransa 3D',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    isHighImpact: true,
  },
  exp_urmia_fda: {
    tier: 'flagship',
    scopeBadgeFa: 'کتاب جامع ۲۰۰ صفحه‌ای · ۳۱ کارخانه دارویی و تجهیزات پزشکی',
    scopeBadgeEn: '200-Page Comprehensive Catalog · 31 Pharma Manufacturers',
    scopeMetricFa: '۲۰۰ صفحه · ۳۱ شرکت',
    scopeMetricEn: '200 Pgs · 31 Firms',
    yearFa: '۱۴۰۳',
    yearEn: '2024',
    timelineYearFa: '۱۴۰۳',
    timelineYearEn: '2024',
    volumeScore: 94,
    locationHub: 'urmia',
    cityLabelFa: 'ارومیه',
    cityLabelEn: 'Urmia',
    tickerFa: 'معاونت غذا و دارو',
    tickerEn: 'Urmia FDA',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    isHighImpact: true,
  },
  exp_urmia_med_uni: {
    tier: 'focused',
    scopeBadgeFa: 'طراحی نشان تجاری رسمی و گایدلاین هویت معاونت تحقیقات و فناوری',
    scopeBadgeEn: 'Official Emblem, Typography & Identity Manual for Academic Deputy',
    scopeMetricFa: 'نشان رسمی و تایپوگرافی',
    scopeMetricEn: 'Official Academic Mark',
    yearFa: '۱۴۰۳',
    yearEn: '2024',
    timelineYearFa: '۱۴۰۳',
    timelineYearEn: '2024',
    volumeScore: 55,
    locationHub: 'urmia',
    cityLabelFa: 'ارومیه',
    cityLabelEn: 'Urmia',
    tickerFa: 'علوم پزشکی',
    tickerEn: 'Med Uni',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_ofogh_iranian: {
    tier: 'significant',
    scopeBadgeFa: 'کمپین‌های تبلیغاتی چندکاناله، هویت بصری و گرافیک تجاری',
    scopeBadgeEn: 'Multi-Channel Marketing Campaigns & Client Branding',
    scopeMetricFa: 'کمپین‌های چندکاناله بازاریابی',
    scopeMetricEn: 'Multi-Channel Campaigns',
    yearFa: '۱۴۰۲ - ۱۴۰۳',
    yearEn: '2023 – 2024',
    timelineYearFa: '۱۴۰۳',
    timelineYearEn: '2024',
    volumeScore: 68,
    locationHub: 'urmia',
    cityLabelFa: 'ارومیه',
    cityLabelEn: 'Urmia',
    tickerFa: 'افق ایرانیان',
    tickerEn: 'Ofogh Iranian',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_maral: {
    tier: 'flagship',
    scopeBadgeFa: '۳۱۰K+ بازدید ویدئو محصول · هدایت هنری، تلفیق AI و کاتالوگ صادراتی',
    scopeBadgeEn: '310K+ Organic Video Views · AI Art Direction & Export Collateral',
    scopeMetricFa: '۳۱۰K+ ویو · تلفیق AI',
    scopeMetricEn: '310K+ Views · AI Synthesis',
    yearFa: '۱۴۰۲ - ۱۴۰۳',
    yearEn: '2023 – 2024',
    timelineYearFa: '۱۴۰۳',
    timelineYearEn: '2024',
    volumeScore: 90,
    locationHub: 'istanbul_global',
    cityLabelFa: 'ارومیه و استانبول',
    cityLabelEn: 'Urmia & Istanbul',
    tickerFa: 'مارال تریلر',
    tickerEn: 'Maral Trailer',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    isHighImpact: true,
  },
  exp_nuve: {
    tier: 'significant',
    scopeBadgeFa: 'طراحی شیشه، استراکچر هاردباکس لوکس VIP و عکاسی محصول با AI',
    scopeBadgeEn: 'Prestige Shimmer Lotion Labeling, VIP Rigid Box & AI Imagery',
    scopeMetricFa: 'بسته‌بندی هاردباکس لوکس',
    scopeMetricEn: 'Prestige VIP Box',
    yearFa: '۱۴۰۲ - ۱۴۰۳',
    yearEn: '2023 – 2024',
    timelineYearFa: '۱۴۰۳',
    timelineYearEn: '2024',
    volumeScore: 65,
    locationHub: 'tehran',
    cityLabelFa: 'تهران / دورکاری',
    cityLabelEn: 'Tehran / Remote',
    tickerFa: 'د نووه بیوتی',
    tickerEn: 'The Nuve',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_cic_nowhere: {
    tier: 'significant',
    scopeBadgeFa: '۴ هویت بصری مستقل برای واحدهای تخصصی رمزارز، نرم‌افزار، مارکتینگ و استودیو',
    scopeBadgeEn: '4 Dedicated Brand Units (Crypto, Software, Marketing, Design)',
    scopeMetricFa: '۴ واحد سازمانی و برند مستقل',
    scopeMetricEn: '4 Dedicated Brand Units',
    yearFa: '۱۴۰۲',
    yearEn: '2023',
    timelineYearFa: '۱۴۰۲',
    timelineYearEn: '2023',
    volumeScore: 78,
    locationHub: 'istanbul_global',
    cityLabelFa: 'استانبول و بین‌المللی',
    cityLabelEn: 'Istanbul & Global',
    tickerFa: 'آژانس CIC',
    tickerEn: 'CIC Nowhere',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_spoota: {
    tier: 'flagship',
    scopeBadgeFa: 'هویت یکپارچه هلدینگ مادر · غرفه بین‌المللی، بسته‌بندی و سررسید سازمانی',
    scopeBadgeEn: 'Holding Visual Governance · International Expo Pavilion & Packaging',
    scopeMetricFa: 'هلدینگ مادر + پاویون بین‌المللی',
    scopeMetricEn: 'Conglomerate Brand + Expo',
    yearFa: '۱۴۰۱ - ۱۴۰۲',
    yearEn: '2022 – 2023',
    timelineYearFa: '۱۴۰۲',
    timelineYearEn: '2023',
    volumeScore: 87,
    locationHub: 'istanbul_global',
    cityLabelFa: 'تهران و پاویون بین‌المللی',
    cityLabelEn: 'Tehran & Global Expo',
    tickerFa: 'هلدینگ اسپوتا',
    tickerEn: 'Spoota Group',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    isHighImpact: true,
  },
  exp_khayyam_print: {
    tier: 'significant',
    scopeBadgeFa: '۲+ سال فعالیت تخصصی پیش‌ازچاپ، تفکیک رنگ CMYK و نظارت لیتوگرافی',
    scopeBadgeEn: '2+ Years Prepress Plate Supervision, Dielines & CMYK Separation',
    scopeMetricFa: '۲+ سال لیتوگرافی و چاپ افست',
    scopeMetricEn: '2+ Yrs Prepress & Offset',
    yearFa: '۱۴۰۰ - ۱۴۰۲',
    yearEn: '2022 – 2024',
    timelineYearFa: '۱۴۰۲',
    timelineYearEn: '2023',
    volumeScore: 72,
    locationHub: 'urmia',
    cityLabelFa: 'ارومیه',
    cityLabelEn: 'Urmia',
    tickerFa: 'چاپخانه خیام',
    tickerEn: 'Khayyam Print',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_behrad: {
    tier: 'significant',
    scopeBadgeFa: '۳ سال طراحی کاتالوگ‌های شرکتی، هویت برند و اوراق اداری تجاری',
    scopeBadgeEn: '3 Years Corporate Print Publications & Multi-Industry Collateral',
    scopeMetricFa: '۳ سال انتشارات و چاپ تجاری',
    scopeMetricEn: '3 Yrs Commercial Print',
    yearFa: '۱۳۹۸ - ۱۴۰۱',
    yearEn: '2020 – 2023',
    timelineYearFa: '۱۴۰۱',
    timelineYearEn: '2022',
    volumeScore: 70,
    locationHub: 'tehran',
    cityLabelFa: 'تهران',
    cityLabelEn: 'Tehran',
    tickerFa: 'تبلیغات به‌راد',
    tickerEn: 'Behrad Ad',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_urmia_municipality: {
    tier: 'focused',
    scopeBadgeFa: 'مدیریت فنی و نظارت بر پروژه‌های زیرساختی و عمرانی شهری',
    scopeBadgeEn: 'Municipal Infrastructure & Urban Civil Engineering Supervision',
    scopeMetricFa: 'پروژه‌های زیرساختی شهری',
    scopeMetricEn: 'Urban Infrastructure',
    yearFa: '۱۳۹۷ - ۱۳۹۸',
    yearEn: '2018 – 2020',
    timelineYearFa: '۱۳۹۸',
    timelineYearEn: '2019',
    volumeScore: 50,
    locationHub: 'urmia',
    cityLabelFa: 'ارومیه',
    cityLabelEn: 'Urmia',
    tickerFa: 'شهرداری ارومیه',
    tickerEn: 'Municipality',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_nasb_niroo: {
    tier: 'focused',
    scopeBadgeFa: 'نظارت بر سازه‌های سنگین نیروگاهی بتنی و فلزی و کنترل کیفی',
    scopeBadgeEn: 'Heavy Power Plant Concrete & Steel Quality Control',
    scopeMetricFa: 'احداث نیروگاه و سازه بتنی',
    scopeMetricEn: 'Power Plant QC',
    yearFa: '۱۳۹۵ - ۱۳۹۷',
    yearEn: '2016 – 2018',
    timelineYearFa: '۱۳۹۷',
    timelineYearEn: '2017',
    volumeScore: 45,
    locationHub: 'urmia',
    cityLabelFa: 'اردبیل و شمال‌غرب',
    cityLabelEn: 'Ardabil & NW Region',
    tickerFa: 'نصب نیرو',
    tickerEn: 'Nasb Niroo',
    colSpanDesktop: 'col-span-1',
    isHighImpact: false,
  },
  exp_ministry_energy: {
    tier: 'focused',
    scopeBadgeFa: 'سدسازی، مدیریت منابع آب و بررسی نقشه‌های هیدرولیکی',
    scopeBadgeEn: 'Hydraulic Dam Construction & Geotechnical Soil Mechanics',
    scopeMetricFa: 'سدسازی و منابع آب',
    scopeMetricEn: 'Dam Hydraulics',
    yearFa: '۱۳۹۴ - ۱۳۹۵',
    yearEn: '2015 – 2016',
    timelineYearFa: '۱۳۹۵',
    timelineYearEn: '2016',
    volumeScore: 42,
    locationHub: 'urmia',
    cityLabelFa: 'منطقه سدسازی شمال‌غرب',
    cityLabelEn: 'Dam Projects',
    tickerFa: 'وزارت نیرو',
    tickerEn: 'Ministry Energy',
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
  const NextChevron = isFa ? ChevronLeft : ChevronRight;
  const PrevChevron = isFa ? ChevronRight : ChevronLeft;

  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [activeLocation, setActiveLocation] = useState<LocationFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [desktopView, setDesktopView] = useState<DesktopViewMode>('timeline_chart');

  // Selected experience ID (defaults to RST / newest flagship active in 2026)
  const [selectedExperienceId, setSelectedExperienceId] = useState<string>('exp_rst');

  // Interactive Stock Chart Mouse & Hover Tracking
  const chartSvgRef = useRef<SVGSVGElement>(null);
  const [chartMouse, setChartMouse] = useState<{
    x: number;
    y: number;
    active: boolean;
    nearestId: string | null;
  }>({
    x: 0,
    y: 0,
    active: false,
    nearestId: null,
  });

  // Mobile expandable card tracking
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({
    exp_rst: true,
  });

  const toggleMobileExpand = (id: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

  const locationHubs: {
    id: LocationFilter;
    nameFa: string;
    nameEn: string;
    badgeStyle: string;
    dotColor: string;
  }[] = [
    {
      id: 'all',
      nameFa: 'همه شهرها',
      nameEn: 'All Hubs',
      badgeStyle: 'bg-slate-100 text-slate-800 border-slate-300',
      dotColor: 'bg-slate-500',
    },
    {
      id: 'tehran',
      nameFa: 'تهران',
      nameEn: 'Tehran',
      badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      dotColor: 'bg-indigo-600',
    },
    {
      id: 'urmia',
      nameFa: 'ارومیه',
      nameEn: 'Urmia',
      badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dotColor: 'bg-emerald-600',
    },
    {
      id: 'istanbul_global',
      nameFa: 'استانبول و بین‌المللی',
      nameEn: 'Istanbul & Global',
      badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200',
      dotColor: 'bg-amber-600',
    },
  ];

  // Filter and sort chronologically (Strictly Newest 2026 -> Oldest 2016)
  const filteredExperiences = useMemo(() => {
    const list = EXPERIENCE_DATA.filter((item) => {
      const meta = EXPERIENCE_SCALE_MAP[item.id];

      // Location Hub filter
      if (activeLocation !== 'all') {
        if (!meta || meta.locationHub !== activeLocation) return false;
      }

      // Category check
      if (activeCategory === 'flagship') {
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
        item.location.fa.toLowerCase().includes(q) ||
        (meta && (meta.cityLabelFa.toLowerCase().includes(q) || meta.cityLabelEn.toLowerCase().includes(q)));
      const matchBadge = item.badge?.toLowerCase().includes(q);

      return matchCompany || matchRole || matchSummary || matchLocation || matchBadge;
    });

    // Sort strictly from Newest (2026/1404) to Oldest (2016/1395)
    return [...list].sort((a, b) => {
      const scoreA = EXPERIENCE_CHRONO_MAP[a.id] || 0;
      const scoreB = EXPERIENCE_CHRONO_MAP[b.id] || 0;
      return scoreB - scoreA;
    });
  }, [activeCategory, activeLocation, searchQuery]);

  // Synchronize spotlight selection when filtered list changes
  React.useEffect(() => {
    if (filteredExperiences.length > 0) {
      const exists = filteredExperiences.some((i) => i.id === selectedExperienceId);
      if (!exists) {
        setSelectedExperienceId(filteredExperiences[0].id);
      }
    }
  }, [filteredExperiences, selectedExperienceId]);

  // Active spotlight item
  const currentSpotlightIndex = useMemo(() => {
    const idx = filteredExperiences.findIndex((i) => i.id === selectedExperienceId);
    return idx >= 0 ? idx : 0;
  }, [filteredExperiences, selectedExperienceId]);

  const currentSpotlightItem = useMemo(() => {
    return filteredExperiences[currentSpotlightIndex] || filteredExperiences[0];
  }, [filteredExperiences, currentSpotlightIndex]);

  // Geographic statistics across all positions
  const locationStats = useMemo(() => {
    const total = EXPERIENCE_DATA.length;
    let tehran = 0;
    let urmia = 0;
    let global = 0;

    EXPERIENCE_DATA.forEach((item) => {
      const hub = EXPERIENCE_SCALE_MAP[item.id]?.locationHub;
      if (hub === 'tehran') tehran++;
      else if (hub === 'urmia') urmia++;
      else if (hub === 'istanbul_global') global++;
    });

    return {
      tehranCount: tehran,
      urmiaCount: urmia,
      globalCount: global,
      tehranPercent: Math.round((tehran / total) * 100),
      urmiaPercent: Math.round((urmia / total) * 100),
      globalPercent: Math.round((global / total) * 100),
    };
  }, []);

  // Stepper handlers
  const handleNextSpotlight = () => {
    if (currentSpotlightIndex < filteredExperiences.length - 1) {
      setSelectedExperienceId(filteredExperiences[currentSpotlightIndex + 1].id);
    }
  };

  const handlePrevSpotlight = () => {
    if (currentSpotlightIndex > 0) {
      setSelectedExperienceId(filteredExperiences[currentSpotlightIndex - 1].id);
    }
  };

  // Category Color Theme Generator
  const getCategoryTheme = (category?: string, tier?: 'flagship' | 'significant' | 'focused') => {
    if (tier === 'flagship') {
      return {
        badge: 'bg-indigo-50 text-indigo-900 border-indigo-200/90 font-bold',
        dot: 'bg-indigo-600',
        activeRing: 'ring-3 ring-indigo-500 shadow-indigo-500/25',
        borderHover: 'hover:border-indigo-400',
        counterBg: 'bg-indigo-600 text-white shadow-xs',
        scopeBg: 'bg-indigo-50/90 text-indigo-950 border-indigo-200/80',
        scopeIcon: 'text-indigo-600',
        pillBg: 'bg-indigo-900 text-white font-bold',
        cardGradient: 'from-indigo-500/8 via-white to-white',
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
          activeRing: 'ring-3 ring-emerald-500 shadow-emerald-500/25',
          borderHover: 'hover:border-emerald-400',
          counterBg: 'bg-emerald-600 text-white',
          scopeBg: 'bg-emerald-50/80 text-emerald-950 border-emerald-200/70',
          scopeIcon: 'text-emerald-600',
          pillBg: 'bg-emerald-800 text-white font-semibold',
          cardGradient: 'from-emerald-500/8 via-white to-white',
          deliverableCheck: 'text-emerald-600',
          deliverableDot: 'bg-emerald-500',
          deliverableCard: 'bg-emerald-50/30 border-emerald-100',
        };
      case 'brand_digital':
        return {
          badge: 'bg-violet-50 text-violet-900 border-violet-200/90 font-bold',
          dot: 'bg-violet-500',
          activeRing: 'ring-3 ring-violet-500 shadow-violet-500/25',
          borderHover: 'hover:border-violet-400',
          counterBg: 'bg-violet-600 text-white',
          scopeBg: 'bg-violet-50/80 text-violet-950 border-violet-200/70',
          scopeIcon: 'text-violet-600',
          pillBg: 'bg-violet-800 text-white font-semibold',
          cardGradient: 'from-violet-500/8 via-white to-white',
          deliverableCheck: 'text-violet-600',
          deliverableDot: 'bg-violet-500',
          deliverableCard: 'bg-violet-50/30 border-violet-100',
        };
      case 'editorial_print':
        return {
          badge: 'bg-rose-50 text-rose-900 border-rose-200/90 font-bold',
          dot: 'bg-rose-500',
          activeRing: 'ring-3 ring-rose-500 shadow-rose-500/25',
          borderHover: 'hover:border-rose-400',
          counterBg: 'bg-rose-600 text-white',
          scopeBg: 'bg-rose-50/80 text-rose-950 border-rose-200/70',
          scopeIcon: 'text-rose-600',
          pillBg: 'bg-rose-800 text-white font-semibold',
          cardGradient: 'from-rose-500/8 via-white to-white',
          deliverableCheck: 'text-rose-600',
          deliverableDot: 'bg-rose-500',
          deliverableCard: 'bg-rose-50/30 border-rose-100',
        };
      case 'civil_engineering':
        return {
          badge: 'bg-sky-50 text-sky-900 border-sky-200/90 font-bold',
          dot: 'bg-sky-500',
          activeRing: 'ring-3 ring-sky-500 shadow-sky-500/25',
          borderHover: 'hover:border-sky-400',
          counterBg: 'bg-sky-700 text-white',
          scopeBg: 'bg-sky-50/80 text-sky-950 border-sky-200/70',
          scopeIcon: 'text-sky-600',
          pillBg: 'bg-sky-800 text-white font-semibold',
          cardGradient: 'from-sky-500/8 via-white to-white',
          deliverableCheck: 'text-sky-600',
          deliverableDot: 'bg-sky-500',
          deliverableCard: 'bg-sky-50/30 border-sky-100',
        };
      default:
        return {
          badge: 'bg-slate-100 text-slate-800 border-slate-200 font-bold',
          dot: 'bg-slate-600',
          activeRing: 'ring-3 ring-slate-400',
          borderHover: 'hover:border-slate-400',
          counterBg: 'bg-slate-800 text-white',
          scopeBg: 'bg-slate-100 text-slate-900 border-slate-200',
          scopeIcon: 'text-slate-600',
          pillBg: 'bg-slate-900 text-white font-semibold',
          cardGradient: 'from-slate-500/5 via-white to-white',
          deliverableCheck: 'text-slate-700',
          deliverableDot: 'bg-slate-500',
          deliverableCard: 'bg-slate-50 border-slate-100',
        };
    }
  };

  // Stock Market Chart Dimensions & Coordinates Calculation
  // SVG Canvas: 1100 width, 300 height
  const chartWidth = 1100;
  const chartHeight = 300;
  const chartPaddingX = 60;
  const chartTopPadding = 55;
  const chartBottomPadding = 55;
  const chartUsableHeight = chartHeight - chartTopPadding - chartBottomPadding;

  const chartPoints = useMemo(() => {
    if (filteredExperiences.length === 0) return [];
    const count = filteredExperiences.length;

    return filteredExperiences.map((item, idx) => {
      const meta = EXPERIENCE_SCALE_MAP[item.id] || {
        volumeScore: 60,
        timelineYearFa: item.period.fa,
        timelineYearEn: item.period.en,
        cityLabelFa: item.location.fa,
        cityLabelEn: item.location.en,
        tickerFa: item.company.fa,
        tickerEn: item.company.en,
        locationHub: 'tehran',
      };

      // In both Persian and English: Years increase strictly from LEFT to RIGHT.
      // filteredExperiences is sorted Newest (idx=0: 2026/1404) to Oldest (idx=count-1: 2016/1395).
      // Therefore, idx=0 (Newest) is on the RIGHT: chartWidth - chartPaddingX.
      // idx=count-1 (Oldest) is on the LEFT: chartPaddingX.
      let x = 0;
      if (count === 1) {
        x = chartWidth / 2;
      } else {
        const ratio = idx / (count - 1);
        x = chartWidth - chartPaddingX - ratio * (chartWidth - 2 * chartPaddingX);
      }

      // Vertical elevation corresponds to project volume (higher volume = taller peak / higher on chart)
      const normalizedScore = Math.max(30, Math.min(100, meta.volumeScore));
      const y = chartHeight - chartBottomPadding - ((normalizedScore - 25) / 75) * chartUsableHeight;

      return {
        x,
        y,
        item,
        meta,
        idx,
        score: meta.volumeScore,
      };
    });
  }, [filteredExperiences]);

  // Construct continuous stock chart line path and area path
  const { linePath, areaPath } = useMemo(() => {
    if (chartPoints.length === 0) return { linePath: '', areaPath: '' };

    // Sort points by X coordinate so SVG paths draw cleanly from left to right
    const sortedByX = [...chartPoints].sort((a, b) => a.x - b.x);

    const pointsStr = sortedByX
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(' ');

    const baselineY = chartHeight - chartBottomPadding;
    const firstX = sortedByX[0].x.toFixed(1);
    const lastX = sortedByX[sortedByX.length - 1].x.toFixed(1);

    const area = `${pointsStr} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;

    return { linePath: pointsStr, areaPath: area };
  }, [chartPoints]);

  // Handle interactive mouse movements across stock chart
  const handleChartMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!chartSvgRef.current) return;
    const rect = chartSvgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Scale to SVG coordinate system (1100x300)
    const svgX = (clientX / rect.width) * chartWidth;
    const svgY = (clientY / rect.height) * chartHeight;

    // Find nearest milestone point
    let nearestPoint = chartPoints[0];
    let minDistance = Infinity;

    chartPoints.forEach((p) => {
      const dist = Math.abs(p.x - svgX);
      if (dist < minDistance) {
        minDistance = dist;
        nearestPoint = p;
      }
    });

    setChartMouse({
      x: svgX,
      y: svgY,
      active: true,
      nearestId: nearestPoint ? nearestPoint.item.id : null,
    });
  };

  const handleChartMouseLeave = () => {
    setChartMouse((prev) => ({ ...prev, active: false }));
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12 ${isFa ? 'text-right' : 'text-left'}`}>
      {/* 1. PAGE HEADER */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs font-bold font-display uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          <span>{lang === 'en' ? 'Interactive Career & Scope Chart' : 'چارت تعاملی سوابق و شاخص حجم پروژه‌ها'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
          {lang === 'en'
            ? 'Professional Experience & Career Record'
            : 'سوابق حرفه‌ای، مدیریت هنری و پیشینه مهندسی'}
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium">
          {lang === 'en'
            ? 'A financial-grade market chart mapping career milestones by project scale and volume — spanning 2026 back to civil engineering foundations with geographic distribution across Tehran, Urmia, and Istanbul.'
            : 'تایم‌لاین تعاملی الهام‌گرفته از چارت بورس که ارتفاع هر ایستگاه زمانی بیانگر حجم، گستره و اهمیت پروژه است؛ با تفکیک دقیق مراکز فعالیت میان تهران، ارومیه و استانبول به ترتیب از جدیدترین به قدیمی‌ترین.'}
        </p>
      </div>

      {/* 2. SCALE OVERVIEW METRIC CHIPS (Clean Light Aesthetic - NO Dark Outer Frame) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-1.5 group">
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-black font-display text-indigo-600 tracking-tight">
              {isFa ? '۷ پروژه' : '7 Flagships'}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 group-hover:scale-125 transition-transform" />
          </div>
          <span className="text-xs text-slate-900 font-bold block">
            {lang === 'en' ? 'Flagship & Major Scope' : 'پروژه‌های کلان، ۳۶۰° و شاخص'}
          </span>
          <span className="text-[11px] text-slate-500 font-medium block">
            {lang === 'en' ? 'Comprehensive B2B & Retail Systems' : 'سیستم‌های برندینگ، شلف و هویت'}
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-1.5 group">
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-black font-display text-rose-600 tracking-tight">
              {isFa ? '۲۰۰ صفحه' : '200 Pages'}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 group-hover:scale-125 transition-transform" />
          </div>
          <span className="text-xs text-slate-900 font-bold block">
            {lang === 'en' ? 'Medical Equipment Catalog' : 'کتاب مرجع ۳۱ کارخانه دارویی'}
          </span>
          <span className="text-[11px] text-slate-500 font-medium block">
            {lang === 'en' ? 'Editorial Architecture & Prepress' : 'تدوین و نظارت لیتوگرافی و افست'}
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-1.5 group">
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-black font-display text-emerald-600 tracking-tight">
              {isFa ? '۲۲ محصول' : '22 Products'}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 group-hover:scale-125 transition-transform" />
          </div>
          <span className="text-xs text-slate-900 font-bold block">
            {lang === 'en' ? '3D Cosmetic Visualizations' : 'مدل‌سازی و رندرینگ ۳D شلف'}
          </span>
          <span className="text-[11px] text-slate-500 font-medium block">
            {lang === 'en' ? 'Iran Mall Expo Exhibition Brochure' : 'پاویون نمایشگاهی ایران‌مال'}
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-1.5 group">
          <div className="flex items-center justify-between">
            <span className="text-xl sm:text-2xl font-black font-display text-violet-600 tracking-tight">
              {isFa ? 'مدیر هنری و خلاقیت' : 'Creative Director'}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-violet-600 group-hover:scale-125 transition-transform" />
          </div>
          <span className="text-xs text-slate-900 font-bold block">
            {lang === 'en' ? 'Art & Creative Direction' : 'هدایت هنری و استراتژی بصری'}
          </span>
          <span className="text-[11px] text-slate-500 font-medium block">
            {lang === 'en' ? 'Packaging, Brand & Product Comms' : 'بسته‌بندی، هویت و ارتباطات برند'}
          </span>
        </div>
      </div>

      {/* 3. GEOGRAPHIC BREAKDOWN & LOCATION DISTRIBUTION BAR */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-black text-slate-900 font-display block">
                {lang === 'en' ? 'Geographic Distribution of Projects' : 'تفکیک مکانی و گستره جغرافیایی پروژه‌ها'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {isFa ? 'توزیع پروژه‌های دیزاین و مهندسی میان تهران، ارومیه و استانبول' : 'Design & engineering hubs across Tehran, Urmia, and Istanbul'}
              </span>
            </div>
          </div>

          {/* Location Hub Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {locationHubs.map((hub) => {
              const isSelected = activeLocation === hub.id;
              const count =
                hub.id === 'all'
                  ? EXPERIENCE_DATA.length
                  : hub.id === 'tehran'
                  ? locationStats.tehranCount
                  : hub.id === 'urmia'
                  ? locationStats.urmiaCount
                  : locationStats.globalCount;

              return (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => setActiveLocation(hub.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-display ${
                    isSelected
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${hub.dotColor}`} />
                  <span>{lang === 'en' ? hub.nameEn : hub.nameFa}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-slate-800 text-white' : 'bg-slate-200/70 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Distribution Proportion Bar */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
            <div
              style={{ width: `${locationStats.tehranPercent}%` }}
              className="bg-indigo-500 hover:bg-indigo-600 transition-all h-full"
              title={`Tehran: ${locationStats.tehranCount} (${locationStats.tehranPercent}%)`}
            />
            <div
              style={{ width: `${locationStats.urmiaPercent}%` }}
              className="bg-emerald-500 hover:bg-emerald-600 transition-all h-full"
              title={`Urmia: ${locationStats.urmiaCount} (${locationStats.urmiaPercent}%)`}
            />
            <div
              style={{ width: `${locationStats.globalPercent}%` }}
              className="bg-amber-500 hover:bg-amber-600 transition-all h-full"
              title={`Istanbul/Global: ${locationStats.globalCount} (${locationStats.globalPercent}%)`}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] font-bold font-mono text-slate-600 gap-2">
            <span className="flex items-center gap-1.5 text-indigo-700">
              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
              {isFa
                ? `تهران: ${locationStats.tehranPercent}٪ (${locationStats.tehranCount} پروژه)`
                : `Tehran: ${locationStats.tehranPercent}% (${locationStats.tehranCount} proj)`}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              {isFa
                ? `ارومیه: ${locationStats.urmiaPercent}٪ (${locationStats.urmiaCount} پروژه)`
                : `Urmia: ${locationStats.urmiaPercent}% (${locationStats.urmiaCount} proj)`}
            </span>
            <span className="flex items-center gap-1.5 text-amber-800">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              {isFa
                ? `استانبول و بین‌المللی: ${locationStats.globalPercent}٪ (${locationStats.globalCount} پروژه)`
                : `Istanbul & Global: ${locationStats.globalPercent}% (${locationStats.globalCount} proj)`}
            </span>
          </div>
        </div>
      </div>

      {/* 4. CONTROLS BAR: CATEGORIES, SEARCH & VIEW TOGGLE */}
      <div className="space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-neutral-50 p-3 rounded-2xl border border-neutral-200/80">
          {/* Category Filter Pills */}
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

          {/* Right Controls: Search & Desktop Mode Switcher */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className={`w-3.5 h-3.5 text-neutral-400 absolute top-1/2 -translate-y-1/2 ${isFa ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'en' ? 'Search records, cities...' : 'جستجو در شرکت، شهر، نقش...'}
                className={`w-full text-xs font-medium bg-white border border-neutral-200 rounded-xl py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  isFa ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'
                }`}
              />
            </div>

            {/* Desktop View Switcher: Financial Stock Chart vs Bento Grid */}
            <div className="hidden lg:flex items-center bg-white border border-neutral-200 rounded-xl p-0.5">
              <button
                type="button"
                onClick={() => setDesktopView('timeline_chart')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  desktopView === 'timeline_chart'
                    ? 'bg-indigo-600 text-white'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
                title={lang === 'en' ? 'Stock Chart' : 'چارت بورس'}
              >
                <LineChart className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Chart' : 'چارت'}</span>
              </button>
              <button
                type="button"
                onClick={() => setDesktopView('all_grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  desktopView === 'all_grid'
                    ? 'bg-indigo-600 text-white'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
                title={lang === 'en' ? 'Grid View' : 'نمای کارت‌ها'}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'All Cards' : 'همه کارت‌ها'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter State Note */}
        {(activeCategory !== 'all' || activeLocation !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1 font-medium">
            <span>
              {lang === 'en'
                ? `Showing ${filteredExperiences.length} of ${EXPERIENCE_DATA.length} positions (Sorted 2026 to 2016)`
                : `نمایش ${filteredExperiences.length} از ${EXPERIENCE_DATA.length} سابقه کاری (به ترتیب سال از ۱۴۰۴ تا ۱۳۹۵)`}
            </span>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveLocation('all');
                setSearchQuery('');
              }}
              className="text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer"
            >
              {lang === 'en' ? 'Reset filters' : 'پاک کردن فیلترها'}
            </button>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 5. MAIN PRESENTATION: FINANCIAL STOCK CHART & SPOTLIGHT CARD */}
      {/* ------------------------------------------------------------------ */}

      {filteredExperiences.length === 0 ? (
        /* EMPTY STATE */
        <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-3">
          <p className="text-sm font-bold text-neutral-600">
            {lang === 'en'
              ? 'No experience records match your search criteria.'
              : 'هیچ سابقه کاری منطبق با فیلتر جستجوی شما یافت نشد.'}
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setActiveLocation('all');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
          >
            {lang === 'en' ? 'Show all records' : 'نمایش همه سوابق'}
          </button>
        </div>
      ) : (
        <>
          {/* ============================================================= */}
          {/* A. DESKTOP VIEW: FINANCIAL STOCK CHART (چارت بورس) & SPOTLIGHT */}
          {/* ============================================================= */}
          <div className="hidden lg:block space-y-8">
            {desktopView === 'timeline_chart' ? (
              <div className="space-y-8">
                {/* 1. STOCK MARKET CHART CONTAINER (چارت بورس) */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5 relative overflow-hidden">
                  {/* Stepper Navigation & Ticker Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
                          {isFa
                            ? `ایستگاه ${currentSpotlightIndex + 1} از ${filteredExperiences.length}`
                            : `Milestone ${currentSpotlightIndex + 1} of ${filteredExperiences.length}`}
                        </span>
                        <span className="text-xs text-slate-300">·</span>
                        <span className="text-xs font-bold text-slate-700 font-mono">
                          {EXPERIENCE_SCALE_MAP[currentSpotlightItem.id]?.[isFa ? 'timelineYearFa' : 'timelineYearEn'] ||
                            currentSpotlightItem.period[lang]}
                        </span>
                        <span className="text-xs text-slate-300">·</span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 font-mono">
                          {isFa
                            ? `حجم و شاخص: ${EXPERIENCE_SCALE_MAP[currentSpotlightItem.id]?.volumeScore || 70}٪`
                            : `Scope Index: ${EXPERIENCE_SCALE_MAP[currentSpotlightItem.id]?.volumeScore || 70}%`}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <span>{currentSpotlightItem.company[lang]}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-display">
                          {EXPERIENCE_SCALE_MAP[currentSpotlightItem.id]?.[isFa ? 'cityLabelFa' : 'cityLabelEn'] ||
                            currentSpotlightItem.location[lang]}
                        </span>
                      </h3>
                    </div>

                    {/* Stepper Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevSpotlight}
                        disabled={currentSpotlightIndex === 0}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                          currentSpotlightIndex === 0
                            ? 'opacity-30 border-slate-200 text-slate-400 cursor-not-allowed'
                            : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-2xs hover:border-indigo-400'
                        }`}
                        title={lang === 'en' ? 'Previous Milestone' : 'ایستگاه قبلی (جدیدتر)'}
                      >
                        <PrevChevron className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={handleNextSpotlight}
                        disabled={currentSpotlightIndex === filteredExperiences.length - 1}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                          currentSpotlightIndex === filteredExperiences.length - 1
                            ? 'opacity-30 border-slate-200 text-slate-400 cursor-not-allowed'
                            : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-2xs hover:border-indigo-400'
                        }`}
                        title={lang === 'en' ? 'Next Milestone' : 'ایستگاه بعدی (قدیمی‌تر)'}
                      >
                        <NextChevron className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Financial Stock Chart Legend & Indicators */}
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 font-mono">
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                      {isFa
                        ? 'ارتفاع منحنی = شاخص حجم و گستره پروژه'
                        : 'Curve Elevation = Project Scale & Volume Index'}
                    </span>
                    <span className="text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 font-bold">
                      {isFa
                        ? 'روند سال‌ها: از چپ به راست افزایش سال‌ها (۱۳۹۵ تا ۱۴۰۴ اکنون)'
                        : 'Timeline: Left to Right Chronological (2016 to 2026 Now)'}
                    </span>
                  </div>

                  {/* SVG STOCK MARKET CANVAS (چارت بورس با انیمیشن ماوس) */}
                  <div
                    className="relative w-full rounded-2xl bg-linear-to-b from-slate-50/70 via-white to-slate-50/40 border border-slate-200/80 p-2 overflow-hidden select-none"
                    dir="ltr"
                  >
                    <svg
                      ref={chartSvgRef}
                      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                      className="w-full h-72 sm:h-80 cursor-crosshair"
                      onMouseMove={handleChartMouseMove}
                      onMouseLeave={handleChartMouseLeave}
                      onClick={() => {
                        if (chartMouse.nearestId) {
                          setSelectedExperienceId(chartMouse.nearestId);
                        }
                      }}
                    >
                      <defs>
                        {/* Area gradient for stock market volume fill */}
                        <linearGradient id="stockAreaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.32" />
                          <stop offset="60%" stopColor="#818cf8" stopOpacity="0.10" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                        </linearGradient>

                        {/* Chart Line Gradient */}
                        <linearGradient id="stockLineGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#4f46e5" />
                          <stop offset="50%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>

                        {/* Glow Filter for Active Nodes */}
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#4f46e5" floodOpacity="0.5" />
                        </filter>
                      </defs>

                      {/* Financial Grid Lines & Volume Benchmarks */}
                      {[100, 75, 50, 25].map((level) => {
                        const levelY =
                          chartHeight -
                          chartBottomPadding -
                          ((level - 25) / 75) * chartUsableHeight;

                        return (
                          <g key={level} className="opacity-60">
                            <line
                              x1={chartPaddingX - 10}
                              y1={levelY}
                              x2={chartWidth - chartPaddingX + 10}
                              y2={levelY}
                              stroke="#e2e8f0"
                              strokeDasharray="4 4"
                              strokeWidth="1"
                            />
                            <text
                              x={chartPaddingX - 14}
                              y={levelY + 3}
                              fill="#94a3b8"
                              fontSize="10"
                              fontFamily="monospace"
                              textAnchor="end"
                              className="font-bold"
                            >
                              {level === 100
                                ? isFa ? '۱۰۰٪ مقیاس کلان ۳۶۰°' : '100% Flagship'
                                : level === 75
                                ? isFa ? '۷۵٪ گسترده' : '75% High'
                                : level === 50
                                ? isFa ? '۵۰٪ متمرکز' : '50% Mid'
                                : isFa ? '۲۵٪ پایه' : '25% Base'}
                            </text>
                          </g>
                        );
                      })}

                      {/* Continuous Stock Market Gradient Fill Area */}
                      {areaPath && (
                        <path d={areaPath} fill="url(#stockAreaGradient)" />
                      )}

                      {/* Continuous Stock Market Curve Line */}
                      {linePath && (
                        <path
                          d={linePath}
                          fill="none"
                          stroke="url(#stockLineGradient)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="drop-shadow-xs"
                        />
                      )}

                      {/* Baseline horizontal axis */}
                      <line
                        x1={chartPaddingX - 20}
                        y1={chartHeight - chartBottomPadding}
                        x2={chartWidth - chartPaddingX + 20}
                        y2={chartHeight - chartBottomPadding}
                        stroke="#cbd5e1"
                        strokeWidth="2"
                      />

                      {/* Interactive Solid Vertical Guide Line Following Cursor (NO dashed lines, NO horizontal line) */}
                      {chartMouse.active && (
                        <line
                          x1={chartMouse.x}
                          y1={chartTopPadding - 15}
                          x2={chartMouse.x}
                          y2={chartHeight - chartBottomPadding}
                          stroke="#4f46e5"
                          strokeWidth="1.5"
                          opacity="0.8"
                          className="pointer-events-none"
                        />
                      )}

                      {/* Candlestick Stems and Milestone Data Points */}
                      {chartPoints.map((pt) => {
                        const isSelected = pt.item.id === currentSpotlightItem.id;
                        const isHovered = pt.item.id === chartMouse.nearestId && chartMouse.active;
                        const meta = pt.meta;
                        const baselineY = chartHeight - chartBottomPadding;

                        // Hub specific colors
                        const hubColor =
                          meta.locationHub === 'tehran'
                            ? '#4f46e5'
                            : meta.locationHub === 'urmia'
                            ? '#059669'
                            : '#d97706';

                        return (
                          <g
                            key={pt.item.id}
                            className="cursor-pointer group"
                            onClick={() => setSelectedExperienceId(pt.item.id)}
                          >
                            {/* Vertical Solid Stem Line (NO dashed lines) */}
                            <line
                              x1={pt.x}
                              y1={pt.y}
                              x2={pt.x}
                              y2={baselineY}
                              stroke={isSelected || isHovered ? hubColor : '#e2e8f0'}
                              strokeWidth={isSelected || isHovered ? '2' : '1'}
                              opacity={isSelected || isHovered ? 1 : 0.6}
                            />

                            {/* Base Footing Tick on Baseline Axis */}
                            <circle
                              cx={pt.x}
                              cy={baselineY}
                              r={isSelected ? 3.5 : 2}
                              fill={isSelected ? hubColor : '#94a3b8'}
                            />

                            {/* Node Elevation Pulse Aura */}
                            {isSelected && (
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r="16"
                                fill={hubColor}
                                opacity="0.25"
                                className="animate-ping"
                              />
                            )}

                            {/* Outer Node Ring */}
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={isSelected ? 10 : isHovered ? 8 : 6}
                              fill="#ffffff"
                              stroke={hubColor}
                              strokeWidth={isSelected ? 3.5 : 2}
                              filter={isSelected ? 'url(#glow)' : undefined}
                              className="transition-all duration-200"
                            />

                            {/* Inner Node Core */}
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={isSelected ? 4.5 : isHovered ? 3.5 : 2.5}
                              fill={hubColor}
                              className="transition-all duration-200"
                            />

                            {/* Horizontal Axis: ONLY Year Numbers (alternating tick lines for zero overlap) */}
                            <g className="transition-all select-none">
                              <line
                                x1={pt.x}
                                y1={baselineY}
                                x2={pt.x}
                                y2={pt.idx % 2 === 0 ? baselineY + 8 : baselineY + 20}
                                stroke={isSelected ? '#4f46e5' : '#cbd5e1'}
                                strokeWidth={isSelected ? '2' : '1'}
                              />
                              <text
                                x={pt.x}
                                y={pt.idx % 2 === 0 ? baselineY + 20 : baselineY + 34}
                                fill={isSelected ? '#4f46e5' : '#475569'}
                                fontSize="10.5"
                                fontFamily="monospace"
                                fontWeight={isSelected ? '900' : '700'}
                                textAnchor="middle"
                                className="transition-colors"
                              >
                                {isFa ? meta.timelineYearFa : meta.timelineYearEn}
                              </text>
                            </g>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* 2. SPOTLIGHT SHOWCASE CARD (FOCUSED DETAIL FOR SELECTED POSITION) */}
                {(() => {
                  const item = currentSpotlightItem;
                  const meta = EXPERIENCE_SCALE_MAP[item.id] || {
                    tier: 'significant',
                    scopeBadgeFa: item.type.fa,
                    scopeBadgeEn: item.type.en,
                    scopeMetricFa: item.type.fa,
                    scopeMetricEn: item.type.en,
                    yearFa: item.period.fa,
                    yearEn: item.period.en,
                    timelineYearFa: item.period.fa,
                    timelineYearEn: item.period.en,
                    volumeScore: 70,
                    locationHub: 'tehran',
                    cityLabelFa: item.location.fa,
                    cityLabelEn: item.location.en,
                    tickerFa: item.company.fa,
                    tickerEn: item.company.en,
                    colSpanDesktop: 'col-span-1',
                    isHighImpact: false,
                  };
                  const isFlagship = meta.tier === 'flagship';
                  const isCivil = item.category === 'civil_engineering';
                  const theme = getCategoryTheme(item.category, meta.tier);
                  const highlights = item.highlights[lang] || [];

                  return (
                    <div
                      key={item.id}
                      className={`bg-white rounded-3xl border transition-all duration-300 shadow-md p-8 sm:p-10 space-y-8 ${
                        isFlagship
                          ? 'border-indigo-200/90 ring-1 ring-indigo-100/80 bg-linear-to-b from-indigo-50/15 via-white to-white'
                          : isCivil
                          ? 'border-sky-200/90 bg-linear-to-b from-sky-50/15 to-white'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      {/* Top Header & Badges */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-6">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`w-7 h-7 rounded-xl font-mono font-bold text-xs flex items-center justify-center ${theme.counterBg}`}
                            >
                              {currentSpotlightIndex + 1 < 10
                                ? `0${currentSpotlightIndex + 1}`
                                : currentSpotlightIndex + 1}
                            </span>

                            {isFlagship && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-600 text-white font-bold text-xs font-display shadow-2xs">
                                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                                <span>{lang === 'en' ? 'Flagship Engagement' : 'پروژه کلان و شاخص'}</span>
                              </span>
                            )}

                            {/* Location City Tag Badge */}
                            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-slate-50 text-slate-700 border-slate-200 font-display flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                              <span>{meta[isFa ? 'cityLabelFa' : 'cityLabelEn']}</span>
                            </span>

                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full border font-display flex items-center gap-1.5 ${theme.badge}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                              <span>{item.badge}</span>
                            </span>

                            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60 font-mono">
                              {item.period[lang]}
                            </span>
                          </div>

                          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug">
                            {item.company[lang]}
                          </h2>

                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className={`px-3 py-1 text-xs font-bold rounded-lg font-display ${theme.pillBg}`}>
                              {item.role[lang]}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="text-slate-600 font-semibold">{item.type[lang]}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-slate-500 flex items-center gap-1 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {item.location[lang]}
                            </span>
                          </div>
                        </div>

                        {/* Quantitative Scope Indicator Tag */}
                        <div className="shrink-0 space-y-2">
                          <div
                            className={`p-3.5 rounded-2xl border flex items-center gap-2.5 text-xs font-bold font-display ${theme.scopeBg}`}
                          >
                            <TrendingUp className={`w-4 h-4 ${theme.scopeIcon}`} />
                            <span className="leading-snug">
                              {lang === 'en' ? meta.scopeBadgeEn : meta.scopeBadgeFa}
                            </span>
                          </div>

                          <div className="flex items-center justify-end gap-2 text-xs font-mono font-bold text-slate-500">
                            <span>{lang === 'en' ? 'Project Scale Volume:' : 'شاخص حجم و اسکیل:'}</span>
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {meta.volumeScore}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Narrative Essence */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                          {lang === 'en' ? 'Engagement Summary & Context' : 'شرح موقعیت و زمینه همکاری'}
                        </h4>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium max-w-4xl">
                          {item.summary[lang]}
                        </p>
                      </div>

                      {/* Deliverables & Milestones Grid */}
                      {highlights.length > 0 && (
                        <div className="space-y-4 pt-2">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                              <CheckCircle2 className={`w-4 h-4 ${theme.deliverableCheck}`} />
                              <span>
                                {lang === 'en'
                                  ? `Key Deliverables & Responsibilities (${highlights.length})`
                                  : `دستاوردها و خروجی‌های تخصصی (${highlights.length} مورد)`}
                              </span>
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {highlights.map((hl, hIdx) => (
                              <div
                                key={hIdx}
                                className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed ${theme.deliverableCard}`}
                              >
                                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${theme.deliverableDot}`} />
                                <span className="font-medium">{hl}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : (
              /* ALTERNATIVE: ALL CARDS BENTO GRID (IF USER TOGGLES ALL CARDS) */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredExperiences.map((item, idx) => {
                  const meta = EXPERIENCE_SCALE_MAP[item.id];
                  const theme = getCategoryTheme(item.category, meta?.tier);
                  const highlights = item.highlights[lang] || [];
                  const isFlagship = meta?.tier === 'flagship';

                  return (
                    <div
                      key={item.id}
                      className={`group bg-white rounded-2xl border p-6 space-y-4 transition-all duration-300 shadow-2xs hover:shadow-lg ${
                        isFlagship
                          ? 'border-indigo-200/90 ring-1 ring-indigo-100/70'
                          : 'border-slate-200'
                      } ${theme.borderHover}`}
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center ${theme.counterBg}`}>
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
                            {item.badge}
                          </span>
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-indigo-500" />
                            <span>{meta?.[isFa ? 'cityLabelFa' : 'cityLabelEn']}</span>
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-500">
                          {item.period[lang]}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-black text-slate-950 text-lg">
                          {item.company[lang]}
                        </h3>
                        <div className="flex items-center gap-2 text-xs">
                          <span className={`px-2 py-0.5 rounded font-bold ${theme.pillBg}`}>
                            {item.role[lang]}
                          </span>
                          <span className="text-slate-400">·</span>
                          <span className="text-slate-600">{item.type[lang]}</span>
                        </div>
                      </div>

                      <div className={`p-2.5 rounded-xl border text-xs font-bold ${theme.scopeBg}`}>
                        {lang === 'en' ? meta?.scopeBadgeEn : meta?.scopeBadgeFa}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.summary[lang]}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ============================================================= */}
          {/* B. MOBILE VIEW: VERTICAL CHRONOLOGICAL SPINE WITH ACCORDIONS */}
          {/* ============================================================= */}
          <div className="block lg:hidden space-y-6">
            <div className="relative pl-6 sm:pl-8 rtl:pl-0 rtl:pr-6 rtl:sm:pr-8 space-y-6">
              {/* Vertical connecting line */}
              <div className="absolute top-3 bottom-3 left-2.5 rtl:left-auto rtl:right-2.5 w-0.5 bg-slate-200" />

              {filteredExperiences.map((item, idx) => {
                const isExpanded = mobileExpanded[item.id] ?? false;
                const meta = EXPERIENCE_SCALE_MAP[item.id];
                const theme = getCategoryTheme(item.category, meta?.tier);
                const highlights = item.highlights[lang] || [];
                const isFlagship = meta?.tier === 'flagship';

                return (
                  <div key={item.id} className="relative group">
                    {/* Node Dot on vertical spine */}
                    <div
                      className={`absolute top-4 left-[-19px] rtl:left-auto rtl:right-[-19px] w-5 h-5 rounded-full border-2 border-white shadow-xs flex items-center justify-center ${theme.counterBg} ring-4 ring-slate-100`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    {/* Milestone Card */}
                    <div
                      className={`bg-white rounded-2xl border p-5 space-y-3.5 transition-all shadow-2xs hover:shadow-md ${
                        isFlagship
                          ? 'border-indigo-200/90 ring-1 ring-indigo-100/70 bg-linear-to-b from-indigo-50/15 to-white'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`w-5 h-5 rounded-md font-mono font-bold text-[10px] flex items-center justify-center ${theme.counterBg}`}>
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${theme.badge}`}>
                            {item.badge}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-indigo-500" />
                            <span>{meta?.[isFa ? 'cityLabelFa' : 'cityLabelEn']}</span>
                          </span>
                          {isFlagship && (
                            <span className="px-2 py-0.5 bg-indigo-600 text-white font-bold text-[10px] rounded-full">
                              {lang === 'en' ? 'Flagship' : 'پروژه کلان'}
                            </span>
                          )}
                        </div>

                        <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                          {meta ? (isFa ? meta.timelineYearFa : meta.timelineYearEn) : item.period[lang]}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-black text-slate-950 text-base">
                          {item.company[lang]}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className={`px-2 py-0.5 text-xs font-bold rounded ${theme.pillBg}`}>
                            {item.role[lang]}
                          </span>
                          <span className="text-slate-400">·</span>
                          <span className="text-slate-500 font-medium">{item.location[lang]}</span>
                        </div>
                      </div>

                      {/* Scope & Volume progress bar on mobile */}
                      <div className="space-y-1.5 p-2.5 rounded-xl border bg-slate-50/70 border-slate-200/80">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span className="flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{lang === 'en' ? meta?.scopeBadgeEn : meta?.scopeBadgeFa}</span>
                          </span>
                          <span className="font-mono text-emerald-700 font-black">
                            {meta?.volumeScore}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            style={{ width: `${meta?.volumeScore || 60}%` }}
                            className="bg-indigo-600 h-full rounded-full"
                          />
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.summary[lang]}
                      </p>

                      {highlights.length > 0 && (
                        <div className="pt-1 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => toggleMobileExpand(item.id)}
                            className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-slate-950 py-1 cursor-pointer"
                          >
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className={`w-3.5 h-3.5 ${theme.deliverableCheck}`} />
                              <span>
                                {lang === 'en'
                                  ? `${highlights.length} Deliverables`
                                  : `${highlights.length} دستاورد کلیدی`}
                              </span>
                            </span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {isExpanded && (
                            <div className="space-y-1.5 pt-2 animate-fadeIn">
                              {highlights.map((hl, hIdx) => (
                                <div
                                  key={hIdx}
                                  className={`p-2 rounded-lg border flex items-start gap-2 text-xs text-slate-800 ${theme.deliverableCard}`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${theme.deliverableDot}`} />
                                  <span>{hl}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* 6. DIRECT CONTACT CALLOUT (Icon-First Actions, Zero Phone Text) */}
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
