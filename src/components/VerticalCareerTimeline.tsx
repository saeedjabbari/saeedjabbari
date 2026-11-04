import React, { useState, useMemo, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
} from 'lucide-react';
import { ExperienceItem, Language, PageId } from '../types';

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

export const CAREER_CHRONO_MAP: Record<string, number> = {
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

export const CAREER_SCALE_MAP: Record<string, ScopeScaleMeta> = {
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

export const CAREER_PALETTES: Record<string, MilestonePalette> = {
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

interface VerticalCareerTimelineProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  filteredExperiences: ExperienceItem[];
  selectedExperienceId: string;
  onSelectExperience: (id: string) => void;
}

export const VerticalCareerTimeline: React.FC<VerticalCareerTimelineProps> = ({
  lang,
  onNavigate,
  filteredExperiences,
  selectedExperienceId,
  onSelectExperience,
}) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;
  const NextChevron = isFa ? ChevronLeft : ChevronRight;
  const PrevChevron = isFa ? ChevronRight : ChevronLeft;

  const [sortDirection, setSortDirection] = useState<'newest_first' | 'oldest_first'>('newest_first');

  // Sorted list for vertical timeline rail
  const sortedItems = useMemo(() => {
    return [...filteredExperiences].sort((a, b) => {
      const scoreA = CAREER_CHRONO_MAP[a.id] || 0;
      const scoreB = CAREER_CHRONO_MAP[b.id] || 0;
      return sortDirection === 'newest_first' ? scoreB - scoreA : scoreA - scoreB;
    });
  }, [filteredExperiences, sortDirection]);

  // Current selected item
  const currentItemIndex = useMemo(() => {
    const idx = sortedItems.findIndex((i) => i.id === selectedExperienceId);
    return idx >= 0 ? idx : 0;
  }, [sortedItems, selectedExperienceId]);

  const activeItem = sortedItems[currentItemIndex] || sortedItems[0];
  const activePalette = CAREER_PALETTES[activeItem?.id] || CAREER_PALETTES['exp_rst'];

  // Ref map for smooth scrolling to station
  const stationRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleSelectExperience = (id: string, smoothScroll = true) => {
    onSelectExperience(id);
    if (smoothScroll) {
      setTimeout(() => {
        const el = stationRefs.current[id];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    }
  };

  const handlePrev = () => {
    if (currentItemIndex > 0) {
      handleSelectExperience(sortedItems[currentItemIndex - 1].id, true);
    }
  };

  const handleNext = () => {
    if (currentItemIndex < sortedItems.length - 1) {
      handleSelectExperience(sortedItems[currentItemIndex + 1].id, true);
    }
  };

  // Compact & High-Impact Project Dossier Card (Directly aligned with circle in row)
  const renderDossierCard = (item: ExperienceItem) => {
    const meta = CAREER_SCALE_MAP[item.id];
    const isFlagship = meta?.tier === 'flagship';
    const highlights = item.highlights[lang] || [];
    const palette = CAREER_PALETTES[item.id] || CAREER_PALETTES['exp_rst'];
    const itemIndex = sortedItems.findIndex((i) => i.id === item.id);
    const displayNum = itemIndex >= 0 ? (itemIndex + 1 < 10 ? `0${itemIndex + 1}` : `${itemIndex + 1}`) : '01';

    return (
      <div className="relative group w-full">
        {/* Top Manila Folder Tab */}
        <div className="flex items-center justify-between px-2">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-t-xl font-mono text-[11px] font-black tracking-wider uppercase z-10 -mb-px border-t border-x ${palette.tabBgClass}`}
          >
            <span
              style={{ backgroundColor: palette.accentHex }}
              className="w-2 h-2 rounded-full animate-pulse shrink-0"
            />
            <span>
              // {lang === 'en' ? 'DOSSIER' : 'پرونده'} {displayNum} · {item.badge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:inline">
              {meta ? (isFa ? meta.timelineYearFa : meta.timelineYearEn) : item.period[lang]}
            </span>
          </div>
        </div>

        {/* Compact Card Container */}
        <div
          style={{
            boxShadow: `0 16px 36px -12px ${palette.glowRgba}`,
          }}
          className={`rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 space-y-4 shadow-lg transition-all border ${palette.cardBorderClass} ${palette.cardBgClass}`}
        >
          {/* Header Row */}
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

          {/* Concise Summary Paragraph */}
          <p className="text-xs sm:text-sm leading-relaxed font-medium text-neutral-200">
            {item.summary[lang]}
          </p>

          {/* Key Deliverables (Concise Highlights, max 3 punchy points) */}
          <div className="space-y-2 pt-1 border-t border-white/10">
            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
              {lang === 'en' ? '// Core Deliverables:' : '// خروجی‌های شاخص و اقلام تولیدشده:'}
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

          {/* Prepress Quality & Technical Micro-Chips */}
          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-neutral-300 border border-white/10">
              {lang === 'en' ? 'ISO 12647-2 Prepress' : 'افست ISO 12647-2'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-neutral-300 border border-white/10">
              {lang === 'en' ? 'Vector CAD Dieline' : 'خط تیغ و ماکت وکتور'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-neutral-300 border border-white/10">
              {lang === 'en' ? 'CMYK & Plate QC' : 'تفکیک زینک و نظارت لیتوگرافی'}
            </span>
          </div>

          {/* Bottom Action Buttons */}
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

  if (sortedItems.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* 1. TOP NAVIGATION & ORDER CONTROLS BAR */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 shadow-2xs p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            style={{ backgroundColor: activePalette.accentHex }}
            className="w-2.5 h-2.5 rounded-full animate-ping shrink-0"
          />
          <span className="text-xs sm:text-sm font-black text-neutral-900 font-display">
            {lang === 'en'
              ? `Milestone ${currentItemIndex + 1} of ${sortedItems.length}: ${activeItem.company.en}`
              : `ایستگاه ${currentItemIndex + 1} از ${sortedItems.length}: ${activeItem.company.fa}`}
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Order direction toggle */}
          <button
            type="button"
            onClick={() => setSortDirection((prev) => (prev === 'newest_first' ? 'oldest_first' : 'newest_first'))}
            className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5"
            title={lang === 'en' ? 'Toggle chronological sort' : 'تغییر ترتیب زمانی'}
          >
            <span>
              {lang === 'en'
                ? sortDirection === 'newest_first'
                  ? '2026 → 2016 (Newest)'
                  : '2016 → 2026 (Oldest)'
                : sortDirection === 'newest_first'
                ? '۱۴۰۴ ← ۱۳۹۵ (جدیدترین)'
                : '۱۳۹۵ ← ۱۴۰۴ (قدیمی‌ترین)'}
            </span>
          </button>

          {/* Stepper Buttons */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentItemIndex === 0}
            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
              currentItemIndex === 0
                ? 'opacity-30 border-neutral-200 text-neutral-400 cursor-not-allowed'
                : 'border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 shadow-2xs active:scale-95'
            }`}
            title={lang === 'en' ? 'Previous' : 'قبلی'}
          >
            <PrevChevron className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentItemIndex === sortedItems.length - 1}
            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
              currentItemIndex === sortedItems.length - 1
                ? 'opacity-30 border-neutral-200 text-neutral-400 cursor-not-allowed'
                : 'border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 shadow-2xs active:scale-95'
            }`}
            title={lang === 'en' ? 'Next' : 'بعدی'}
          >
            <NextChevron className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. UNIFIED VERTICAL TIMELINE WITH HORIZONTALLY ALIGNED MILESTONE CARDS */}
      <div className="relative pt-2 pb-6 max-w-5xl mx-auto">
        {/* Continuous Vertical Spine Track Line */}
        {/* In RTL (Persian): start is on the right side. In LTR (English): start is on the left side. */}
        <div className="absolute top-6 bottom-8 start-[19px] sm:start-[25px] w-0.5 bg-neutral-200 rounded-full z-0" />
        <div className="absolute top-6 bottom-8 start-[19px] sm:start-[25px] w-0.5 bg-gradient-to-b from-indigo-500 via-emerald-500 to-amber-500 rounded-full z-0 opacity-40" />

        {/* List of stations */}
        <div className="relative z-10 space-y-3.5 sm:space-y-4">
          {sortedItems.map((item) => {
            const isSelected = item.id === activeItem.id;
            const palette = CAREER_PALETTES[item.id] || CAREER_PALETTES['exp_rst'];
            const meta = CAREER_SCALE_MAP[item.id];
            const yearStr = meta ? (isFa ? meta.timelineYearFa : meta.timelineYearEn) : item.period[lang];
            const isFlagship = meta?.tier === 'flagship';

            return (
              <div
                key={item.id}
                ref={(el) => {
                  stationRefs.current[item.id] = el;
                }}
                className="relative flex items-start gap-2.5 sm:gap-4 transition-all duration-300"
              >
                {/* 1. NODE ON THE SPINE (Protective halo ring: line never collides with circle) */}
                <div className="relative shrink-0 pt-2 sm:pt-2.5">
                  {/* Pulsing halo if active */}
                  {isSelected && (
                    <span
                      style={{ backgroundColor: palette.glowRgba }}
                      className="absolute top-2 sm:top-2.5 start-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping opacity-35 pointer-events-none"
                    />
                  )}
                  {/* Protective white halo */}
                  <div
                    onClick={() => handleSelectExperience(item.id, !isSelected)}
                    className="p-1 sm:p-1.5 bg-white rounded-full ring-4 ring-neutral-100 shadow-2xs transition-all duration-200 z-10 cursor-pointer"
                    title={`${item.company[lang]} (${yearStr})`}
                  >
                    <div
                      style={{
                        backgroundColor: isSelected ? palette.accentHex : 'white',
                        borderColor: isSelected ? palette.accentHex : '#9ca3af',
                      }}
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                        isSelected ? 'scale-110 shadow-xs' : 'hover:border-neutral-900'
                      }`}
                    >
                      <div
                        style={{
                          backgroundColor: isSelected ? '#121316' : palette.accentHex,
                        }}
                        className="w-1.5 h-1.5 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. CONNECTOR NOTCH / BRANCH TO CARD */}
                <div className="shrink-0 flex items-center pt-4 sm:pt-4.5 -ms-1">
                  <div
                    style={{
                      backgroundColor: isSelected ? palette.accentHex : undefined,
                      boxShadow: isSelected ? `0 0 8px ${palette.glowRgba}` : undefined,
                    }}
                    className={`h-0.5 rounded-full transition-all duration-300 ${
                      isSelected ? 'w-3 sm:w-5 bg-current' : 'w-2 sm:w-3 bg-neutral-200'
                    }`}
                  />
                </div>

                {/* 3. STATION CONTENT: ACTIVE EXPANDED DOSSIER CARD OR COMPACT ROW */}
                <div className="flex-1 min-w-0 transition-all duration-300">
                  {isSelected ? (
                    /* FULL COMPACT DOSSIER CARD - Horizontally aligned with this circle! */
                    renderDossierCard(item)
                  ) : (
                    /* COMPACT INACTIVE STATION BAR */
                    <div
                      onClick={() => handleSelectExperience(item.id, true)}
                      className="group p-3 sm:p-3.5 bg-white hover:bg-neutral-50/90 text-neutral-900 border border-neutral-200/90 hover:border-neutral-300 rounded-2xl shadow-2xs transition-all duration-200 cursor-pointer flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5"
                    >
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
                        <span className="font-mono text-xs font-bold text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full shrink-0">
                          {yearStr}
                        </span>

                        {isFlagship && (
                          <span
                            style={{ backgroundColor: `${palette.accentHex}20`, color: '#171717' }}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[10px] font-display shrink-0 border border-neutral-200"
                          >
                            <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                            <span>{lang === 'en' ? 'Flagship' : 'شاخص'}</span>
                          </span>
                        )}

                        <h4 className="text-sm sm:text-base font-black tracking-tight text-neutral-900 group-hover:text-black truncate">
                          {item.company[lang]}
                        </h4>

                        <span className="text-xs text-neutral-500 font-medium truncate hidden md:inline">
                          // {item.role[lang]}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ms-auto sm:ms-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-display">
                          {meta?.[isFa ? 'cityLabelFa' : 'cityLabelEn'] || item.location[lang]}
                        </span>

                        <span
                          style={{ color: palette.accentHex }}
                          className="text-[11px] font-bold font-display opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                        >
                          <span>{lang === 'en' ? 'Open' : 'مشاهده پرونده'}</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
