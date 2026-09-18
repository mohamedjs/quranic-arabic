DELETE FROM exercises;

DELETE FROM lessons;

DELETE FROM units;

DELETE FROM levels;

INSERT INTO levels (id, slug, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index, is_free, icon)
VALUES ('11111111-1111-1111-1111-111111111111', 'book-1-novice-1', 'الكتاب الأول: المستوى المبتدئ الأول', 'الكتاب الأول: المستوى المبتدئ الأول', 'Book 1: Novice Level 1', 'Книга 1: Начальный уровень 1', 'التهيئة الصوتية والهجائية و15 موقفاً حياتياً لدارسي العربية المبتدئين', 'التهيئة الصوتية والهجائية و15 موقفاً حياتياً لدارسي العربية المبتدئين', 'Alphabet & phonics primer with 15 essential real-life communication lessons.', 'Фонетический вводный курс и 15 жизненных уроков для начинающих.', 1, true, 'BookOpen');

INSERT INTO levels (id, slug, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index, is_free, icon)
VALUES ('22222222-2222-2222-2222-222222222222', 'book-2-novice-2', 'الكتاب الثاني: المستوى المبتدئ الثاني', 'الكتاب الثاني: المستوى المبتدئ الثاني', 'Book 2: Novice Level 2', 'Книга 2: Начальный уровень 2', 'توسيع المفردات، التراكيب الإضافية، الحوارات الموسعة وقواعد النحو التأسيسية', 'توسيع المفردات، التراكيب الإضافية، الحوارات الموسعة وقواعد النحو التأسيسية', 'Vocabulary expansion, compound structures, and foundational Arabic grammar.', 'Расширение словаря, сложные конструкции и основы грамматики.', 2, true, 'Layers');

INSERT INTO levels (id, slug, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index, is_free, icon)
VALUES ('33333333-3333-3333-3333-333333333333', 'book-3-intermediate-1', 'الكتاب الثالث: المستوى المتوسط الأول', 'الكتاب الثالث: المستوى المتوسط الأول', 'Book 3: Intermediate Level 1', 'Книга 3: Средний уровень 1', 'النصوص القرائية المتصلة، القواعد الصرفية، والتعبير الشفهي والكتابي السليم', 'النصوص القرائية المتصلة، القواعد الصرفية، والتعبير الشفهي والكتابي السليم', 'Connected reading texts, morphology fundamentals, and oral/written expression.', 'Связные тексты, основы морфологии, устная и письменная речь.', 3, true, 'Compass');

INSERT INTO levels (id, slug, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index, is_free, icon)
VALUES ('44444444-4444-4444-4444-444444444444', 'book-4-intermediate-2', 'الكتاب الرابع: المستوى المتوسط الثاني', 'الكتاب الرابع: المستوى المتوسط الثاني', 'Book 4: Intermediate Level 2', 'Книга 4: Средний уровень 2', 'الأساليب البلاغية، فهم النصوص التراثية والثقافية، وتراكيب الجمل المركبة', 'الأساليب البلاغية، فهم النصوص التراثية والثقافية، وتراكيب الجمل المركبة', 'Rhetorical styles, classical comprehension, and complex sentence construction.', 'Риторические стили, классические тексты и сложные конструкции.', 4, true, 'Award');

INSERT INTO levels (id, slug, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index, is_free, icon)
VALUES ('55555555-5555-5555-5555-555555555555', 'book-5-advanced-1', 'الكتاب الخامس: المستوى المتقدم الأول', 'الكتاب الخامس: المستوى المتقدم الأول', 'Book 5: Advanced Level 1', 'Книга 5: Продвинутый уровень 1', 'دراسة أصول الفصاحة، التحليل الأدبي، والتراكيب القرآنية الرفيعة', 'دراسة أصول الفصاحة، التحليل الأدبي، والتراكيب القرآنية الرفيعة', 'Literary analysis, eloquence principles, and elevated Quranic expressions.', 'Литературный анализ, принципы красноречия и коранические тексты.', 5, true, 'Sparkles');

INSERT INTO levels (id, slug, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index, is_free, icon)
VALUES ('66666666-6666-6666-6666-666666666666', 'book-6-advanced-2', 'الكتاب السادس: المستوى المتقدم الثاني', 'الكتاب السادس: المستوى المتقدم الثاني', 'Book 6: Advanced Level 2', 'Книга 6: Продвинутый уровень 2', 'الإتقان والتمكن التام، البلاغة والإعجاز البياني، والمناظرة والتعبير الأكاديمي', 'الإتقان والتمكن التام، البلاغة والإعجاز البياني، والمناظرة والتعبير الأكاديمي', 'Complete mastery, linguistic inimitability, academic writing, and debate.', 'Полное мастерство, лингвистическое совершенство и академическое письмо.', 6, true, 'GraduationCap');

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('a1000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'الوحدة التمهيدية: أصوات وحروف اللغة العربية', 'الوحدة التمهيدية: أصوات وحروف اللغة العربية', 'Introductory Unit: Arabic Alphabet & Phonics', 'Вводный модуль: Алфавит и звуки арабского языка', 'عائلة الحروف الهجائية، مخارج الأصوات، الحركات، والتهيئة المصورة', 'عائلة الحروف الهجائية، مخارج الأصوات، الحركات، والتهيئة المصورة', 'Alphabet family, articulation points, short/long vowels, and illustrated phonetic drills.', 'Алфавит, артикуляция звуков, гласные и иллюстрированные упражнения.', 0);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000000', 'الدرس التمهيدي 1: عائلة الحروف الهجائية ومخارج الأصوات', 'الدرس التمهيدي 1: عائلة الحروف الهجائية ومخارج الأصوات', 'Intro Lesson 1: Alphabet Family & Letter Exits', 'Вводный урок 1: Семейство букв и звуки', 'alphabet', 1, 20);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000000', 'الدرس التمهيدي 2: التهيئة اللغوية والمفردات المصورة', 'الدرس التمهيدي 2: التهيئة اللغوية والمفردات المصورة', 'Intro Lesson 2: Phonetic Drill & Illustrated Words', 'Вводный урок 2: Фонетика и иллюстрированные слова', 'vocab', 2, 25);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'الوحدة الأولى: التعارف والحياة الأسرية والسكن', 'الوحدة الأولى: التعارف والحياة الأسرية والسكن', 'Unit 1: Greetings, Family & Housing', 'Модуль 1: Знакомство, семья и дом', 'المواقف الحياتية للتعارف بالأزهر الشريف، أفراد الأسرة، والبيت والأثاث', 'المواقف الحياتية للتعارف بالأزهر الشريف، أفراد الأسرة، والبيت والأثاث', 'Meeting at Al-Azhar, family members, home & furniture, with letters Alif to Haa.', 'Знакомство в Аль-Азхаре, члены семьи, дом и мебель (буквы от Алиф до Ха).', 1);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'الدرس 1: تَحِيَّةٌ وَتَعَارُفٌ (حوار الأزهر الشريف)', 'الدرس 1: تَحِيَّةٌ وَتَعَارُفٌ (حوار الأزهر الشريف)', 'Lesson 1: Greetings & Introductions (Al-Azhar)', 'Урок 1: Приветствие и знакомство (Аль-Азхар)', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000001', 'الدرس 2: الأُسْرَةُ (حوار الغداء والأعداد 1-10)', 'الدرس 2: الأُسْرَةُ (حوار الغداء والأعداد 1-10)', 'Lesson 2: The Family (Dining & Numbers 1-10)', 'Урок 2: Семья (Обед и числа 1-10)', 'vocab', 2, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000001', 'الدرس 3: السَّكَنُ (البيت والغرف والأثاث)', 'الدرس 3: السَّكَنُ (البيت والغرف والأثاث)', 'Lesson 3: Housing (Home, Rooms & Furniture)', 'Урок 3: Жилье (Дом, комнаты и мебель)', 'vocab', 3, 30);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('a1000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'الوحدة الثانية: المعهد والتعليم والبيئة', 'الوحدة الثانية: المعهد والتعليم والبيئة', 'Unit 2: Education, Institute & Nature', 'Модуль 2: Образование, институт и природа', 'فصول المعهد الأزهري، الأدوات المدرسية، وحيوانات وطيور البيئة المحيطة', 'فصول المعهد الأزهري، الأدوات المدرسية، وحيوانات وطيور البيئة المحيطة', 'Study at the Azhari institute, classroom tools, domestic animals and birds.', 'Учеба в институте Аль-Азхар, учебные принадлежности, животные и птицы.', 2);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000002', 'الدرس 4: مَعْهَدِي (الفصول المدرسية وأدوات التعلم)', 'الدرس 4: مَعْهَدِي (الفصول المدرسية وأدوات التعلم)', 'Lesson 4: My Institute (Classrooms & Tools)', 'Урок 4: Мой институт (Классы и принадлежности)', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000002', 'الدرس 5: الحَيَوَانَاتُ (المزرعة والبيئة والمذكر والمؤنث)', 'الدرس 5: الحَيَوَانَاتُ (المزرعة والبيئة والمذكر والمؤنث)', 'Lesson 5: Animals (Domestic Animals & Gender)', 'Урок 5: Животные (Ферма, род существительных)', 'vocab', 2, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000002', 'الدرس 6: الطُّيُورُ (أسماؤها وصفاتها وحروف الجر)', 'الدرس 6: الطُّيُورُ (أسماؤها وصفاتها وحروف الجر)', 'Lesson 6: Birds (Names, Traits & Prepositions)', 'Урок 6: Птицы (Названия, признаки и предлоги)', 'vocab', 3, 30);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('a1000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'الوحدة الثالثة: السفر والمواصلات والضيافة', 'الوحدة الثالثة: السفر والمواصلات والضيافة', 'Unit 3: Travel, Transport & Hospitality', 'Модуль 3: Путешествия, транспорт и гостиница', 'وسائل النقل، إجراءات الفندق، والمطار وتأشيرات السفر', 'وسائل النقل، إجراءات الفندق، والمطار وتأشيرات السفر', 'Transportation modes, hotel booking and check-in, airport and visa procedures.', 'Виды транспорта, гостиница, аэропорт и паспортный контроль.', 3);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000003', 'الدرس 7: وَسَائِلُ المَوَاصَلَاتِ (الحافلة والقطار والسؤال عن المكان)', 'الدرس 7: وَسَائِلُ المَوَاصَلَاتِ (الحافلة والقطار والسؤال عن المكان)', 'Lesson 7: Transportation (Bus, Train & Directions)', 'Урок 7: Транспорт (Автобус, поезд и ориентация)', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000003', 'الدرس 8: فِي الفُنْدُقِ (حجز الغرفة وصيغ الطلب المؤدب)', 'الدرس 8: فِي الفُنْدُقِ (حجز الغرفة وصيغ الطلب المؤدب)', 'Lesson 8: At the Hotel (Booking & Polite Requests)', 'Урок 8: В гостинице (Бронирование и вежливые просьбы)', 'vocab', 2, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000003', 'الدرس 9: المَطَارُ وَالجَوَازَاتُ (إجراءات السفر والمواعيد)', 'الدرس 9: المَطَارُ وَالجَوَازَاتُ (إجراءات السفر والمواعيد)', 'Lesson 9: Airport & Passports (Travel & Timings)', 'Урок 9: Аэропорт и паспорта (Рейсы и расписание)', 'vocab', 3, 30);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('a1000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'الوحدة الرابعة: الإنسان والمظهر والتسوق', 'الوحدة الرابعة: الإنسان والمظهر والتسوق', 'Unit 4: Human Body, Clothes & Shopping', 'Модуль 4: Человек, одежда и покупки', 'أعضاء الجسم والحواس، الملابس والألوان، والتسوق في السوق والأسعار', 'أعضاء الجسم والحواس، الملابس والألوان، والتسوق في السوق والأسعار', 'Body parts and health, seasonal clothes and colors, marketplace shopping and prices.', 'Тело человека, чувства, одежда и цвета, покупки на рынке и цены.', 4);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000004', 'الدرس 10: جِسْمُ الإِنْسَانِ (الأعضاء والحواس والمشاعر والصحة)', 'الدرس 10: جِسْمُ الإِنْسَانِ (الأعضاء والحواس والمشاعر والصحة)', 'Lesson 10: The Human Body (Organs, Senses & Health)', 'Урок 10: Тело человека (Органы, чувства и здоровье)', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000004', 'الدرس 11: المَلَابِسُ (الملابس والألوان وتطابق الصفات)', 'الدرس 11: المَلَابِسُ (الملابس والألوان وتطابق الصفات)', 'Lesson 11: Clothing (Clothes, Colors & Adjectives)', 'Урок 11: Одежда (Цвета и согласование прилагательных)', 'vocab', 2, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000014', 'a1000000-0000-0000-0000-000000000004', 'الدرس 12: فِي السُّوقِ (الشراء والأسعار وكم وبكم)', 'الدرس 12: فِي السُّوقِ (الشراء والأسعار وكم وبكم)', 'Lesson 12: In the Market (Shopping, Prices & Kam/Bikam)', 'Урок 12: На рынке (Покупки, цены и вопросы о стоимости)', 'vocab', 3, 30);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('a1000000-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', 'الوحدة الخامسة: الغذاء والصداقة والأنشطة الرياضية', 'الوحدة الخامسة: الغذاء والصداقة والأنشطة الرياضية', 'Unit 5: Nutrition, Friendship & Activities', 'Модуль 5: Питание, дружба и спорт', 'الخضراوات والفواكه والتفضيل، زيارة الأصدقاء، والترويح الرياضي في النادي', 'الخضراوات والفواكه والتفضيل، زيارة الأصدقاء، والترويح الرياضي في النادي', 'Vegetables, fruits & preferences, visiting friends, and sports activities at the club.', 'Овощи, фрукты, предпочтения в еде, друзья и занятия спортом в клубе.', 5);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000015', 'a1000000-0000-0000-0000-000000000005', 'الدرس 13: خَضْرَاوَاتٌ وَفَوَاكِهُ (الأطعمة وأسلوب التفضيل أحب/أفضل)', 'الدرس 13: خَضْرَاوَاتٌ وَفَوَاكِهُ (الأطعمة وأسلوب التفضيل أحب/أفضل)', 'Lesson 13: Vegetables & Fruits (Food Preferences)', 'Урок 13: Овощи и фрукты (Предпочтения в еде)', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000016', 'a1000000-0000-0000-0000-000000000005', 'الدرس 14: الأَصْدِقَاءُ (حوارات الصداقة والزيارة والضمائر)', 'الدرس 14: الأَصْدِقَاءُ (حوارات الصداقة والزيارة والضمائر)', 'Lesson 14: Friends & Fellowship (Visits & Pronouns)', 'Урок 14: Друзья (Визиты, общение и местоимения)', 'vocab', 2, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('b1000000-0000-0000-0000-000000000017', 'a1000000-0000-0000-0000-000000000005', 'الدرس 15: النَّادِي (الأنشطة والترويح والمراجعة الشاملة)', 'الدرس 15: النَّادِي (الأنشطة والترويح والمراجعة الشاملة)', 'Lesson 15: Sports & The Club (Activities & Comprehensive Review)', 'Урок 15: Клуб и спорт (Активности и итоговый обзор)', 'vocab', 3, 35);

INSERT INTO exercises (id, lesson_id, question_text, question_ar, question_en, question_ru, arabic_text, transliteration, translation, translation_en, translation_ru, question_type, audio_url, options_json, correct_answer, explanation, explanation_ar, explanation_en, explanation_ru, order_index)
VALUES (
  'e1000000-0001-0000-0000-000000000001',
  'b1000000-0000-0000-0000-000000000003',
  'استمع إلى تحية أحمد في حوار الدرس الأول من (التحفة الأزهرية): ما هو الرد المطابق المسموع؟',
  'استمع إلى تحية أحمد في حوار الدرس الأول من (التحفة الأزهرية): ما هو الرد المطابق المسموع؟',
  'Listen to Ahmed''s greeting in Lesson 1 of Al-Tuhfa: What is the exact matching response?',
  'Послушайте приветствие Ахмеда в Уроке 1 книги «Ат-Тухфа»: Каков точный ответ?',
  'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
  'As-salamu alaykum wa rahmatullahi wa barakatuh',
  'Peace be upon you and the mercy of Allah and His blessings',
  'Peace be upon you and the mercy of Allah and His blessings',
  'Мир вам, милость Аллаха и Его благословение',
  'audio_mcq',
  '/audio/tuhfa/salam_full.mp3',
  '[{"id": "opt1", "text": "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ", "transliteration": "Wa alaykumus-salam wa rahmatullah", "text_en": "And upon you be peace and Allah''s mercy", "text_ru": "И вам мир и милость Аллаха"}, {"id": "opt2", "text": "أَهْلاً وَسَهْلاً بِكَ", "transliteration": "Ahlan wa sahlan bik", "text_en": "Welcome to you", "text_ru": "Добро пожаловать"}, {"id": "opt3", "text": "إِلَى اللِّقَاءِ يَا أَخِي", "transliteration": "Ila al-liqa'' ya akhi", "text_en": "See you later, brother", "text_ru": "До встречи, брат"}, {"id": "opt4", "text": "صَبَاحُ الخَيْرِ وَالنُّورِ", "transliteration": "Sabah al-khayr", "text_en": "Good morning", "text_ru": "Доброе утро"}]'::jsonb,
  'opt1',
  'في حوار الدرس الأول (التحفة الأزهرية): رد بلال هو: وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ.',
  'في حوار الدرس الأول (التحفة الأزهرية): رد بلال هو: وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ.',
  'In Lesson 1 dialogue (Al-Tuhfa): Bilal replies: Wa alaykumus-salam wa rahmatullahi wa barakatuh.',
  'В диалоге 1-го урока («Ат-Тухфа»): Биляль отвечает: «Ва алейкумус-салям ва рахматуллахи ва баракатух».',
  1
);

INSERT INTO exercises (id, lesson_id, question_text, question_ar, question_en, question_ru, arabic_text, transliteration, translation, translation_en, translation_ru, question_type, audio_url, options_json, correct_answer, explanation, explanation_ar, explanation_en, explanation_ru, order_index)
VALUES (
  'e1000000-0001-0000-0000-000000000002',
  'b1000000-0000-0000-0000-000000000003',
  'سأل أحمد: (لِمَاذَا جِئْتَ إِلَى مِصْرَ؟) - ماذا أجاب بلال في كتاب التحفة الأزهرية؟',
  'سأل أحمد: (لِمَاذَا جِئْتَ إِلَى مِصْرَ؟) - ماذا أجاب بلال في كتاب التحفة الأزهرية؟',
  'Ahmed asked: (Why did you come to Egypt?) - What was Bilal''s response in Al-Tuhfa?',
  'Ахмед спросил: (Зачем ты приехал в Египет?) - Что ответил Биляль в книге «Ат-Тухфа»?',
  'لِمَاذَا جِئْتَ إِلَى مِصْرَ؟',
  'Limadha ji''ta ila Misr?',
  'Why did you come to Egypt?',
  'Why did you come to Egypt?',
  'Зачем ты приехал в Египет?',
  'audio_mcq',
  '/audio/tuhfa/limadha_jita.mp3',
  '[{"id": "opt1", "text": "لِأَتَعَلَّمَ فِي الأَزْهَرِ الشَّرِيفِ", "transliteration": "Li-ata''allama fil-Azhar ash-Sharif", "text_en": "To study at Al-Azhar Al-Sharif", "text_ru": "Чтобы учиться в благородном Аль-Азхаре"}, {"id": "opt2", "text": "لِزِيَارَةِ الأَهْرَامَاتِ", "transliteration": "Li-ziyaratil-ahramat", "text_en": "To visit the Pyramids", "text_ru": "Чтобы посетить пирамиды"}, {"id": "opt3", "text": "لِلْعَمَلِ فِي التِّجَارَةِ", "transliteration": "Lil-''amali fit-tijarah", "text_en": "To work in commerce", "text_ru": "Для работы в торговле"}, {"id": "opt4", "text": "لِلْعِلَاجِ فِي المُسْتَشْفَى", "transliteration": "Lil-''ilaj", "text_en": "For medical treatment", "text_ru": "Для лечения"}]'::jsonb,
  'opt1',
  'أجاب بلال: (لِأَتَعَلَّمَ فِي الأَزْهَرِ الشَّرِيفِ)، وهو الهدف السامي لدارسي سلسلة التحفة الأزهرية.',
  'أجاب بلال: (لِأَتَعَلَّمَ فِي الأَزْهَرِ الشَّرِيفِ)، وهو الهدف السامي لدارسي سلسلة التحفة الأزهرية.',
  'Bilal answered: (To study at Al-Azhar Al-Sharif), the primary goal of students of this series.',
  'Биляль ответил: «Чтобы учиться в благородном Аль-Азхаре».',
  2
);