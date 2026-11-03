import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Copy, ExternalLink, Mail, MapPin, MessageSquare, Send, Sparkles } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { Language, PageId } from '../types';

interface ContactPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang, onNavigate }) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    industry: 'b2b',
    service: 'brand_identity',
    timeline: '1_2_months',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@saeedjabbari.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16 ${isFa ? 'text-right' : 'text-left'}`}>
      {/* 1. PAGE HEADER */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs font-bold font-display uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>{lang === 'en' ? 'Get In Touch' : 'ارتباط و شروع همکاری'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
          {lang === 'en'
            ? 'Let’s Discuss Your Next Project'
            : 'درباره پروژه بعدی شما گفتگو کنیم'}
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-medium">
          {lang === 'en'
            ? 'Whether you need a full brand identity overhaul, high-stakes consumer packaging architecture, or engineering-grade industrial communications, I am open to select collaborations.'
            : 'چه در آستانه راه‌اندازی برند جدید باشید، چه نیازمند بازطراحی هویت بصری، معماری بسته‌بندی شلف یا کاتالوگ‌های تخصصی صنعتی B2B — آماده گفتگو درباره اهداف و نیازمندی‌های پروژه شما هستم.'}
        </p>
      </div>

      {/* 2. MAIN GRID (Direct Contacts + Inquiry Form) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info & Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Email Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-neutral-200/80 p-5 sm:p-7 shadow-xs space-y-4">
            <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider block">
              {lang === 'en' ? 'Direct Email' : 'ایمیل مستقیم'}
            </span>
            <div className="space-y-1">
              <a
                href="mailto:contact@saeedjabbari.com"
                className="text-base sm:text-lg font-black text-neutral-950 hover:text-amber-600 transition-colors font-display block"
              >
                contact@saeedjabbari.com
              </a>
              <span className="text-xs text-neutral-500 font-medium block">
                {lang === 'en' ? 'Inquiries usually answered within 24 hours' : 'پاسخگویی به استعلام‌ها ظرف حداکثر ۲۴ ساعت'}
              </span>
            </div>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              {copiedEmail ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? (lang === 'en' ? 'Copied to Clipboard!' : 'ایمیل کپی شد!') : (lang === 'en' ? 'Copy Email Address' : 'کپی آدرس ایمیل')}</span>
            </button>
          </div>

          {/* Professional Handles */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-neutral-200/80 p-5 sm:p-7 shadow-xs space-y-4">
            <span className="text-xs font-bold text-neutral-400 font-display uppercase tracking-wider block">
              {lang === 'en' ? 'Verified Platforms' : 'پلتفرم‌های حرفه‌ای'}
            </span>

            <div className="space-y-2.5">
              <a
                href={PROFILE_DATA.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 sm:p-4 bg-neutral-50 rounded-xl sm:rounded-2xl border border-neutral-100 hover:bg-neutral-100 flex items-center justify-between group transition-all"
              >
                <div>
                  <span className="text-xs text-neutral-500 font-medium block">LinkedIn</span>
                  <span className="text-xs sm:text-sm font-black text-neutral-900 group-hover:text-amber-600 transition-colors font-display">
                    linkedin.com/in/saeedjabbari
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-950 transition-colors" />
              </a>

              <a
                href={PROFILE_DATA.links.behance}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 sm:p-4 bg-neutral-50 rounded-xl sm:rounded-2xl border border-neutral-100 hover:bg-neutral-100 flex items-center justify-between group transition-all"
              >
                <div>
                  <span className="text-xs text-neutral-500 font-medium block">Behance</span>
                  <span className="text-xs sm:text-sm font-black text-neutral-900 group-hover:text-amber-600 transition-colors font-display">
                    behance.net/saeedjabbari
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-950 transition-colors" />
              </a>
            </div>
          </div>

          {/* Location & Availability Note */}
          <div className="bg-neutral-950 text-white rounded-xl sm:rounded-2xl p-5 sm:p-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-display uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>{lang === 'en' ? 'Location & Collaboration' : 'موقعیت و شیوه همکاری'}</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
              {PROFILE_DATA.links.location[lang]}
            </p>
            <span className="text-[11px] text-neutral-400 font-medium block pt-2 border-t border-white/10">
              {lang === 'en'
                ? 'Available for remote creative direction contracts worldwide and selective on-site consultations.'
                : 'آماده پذیرش قراردادهای هدایت هنری پروژه‌ای به صورت دورکاری بین‌المللی و مشاوره‌های حضوری در جلسات استراتژیک.'}
            </span>
          </div>
        </div>

        {/* Inquiry Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 p-5 sm:p-8 md:p-10 shadow-lg shadow-neutral-100 space-y-6">
            {submitted ? (
              <div className="py-12 text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-neutral-950">
                    {lang === 'en' ? 'Inquiry Sent Successfully' : 'پیام شما با موفقیت ثبت شد'}
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed font-medium">
                    {lang === 'en'
                      ? `Thank you, ${formState.name}. I have received your project details for ${formState.company || 'your brand'} and will get back to you within 24 hours.`
                      : `با تشکر از شما، ${formState.name} گرامی. اطلاعات پروژه شما برای مجموعه ${formState.company || 'شما'} ثبت شد و ظرف ۲۴ ساعت آینده جهت هماهنگی جلسه با شما در تماس خواهم بود.`}
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: '',
                        email: '',
                        company: '',
                        industry: 'b2b',
                        service: 'brand_identity',
                        timeline: '1_2_months',
                        message: '',
                      });
                    }}
                    className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-full transition-all cursor-pointer"
                  >
                    {lang === 'en' ? 'Send Another Inquiry' : 'ارسال استعلام دیگر'}
                  </button>
                  <button
                    onClick={() => onNavigate('work')}
                    className="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold rounded-full transition-all cursor-pointer"
                  >
                    {lang === 'en' ? 'Explore More Projects' : 'مشاهده پروژه‌ها'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-neutral-950">
                    {lang === 'en' ? 'Project Brief & Consultation Form' : 'فرم ثبت بریف و درخواست همکاری'}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium">
                    {lang === 'en'
                      ? 'Tell me about your brand, goals, and required scope.'
                      : 'مشخصات اولیه، اهداف تجاری و حوزه تخصصی مورد نظر خود را ثبت کنید.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 block">
                      {lang === 'en' ? 'Full Name *' : 'نام و نام خانوادگی *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder={lang === 'en' ? 'e.g. John Doe' : 'مثال: علی احمدی'}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:border-neutral-950 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 block">
                      {lang === 'en' ? 'Email Address *' : 'آدرس ایمیل *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder={lang === 'en' ? 'name@company.com' : 'info@company.com'}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:border-neutral-950 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 block">
                      {lang === 'en' ? 'Company / Brand Name' : 'نام شرکت یا برند'}
                    </label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      placeholder={lang === 'en' ? 'e.g. Apex Industrial' : 'مثال: گروه صنعتی البرز'}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:border-neutral-950 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 block">
                      {lang === 'en' ? 'Industry Category' : 'صنعت و حوزه فعالیت'}
                    </label>
                    <select
                      value={formState.industry}
                      onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:border-neutral-950 transition-colors"
                    >
                      <option value="b2b">{lang === 'en' ? 'B2B & Industrial Manufacturing' : 'صنایع سنگین و تولیدی B2B'}</option>
                      <option value="fmcg">{lang === 'en' ? 'FMCG & Food Retail' : 'کالاهای تندمصرف و صنایع غذایی (FMCG)'}</option>
                      <option value="cosmetics">{lang === 'en' ? 'Cosmetics & Skincare' : 'محصولات آرایشی و مراقبت از پوست'}</option>
                      <option value="tech">{lang === 'en' ? 'Technology & Digital Product' : 'فناوری و کسب‌وکارهای دیجیتال'}</option>
                      <option value="other">{lang === 'en' ? 'Other Industry' : 'سایر صنایع'}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 block">
                      {lang === 'en' ? 'Primary Service Needed' : 'نوع خدمت اصلی مورد نیاز'}
                    </label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:border-neutral-950 transition-colors"
                    >
                      <option value="brand_identity">{lang === 'en' ? 'Brand Identity System' : 'طراحی سیستم هویت بصری و برند'}</option>
                      <option value="packaging">{lang === 'en' ? 'Packaging Architecture & Dielines' : 'معماری و طراحی بسته‌بندی محصول'}</option>
                      <option value="industrial_catalog">{lang === 'en' ? 'Industrial Catalog & B2B Collateral' : 'کاتالوگ جامع صنعتی و اسناد فروش B2B'}</option>
                      <option value="art_direction_motion">{lang === 'en' ? 'Art Direction & Video Reel' : 'هدایت هنری و تولید ویدئو/موشن'}</option>
                      <option value="full_ecosystem">{lang === 'en' ? 'Full Brand & Web Ecosystem' : 'پکیج کامل هویت بصری، بسته‌بندی و وب'}</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 block">
                      {lang === 'en' ? 'Expected Timeline' : 'بازه زمانی مورد نظر'}
                    </label>
                    <select
                      value={formState.timeline}
                      onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:border-neutral-950 transition-colors"
                    >
                      <option value="urgent">{lang === 'en' ? 'Immediate (< 1 month)' : 'فوری (کمتر از ۱ ماه)'}</option>
                      <option value="1_2_months">{lang === 'en' ? 'Standard (1 - 2 months)' : 'استاندارد (۱ تا ۲ ماه)'}</option>
                      <option value="quarterly">{lang === 'en' ? 'Quarterly Strategic Rollout' : 'فصلی و برنامه‌ریزی بلندمدت'}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 block">
                    {lang === 'en' ? 'Project Details / Goals *' : 'شرح پروژه و اهداف همکاری *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={
                      lang === 'en'
                        ? 'Briefly describe your business, target audience, and current challenges...'
                        : 'توضیحات مختصری درباره زمینه فعالیت، مخاطبان هدف و نیازهای اصلی پروژه بنویسید...'
                    }
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:border-neutral-950 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 text-white font-black text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{lang === 'en' ? 'Submit Project Brief' : 'ارسال درخواست و دریافت مشاوره'}</span>
                  <Send className="w-4 h-4 text-amber-400" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
