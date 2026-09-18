import { SupportedLanguage } from './languages';

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  ar: {
    // Brand & Header
    'brand.name': 'المدينة العربية',
    'brand.en_name': 'Madinah Arabic',
    'brand.tagline': 'تعلّم العربية والقرآن الكريم أونلاين مع نخبة المعلمين',
    'nav.home': 'الرئيسية',
    'nav.free_content': 'المحتوى المجاني',
    'nav.reading': 'دورة القراءة',
    'nav.grammar': 'دورة النحو',
    'nav.one_to_one': 'دروس فردية 1:1',
    'nav.level_test': 'تحديد المستوى',
    'nav.pricing': 'الأسعار',
    'nav.curriculum': 'المنهج والكتب',
    'nav.admin': 'لوحة التحكم',
    'nav.login': 'دخول المشرف',
    'nav.streak': '{count} أيام تتابع',
    'nav.xp': '{count} XP',

    // Marketing Banner
    'banner.free_trial': 'عرض خاص: احصل على درس تجريبي مجاني 1:1 مع معلم معتمد أو ابدأ المحتوى المجاني فوراً!',
    'banner.start_now': 'احجز درسك التجريبي المجاني الآن ←',

    // Home Page - Madinah Arabic Structure
    'home.hero_badge': 'المنصة العالمية الرائدة: تعلّم العربية والقرآن عبر الإنترنت',
    'home.hero_title': 'أتقن اللغة العربية والقرآن الكريم',
    'home.hero_subtitle': 'انضم إلى آلاف الطلاب حول العالم لتعلم العربية والقرآن مع نخبة من المعلمين المعتمدين. من المبتدئين حتى المستويات المتقدمة، مع مسارات مخصصة تناسب كافة الأعمار.',
    'home.cta_trial': 'احصل على درس تجريبي مجاني 1:1',
    'home.cta_self_study': 'أفضل التعلّم الذاتي (محتوى مجاني)',

    // Two Main Paths
    'home.paths_title': 'خيارات تعليمية مرنة تناسب جدولك وأهدافك وأسلوبك في التعلم',
    'home.path_free_title': 'المحتوى المجاني والدورات الذاتية',
    'home.path_free_subtitle': 'دورات أونلاين مجانية مفتوحة للجميع',
    'home.path_free_desc': 'الوصول إلى مكتبة شاملة من المواد التعليمية المفتوحة: دورة قراءة الحروف، قواعد النحو، وتمارين الحوار اليومي.',
    'home.path_free_f1': 'بدون الحاجة لتسجيل أو بطاقة ائتمان',
    'home.path_free_f2': 'دورة قراءة وتأسيس الأبجدية التفاعلية',
    'home.path_free_f3': 'قواعد النحو وتراكيب اللغة الأساسية',
    'home.path_free_f4': 'متابعة تفاعلية للتقدم ونقاط الخبرة',
    'home.path_free_btn': 'ابدأ التعلّم الذاتي مجاناً',

    'home.path_1to1_title': 'دروس فردية مخصصة (One-to-One)',
    'home.path_1to1_subtitle': 'جلسات خاصة ومباشرة مع معلمين معتمدين',
    'home.path_1to1_desc': 'اهتمام شخصي وتدريس مباشر وفق احتياجاتك وأهدافك وسرعتك الخاصة مع معلمين ومعلمات معتمدين من الأزهر والجامعة الإسلامية.',
    'home.path_1to1_f1': 'منهج مخصص بالكامل يناسب مستواك',
    'home.path_1to1_f2': 'مرونة كاملة في المواعيد والجدولة',
    'home.path_1to1_f3': 'اهتمام فردي كامل ونطق صحيح مخارج الحروف',
    'home.path_1to1_f4': 'جلسات مدتها 30، 60، أو 90 دقيقة',
    'home.path_1to1_btn': 'استكشف المعلمين واحجز درسك',

    // Interactive Alphabet Section
    'home.alphabet_title': 'لوحة الحروف الأبجدية التفاعلية (Alphabet Chart)',
    'home.alphabet_desc': 'الميزة التفاعلية الشهيرة: اضغط على أي حرف للاستماع لنطقه الصحيح، والتعرف على أشكاله في الكلمة مع أمثلة صوتية:',
    'home.alphabet_hint': 'انقر على أي حرف لسماع مخرجه الصوتي فوراً:',

    // Live Simulator & Curriculum
    'home.simulator_title': 'جرّب التمارين الصوتية التفاعلية الآن',
    'home.simulator_desc': 'تمرين حي من الوحدة الأولى لكتاب العربية بين يديك:',

    // Teacher Roster Section
    'home.teachers_title': 'نخبة المعلمين والمعلمات المعتمدين',
    'home.teachers_desc': 'معلمون من ذوي الخبرة العالية يحملون إجازات في القرآن الكريم وشهادات في تدريس العربية لغير الناطقين بها.',
    'home.teachers_view_all': 'عرض كافة المعلمين والجدول',

    // Testimonials
    'home.testimonials_title': 'قصص نجاح وآراء طلابنا من مختلف دول العالم',
    'home.testimonials_desc': 'انضم إلى آلاف الطلاب الذين غيروا مسار تعلمهم للغة العربية والقرآن الكريم معنا.',

    // Level Test Banner
    'home.level_test_banner_title': 'لست متأكداً من أين تبدأ؟',
    'home.level_test_banner_desc': 'قم بإجراء اختبار تحديد المستوى السريع (5 دقائق فقط) وسنقوم باقتراح المسار الأمثل لك مجاناً.',
    'home.level_test_banner_btn': 'ابدأ اختبار تحديد المستوى الآن',

    // Free Content & Learn Page
    'learn.badge': 'سلسلة دورات المدينة العربية • مجانية 100%',
    'learn.title': 'خطة دراسة كتاب (العربية بين يديك)',
    'learn.subtitle': 'اختر أي درس من الدروس التجريبية المجانية أدناه وابدأ التعلم الصوتي والتفاعلي فوراً!',
    'learn.loading': 'جاري تحميل المنهج والوحدات...',
    'learn.free_badge': 'دروس مفتوحة للجميع',
    'learn.free_status': 'متاح مجاناً 100%',
    'learn.pro_status': 'باقة Pro',
    'learn.trial_label': 'تجربة مجانية',
    'learn.start_lesson': 'ابدأ',
    'learn.xp_reward': '+{count} XP • استماع وحوار تفاعلي',

    // Session / Lesson Runner
    'session.back': '← العودة لقائمة الدروس',
    'session.exercise_count': 'تمرين {current} من {total}',
    'session.badge': 'المدينة العربية • تمرين تفاعلي',
    'session.speed': 'السرعة:',
    'session.speed_slow': '0.75x (بطيء)',
    'session.speed_normal': '1.0x (عادي)',
    'session.play_audio': 'اضغط Space أو انقر على الزر لسماع الصوت',
    'session.playing': 'جاري تشغيل الصوت...',
    'session.check_answer': 'تحقق من الإجابة',
    'session.next': 'التالي',
    'session.correct_title': 'أحسنت! إجابة صحيحة (ممتاز 🎉)',
    'session.incorrect_title': 'حاول مرة أخرى ⚠️',
    'session.completed_title': 'مبارك! أكملت الدرس بنجاح 🎉',
    'session.completed_desc': 'حققت تقدماً ممتازاً وأتقنت حوار هذا الدرس وفق المنهج المعتمد.',
    'session.repeat_lesson': 'إعادة الدرس',
    'session.back_to_curriculum': 'الانتقال للدرس التالي',
    'session.hint': 'تلميح / الترجمة:',

    // Level Test Page
    'level_test.title': 'اختبار تحديد المستوى (Arabic Placement Test)',
    'level_test.subtitle': 'أجب عن 5 أسئلة متدرجة لتقييم مستواك الحالي واقتراح المسار التعليمي الأنسب لك مجاناً.',
    'level_test.question_of': 'السؤال {current} من {total}',
    'level_test.submit': 'تسجيل الإجابة والتالي',
    'level_test.finish': 'عرض النتيجة والتوصية',
    'level_test.result_title': 'نتيجة اختبار تحديد المستوى',
    'level_test.score': 'درجتك: {score} من {total}',

    // One to One Page
    'one_to_one.title': 'دروس فردية مباشرة مع معلمين معتمدين (1:1 Lessons)',
    'one_to_one.subtitle': 'اختر معلمك المفضل، وحدد الوقت المناسب لك، وابدأ رحلة تعليمية مخصصة تلبي أهدافك بدقة.',
    'one_to_one.filter_all': 'الكل',
    'one_to_one.filter_male': 'معلمون رجال',
    'one_to_one.filter_female': 'معلمات',
    'one_to_one.filter_arabic': 'لغة عربية',
    'one_to_one.filter_quran': 'قرآن وتجويد',
    'one_to_one.book_trial': 'حجز درس تجريبي مجاني',
    'one_to_one.rate_from': 'السعر: ${rate}/ساعة',
    'one_to_one.modal_title': 'حجز جلسة تجريبية مجانية (30 دقيقة)',
    'one_to_one.modal_desc': 'حدد موعدك المناسب وسيقوم المعلم بالتواصل معك لتأكيد الرابط التعليمي.',
    'one_to_one.modal_name': 'الاسم الكامل',
    'one_to_one.modal_email': 'البريد الإلكتروني',
    'one_to_one.modal_date': 'تاريخ الجلسة المفضل',
    'one_to_one.modal_subject': 'المجال المراد تعلمه',
    'one_to_one.modal_submit': 'تأكيد حجز الدرس المجاني',
    'one_to_one.modal_success': 'تم تأكيد حجزك بنجاح! تفقد بريدك الإلكتروني للحصول على التفاصيل.',

    // Pricing Page
    'pricing.title': 'باقات وأسعار واضحة وبسيطة',
    'pricing.subtitle': 'اختر الخطة المناسبة لأهدافك وميزانيتك: من المحتوى المجاني بالكامل إلى الدروس الفردية المباشرة.',
    'pricing.free_tier': 'المحتوى المجاني (Self-Study)',
    'pricing.free_price': '$0',
    'pricing.free_desc': 'الوصول لدورات القراءة الأبجدية، الأساسيات، ومكتبة التمارين الصوتية مجاناً مدى الحياة.',
    'pricing.1to1_tier': 'الدروس الفردية (1:1 Lessons)',
    'pricing.1to1_price': 'تبدأ من $15',
    'pricing.1to1_desc': 'لكل ساعة • تدريس مباشر مع معلم معتمد وفق جدولك الخاص وبدون التزامات شهرية.',
    'pricing.pro_tier': 'باقة الطالب المتقن (Pro)',
    'pricing.pro_monthly': '$9',
    'pricing.pro_yearly': '$59',
    'pricing.pro_desc': 'وصول كامل لكافة مناهج الكتب التفاعلية، بنك مفردات القرآن، ونظام التكرار المتباعد.',
    'pricing.start_free': 'ابدأ مجاناً الآن',
    'pricing.upgrade_pro': 'اشتراك Pro السنوي',

    // Footer
    'footer.rights': '© 2026 المدينة العربية (Madinah Arabic). جميع الحقوق محفوظة.',
    'footer.stack': 'Madinah Arabic Global Platform • Supabase • Tri-lingual (AR/EN/RU)',
  },

  en: {
    // Brand & Header
    'brand.name': 'Madinah Arabic',
    'brand.en_name': 'Madinah Arabic',
    'brand.tagline': 'Learn Arabic & Qur\'an Online with Expert Teachers',
    'nav.home': 'Home',
    'nav.free_content': 'Free Content',
    'nav.reading': 'Reading Course',
    'nav.grammar': 'Grammar Course',
    'nav.one_to_one': 'One-to-One Lessons',
    'nav.level_test': 'Test Your Level',
    'nav.pricing': 'Pricing',
    'nav.curriculum': 'Curriculum',
    'nav.admin': 'Admin Dashboard',
    'nav.login': 'Admin Login',
    'nav.streak': '{count} Day Streak',
    'nav.xp': '{count} XP',

    // Marketing Banner
    'banner.free_trial': 'Special Offer: Get your Free 1:1 Trial Lesson with certified teachers, or start free content today!',
    'banner.start_now': 'Get Your Free 1:1 Trial Lesson →',

    // Home Page - Madinah Arabic Structure
    'home.hero_badge': 'Leading Global Platform: Learn Arabic & Qur\'an Online',
    'home.hero_title': 'Master Arabic & Qur\'an',
    'home.hero_subtitle': 'Join thousands of students learning Arabic and Qur\'an with our certified native teachers. From absolute beginners to advanced, with personalized learning paths for all ages.',
    'home.cta_trial': 'Get Your Free 1:1 Trial Lesson',
    'home.cta_self_study': 'I Prefer Self-Study (Free Content)',

    // Two Main Paths
    'home.paths_title': 'Flexible learning options designed to fit your schedule, goals, and learning style',
    'home.path_free_title': 'Free Content & Online Courses',
    'home.path_free_subtitle': 'Comprehensive library open to all',
    'home.path_free_desc': 'Access our comprehensive library of free Arabic learning materials, including interactive reading, grammar fundamentals, and introductory dialogues.',
    'home.path_free_f1': 'No Signup Required to Start',
    'home.path_free_f2': 'Arabic Reading Basics & Interactive Chart',
    'home.path_free_f3': 'Grammar Fundamentals & Dialogues',
    'home.path_free_f4': 'Optional Progress Tracking & XP',
    'home.path_free_btn': 'Start Learning Free',

    'home.path_1to1_title': 'One-to-One Personalized Lessons',
    'home.path_1to1_subtitle': 'Private lessons with certified native teachers',
    'home.path_1to1_desc': 'Get personalized attention with certified native teachers from Al-Azhar and the Islamic University of Madinah. Choose 30, 60, or 90-minute sessions tailored to your goals.',
    'home.path_1to1_f1': 'Personalized Curriculum Tailored to You',
    'home.path_1to1_f2': 'Flexible Scheduling Around Your Routine',
    'home.path_1to1_f3': '1-on-1 Individual Attention & Tajweed Care',
    'home.path_1to1_f4': '30, 60, or 90-Minute Sessions Available',
    'home.path_1to1_btn': 'Start One-to-One Lessons',

    // Interactive Alphabet Section
    'home.alphabet_title': 'Arabic Alphabet [Interactive Sound Chart]',
    'home.alphabet_desc': 'Madinah Arabic signature tool: Click on any Arabic letter below to listen to its pronunciation, discover its 4 positions (isolated, initial, medial, final), and view phonetic details:',
    'home.alphabet_hint': 'Click on any letter to hear its crystal-clear sound:',

    // Live Simulator & Curriculum
    'home.simulator_title': 'Try Our Interactive Audio Dialogue Player',
    'home.simulator_desc': 'Live interactive sample from Unit 1 of our Arabic curriculum:',

    // Teacher Roster Section
    'home.teachers_title': 'Meet Our Certified Native Instructors',
    'home.teachers_desc': 'Expert native Arabic and Quran teachers holding prestigious Ijazahs and degrees in teaching Arabic to non-native speakers.',
    'home.teachers_view_all': 'Browse All Teachers & Schedule',

    // Testimonials
    'home.testimonials_title': 'Join Thousands of Satisfied Students Worldwide',
    'home.testimonials_desc': 'Real reviews from students across the UK, USA, Canada, Australia, Brazil, and Central Asia.',

    // Level Test Banner
    'home.level_test_banner_title': 'Not sure where to begin your journey?',
    'home.level_test_banner_desc': 'Take our quick 5-minute placement assessment to discover your current level and get recommended courses instantly.',
    'home.level_test_banner_btn': 'Test Your Level Now',

    // Free Content & Learn Page
    'learn.badge': 'Madinah Arabic Course Series • 100% Free Access',
    'learn.title': 'Arabic Reading & Dialogue Curriculum Roadmap',
    'learn.subtitle': 'Choose any lesson below and experience interactive audio learning instantly!',
    'learn.loading': 'Loading curriculum and modules...',
    'learn.free_badge': 'Free Lessons Open for All',
    'learn.free_status': '100% Free',
    'learn.pro_status': 'Pro Plan',
    'learn.trial_label': 'Free Trial',
    'learn.start_lesson': 'Start',
    'learn.xp_reward': '+{count} XP • Audio & Practice',

    // Session / Lesson Runner
    'session.back': '← Back to Lessons',
    'session.exercise_count': 'Exercise {current} of {total}',
    'session.badge': 'Madinah Arabic • Interactive Practice',
    'session.speed': 'Speed:',
    'session.speed_slow': '0.75x (Slow)',
    'session.speed_normal': '1.0x (Normal)',
    'session.play_audio': 'Press Space or click the button to play audio',
    'session.playing': 'Playing audio...',
    'session.check_answer': 'Check Answer',
    'session.next': 'Next',
    'session.correct_title': 'Excellent! Correct Answer (Mumtaz 🎉)',
    'session.incorrect_title': 'Try Again ⚠️',
    'session.completed_title': 'Congratulations! Lesson Completed 🎉',
    'session.completed_desc': 'You have made great progress mastering this lesson.',
    'session.repeat_lesson': 'Restart Lesson',
    'session.back_to_curriculum': 'Next Lesson',
    'session.hint': 'Hint / Translation:',

    // Level Test Page
    'level_test.title': 'Arabic Proficiency Level Assessment Test',
    'level_test.subtitle': 'Answer 5 quick progressive questions to evaluate your Arabic reading and comprehension level.',
    'level_test.question_of': 'Question {current} of {total}',
    'level_test.submit': 'Submit & Next',
    'level_test.finish': 'View Level Result',
    'level_test.result_title': 'Your Level Assessment Result',
    'level_test.score': 'Score: {score} of {total}',

    // One to One Page
    'one_to_one.title': 'One-to-One Online Arabic & Qur\'an Tuition',
    'one_to_one.subtitle': 'Select your preferred certified native tutor, book classes at your convenience, and enjoy customized 1-on-1 learning.',
    'one_to_one.filter_all': 'All Teachers',
    'one_to_one.filter_male': 'Male Tutors',
    'one_to_one.filter_female': 'Female Tutors',
    'one_to_one.filter_arabic': 'Arabic Language',
    'one_to_one.filter_quran': 'Qur\'an & Tajweed',
    'one_to_one.book_trial': 'Book Free Trial Lesson',
    'one_to_one.rate_from': 'Rate: ${rate}/hour',
    'one_to_one.modal_title': 'Book Your Free 30-Minute Trial Session',
    'one_to_one.modal_desc': 'Select your preferred date and time, and your teacher will send you the live meeting link.',
    'one_to_one.modal_name': 'Full Name',
    'one_to_one.modal_email': 'Email Address',
    'one_to_one.modal_date': 'Preferred Session Date',
    'one_to_one.modal_subject': 'Learning Focus',
    'one_to_one.modal_submit': 'Confirm Free Trial Booking',
    'one_to_one.modal_success': 'Booking confirmed! Check your email for session details.',

    // Pricing Page
    'pricing.title': 'Simple, Transparent Pricing',
    'pricing.subtitle': 'Choose the perfect learning plan that fits your schedule, goals, and budget. From free content to 1:1 lessons.',
    'pricing.free_tier': 'Free Content (Self-Study)',
    'pricing.free_price': '$0',
    'pricing.free_desc': 'Full access to Arabic Reading course, alphabet charts, and free dialogue drills forever.',
    'pricing.1to1_tier': 'One-to-One Tutoring',
    'pricing.1to1_price': 'From $15',
    'pricing.1to1_desc': 'per hour • Pay per lesson with your chosen teacher. No monthly commitments.',
    'pricing.pro_tier': 'Pro Scholar Plan',
    'pricing.pro_monthly': '$9',
    'pricing.pro_yearly': '$59',
    'pricing.pro_desc': 'Unlimited access to all textbooks, Quranic vocabulary databases, and spaced repetition.',
    'pricing.start_free': 'Start Free',
    'pricing.upgrade_pro': 'Upgrade to Pro',

    // Footer
    'footer.rights': '© 2026 Madinah Arabic. All rights reserved.',
    'footer.stack': 'Madinah Arabic Global Platform • Supabase • Tri-lingual (AR/EN/RU)',
  },

  ru: {
    // Brand & Header
    'brand.name': 'Мадина Арабик',
    'brand.en_name': 'Madinah Arabic',
    'brand.tagline': 'Изучение арабского языка и Корана онлайн с экспертами',
    'nav.home': 'Главная',
    'nav.free_content': 'Бесплатные курсы',
    'nav.reading': 'Курс чтения',
    'nav.grammar': 'Курс грамматики',
    'nav.one_to_one': 'Уроки 1:1 с учителем',
    'nav.level_test': 'Тест уровня',
    'nav.pricing': 'Цены',
    'nav.curriculum': 'Программа',
    'nav.admin': 'Панель админа',
    'nav.login': 'Вход админа',
    'nav.streak': '{count} дн. подряд',
    'nav.xp': '{count} XP',

    // Marketing Banner
    'banner.free_trial': 'Спецпредложение: Запишитесь на бесплатный пробный урок 1:1 или начните бесплатный курс прямо сейчас!',
    'banner.start_now': 'Бесплатный пробный урок 1:1 →',

    // Home Page - Madinah Arabic Structure
    'home.hero_badge': 'Ведущая международная платформа: Арабский и Коран онлайн',
    'home.hero_title': 'Освойте арабский язык и Коран',
    'home.hero_subtitle': 'Присоединяйтесь к тысячам студентов по всему миру, изучающих арабский язык и Коран с сертифицированными преподавателями-носителями. От начального уровня до продвинутого.',
    'home.cta_trial': 'Бесплатный пробный урок 1:1',
    'home.cta_self_study': 'Самостоятельное обучение (Бесплатно)',

    // Two Main Paths
    'home.paths_title': 'Гибкие форматы обучения под ваш график, цели и темп',
    'home.path_free_title': 'Бесплатные онлайн-курсы',
    'home.path_free_subtitle': 'Обширная база материалов в открытом доступе',
    'home.path_free_desc': 'Доступ к интерактивным урокам чтения букв, основам арабской грамматики, правилам и живым диалогам.',
    'home.path_free_f1': 'Регистрация не требуется для старта',
    'home.path_free_f2': 'Интерактивная таблица арабского алфавита',
    'home.path_free_f3': 'Основы грамматики и практические диалоги',
    'home.path_free_f4': 'Отслеживание прогресса и баллы XP',
    'home.path_free_btn': 'Начать учиться бесплатно',

    'home.path_1to1_title': 'Индивидуальные уроки 1:1',
    'home.path_1to1_subtitle': 'Персональные занятия с опытными учителями',
    'home.path_1to1_desc': 'Индивидуальное внимание преподавателей из Аль-Азхара и Исламского университета Медины. Уроки по 30, 60 или 90 минут под ваши задачи.',
    'home.path_1to1_f1': 'Индивидуальная программа обучения',
    'home.path_1to1_f2': 'Гибкое расписание в удобное время',
    'home.path_1to1_f3': 'Личный контроль правильности махраджа и таджвида',
    'home.path_1to1_f4': 'Занятия по 30, 60 или 90 минут',
    'home.path_1to1_btn': 'Выбрать учителя и записаться',

    // Interactive Alphabet Section
    'home.alphabet_title': 'Интерактивная таблица арабского алфавита',
    'home.alphabet_desc': 'Фирменный инструмент Madinah Arabic: Нажмите на любую букву, чтобы услышать ее правильное звучание, изучить 4 формы написания и транскрипцию:',
    'home.alphabet_hint': 'Нажмите на букву для воспроизведения звука:',

    // Live Simulator & Curriculum
    'home.simulator_title': 'Попробуйте звуковое диалоговое упражнение',
    'home.simulator_desc': 'Интерактивный пример из 1-го урока курса арабского языка:',

    // Teacher Roster Section
    'home.teachers_title': 'Наши сертифицированные преподаватели',
    'home.teachers_desc': 'Опытные носители языка с высшим образованием и иджазами по таджвиду и методике преподавания.',
    'home.teachers_view_all': 'Все преподаватели и расписание',

    // Testimonials
    'home.testimonials_title': 'Отзывы тысяч благодарных студентов по всему миру',
    'home.testimonials_desc': 'Реальные истории успеха студентов из стран СНГ, США, Великобритании, Австралии и других стран.',

    // Level Test Banner
    'home.level_test_banner_title': 'Не знаете, с чего начать?',
    'home.level_test_banner_desc': 'Пройдите быстрый 5-минутный тест на определение уровня и получите персональную рекомендацию курса.',
    'home.level_test_banner_btn': 'Пройти тест уровня',

    // Free Content & Learn Page
    'learn.badge': 'Курсы Madinah Arabic • 100% Бесплатно',
    'learn.title': 'Программа изучения арабского языка и диалогов',
    'learn.subtitle': 'Выберите урок и начните интерактивную практику прямо сейчас!',
    'learn.loading': 'Загрузка курсов и разделов...',
    'learn.free_badge': 'Открытые уроки для всех',
    'learn.free_status': '100% Бесплатно',
    'learn.pro_status': 'Тариф Pro',
    'learn.trial_label': 'Бесплатный урок',
    'learn.start_lesson': 'Начать',
    'learn.xp_reward': '+{count} XP • Звук и практика',

    // Session / Lesson Runner
    'session.back': '← Назад к урокам',
    'session.exercise_count': 'Упражнение {current} из {total}',
    'session.badge': 'Madinah Arabic • Интерактивный урок',
    'session.speed': 'Скорость:',
    'session.speed_slow': '0.75x (Медленно)',
    'session.speed_normal': '1.0x (Обычно)',
    'session.play_audio': 'Нажмите Пробел или кнопку для звука',
    'session.playing': 'Воспроизведение...',
    'session.check_answer': 'Проверить ответ',
    'session.next': 'Далее',
    'session.correct_title': 'Отлично! Верный ответ (Мумтаз 🎉)',
    'session.incorrect_title': 'Попробуйте еще раз ⚠️',
    'session.completed_title': 'Поздравляем! Урок успешно завершен 🎉',
    'session.completed_desc': 'Вы отлично усвоили материал этого урока.',
    'session.repeat_lesson': 'Пройти заново',
    'session.back_to_curriculum': 'Следующий урок',
    'session.hint': 'Подсказка / Перевод:',

    // Level Test Page
    'level_test.title': 'Тест на определение уровня арабского языка',
    'level_test.subtitle': 'Ответьте на 5 вопросов для оценки чтения, словарного запаса и грамматики.',
    'level_test.question_of': 'Вопрос {current} из {total}',
    'level_test.submit': 'Ответить и далее',
    'level_test.finish': 'Показать результат',
    'level_test.result_title': 'Результат теста уровня',
    'level_test.score': 'Ваш балл: {score} из {total}',

    // One to One Page
    'one_to_one.title': 'Индивидуальные уроки 1:1 с носителями языка',
    'one_to_one.subtitle': 'Выберите преподавателя, согласуйте удобное время и занимайтесь по индивидуальной программе.',
    'one_to_one.filter_all': 'Все учителя',
    'one_to_one.filter_male': 'Преподаватели (мужчины)',
    'one_to_one.filter_female': 'Преподавательницы (женщины)',
    'one_to_one.filter_arabic': 'Арабский язык',
    'one_to_one.filter_quran': 'Коран и таджвид',
    'one_to_one.book_trial': 'Бесплатный пробный урок',
    'one_to_one.rate_from': 'От ${rate}/час',
    'one_to_one.modal_title': 'Запись на бесплатный пробный урок (30 мин)',
    'one_to_one.modal_desc': 'Укажите удобную дату, и преподаватель свяжется с вами для отправки ссылки на урок.',
    'one_to_one.modal_name': 'Ваше имя',
    'one_to_one.modal_email': 'Электронная почта',
    'one_to_one.modal_date': 'Желаемая дата урока',
    'one_to_one.modal_subject': 'Направление обучения',
    'one_to_one.modal_submit': 'Подтвердить запись на урок',
    'one_to_one.modal_success': 'Запись подтверждена! Проверьте почту для получения инструкций.',

    // Pricing Page
    'pricing.title': 'Простые и прозрачные цены',
    'pricing.subtitle': 'Выберите подходящий план: от бесплатного самостоятельного обучения до индивидуальных уроков с преподавателем.',
    'pricing.free_tier': 'Бесплатные курсы (Self-Study)',
    'pricing.free_price': '$0',
    'pricing.free_desc': 'Полный доступ к курсу чтения букв, таблице алфавита и диалогам навсегда бесплатно.',
    'pricing.1to1_tier': 'Уроки 1:1 с учителем',
    'pricing.1to1_price': 'От $15',
    'pricing.1to1_desc': 'за час • Оплата за урок. Никаких обязательных ежемесячных подписок.',
    'pricing.pro_tier': 'Тариф Усердный студент (Pro)',
    'pricing.pro_monthly': '$9',
    'pricing.pro_yearly': '$59',
    'pricing.pro_desc': 'Неограниченный доступ ко всем учебникам, коранической базе слов и интервальным повторениям.',
    'pricing.start_free': 'Начать бесплатно',
    'pricing.upgrade_pro': 'Оформить Pro подписку',

    // Footer
    'footer.rights': '© 2026 Madinah Arabic. Все права защищены.',
    'footer.stack': 'Madinah Arabic Global Platform • Supabase • 3 языка (AR/EN/RU)',
  },
};
