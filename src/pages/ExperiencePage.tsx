import React, { useState, useMemo, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Compass,
  FileCheck,
  HardHat,
  Layers,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Radar,
  Search,
  Send,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react';
import { EXPERIENCE_DATA, PROFILE_DATA } from '../data/portfolioData';
import { ExperienceItem, Language, PageId } from '../types';
import { VerticalCareerTimeline } from '../components/VerticalCareerTimeline';

interface ExperiencePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

type FilterCategory = 'all' | 'flagship' | 'brand_digital' | 'packaging_3d' | 'editorial_print' | 'civil_engineering';
type LocationFilter = 'all' | 'tehran' | 'urmia' | 'istanbul_global';
type ViewMode = 'linear_timeline' | 'radar_matrix' | 'all_cards';

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
  volumeScore: number;
  locationHub: 'tehran' | 'urmia' | 'istanbul_global';
  cityLabelFa: string;
  cityLabelEn: string;
  tickerFa: string;
  tickerEn: string;
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
    isHighImpact: true,
  },
  exp_urmia_med_uni: {
    tier: 'focused',
    scopeBadgeFa: 'طراحی نشان تجاری رسمی و گایدلاین هویت معاونت تحقیقات و فناوری',
    scopeBadgeEn: 'Official Emblem, Typography & Identity Manual for Academic Deputy',
    scopeMetricFa: 'نشان رسمی و تایپوگرافی',
    scopeMetricEn: 'Identity & Typography',
    yearFa: '۱۴۰۳',
    yearEn: '2024',
    timelineYearFa: '۱۴۰۳',
    timelineYearEn: '2024',
    volumeScore: 78,
    locationHub: 'urmia',
    cityLabelFa: 'ارومیه',
    cityLabelEn: 'Urmia',
    tickerFa: 'دانشگاه علوم پزشکی',
    tickerEn: 'Med University',
    isHighImpact: false,
  },
  exp_ofogh_iranian: {
    tier: 'significant',
    scopeBadgeFa: 'کمپین‌های تبلیغاتی چندکاناله، هویت بصری و گرافیک تجاری',
    scopeBadgeEn: 'Multi-Channel Advertising Campaigns, Commercial Identity & Collateral',
    scopeMetricFa: 'کمپین‌های چندکاناله بازاریابی',
    scopeMetricEn: 'Multi-Channel Campaigns',
    yearFa: '۱۴۰۲ - ۱۴۰۳',
    yearEn: '2023 – 2024',
    timelineYearFa: '۱۴۰۳',
    timelineYearEn: '2024',
    volumeScore: 80,
    locationHub: 'urmia',
    cityLabelFa: 'ارومیه',
    cityLabelEn: 'Urmia',
    tickerFa: 'افق ایرانیان',
    tickerEn: 'Ofogh Agency',
    isHighImpact: false,
  },
  exp_maral: {
    tier: 'flagship',
    scopeBadgeFa: '۳۱۰K+ بازدید ویدئو محصول · هدایت هنری، تلفیق AI و کاتالوگ صادراتی',
    scopeBadgeEn: '310K+ Viral Product Views · Art Direction, AI Integration & Export Catalog',
    scopeMetricFa: '۳۱۰K+ ویو · تلفیق AI',
    scopeMetricEn: '310K Views · AI Motion',
    yearFa: '۱۴۰۲ - ۱۴۰۳',
    yearEn: '2023 – 2024',
    timelineYearFa: '۱۴۰۳',
    timelineYearEn: '2024',
    volumeScore: 90,
    locationHub: 'istanbul_global',
    cityLabelFa: 'ارومیه و استانبول',
    cityLabelEn: 'Urmia & Istanbul',
    tickerFa: 'مارال پله',
    tickerEn: 'Maral Stairs',
    isHighImpact: true,
  },
  exp_nuve: {
    tier: 'significant',
    scopeBadgeFa: 'طراحی شیشه، استراکچر هاردباکس لوکس VIP و عکاسی محصول با AI',
    scopeBadgeEn: 'Cosmetics Glass Container, VIP Rigid Box Dielines & AI Product Imagery',
    scopeMetricFa: 'بسته‌بندی هاردباکس لوکس',
    scopeMetricEn: 'Luxury Rigid Packaging',
    yearFa: '۱۴۰۲ - ۱۴۰۳',
    yearEn: '2023 – 2024',
    timelineYearFa: '۱۴۰۳',
    timelineYearEn: '2024',
    volumeScore: 84,
    locationHub: 'tehran',
    cityLabelFa: 'تهران / دورکاری',
    cityLabelEn: 'Tehran / Remote',
    tickerFa: 'نووه کازمتیک',
    tickerEn: 'Nuve Cosmetics',
    isHighImpact: false,
  },
  exp_cic_nowhere: {
    tier: 'significant',
    scopeBadgeFa: '۴ هویت بصری مستقل برای واحدهای تخصصی رمزارز، نرم‌افزار، مارکتینگ و استودیو',
    scopeBadgeEn: '4 Independent Visual Identities for Crypto, Dev, Marketing & Studio Arms',
    scopeMetricFa: '۴ واحد سازمانی و برند مستقل',
    scopeMetricEn: '4 Discrete Brand Units',
    yearFa: '۱۴۰۲',
    yearEn: '2023',
    timelineYearFa: '۱۴۰۲',
    timelineYearEn: '2023',
    volumeScore: 82,
    locationHub: 'istanbul_global',
    cityLabelFa: 'استانبول و بین‌المللی',
    cityLabelEn: 'Istanbul & Global',
    tickerFa: 'CIC Nowhere',
    tickerEn: 'CIC Group',
    isHighImpact: false,
  },
  exp_spoota: {
    tier: 'flagship',
    scopeBadgeFa: 'هویت یکپارچه هلدینگ مادر · غرفه بین‌المللی، بسته‌بندی و سررسید سازمانی',
    scopeBadgeEn: 'Unified Parent Holding Identity · Expo Pavilion, Packaging & Yearbooks',
    scopeMetricFa: 'هلدینگ مادر + پاویون بین‌المللی',
    scopeMetricEn: 'Holding + Expo Pavilion',
    yearFa: '۱۴۰۱ - ۱۴۰۲',
    yearEn: '2022 – 2023',
    timelineYearFa: '۱۴۰۲',
    timelineYearEn: '2023',
    volumeScore: 91,
    locationHub: 'tehran',
    cityLabelFa: 'تهران و پاویون بین‌المللی',
    cityLabelEn: 'Tehran & Expo',
    tickerFa: 'هلدینگ اسپوتا',
    tickerEn: 'Spoota Holding',
    isHighImpact: true,
  },
  exp_khayyam_print: {
    tier: 'flagship',
    scopeBadgeFa: '۲+ سال فعالیت تخصصی پیش‌ازچاپ، تفکیک رنگ CMYK و نظارت لیتوگرافی',
    scopeBadgeEn: '2+ Years Direct Pre-Press, CMYK Plate Separation & Lithography Supervision',
    scopeMetricFa: '۲+ سال لیتوگرافی و چاپ افست',
    scopeMetricEn: 'Pre-Press QC & Offset',
    yearFa: '۱۴۰۱ - ۱۴۰۳',
    yearEn: '2022 – 2024',
    timelineYearFa: '۱۴۰۲',
    timelineYearEn: '2023',
    volumeScore: 87,
    locationHub: 'urmia',
    cityLabelFa: 'ارومیه',
    cityLabelEn: 'Urmia',
    tickerFa: 'چاپ خیام',
    tickerEn: 'Khayyam Print',
    isHighImpact: true,
  },
  exp_behrad: {
    tier: 'focused',
    scopeBadgeFa: '۳ سال طراحی کاتالوگ‌های شرکتی، هویت برند و اوراق اداری تجاری',
    scopeBadgeEn: '3 Years Corporate Catalogues, Brand Systems & Stationery Production',
    scopeMetricFa: '۳ سال انتشارات و چاپ تجاری',
    scopeMetricEn: '3 Yrs Commercial Print',
    yearFa: '۱۳۹۹ - ۱۴۰۲',
    yearEn: '2020 – 2023',
    timelineYearFa: '۱۴۰۱',
    timelineYearEn: '2022',
    volumeScore: 72,
    locationHub: 'tehran',
    cityLabelFa: 'تهران',
    cityLabelEn: 'Tehran',
    tickerFa: 'تبلیغات به‌راد',
    tickerEn: 'Behrad Ad',
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
    isHighImpact: false,
  },
};

// Unique Signature Color Palette per Milestone (Each Card / Box has a distinct curated color theme)
export interface MilestonePalette {
  accentHex: string;
  glowRgba: string;
  nameEn: string;
  nameFa: string;
  dotClass: string;
  tabBgClass: string;
  tabTextClass: string;
  tabBorderClass: string;
  cardBorderClass: string;
  cardBgClass: string;
  badgeBgClass: string;
  badgeTextClass: string;
  accentTextClass: string;
  buttonClass: string;
  checkIconClass: string;
  pillSelectedClass: string;
  pillBorderClass: string;
}

export const MILESTONE_PALETTES: Record<string, MilestonePalette> = {
  exp_rst: {
    accentHex: '#D4FF14',
    glowRgba: 'rgba(212, 255, 20, 0.28)',
    nameEn: 'Electric Neon Lime',
    nameFa: 'لایم نئونی صنعتی',
    dotClass: 'bg-[#D4FF14] text-neutral-950',
    tabBgClass: 'bg-[#121316] text-[#D4FF14] border-[#D4FF14]/50',
    tabTextClass: 'text-[#D4FF14]',
    tabBorderClass: 'border-[#D4FF14]/40',
    cardBorderClass: 'border-[#D4FF14]/60',
    cardBgClass: 'bg-[#121316] text-white',
    badgeBgClass: 'bg-[#D4FF14] text-neutral-950 font-black',
    badgeTextClass: 'text-neutral-950',
    accentTextClass: 'text-[#D4FF14]',
    buttonClass: 'bg-[#D4FF14] text-neutral-950 hover:bg-[#c2eb00] font-black',
    checkIconClass: 'text-[#D4FF14]',
    pillSelectedClass: 'bg-[#D4FF14] text-neutral-950 border-[#D4FF14] shadow-md ring-2 ring-[#D4FF14]/40',
    pillBorderClass: 'border-[#D4FF14]',
  },
  exp_tanabi: {
    accentHex: '#06B6D4',
    glowRgba: 'rgba(6, 182, 212, 0.28)',
    nameEn: 'Vivid Cyan',
    nameFa: 'فیروزه‌ای نئونی',
    dotClass: 'bg-cyan-500 text-white',
    tabBgClass: 'bg-[#081b29] text-cyan-300 border-cyan-500/50',
    tabTextClass: 'text-cyan-300',
    tabBorderClass: 'border-cyan-500/40',
    cardBorderClass: 'border-cyan-500/60',
    cardBgClass: 'bg-[#081b29] text-white',
    badgeBgClass: 'bg-cyan-500 text-neutral-950 font-black',
    badgeTextClass: 'text-neutral-950',
    accentTextClass: 'text-cyan-400',
    buttonClass: 'bg-cyan-400 text-neutral-950 hover:bg-cyan-300 font-black',
    checkIconClass: 'text-cyan-400',
    pillSelectedClass: 'bg-cyan-500 text-white border-cyan-400 shadow-md ring-2 ring-cyan-500/40',
    pillBorderClass: 'border-cyan-500',
  },
  exp_khesht_avval: {
    accentHex: '#F59E0B',
    glowRgba: 'rgba(245, 158, 11, 0.28)',
    nameEn: 'Sunburst Amber',
    nameFa: 'کهربایی طلایی',
    dotClass: 'bg-amber-500 text-neutral-950',
    tabBgClass: 'bg-[#221607] text-amber-300 border-amber-500/50',
    tabTextClass: 'text-amber-300',
    tabBorderClass: 'border-amber-500/40',
    cardBorderClass: 'border-amber-500/60',
    cardBgClass: 'bg-[#221607] text-white',
    badgeBgClass: 'bg-amber-500 text-neutral-950 font-black',
    badgeTextClass: 'text-neutral-950',
    accentTextClass: 'text-amber-400',
    buttonClass: 'bg-amber-400 text-neutral-950 hover:bg-amber-300 font-black',
    checkIconClass: 'text-amber-400',
    pillSelectedClass: 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md ring-2 ring-amber-500/40',
    pillBorderClass: 'border-amber-500',
  },
  exp_pransa: {
    accentHex: '#EC4899',
    glowRgba: 'rgba(236, 72, 153, 0.28)',
    nameEn: 'Vibrant Magenta',
    nameFa: 'ارغوانی لوکس',
    dotClass: 'bg-pink-500 text-white',
    tabBgClass: 'bg-[#240c1c] text-pink-300 border-pink-500/50',
    tabTextClass: 'text-pink-300',
    tabBorderClass: 'border-pink-500/40',
    cardBorderClass: 'border-pink-500/60',
    cardBgClass: 'bg-[#240c1c] text-white',
    badgeBgClass: 'bg-pink-500 text-white font-black',
    badgeTextClass: 'text-white',
    accentTextClass: 'text-pink-400',
    buttonClass: 'bg-pink-500 text-white hover:bg-pink-600 font-black',
    checkIconClass: 'text-pink-400',
    pillSelectedClass: 'bg-pink-500 text-white border-pink-400 shadow-md ring-2 ring-pink-500/40',
    pillBorderClass: 'border-pink-500',
  },
  exp_urmia_fda: {
    accentHex: '#3B82F6',
    glowRgba: 'rgba(59, 130, 246, 0.28)',
    nameEn: 'Royal Cobalt',
    nameFa: 'آبی کبالت دارویی',
    dotClass: 'bg-blue-500 text-white',
    tabBgClass: 'bg-[#0a1835] text-blue-300 border-blue-500/50',
    tabTextClass: 'text-blue-300',
    tabBorderClass: 'border-blue-500/40',
    cardBorderClass: 'border-blue-500/60',
    cardBgClass: 'bg-[#0a1835] text-white',
    badgeBgClass: 'bg-blue-500 text-white font-black',
    badgeTextClass: 'text-white',
    accentTextClass: 'text-blue-400',
    buttonClass: 'bg-blue-500 text-white hover:bg-blue-600 font-black',
    checkIconClass: 'text-blue-400',
    pillSelectedClass: 'bg-blue-600 text-white border-blue-400 shadow-md ring-2 ring-blue-500/40',
    pillBorderClass: 'border-blue-500',
  },
  exp_urmia_med_uni: {
    accentHex: '#10B981',
    glowRgba: 'rgba(16, 185, 129, 0.28)',
    nameEn: 'Emerald Green',
    nameFa: 'زمردی دانشگاهی',
    dotClass: 'bg-emerald-500 text-neutral-950',
    tabBgClass: 'bg-[#092218] text-emerald-300 border-emerald-500/50',
    tabTextClass: 'text-emerald-300',
    tabBorderClass: 'border-emerald-500/40',
    cardBorderClass: 'border-emerald-500/60',
    cardBgClass: 'bg-[#092218] text-white',
    badgeBgClass: 'bg-emerald-400 text-neutral-950 font-black',
    badgeTextClass: 'text-neutral-950',
    accentTextClass: 'text-emerald-400',
    buttonClass: 'bg-emerald-400 text-neutral-950 hover:bg-emerald-300 font-black',
    checkIconClass: 'text-emerald-400',
    pillSelectedClass: 'bg-emerald-500 text-neutral-950 border-emerald-400 shadow-md ring-2 ring-emerald-500/40',
    pillBorderClass: 'border-emerald-500',
  },
  exp_ofogh_iranian: {
    accentHex: '#F97316',
    glowRgba: 'rgba(249, 115, 22, 0.28)',
    nameEn: 'Solar Orange',
    nameFa: 'نارنجی نمایشگاهی',
    dotClass: 'bg-orange-500 text-white',
    tabBgClass: 'bg-[#291408] text-orange-300 border-orange-500/50',
    tabTextClass: 'text-orange-300',
    tabBorderClass: 'border-orange-500/40',
    cardBorderClass: 'border-orange-500/60',
    cardBgClass: 'bg-[#291408] text-white',
    badgeBgClass: 'bg-orange-500 text-white font-black',
    badgeTextClass: 'text-white',
    accentTextClass: 'text-orange-400',
    buttonClass: 'bg-orange-500 text-white hover:bg-orange-600 font-black',
    checkIconClass: 'text-orange-400',
    pillSelectedClass: 'bg-orange-500 text-white border-orange-400 shadow-md ring-2 ring-orange-500/40',
    pillBorderClass: 'border-orange-500',
  },
  exp_maral: {
    accentHex: '#8B5CF6',
    glowRgba: 'rgba(139, 92, 246, 0.28)',
    nameEn: 'Electric Violet',
    nameFa: 'بنفش الکتریک تریلر',
    dotClass: 'bg-purple-500 text-white',
    tabBgClass: 'bg-[#180f2d] text-purple-300 border-purple-500/50',
    tabTextClass: 'text-purple-300',
    tabBorderClass: 'border-purple-500/40',
    cardBorderClass: 'border-purple-500/60',
    cardBgClass: 'bg-[#180f2d] text-white',
    badgeBgClass: 'bg-purple-500 text-white font-black',
    badgeTextClass: 'text-white',
    accentTextClass: 'text-purple-400',
    buttonClass: 'bg-purple-500 text-white hover:bg-purple-600 font-black',
    checkIconClass: 'text-purple-400',
    pillSelectedClass: 'bg-purple-600 text-white border-purple-400 shadow-md ring-2 ring-purple-500/40',
    pillBorderClass: 'border-purple-500',
  },
  exp_nuve: {
    accentHex: '#F43F5E',
    glowRgba: 'rgba(244, 63, 94, 0.28)',
    nameEn: 'Luxury Crimson',
    nameFa: 'کرمسون رز آرایشی',
    dotClass: 'bg-rose-500 text-white',
    tabBgClass: 'bg-[#270b16] text-rose-300 border-rose-500/50',
    tabTextClass: 'text-rose-300',
    tabBorderClass: 'border-rose-500/40',
    cardBorderClass: 'border-rose-500/60',
    cardBgClass: 'bg-[#270b16] text-white',
    badgeBgClass: 'bg-rose-500 text-white font-black',
    badgeTextClass: 'text-white',
    accentTextClass: 'text-rose-400',
    buttonClass: 'bg-rose-500 text-white hover:bg-rose-600 font-black',
    checkIconClass: 'text-rose-400',
    pillSelectedClass: 'bg-rose-500 text-white border-rose-400 shadow-md ring-2 ring-rose-500/40',
    pillBorderClass: 'border-rose-500',
  },
  exp_cic_nowhere: {
    accentHex: '#6366F1',
    glowRgba: 'rgba(99, 102, 241, 0.28)',
    nameEn: 'Cyber Indigo',
    nameFa: 'نیلی استانبول',
    dotClass: 'bg-indigo-500 text-white',
    tabBgClass: 'bg-[#121332] text-indigo-300 border-indigo-500/50',
    tabTextClass: 'text-indigo-300',
    tabBorderClass: 'border-indigo-500/40',
    cardBorderClass: 'border-indigo-500/60',
    cardBgClass: 'bg-[#121332] text-white',
    badgeBgClass: 'bg-indigo-500 text-white font-black',
    badgeTextClass: 'text-white',
    accentTextClass: 'text-indigo-400',
    buttonClass: 'bg-indigo-500 text-white hover:bg-indigo-600 font-black',
    checkIconClass: 'text-indigo-400',
    pillSelectedClass: 'bg-indigo-600 text-white border-indigo-400 shadow-md ring-2 ring-indigo-500/40',
    pillBorderClass: 'border-indigo-500',
  },
  exp_spoota: {
    accentHex: '#EAB308',
    glowRgba: 'rgba(234, 179, 8, 0.28)',
    nameEn: 'Imperial Gold',
    nameFa: 'طلایی هلدینگ اسپوتا',
    dotClass: 'bg-yellow-500 text-neutral-950',
    tabBgClass: 'bg-[#221b06] text-yellow-300 border-yellow-500/50',
    tabTextClass: 'text-yellow-300',
    tabBorderClass: 'border-yellow-500/40',
    cardBorderClass: 'border-yellow-500/60',
    cardBgClass: 'bg-[#221b06] text-white',
    badgeBgClass: 'bg-yellow-400 text-neutral-950 font-black',
    badgeTextClass: 'text-neutral-950',
    accentTextClass: 'text-yellow-400',
    buttonClass: 'bg-yellow-400 text-neutral-950 hover:bg-yellow-300 font-black',
    checkIconClass: 'text-yellow-400',
    pillSelectedClass: 'bg-yellow-500 text-neutral-950 border-yellow-400 shadow-md ring-2 ring-yellow-500/40',
    pillBorderClass: 'border-yellow-500',
  },
  exp_khayyam_print: {
    accentHex: '#0284C7',
    glowRgba: 'rgba(2, 132, 199, 0.28)',
    nameEn: 'CMYK Cyan Press',
    nameFa: 'سایان لیتوگرافی و افست',
    dotClass: 'bg-sky-500 text-white',
    tabBgClass: 'bg-[#081f33] text-sky-300 border-sky-500/50',
    tabTextClass: 'text-sky-300',
    tabBorderClass: 'border-sky-500/40',
    cardBorderClass: 'border-sky-500/60',
    cardBgClass: 'bg-[#081f33] text-white',
    badgeBgClass: 'bg-sky-500 text-white font-black',
    badgeTextClass: 'text-white',
    accentTextClass: 'text-sky-400',
    buttonClass: 'bg-sky-500 text-white hover:bg-sky-600 font-black',
    checkIconClass: 'text-sky-400',
    pillSelectedClass: 'bg-sky-600 text-white border-sky-400 shadow-md ring-2 ring-sky-500/40',
    pillBorderClass: 'border-sky-500',
  },
  exp_behrad: {
    accentHex: '#0D9488',
    glowRgba: 'rgba(13, 148, 136, 0.28)',
    nameEn: 'Seafoam Teal',
    nameFa: 'سبز کله‌غازی به‌راد',
    dotClass: 'bg-teal-500 text-white',
    tabBgClass: 'bg-[#06211f] text-teal-300 border-teal-500/50',
    tabTextClass: 'text-teal-300',
    tabBorderClass: 'border-teal-500/40',
    cardBorderClass: 'border-teal-500/60',
    cardBgClass: 'bg-[#06211f] text-white',
    badgeBgClass: 'bg-teal-400 text-neutral-950 font-black',
    badgeTextClass: 'text-neutral-950',
    accentTextClass: 'text-teal-400',
    buttonClass: 'bg-teal-400 text-neutral-950 hover:bg-teal-300 font-black',
    checkIconClass: 'text-teal-400',
    pillSelectedClass: 'bg-teal-500 text-white border-teal-400 shadow-md ring-2 ring-teal-500/40',
    pillBorderClass: 'border-teal-500',
  },
  exp_urmia_municipality: {
    accentHex: '#64748B',
    glowRgba: 'rgba(100, 116, 139, 0.28)',
    nameEn: 'Steel Slate',
    nameFa: 'خاکستری فولادی عمران',
    dotClass: 'bg-slate-500 text-white',
    tabBgClass: 'bg-[#181f29] text-slate-300 border-slate-500/50',
    tabTextClass: 'text-slate-300',
    tabBorderClass: 'border-slate-500/40',
    cardBorderClass: 'border-slate-500/60',
    cardBgClass: 'bg-[#181f29] text-white',
    badgeBgClass: 'bg-slate-500 text-white font-black',
    badgeTextClass: 'text-white',
    accentTextClass: 'text-slate-300',
    buttonClass: 'bg-slate-600 text-white hover:bg-slate-500 font-black',
    checkIconClass: 'text-slate-300',
    pillSelectedClass: 'bg-slate-600 text-white border-slate-400 shadow-md ring-2 ring-slate-500/40',
    pillBorderClass: 'border-slate-500',
  },
  exp_nasb_niroo: {
    accentHex: '#EA580C',
    glowRgba: 'rgba(234, 88, 12, 0.28)',
    nameEn: 'Safety Orange Rust',
    nameFa: 'نارنجی سازه بتنی و سد',
    dotClass: 'bg-orange-600 text-white',
    tabBgClass: 'bg-[#291307] text-orange-300 border-orange-600/50',
    tabTextClass: 'text-orange-300',
    tabBorderClass: 'border-orange-600/40',
    cardBorderClass: 'border-orange-600/60',
    cardBgClass: 'bg-[#291307] text-white',
    badgeBgClass: 'bg-orange-600 text-white font-black',
    badgeTextClass: 'text-white',
    accentTextClass: 'text-orange-400',
    buttonClass: 'bg-orange-600 text-white hover:bg-orange-700 font-black',
    checkIconClass: 'text-orange-400',
    pillSelectedClass: 'bg-orange-600 text-white border-orange-400 shadow-md ring-2 ring-orange-500/40',
    pillBorderClass: 'border-orange-500',
  },
  exp_ministry_energy: {
    accentHex: '#0891B2',
    glowRgba: 'rgba(8, 145, 178, 0.28)',
    nameEn: 'Hydro Deep Cyan',
    nameFa: 'آبی هیدرولیک سدسازی',
    dotClass: 'bg-cyan-600 text-white',
    tabBgClass: 'bg-[#09222c] text-cyan-300 border-cyan-600/50',
    tabTextClass: 'text-cyan-300',
    tabBorderClass: 'border-cyan-600/40',
    cardBorderClass: 'border-cyan-600/60',
    cardBgClass: 'bg-[#09222c] text-white',
    badgeBgClass: 'bg-cyan-600 text-white font-black',
    badgeTextClass: 'text-white',
    accentTextClass: 'text-cyan-400',
    buttonClass: 'bg-cyan-600 text-white hover:bg-cyan-700 font-black',
    checkIconClass: 'text-cyan-400',
    pillSelectedClass: 'bg-cyan-600 text-white border-cyan-400 shadow-md ring-2 ring-cyan-500/40',
    pillBorderClass: 'border-cyan-500',
  },
};

// 6 Competency Dimensions for the Interactive Radar / Spider Chart
interface RadarDimension {
  id: string;
  labelEn: string;
  labelFa: string;
  score: number;
  highlightEn: string;
  highlightFa: string;
  toolsEn: string;
  toolsFa: string;
}

const RADAR_DIMENSIONS: RadarDimension[] = [
  {
    id: 'art_direction',
    labelEn: 'Art & Creative Direction',
    labelFa: 'مدیریت هنری و خلاقیت',
    score: 98,
    highlightEn: 'Strategic visual governance, cross-channel coherence, high-impact aesthetic leadership.',
    highlightFa: 'هدایت استراتژیک هویت بصری، هماهنگی چندکاناله و راهبری زیبایی‌شناسی پروژه‌ها.',
    toolsEn: 'Creative Direction · Brand Strategy · Design Systems',
    toolsFa: 'هدایت هنری · استراتژی برند · سیستم‌های دیزاین',
  },
  {
    id: 'brand_systems',
    labelEn: 'Brand Identity Systems',
    labelFa: 'سیستم‌های هویت بصری',
    score: 97,
    highlightEn: 'Enduring geometric marks, logo modernization, licensed typography & 50+ page brand books.',
    highlightFa: 'نشان‌های ماندگار هندسی، بازسازی لوگوهای کهنه، تایپوگرافی و کتابچه هویت ۵۰+ صفحه‌ای.',
    toolsEn: 'Adobe Illustrator · Figma · FontLab · Brand Books',
    toolsFa: 'ایلاستریتور · فیگما · گایدلاین برند · تایپوگرافی',
  },
  {
    id: 'packaging_dielines',
    labelEn: 'Packaging & Dielines',
    labelFa: 'مهندسی بسته‌بندی و خط تیغ',
    score: 96,
    highlightEn: 'Folding cartons, luxury magnetic rigid boxes, waterproof cosmetic & food labels.',
    highlightFa: 'کارتن تاشو، هاردباکس‌های مگنتی لوکس، لیبل‌های ضدآب آرایشی و بهداشتی با رعایت خواب الیاف.',
    toolsEn: 'Vector Dielines · Paper Caliper · Flute Grain · Rigid Box',
    toolsFa: 'خطوط تیغ وکتور · گرماژ مقوا · خواب الیاف کاغذ · هاردباکس',
  },
  {
    id: 'prepress_print',
    labelEn: 'Prepress & Print QC',
    labelFa: 'نظارت فنی چاپ و لیتوگرافی',
    score: 95,
    highlightEn: '2+ years direct offset supervision, CMYK plate separations, Pantone spot inks, dot-gain control.',
    highlightFa: '۲+ سال نظارت مستقیم لیتوگرافی در چاپخانه خیام، تفکیک رنگ CMYK، رنگ‌های پنتون و کنترل ترام.',
    toolsEn: 'Offset Lithography · ISO 12647-2 · Pantone PMS · Foil',
    toolsFa: 'چاپ افست و لیتوگرافی · استاندارد ISO · رنگ‌های اسپات · طلاکوب',
  },
  {
    id: 'technical_publishing',
    labelEn: 'Technical Catalogues',
    labelFa: 'نشر صنعتی و کاتالوگ جامع',
    score: 94,
    highlightEn: '200-page medical catalogues, heavy machinery axle parts books, exploded schematics.',
    highlightFa: 'کاتالوگ ۲۰۰ صفحه‌ای تجهیزات پزشکی، کتابچه جامع قطعات محورهای سنگین و دیاگرام‌های انفجاری.',
    toolsEn: 'Adobe InDesign · Editorial Grids · Complex Data Matrices',
    toolsFa: 'ایندیزاین · گریدبندی نشر · جداول مشخصات فنی مهندسی',
  },
  {
    id: '3d_cgi_visualization',
    labelEn: '3D CGI & Product Motion',
    labelFa: 'رندرینگ ۳D و شبیه‌سازی محصول',
    score: 90,
    highlightEn: 'Photorealistic 3D cosmetics (22 products for Iran Mall Expo), cinematic lighting & B2B motion reels.',
    highlightFa: 'مدل‌سازی سه‌بعدی ۲۲ محصول آرایشی برای پاویون ایران‌مال، نورپردازی صنعتی و موشن‌گرافیک محصول.',
    toolsEn: '3ds Max · KeyShot · Blender · After Effects',
    toolsFa: 'تری‌دی مکس · کی‌شات · بلندر · افترافکتس',
  },
];

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
  const [viewMode, setViewMode] = useState<ViewMode>('linear_timeline');
  const [hoveredDimension, setHoveredDimension] = useState<RadarDimension | null>(null);

  // Selected experience ID (defaults to RST / newest flagship active in 2026)
  const [selectedExperienceId, setSelectedExperienceId] = useState<string>('exp_rst');

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
      activeColor: 'bg-neutral-950 text-white shadow-xs',
      activeBadge: 'bg-neutral-800 text-white',
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
      labelFa: 'پایه‌های مهندسی عمران',
      icon: HardHat,
      activeColor: 'bg-sky-600 text-white shadow-xs',
      activeBadge: 'bg-sky-700 text-white',
    },
  ];

  const locationHubs: {
    id: LocationFilter;
    nameEn: string;
    nameFa: string;
    dotColor: string;
  }[] = [
    { id: 'all', nameEn: 'All Hubs', nameFa: 'همه مراکز', dotColor: 'bg-neutral-500' },
    { id: 'tehran', nameEn: 'Tehran Hub', nameFa: 'تهران', dotColor: 'bg-indigo-500' },
    { id: 'urmia', nameEn: 'Urmia Hub', nameFa: 'ارومیه', dotColor: 'bg-emerald-500' },
    { id: 'istanbul_global', nameEn: 'Istanbul & Global', nameFa: 'استانبول و بین‌المللی', dotColor: 'bg-amber-500' },
  ];

  // Filtered list of experiences
  const filteredExperiences = useMemo(() => {
    const list = EXPERIENCE_DATA.filter((item) => {
      const meta = EXPERIENCE_SCALE_MAP[item.id];

      // Category filter
      if (activeCategory === 'flagship') {
        if (!meta || meta.tier !== 'flagship') return false;
      } else if (activeCategory !== 'all') {
        if (item.category !== activeCategory) return false;
      }

      // Location filter
      if (activeLocation !== 'all') {
        if (!meta || meta.locationHub !== activeLocation) return false;
      }

      // Search query
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

  // Synchronize spotlight selection
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

  // Geographic statistics
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

  // Timeline chronological ordering: default newest_first (2026/1404 -> 2016/1395)
  const [timelineOrder, setTimelineOrder] = useState<'newest_first' | 'oldest_first'>('newest_first');

  const verticalTimelineItems = useMemo(() => {
    return [...filteredExperiences].sort((a, b) => {
      const scoreA = EXPERIENCE_CHRONO_MAP[a.id] || 0;
      const scoreB = EXPERIENCE_CHRONO_MAP[b.id] || 0;
      return timelineOrder === 'newest_first' ? scoreB - scoreA : scoreA - scoreB;
    });
  }, [filteredExperiences, timelineOrder]);

  const chronologicalTimelineItems = verticalTimelineItems;

  // Compact & Concise Project Dossier Card Renderer (Responsive & High-Hierarchy)
  const renderCompactDossier = (item: ExperienceItem, isInlineMobile = false) => {
    const meta = EXPERIENCE_SCALE_MAP[item.id];
    const isFlagship = meta?.tier === 'flagship';
    const highlights = item.highlights[lang] || [];
    const palette = MILESTONE_PALETTES[item.id] || MILESTONE_PALETTES['exp_rst'];
    const itemIndex = filteredExperiences.findIndex((i) => i.id === item.id);
    const displayNum = itemIndex >= 0 ? (itemIndex + 1 < 10 ? `0${itemIndex + 1}` : `${itemIndex + 1}`) : '01';

    return (
      <div className={`relative group ${isInlineMobile ? 'mt-2 mb-3' : ''}`}>
        {/* Top Folder Tab */}
        <div className="flex items-center justify-between px-2">
          <div
            className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-t-xl font-mono text-[11px] font-black tracking-wider uppercase z-10 -mb-px border-t border-x ${palette.tabBgClass}`}
          >
            <span
              style={{ backgroundColor: palette.accentHex }}
              className="w-2 h-2 rounded-full animate-pulse shrink-0"
            />
            <span>
              // {lang === 'en' ? 'DOSSIER' : 'پرونده'} {displayNum} · {item.badge}
            </span>
          </div>

          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:inline">
            {meta ? (isFa ? meta.timelineYearFa : meta.timelineYearEn) : item.period[lang]}
          </span>
        </div>

        {/* Main Compact Card Container with Milestone Theme */}
        <div
          style={{
            boxShadow: `0 16px 36px -12px ${palette.glowRgba}`,
          }}
          className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 shadow-lg transition-all border ${palette.cardBorderClass} ${palette.cardBgClass}`}
        >
          {/* Header */}
          <div className="space-y-1.5 border-b border-white/10 pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {isFlagship && (
                  <span
                    style={{ backgroundColor: palette.accentHex, color: '#09090b' }}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-black text-[11px] font-display shadow-2xs"
                  >
                    <Star className="w-3 h-3 fill-current text-current" />
                    <span>{lang === 'en' ? 'Flagship' : 'شاخص'}</span>
                  </span>
                )}
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 text-white font-display flex items-center gap-1">
                  <MapPin style={{ color: palette.accentHex }} className="w-3 h-3" />
                  <span>{meta?.[isFa ? 'cityLabelFa' : 'cityLabelEn'] || item.location[lang]}</span>
                </span>
              </div>

              <span
                style={{ borderColor: `${palette.accentHex}40`, color: palette.accentHex }}
                className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border bg-white/5"
              >
                {meta ? (isFa ? meta.timelineYearFa : meta.timelineYearEn) : item.period[lang]}
              </span>
            </div>

            <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white">
              {item.company[lang]}
            </h3>

            <div
              style={{ color: palette.accentHex }}
              className="text-xs sm:text-sm font-bold font-display"
            >
              {item.role[lang]}
            </div>
          </div>

          {/* Mission Brief / Summary (Concise & punchy) */}
          <p className="text-xs sm:text-sm leading-relaxed font-medium text-neutral-200">
            {item.summary[lang]}
          </p>

          {/* Tangible Highlights (Bite-sized bullets) */}
          <div className="space-y-2 pt-1 border-t border-white/10">
            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
              {lang === 'en' ? '// Core Deliverables:' : '// خروجی‌ها و اقلام تولیدشده:'}
            </span>
            <div className="space-y-1.5">
              {highlights.slice(0, 3).map((h, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2 text-xs font-semibold text-neutral-100">
                  <CheckCircle2
                    style={{ color: palette.accentHex }}
                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                  />
                  <span className="leading-snug">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prepress & Workshop Specs Micro-Chips */}
          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-neutral-300 border border-white/10">
              {lang === 'en' ? 'ISO 12647-2 Prepress' : 'افست ISO 12647-2'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-neutral-300 border border-white/10">
              {lang === 'en' ? 'Vector CAD Dieline' : 'خط تیغ و ماکت وکتور'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-neutral-300 border border-white/10">
              {lang === 'en' ? 'Color Separation QC' : 'تفکیک زینک و نظارت لیتوگرافی'}
            </span>
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('work')}
              className={`px-4 py-2 rounded-full text-xs font-black font-display inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${palette.buttonClass}`}
            >
              <span>{lang === 'en' ? 'View Works' : 'مشاهده نمونه‌کارها'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-3.5 py-2 rounded-full text-xs font-bold border border-white/20 text-neutral-200 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <span>{lang === 'en' ? 'Inquire Project' : 'استعلام پروژه'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // -------------------------------------------------------------
  // RADAR / SPIDER CHART COORDINATES
  // Center: (220, 220), Radius: 150
  // -------------------------------------------------------------
  const radarCenter = { x: 230, y: 220 };
  const radarRadius = 150;
  const numAxes = RADAR_DIMENSIONS.length;

  // Concentric polygon web paths (20%, 40%, 60%, 80%, 100%)
  const radarWebRings = useMemo(() => {
    const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
    return levels.map((lvl) => {
      const points = Array.from({ length: numAxes }).map((_, i) => {
        const angle = -Math.PI / 2 + i * ((2 * Math.PI) / numAxes);
        const r = radarRadius * lvl;
        const x = radarCenter.x + r * Math.cos(angle);
        const y = radarCenter.y + r * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      });
      return points.join(' ');
    });
  }, [numAxes, radarCenter.x, radarCenter.y, radarRadius]);

  // Data Polygon Path for actual competency scores
  const radarDataPolygon = useMemo(() => {
    const points = RADAR_DIMENSIONS.map((dim, i) => {
      const angle = -Math.PI / 2 + i * ((2 * Math.PI) / numAxes);
      const r = radarRadius * (dim.score / 100);
      const x = radarCenter.x + r * Math.cos(angle);
      const y = radarCenter.y + r * Math.sin(angle);
      return { x, y, dim };
    });
    const pathStr = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    return { pathStr, points };
  }, [numAxes, radarCenter.x, radarCenter.y, radarRadius]);

  return (
    <div className={`max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-12 ${isFa ? 'text-right' : 'text-left'}`}>
      {/* 1. PAGE HEADER */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs font-bold font-display uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          <span>{lang === 'en' ? 'Career & Competency Matrix' : 'سوابق حرفه‌ای و ماتریس شایستگی‌های دیزاین'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
          {lang === 'en'
            ? 'Professional Experience & Career Record'
            : 'سوابق حرفه‌ای، مدیریت هنری و پیشینه مهندسی'}
        </h1>

        <p className="text-xs sm:text-base text-neutral-600 leading-relaxed font-medium">
          {lang === 'en'
            ? 'A chronological journey spanning 2016 to 2026 with alternating timeline milestones, paired with a multi-dimensional radar matrix of Art Direction, Packaging Dielines, and Prepress mastery.'
            : 'تایم‌لاین خطی سوابق با چینش متناوب بالا و پایین (از ۱۳۹۵ تا ۱۴۰۴)، همراه با نمودار عنکبوتی شایستگی‌های چندبعدی مدیر هنری در بسته‌بندی، هویت و نظارت کارگاهی چاپ.'}
        </p>
      </div>

      {/* 2. SCALE OVERVIEW METRIC CHIPS (Organic Dossier Styling) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-neutral-200/90 shadow-2xs hover:shadow-xs transition-all space-y-1.5 group">
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-black font-display text-indigo-600 tracking-tight">
              {isFa ? '۷ پروژه' : '7 Flagships'}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 group-hover:scale-125 transition-transform" />
          </div>
          <span className="text-xs text-neutral-900 font-bold block">
            {lang === 'en' ? 'Flagship & Major Scope' : 'پروژه‌های کلان، ۳۶۰° و شاخص'}
          </span>
          <span className="text-[11px] text-neutral-500 font-medium block">
            {lang === 'en' ? 'Comprehensive B2B & Retail Systems' : 'سیستم‌های برندینگ، شلف و هویت'}
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-neutral-200/90 shadow-2xs hover:shadow-xs transition-all space-y-1.5 group">
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-black font-display text-rose-600 tracking-tight">
              {isFa ? '۲۰۰ صفحه' : '200 Pages'}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 group-hover:scale-125 transition-transform" />
          </div>
          <span className="text-xs text-neutral-900 font-bold block">
            {lang === 'en' ? 'Medical Equipment Catalog' : 'کتاب مرجع ۳۱ کارخانه دارویی'}
          </span>
          <span className="text-[11px] text-neutral-500 font-medium block">
            {lang === 'en' ? 'Editorial Architecture & Prepress' : 'تدوین و نظارت لیتوگرافی و افست'}
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-neutral-200/90 shadow-2xs hover:shadow-xs transition-all space-y-1.5 group">
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-black font-display text-emerald-600 tracking-tight">
              {isFa ? '۲۲ محصول' : '22 Products'}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 group-hover:scale-125 transition-transform" />
          </div>
          <span className="text-xs text-neutral-900 font-bold block">
            {lang === 'en' ? '3D Cosmetic Visualizations' : 'مدل‌سازی و رندرینگ ۳D شلف'}
          </span>
          <span className="text-[11px] text-neutral-500 font-medium block">
            {lang === 'en' ? 'Iran Mall Expo Exhibition Brochure' : 'پاویون نمایشگاهی ایران‌مال'}
          </span>
        </div>

        <div className="bg-[#121316] text-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-2xs hover:shadow-xs transition-all space-y-1.5 group">
          <div className="flex items-center justify-between">
            <span className="text-xl sm:text-2xl font-black font-display text-[#d4ff14] tracking-tight">
              {isFa ? 'مدیر هنری و خلاقیت' : 'Creative Director'}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4ff14] group-hover:scale-125 transition-transform" />
          </div>
          <span className="text-xs text-white font-bold block">
            {lang === 'en' ? 'Art & Creative Direction' : 'هدایت هنری و استراتژی بصری'}
          </span>
          <span className="text-[11px] text-neutral-400 font-medium block">
            {lang === 'en' ? 'Packaging, Brand & Product Comms' : 'بسته‌بندی، هویت و ارتباطات برند'}
          </span>
        </div>
      </div>

      {/* 3. GEOGRAPHIC DISTRIBUTION BAR */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-neutral-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-black text-neutral-900 font-display block">
                {lang === 'en' ? 'Geographic Distribution of Projects' : 'تفکیک مکانی و گستره جغرافیایی پروژه‌ها'}
              </span>
              <span className="text-[11px] text-neutral-500 font-medium">
                {lang === 'en'
                  ? 'Design and engineering hubs across Tehran, Urmia, and Istanbul'
                  : 'توزیع پروژه‌های دیزاین و مهندسی میان تهران، ارومیه و استانبول'}
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
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer font-display ${
                    isSelected
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${hub.dotColor}`} />
                  <span>{lang === 'en' ? hub.nameEn : hub.nameFa}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-neutral-800 text-white' : 'bg-neutral-200/70 text-neutral-600'
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
        <div className="space-y-2 pt-1 border-t border-neutral-100">
          <div className="h-2.5 rounded-full bg-neutral-100 overflow-hidden flex shadow-inner">
            <div
              style={{ width: `${locationStats.tehranPercent}%` }}
              className="bg-indigo-500 hover:bg-indigo-600 transition-all h-full"
              title={`Tehran: ${locationStats.tehranCount}`}
            />
            <div
              style={{ width: `${locationStats.urmiaPercent}%` }}
              className="bg-emerald-500 hover:bg-emerald-600 transition-all h-full"
              title={`Urmia: ${locationStats.urmiaCount}`}
            />
            <div
              style={{ width: `${locationStats.globalPercent}%` }}
              className="bg-amber-500 hover:bg-amber-600 transition-all h-full"
              title={`Istanbul/Global: ${locationStats.globalCount}`}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] font-bold font-mono text-neutral-600 gap-2">
            <span className="flex items-center gap-1.5 text-indigo-700">
              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
              {lang === 'en'
                ? `Tehran: ${locationStats.tehranCount} projects (Enterprise & Brand)`
                : `تهران: ${locationStats.tehranCount} پروژه سازمانی و برند`}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              {lang === 'en'
                ? `Urmia: ${locationStats.urmiaCount} projects (Packaging & Print)`
                : `ارومیه: ${locationStats.urmiaCount} پروژه بسته‌بندی و چاپ`}
            </span>
            <span className="flex items-center gap-1.5 text-amber-800">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              {lang === 'en'
                ? `Istanbul & Global: ${locationStats.globalCount} projects (Tech & Trade)`
                : `استانبول و بین‌المللی: ${locationStats.globalCount} پروژه تجاری و کریپتو`}
            </span>
          </div>
        </div>
      </div>

      {/* 4. CONTROLS BAR: SEARCH & PRIMARY VIEW SWITCHER */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-50 p-3 rounded-2xl border border-neutral-200/80">
          {/* Search Box */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className={`w-3.5 h-3.5 text-neutral-400 absolute top-1/2 -translate-y-1/2 ${isFa ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search records...' : 'جستجو در شرکت، شهر...'}
              className={`w-full text-xs font-medium bg-white border border-neutral-200 rounded-xl py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                isFa ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'
              }`}
            />
          </div>

            {/* View Mode Switcher: Linear Timeline vs Radar Matrix vs All Cards */}
            <div className="flex items-center bg-white border border-neutral-200 rounded-xl p-0.5 shadow-2xs shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('linear_timeline')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                  viewMode === 'linear_timeline'
                    ? 'bg-neutral-950 text-white'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
                title={lang === 'en' ? 'Alternating Linear Timeline' : 'تایم‌لاین خطی متناوب'}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Timeline' : 'تایم‌لاین'}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('radar_matrix')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                  viewMode === 'radar_matrix'
                    ? 'bg-indigo-600 text-white'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
                title={lang === 'en' ? 'Spider / Radar Matrix' : 'نمودار عنکبوتی شایستگی‌ها'}
              >
                <Radar className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Spider' : 'عنکبوتی'}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('all_cards')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                  viewMode === 'all_cards'
                    ? 'bg-neutral-950 text-white'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
                title={lang === 'en' ? 'All Dossiers' : 'همه پرونده‌ها'}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Dossiers' : 'پرونده‌ها'}</span>
              </button>
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

      {/* ------------------------------------------------------------- */}
      {/* 5. MAIN PRESENTATION: LINEAR TIMELINE, RADAR MATRIX OR ALL CARDS */}
      {/* ------------------------------------------------------------- */}
      {filteredExperiences.length === 0 ? (
        <div className="text-center py-16 bg-neutral-50 rounded-3xl border border-neutral-200/80 space-y-3">
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
        <div className="space-y-10">
          {/* VIEW MODE 1: VERTICAL TIMELINE WITH SIDE-BY-SIDE COMPACT DOSSIER */}
          {viewMode === 'linear_timeline' && (
            <VerticalCareerTimeline
              lang={lang}
              onNavigate={onNavigate}
              filteredExperiences={filteredExperiences}
              selectedExperienceId={selectedExperienceId}
              onSelectExperience={setSelectedExperienceId}
            />
          )}
          {/* VIEW MODE 2: INTERACTIVE SPIDER / RADAR CHART */}
          {viewMode === 'radar_matrix' && (
            <div className="space-y-8">
              <div className="bg-[#121316] text-white rounded-3xl border border-neutral-800 shadow-xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
                  <div className="space-y-2 max-w-2xl">
                    <span className="text-xs font-mono font-bold text-[#d4ff14] uppercase tracking-widest block">
                      // MULTI-DIMENSIONAL RADAR MATRIX
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {lang === 'en'
                        ? 'Creative & Engineering Competency Dimensions'
                        : 'ماتریس شایستگی‌های چندبعدی مدیر هنری و مهندسی'}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
                      {lang === 'en'
                        ? 'Combining engineering discipline with pure artistic direction. Hover over any vertex to inspect tools, standards, and verified project outcomes.'
                        : 'پیوند انضباط مهندسی با هدایت هنری اصیل؛ ماوس را روی هر رأس نمودار عنکبوتی ببرید تا ابزارها، استانداردها و تجربیات میدانی را مشاهده کنید.'}
                    </p>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono font-bold text-[#d4ff14] shrink-0">
                    <span>{lang === 'en' ? '[ INDUSTRIAL & ATELIER STANDARDS ]' : '[ استانداردهای کارگاهی و نشر صنعتی ]'}</span>
                  </div>
                </div>

                {/* Radar Grid and Interactive Inspection Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* SVG Spider Chart (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col items-center justify-center py-2 space-y-4">
                    {/* Mobile quick-select competency pills */}
                    <div className="flex lg:hidden flex-wrap items-center justify-center gap-1.5 w-full">
                      {RADAR_DIMENSIONS.map((dim) => {
                        const isSelected = (hoveredDimension || RADAR_DIMENSIONS[0]).id === dim.id;
                        return (
                          <button
                            key={dim.id}
                            type="button"
                            onClick={() => setHoveredDimension(dim)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#d4ff14] text-neutral-950 font-black shadow-xs'
                                : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                            }`}
                          >
                            <span>{isFa ? dim.labelFa : dim.labelEn}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="relative w-full max-w-[340px] sm:max-w-[460px] aspect-square" dir="ltr">
                      <svg viewBox="0 0 460 440" className="w-full h-full drop-shadow-2xl">
                        <defs>
                          <linearGradient id="radarAreaGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#d4ff14" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.25" />
                          </linearGradient>
                          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#d4ff14" floodOpacity="0.6" />
                          </filter>
                        </defs>

                        {/* Concentric Spider Rings */}
                        {radarWebRings.map((ringStr, rIdx) => (
                          <polygon
                            key={rIdx}
                            points={ringStr}
                            fill="none"
                            stroke="#26282f"
                            strokeWidth="1"
                            strokeDasharray={rIdx === 4 ? undefined : '3 3'}
                          />
                        ))}

                        {/* Radial Spokes from Center - stops 16px before outer rim so lines never stick to dots */}
                        {Array.from({ length: numAxes }).map((_, i) => {
                          const angle = -Math.PI / 2 + i * ((2 * Math.PI) / numAxes);
                          const spokeRadius = radarRadius - 16;
                          const x2 = radarCenter.x + spokeRadius * Math.cos(angle);
                          const y2 = radarCenter.y + spokeRadius * Math.sin(angle);
                          return (
                            <line
                              key={i}
                              x1={radarCenter.x}
                              y1={radarCenter.y}
                              x2={x2}
                              y2={y2}
                              stroke="#2a2c35"
                              strokeWidth="1"
                            />
                          );
                        })}

                        {/* Filled Competency Polygon Web */}
                        <polygon
                          points={radarDataPolygon.pathStr}
                          fill="url(#radarAreaGradient)"
                          stroke="#d4ff14"
                          strokeWidth="2.5"
                          className="transition-all duration-300"
                        />

                        {/* Vertex Interactive Data Dots & Labels */}
                        {radarDataPolygon.points.map((pt, i) => {
                          const isHovered = hoveredDimension?.id === pt.dim.id;
                          const labelAngle = -Math.PI / 2 + i * ((2 * Math.PI) / numAxes);
                          const labelDistance = radarRadius + 28;
                          const lx = radarCenter.x + labelDistance * Math.cos(labelAngle);
                          const ly = radarCenter.y + labelDistance * Math.sin(labelAngle) + 4;

                          return (
                            <g
                              key={pt.dim.id}
                              className="cursor-pointer group"
                              onMouseEnter={() => setHoveredDimension(pt.dim)}
                              onClick={() => setHoveredDimension(pt.dim)}
                            >
                              {/* Pulse Aura */}
                              {isHovered && (
                                <circle
                                  cx={pt.x}
                                  cy={pt.y}
                                  r="14"
                                  fill="#d4ff14"
                                  opacity="0.3"
                                  className="animate-ping"
                                />
                              )}

                              {/* Vertex Dot with insulating protective border so lines don't collide */}
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r={isHovered ? 7 : 5}
                                fill="#d4ff14"
                                stroke="#121316"
                                strokeWidth="3"
                                filter={isHovered ? 'url(#radarGlow)' : undefined}
                                className="transition-all duration-200"
                              />

                              {/* Axis Label (Plain qualitative name, no percentages) */}
                              <text
                                x={lx}
                                y={ly}
                                fill={isHovered ? '#d4ff14' : '#a1a1aa'}
                                fontSize="9"
                                fontFamily="sans-serif"
                                fontWeight={isHovered ? '900' : '700'}
                                textAnchor={
                                  Math.abs(Math.cos(labelAngle)) < 0.2
                                    ? 'middle'
                                    : Math.cos(labelAngle) > 0
                                    ? 'start'
                                    : 'end'
                                }
                                className="transition-colors"
                              >
                                {isFa ? pt.dim.labelFa : pt.dim.labelEn}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>

                  {/* Competency Deep Dive Card (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    {(() => {
                      const activeDim = hoveredDimension || RADAR_DIMENSIONS[0];
                      return (
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-7 space-y-5">
                          <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <span className="font-mono text-xs font-bold text-[#d4ff14]">
                              // {lang === 'en' ? 'SELECTED DIMENSION' : 'شاخص انتخاب‌شده'}
                            </span>
                            <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-[#d4ff14]/10 text-[#d4ff14] border border-[#d4ff14]/30">
                              {lang === 'en' ? 'Core Atelier Standard' : 'تخصص کارگاهی و صنعتی'}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-xl font-black text-white">
                              {isFa ? activeDim.labelFa : activeDim.labelEn}
                            </h4>
                            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
                              {isFa ? activeDim.highlightFa : activeDim.highlightEn}
                            </p>
                          </div>

                          <div className="space-y-2 pt-2 border-t border-white/10">
                            <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                              {lang === 'en' ? 'Core Tools & Standards:' : 'ابزارها و استانداردهای تخصصی:'}
                            </span>
                            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono font-bold text-neutral-200">
                              {isFa ? activeDim.toolsFa : activeDim.toolsEn}
                            </div>
                          </div>

                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => setViewMode('linear_timeline')}
                              className="w-full py-2.5 rounded-full bg-[#d4ff14] hover:bg-[#c2eb00] text-neutral-950 font-black text-xs transition-colors cursor-pointer text-center font-display block"
                            >
                              {lang === 'en' ? 'Inspect Related Timeline Milestones →' : 'بررسی سوابق کاری مرتبط با این مهارت ←'}
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE 3: ALL DOSSIER CARDS (ScreenHunter_285 Style Grid) */}
          {viewMode === 'all_cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {filteredExperiences.map((item, idx) => {
                const meta = EXPERIENCE_SCALE_MAP[item.id];
                const itemPalette = MILESTONE_PALETTES[item.id] || MILESTONE_PALETTES['exp_rst'];
                const highlights = item.highlights[lang] || [];
                const asymmetricShape = isFa
                  ? 'rounded-tl-[24px] sm:rounded-tl-[36px] rounded-b-[24px] sm:rounded-b-[36px] rounded-tr-none'
                  : 'rounded-tr-[24px] sm:rounded-tr-[36px] rounded-b-[24px] sm:rounded-b-[36px] rounded-tl-none';

                return (
                  <div key={item.id} className="relative group flex flex-col pt-3">
                    {/* Top Manila Folder Tab with Milestone Signature Color */}
                    <div className="flex items-center justify-between px-2">
                      <div
                        className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-t-2xl font-mono text-xs font-black tracking-wider uppercase z-10 -mb-px border-t border-x ${itemPalette.tabBgClass}`}
                      >
                        <span
                          style={{ backgroundColor: itemPalette.accentHex }}
                          className="w-2 h-2 rounded-full"
                        />
                        <span>
                          // {lang === 'en' ? 'DOSSIER' : 'پرونده'} {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        {meta ? (isFa ? meta.timelineYearFa : meta.timelineYearEn) : item.period[lang]}
                      </span>
                    </div>

                    {/* Card Body with Milestone Theme */}
                    <div
                      style={{
                        boxShadow: `0 14px 34px -10px ${itemPalette.glowRgba}`,
                      }}
                      className={`${asymmetricShape} p-5 sm:p-7 space-y-4 flex-1 flex flex-col justify-between transition-all duration-300 border ${itemPalette.cardBorderClass} ${itemPalette.cardBgClass}`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <span className="text-xs font-bold text-neutral-300 font-display">
                            {meta?.[isFa ? 'cityLabelFa' : 'cityLabelEn'] || item.location[lang]}
                          </span>
                          <span
                            style={{ borderColor: `${itemPalette.accentHex}40`, color: itemPalette.accentHex }}
                            className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-white/5"
                          >
                            {item.badge}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                          {item.company[lang]}
                        </h3>

                        <p
                          style={{ color: itemPalette.accentHex }}
                          className="text-xs sm:text-sm font-bold"
                        >
                          {item.role[lang]}
                        </p>

                        <p className="text-xs sm:text-sm leading-relaxed font-medium text-neutral-300">
                          {item.summary[lang]}
                        </p>

                        {/* Top Highlights Preview */}
                        <div className="space-y-1.5 pt-2">
                          {highlights.slice(0, 2).map((h, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-start gap-2 text-xs font-semibold text-neutral-200"
                            >
                              <CheckCircle2
                                style={{ color: itemPalette.accentHex }}
                                className="w-3.5 h-3.5 shrink-0 mt-0.5"
                              />
                              <span className="line-clamp-2">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedExperienceId(item.id);
                            setViewMode('linear_timeline');
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                          style={{ color: itemPalette.accentHex }}
                          className="text-xs font-black inline-flex items-center gap-1.5 cursor-pointer font-display hover:underline"
                        >
                          <span>{lang === 'en' ? 'Inspect Full Dossier' : 'بررسی پرونده کامل'}</span>
                          <ArrowIcon className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] font-mono text-neutral-400">
                          [ ISO 12647-2 ]
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 6. CALLOUT: CO-CREATION INQUIRY */}
      <section className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 space-y-6 border border-neutral-800 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono font-bold text-[#d4ff14] uppercase tracking-widest block">
            // NEXT COMMERCIAL COLLABORATION
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {lang === 'en'
              ? 'Ready to Elevate Your Brand Architecture & Shelf Packaging?'
              : 'آماده همکاری در زمینه ارتقای هویت و ارتباطات بصری محصول'}
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed font-medium">
            {lang === 'en'
              ? 'Whether developing technical export catalogs, rigid packaging lines, or full identity redesigns, let’s schedule a direct, honest conversation.'
              : 'آماده هدایت هنری پروژه‌ها، خلق سیستم‌های هویت بصری، رندرینگ سه‌بعدی و کاتالوگ‌های چندصد صفحه‌ای صنعتی با بالاترین دقت لیتوگرافی و چاپ.'}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <a
            href={`tel:${PROFILE_DATA.links.phone}`}
            className="px-6 py-3.5 bg-[#d4ff14] hover:bg-[#c2eb00] text-neutral-950 font-black text-sm rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-md font-display"
          >
            <Phone className="w-4 h-4 text-neutral-950" />
            <span>{lang === 'en' ? 'Direct Call' : 'تماس مستقیم تلفنی'}</span>
          </a>

          <a
            href={PROFILE_DATA.links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-full border border-white/20 transition-all flex items-center gap-2 cursor-pointer font-display"
          >
            <Send className="w-4 h-4 text-white" />
            <span>{lang === 'en' ? 'Telegram' : 'تلگرام'}</span>
          </a>

          <a
            href={PROFILE_DATA.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-full transition-all flex items-center gap-2 cursor-pointer font-display"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-neutral-300 font-bold text-sm rounded-full border border-white/10 transition-all cursor-pointer font-display"
          >
            <span>{lang === 'en' ? 'Inquiry Form' : 'فرم استعلام'}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
