import json

sql_statements = []

sql_statements.append("-- 1. Clean existing exercises, lessons, units, levels")
sql_statements.append("DELETE FROM exercises;")
sql_statements.append("DELETE FROM lessons;")
sql_statements.append("DELETE FROM units;")
sql_statements.append("DELETE FROM levels;")

levels = [
    {
        "id": "11111111-1111-1111-1111-111111111111",
        "slug": "level-1-novice-1",
        "title": "الكتاب الأول: المستوى المبتدئ الأول",
        "title_ar": "الكتاب الأول: المستوى المبتدئ الأول",
        "title_en": "Book 1: Novice Level 1 (Al-Tuhfa)",
        "title_ru": "Книга 1: Начальный уровень 1 (Ат-Тухфа)",
        "description": "التهيئة الصوتية والهجائية و15 درساً وموقفاً حياتياً للمحادثة والتراكيب اليومية المباشرة",
        "description_ar": "التهيئة الصوتية والهجائية و15 درساً وموقفاً حياتياً للمحادثة والتراكيب اليومية المباشرة",
        "description_en": "Phonetic & alphabet preparation with 15 practical life situations for conversation & core syntax.",
        "description_ru": "Фонетическая и алфавитная подготовка с 15 жизненными ситуациями для диалога и базовых конструкций.",
        "order_index": 1,
        "is_free": True,
        "icon": "BookOpen"
    },
    {
        "id": "22222222-2222-2222-2222-222222222222",
        "slug": "level-2-novice-2",
        "title": "الكتاب الثاني: المستوى المبتدئ الثاني",
        "title_ar": "الكتاب الثاني: المستوى المبتدئ الثاني",
        "title_en": "Book 2: Novice Level 2",
        "title_ru": "Книга 2: Начальный уровень 2",
        "description": "توسيع دائرة المفردات، التراكيب الإضافية، الحوارات الموسعة وقواعد النحو التأسيسية",
        "description_ar": "توسيع دائرة المفردات، التراكيب الإضافية، الحوارات الموسعة وقواعد النحو التأسيسية",
        "description_en": "Expanding vocabulary, complex dialogues, and essential foundational Arabic grammar.",
        "description_ru": "Расширение словарного запаса, углубленные диалоги и базовые правила грамматики.",
        "order_index": 2,
        "is_free": True,
        "icon": "Layers"
    },
    {
        "id": "33333333-3333-3333-3333-333333333333",
        "slug": "level-3-intermediate-1",
        "title": "الكتاب الثالث: المستوى المتوسط الأول",
        "title_ar": "الكتاب الثالث: المستوى المتوسط الأول",
        "title_en": "Book 3: Intermediate Level 1",
        "title_ru": "Книга 3: Средний уровень 1",
        "description": "النصوص القرائية المتصلة، القواعد الصرفية، والتعبير الشفهي والكتابي السليم",
        "description_ar": "النصوص القرائية المتصلة، القواعد الصرفية، والتعبير الشفهي والكتابي السليم",
        "description_en": "Connected reading texts, morphological rules, and fluent oral & written expression.",
        "description_ru": "Связные тексты для чтения, основы морфологии, устная и письменная речь.",
        "order_index": 3,
        "is_free": True,
        "icon": "Compass"
    },
    {
        "id": "44444444-4444-4444-4444-444444444444",
        "slug": "level-4-intermediate-2",
        "title": "الكتاب الرابع: المستوى المتوسط الثاني",
        "title_ar": "الكتاب الرابع: المستوى المتوسط الثاني",
        "title_en": "Book 4: Intermediate Level 2",
        "title_ru": "Книга 4: Средний уровень 2",
        "description": "الأساليب البلاغية، فهم النصوص التراثية والثقافية، وإعراب التراكيب المعقدة",
        "description_ar": "الأساليب البلاغية، فهم النصوص التراثية والثقافية، وإعراب التراكيب المعقدة",
        "description_en": "Rhetorical styles, classical & cultural comprehension, and advanced sentence parsing.",
        "description_ru": "Риторические стили, понимание классических текстов и синтаксический разбор.",
        "order_index": 4,
        "is_free": True,
        "icon": "Award"
    },
    {
        "id": "55555555-5555-5555-5555-555555555555",
        "slug": "level-5-advanced-1",
        "title": "الكتاب الخامس: المستوى المتقدم الأول",
        "title_ar": "الكتاب الخامس: المستوى المتقدم الأول",
        "title_en": "Book 5: Advanced Level 1",
        "title_ru": "Книга 5: Продвинутый уровень 1",
        "description": "دراسة أصول الفصاحة، التحليل الأدبي، والتراكيب القرآنية الرفيعة",
        "description_ar": "دراسة أصول الفصاحة، التحليل الأدبي، والتراكيب القرآنية الرفيعة",
        "description_en": "Literary analysis, eloquence principles, and elevated Quranic expressions.",
        "description_ru": "Литературный анализ, принципы красноречия и коранические конструкции высшего порядка.",
        "order_index": 5,
        "is_free": True,
        "icon": "Sparkles"
    },
    {
        "id": "66666666-6666-6666-6666-666666666666",
        "slug": "level-6-advanced-2",
        "title": "الكتاب السادس: المستوى المتقدم الثاني",
        "title_ar": "الكتاب السادس: المستوى المتقدم الثاني",
        "title_en": "Book 6: Advanced Level 2",
        "title_ru": "Книга 6: Продвинутый уровень 2",
        "description": "الإتقان والتمكن التام، البلاغة والإعجاز البياني، والمناظرة والتعبير الأكاديمي",
        "description_ar": "الإتقان والتمكن التام، البلاغة والإعجاز البياني، والمناظرة والتعبير الأكاديمي",
        "description_en": "Complete mastery, linguistic inimitability, academic presentation, and debate.",
        "description_ru": "Полное мастерство, лингвистическое совершенство, академическое письмо и дебаты.",
        "order_index": 6,
        "is_free": True,
        "icon": "GraduationCap"
    }
]

for l in levels:
    sql_statements.append(f"""INSERT INTO levels (id, slug, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index, is_free, icon)
VALUES ('{l["id"]}', '{l["slug"]}', '{l["title"]}', '{l["title_ar"]}', '{l["title_en"]}', '{l["title_ru"]}', '{l["description"]}', '{l["description_ar"]}', '{l["description_en"]}', '{l["description_ru"]}', {l["order_index"]}, {str(l["is_free"]).lower()}, '{l["icon"]}');""")

book1_units = [
    {
        "title_ar": "التمهيد: الأصوات الهجائية والتهيئة المصورة",
        "title_en": "Prep: Alphabet Phonics & Visual Drill",
        "title_ru": "Введение: Алфавит и звуковые иллюстрации",
        "desc_ar": "عائلة الحروف الهجائية، مخارج الحروف، الحركات القصيرة والطويلة، والتهيئة المصورة",
        "desc_en": "Arabic alphabet family, letter exits, short/long vowels, and illustrated phonetic introduction.",
        "desc_ru": "Алфавит, артикуляция звуков, краткие и долгие гласные, иллюстрированное введение."
    },
    {
        "title_ar": "الدَّرْسُ الأَوَّلُ: تَحِيَّةٌ وَتَعَارُفٌ",
        "title_en": "Lesson 1: Greetings & Introductions",
        "title_ru": "Урок 1: Приветствие и знакомство",
        "desc_ar": "حوار التعارف في الأزهر الشريف، حرفا الألف والباء، وأسماء الإشارة (هذا / هذه)",
        "desc_en": "Meeting at Al-Azhar, letters Alif & Baa, demonstrative pronouns (Hatha / Hathihi).",
        "desc_ru": "Знакомство в Аль-Азхаре, буквы Алиф и Ба, указательные местоимения (Хаза / Хазихи)."
    },
    {
        "title_ar": "الدَّرْسُ الثَّانِي: الأُسْرَةُ",
        "title_en": "Lesson 2: The Family",
        "title_ru": "Урок 2: Семья",
        "desc_ar": "حوار الأسرة وإعداد الغداء، حرفا التاء والثاء، التاء المربوطة، وأدوات الاستفهام (هل / ما)",
        "desc_en": "Family & lunch preparation, letters Taa & Thaa, Ta-marbuta, question tools (Hal / Ma).",
        "desc_ru": "Семья и обед, буквы Та и Са, Та-марбута, вопросительные частицы (Халь / Ма)."
    },
    {
        "title_ar": "الدَّرْسُ الثَّالِثُ: السَّكَنُ",
        "title_en": "Lesson 3: Housing & The Home",
        "title_ru": "Урок 3: Жилье и дом",
        "desc_ar": "البيت والغرف والأثاث، حرفا الجيم والحاء، ضمائر المتكلم والمخاطب (أنا / أنت)",
        "desc_en": "Rooms, furniture, letters Jeem & Haa, subject pronouns (Ana / Anta).",
        "desc_ru": "Дом, комнаты, мебель, буквы Джим и Ха, местоимения (Ана / Анта)."
    },
    {
        "title_ar": "الدَّرْسُ الرَّابِعُ: مَعْهَدِي",
        "title_en": "Lesson 4: My Institute",
        "title_ru": "Урок 4: Мой институт",
        "desc_ar": "المعهد الأزهري والفصول المدرسية والأدوات، حرفا الخاء والدال، وأدوات التشبيه والوصف",
        "desc_en": "Classrooms, study tools, letters Khaa & Dal, descriptive structures.",
        "desc_ru": "Классы, учебные принадлежности, буквы Ха и Даль, описательные конструкции."
    },
    {
        "title_ar": "الدَّرْسُ الخَامِسُ: الحَيَوَانَاتُ",
        "title_en": "Lesson 5: Animals",
        "title_ru": "Урок 5: Животные",
        "desc_ar": "حيوانات المزرعة والبيئة، حرفا الذال والراء، التمييز بين المذكر والمؤنث",
        "desc_en": "Domestic animals, letters Thal & Raa, masculine vs feminine nouns.",
        "desc_ru": "Животные, буквы Заль и Ра, различие мужского и женского рода."
    },
    {
        "title_ar": "الدَّرْسُ السَّادِسُ: الطُّيُورُ",
        "title_en": "Lesson 6: Birds",
        "title_ru": "Урок 6: Птицы",
        "desc_ar": "عالم الطيور وأسماؤها وصفاتها، حرفا الزاي والسين، حروف الجر الأساسية",
        "desc_en": "Birds, traits, letters Zay & Seen, core prepositions (fee, 'ala, min, ila).",
        "desc_ru": "Птицы, их свойства, буквы Зай и Син, основные предлоги."
    },
    {
        "title_ar": "الدَّرْسُ السَّابِعُ: وَسَائِلُ المَوَاصَلَاتِ",
        "title_en": "Lesson 7: Transportation",
        "title_ru": "Урок 7: Транспорт",
        "desc_ar": "الحافلة، القطار، السيارة، حرفا الشين والصاد، السؤال عن المكان والتوجيهات (أين)",
        "desc_en": "Bus, train, car, letters Sheen & Saad, spatial queries (Ayna / Where).",
        "desc_ru": "Транспорт (автобус, поезд, авто), буквы Шин и Сад, вопрос о месте (Айна)."
    },
    {
        "title_ar": "الدَّرْسُ الثَّامِنُ: فِي الفُنْدُقِ",
        "title_en": "Lesson 8: At the Hotel",
        "title_ru": "Урок 8: В гостинице",
        "desc_ar": "حجز الغرفة والخدمات الفندقية، حرفا الضاد والطاء، صيغ الطلب المؤدب (من فضلك / أريد)",
        "desc_en": "Room booking & hospitality, letters Daad & Taa, polite requests.",
        "desc_ru": "Бронирование номеров и сервис, буквы Дад и Та, вежливые просьбы."
    },
    {
        "title_ar": "الدَّرْسُ التَّاسِعُ: المَطَارُ وَالجَوَازَاتُ",
        "title_en": "Lesson 9: Airport & Passports",
        "title_ru": "Урок 9: Аэропорт и паспорта",
        "desc_ar": "إجراءات السفر والتأشيرة، حرفا الظاء والعين، السؤال عن المواعيد والأزمنة (متى)",
        "desc_en": "Travel formalities, luggage, letters Dhaa & 'Ayn, timing inquiries (Mata / When).",
        "desc_ru": "Паспортный контроль и багаж, буквы За и Айн, вопрос времени (Мата)."
    },
    {
        "title_ar": "الدَّرْسُ العَاشِرُ: جِسْمُ الإِنْسَانِ",
        "title_en": "Lesson 10: The Human Body",
        "title_ru": "Урок 10: Тело человека",
        "desc_ar": "أعضاء الجسم والحواس، حرفا الغين والفاء، التعبير عن المشاعر والصحة والألم",
        "desc_en": "Body parts, senses, letters Ghayn & Faa, health & physical feelings.",
        "desc_ru": "Части тела, чувства, буквы Гайн и Фа, самочувствие и здоровье."
    },
    {
        "title_ar": "الدَّرْسُ الحَادِي عَشَرَ: المَلَابِسُ",
        "title_en": "Lesson 11: Clothing & Attire",
        "title_ru": "Урок 11: Одежда",
        "desc_ar": "الملابس الصيفية والشتوية، حرفا القاف والكاف، أسماء الألوان وتطابق الصفة والموصوف",
        "desc_en": "Clothes, seasonal wear, letters Qaaf & Kaaf, colors and adjective agreements.",
        "desc_ru": "Одежда по сезонам, буквы Каф и Кяф, цвета и согласование прилагательных."
    },
    {
        "title_ar": "الدَّرْسُ الثَّانِي عَشَرَ: فِي السُّوقِ",
        "title_en": "Lesson 12: In the Market",
        "title_ru": "Урок 12: На рынке",
        "desc_ar": "التسوق والشراء والأسعار، حرفا اللام والميم، السؤال عن الثمن والمقادير (بكم / كم)",
        "desc_en": "Shopping, prices, letters Laam & Meem, price and quantity questions (Bikam / Kam).",
        "desc_ru": "Покупки и цены, буквы Лям и Мим, вопрос стоимости и количества (Бикам / Кам)."
    },
    {
        "title_ar": "الدَّرْسُ الثَّالِثُ عَشَرَ: خَضْرَاوَاتٌ وَفَوَاكِهُ",
        "title_en": "Lesson 13: Vegetables & Fruits",
        "title_ru": "Урок 13: Овощи и фрукты",
        "desc_ar": "أنواع الخضار والفواكه، حرفا النون والهاء، التفضيل والأطعمة المفضلة (أحب / أفضل)",
        "desc_en": "Vegetables, fruits, letters Noon & Haa, expressing food preferences (Uhibbu).",
        "desc_ru": "Овощи и фрукты, буквы Нун и Ха, предпочтения в еде (Ухиббу)."
    },
    {
        "title_ar": "الدَّرْسُ الرَّابِعُ عَشَرَ: الأَصْدِقَاءُ",
        "title_en": "Lesson 14: Friends & Fellowship",
        "title_ru": "Урок 14: Друзья",
        "desc_ar": "حوارات الصداقة والزيارة، حرف الواو والياء، ضمائر الغائب (هو / هي / هم)",
        "desc_en": "Friendship, visiting companions, letters Waw & Yaa, 3rd person pronouns (Huwa / Hiya).",
        "desc_ru": "Дружба, визиты, буквы Вав и Йа, местоимения 3-го лица (Хува / Хийя)."
    },
    {
        "title_ar": "الدَّرْسُ الخَامِسُ عَشَرَ: النَّادِي",
        "title_en": "Lesson 15: Sports & The Club",
        "title_ru": "Урок 15: Клуб и спорт",
        "desc_ar": "الرياضة والأنشطة والترويح عن النفس، مراجعة الأصوات والتراكيب العامة للمستوى الأول",
        "desc_en": "Sports, activities, hobbies, comprehensive review of Book 1 phonics and syntax.",
        "desc_ru": "Спорт, активности, хобби, итоговое повторение фонетики и конструкций Книги 1."
    }
]

level_1_id = "11111111-1111-1111-1111-111111111111"

unit_ids = []
for idx, u_info in enumerate(book1_units):
    unit_id = f"10000000-0000-0000-0000-{idx:012d}"
    unit_ids.append(unit_id)
    sql_statements.append(f"""INSERT INTO units (id, level_id, title, title_ar, title_en, title_ru, description, description_ar, description_en, description_ru, order_index)
VALUES ('{unit_id}', '{level_1_id}', '{u_info["title_ar"]}', '{u_info["title_ar"]}', '{u_info["title_en"]}', '{u_info["title_ru"]}', '{u_info["desc_ar"]}', '{u_info["desc_ar"]}', '{u_info["desc_en"]}', '{u_info["desc_ru"]}', {idx});""")

# Unit 0 lessons
u0_id = unit_ids[0]
l_u0_1 = "10000000-0001-0000-0000-000000000001"
l_u0_2 = "10000000-0001-0000-0000-000000000002"
sql_statements.append(f"""INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('{l_u0_1}', '{u0_id}', 'عائلة الحروف الهجائية ومخارج الأصوات', 'عائلة الحروف الهجائية ومخارج الأصوات', 'Arabic Alphabet Family & Phonics', 'Семейство букв арабского алфавита и звуки', 'alphabet', 1, 20);""")
sql_statements.append(f"""INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('{l_u0_2}', '{u0_id}', 'التهيئة الصوتية والمفردات المصورة', 'التهيئة الصوتية والمفردات المصورة', 'Phonetic Drill & Illustrated Vocab', 'Фонетическая подготовка с иллюстрациями', 'vocab', 2, 25);""")

# Unit 1 lessons
u1_id = unit_ids[1]
l_u1_1 = "10000000-0002-0000-0000-000000000001"
l_u1_2 = "10000000-0002-0000-0000-000000000002"
l_u1_3 = "10000000-0002-0000-0000-000000000003"
sql_statements.append(f"""INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('{l_u1_1}', '{u1_id}', 'الاستماع والتحدث: حوار التعارف في الأزهر', 'الاستماع والتحدث: حوار التعارف في الأزهر', 'Dialogue 1: Meeting at Al-Azhar', 'Диалог 1: Знакомство в Аль-Азхаре', 'vocab', 1, 30);""")
sql_statements.append(f"""INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('{l_u1_2}', '{u1_id}', 'الأصوات والكتابة: حرفا الألف والباء', 'الأصوات والكتابة: حرفا الألف والباء', 'Letters & Sounds: Alif and Baa', 'Звуки и письмо: Буквы Алиф и Ба', 'letter_forms', 2, 25);""")
sql_statements.append(f"""INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('{l_u1_3}', '{u1_id}', 'التراكيب النحوية: أسماء الإشارة (هذا / هذه)', 'التراكيب النحوية: أسماء الإشارة (هذا / هذه)', 'Grammar: Demonstratives (Hatha & Hathihi)', 'Грамматика: Этот и Эта (Хаза и Хазихи)', 'quiz', 3, 30);""")

# Unit 2 lessons
u2_id = unit_ids[2]
l_u2_1 = "10000000-0003-0000-0000-000000000001"
l_u2_2 = "10000000-0003-0000-0000-000000000002"
sql_statements.append(f"""INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('{l_u2_1}', '{u2_id}', 'الاستماع والتحدث: حوار الأسرة وتناول الغداء', 'الاستماع والتحدث: حوار الأسرة وتناول الغداء', 'Dialogue 2: The Family & Dining', 'Диалог 2: Семья и обед', 'vocab', 1, 30);""")
sql_statements.append(f"""INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('{l_u2_2}', '{u2_id}', 'الأصوات والعدد: حرفا التاء والثاء والأعداد (1-10)', 'الأصوات والعدد: حرفا التاء والثاء والأعداد (1-10)', 'Sounds & Numbers: Letters Taa/Thaa & Numbers 1-10', 'Звуки и числа: Буквы Та/Са и числа 1-10', 'letter_forms', 2, 25);""")

# Units 3 to 15 default lessons
for idx in range(3, 16):
    u_curr_id = unit_ids[idx]
    u_title = book1_units[idx]["title_ar"].split(":")[-1].strip()
    u_title_en = book1_units[idx]["title_en"].split(":")[-1].strip()
    u_title_ru = book1_units[idx]["title_ru"].split(":")[-1].strip()
    l_id = f"10000000-{idx:04d}-0000-0000-000000000001"
    sql_statements.append(f"""INSERT INTO lessons (id, unit_id, title, title_ar, title_en, title_ru, lesson_type, order_index, xp_reward)
VALUES ('{l_id}', '{u_curr_id}', 'الموقف التعليمي والحوار الأساسي: {u_title}', 'الموقف التعليمي والحوار الأساسي: {u_title}', 'Core Dialogue & Vocabulary: {u_title_en}', 'Основной диалог и лексика: {u_title_ru}', 'vocab', 1, 30);""")

ex1_options = [
    {"id": "opt1", "text": "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ", "transliteration": "Wa alaykumus-salam wa rahmatullah", "text_en": "And upon you be peace and Allah's mercy", "text_ru": "И вам мир и милость Аллаха"},
    {"id": "opt2", "text": "أَهْلاً وَسَهْلاً بِكَ", "transliteration": "Ahlan wa sahlan bik", "text_en": "Welcome to you", "text_ru": "Добро пожаловать"},
    {"id": "opt3", "text": "إِلَى اللِّقَاءِ يَا أَخِي", "transliteration": "Ila al-liqa' ya akhi", "text_en": "See you later, brother", "text_ru": "До встречи, брат"},
    {"id": "opt4", "text": "صَبَاحُ الخَيْرِ وَالنُّورِ", "transliteration": "Sabah al-khayr", "text_en": "Good morning", "text_ru": "Доброе утро"}
]
ex1_opts_str = json.dumps(ex1_options, ensure_ascii=False).replace("'", "''")

sql_statements.append(f"""INSERT INTO exercises (id, lesson_id, question_text, question_ar, question_en, question_ru, arabic_text, transliteration, translation, translation_en, translation_ru, question_type, audio_url, options_json, correct_answer, explanation, explanation_ar, explanation_en, explanation_ru, order_index)
VALUES (
  'e1000000-0001-0000-0000-000000000001',
  '{l_u1_1}',
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
  '{ex1_opts_str}'::jsonb,
  'opt1',
  'في حوار الدرس الأول (التحفة الأزهرية): رد بلال هو: وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ.',
  'في حوار الدرس الأول (التحفة الأزهرية): رد بلال هو: وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ.',
  'In Lesson 1 dialogue (Al-Tuhfa): Bilal replies: Wa alaykumus-salam wa rahmatullahi wa barakatuh.',
  'В диалоге 1-го урока («Ат-Тухфа»): Биляль отвечает: «Ва алейкумус-салям ва рахматуллахи ва баракатух».',
  1
);""")

ex2_options = [
    {"id": "opt1", "text": "لِأَتَعَلَّمَ فِي الأَزْهَرِ الشَّرِيفِ", "transliteration": "Li-ata'allama fil-Azhar ash-Sharif", "text_en": "To study at Al-Azhar Al-Sharif", "text_ru": "Чтобы учиться в благородном Аль-Азхаре"},
    {"id": "opt2", "text": "لِزِيَارَةِ الأَهْرَامَاتِ", "transliteration": "Li-ziyaratil-ahramat", "text_en": "To visit the Pyramids", "text_ru": "Чтобы посетить пирамиды"},
    {"id": "opt3", "text": "لِلْعَمَلِ فِي التِّجَارَةِ", "transliteration": "Lil-'amali fit-tijarah", "text_en": "To work in commerce", "text_ru": "Для работы в торговле"},
    {"id": "opt4", "text": "لِلْعِلَاجِ فِي المُسْتَشْفَى", "transliteration": "Lil-'ilaj", "text_en": "For medical treatment", "text_ru": "Для лечения"}
]
ex2_opts_str = json.dumps(ex2_options, ensure_ascii=False).replace("'", "''")

sql_statements.append(f"""INSERT INTO exercises (id, lesson_id, question_text, question_ar, question_en, question_ru, arabic_text, transliteration, translation, translation_en, translation_ru, question_type, audio_url, options_json, correct_answer, explanation, explanation_ar, explanation_en, explanation_ru, order_index)
VALUES (
  'e1000000-0001-0000-0000-000000000002',
  '{l_u1_1}',
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
  '{ex2_opts_str}'::jsonb,
  'opt1',
  'أجاب بلال: (لِأَتَعَلَّمَ فِي الأَزْهَرِ الشَّرِيفِ)، وهو الهدف السامي لدارسي سلسلة التحفة الأزهرية.',
  'أجاب بلال: (لِأَتَعَلَّمَ فِي الأَزْهَرِ الشَّرِيفِ)، وهو الهدف السامي لدارسي سلسلة التحفة الأزهرية.',
  'Bilal answered: (To study at Al-Azhar Al-Sharif), the primary goal of students of this series.',
  'Биляль ответил: «Чтобы учиться в благородном Аль-Азхаре».',
  2
);""")

ex3_options = [
    {"id": "opt1", "text": "أَنَا أَحْمَدُ مِنْ أَلْمَانْيَا، وَأَنَا بِلَالٌ مِنْ بَاكِسْتَانَ", "transliteration": "Ana Ahmad min Almanya, wa ana Bilal min Pakistan", "text_en": "I am Ahmed from Germany, and I am Bilal from Pakistan", "text_ru": "Я Ахмед из Германии, а я Биляль из Пакистана"},
    {"id": "opt2", "text": "أَنَا مِنْ مِصْرَ وَهُوَ مِنْ فَرَنْسَا", "transliteration": "Ana min Misr wa huwa min Faransa", "text_en": "I am from Egypt and he is from France", "text_ru": "Я из Египта, а он из Франции"},
    {"id": "opt3", "text": "أَنَا رُوسِيٌّ وَهُوَ تُرْكِيٌّ", "transliteration": "Ana rusiyy wa huwa turkiyy", "text_en": "I am Russian and he is Turkish", "text_ru": "Я русский, а он турок"},
    {"id": "opt4", "text": "أَنَا أُسْتَاذٌ وَهُوَ طَبِيبٌ", "transliteration": "Ana ustadh", "text_en": "I am a professor", "text_ru": "Я преподаватель"}
]
ex3_opts_str = json.dumps(ex3_options, ensure_ascii=False).replace("'", "''")

sql_statements.append(f"""INSERT INTO exercises (id, lesson_id, question_text, question_ar, question_en, question_ru, arabic_text, transliteration, translation, translation_en, translation_ru, question_type, audio_url, options_json, correct_answer, explanation, explanation_ar, explanation_en, explanation_ru, order_index)
VALUES (
  'e1000000-0001-0000-0000-000000000003',
  '{l_u1_1}',
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
  '{ex3_opts_str}'::jsonb,
  'opt1',
  'في حوار التحفة الأزهرية (ص 18): أحمد من ألمانيا، وبلال من باكستان، والتقيا في القاهرة بالأزهر الشريف.',
  'في حوار التحفة الأزهرية (ص 18): أحمد من ألمانيا، وبلال من باكستان، والتقيا في القاهرة بالأزهر الشريف.',
  'In Al-Tuhfa Dialogue (p. 18): Ahmed is from Germany, Bilal is from Pakistan.',
  'В диалоге книги «Ат-Тухфа» (стр. 18): Ахмед из Германии, а Биляль из Пакистана.',
  3
);""")

with open('/var/www/html/quranic-arabic/scripts/seed_tuhfa.sql', 'w', encoding='utf-8') as f:
    f.write("\n\n".join(sql_statements))

print("SQL script generated successfully!")
