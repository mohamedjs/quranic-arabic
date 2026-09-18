import { SupportedLanguage } from './languages';

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  ar: {
    // Brand & Header
    'brand.name': 'التحفة الأزهرية',
    'brand.en_name': 'Al-Tuhfa',
    'brand.tagline': 'المنهج الأزهري الأصيل لتعليم العربية مجاناً 100%',
    'nav.home': 'الرئيسية',
    'nav.curriculum': 'منهج التحفة',
    'nav.reading': 'لوحة الحروف الأبجدية',
    'nav.level_test': 'تحديد المستوى',
    'nav.pricing': 'المبادرة المجانية',
    'nav.admin': 'لوحة التحكم',
    'nav.login': 'دخول المشرف',
    'nav.streak': '{count} أيام تتابع',
    'nav.xp': '{count} XP',

    // Marketing Banner
    'banner.free_trial': 'سلسلة التحفة الأزهرية لتعليم اللغة العربية للناطقين بغيرها (الكتاب الأول من 6) مفتوح مجاناً 100% للجميع!',
    'banner.start_now': 'ابدأ دراسة الكتاب الأول فوراً ←',

    // Home Page - Hero & Mission
    'home.hero_badge': 'سلسلة التحفة الأزهرية • المستوى المبتدئ الأول • متاح مجاناً',
    'home.hero_title': 'أتقن لغة القرآن والبيان مع منهج «التحفة الأزهرية» المعتمد',
    'home.hero_subtitle': 'المنهج التعليمي الأزهري المعتمد لتعليم اللغة العربية للناطقين بغيرها. يبدأ بالتهيئة الصوتية والهجائية المصورة و15 موقفاً حياتياً تفاعلياً للمحادثة وقواعد التراكيب من الصفر حتى الإتقان.',
    'home.cta_curriculum': 'استكشف وحدات الكتاب الأول وابدأ مجاناً',
    'home.cta_level_test': 'إجراء اختبار تحديد المستوى (5 دقائق)',

    // 6-Level Azhari Roadmap Cards
    'home.stages_title': 'خريطة المستويات الستة لسلسلة التحفة الأزهرية',
    'home.stages_subtitle': 'منهج أكاديمي متدرج عبر 6 كتب تربوية ينقلك من الحروف ومخارج الأصوات حتى الفصاحة والطلاقة الكاملة:',
    
    'home.stage1_title': 'الكتاب 1: المستوى المبتدئ الأول (متاح الآن)',
    'home.stage1_desc': 'التهيئة الصوتية وعائلة الحروف و15 درساً للمواقف الحياتية (التعارف بالأزهر، الأسرة، السكن، المعهد، السوق...).',
    'home.stage2_title': 'الكتاب 2: المستوى المبتدئ الثاني',
    'home.stage2_desc': 'توسيع الحصيلة اللغوية، التراكيب الإضافية، الحوارات الموسعة، وقواعد النحو التأسيسية.',
    'home.stage3_title': 'الكتاب 3: المستوى المتوسط الأول',
    'home.stage3_desc': 'النصوص القرائية المتصلة، القواعد الصرفية، والتعبير الشفهي والكتابي السليم.',
    'home.stage4_title': 'الكتاب 4: المستوى المتوسط الثاني',
    'home.stage4_desc': 'الأساليب البلاغية، فهم النصوص التراثية والثقافية، وإعراب التراكيب المعقدة.',
    'home.stage5_title': 'الكتاب 5: المستوى المتقدم الأول',
    'home.stage5_desc': 'دراسة أصول الفصاحة، التحليل الأدبي، والتراكيب القرآنية الرفيعة.',
    'home.stage6_title': 'الكتاب 6: المستوى المتقدم الثاني',
    'home.stage6_desc': 'الإتقان والتمكن التام، البلاغة والإعجاز البياني، والمناظرة والتعبير الأكاديمي.',

    // Interactive Alphabet Section
    'home.alphabet_title': 'لوحة الحروف الأبجدية التفاعلية (Alphabet Sound Chart)',
    'home.alphabet_desc': 'انقر على أي حرف للاستماع لنطقه الصحيح ومخرجه الصوتي فورياً وفق منهج التهيئة الصوتية:',
    'home.alphabet_hint': 'اضغط على الحرف لسماع صوته الصحيح:',

    // Live Simulator & Curriculum
    'home.simulator_title': 'محاكي تمارين وحوارات التحفة الأزهرية',
    'home.simulator_desc': 'تدرّب على الاستماع والمحادثة الحية مع حوارات الكتاب الأول من السلسلة:',

    // Testimonials
    'home.testimonials_title': 'قصص وتجارب دارسي التحفة الأزهرية حول العالم',
    'home.testimonials_desc': 'آلاف الطلاب من أكثر من 50 دولة حول العالم يدرسون العربية ولغة القرآن مجاناً.',

    // Level Test Banner
    'home.level_test_banner_title': 'لست متأكداً من أين تبدأ؟',
    'home.level_test_banner_desc': 'قم بإجراء اختبار تحديد المستوى السريع (5 دقائق فقط) وسيقوم النظام بتوجيهك تلقائياً للمرحلة المناسبة.',
    'home.level_test_banner_btn': 'ابدأ اختبار تحديد المستوى مجاناً',

    // Learn Page
    'learn.badge': 'سلسلة التحفة الأزهرية — الكتاب الأول: المستوى المبتدئ الأول',
    'learn.title': 'منهج التحفة الأزهرية (الكتاب 1 من أصل 6 كتب)',
    'learn.subtitle': 'استكشف التمهيد الهجائي ووحدات المواقف الحياتية الـ 15 المعتمدة من الأزهر الشريف — مفتوحة مجاناً بالكامل.',
    'learn.loading': 'جارٍ تحميل الوحدات والدروس من قاعدة البيانات...',
    'learn.free_badge': '100% مجاني ومتاح للجميع',
    'learn.trial_label': 'وصول كامل ومفتوح لكافة الدروس',
    'learn.free_status': 'مفتوح مجاناً',
    'learn.start_lesson': 'بدء الدرس',
    'learn.xp_reward': '{count} XP',

    // Interactive Session Player
    'session.badge': 'جلسة تفاعلية مباشرة • منهج التحفة الأزهرية',
    'session.back': 'العودة للمنهج',
    'session.back_to_curriculum': 'العودة لقائمة الوحدات',
    'session.play_audio': 'استمع للمقطع الصوتي',
    'session.playing': 'جارٍ تشغيل الصوت...',
    'session.speed': 'السرعة',
    'session.speed_normal': 'طبيعي 1.0x',
    'session.speed_slow': 'بطيء 0.75x',
    'session.hint': 'اختر الإجابة الصحيحة المطابقة لما سمعته:',
    'session.check_answer': 'تحقق من الإجابة',
    'session.next': 'السؤال التالي',
    'session.correct_title': 'أحسنت! إجابة ممتازة وصحيحة 🎉',
    'session.incorrect_title': 'إجابة غير صحيحة، حاول مجدداً',
    'session.completed_title': 'تهانينا! أكملت تمرين الدرس بنجاح 🏆',
    'session.completed_desc': 'لقد أتقنت المفردات والحوارات المستهدفة وحصلت على نقاط الخبرة.',
    'session.repeat_lesson': 'إعادة التمرين',
    'session.exercise_count': 'تمرين {current} من {total}',

    // Level Test
    'level_test.title': 'اختبار تحديد المستوى في اللغة العربية',
    'level_test.subtitle': 'أجب عن الأسئلة التالية لتحديد مستواك بدقة بين المستويات الستة لسلسلة التحفة الأزهرية:',
    'level_test.question_of': 'السؤال {current} من {total}',
    'level_test.submit': 'تأكيد الإجابة',
    'level_test.finish': 'عرض نتيجة الاختبار',
    'level_test.result_title': 'المستوى الموصى به لك:',
    'level_test.score': 'نتيجتك: {score} من {total}',

    // Pricing / Free Initiative
    'pricing.title': 'تعليم العربية ولغة القرآن حق لكل إنسان — مجاناً 100%',
    'pricing.subtitle': 'لا توجد أي رسوم أو اشتراكات مدفوعة. سلسلة التحفة الأزهرية مفتوحة بالكامل بدون أي مقابل مالي.',
    'pricing.free_tier': 'الوصول المفتوح الكامل',
    'pricing.free_price': '0$ مجاناً للأبد',
    'pricing.free_desc': 'وصول غير محدود لجميع المستويات الستة، والوحدات الـ 15، والتمارين التفاعلية والصوتية.',
    'pricing.start_free': 'ابدأ التعلم الآن مجاناً',

    // Footer
    'footer.rights': 'جميع الحقوق محفوظة © منصة التحفة الأزهرية لتعليم اللغة العربية.',
    'footer.stack': 'منهج التحفة الأزهرية لتعليم اللغة العربية للناطقين بغيرها (الكتاب الأول من 6)',
  },

  en: {
    // Brand & Header
    'brand.name': 'Al-Tuhfa Al-Azhariyya',
    'brand.en_name': 'The Azhari Gem',
    'brand.tagline': 'Authentic Azhar Curriculum for Arabic & Quran Mastery - 100% Free',
    'nav.home': 'Home',
    'nav.curriculum': 'Curriculum',
    'nav.reading': 'Alphabet Chart',
    'nav.level_test': 'Placement Test',
    'nav.pricing': '100% Free Initiative',
    'nav.admin': 'Admin Portal',
    'nav.login': 'Instructor Login',
    'nav.streak': '{count} Day Streak',
    'nav.xp': '{count} XP',

    // Marketing Banner
    'banner.free_trial': 'Al-Tuhfa Al-Azhariyya series for non-native speakers (Book 1 of 6) is 100% open & free for all learners!',
    'banner.start_now': 'Start Book 1 Now for Free ←',

    // Home Page - Hero & Mission
    'home.hero_badge': 'Al-Tuhfa Al-Azhariyya Series • Novice Level 1 • 100% Free Access',
    'home.hero_title': 'Master Quranic & Standard Arabic with the Authentic Azhar Curriculum',
    'home.hero_subtitle': 'The prestigious Al-Azhar curriculum for non-native Arabic speakers. Starting with phonetic & alphabet foundations and 15 immersive real-life situation units for conversation, syntax, and speech practice.',
    'home.cta_curriculum': 'Explore Book 1 (15 Units) & Start Free',
    'home.cta_level_test': 'Take Placement Test (5 min)',

    // 6-Level Azhari Roadmap Cards
    'home.stages_title': 'The 6-Level Roadmap of Al-Tuhfa Al-Azhariyya',
    'home.stages_subtitle': 'A structured academic progression across 6 educational books taking you from initial phonics to fluent Quranic eloquence:',
    
    'home.stage1_title': 'Book 1: Novice Level 1 (Available Now)',
    'home.stage1_desc': 'Phonetic preparation, alphabet family, and 15 real-life units (Meeting at Al-Azhar, Family, Housing, Institute, Market...).',
    'home.stage2_title': 'Book 2: Novice Level 2',
    'home.stage2_desc': 'Vocabulary expansion, extended dialogues, and foundational Arabic grammar.',
    'home.stage3_title': 'Book 3: Intermediate Level 1',
    'home.stage3_desc': 'Connected reading texts, morphological rules, and fluent oral & written expression.',
    'home.stage4_title': 'Book 4: Intermediate Level 2',
    'home.stage4_desc': 'Rhetorical styles, classical & cultural texts, and advanced syntax parsing.',
    'home.stage5_title': 'Book 5: Advanced Level 1',
    'home.stage5_desc': 'Literary analysis, eloquence principles, and elevated Quranic expressions.',
    'home.stage6_title': 'Book 6: Advanced Level 2',
    'home.stage6_desc': 'Complete mastery, linguistic inimitability, academic presentation, and debate.',

    // Interactive Alphabet Section
    'home.alphabet_title': 'Interactive Alphabet & Phonics Sound Chart',
    'home.alphabet_desc': 'Click any letter to listen to its authentic pronunciation and articulation points according to the Azhar phonetic primer:',
    'home.alphabet_hint': 'Click a letter to hear its sound:',

    // Live Simulator & Curriculum
    'home.simulator_title': 'Interactive Al-Tuhfa Dialogue Simulator',
    'home.simulator_desc': 'Practice listening and conversation with authentic dialogues from Book 1 of the series:',

    // Testimonials
    'home.testimonials_title': 'Success Stories from Students Worldwide',
    'home.testimonials_desc': 'Thousands of students from over 50 countries study Arabic and Quranic language with us daily.',

    // Level Test Banner
    'home.level_test_banner_title': 'Not sure where to begin?',
    'home.level_test_banner_desc': 'Take the quick 5-minute placement test and the system will automatically place you into the right level.',
    'home.level_test_banner_btn': 'Start Free Placement Test',

    // Learn Page
    'learn.badge': 'Al-Tuhfa Al-Azhariyya Series — Book 1: Novice Level 1',
    'learn.title': 'Al-Tuhfa Curriculum (Book 1 of 6 Levels)',
    'learn.subtitle': 'Explore the phonetic preparation and 15 life-situation units officially published by Al-Azhar Al-Sharif — 100% free.',
    'learn.loading': 'Loading curriculum and lessons from database...',
    'learn.free_badge': '100% Free & Open Access',
    'learn.trial_label': 'Unrestricted access to all units',
    'learn.free_status': 'Open & Free',
    'learn.start_lesson': 'Start Lesson',
    'learn.xp_reward': '{count} XP',

    // Interactive Session Player
    'session.badge': 'Interactive Live Session • Al-Tuhfa Curriculum',
    'session.back': 'Back to Curriculum',
    'session.back_to_curriculum': 'Back to Units',
    'session.play_audio': 'Play Audio Clip',
    'session.playing': 'Playing Audio...',
    'session.speed': 'Speed',
    'session.speed_normal': 'Normal 1.0x',
    'session.speed_slow': 'Slow 0.75x',
    'session.hint': 'Select the correct response matching what you heard:',
    'session.check_answer': 'Check Answer',
    'session.next': 'Next Question',
    'session.correct_title': 'Excellent! Correct Answer 🎉',
    'session.incorrect_title': 'Incorrect answer, please try again',
    'session.completed_title': 'Congratulations! Exercise Completed 🏆',
    'session.completed_desc': 'You have mastered the target vocabulary and dialogues and earned XP.',
    'session.repeat_lesson': 'Practice Again',
    'session.exercise_count': 'Exercise {current} of {total}',

    // Level Test
    'level_test.title': 'Arabic Placement & Proficiency Test',
    'level_test.subtitle': 'Answer the questions to accurately determine your standing across the 6 levels of the Al-Tuhfa series:',
    'level_test.question_of': 'Question {current} of {total}',
    'level_test.submit': 'Submit Answer',
    'level_test.finish': 'View Placement Result',
    'level_test.result_title': 'Your Recommended Level:',
    'level_test.score': 'Your Score: {score} of {total}',

    // Pricing / Free Initiative
    'pricing.title': 'Learning Arabic & Quran is a Universal Right — 100% Free',
    'pricing.subtitle': 'Zero subscription fees, zero tuition costs. Al-Tuhfa Al-Azhariyya curriculum is completely open to the world.',
    'pricing.free_tier': 'Universal Free Access',
    'pricing.free_price': '$0 Forever Free',
    'pricing.free_desc': 'Full unrestricted access to all 6 levels, 15 units of Book 1, and interactive audio exercises.',
    'pricing.start_free': 'Start Learning Free Now',

    // Footer
    'footer.rights': 'All rights reserved © Al-Tuhfa Al-Azhariyya Arabic Learning Platform.',
    'footer.stack': 'Al-Tuhfa Al-Azhariyya series for non-native Arabic speakers (Book 1 of 6)',
  },

  ru: {
    // Brand & Header
    'brand.name': 'Ат-Тухфа Аль-Азхарийя',
    'brand.en_name': 'Al-Tuhfa',
    'brand.tagline': 'Аутентичная азхарская программа арабского языка 100% бесплатно',
    'nav.home': 'Главная',
    'nav.curriculum': 'Программа Ат-Тухфа',
    'nav.reading': 'Азбука и фонетика',
    'nav.level_test': 'Тест уровня',
    'nav.pricing': '100% Бесплатно',
    'nav.admin': 'Панель управления',
    'nav.login': 'Вход для учителей',
    'nav.streak': '{count} дней подряд',
    'nav.xp': '{count} XP',

    // Marketing Banner
    'banner.free_trial': 'Серия «Ат-Тухфа Аль-Азхарийя» для неарабов (Книга 1 из 6) открыта 100% бесплатно для всех!',
    'banner.start_now': 'Начать изучение Книги 1 прямо сейчас ←',

    // Home Page - Hero & Mission
    'home.hero_badge': 'Серия «Ат-Тухфа Аль-Азхарийя» • Начальный уровень 1 • Бесплатно',
    'home.hero_title': 'Освойте арабский язык и язык Корана по азхарской программе «Ат-Тухфа»',
    'home.hero_subtitle': 'Официальная программа Аль-Азхара для изучающих арабский как иностранный. Начинается с фонетики и алфавита и включает 15 жизненных ситуаций для живого диалога, грамматики и речи.',
    'home.cta_curriculum': 'Изучить 15 уроков Книги 1 бесплатно',
    'home.cta_level_test': 'Пройти тест на определение уровня (5 минут)',

    // 6-Level Azhari Roadmap Cards
    'home.stages_title': 'Карта 6 уровней программы «Ат-Тухфа Аль-Азхарийя»',
    'home.stages_subtitle': 'Академическая система из 6 учебных книг, ведущая от первых букв к свободному владению и красноречию:',
    
    'home.stage1_title': 'Книга 1: Начальный уровень 1 (Доступна сейчас)',
    'home.stage1_desc': 'Фонетика, алфавит и 15 уроков из жизни (Знакомство в Аль-Азхаре, Семья, Дом, Институт, Рынок...).',
    'home.stage2_title': 'Книга 2: Начальный уровень 2',
    'home.stage2_desc': 'Расширение словарного запаса, углубленные диалоги и базовые правила грамматики.',
    'home.stage3_title': 'Книга 3: Средний уровень 1',
    'home.stage3_desc': 'Связные тексты для чтения, основы морфологии, устная и письменная речь.',
    'home.stage4_title': 'Книга 4: Средний уровень 2',
    'home.stage4_desc': 'Риторические стили, понимание классических текстов и синтаксический разбор.',
    'home.stage5_title': 'Книга 5: Продвинутый уровень 1',
    'home.stage5_desc': 'Литературный анализ, принципы красноречия и коранические конструкции.',
    'home.stage6_title': 'Книга 6: Продвинутый уровень 2',
    'home.stage6_desc': 'Полное мастерство, лингвистическое совершенство, академическое письмо и дебаты.',

    // Interactive Alphabet Section
    'home.alphabet_title': 'Интерактивная таблица алфавита и звуков (Alphabet Chart)',
    'home.alphabet_desc': 'Нажмите на любую букву, чтобы услышать правильное произношение и точки артикуляции согласно азхарской методике:',
    'home.alphabet_hint': 'Нажмите на букву для воспроизведения звука:',

    // Live Simulator & Curriculum
    'home.simulator_title': 'Интерактивный тренажер диалогов «Ат-Тухфа»',
    'home.simulator_desc': 'Практикуйтесь в аудировании и живом общении по реальным диалогам Книги 1:',

    // Testimonials
    'home.testimonials_title': 'Отзывы студентов со всего мира',
    'home.testimonials_desc': 'Тысячи студентов из более чем 50 стран ежедневно изучают арабский язык вместе с нами.',

    // Level Test Banner
    'home.level_test_banner_title': 'Не уверены, с чего начать?',
    'home.level_test_banner_desc': 'Пройдите быстрый 5-минутный тест, и система автоматически определит подходящий вам уровень.',
    'home.level_test_banner_btn': 'Начать бесплатный тест уровня',

    // Learn Page
    'learn.badge': 'Серия «Ат-Тухфа Аль-Азхарийя» — Книга 1: Начальный уровень 1',
    'learn.title': 'Программа «Ат-Тухфа» (Книга 1 из 6 уровней)',
    'learn.subtitle': 'Изучите вводный фонетический курс и 15 уроков жизненных ситуаций Аль-Азхара — 100% бесплатно.',
    'learn.loading': 'Загрузка уроков из базы данных...',
    'learn.free_badge': '100% Бесплатно для всех',
    'learn.trial_label': 'Полный доступ ко всем материалам',
    'learn.free_status': 'Бесплатно',
    'learn.start_lesson': 'Начать урок',
    'learn.xp_reward': '{count} XP',

    // Interactive Session Player
    'session.badge': 'Интерактивный урок • Программа «Ат-Тухфа»',
    'session.back': 'Назад к программе',
    'session.back_to_curriculum': 'Назад к списку уроков',
    'session.play_audio': 'Воспроизвести звук',
    'session.playing': 'Воспроизведение...',
    'session.speed': 'Скорость',
    'session.speed_normal': 'Обычная 1.0x',
    'session.speed_slow': 'Медленная 0.75x',
    'session.hint': 'Выберите правильный ответ, соответствующий услышанному:',
    'session.check_answer': 'Проверить ответ',
    'session.next': 'Следующий вопрос',
    'session.correct_title': 'Отлично! Правильный ответ 🎉',
    'session.incorrect_title': 'Неверный ответ, попробуйте снова',
    'session.completed_title': 'Поздравляем! Упражнение пройдено 🏆',
    'session.completed_desc': 'Вы успешно освоили диалоги и получили баллы опыта XP.',
    'session.repeat_lesson': 'Повторить упражнение',
    'session.exercise_count': 'Упражнение {current} из {total}',

    // Level Test
    'level_test.title': 'Тест на определение уровня арабского языка',
    'level_test.subtitle': 'Ответьте на вопросы, чтобы точно определить свой уровень в системе «Ат-Тухфа»:',
    'level_test.question_of': 'Вопрос {current} из {total}',
    'level_test.submit': 'Подтвердить ответ',
    'level_test.finish': 'Посмотреть результат',
    'level_test.result_title': 'Рекомендуемый уровень:',
    'level_test.score': 'Ваш результат: {score} из {total}',

    // Pricing / Free Initiative
    'pricing.title': 'Изучение языка Корана доступно каждому — 100% бесплатно',
    'pricing.subtitle': 'Никаких скрытых платежей или подписок. Программа «Ат-Тухфа Аль-Азхарийя» полностью открыта миру.',
    'pricing.free_tier': 'Полный бесплатный доступ',
    'pricing.free_price': '0$ Навсегда бесплатно',
    'pricing.free_desc': 'Неограниченный доступ ко всем 6 уровням, 15 урокам Книги 1 и аудио-тренажерам.',
    'pricing.start_free': 'Начать обучение бесплатно',

    // Footer
    'footer.rights': 'Все права защищены © Образовательная платформа «Ат-Тухфа Аль-Азхарийя».',
    'footer.stack': 'Серия «Ат-Тухфа Аль-Азхарийя» для неарабов (Книга 1 из 6)',
  },
};
