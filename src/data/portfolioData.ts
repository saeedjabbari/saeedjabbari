import { AreaOfExpertise, ExperienceItem, ProjectItem } from '../types';

export const PROFILE_DATA = {
  name: {
    en: 'Saeed Jabbari',
    fa: 'سعید جباری',
  },
  title: {
    en: 'Art Director & Brand Designer',
    fa: 'مدیر هنری و طراح برند',
  },
  tagline: {
    en: 'Visual Identity · Packaging Design · Product Communication · Industrial & B2B Visual Systems',
    fa: 'هویت بصری · طراحی بسته‌بندی · ارتباطات محصول · سیستم‌های بصری صنعتی و تجاری',
  },
  shortBio: {
    en: 'I specialize in visual identity, packaging design, and product communication, helping businesses translate complex technical products, ideas, and data into distinctive visual experiences. With a degree in Civil Engineering and over 10 years in design, I bring a structured, problem-solving mindset to the creative process.',
    fa: 'من در زمینه هویت بصری، طراحی بسته‌بندی و ارتباطات بصری فعالیت می‌کنم و به کسب‌وکارها کمک می‌کنم محصولات، ایده‌ها و اطلاعات پیچیده خود را به تجربه‌های بصری متمایز تبدیل کنند. با پیشینه تحصیلی در مهندسی عمران و بیش از ۱۰ سال تجربه، رویکردی ساختارمند و مسئله‌محور به فرآیند خلاقانه دارم.',
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/saeedjabbari',
    behance: 'https://www.behance.net/saeedjabbari',
    email: 'contact@saeedjabbari.com',
    location: {
      en: 'Tehran · Open to Worldwide Relocation & Remote Collaborations',
      fa: 'تهران · آماده همکاری‌های پروژه‌ای بین‌المللی و دورکاری',
    },
  },
};

export const AREAS_OF_EXPERTISE: AreaOfExpertise[] = [
  {
    id: 'brand_identity',
    title: {
      en: 'Brand Identity & Visual Systems',
      fa: 'هویت بصری و طراحی برند',
    },
    description: {
      en: 'Crafting cohesive brand identities, custom logotypes, design guidelines, and typography systems that communicate authority across physical and digital touchpoints.',
      fa: 'خلق سیستم‌های جامع هویت بصری، نشان‌های تجاری، کتابچه راهنمای برند و گایدلاین‌های تایپوگرافی برای ایجاد تمایز و اعتبار پایدار.',
    },
    skills: {
      en: ['Brand Guidelines', 'Logotype Architecture', 'Typography Systems', 'Design Tokens'],
      fa: ['کتابچه راهنمای برند', 'معماری نشان تجاری', 'سیستم‌های تایپوگرافی', 'دیزاین توکن‌ها'],
    },
  },
  {
    id: 'packaging_design',
    title: {
      en: 'Packaging & Product Architecture',
      fa: 'طراحی بسته‌بندی و محصول',
    },
    description: {
      en: 'Engineering retail shelf presence, structural dielines, labels, luxury gift boxes, and FMCG packaging systems with meticulous prepress color separation.',
      fa: 'مهندسی بسته‌بندی شلف، خطوط تیغ ساختاری، طراحی لیبل، جعبه‌های لوکس و پکیجینگ FMCG با نظارت دقیق فنی بر چاپ و لیتوگرافی.',
    },
    skills: {
      en: ['Structural Dielines', 'FMCG Shelf Presence', 'Luxury Finishes', 'Prepress Management'],
      fa: ['خطوط تیغ و استراکچر', 'حضور محصول در قفسه', 'فینیشینگ‌های لوکس', 'کنترل لیتوگرافی'],
    },
  },
  {
    id: 'industrial_b2b',
    title: {
      en: 'Industrial & B2B Visual Communications',
      fa: 'ارتباطات بصری صنعتی و B2B',
    },
    description: {
      en: 'Translating heavy machinery, technical specifications, and enterprise catalogs into compelling, easily understood visual assets for executives and buyers.',
      fa: 'تبدیل مشخصات پیچیده فنی، ماشین‌آلات سنگین و قطعات صنعتی به کاتالوگ‌ها، بروشورها و ابزارهای پرزنت خوانا و موثر برای مذاکرات تجاری B2B.',
    },
    skills: {
      en: ['Industrial Catalogues', 'Technical Schematics', 'B2B Sales Enablement', 'Exhibition Pavilions'],
      fa: ['کاتالوگ‌های جامع صنعتی', 'دیاگرام‌های فنی', 'اسناد فروش B2B', 'غرفه‌های نمایشگاهی'],
    },
  },
  {
    id: 'art_direction',
    title: {
      en: 'Art Direction & Motion Media',
      fa: 'مدیریت هنری و موشن‌گرافیک',
    },
    description: {
      en: 'Guiding creative concepts from strategic ideation to production. Directing high-converting video clips, commercial animations, and visual storytelling.',
      fa: 'هدایت کانسپت‌های خلاقانه از ایده اولیه تا تولید نهایی؛ کارگردانی ویدئوهای تبلیغاتی محصول، انیمیشن‌های تجاری و روایت‌های بصری جذاب.',
    },
    skills: {
      en: ['Creative Direction', 'Storyboarding', 'Social Product Reels', 'Motion Design'],
      fa: ['هدایت خلاقانه', 'استوری‌بورد', 'ویدئوهای محصول', 'طراحی حرکت'],
    },
  },
  {
    id: 'ai_creative',
    title: {
      en: 'AI-Assisted Visual Innovation',
      fa: 'تولید محتوای مبتنی بر هوش مصنوعی',
    },
    description: {
      en: 'Integrating cutting-edge generative AI tools alongside traditional professional software to accelerate ideation, photoreal concept rendering, and commercial campaigns.',
      fa: 'به‌کارگیری ابزارهای مولد هوش مصنوعی در کنار روش‌های حرفه‌ای طراحی جهت تسریع در ایده‌پردازی، رندرهای مفهومی فوتورئال و کمپین‌های تبلیغاتی.',
    },
    skills: {
      en: ['Concept Generation', 'Photoreal Prototyping', 'Commercial Video Synthesis', 'Prompt Architecture'],
      fa: ['ایده‌پردازی مفهومی', 'پروتوتایپ فوتورئال', 'سنتز ویدئوی تجاری', 'معماری پرامپت'],
    },
  },
  {
    id: 'product_comm',
    title: {
      en: 'Product Communication & Publishing',
      fa: 'ارتباطات بصری محصول و نشر دیجیتال',
    },
    description: {
      en: 'Editorial page layouts, annual reports, multi-page company profiles, and digital publishing systems crafted with typographic rigor.',
      fa: 'صفحه‌آرایی انتشاراتی، گزارش‌های عملکرد سازمانی، کاتالوگ‌های معرفی خطوط تولید و انتشارات دیجیتال با تکیه بر ساختار تایپوگرافی منسجم.',
    },
    skills: {
      en: ['Editorial Design', 'Company Profiles', 'Digital Publishing', 'Grid Systems'],
      fa: ['طراحی ادیتوریال', 'پروفایل جامع شرکت', 'نشر دیجیتال', 'سیستم‌های گرید'],
    },
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'rst_purchasing',
    slug: 'rst-purchasing',
    title: {
      en: 'RST Purchasing — Industrial Axles & Spare Parts',
      fa: 'آر‌اس‌تی پرچسینگ — ارتباطات بصری محور و قطعات تریلر',
    },
    client: {
      en: 'RST Purchasing Group',
      fa: 'مجموعه بازرگانی قطعات صنعتی RST',
    },
    category: 'industrial_b2b',
    categoryLabel: {
      en: 'Industrial & B2B Visual Communications',
      fa: 'ارتباطات بصری صنعتی و B2B',
    },
    industry: {
      en: 'Commercial Vehicles & Heavy Machinery',
      fa: 'صنایع حمل‌ونقل سنگین و قطعات صنعتی',
    },
    year: '2023 - 2024',
    featured: true,
    heroImage: '/assets/aistudio/Katana_CRM_-_SaaS___UX_UI_Design_6d31d818.jpg',
    galleryImages: [
      '/assets/aistudio/Katana_CRM_-_SaaS___UX_UI_Design_6d31d818.jpg',
      '/assets/aistudio/333829391151658394_5399dbf6.jpg',
    ],
    role: {
      en: 'Lead Visual Designer & Art Director',
      fa: 'طراح ارشد بصری و مدیر هنری',
    },
    context: {
      en: 'RST Purchasing is a specialized supplier of commercial trailer axles, suspension components, and industrial parts. The challenge was converting heavy engineering data and catalog tables into modern, highly accessible visual collateral for international buyers.',
      fa: 'مجموعه RST تأمین‌کننده تخصصی محور و قطعات یدکی تریلرهای تجاری است. چالش اصلی، تبدیل انبوهی از مشخصات پیچیده فنی و کاتالوگ‌های شلوغ به زبان بصری شفاف، مدرن و قابل فهم برای خریداران بین‌المللی و کارگاه‌های تعمیراتی بود.',
    },
    creativeDirection: {
      en: 'Constructed an engineering-grade visual language featuring high-contrast technical schematics, clean typographic data tables, and high-impact product-centric social motion content.',
      fa: 'خلق یک زبان بصری مهندسی‌شده با خطوط دقیق، جداول مشخصات بسیار تمیز، رندرهای تفکیکی قطعات و تولید ویدئوهای موشن‌گرافیک با تمرکز بر معرفی دقیق عملکرد قطعات.',
    },
    designDevelopment: {
      en: 'Standardized axle part categorization, developed isometric product breakdowns, and unified digital social media templates with printed technical product sheets.',
      fa: 'دسته‌بندی استاندارد قطعات محور، تولید گرافیک‌های ایزومتریک انفجاری و یکپارچه‌سازی قالب‌های محتوای شبکه‌های اجتماعی با شیت‌های فنی چاپی.',
    },
    deliverables: {
      en: [
        'Multi-page comprehensive technical parts catalogue',
        'Commercial brochures for international supply contracts',
        'Social media product-focused motion design series',
        'Technical schematic diagrams and exploded assembly views',
      ],
      fa: [
        'کاتالوگ جامع چندصفحه‌ای قطعات فنی و محورهای تریلر',
        'بروشورهای تجاری جهت قراردادهای تأمین بین‌المللی',
        'مجموعه موشن‌گرافیک‌های معرفی محصول برای شبکه‌های اجتماعی',
        'دیاگرام‌های شماتیک و نقشه‌های انفجاری نصب قطعات',
      ],
    },
    outcomesAndImpact: {
      en: 'Streamlined the quotation pipeline by enabling sales representatives to present complex assembly configurations in minutes during client consultations.',
      fa: 'تسریع چشم‌گیر فرآیند ثبت استعلام و سفارش در جلسات بازرگانی از طریق شفاف‌سازی ساختار قطعات و رفع ابهامات خریداران فنی.',
    },
    credits: {
      en: 'Art Direction & Layout: Saeed Jabbari · Technical Specs: RST Engineering Team',
      fa: 'مدیریت هنری و گرافیک: سعید جباری · مشخصات فنی: تیم مهندسی RST',
    },
  },
  {
    id: 'maral_trailer',
    slug: 'maral-trailer',
    title: {
      en: 'Maral Trailer — Semi-Trailer Product Art Direction & Motion',
      fa: 'مارال تریلر — مدیریت هنری، معرفی محصول و محتوای ویدئویی',
    },
    client: {
      en: 'Maral Trailer Co.',
      fa: 'شرکت صنعتی مارال تریلر',
    },
    category: 'art_direction_motion',
    categoryLabel: {
      en: 'Industry, Art Direction & Motion',
      fa: 'صنعت، مدیریت هنری و موشن',
    },
    industry: {
      en: 'Heavy Commercial Transport Manufacturing',
      fa: 'صنایع ساخت تریلرهای سنگین و تجاری',
    },
    year: '2023 - 2024',
    featured: true,
    heroImage: '/assets/aistudio/Landing_page_design_49eedcd3.jpg',
    galleryImages: [
      '/assets/aistudio/Landing_page_design_49eedcd3.jpg',
      '/assets/aistudio/681943568614472617_168c19d2.jpg',
    ],
    role: {
      en: 'Art Director, Motion Producer & Creative Lead',
      fa: 'مدیر هنری، تولیدکننده ویدئو و هدایت خلاقانه',
    },
    context: {
      en: 'Maral Trailer is a premier manufacturer of heavy commercial trailers. The brand needed cutting-edge promotional video and digital communications to showcase craftsmanship, durability, and international manufacturing standards.',
      fa: 'مارال تریلر از برترین تولیدکنندگان تریلرهای نیمه‌سنگین و تجاری در خاورمیانه است. این مجموعه برای حضور در بازارهای منطقه‌ای و نمایش قدرت ساخت، نیازمند ارتباطات ویدئویی معاصر و تلفیق تصویرسازی هوش مصنوعی با فیلم‌برداری صنعتی بود.',
    },
    creativeDirection: {
      en: 'Directed hyper-detailed product showcases, utilizing ASMR sensory audio-visual production, dramatic lighting on steel structures, and AI-assisted animation sequences.',
      fa: 'خلق مجموعه‌ای از ویدئوهای حسی محصول با رویکرد ASMR صنعتی، نورپردازی دراماتیک روی خطوط جوش و سازه‌های فولادی، و تلفیق تولید محتوای هوش مصنوعی در زوایای تبلیغاتی.',
    },
    designDevelopment: {
      en: 'Produced multi-platform marketing collateral, international sales presentation decks, and viral social video campaigns celebrating manufacturing perfection.',
      fa: 'تولید اسناد پرزنت فروش برای صادرات، محتوای تعاملی شبکه‌های اجتماعی و ویدئوهای وایرال کیفیت ساخت تریلرها.',
    },
    deliverables: {
      en: [
        'Commercial product demonstration videos and social reels',
        'AI-assisted visual sequences showcasing transport scenarios',
        'Sales enablement collateral for regional exhibitions',
        'Social media campaign art direction',
      ],
      fa: [
        'ویدئوهای تبلیغاتی معرفی محصولات و ویدئوهای کوتاه شبکه‌های اجتماعی',
        'تولید ویدئو و تصویرسازی‌های سناریوی حمل‌ونقل با کمک هوش مصنوعی',
        'اسناد پشتیبانی فروش در نمایشگاه‌های بین‌المللی لجستیک',
        'هدایت هنری کمپین دیجیتال مارال تریلر',
      ],
    },
    stats: {
      value: '310K+ Views · 11K Likes',
      label: {
        en: 'Organic reach on flagship ASMR trailer product video',
        fa: 'بازدید ارگانیک ثبت‌شده و ۱۱ هزار لایک در ویدئوی شاخص ASMR تریلر',
      },
    },
    outcomesAndImpact: {
      en: 'Significantly elevated the public perception of the brand from traditional manufacturing to a high-tech modern automotive leader.',
      fa: 'ارتقای تصویر ذهنی برند در اذهان مشتریان داخلی و خارجی از یک کارگاه سنتی به یک قطب مدرن تکنولوژیک در صنایع سنگین.',
    },
    credits: {
      en: 'Art Direction & Video Concept: Saeed Jabbari · Production: Maral Media Unit',
      fa: 'مدیریت هنری و کانسپت ویدئو: سعید جباری · تولید: واحد رسانه مارال تریلر',
    },
  },
  {
    id: 'spoota_group',
    slug: 'spoota-group',
    title: {
      en: 'Spoota Industrial Group — Corporate Communications & Pavilion',
      fa: 'گروه صنعتی اسپوتا — ارتباطات سازمانی، کاتالوگ و گرافیک نمایشگاهی',
    },
    client: {
      en: 'Spoota Industrial Holding',
      fa: 'هلدینگ گروه صنعتی اسپوتا',
    },
    category: 'industrial_b2b',
    categoryLabel: {
      en: 'Corporate & Industrial Communications',
      fa: 'ارتباطات سازمانی و صنعتی',
    },
    industry: {
      en: 'Conglomerate: Food, Manufacturing & Commerce',
      fa: 'هلدینگ چندرشته‌ای: صنایع غذایی، تولید و بازرگانی',
    },
    year: '2022 - 2023',
    featured: true,
    heroImage: '/assets/aistudio/Smart_Daily_Activity_Planner_Mobile_App__Available_for_new_opportunities____DM_5c322802.jpg',
    galleryImages: [
      '/assets/aistudio/Smart_Daily_Activity_Planner_Mobile_App__Available_for_new_opportunities____DM_5c322802.jpg',
      '/assets/aistudio/Task_Manager_Mobile_App_by_Aleksei_Bykov_for__a0fbcccf.jpg',
    ],
    role: {
      en: 'Corporate Visual Identity Designer & Exhibition Art Director',
      fa: 'طراح هویت سازمانی و مدیر هنری غرفه نمایشگاهی',
    },
    context: {
      en: 'Spoota operates diverse subsidiaries spanning food manufacturing to industrial materials. They required a unified corporate communications architecture to represent the parent holding with authority.',
      fa: 'هلدینگ اسپوتا دارای شرکت‌های زیرمجموعه متعددی در زمینه تولید مواد غذایی، صنایع بسته‌بندی و بازرگانی است. چالش اصلی هماهنگ‌سازی ارتباطات هلدینگ، طراحی پاویون نمایشگاهی و بسته‌بندی محصولات زیرمجموعه‌ها بود.',
    },
    creativeDirection: {
      en: 'Established clean typographic hierarchy, elegant corporate stationery, environmental trade-fair pavilion backdrops, and packaging guidelines for food subsidiaries.',
      fa: 'تدوین نظام یکپارچه تایپوگرافی، طراحی اسناد سازمانی و کاتالوگ‌های معرفی شرکت‌ها، گرافیک محیطی پاویون غرفه نمایشگاه بین‌المللی و طراحی بسته‌بندی‌های غذایی هلدینگ.',
    },
    designDevelopment: {
      en: 'Designed cohesive catalogs, corporate calendars, subsidiary identity guidelines, and high-impact exhibition backdrops.',
      fa: 'طراحی ست کامل اوراق اداری، کاتالوگ‌های فصلی، سالنامه نفیس سازمانی، گرافیک دیوارهای غرفه نمایشگاهی و هویت بصری زیرمجموعه‌ها.',
    },
    deliverables: {
      en: [
        'Holding corporate communications system & stationery',
        'Industrial and corporate catalogues & brochures',
        'Exhibition pavilion environmental graphics & backdrops',
        'Consumer food packaging design (Aftab Spoota)',
        'Corporate prestige calendar and digital assets',
      ],
      fa: [
        'سیستم ارتباطات سازمانی و هویت یکپارچه هلدینگ',
        'کاتالوگ‌ها و بروشورهای معرفی شرکت‌های عضو هلدینگ',
        'طراحی گرافیک محیطی و بک‌وال‌های پاویون نمایشگاهی',
        'طراحی بسته‌بندی محصولات غذایی (آفتاب اسپوتا)',
        'طراحی سررسید و تقویم اختصاصی سازمانی و اقلام دیجیتال',
      ],
    },
    outcomesAndImpact: {
      en: 'Presented a unified, prestigious conglomerate identity at premier national industrial expos, resulting in multiple high-level strategic partnerships.',
      fa: 'حضور یکپارچه و باوقار هلدینگ در همایش‌ها و نمایشگاه‌های بین‌المللی و تثبیت جایگاه اسپوتا به عنوان یک هلدینگ قدرتمند ملی.',
    },
    credits: {
      en: 'Art Direction: Saeed Jabbari · Holding Executive Committee',
      fa: 'مدیریت هنری: سعید جباری · با همکاری کمیته اجرایی هلدینگ اسپوتا',
    },
  },
  {
    id: 'the_nuve',
    slug: 'the-nuve',
    title: {
      en: 'The Nuve — Luxury Cosmetics Packaging & Art Direction',
      fa: 'دِ نووه (The Nuve) — بسته‌بندی لوکس، مدیریت هنری و محتوای دیجیتال',
    },
    client: {
      en: 'The Nuve Beauty Atelier',
      fa: 'برند محصولات آرایشی و زیبایی The Nuve',
    },
    category: 'packaging',
    categoryLabel: {
      en: 'Packaging, Art Direction & Digital Content',
      fa: 'بسته‌بندی، مدیریت هنری و محتوای دیجیتال',
    },
    industry: {
      en: 'Prestige Skincare & Cosmetics',
      fa: 'محصولات مراقبت از پوست و آرایشی لوکس',
    },
    year: '2024',
    featured: true,
    heroImage: '/assets/aistudio/1108378158348546706_eb40b680.jpg',
    galleryImages: [
      '/assets/aistudio/1108378158348546706_eb40b680.jpg',
      '/assets/aistudio/Ronas_IT___UI_UX_Team_0d4bdacb.jpg',
    ],
    role: {
      en: 'Packaging Designer & Creative Art Director',
      fa: 'طراح بسته‌بندی و مدیر هنری محصول',
    },
    context: {
      en: 'The Nuve required a high-fashion, radiant packaging system for its signature Shimmer Lotion and prestige VIP gift boxes. The goal was commanding attention both in physical unboxing and influencer digital campaigns.',
      fa: 'برند The Nuve برای معرفی لوسیون براق‌کننده پوست (Shimmer Lotion) و هاردباکس‌های کادویی VIP خود، نیازمند زبانی فاخر و اشرافی با المان‌های لمسی فویل و شیشه‌گری ظریف بود.',
    },
    creativeDirection: {
      en: 'Created an ethereal aesthetic combining warm nude skin tones, refined serif typography, blind embossing, and AI-assisted atmospheric lighting renders for social drops.',
      fa: 'خلق هویت مینیمال لوکس با ترکیب رنگ‌های نود پوستی، تایپوگرافی ظریف، بافت‌های لمسی برجسته و تصویرسازی‌های اتمسفریک با کمک هوش مصنوعی برای لانچ اینترنتی.',
    },
    designDevelopment: {
      en: 'Designed precise structural dielines for the luxury rigid box, metallic bottle labeling, and art-directed product launch imagery.',
      fa: 'طراحی خطوط تیغ جعبه هاردباکس مغناطیسی، لیبل شیشه لوسیون و هدایت هنری فریم‌های عکاسی و رندرهای سه بعدی لانچ محصول.',
    },
    deliverables: {
      en: [
        'Luxury rigid VIP gift box packaging architecture',
        'Shimmer Lotion bottle structural labeling & foil finishes',
        'Product visual communication & launch digital assets',
        'AI-assisted photorealistic campaign hero imagery',
      ],
      fa: [
        'طراحی هاردباکس لوکس هدیه و استراکچر جعبه',
        'طراحی بسته‌بندی و شیشه Shimmer Lotion با فینیشینگ متالیک',
        'سیستم ارتباطات بصری معرفی مواد تشکیل‌دهنده محصول',
        'تولید تصاویر تبلیغاتی فوتورئال لانچ محصول با هوش مصنوعی',
      ],
    },
    outcomesAndImpact: {
      en: 'Achieved an immediate sell-out of the limited holiday edition, driving extensive organic unboxing content across social channels.',
      fa: 'فروش کامل نسخه محدود در هفته‌های نخست عرضه و افزایش چشم‌گیر اشتراک‌گذاری‌های آنباکسینگ توسط بلاگرها و مشتریان خاص.',
    },
    credits: {
      en: 'Creative Direction & Packaging: Saeed Jabbari',
      fa: 'مدیریت هنری و بسته‌بندی: سعید جباری',
    },
  },
  {
    id: 'pransa_cosmetics',
    slug: 'pransa-cosmetics',
    title: {
      en: 'Pransa Cosmetics — 3D Product Visualization & Publishing',
      fa: 'پرانسا کازمتیکس — رندرینگ سه‌بعدی محصول و طراحی انتشارات چاپی',
    },
    client: {
      en: 'Pransa Skincare Laboratory',
      fa: 'لابراتوار تخصصی محصولات درمانی پوست پرانسا',
    },
    category: 'packaging',
    categoryLabel: {
      en: '3D Product Visualization & Publishing',
      fa: 'تصویرسازی سه‌بعدی محصول و طراحی انتشارات',
    },
    industry: {
      en: 'Clinical & Dermocosmetics',
      fa: 'محصولات درمانی، بهداشتی و درموکازمتیک',
    },
    year: '2023',
    featured: false,
    heroImage: '/assets/aistudio/Give_Everyday_Money_a_Modern_Home_with_Free_Wallet_App_UI_Kits_9a981a83.jpg',
    galleryImages: [
      '/assets/aistudio/Give_Everyday_Money_a_Modern_Home_with_Free_Wallet_App_UI_Kits_9a981a83.jpg',
    ],
    role: {
      en: '3D Visualizer & Editorial Designer',
      fa: 'تصویرساز سه‌بعدی و طراح بروشور و کاتالوگ',
    },
    context: {
      en: 'Pransa needed 3D photorealistic visualization of their full lineup of 22 skincare and health products prior to factory mass-production, alongside prestigious exhibition brochures.',
      fa: 'پرانسا پیش از آغاز خط تولید صنعتی نیازمند رندرهای باکیفیت سه‌بعدی از ۲۲ قلم دارویی و درمانی پوست برای کاتالوگ‌های رسمی و بروشورهای معرفی در همایش‌های پزشکی بود.',
    },
    creativeDirection: {
      en: 'Rendered hyper-accurate glass refractions, clinical bottle textures, and designed a pristine clinical brochure highlighting dermatological formulations.',
      fa: 'مدل‌سازی و رندر سه‌بعدی شیشه‌ها، پمپ‌ها و بافت تیوب‌ها با نورپردازی کلینیکال و طراحی بروشور تاشو با تأکید بر اصالت فرمولاسیون و ترکیبات فعال.',
    },
    designDevelopment: {
      en: 'Delivered color-accurate 3D renders for 22 products and prepared color-separated files for high-end exhibition print runs.',
      fa: 'ارائه پکیج کامل رندرهای سه‌بعدی ۲۲ محصول، طراحی شیت‌های نمایشگاهی و آماده‌سازی خروجی‌های بدون نقص برای چاپخانه.',
    },
    deliverables: {
      en: [
        'Photorealistic 3D visualization of 22 skincare products',
        'Medical expo presentation brochures & sales handouts',
        'Visual product presentation deck for pharmacy distributors',
        'Prepress production files for packaging print runs',
      ],
      fa: [
        'تصویرسازی و رندر سه‌بعدی ۲۲ محصول مراقبت از پوست و بهداشتی',
        'طراحی بروشور و اقلام چاپی نمایشگاهی معرفی ترکیبات',
        'طراحی کاتالوگ ویزیتورها برای توزیع در داروخانه‌ها',
        'آماده‌سازی فایل‌های تفکیک رنگ چاپی برای بسته‌بندی',
      ],
    },
    outcomesAndImpact: {
      en: 'Secured pre-orders from major pharmacy distributors before factory bottling began.',
      fa: 'تسهیل اخذ پیش‌خرید از زنجیره‌های توزیع داروخانه‌ای پیش از تولید انبوه کارخانه بر پایه رندرهای واقعی و کاتالوگ علمی.',
    },
    credits: {
      en: '3D Modeling & Editorial Layout: Saeed Jabbari',
      fa: 'مدل‌سازی سه‌بعدی و صفحه‌آرایی: سعید جباری',
    },
  },
  {
    id: 'consumer_packaging',
    slug: 'consumer-goods-packaging',
    title: {
      en: 'Mood Mint & Little Buddy — FMCG Concept Systems',
      fa: 'مود مینت و لیتل بادی — توسعه کانسپت و بسته‌بندی کالاهای مصرفی',
    },
    client: {
      en: 'Consumer Goods Concepts & Spoota',
      fa: 'مجموعه پروژه‌های بسته‌بندی کالاهای مصرفی و آفتاب اسپوتا',
    },
    category: 'packaging',
    categoryLabel: {
      en: 'FMCG Packaging & Concept Development',
      fa: 'طراحی بسته‌بندی و توسعه کانسپت',
    },
    industry: {
      en: 'Confectionery, Snacks & Retail Food',
      fa: 'شیرینی‌جات، اسنک و محصولات غذایی شلف',
    },
    year: '2023 - 2024',
    featured: false,
    heroImage: '/assets/aistudio/__Take_control_of_your_money__shape_your_future__1a829075.jpg',
    galleryImages: [
      '/assets/aistudio/__Take_control_of_your_money__shape_your_future__1a829075.jpg',
    ],
    role: {
      en: 'Concept Designer & Packaging Architect',
      fa: 'طراح کانسپت و معمار بسته‌بندی',
    },
    context: {
      en: 'A showcase of retail packaging concepts including Mood Mint (functional mints), Little Buddy (children snacks), and Aftab Spoota edible oil packaging, emphasizing instant shelf distinction.',
      fa: 'مجموعه‌ای از پروژه‌های بسته‌بندی کالاهای تندمصرف شامل خوشبوکننده دهان Mood Mint، خوراکی کودکانه Little Buddy و روغن‌های خوراکی آفتاب اسپوتا با هدف تمایز فوری در شلف سوپرمارکت.',
    },
    creativeDirection: {
      en: 'Playful yet disciplined character illustration, clear flavor color coding, and ergonomic carton structures.',
      fa: 'تصویرسازی‌های پرنشاط کاراکتر، تفکیک رنگی اشتها‌آور بر اساس طعم‌ها و طراحی استراکچر خوش‌دست برای حمل آسان مصرف‌کننده.',
    },
    designDevelopment: {
      en: 'Developed flexographic and offset print dielines, barcode regulations compliance, and POSM display stands.',
      fa: 'طراحی خطوط تیغ آماده چاپ فلکسو و افست، رعایت استانداردهای بارکد و لیبلینگ و طراحی استندهای سرلاین فروشگاه.',
    },
    deliverables: {
      en: [
        'Mood Mint confectionery pocket tins & carton displays',
        'Little Buddy snack packaging character branding',
        'Aftab Spoota cooking oil label architecture',
        'Retail shelf presence mockups & 3D visualizations',
      ],
      fa: [
        'طراحی قوطی فلزی و جعبه مقوایی خوشبوکننده Mood Mint',
        'طراحی کاراکتر و بسته‌بندی اسنک Little Buddy',
        'سیستم معماری لیبل روغن‌های خوراکی آفتاب اسپوتا',
        'موکاپ‌های سه‌بعدی چیدمان شلف فروشگاهی',
      ],
    },
    outcomesAndImpact: {
      en: 'Demonstrated superior shelf differentiation against legacy confectionery competitors.',
      fa: 'اثبات قدرت تمایز بصری بسته‌بندی در ایجاد تصمیم خرید سریع در میان ده‌ها محصول رقیب.',
    },
    credits: {
      en: 'Packaging Concepts: Saeed Jabbari',
      fa: 'توسعه کانسپت و بسته‌بندی: سعید جباری',
    },
  },
  {
    id: 'brand_identity_systems',
    slug: 'brand-identity-systems',
    title: {
      en: 'Selected Brand Identity & Typography Systems',
      fa: 'مجموعه هویت بصری، نشان‌های تجاری و سیستم‌های تایپوگرافی',
    },
    client: {
      en: 'Various B2B & Consumer Clients',
      fa: 'کارفرمایان منتخب سازمانی، تولیدی و استارتاپی',
    },
    category: 'brand_identity',
    categoryLabel: {
      en: 'Brand Design & Visual Communication',
      fa: 'طراحی برند و ارتباطات بصری',
    },
    industry: {
      en: 'Cross-Industry Brand Systems',
      fa: 'صنایع گوناگون: تجارت، فناوری، تولید',
    },
    year: '2020 - 2024',
    featured: false,
    heroImage: '/assets/aistudio/Azentos___Branding_Studio_App_Design_by_Abdullah__fa3e999b.jpg',
    galleryImages: [
      '/assets/aistudio/Azentos___Branding_Studio_App_Design_by_Abdullah__fa3e999b.jpg',
    ],
    role: {
      en: 'Brand Identity Strategist & Typographer',
      fa: 'طراح استراتژی هویت برند و تایپوگرافی',
    },
    context: {
      en: 'A curated selection of corporate logotypes, bilingual typographic systems, and visual governance manuals created for startups, manufacturing plants, and service agencies.',
      fa: 'گزیده‌ای از نشان‌های تجاری، لوگوتایپ‌های دوزبانه و نظام‌های گرافیکی طراحی شده برای سازمان‌های تولیدی، استارتاپ‌ها و شرکت‌های بازرگانی با رعایت استانداردهای ماندگاری.',
    },
    creativeDirection: {
      en: 'Emphasizing geometrical harmony, timeless minimalism, mathematical grid alignment, and legibility at tiny favicons as well as giant factory building signage.',
      fa: 'تأکید بر توازن هندسی، مینیمالیسم پایدار، محاسبات دقیق فواصل و خوانایی بی‌نقص از آیکون‌های ریز موبایل تا تابلوهای عظیم سردر کارخانجات.',
    },
    designDevelopment: {
      en: 'Vector master assets, complete corporate guidelines, color contrast matrices, and stationery sets.',
      fa: 'فایل‌های مستر وکتور، کتابچه‌های مدون هویت بصری، ماتریس‌های کنتراست رنگی و ست کامل اوراق سازمانی.',
    },
    deliverables: {
      en: [
        'Bilingual logotype designs & monogram marks',
        'Comprehensive Brand Books & Guideline Manuals',
        'Corporate stationery suites & document templates',
        'Environmental signage & architectural mark applications',
      ],
      fa: [
        'طراحی لوگوتایپ‌های دوزبانه و مونوگرام‌های اختصاصی',
        'تدوین کتابچه‌های جامع هویت بصری و راهنمای برند',
        'ست کامل اسناد اداری، پاکت‌ها و سربرگ‌های چاپی و دیجیتال',
        'گرافیک محیطی، تابلوهای راهنما و نشان سردر کارخانجات',
      ],
    },
    outcomesAndImpact: {
      en: 'Built enduring brand equity enabling clients to scale confidently across international markets.',
      fa: 'خلق دارایی پایدار برند که به سازمان‌ها امکان می‌دهد با اعتمادبه‌نفس در بازارهای بین‌المللی رقابت کنند.',
    },
    credits: {
      en: 'Identity Architecture & Typography: Saeed Jabbari',
      fa: 'طراحی هویت بصری و تایپوگرافی: سعید جباری',
    },
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp_1',
    company: {
      en: 'RST Purchasing',
      fa: 'آر‌اس‌تی پرچسینگ (RST Purchasing)',
    },
    role: {
      en: 'Art Director & Visual Communications Lead',
      fa: 'مدیر هنری و مسئول ارتباطات بصری صنعتی',
    },
    period: {
      en: '2023 - Present',
      fa: '۱۴۰۲ - اکنون',
    },
    location: {
      en: 'Tehran / Remote',
      fa: 'تهران / دورکاری',
    },
    type: {
      en: 'Commercial & Industrial Supply',
      fa: 'بازرگانی قطعات و محورهای تریلر صنعتی',
    },
    summary: {
      en: 'Directing the visual communications architecture for commercial trailer parts and axles. Developing engineering-grade multi-page catalogs, social product video clips, and technical sales collateral for international B2B distributors.',
      fa: 'هدایت کلیه ارتباطات بصری و برندینگ قطعات یدکی و محورهای تریلر تجاری؛ تدوین کاتالوگ‌های فنی چندصفحه‌ای، تولید موشن‌گرافیک‌های معرفی محصول در شبکه‌های اجتماعی و ساماندهی اسناد فروش B2B.',
    },
    highlights: {
      en: [
        'Engineered complete technical catalogues for heavy trailer axle components',
        'Produced high-impact product-centric social motion graphics explaining mechanical features',
        'Translated complex engineering data into clear sales collateral for foreign trade negotiations',
      ],
      fa: [
        'مهندسی کاتالوگ جامع قطعات یدکی و مشخصات فنی محورهای سنگین',
        'تولید مجموعه موشن‌گرافیک‌های شبکه اجتماعی جهت معرفی کارکرد قطعات مکانیکی',
        'تبدیل اطلاعات پیچیده فنی به ارتباطات بصری روان برای مشتریان خارجی و مذاکرات تجاری',
      ],
    },
    badge: 'B2B & Industrial',
  },
  {
    id: 'exp_2',
    company: {
      en: 'Maral Trailer',
      fa: 'شرکت صنعتی مارال تریلر (Maral Trailer)',
    },
    role: {
      en: 'Art Director & Motion Media Consultant',
      fa: 'مدیر هنری و مشاور تولید محتوای ویدئویی محصول',
    },
    period: {
      en: '2023 - 2024',
      fa: '۱۴۰۲ - ۱۴۰۳',
    },
    location: {
      en: 'Urmia / Tehran',
      fa: 'ارومیه / تهران',
    },
    type: {
      en: 'Heavy Vehicle Manufacturing',
      fa: 'صنایع تولید تریلرهای نیمه‌سنگین تجاری',
    },
    summary: {
      en: 'Spearheaded art direction for commercial semi-trailer product promotions. Orchestrated video production utilizing AI-assisted visual synthesis and industrial ASMR aesthetics to highlight precision manufacturing standards.',
      fa: 'هدایت هنری معرفی محصولات تریلرهای نیمه‌سنگین؛ ساخت ویدئوهای تبلیغاتی تلفیق‌شده با هوش مصنوعی و ویدئوهای حسی ASMR صنعتی با تمرکز بر نمایش کیفیت بالای متریال و جوشکاری فولاد.',
    },
    highlights: {
      en: [
        'Achieved 310,000+ views, 11,000+ likes on flagship ASMR trailer product video',
        'Integrated generative AI tools into pre-visualization and cinematic promo video production',
        'Designed international exhibition sales collateral and international media presentations',
      ],
      fa: [
        'ثبت رکورد بیش از ۳۱۰ هزار بازدید ارگانیک و ۱۱ هزار لایک در ویدئوی شاخص ASMR محصول',
        'به‌کارگیری ابزارهای هوش مصنوعی در پیش‌تولید و تصویرسازی‌های سناریوی تجاری',
        'طراحی اسناد معرفی محصول برای هیئت‌های تجاری و نمایشگاه‌های حمل‌ونقل بین‌المللی',
      ],
    },
    badge: 'Manufacturing & Motion',
  },
  {
    id: 'exp_3',
    company: {
      en: 'Spoota Industrial Group',
      fa: 'گروه صنعتی اسپوتا (Spoota Industrial Holding)',
    },
    role: {
      en: 'Senior Brand & Graphic Designer',
      fa: 'طراح ارشد برند، گرافیک سازمانی و محیطی',
    },
    period: {
      en: '2022 - 2023',
      fa: '۱۴۰۱ - ۱۴۰۲',
    },
    location: {
      en: 'Tehran',
      fa: 'تهران',
    },
    type: {
      en: 'Industrial Conglomerate',
      fa: 'هلدینگ صنایع غذایی و تولیدی',
    },
    summary: {
      en: 'Governed the corporate visual identity of the parent holding and subsidiaries. Designed multi-page industrial catalogs, international exhibition pavilion environmental graphics, consumer food packaging, and corporate publications.',
      fa: 'طراحی و نظارت بر هویت بصری هلدینگ مادر و شرکت‌های تابعه؛ طراحی کاتالوگ‌های صنعتی، گرافیک محیطی پاویون نمایشگاه‌های بین‌المللی، بسته‌بندی محصولات غذایی و سررسیدهای نفیس سازمانی.',
    },
    highlights: {
      en: [
        'Designed comprehensive exhibition pavilion backdrops for international trade expos',
        'Engineered food packaging systems for retail brands (Aftab Spoota edible oils)',
        'Unified corporate communication across diverse industrial subsidiaries',
      ],
      fa: [
        'طراحی گرافیک دیوارهای غرفه و پاویون در نمایشگاه‌های بین‌المللی صنایع غذایی و بازرگانی',
        'طراحی سیستم بسته‌بندی و لیبل روغن‌های خوراکی آفتاب اسپوتا برای شلف فروشگاه‌ها',
        'یکپارچه‌سازی ارتباطات سازمانی و اسناد رسمی در میان شرکت‌های گوناگون هلدینگ',
      ],
    },
    badge: 'Corporate & Packaging',
  },
  {
    id: 'exp_4',
    company: {
      en: 'The Nuve Beauty Atelier',
      fa: 'برند آرایشی و زیبایی دِ نووه (The Nuve)',
    },
    role: {
      en: 'Packaging Architect & Visual Consultant',
      fa: 'طراح بسته‌بندی و مشاور دیزاین برند',
    },
    period: {
      en: '2023 - 2024',
      fa: '۱۴۰۲ - ۱۴۰۳',
    },
    location: {
      en: 'Remote Project',
      fa: 'پروژه مستقل / دورکاری',
    },
    type: {
      en: 'Prestige Skincare',
      fa: 'محصولات پوستی و زیبایی لوکس',
    },
    summary: {
      en: 'Led packaging design and art direction for Shimmer Lotion and luxury rigid gift boxes. Created high-converting launch visuals through generative AI photography and bespoke structural dielines.',
      fa: 'طراحی ساختار بسته‌بندی و مدیریت هنری لانچ Shimmer Lotion و جعبه هاردباکس هدیه؛ خلق تصاویر تبلیغاتی با کمک هوش مصنوعی و طراحی خطوط تیغ جعبه با فینیشینگ‌های متالیک.',
    },
    highlights: {
      en: [
        'Crafted magnetic rigid VIP gift box dielines with tactile foil and embossing',
        'Synthesized AI-assisted campaign hero imagery for social media product drop',
        'Complete packaging production management and bottle label typography',
      ],
      fa: [
        'طراحی گسترده تیغ هاردباکس مگنتی با فویل طلاکوب و المان‌های لمسی برجسته',
        'تولید فریم‌های تبلیغاتی محصول با استفاده از ابزارهای هوش مصنوعی جهت لانچ دیجیتال',
        'نظارت فنی بر چاپ لیبل‌های ضدآب شیشه و استانداردهای بسته‌بندی بهداشتی',
      ],
    },
    badge: 'Luxury Packaging',
  },
  {
    id: 'exp_5',
    company: {
      en: 'Independent Art Direction & Design Studio',
      fa: 'استودیو دیزاین و پروژه‌های مستقل سعید جباری',
    },
    role: {
      en: 'Independent Art Director & Brand Consultant',
      fa: 'مدیر هنری و مشاور مستقل برندسازی',
    },
    period: {
      en: '2014 - Present',
      fa: '۱۳۹۳ - اکنون (۱۰+ سال سابقه)',
    },
    location: {
      en: 'Worldwide Remote / Tehran',
      fa: 'پروژه‌های سراسری و بین‌المللی',
    },
    type: {
      en: 'Consultancy & Design Practice',
      fa: 'خدمات استراتژیک هویت بصری، بسته‌بندی و وب',
    },
    summary: {
      en: 'Partnering directly with business founders, marketing directors, and creative agencies on high-stakes brand identities, industrial catalogs, packaging architectures, and digital product communications.',
      fa: 'همکاری مستقیم با بنیان‌گذاران، مدیران بازاریابی و آژانس‌های خلاق جهت بازطراحی هویت‌های سازمانی، کاتالوگ‌های چندصفحه‌ای، پکیج‌های غرفه‌سازی نمایشگاهی و وب‌اپلیکیشن‌های اختصاصی.',
    },
    highlights: {
      en: [
        'Over 140 successfully delivered visual identity, packaging, and digital projects',
        'Brings Civil Engineering problem-solving rigor to creative brand systems',
        'End-to-end guidance from strategic discovery to factory production verification',
      ],
      fa: [
        'بیش از ۱۴۰ پروژه اجرا شده در حوزه‌های برندینگ، کاتالوگ و بسته‌بندی',
        'به‌کارگیری تفکر حل‌مسئله و درک فنی نشأت‌گرفته از تحصیلات مهندسی عمران',
        'همراهی کارفرما از شکل‌گیری کانسپت تا نظارت در چاپخانه و خطوط تولید',
      ],
    },
    badge: 'Studio Practice',
  },
];
