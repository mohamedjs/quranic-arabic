-- 1. Clean existing exercises, lessons, units, levels

DELETE FROM exercises;

DELETE FROM lessons;

DELETE FROM units;

DELETE FROM levels;

INSERT INTO levels (id, slug, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index, is_free, icon)
VALUES ('11111111-1111-1111-1111-111111111111', 'level-1-novice-1', 'الكتاب الأول: المستوى المبتدئ الأول', 'الكتاب الأول: المستوى المبتدئ الأول', 'Book 1: Novice Level 1 (Al-Tuhfa)', 'Книга 1: Начальный уровень 1 (Ат-Тухфа)', 'التهيئة الصوتية والهجائية و15 درساً وموقفاً حياتياً للمحادثة والتراكيب اليومية المباشرة', 'التهيئة الصوتية والهجائية و15 درساً وموقفاً حياتياً للمحادثة والتراكيب اليومية المباشرة', 'Phonetic & alphabet preparation with 15 practical life situations for conversation & core syntax.', 'Фонетическая и алфавитная подготовка с 15 жизненными ситуациями для диалога и базовых конструкций.', 1, true, 'BookOpen');

INSERT INTO levels (id, slug, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index, is_free, icon)
VALUES ('22222222-2222-2222-2222-222222222222', 'level-2-novice-2', 'الكتاب الثاني: المستوى المبتدئ الثاني', 'الكتاب الثاني: المستوى المبتدئ الثاني', 'Book 2: Novice Level 2', 'Книга 2: Начальный уровень 2', 'توسيع دائرة المفردات، التراكيب الإضافية، الحوارات الموسعة وقواعد النحو التأسيسية', 'توسيع دائرة المفردات، التراكيب الإضافية، الحوارات الموسعة وقواعد النحو التأسيسية', 'Expanding vocabulary, complex dialogues, and essential foundational Arabic grammar.', 'Расширение словарного запаса, углубленные диалоги и базовые правила грамматики.', 2, true, 'Layers');

INSERT INTO levels (id, slug, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index, is_free, icon)
VALUES ('33333333-3333-3333-3333-333333333333', 'level-3-intermediate-1', 'الكتاب الثالث: المستوى المتوسط الأول', 'الكتاب الثالث: المستوى المتوسط الأول', 'Book 3: Intermediate Level 1', 'Книга 3: Средний уровень 1', 'النصوص القرائية المتصلة، القواعد الصرفية، والتعبير الشفهي والكتابي السليم', 'النصوص القرائية المتصلة، القواعد الصرفية، والتعبير الشفهي والكتابي السليم', 'Connected reading texts, morphological rules, and fluent oral & written expression.', 'Связные тексты для чтения, основы морфологии, устная и письменная речь.', 3, true, 'Compass');

INSERT INTO levels (id, slug, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index, is_free, icon)
VALUES ('44444444-4444-4444-4444-444444444444', 'level-4-intermediate-2', 'الكتاب الرابع: المستوى المتوسط الثاني', 'الكتاب الرابع: المستوى المتوسط الثاني', 'Book 4: Intermediate Level 2', 'Книга 4: Средний уровень 2', 'الأساليب البلاغية، فهم النصوص التراثية والثقافية، وإعراب التراكيب المعقدة', 'الأساليب البلاغية، فهم النصوص التراثية والثقافية، وإعراب التراكيب المعقدة', 'Rhetorical styles, classical & cultural comprehension, and advanced sentence parsing.', 'Риторические стили, понимание классических текстов и синтаксический разбор.', 4, true, 'Award');

INSERT INTO levels (id, slug, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index, is_free, icon)
VALUES ('55555555-5555-5555-5555-555555555555', 'level-5-advanced-1', 'الكتاب الخامس: المستوى المتقدم الأول', 'الكتاب الخامس: المستوى المتقدم الأول', 'Book 5: Advanced Level 1', 'Книга 5: Продвинутый уровень 1', 'دراسة أصول الفصاحة، التحليل الأدبي، والتراكيب القرآنية الرفيعة', 'دراسة أصول الفصاحة، التحليل الأدبي، والتراكيب القرآنية الرفيعة', 'Literary analysis, eloquence principles, and elevated Quranic expressions.', 'Литературный анализ, принципы красноречия и коранические конструкции высшего порядка.', 5, true, 'Sparkles');

INSERT INTO levels (id, slug, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index, is_free, icon)
VALUES ('66666666-6666-6666-6666-666666666666', 'level-6-advanced-2', 'الكتاب السادس: المستوى المتقدم الثاني', 'الكتاب السادس: المستوى المتقدم الثاني', 'Book 6: Advanced Level 2', 'Книга 6: Продвинутый уровень 2', 'الإتقان والتمكن التام، البلاغة والإعجاز البياني، والمناظرة والتعبير الأكاديمي', 'الإتقان والتمكن التام، البلاغة والإعجاز البياني، والمناظرة والتعبير الأكاديمي', 'Complete mastery, linguistic inimitability, academic presentation, and debate.', 'Полное мастерство, лингвистическое совершенство, академическое письмо и дебаты.', 6, true, 'GraduationCap');

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'التمهيد: الأصوات الهجائية والتهيئة المصورة', 'التمهيد: الأصوات الهجائية والتهيئة المصورة', 'Prep: Alphabet Phonics & Visual Drill', 'Введение: Алфавит и звуковые иллюстрации', 'عائلة الحروف الهجائية، مخارج الحروف، الحركات القصيرة والطويلة، والتهيئة المصورة', 'عائلة الحروف الهجائية، مخارج الحروف، الحركات القصيرة والطويلة، والتهيئة المصورة', 'Arabic alphabet family, letter exits, short/long vowels, and illustrated phonetic introduction.', 'Алфавит, артикуляция звуков, краткие и долгие гласные, иллюстрированное введение.', 0);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'الدَّرْسُ الأَوَّلُ: تَحِيَّةٌ وَتَعَارُفٌ', 'الدَّرْسُ الأَوَّلُ: تَحِيَّةٌ وَتَعَارُفٌ', 'Lesson 1: Greetings & Introductions', 'Урок 1: Приветствие и знакомство', 'حوار التعارف في الأزهر الشريف، حرفا الألف والباء، وأسماء الإشارة (هذا / هذه)', 'حوار التعارف في الأزهر الشريف، حرفا الألف والباء، وأسماء الإشارة (هذا / هذه)', 'Meeting at Al-Azhar, letters Alif & Baa, demonstrative pronouns (Hatha / Hathihi).', 'Знакомство в Аль-Азхаре, буквы Алиф и Ба, указательные местоимения (Хаза / Хазихи).', 1);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'الدَّرْسُ الثَّانِي: الأُسْرَةُ', 'الدَّرْسُ الثَّانِي: الأُسْرَةُ', 'Lesson 2: The Family', 'Урок 2: Семья', 'حوار الأسرة وإعداد الغداء، حرفا التاء والثاء، التاء المربوطة، وأدوات الاستفهام (هل / ما)', 'حوار الأسرة وإعداد الغداء، حرفا التاء والثاء، التاء المربوطة، وأدوات الاستفهام (هل / ما)', 'Family & lunch preparation, letters Taa & Thaa, Ta-marbuta, question tools (Hal / Ma).', 'Семья и обед, буквы Та и Са, Та-марбута, вопросительные частицы (Халь / Ма).', 2);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'الدَّرْسُ الثَّالِثُ: السَّكَنُ', 'الدَّرْسُ الثَّالِثُ: السَّكَنُ', 'Lesson 3: Housing & The Home', 'Урок 3: Жилье и дом', 'البيت والغرف والأثاث، حرفا الجيم والحاء، ضمائر المتكلم والمخاطب (أنا / أنت)', 'البيت والغرف والأثاث، حرفا الجيم والحاء، ضمائر المتكلم والمخاطب (أنا / أنت)', 'Rooms, furniture, letters Jeem & Haa, subject pronouns (Ana / Anta).', 'Дом, комнаты, мебель, буквы Джим и Ха, местоимения (Ана / Анта).', 3);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'الدَّرْسُ الرَّابِعُ: مَعْهَدِي', 'الدَّرْسُ الرَّابِعُ: مَعْهَدِي', 'Lesson 4: My Institute', 'Урок 4: Мой институт', 'المعهد الأزهري والفصول المدرسية والأدوات، حرفا الخاء والدال، وأدوات التشبيه والوصف', 'المعهد الأزهري والفصول المدرسية والأدوات، حرفا الخاء والدال، وأدوات التشبيه والوصف', 'Classrooms, study tools, letters Khaa & Dal, descriptive structures.', 'Классы, учебные принадлежности, буквы Ха и Даль, описательные конструкции.', 4);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', 'الدَّرْسُ الخَامِسُ: الحَيَوَانَاتُ', 'الدَّرْسُ الخَامِسُ: الحَيَوَانَاتُ', 'Lesson 5: Animals', 'Урок 5: Животные', 'حيوانات المزرعة والبيئة، حرفا الذال والراء، التمييز بين المذكر والمؤنث', 'حيوانات المزرعة والبيئة، حرفا الذال والراء، التمييز بين المذكر والمؤنث', 'Domestic animals, letters Thal & Raa, masculine vs feminine nouns.', 'Животные, буквы Заль и Ра, различие мужского и женского рода.', 5);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000006', '11111111-1111-1111-1111-111111111111', 'الدَّرْسُ السَّادِسُ: الطُّيُورُ', 'الدَّرْسُ السَّادِسُ: الطُّيُورُ', 'Lesson 6: Birds', 'Урок 6: Птицы', 'عالم الطيور وأسماؤها وصفاتها، حرفا الزاي والسين، حروف الجر الأساسية', 'عالم الطيور وأسماؤها وصفاتها، حرفا الزاي والسين، حروف الجر الأساسية', 'Birds, traits, letters Zay & Seen, core prepositions (fee, 'ala, min, ila).', 'Птицы, их свойства, буквы Зай и Син, основные предлоги.', 6);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000007', '11111111-1111-1111-1111-111111111111', 'الدَّرْسُ السَّابِعُ: وَسَائِلُ المَوَاصَلَاتِ', 'الدَّرْسُ السَّابِعُ: وَسَائِلُ المَوَاصَلَاتِ', 'Lesson 7: Transportation', 'Урок 7: Транспорт', 'الحافلة، القطار، السيارة، حرفا الشين والصاد، السؤال عن المكان والتوجيهات (أين)', 'الحافلة، القطار، السيارة، حرفا الشين والصاد، السؤال عن المكان والتوجيهات (أين)', 'Bus, train, car, letters Sheen & Saad, spatial queries (Ayna / Where).', 'Транспорт (автобус, поезд, авто), буквы Шин и Сад, вопрос о месте (Айна).', 7);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000008', '11111111-1111-1111-1111-111111111111', 'الدَّرْسُ الثَّامِنُ: فِي الفُنْدُقِ', 'الدَّرْسُ الثَّامِنُ: فِي الفُنْدُقِ', 'Lesson 8: At the Hotel', 'Урок 8: В гостинице', 'حجز الغرفة والخدمات الفندقية، حرفا الضاد والطاء، صيغ الطلب المؤدب (من فضلك / أريد)', 'حجز الغرفة والخدمات الفندقية، حرفا الضاد والطاء، صيغ الطلب المؤدب (من فضلك / أريد)', 'Room booking & hospitality, letters Daad & Taa, polite requests.', 'Бронирование номеров и сервис, буквы Дад и Та, вежливые просьбы.', 8);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000009', '11111111-1111-1111-1111-111111111111', 'الدَّرْسُ التَّاسِعُ: المَطَارُ وَالجَوَازَاتُ', 'الدَّرْسُ التَّاسِعُ: المَطَارُ وَالجَوَازَاتُ', 'Lesson 9: Airport & Passports', 'Урок 9: Аэропорт и паспорта', 'إجراءات السفر والتأشيرة، حرفا الظاء والعين، السؤال عن المواعيد والأزمنة (متى)', 'إجراءات السفر والتأشيرة، حرفا الظاء والعين، السؤال عن المواعيد والأزمنة (متى)', 'Travel formalities, luggage, letters Dhaa & 'Ayn, timing inquiries (Mata / When).', 'Паспортный контроль и багаж, буквы За и Айн, вопрос времени (Мата).', 9);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000010', '11111111-1111-1111-1111-111111111111', 'الدَّرْسُ العَاشِرُ: جِسْمُ الإِنْسَانِ', 'الدَّرْسُ العَاشِرُ: جِسْمُ الإِنْسَانِ', 'Lesson 10: The Human Body', 'Урок 10: Тело человека', 'أعضاء الجسم والحواس، حرفا الغين والفاء، التعبير عن المشاعر والصحة والألم', 'أعضاء الجسم والحواس، حرفا الغين والفاء، التعبير عن المشاعر والصحة والألم', 'Body parts, senses, letters Ghayn & Faa, health & physical feelings.', 'Части тела, чувства, буквы Гайн и Фа, самочувствие и здоровье.', 10);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000011', '11111111-1111-1111-1111-111111111111', 'الدَّرْسُ الحَادِي عَشَرَ: المَلَابِسُ', 'الدَّرْسُ الحَادِي عَشَرَ: المَلَابِسُ', 'Lesson 11: Clothing & Attire', 'Урок 11: Одежда', 'الملابس الصيفية والشتوية، حرفا القاف والكاف، أسماء الألوان وتطابق الصفة والموصوف', 'الملابس الصيفية والشتوية، حرفا القاف والكاف، أسماء الألوان وتطابق الصفة والموصوف', 'Clothes, seasonal wear, letters Qaaf & Kaaf, colors and adjective agreements.', 'Одежда по сезонам, буквы Каф и Кяф, цвета и согласование прилагательных.', 11);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000012', '11111111-1111-1111-1111-111111111111', 'الدَّرْسُ الثَّانِي عَشَرَ: فِي السُّوقِ', 'الدَّرْسُ الثَّانِي عَشَرَ: فِي السُّوقِ', 'Lesson 12: In the Market', 'Урок 12: На рынке', 'التسوق والشراء والأسعار، حرفا اللام والميم، السؤال عن الثمن والمقادير (بكم / كم)', 'التسوق والشراء والأسعار، حرفا اللام والميم، السؤال عن الثمن والمقادير (بكم / كم)', 'Shopping, prices, letters Laam & Meem, price and quantity questions (Bikam / Kam).', 'Покупки и цены, буквы Лям и Мим, вопрос стоимости и количества (Бикам / Кам).', 12);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000013', '11111111-1111-1111-1111-111111111111', 'الدَّرْسُ الثَّالِثُ عَشَرَ: خَضْرَاوَاتٌ وَفَوَاكِهُ', 'الدَّرْسُ الثَّالِثُ عَشَرَ: خَضْرَاوَاتٌ وَفَوَاكِهُ', 'Lesson 13: Vegetables & Fruits', 'Урок 13: Овощи и фрукты', 'أنواع الخضار والفواكه، حرفا النون والهاء، التفضيل والأطعمة المفضلة (أحب / أفضل)', 'أنواع الخضار والفواكه، حرفا النون والهاء، التفضيل والأطعمة المفضلة (أحب / أفضل)', 'Vegetables, fruits, letters Noon & Haa, expressing food preferences (Uhibbu).', 'Овощи и фрукты, буквы Нун и Ха, предпочтения в еде (Ухиббу).', 13);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000014', '11111111-1111-1111-1111-111111111111', 'الدَّرْسُ الرَّابِعُ عَشَرَ: الأَصْدِقَاءُ', 'الدَّرْسُ الرَّابِعُ عَشَرَ: الأَصْدِقَاءُ', 'Lesson 14: Friends & Fellowship', 'Урок 14: Друзья', 'حوارات الصداقة والزيارة، حرف الواو والياء، ضمائر الغائب (هو / هي / هم)', 'حوارات الصداقة والزيارة، حرف الواو والياء، ضمائر الغائب (هو / هي / هم)', 'Friendship, visiting companions, letters Waw & Yaa, 3rd person pronouns (Huwa / Hiya).', 'Дружба, визиты, буквы Вав и Йа, местоимения 3-го лица (Хува / Хийя).', 14);

INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('10000000-0000-0000-0000-000000000015', '11111111-1111-1111-1111-111111111111', 'الدَّرْسُ الخَامِسُ عَشَرَ: النَّادِي', 'الدَّرْسُ الخَامِسُ عَشَرَ: النَّادِي', 'Lesson 15: Sports & The Club', 'Урок 15: Клуб и спорт', 'الرياضة والأنشطة والترويح عن النفس، مراجعة الأصوات والتراكيب العامة للمستوى الأول', 'الرياضة والأنشطة والترويح عن النفس، مراجعة الأصوات والتراكيب العامة للمستوى الأول', 'Sports, activities, hobbies, comprehensive review of Book 1 phonics and syntax.', 'Спорт, активности, хобби, итоговое повторение фонетики и конструкций Книги 1.', 15);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0001-0000-0000-000000000001', '10000000-0000-0000-0000-000000000000', 'عائلة الحروف الهجائية ومخارج الأصوات', 'عائلة الحروف الهجائية ومخارج الأصوات', 'Arabic Alphabet Family & Phonics', 'Семейство букв арабского алфавита и звуки', 'alphabet', 1, 20);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0001-0000-0000-000000000002', '10000000-0000-0000-0000-000000000000', 'التهيئة الصوتية والمفردات المصورة', 'التهيئة الصوتية والمفردات المصورة', 'Phonetic Drill & Illustrated Vocab', 'Фонетическая подготовка с иллюстрациями', 'vocab', 2, 25);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0002-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'الاستماع والتحدث: حوار التعارف في الأزهر', 'الاستماع والتحدث: حوار التعارف في الأزهر', 'Dialogue 1: Meeting at Al-Azhar', 'Диалог 1: Знакомство в Аль-Азхаре', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0002-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'الأصوات والكتابة: حرفا الألف والباء', 'الأصوات والكتابة: حرفا الألف والباء', 'Letters & Sounds: Alif and Baa', 'Звуки и письмо: Буквы Алиф и Ба', 'letter_forms', 2, 25);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0002-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'التراكيب النحوية: أسماء الإشارة (هذا / هذه)', 'التراكيب النحوية: أسماء الإشارة (هذا / هذه)', 'Grammar: Demonstratives (Hatha & Hathihi)', 'Грамматика: Этот и Эта (Хаза и Хазихи)', 'quiz', 3, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0003-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'الاستماع والتحدث: حوار الأسرة وتناول الغداء', 'الاستماع والتحدث: حوار الأسرة وتناول الغداء', 'Dialogue 2: The Family & Dining', 'Диалог 2: Семья и обед', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0003-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'الأصوات والعدد: حرفا التاء والثاء والأعداد (1-10)', 'الأصوات والعدد: حرفا التاء والثاء والأعداد (1-10)', 'Sounds & Numbers: Letters Taa/Thaa & Numbers 1-10', 'Звуки и числа: Буквы Та/Са и числа 1-10', 'letter_forms', 2, 25);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0003-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 'الموقف التعليمي والحوار الأساسي: السَّكَنُ', 'الموقف التعليمي والحوار الأساسي: السَّكَنُ', 'Core Dialogue & Vocabulary: Housing & The Home', 'Основной диалог и лексика: Жилье и дом', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0004-0000-0000-000000000001', '10000000-0000-0000-0000-000000000004', 'الموقف التعليمي والحوار الأساسي: مَعْهَدِي', 'الموقف التعليمي والحوار الأساسي: مَعْهَدِي', 'Core Dialogue & Vocabulary: My Institute', 'Основной диалог и лексика: Мой институт', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0005-0000-0000-000000000001', '10000000-0000-0000-0000-000000000005', 'الموقف التعليمي والحوار الأساسي: الحَيَوَانَاتُ', 'الموقف التعليمي والحوار الأساسي: الحَيَوَانَاتُ', 'Core Dialogue & Vocabulary: Animals', 'Основной диалог и лексика: Животные', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0006-0000-0000-000000000001', '10000000-0000-0000-0000-000000000006', 'الموقف التعليمي والحوار الأساسي: الطُّيُورُ', 'الموقف التعليمي والحوار الأساسي: الطُّيُورُ', 'Core Dialogue & Vocabulary: Birds', 'Основной диалог и лексика: Птицы', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0007-0000-0000-000000000001', '10000000-0000-0000-0000-000000000007', 'الموقف التعليمي والحوار الأساسي: وَسَائِلُ المَوَاصَلَاتِ', 'الموقف التعليمي والحوار الأساسي: وَسَائِلُ المَوَاصَلَاتِ', 'Core Dialogue & Vocabulary: Transportation', 'Основной диалог и лексика: Транспорт', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0008-0000-0000-000000000001', '10000000-0000-0000-0000-000000000008', 'الموقف التعليمي والحوار الأساسي: فِي الفُنْدُقِ', 'الموقف التعليمي والحوار الأساسي: فِي الفُنْدُقِ', 'Core Dialogue & Vocabulary: At the Hotel', 'Основной диалог и лексика: В гостинице', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0009-0000-0000-000000000001', '10000000-0000-0000-0000-000000000009', 'الموقف التعليمي والحوار الأساسي: المَطَارُ وَالجَوَازَاتُ', 'الموقف التعليمي والحوار الأساسي: المَطَارُ وَالجَوَازَاتُ', 'Core Dialogue & Vocabulary: Airport & Passports', 'Основной диалог и лексика: Аэропорт и паспорта', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0010-0000-0000-000000000001', '10000000-0000-0000-0000-000000000010', 'الموقف التعليمي والحوار الأساسي: جِسْمُ الإِنْسَانِ', 'الموقف التعليمي والحوار الأساسي: جِسْمُ الإِنْسَانِ', 'Core Dialogue & Vocabulary: The Human Body', 'Основной диалог и лексика: Тело человека', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0011-0000-0000-000000000001', '10000000-0000-0000-0000-000000000011', 'الموقف التعليمي والحوار الأساسي: المَلَابِسُ', 'الموقف التعليمي والحوار الأساسي: المَلَابِسُ', 'Core Dialogue & Vocabulary: Clothing & Attire', 'Основной диалог и лексика: Одежда', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0012-0000-0000-000000000001', '10000000-0000-0000-0000-000000000012', 'الموقف التعليمي والحوار الأساسي: فِي السُّوقِ', 'الموقف التعليمي والحوار الأساسي: فِي السُّوقِ', 'Core Dialogue & Vocabulary: In the Market', 'Основной диалог и лексика: На рынке', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0013-0000-0000-000000000001', '10000000-0000-0000-0000-000000000013', 'الموقف التعليمي والحوار الأساسي: خَضْرَاوَاتٌ وَفَوَاكِهُ', 'الموقف التعليمي والحوار الأساسي: خَضْرَاوَاتٌ وَفَوَاكِهُ', 'Core Dialogue & Vocabulary: Vegetables & Fruits', 'Основной диалог и лексика: Овощи и фрукты', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0014-0000-0000-000000000001', '10000000-0000-0000-0000-000000000014', 'الموقف التعليمي والحوار الأساسي: الأَصْدِقَاءُ', 'الموقف التعليمي والحوار الأساسي: الأَصْدِقَاءُ', 'Core Dialogue & Vocabulary: Friends & Fellowship', 'Основной диалог и лексика: Друзья', 'vocab', 1, 30);

INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('10000000-0015-0000-0000-000000000001', '10000000-0000-0000-0000-000000000015', 'الموقف التعليمي والحوار الأساسي: النَّادِي', 'الموقف التعليمي والحوار الأساسي: النَّادِي', 'Core Dialogue & Vocabulary: Sports & The Club', 'Основной диалог и лексика: Клуб и спорт', 'vocab', 1, 30);

INSERT INTO exercises (id, lesson_id, question_text, question_ar, question_en, question_ru, arabic_text, transliteration, translation, translation_en, translation_ru, question_type, audio_url, options_json, correct_answer, explanation, explanation_ar, explanation_en, explanation_ru, order_index)
VALUES (
  'e1000000-0001-0000-0000-000000000001',
  '10000000-0002-0000-0000-000000000001',
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
  '10000000-0002-0000-0000-000000000001',
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

INSERT INTO exercises (id, lesson_id, question_text, question_ar, question_en, question_ru, arabic_text, transliteration, translation, translation_en, translation_ru, question_type, audio_url, options_json, correct_answer, explanation, explanation_ar, explanation_en, explanation_ru, order_index)
VALUES (
  'e1000000-0001-0000-0000-000000000003',
  '10000000-0002-0000-0000-000000000001',
  'استمع إلى التعريف بالجنسيات والبلدان: من أين أحمد وبلال؟',
  'استمع إلى التعريف بالجنسيات والبلدان: من أين أحمد وبلال؟',
  'Listen to countries & origins: Where are Ahmed and Bilal from?',
  'Послушайте представление стран: Откуда Ахмед и Биляль?',
  'أَنَا أَحْمَدُ مِنْ أَلْمَانْيَا، وَأَنَا بِلَالٌ مِنْ بَاكِسْتَانَ',
  'Ana Ahmad min Almanya, wa ana Bilal min Pakistan',
  'I am Ahmed from Germany, and I am Bilal from Pakistan',
  'I am Ahmed from Germany, and I am Bilal from Pakistan',
  'Я Ахмед из Германии, а я Биляль из Пакистана',
  'audio_mcq',
  '/audio/tuhfa/bilad.mp3',
  '[{"id": "opt1", "text": "أَنَا أَحْمَدُ مِنْ أَلْمَانْيَا، وَأَنَا بِلَالٌ مِنْ بَاكِسْتَانَ", "transliteration": "Ana Ahmad min Almanya, wa ana Bilal min Pakistan", "text_en": "I am Ahmed from Germany, and I am Bilal from Pakistan", "text_ru": "Я Ахмед из Германии, а я Биляль из Пакистана"}, {"id": "opt2", "text": "أَنَا مِنْ مِصْرَ وَهُوَ مِنْ فَرَنْسَا", "transliteration": "Ana min Misr wa huwa min Faransa", "text_en": "I am from Egypt and he is from France", "text_ru": "Я из Египта, а он из Франции"}, {"id": "opt3", "text": "أَنَا رُوسِيٌّ وَهُوَ تُرْكِيٌّ", "transliteration": "Ana rusiyy wa huwa turkiyy", "text_en": "I am Russian and he is Turkish", "text_ru": "Я русский, а он турок"}, {"id": "opt4", "text": "أَنَا أُسْتَاذٌ وَهُوَ طَبِيبٌ", "transliteration": "Ana ustadh", "text_en": "I am a professor", "text_ru": "Я преподаватель"}]'::jsonb,
  'opt1',
  'في حوار التحفة الأزهرية (ص 18): أحمد من ألمانيا، وبلال من باكستان، والتقيا في القاهرة بالأزهر الشريف.',
  'في حوار التحفة الأزهرية (ص 18): أحمد من ألمانيا، وبلال من باكستان، والتقيا في القاهرة بالأزهر الشريف.',
  'In Al-Tuhfa Dialogue (p. 18): Ahmed is from Germany, Bilal is from Pakistan.',
  'В диалоге книги «Ат-Тухфа» (стр. 18): Ахмед из Германии, а Биляль из Пакистана.',
  3
);