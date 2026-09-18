import { SupportedLanguage } from './languages';

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  ar: {
    // Brand & Header
    'brand.name': 'المدينة العربية',
    'brand.en_name': 'Madinah Arabic',
    'brand.tagline': 'المنهج المتكامل لتعليم العربية والقرآن مجاناً 100%',
    'nav.home': 'الرئيسية',
    'nav.curriculum': 'المنهج الدراسي',
    'nav.reading': 'لوحة الحروف الأبجدية',
    'nav.level_test': 'اختبار المستوى',
    'nav.pricing': 'المبادرة المجانية',
    'nav.admin': 'لوحة التحكم',
    'nav.login': 'دخول المشرف',
    'nav.streak': '{count} أيام تتابع',
    'nav.xp': '{count} XP',

    // Marketing Banner
    'banner.free_trial': 'مبادرة عالمية: جميع كتب ومناهج ومستويات اللغة العربية والقرآن مفتوحة مجاناً 100% للجميع!',
    'banner.start_now': 'ابدأ التعلم الفوري بدون أي رسوم ←',

    // Home Page - Progressive Self-Study
    'home.hero_badge': 'منهج تدريجي سليم لتعليم لغة القرآن • متاح مجاناً 100%',
    'home.hero_title': 'أتقن اللغة العربية خطوة بخطوة من الصفر حتى الطلاقة',
    'home.hero_subtitle': 'نظام تعليمي تفاعلي متدرج يبدأ من حروف الهجاء ومخارج الأصوات، مروراً بالمحادثة اليومية وقواعد الجملة، وحتى تلاوة وفهم القرآن الكريم. متاح مجاناً لكافة الطلاب حول العالم.',
    'home.cta_curriculum': 'استكشف المنهج وابدأ الآن مجاناً',
    'home.cta_level_test': 'إجراء اختبار تحديد المستوى (5 دقائق)',

    // 4 Progressive Stages Cards
    'home.stages_title': 'منهج تعليمي سليم ومحكم مبني على 4 مراحل متدرجة',
    'home.stages_subtitle': 'تم تصميم المنهج وفق المعايير التربوية لتدريس العربية لغير الناطقين بها، لينقلك بسلاسة من نقطة البداية إلى الإتقان:',
    
    'home.stage1_title': 'المرحلة 1: التأسيس والأصوات (Pre-A1)',
    'home.stage1_desc': 'حروف الهجاء الـ 28، مخارج الحروف، الحركات، المدود، السكون، التنوين، وقراءة الكلمات.',
    'home.stage2_title': 'المرحلة 2: المحادثة والتواصل (A1)',
    'home.stage2_desc': 'منهج (العربية بين يديك): إلقاء السلام، التعارف، البلد والجنسية، الأسرة، والسكن.',
    'home.stage3_title': 'المرحلة 3: القواعد وبناء الجمل (A2)',
    'home.stage3_desc': 'الضمائر، أسماء الإشارة، الجملة الاسمية، حروف الجر، ومفردات الحياة اليومية.',
    'home.stage4_title': 'المرحلة 4: لغة القرآن والتجويد (B1)',
    'home.stage4_desc': 'الكلمات الأكثر تكراراً في المصحف، فهم معاني قصار السور، وتلاوات التجويد المتقنة.',

    // Interactive Alphabet Section
    'home.alphabet_title': 'لوحة الحروف الأبجدية التفاعلية (Alphabet Sound Chart)',
    'home.alphabet_desc': 'انقر على أي حرف للاستماع لنطقه الصحيح، والتعرف على أشكاله ومخرجه الصوتي فورياً:',
    'home.alphabet_hint': 'اضغط على الحرف لسماع صوته:',

    // Live Simulator & Curriculum
    'home.simulator_title': 'جرّب التمارين الصوتية التفاعلية الآن',
    'home.simulator_desc': 'تمرين حي لتطبيق النطق والاستماع:',

    // Testimonials
    'home.testimonials_title': 'آراء وقصص نجاح الطلاب حول العالم',
    'home.testimonials_desc': 'آلاف الطلاب من مختلف القارات يتعلمون العربية ولغة القرآن الكريم معنا يومياً.',

    // Level Test Banner
    'home.level_test_banner_title': 'لست متأكداً من أين تبدأ؟',
    'home.level_test_banner_desc': 'قم بإجراء اختبار تحديد المستوى السريع (5 دقائق فقط) وسيقوم النظام بتوجيهك للمرحلة المناسبة لك تلقائياً.',
    'home.level_test_banner_btn': 'ابدأ اختبار تحديد المستوى مجاناً',

    // Free Content & Learn Page
    'learn.badge': 'منهج متكامل متدرج • متاح مجاناً 100% بدون أي رسوم',
    'learn.title': 'شجرة المنهج والمراحل التعليمية المتدرجة',
    'learn.subtitle': 'اختر مرحلتك الحالية أو ابدأ من المرحلة الأولى، وتدرج في الدروس الصوتية التفاعلية فوراً بدون تسجيل أو اشتراك.',
    'learn.loading': 'جاري تحميل المنهج والمراحل...',
    'learn.free_badge': 'مفتوح مجاناً بالكامل',
    'learn.free_status': 'متاح مجاناً 100%',
    'learn.trial_label': 'مفتوح للجميع',
    'learn.start_lesson': 'ابدأ الدرس',
    'learn.xp_reward': '+{count} XP • استماع وتدريب تفاعلي',

    // Session / Lesson Runner
    'session.back': '← العودة لقائمة المنهج',
    'session.exercise_count': 'تمرين {current} من {total}',
    'session.badge': 'المدينة العربية • تدريب تفاعلي',
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
    'session.completed_desc': 'حققت تقدماً ممتازاً وأتقنت مهارات هذا الدرس بنجاح.',
    'session.repeat_lesson': 'إعادة الدرس',
    'session.back_to_curriculum': 'الانتقال للدرس التالي',
    'session.hint': 'تلميح / الترجمة:',

    // Level Test Page
    'level_test.title': 'اختبار تحديد المستوى الذكي (Placement Test)',
    'level_test.subtitle': 'أجب عن 5 أسئلة متدرجة ليحدد لك النظام المرحلة التعليمية الأنسب لك مجاناً.',
    'level_test.question_of': 'السؤال {current} من {total}',
    'level_test.submit': 'تسجيل الإجابة والتالي',
    'level_test.finish': 'عرض النتيجة والتوصية',
    'level_test.result_title': 'نتيجتك وتوصية المنهج',
    'level_test.score': 'درجتك: {score} من {total}',

    // Pricing Page (100% Free Initiative)
    'pricing.title': 'منصة تعليمية مفتوحة مجاناً 100% للجميع',
    'pricing.subtitle': 'تم فتح كافة الكتب والمستويات والمراحل الأربع مجاناً لوجه الله تعالى لخدمة كل راغب في تعلم لغة القرآن والعربية حول العالم.',
    'pricing.free_tier': 'الوصول المفتوح الكامل',
    'pricing.free_price': '$0',
    'pricing.free_desc': 'كافة المراحل من الحروف إلى القرآن الكريم مجانية بالكامل مدى الحياة بدون أي رسوم أو بطاقات ائتمان.',
    'pricing.start_free': 'ابدأ التعلم الآن فوراً',

    // Footer
    'footer.rights': '© 2026 المدينة العربية (Madinah Arabic). جميع الحقوق محفوظة.',
    'footer.stack': 'منهج متكامل متدرج • قاعدة بيانات Supabase • 3 لغات (AR/EN/RU)',
  },

  en: {
    // Brand & Header
    'brand.name': 'Madinah Arabic',
    'brand.en_name': 'Madinah Arabic',
    'brand.tagline': 'Comprehensive Progressive Arabic & Quran Curriculum 100% Free',
    'nav.home': 'Home',
    'nav.curriculum': 'Curriculum',
    'nav.reading': 'Alphabet Chart',
    'nav.level_test': 'Level Test',
    'nav.pricing': '100% Free Access',
    'nav.admin': 'Admin Dashboard',
    'nav.login': 'Admin Login',
    'nav.streak': '{count} Day Streak',
    'nav.xp': '{count} XP',

    // Marketing Banner
    'banner.free_trial': 'Global Initiative: All Arabic & Quran curriculum stages are 100% free and open to all learners worldwide!',
    'banner.start_now': 'Start Learning Instantly for Free →',

    // Home Page - Progressive Self-Study
    'home.hero_badge': 'Progressive Step-by-Step Arabic Curriculum • 100% Free',
    'home.hero_title': 'Master Arabic Step-by-Step From Zero to Fluency',
    'home.hero_subtitle': 'An interactive, structured self-study platform guiding you from alphabet phonics and Harakat, through daily dialogues and grammar, to Quranic recitation and comprehension. Open to all students worldwide.',
    'home.cta_curriculum': 'Explore 4 Curriculum Stages Free',
    'home.cta_level_test': 'Take 5-Min Level Assessment Test',

    // 4 Progressive Stages Cards
    'home.stages_title': 'A Pedagogical 4-Stage Progressive Arabic Curriculum',
    'home.stages_subtitle': 'Carefully graded according to international Arabic-as-a-second-language standards to take you seamlessly from absolute beginner to Quranic literacy:',
    
    'home.stage1_title': 'Stage 1: Foundation & Phonics (Pre-A1)',
    'home.stage1_desc': '28 Arabic letters, articulation points, short vowels (Harakat), long vowels, Sukoon, and Tanween.',
    'home.stage2_title': 'Stage 2: Everyday Conversation (A1)',
    'home.stage2_desc': 'Al-Arabiyyah Bayna Yadayk: Greetings, introductions, nationality, family, home, and daily communication.',
    'home.stage3_title': 'Stage 3: Grammar & Sentences (A2)',
    'home.stage3_desc': 'Personal pronouns, demonstratives (Hadha/Hadhihi), nominal sentences, and everyday prepositions.',
    'home.stage4_title': 'Stage 4: Quranic Arabic & Tajweed (B1)',
    'home.stage4_desc': '80% most frequent Quranic words, understanding short Surahs, and authentic Tajweed audio recitations.',

    // Interactive Alphabet Section
    'home.alphabet_title': 'Arabic Alphabet [Interactive Sound Chart]',
    'home.alphabet_desc': 'Click any letter below to listen to its clear native pronunciation, examine its 4 written forms, and learn example words:',
    'home.alphabet_hint': 'Click on any letter to hear its sound:',

    // Live Simulator & Curriculum
    'home.simulator_title': 'Try Our Interactive Audio Exercise',
    'home.simulator_desc': 'Live interactive sample for listening and phonetic practice:',

    // Testimonials
    'home.testimonials_title': 'Inspiring Reviews from Students Worldwide',
    'home.testimonials_desc': 'Join thousands of learners progressing daily in reading, speaking, and Quran comprehension.',

    // Level Test Banner
    'home.level_test_banner_title': 'Unsure where to begin your journey?',
    'home.level_test_banner_desc': 'Take our quick 5-minute placement assessment to discover your level and automatically unlock your recommended stage.',
    'home.level_test_banner_btn': 'Take Placement Test Now',

    // Free Content & Learn Page
    'learn.badge': 'Structured Progressive Curriculum • 100% Free Access',
    'learn.title': 'Arabic Curriculum Stages Roadmap',
    'learn.subtitle': 'Choose your current stage or start from Stage 1. Practice interactive audio lessons without any fees or signup requirements.',
    'learn.loading': 'Loading curriculum stages and modules...',
    'learn.free_badge': '100% Free Open Access',
    'learn.free_status': '100% Free',
    'learn.trial_label': 'Open to All',
    'learn.start_lesson': 'Start Lesson',
    'learn.xp_reward': '+{count} XP • Interactive Audio Practice',

    // Session / Lesson Runner
    'session.back': '← Back to Curriculum',
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
    'level_test.title': 'Arabic Proficiency Placement Test',
    'level_test.subtitle': 'Answer 5 quick progressive questions to evaluate your current reading and comprehension level.',
    'level_test.question_of': 'Question {current} of {total}',
    'level_test.submit': 'Submit & Next',
    'level_test.finish': 'View Result',
    'level_test.result_title': 'Your Placement Result',
    'level_test.score': 'Score: {score} of {total}',

    // Pricing Page (100% Free Initiative)
    'pricing.title': '100% Free & Open Education for All',
    'pricing.subtitle': 'All 4 progressive stages, textbooks, and interactive Quran modules are completely free forever for every student worldwide.',
    'pricing.free_tier': 'Full Lifetime Open Access',
    'pricing.free_price': '$0',
    'pricing.free_desc': 'All stages from basic alphabet phonics to Quranic understanding are completely free. No subscription or credit card required.',
    'pricing.start_free': 'Start Learning Immediately',

    // Footer
    'footer.rights': '© 2026 Madinah Arabic. All rights reserved.',
    'footer.stack': 'Progressive Curriculum • Supabase • Tri-lingual (AR/EN/RU)',
  },

  ru: {
    // Brand & Header
    'brand.name': 'Мадина Арабик',
    'brand.en_name': 'Madinah Arabic',
    'brand.tagline': 'Полноценная программа арабского языка и Корана 100% бесплатно',
    'nav.home': 'Главная',
    'nav.curriculum': 'Программа обучения',
    'nav.reading': 'Таблица алфавита',
    'nav.level_test': 'Тест уровня',
    'nav.pricing': '100% Бесплатно',
    'nav.admin': 'Панель админа',
    'nav.login': 'Вход админа',
    'nav.streak': '{count} дн. подряд',
    'nav.xp': '{count} XP',

    // Marketing Banner
    'banner.free_trial': 'Международная инициатива: Все 4 этапа арабского языка и Корана 100% бесплатны для всех!',
    'banner.start_now': 'Начать обучение бесплатно →',

    // Home Page - Progressive Self-Study
    'home.hero_badge': 'Поэтапная система изучения языка Корана • 100% Бесплатно',
    'home.hero_title': 'Освойте арабский язык шаг за шагом от нуля до беглости',
    'home.hero_subtitle': 'Интерактивная пошаговая программа: от алфавита, звуков и огласовок до живых диалогов, грамматики и понимания Священного Корана. Полностью открыта для всех.',
    'home.cta_curriculum': 'Изучить 4 этапа программы бесплатно',
    'home.cta_level_test': 'Пройти 5-минутный тест уровня',

    // 4 Progressive Stages Cards
    'home.stages_title': 'Проверенная 4-ступенчатая программа обучения',
    'home.stages_subtitle': 'Последовательный курс, созданный по лучшим международным методикам преподавания арабского языка:',
    
    'home.stage1_title': 'Этап 1: Основы и фонетика (Pre-A1)',
    'home.stage1_desc': '28 арабских букв, махрадж звуков, харакаты, долгие гласные, сукун и танвин.',
    'home.stage2_title': 'Этап 2: Разговорный арабский (A1)',
    'home.stage2_desc': 'Курс Байна Ядайк: приветствие, знакомство, страны, национальности, семья и дом.',
    'home.stage3_title': 'Этап 3: Грамматика и фразы (A2)',
    'home.stage3_desc': 'Местоимения, указательные слова (Хаза/Хазихи), именные предложения и предлоги.',
    'home.stage4_title': 'Этап 4: Язык Корана и таджвид (B1)',
    'home.stage4_desc': '80% частых слов Корана, перевод коротких сур и эталонное чтение с таджвидом.',

    // Interactive Alphabet Section
    'home.alphabet_title': 'Интерактивная таблица арабского алфавита',
    'home.alphabet_desc': 'Нажмите на любую букву, чтобы услышать чистое звучание, изучить 4 формы написания и примеры:',
    'home.alphabet_hint': 'Нажмите на букву для воспроизведения звука:',

    // Live Simulator & Curriculum
    'home.simulator_title': 'Попробуйте звуковое упражнение',
    'home.simulator_desc': 'Интерактивный пример для тренировки произношения и понимания:',

    // Testimonials
    'home.testimonials_title': 'Отзывы студентов со всего мира',
    'home.testimonials_desc': 'Тысячи студентов из стран СНГ и всего мира обучаются арабскому языку вместе с нами.',

    // Level Test Banner
    'home.level_test_banner_title': 'Не знаете, с какого уровня начать?',
    'home.level_test_banner_desc': 'Пройдите быстрый 5-минутный тест, и система автоматически подберет для вас нужный этап.',
    'home.level_test_banner_btn': 'Пройти тест уровня бесплатно',

    // Free Content & Learn Page
    'learn.badge': 'Полноценная программа обучения • 100% Бесплатно',
    'learn.title': 'Карта этапов изучения арабского языка',
    'learn.subtitle': 'Выберите нужный этап или начните с Этапа 1. Практикуйтесь по интерактивным звуковым урокам бесплатно.',
    'learn.loading': 'Загрузка этапов программы...',
    'learn.free_badge': '100% Бесплатно',
    'learn.free_status': '100% Бесплатно',
    'learn.trial_label': 'Открыто для всех',
    'learn.start_lesson': 'Начать урок',
    'learn.xp_reward': '+{count} XP • Интерактивная практика',

    // Session / Lesson Runner
    'session.back': '← Назад к программе',
    'session.exercise_count': 'Упражнение {current} из {total}',
    'session.badge': 'Мадина Арабик • Интерактивный урок',
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
    'level_test.subtitle': 'Ответьте на 5 быстрых вопросов, чтобы система определила ваш уровень.',
    'level_test.question_of': 'Вопрос {current} из {total}',
    'level_test.submit': 'Ответить и далее',
    'level_test.finish': 'Показать результат',
    'level_test.result_title': 'Результат теста уровня',
    'level_test.score': 'Ваш балл: {score} из {total}',

    // Pricing Page (100% Free Initiative)
    'pricing.title': '100% Бесплатное образование для всех',
    'pricing.subtitle': 'Все 4 этапа, учебные материалы и коранические модули открыты навсегда бесплатно для каждого студента в мире.',
    'pricing.free_tier': 'Полный пожизненный доступ',
    'pricing.free_price': '$0',
    'pricing.free_desc': 'Все материалы от алфавита до чтения Корана открыты без подписок и кредитных карт.',
    'pricing.start_free': 'Начать обучение сейчас',

    // Footer
    'footer.rights': '© 2026 Madinah Arabic. Все права защищены.',
    'footer.stack': 'Поэтапный курс • Supabase • 3 языка (AR/EN/RU)',
  },
};
