import { ArticleItem } from '../types';

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'art_1',
    slug: 'engineering-principles-packaging-structural-tolerances',
    title: {
      en: 'Engineering Principles in Packaging: Why Structural Tolerances Matter as Much as Graphics',
      fa: 'اصول مهندسی در طراحی بسته‌بندی: چرا تلرانس‌های خط تیغ و استراکچر به اندازه گرافیک اهمیت دارند؟',
    },
    subtitle: {
      en: 'How understanding board caliper, grain direction, and crease physics prevents expensive production disasters and elevates consumer unboxing.',
      fa: 'چگونه درک گرماژ مقوا، خواب الیاف کاغذ (Grain Direction) و فیزیک خطوط تا، مانع از خسارات سنگین چاپی شده و تجربه جعبه‌گشایی را متحول می‌کند.',
    },
    category: 'packaging',
    categoryLabel: {
      en: 'Packaging Architecture',
      fa: 'معماری و استراکچر بسته‌بندی',
    },
    publishedDate: {
      en: 'October 2026',
      fa: 'مهر ۱۴۰۵',
    },
    readTime: {
      en: '7 min read',
      fa: '۷ دقیقه مطالعه',
    },
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    tags: {
      en: ['Structural Dielines', 'FMCG Physics', 'Prepress Engineering', 'Boxboard Caliper'],
      fa: ['خطوط تیغ ساختاری', 'فیزیک بسته‌بندی FMCG', 'مهندسی پیش از چاپ', 'ضخامت و مقاومت مقوا'],
    },
    quote: {
      en: 'A gorgeous package that buckles under pallet stacking or tears along the tuck-flap is not design—it is an expensive manufacturing defect.',
      fa: 'بسته‌بندی زیبایی که زیر فشار چیدمان پالت خرد شود یا در محل درب زبانه پاره شود، طراحی نیست؛ بلکه یک خسارت فنی گران‌قیمت در خط تولید است.',
    },
    sections: [
      {
        heading: {
          en: '1. The Flaw of Designing in Two Dimensions',
          fa: '۱. خطای بنیادین در طراحی دوبعدی بسته‌بندی',
        },
        paragraphs: {
          en: [
            'Most packaging failures occur because graphic designers view a dieline as a flat canvas rather than a three-dimensional mechanical shell under constant spatial tension.',
            'Paperboard has physical mass, grain orientation, and elastic memory. When a 350gsm folding boxboard is scored and folded 90 degrees, the outside fibers stretch while internal fibers compress. If your crease allowances are not calibrated to the exact micrometer thickness of the stock, the tuck flaps will either bulge open on retail shelves or pop their glued joints during automated cartoning.',
          ],
          fa: [
            'اکثر شکست‌ها در خطوط تولید بسته‌بندی از آنجا ناشی می‌شود که طراح گرافیک به خط تیغ (Dieline) صرفاً به عنوان یک بوم تخت دو‌بعدی نگاه می‌کند، نه یک سازه مکانیکی سه‌بعدی که تحت تنش‌های فیزیکی مداوم قرار دارد.',
            'مقوا دارای جرم فیزیکی، خواب الیاف (Grain Direction) و حافظه کشسانی است. هنگامی که یک مقوای ۳۵۰ گرم ایندربرد ۹۰ درجه تا می‌خورد، الیاف بیرونی دچار کشش و الیاف داخلی دچار فشردگی می‌شوند. اگر تلرانس پهنای خط تا متناسب با ضخامت دقیق میکرونی مقوا محاسبه نشود، زبانه‌های درب جعبه در قفسه باز می‌مانند یا در دستگاه‌های بسته‌بندی مکانیزه کارخانه‌ای متلاشی می‌شوند.',
          ],
        },
        keyTakeaway: {
          en: 'Always verify grain direction runs parallel to major score lines to prevent cracking along varnish coatings.',
          fa: 'جهت خواب الیاف مقوا (Grain Direction) باید همواره موازی با خطوط اصلی تا باشد تا از ترک‌خوردگی سلفون و پوشش‌های یووی جلوگیری شود.',
        },
      },
      {
        heading: {
          en: '2. Box Compression Test (BCT) & Palletization Efficiency',
          fa: '۲. آزمون مقاومت فشاری جعبه (BCT) و بهینه‌سازی چیدمان پالت',
        },
        paragraphs: {
          en: [
            'An art director with engineering insight calculates the entire logistics lifecycle. From the moment products leave the filling line to when a master carton sits 5 tiers high inside an intermodal sea container, corners bear 60% of the entire compressive load.',
            'By slightly radiusing or double-walling stress corners, we can frequently reduce board grammage by 15% without sacrificing strength—saving enterprise clients hundreds of thousands of dollars annually in substrate and freight expenditure.',
          ],
          fa: [
            'مدیر هنری با بینش مهندسی، کل چرخه لجستیک و انبارداری محصول را تحلیل می‌کند. از لحظه‌ای که کارتن‌ها از خط پرکن خارج می‌شوند تا زمانی که در کانتینرهای ۵ لایه روی هم چیده می‌شوند، گوشه‌های کارتن ۶۰ درصد کل بار فشاری را تحمل می‌کنند.',
            'با تقویت هندسی لبه‌ها و زوایای متناظر، می‌توان گرماژ مقوا را تا ۱۵ درصد کاهش داد بدون اینکه از استحکام باربری کاسته شود؛ این اصلاح مهندسی سالانه صدها میلیون تومان در مصرف متریال و هزینه‌های حمل‌ونقل کانتینری برای شرکت‌ها صرفه‌جویی خلق می‌کند.',
          ],
        },
      },
      {
        heading: {
          en: '3. The Haptic Opening Ritual',
          fa: '۳. مهندسی آیین بازگشایی و لمس حسی (Haptic Ritual)',
        },
        paragraphs: {
          en: [
            'Tactile luxury is governed by resistance tolerances: the subtle air-cushion whoosh of a rigid shoulder-and-neck box, or the satisfying snap of a magnetic closure calibrated to 1,200 Gauss.',
            'When engineering luxury packaging for cosmetics or high-end electronics, every millimeter of internal clearance matters. If tolerances are too tight, vacuum friction makes opening frustrating; if too loose, the interior presentation feels cheap.',
          ],
          fa: [
            'حس لوکس بودن در بسته‌بندی با تلرانس‌های مقاومت فیزیکی رقم می‌خورد: مکش نرم هوایی در جعبه‌های هاردباکس کیبوردی یا صدای قفل شدن آهنربای مگنتی با قدرت ۱۲۰۰ گاوس.',
            'در بسته‌بندی‌های لوکس آرایشی، هر میلی‌متر خلاصی بین درب و بدنه اهمیت حیاتی دارد. اگر فاصله خیلی اندک باشد، اصطکاک بازکردن محصول را آزاردهنده می‌کند و اگر بیش از حد باز باشد، حس مرغوبیت برند از بین می‌رود.',
          ],
        },
      },
    ],
  },
  {
    id: 'art_2',
    slug: 'anatomy-of-industrial-catalog-b2b-conversion',
    title: {
      en: 'The Anatomy of an Industrial Catalog: Structuring High-Density Technical B2B Data for Higher Conversion',
      fa: 'کالبدشکافی کاتالوگ صنعتی: چیدمان اطلاعات متراکم فنی و نقشه‌ها برای نرخ تبدیل بالاتر در قراردادهای B2B',
    },
    subtitle: {
      en: 'How to turn intimidating engineering schematics, metallurgical specs, and multi-tier part numbers into a high-powered B2B sales instrument.',
      fa: 'چگونه جداول پیچیده مهندسی، نقشه‌های انفجاری CAD و صدها کد قطعه صنعتی را به یک ابزار فروش استراتژیک در مناقصات تجاری تبدیل کنیم.',
    },
    category: 'industrial_b2b',
    categoryLabel: {
      en: 'Industrial & B2B Systems',
      fa: 'سیستم‌های صنعتی و تجاری',
    },
    publishedDate: {
      en: 'September 2026',
      fa: 'شهریور ۱۴۰۵',
    },
    readTime: {
      en: '8 min read',
      fa: '۸ دقیقه مطالعه',
    },
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    tags: {
      en: ['B2B Sales Catalogs', 'Information Architecture', 'Exploded Diagrams', 'Technical Typography'],
      fa: ['کاتالوگ‌های فروش B2B', 'معماری اطلاعات فنی', 'دیاگرام‌های انفجاری', 'تایپوگرافی فنی'],
    },
    quote: {
      en: 'Procurement officers do not read industrial catalogs like novels. They scan for tolerances, payload capacities, and ordering SKUs in under 20 seconds.',
      fa: 'مدیران خرید و مهندسان صنایع، کاتالوگ را مثل رمان نمی‌خوانند؛ آن‌ها ظرف کمتر از ۲۰ ثانیه به دنبال تلرانس‌های باربری، ابعاد فنی و کدهای سفارش هستند.',
    },
    sections: [
      {
        heading: {
          en: '1. The Cognitive Fatigue of Industrial Buyers',
          fa: '۱. خستگی شناختی مدیران خرید در مواجهه با اسناد فنی',
        },
        paragraphs: {
          en: [
            'Industrial catalogs frequently suffer from one of two extremes: either an agency renders them completely uninformative with decorative lifestyle photos, or the internal engineering department exports raw Excel spreadsheets into InDesign without visual hierarchy.',
            'A superior industrial catalog acts as a structured decision tree. It guides a plant manager or chief engineer from macro application requirements down to microscopic torque ratings and part numbers.',
          ],
          fa: [
            'کاتالوگ‌های کارخانجات صنعتی معمولاً به یکی از دو بیراهه دچار می‌شوند: یا آژانس‌های تبلیغاتی با عکس‌های بی‌محتوا آنها را بی‌خاصیت می‌کنند، یا دپارتمان مهندسی کارخانه جداول اکسل خام را بدون هیچ ساختار بصری وارد صفحات چاپ می‌کند.',
            'کاتالوگ صنعتی استاندارد باید مانند یک درخت تصمیم‌گیری شفاف عمل کند. باید مدیر فنی یا کارشناس بازرگانی را از کاربرد کلان سیستم به سمت مشخصات دقیق گشتاور، بار مجاز و کد سفارش هدایت کند.',
          ],
        },
        keyTakeaway: {
          en: 'Group technical specifications into primary performance metrics (bold) and secondary dimensional data (mono-spaced).',
          fa: 'مشخصات کلیدی عملکردی را در لایه اول با فونت بولد و ابعاد میلی‌متری تکمیلی را با فونت مونو‌اسپیس مهندسی سازماندهی کنید.',
        },
      },
      {
        heading: {
          en: '2. Precision Exploded CAD Views vs Photo Collages',
          fa: '۲. نقشه‌های انفجاری تفکیک‌شده در برابر کلاژهای عکاسی مبهم',
        },
        paragraphs: {
          en: [
            'When showcasing commercial trailer axles or planetary gearboxes, a studio photograph only shows the outer casing. To build technical authority, the catalog must pair rendered 3D CAD cutaways with numbered leader lines.',
            'Every leader line connects to a clean bill-of-materials table. This bridges the language barrier between sales reps, purchasing agents, and warehouse maintenance technicians.',
          ],
          fa: [
            'هنگام معرفی محور تریلرهای فوق‌سنگین یا گیربکس‌های صنعتی، عکس آتلیه‌ای فقط بدنه فلزی را نشان می‌دهد. برای اعتمادسازی فنی، کاتالوگ باید نماهای برش‌خورده سه‌بعدی CAD را با خطوط راهنمای شماره‌گذاری‌شده همراه کند.',
            'هر خط راهنما مستقیماً به جدول قطعات و پارت نامبرها متصل می‌شود. این سیستم زبان مشترکی میان کارشناسان فروش، مهندسان خریدار و اپراتورهای تعمیرات کارخانه‌ای خلق می‌کند.',
          ],
        },
      },
    ],
  },
  {
    id: 'art_3',
    slug: 'generative-ai-art-direction-workflows',
    title: {
      en: 'Generative AI as a Supercharged Ideation Engine in Art Direction: Practical Workflows Without Sacrificing Craft',
      fa: 'هوش مصنوعی به عنوان شتاب‌دهنده فرآیند ایده‌پردازی در مدیریت هنری: متدولوژی‌های عملی بدون فدا کردن اصالت دیزاین',
    },
    subtitle: {
      en: 'How senior art directors combine diffusion models with rigorous typography and vector workflows to compress 3-week concept cycles into 48 hours.',
      fa: 'چگونه مدیران هنری مدل‌های هوش مصنوعی زایا را با خطوط برداری دقیق و استانداردهای پیش از چاپ تلفیق می‌کنند تا چرخه‌های سه‌هفته‌ای را به ۴۸ ساعت برسانند.',
    },
    category: 'ai_methodology',
    categoryLabel: {
      en: 'AI & Creative Pipeline',
      fa: 'هوش مصنوعی و خط تولید خلاق',
    },
    publishedDate: {
      en: 'August 2026',
      fa: 'مرداد ۱۴۰۵',
    },
    readTime: {
      en: '6 min read',
      fa: '۶ دقیقه مطالعه',
    },
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: {
      en: ['Generative AI', 'Art Direction', 'Rapid Prototyping', 'Creative Pipelines'],
      fa: ['هوش مصنوعی زایا', 'مدیریت هنری', 'نمونه‌سازی سریع', 'خطوط تولید خلاق'],
    },
    quote: {
      en: 'AI does not replace art direction; it ruthlessly exposes the lack of it. Without taste, structural theory, and rigorous curation, AI generates high-resolution noise.',
      fa: 'هوش مصنوعی جایگزین مدیریت هنری نمی‌شود؛ بلکه فقدان آن را بی‌رحمانه برملا می‌کند. بدون سواد بصری، درک ساختار و سلیقه هدایتگرانه، هوش مصنوعی تنها نویزهایی با رزولوشن بالا تولید می‌کند.',
    },
    sections: [
      {
        heading: {
          en: '1. The Evolution of Concept Moodboarding',
          fa: '۱. تحول مودبوردهای مفهومی و ایده‌پردازی اولیه',
        },
        paragraphs: {
          en: [
            'In traditional client pitches, building moodboards relied on scouring Pinterest or stock repositories for loose approximations of what you intended to shoot or build.',
            'Today, we synthesize exact cinematic lighting scenarios, bespoke cosmetic container forms, and complex industrial architectural scenes in minutes. This removes ambiguity from client stakeholder reviews before a single tooling die is fabricated.',
          ],
          fa: [
            'در روش‌های سنتی، ساخت مودبورد به جستجوی خسته‌کننده در پینترست یا سایت‌های استوک وابسته بود تا شاید تصویری شبیه به ایده ذهنی پیدا شود.',
            'امروز ما می‌توانیم نورپردازی دقیق سینمایی، هندسه بطری‌های آرایشی و نماهای صنعتی کارخانجات را دقیقاً مطابق سناریوی پروژه در دقایقی شبیه‌سازی کنیم. این امر تمام ابهامات ذهنی کارفرما را پیش از هزینه‌های ساخت قالب برطرف می‌کند.',
          ],
        },
      },
      {
        heading: {
          en: '2. The Hybrid Hand-off: Vectors, InDesign, and Factory Production',
          fa: '۲. خط تحویل تلفیقی: بردارها، ایندیزاین و ارسال به چاپخانه',
        },
        paragraphs: {
          en: [
            'AI images are strictly raster pixels. They cannot generate valid spot colors, dieline registration marks, or vector kerning pairs.',
            'The professional workflow uses AI strictly as the visual backdrop and lighting reference. All critical brand typography, regulatory barcode symbology, and dieline engineering remain 100% vector-authored in Illustrator and InDesign.',
          ],
          fa: [
            'خروجی هوش مصنوعی صرفاً پیکسل‌های رستر است و به هیچ وجه نمی‌تواند کدهای پنتون، نشانه‌های رجیستر خط تیغ یا فواصل تایپوگرافی را مدیریت کند.',
            'رویکرد حرفه‌ای استودیو این است که از هوش مصنوعی صرفاً برای شبیه‌سازی بافت، نور و فضاسازی بهره می‌گیرد؛ در حالی که تمام تایپوگرافی‌های شناسنامه محصول، کدهای بارکد استاندارد و خطوط تیغ با دقت ۱۰۰٪ برداری در ایلوستریتور پیاده‌سازی می‌شوند.',
          ],
        },
      },
    ],
  },
  {
    id: 'art_4',
    slug: 'fmcg-3-second-shelf-battle',
    title: {
      en: 'Visual Architecture in FMCG: The 3-Second Shelf Battle and Cognitive Load Reduction',
      fa: 'معماری بصری در کالاهای تندمصرف (FMCG): جنگ ۳ ثانیه‌ای روبه‌روی شلف و کاهش بار شناختی خریدار',
    },
    subtitle: {
      en: 'Why trendy decorative minimalism often fails on hypermarket shelves, and how clear value hierarchy drives subconscious purchasing decisions.',
      fa: 'چرا مینیمالیسم تزئینی گاهی در شلف هایپرمارکت‌ها شکست می‌خورد و چگونه سلسله‌مراتب ارزش، انتخاب ناخودآگاه خریدار را رقم می‌زند.',
    },
    category: 'brand_strategy',
    categoryLabel: {
      en: 'Brand & Retail Strategy',
      fa: 'استراتژی برند و ریتیل',
    },
    publishedDate: {
      en: 'July 2026',
      fa: 'تیر ۱۴۰۵',
    },
    readTime: {
      en: '5 min read',
      fa: '۵ دقیقه مطالعه',
    },
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    tags: {
      en: ['FMCG Packaging', 'Shelf Impact', 'Consumer Psychology', 'Visual Hierarchy'],
      fa: ['بسته‌بندی FMCG', 'تأثیر در قفسه', 'روانشناسی مصرف‌کننده', 'سلسله‌مراتب بصری'],
    },
    quote: {
      en: 'In an aisle with 40 competing brands, legibility at 2 meters distance beats clever hidden subtlety every single time.',
      fa: 'در راهروی فروشگاهی با ۴۰ برند رقیب، خوانایی واضح از فاصله ۲ متری همیشه بر ریزه‌کاری‌های پنهان گرافیکی پیروز می‌شود.',
    },
    sections: [
      {
        heading: {
          en: '1. Saccadic Eye Movements in the Retail Aisle',
          fa: '۱. حرکات سریع چشم خریدار در راهروی سوپرمارکت',
        },
        paragraphs: {
          en: [
            'Eye-tracking studies demonstrate that shoppers spend an average of 1.8 to 2.4 seconds evaluating a packaging cluster before moving their focal point. If your pack does not answer three fundamental questions instantly, it is ignored:',
            '1) What product category is this? 2) What is its primary proprietary benefit? 3) Which variant fits my immediate need?',
          ],
          fa: [
            'مطالعات ردیابی چشم نشان می‌دهند که خریداران به طور میانگین ۱.۸ تا ۲.۴ ثانیه برای اسکن یک ردیف محصول در قفسه وقت می‌گذارند. اگر بسته‌بندی شما نتواند در این زمان کوتاه به ۳ سوال اساسی پاسخ دهد، نادیده گرفته می‌شود:',
            '۱) این چه کالایی است؟ ۲) مزیت اختصاصی این برند چیست؟ ۳) کدام طعم یا مدل برای نیاز لحظه‌ای من مناسب است؟',
          ],
        },
      },
      {
        heading: {
          en: '2. Distinctive Brand Assets (DBAs) Over Generic Trends',
          fa: '۲. دارایی‌های بصری متمایز برند (DBAs) در برابر ترندهای زودگذر',
        },
        paragraphs: {
          en: [
            'Packaging should not blindly chase current Dribbble or Pinterest aesthetic fads. It must establish ownable chromatic shapes, bold typography angles, and tactile finishes that become mental shortcuts for consumers over multiple repeat purchases.',
          ],
          fa: [
            'طراحی بسته‌بندی نباید کورکورانه ترندهای سطحی شبکه‌های اجتماعی را تقلید کند. این طراحی باید فرم‌های رنگی ماندگار، زوایای تایپوگرافی جسور و فینیشینگ‌های حسی خلق کند که به عنوان میانبر ذهنی برای خریدهای مکرر بعدی ثبت شوند.',
          ],
        },
      },
    ],
  },
  {
    id: 'art_5',
    slug: 'offset-prepress-color-separation-guide',
    title: {
      en: 'Color Separation & Offset Print Prepress: What Every Brand Designer Must Master Before Sending to Plate',
      fa: 'تفکیک رنگ، لیتوگرافی و نظارت چاپ افست: آنچه هر دیزاینر هویت برند باید پیش از صدور زینک بداند',
    },
    subtitle: {
      en: 'Total Area Coverage limits, ink trapping tolerances, Pantone spot separation, and surviving the press-check inspection without surprises.',
      fa: 'سقف پوشش مرکب (TAC)، ترپینگ رنگ‌ها، تفکیک زینک‌های پنتون اختصاصی و مدیریت موفق آزمون چاپخانه در پای ماشین چاپ.',
    },
    category: 'technical_print',
    categoryLabel: {
      en: 'Technical Prepress',
      fa: 'دانش فنی و لیتوگرافی',
    },
    publishedDate: {
      en: 'June 2026',
      fa: 'خرداد ۱۴۰۵',
    },
    readTime: {
      en: '9 min read',
      fa: '۹ دقیقه مطالعه',
    },
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    tags: {
      en: ['Offset Printing', 'Pantone Formulas', 'Prepress Inspection', 'Total Area Coverage'],
      fa: ['چاپ افست', 'فرمول‌های پنتون', 'کنترل لیتوگرافی', 'حداکثر پوشش مرکب'],
    },
    quote: {
      en: 'Design that cannot be reliably reproduced across 50,000 sheets at 12,000 impressions per hour is merely theoretical art.',
      fa: 'طرحی که نتوان آن را با ثبات رنگ در ۵۰ هزار برگ چاپی با سرعت ۱۲ هزار فرم در ساعت تکثیر کرد، صرفاً یک نقاشی تئوریک است نه طراحی صنعتی.',
    },
    sections: [
      {
        heading: {
          en: '1. Total Area Coverage (TAC) and Setoff Prevention',
          fa: '۱. سقف پوشش رنگ (TAC) و جلوگیری از پشت‌زدن مرکب',
        },
        paragraphs: {
          en: [
            'Rich black in RGB looks deep on an OLED screen, but in 4-color offset printing, specifying 100C 100M 100Y 100K results in 400% TAC. This floods the paper fibers with wet ink, leading to disastrous tracking, drying delays, and ink transfer onto the reverse side of stacked sheets.',
            'A properly engineered rich black for coated paperboard balances at 60C 40M 30Y 100K (230% TAC), delivering velvety depth with lightning-fast drying under infrared dryers.',
          ],
          fa: [
            'مشکی پرکنتراست در مانیتور زیباست، اما در چاپ افست ۴ رنگ اگر به اشتباه ۱۰۰C ۱۰۰M ۱۰۰Y ۱۰۰K خروجی گرفته شود، پوشش رنگ ۴۰۰٪ ایجاد می‌کند. این حجم مرکب باعث خیس ماندن مقوا، خشک نشدن و فاجعه پشت‌زدن رنگ روی برگه‌های دیگر پالت می‌شود.',
            'فرمول مهندسی‌شده مشکی عمیق برای مقوای گلاسه، ترکیب ۶۰C ۴۰M ۳۰Y ۱۰۰K (مجموع ۲۳۰٪ TAC) است که سیاهی مخملی با سرعت خشک‌شدن فوق‌العاده ایجاد می‌کند.',
          ],
        },
      },
      {
        heading: {
          en: '2. Spot Pantone Inks vs Process Color Emulation',
          fa: '۲. استفاده از رنگ‌های ساختگی پنتون در برابر شبیه‌سازی ۴ رنگ',
        },
        paragraphs: {
          en: [
            'Corporate brand identifiers and pharmaceutical warning tints should never be left to CMYK halftone dot screening. Vibrations in printing cylinder pressure cause visible shifts between press runs.',
            'By specifying an 5th or 6th dedicated spot Pantone ink unit, color integrity remains rock-solid whether printed in Germany, Turkey, or Iran.',
          ],
          fa: [
            'رنگ سازمانی برندهای معتبر و نوارهای هشدار دارویی هرگز نباید به ترام‌های ریز چهاررنگ CMYK سپرده شوند، چرا که نوسان فشار سیلندرهای چاپخانه باعث تغییر شید رنگی در دورهای مختلف چاپ می‌شود.',
            'با تعریف برج رنگ پنجم یا ششم پنتون ساختگی (Spot Color)، یکپارچگی رنگی برند در تیراژهای سنگین با دقت میکرونی حفظ می‌شود.',
          ],
        },
      },
    ],
  },
];
