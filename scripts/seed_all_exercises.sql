DELETE FROM exercises;

INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0001-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'استمع إلى نطق الحرف: ما هو الحرف الهجائي المسموع؟', 'استمع إلى نطق الحرف: ما هو الحرف الهجائي المسموع؟', 'Listen to the letter sound: Which Arabic alphabet letter is played?', 'Послушайте звук: Какая арабская буква звучит?',
    'أَلِف', 'Alif', 'Letter Alif', 'Letter Alif', 'Буква Алиф',
    'audio_mcq', '/audio/letters/alif.mp3', '[{"id": "opt1", "text": "أ (أَلِف)", "transliteration": "Alif", "text_en": "Alif", "text_ru": "Алиф"}, {"id": "opt2", "text": "ب (بَاء)", "transliteration": "Baa", "text_en": "Baa", "text_ru": "Ба"}, {"id": "opt3", "text": "ت (تَاء)", "transliteration": "Taa", "text_en": "Taa", "text_ru": "Та"}, {"id": "opt4", "text": "ث (ثَاء)", "transliteration": "Thaa", "text_en": "Thaa", "text_ru": "Са"}]'::jsonb, 'opt1',
    'الصوت المسموع هو حرف الألف (أ)، أول حروف الهجاء العربية.', 'الصوت المسموع هو حرف الألف (أ)، أول حروف الهجاء العربية.', 'The sound heard is the letter Alif (أ), the first letter of Arabic.', 'Звучит буква Алиф (أ) — первая буква арабского алфавита.', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0001-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'استمع إلى الصوت: ما هو الحرف المسموع؟', 'استمع إلى الصوت: ما هو الحرف المسموع؟', 'Listen to the sound: Which letter is heard?', 'Послушайте звук: Какая буква звучит?',
    'بَاء', 'Baa', 'Letter Baa', 'Letter Baa', 'Буква Ба',
    'audio_mcq', '/audio/letters/baa.mp3', '[{"id": "opt1", "text": "ب (بَاء)", "transliteration": "Baa", "text_en": "Baa", "text_ru": "Ба"}, {"id": "opt2", "text": "ت (تَاء)", "transliteration": "Taa", "text_en": "Taa", "text_ru": "Та"}, {"id": "opt3", "text": "ن (نُون)", "transliteration": "Noon", "text_en": "Noon", "text_ru": "Нун"}, {"id": "opt4", "text": "ي (يَاء)", "transliteration": "Yaa", "text_en": "Yaa", "text_ru": "Йа"}]'::jsonb, 'opt1',
    'الصوت المسموع هو حرف الباء (ب) بنقطة واحدة تحته.', 'الصوت المسموع هو حرف الباء (ب) بنقطة واحدة تحته.', 'The sound heard is Baa (ب) with one dot below.', 'Звучит буква Ба (ب) с одной точкой снизу.', 2
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0001-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000001', 'استمع إلى مخرج الحرف من وسط الحلق: ما هو هذا الحرف؟', 'استمع إلى مخرج الحرف من وسط الحلق: ما هو هذا الحرف؟', 'Listen to the throat sound: Which letter is articulated?', 'Послушайте гортанный звук: Какая это буква?',
    'حَاء', 'Haa (pharyngeal)', 'Letter Haa', 'Letter Haa', 'Буква Ха',
    'audio_mcq', '/audio/letters/haa.mp3', '[{"id": "opt1", "text": "ح (حَاء)", "transliteration": "Haa", "text_en": "Haa", "text_ru": "Ха (мягкая)"}, {"id": "opt2", "text": "خ (خَاء)", "transliteration": "Khaa", "text_en": "Khaa", "text_ru": "Ха (твердая)"}, {"id": "opt3", "text": "ج (جِيم)", "transliteration": "Jeem", "text_en": "Jeem", "text_ru": "Джим"}, {"id": "opt4", "text": "هـ (هَاء)", "transliteration": "Haa", "text_en": "Haa (glottal)", "text_ru": "Ха (воздушная)"}]'::jsonb, 'opt1',
    'الصوت هو حرف الحاء (ح) من وسط الحلق.', 'الصوت هو حرف الحاء (ح) من وسط الحلق.', 'The sound is Haa (ح) from the middle throat.', 'Звук буквы Ха (ح) из средней части гортани.', 3
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0001-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000001', 'استمع إلى النطق: ما هو الحرف الهجائي المسموع؟', 'استمع إلى النطق: ما هو الحرف الهجائي المسموع؟', 'Listen to the letter: Which alphabet letter is heard?', 'Послушайте звук: Какая буква звучит?',
    'جِيم', 'Jeem', 'Letter Jeem', 'Letter Jeem', 'Буква Джим',
    'audio_mcq', '/audio/letters/jeem.mp3', '[{"id": "opt1", "text": "ج (جِيم)", "transliteration": "Jeem", "text_en": "Jeem", "text_ru": "Джим"}, {"id": "opt2", "text": "د (دَال)", "transliteration": "Daal", "text_en": "Daal", "text_ru": "Даль"}, {"id": "opt3", "text": "ر (رَاء)", "transliteration": "Raa", "text_en": "Raa", "text_ru": "Ра"}, {"id": "opt4", "text": "ز (زَاي)", "transliteration": "Zaay", "text_en": "Zaay", "text_ru": "Зай"}]'::jsonb, 'opt1',
    'الصوت المسموع هو حرف الجيم (ج).', 'الصوت المسموع هو حرف الجيم (ج).', 'The sound is Jeem (ج).', 'Звучит буква Джим (ج).', 4
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0002-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', 'استمع إلى الكلمة المصورة: ما هي الكلمة الصحيحة المطابقة؟', 'استمع إلى الكلمة المصورة: ما هي الكلمة الصحيحة المطابقة؟', 'Listen to the word: Which matching Arabic word is spoken?', 'Послушайте слово: Какое слово звучит?',
    'كِتَابٌ', 'Kitaab', 'A Book', 'A Book', 'Книга',
    'audio_mcq', '/audio/words/kitaab.mp3', '[{"id": "opt1", "text": "كِتَابٌ", "transliteration": "Kitaab", "text_en": "Book", "text_ru": "Книга"}, {"id": "opt2", "text": "بَابٌ", "transliteration": "Baab", "text_en": "Door", "text_ru": "Дверь"}, {"id": "opt3", "text": "قَلَمٌ", "transliteration": "Qalam", "text_en": "Pen", "text_ru": "Ручка"}, {"id": "opt4", "text": "بَيْتٌ", "transliteration": "Bayt", "text_en": "House", "text_ru": "Дом"}]'::jsonb, 'opt1',
    'الكلمة المسموعة هي (كِتَابٌ) وتبدأ بحرف الكاف المكسور.', 'الكلمة المسموعة هي (كِتَابٌ) وتبدأ بحرف الكاف المكسور.', 'The spoken word is Kitaab (كِتَابٌ) meaning Book.', 'Звучит слово «Китаб» (كِتَابٌ) — Книга.', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0002-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000002', 'استمع إلى النطق: ما هو المعنى المقابل للفظ المسموع؟', 'استمع إلى النطق: ما هو المعنى المقابل للفظ المسموع؟', 'Listen to the word: What is the meaning of the spoken word?', 'Послушайте произношение: Каково значение звучащего слова?',
    'بِنْتٌ', 'Bint', 'Girl / Daughter', 'Girl / Daughter', 'Девочка',
    'audio_mcq', '/audio/words/bint.mp3', '[{"id": "opt1", "text": "بِنْتٌ (فتاة)", "transliteration": "Bint", "text_en": "Girl", "text_ru": "Девочка"}, {"id": "opt2", "text": "وَلَدٌ (صبي)", "transliteration": "Walad", "text_en": "Boy", "text_ru": "Мальчик"}, {"id": "opt3", "text": "أُمٌّ (والدة)", "transliteration": "Umm", "text_en": "Mother", "text_ru": "Мать"}, {"id": "opt4", "text": "أَبٌ (والد)", "transliteration": "Ab", "text_en": "Father", "text_ru": "Отец"}]'::jsonb, 'opt1',
    'اللفظ المسموع هو (بِنْتٌ) ومعناها فتاة أو ابنة.', 'اللفظ المسموع هو (بِنْتٌ) ومعناها فتاة أو ابنة.', 'The spoken word is Bint (بِنْتٌ), meaning Girl.', 'Звучит слово «Бинт» (بِنْتٌ) — Девочка.', 2
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0003-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000003', 'استمع إلى تحية أحمد في حوار الدرس الأول من (التحفة الأزهرية): ما هو الرد المطابق المسموع؟', 'استمع إلى تحية أحمد في حوار الدرس الأول من (التحفة الأزهرية): ما هو الرد المطابق المسموع؟', 'Listen to Ahmed''s greeting in Lesson 1 of Al-Tuhfa: What is the exact matching response?', 'Послушайте приветствие Ахмеда в Уроке 1 книги «Ат-Тухфа»: Каков точный ответ?',
    'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ', 'As-salamu alaykum wa rahmatullahi wa barakatuh', 'Peace be upon you and the mercy of Allah and His blessings', 'Peace be upon you and the mercy of Allah and His blessings', 'Мир вам, милость Аллаха и Его благословение',
    'audio_mcq', '/audio/tuhfa/salam_full.mp3', '[{"id": "opt1", "text": "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ", "transliteration": "Wa alaykumus-salam wa rahmatullah", "text_en": "And upon you be peace and Allah''s mercy", "text_ru": "И вам мир и милость Аллаха"}, {"id": "opt2", "text": "أَهْلاً وَسَهْلاً بِكَ", "transliteration": "Ahlan wa sahlan bik", "text_en": "Welcome to you", "text_ru": "Добро пожаловать"}, {"id": "opt3", "text": "إِلَى اللِّقَاءِ يَا أَخِي", "transliteration": "Ila al-liqa'' ya akhi", "text_en": "See you later, brother", "text_ru": "До встречи, брат"}, {"id": "opt4", "text": "صَبَاحُ الخَيْرِ وَالنُّورِ", "transliteration": "Sabah al-khayr", "text_en": "Good morning", "text_ru": "Доброе утро"}]'::jsonb, 'opt1',
    'في حوار الدرس الأول (التحفة الأزهرية): رد بلال هو: وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ.', 'في حوار الدرس الأول (التحفة الأزهرية): رد بلال هو: وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ.', 'In Lesson 1 dialogue (Al-Tuhfa): Bilal replies: Wa alaykumus-salam wa rahmatullahi wa barakatuh.', 'В диалоге 1-го урока («Ат-Тухфа»): Биляль отвечает: «Ва алейкумус-салям ва рахматуллахи ва баракатух».', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0003-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000003', 'سأل أحمد: (لِمَاذَا جِئْتَ إِلَى مِصْرَ؟) - ماذا أجاب بلال في كتاب التحفة الأزهرية؟', 'سأل أحمد: (لِمَاذَا جِئْتَ إِلَى مِصْرَ؟) - ماذا أجاب بلال في كتاب التحفة الأزهرية؟', 'Ahmed asked: (Why did you come to Egypt?) - What was Bilal''s response in Al-Tuhfa?', 'Ахмед спросил: (Зачем ты приехал в Египет?) - Что ответил Биляль в книге «Ат-Тухфа»?',
    'لِمَاذَا جِئْتَ إِلَى مِصْرَ؟', 'Limadha ji''ta ila Misr?', 'Why did you come to Egypt?', 'Why did you come to Egypt?', 'Зачем ты приехал в Египет?',
    'audio_mcq', '/audio/tuhfa/limadha_jita.mp3', '[{"id": "opt1", "text": "لِأَتَعَلَّمَ فِي الأَزْهَرِ الشَّرِيفِ", "transliteration": "Li-ata''allama fil-Azhar ash-Sharif", "text_en": "To study at Al-Azhar Al-Sharif", "text_ru": "Чтобы учиться в благородном Аль-Азхаре"}, {"id": "opt2", "text": "لِزِيَارَةِ الأَهْرَامَاتِ", "transliteration": "Li-ziyaratil-ahramat", "text_en": "To visit the Pyramids", "text_ru": "Чтобы посетить пирамиды"}, {"id": "opt3", "text": "لِلْعَمَلِ فِي التِّجَارَةِ", "transliteration": "Lil-''amali fit-tijarah", "text_en": "To work in commerce", "text_ru": "Для работы в торговле"}, {"id": "opt4", "text": "لِلْعِلَاجِ فِي المُسْتَشْفَى", "transliteration": "Lil-''ilaj", "text_en": "For medical treatment", "text_ru": "Для лечения"}]'::jsonb, 'opt1',
    'أجاب بلال: (لِأَتَعَلَّمَ فِي الأَزْهَرِ الشَّرِيفِ)، وهو الهدف السامي لدارسي سلسلة التحفة الأزهرية.', 'أجاب بلال: (لِأَتَعَلَّمَ فِي الأَزْهَرِ الشَّرِيفِ)، وهو الهدف السامي لدارسي سلسلة التحفة الأزهرية.', 'Bilal answered: (To study at Al-Azhar Al-Sharif), the primary goal of students of this series.', 'Биляль ответил: «Чтобы учиться в благородном Аль-Азхаре».', 2
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0003-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000003', 'استمع إلى السؤال: (كَيْفَ حَالُكَ؟) - ما هو الرد السليم؟', 'استمع إلى السؤال: (كَيْفَ حَالُكَ؟) - ما هو الرد السليم؟', 'Listen to the question: (How are you?) - What is the correct response?', 'Послушайте вопрос: (Как твои дела?) - Каков правильный ответ?',
    'كَيْفَ حَالُكَ؟', 'Kayfa haluk?', 'How are you?', 'How are you?', 'Как твои дела?',
    'audio_mcq', '/audio/tuhfa/kayfa_haluk.mp3', '[{"id": "opt1", "text": "بِخَيْرٍ وَالحَمْدُ لِلَّهِ", "transliteration": "Bikhayr wal-hamdulillah", "text_en": "Fine, praise be to Allah", "text_ru": "Хорошо, хвала Аллаху"}, {"id": "opt2", "text": "أَنَا مِنْ مِصْرَ", "transliteration": "Ana min Misr", "text_en": "I am from Egypt", "text_ru": "Я из Египта"}, {"id": "opt3", "text": "مَعَ السَّلَامَةِ", "transliteration": "Ma''as-salamah", "text_en": "Goodbye", "text_ru": "До свидания"}, {"id": "opt4", "text": "اسْمِي أَحْمَد", "transliteration": "Ismi Ahmed", "text_en": "My name is Ahmed", "text_ru": "Меня зовут Ахмед"}]'::jsonb, 'opt1',
    'جواب السؤال عن الحال هو: بِخَيْرٍ وَالحَمْدُ لِلَّهِ.', 'جواب السؤال عن الحال هو: بِخَيْرٍ وَالحَمْدُ لِلَّهِ.', 'The proper reply to ''How are you?'' is ''Fine, praise be to Allah''.', 'Правильный ответ на «Как дела?»: «Хорошо, хвала Аллаху».', 3
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0004-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000004', 'استمع إلى الإشارة في حوار الأسرة: مَن هذا الشخص؟', 'استمع إلى الإشارة في حوار الأسرة: مَن هذا الشخص؟', 'Listen to the family dialogue: Who is this person?', 'Послушайте диалог о семье: Кто этот человек?',
    'هَذَا أَخِي', 'Hadha akhi', 'This is my brother', 'This is my brother', 'Это мой брат',
    'audio_mcq', '/audio/tuhfa/hadha_akhi.mp3', '[{"id": "opt1", "text": "هَذَا أَخِي", "transliteration": "Hadha akhi", "text_en": "This is my brother", "text_ru": "Это мой брат"}, {"id": "opt2", "text": "هَذِهِ أُخْتِي", "transliteration": "Hadhihi ukhti", "text_en": "This is my sister", "text_ru": "Это моя сестра"}, {"id": "opt3", "text": "هَذَا جَدِّي", "transliteration": "Hadha jaddi", "text_en": "This is my grandfather", "text_ru": "Это мой дедушка"}, {"id": "opt4", "text": "هَذِهِ أُمِّي", "transliteration": "Hadhihi ummi", "text_en": "This is my mother", "text_ru": "Это моя мама"}]'::jsonb, 'opt1',
    'العبارة المسموعة تشير إلى الأخ المذكر: هَذَا أَخِي.', 'العبارة المسموعة تشير إلى الأخ المذكر: هَذَا أَخِي.', 'The spoken phrase points to the brother: This is my brother.', 'Звучит фраза: «Это мой брат».', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0004-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000004', 'استمع إلى العبارة: من المشار إليها في الصوت؟', 'استمع إلى العبارة: من المشار إليها في الصوت؟', 'Listen to the audio: Who is being referred to?', 'Послушайте аудио: О ком идет речь?',
    'هَذِهِ أُخْتِي', 'Hadhihi ukhti', 'This is my sister', 'This is my sister', 'Это моя сестра',
    'audio_mcq', '/audio/tuhfa/hadhihi_ukhti.mp3', '[{"id": "opt1", "text": "هَذِهِ أُخْتِي", "transliteration": "Hadhihi ukhti", "text_en": "This is my sister", "text_ru": "Это моя сестра"}, {"id": "opt2", "text": "هَذَا أَخِي", "transliteration": "Hadha akhi", "text_en": "This is my brother", "text_ru": "Это мой брат"}, {"id": "opt3", "text": "هَذَا أَبِي", "transliteration": "Hadha abi", "text_en": "This is my father", "text_ru": "Это мой отец"}, {"id": "opt4", "text": "هَذَا صَدِيقِي", "transliteration": "Hadha sadiqi", "text_en": "This is my friend", "text_ru": "Это мой друг"}]'::jsonb, 'opt1',
    'استخدم اسم الإشارة للمؤنث (هَذِهِ) مع الأخت: هَذِهِ أُخْتِي.', 'استخدم اسم الإشارة للمؤنث (هَذِهِ) مع الأخت: هَذِهِ أُخْتِي.', 'The feminine demonstrative pronoun Hadhihi (هَذِهِ) is used: This is my sister.', 'Женское указательное местоимение «хазихи»: «Это моя сестра».', 2
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0005-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000005', 'استمع إلى السؤال في درس السكن: (أَيْنَ تَسْكُنُ؟) - ما الجواب المطابق؟', 'استمع إلى السؤال في درس السكن: (أَيْنَ تَسْكُنُ؟) - ما الجواب المطابق؟', 'Listen to the housing question: (Where do you live?) - What is the matching answer?', 'Послушайте вопрос о жилье: (Где ты живешь?) - Каков правильный ответ?',
    'أَيْنَ تَسْكُنُ؟', 'Ayna taskun?', 'Where do you live?', 'Where do you live?', 'Где ты живешь?',
    'audio_mcq', '/audio/tuhfa/ayna_taskun.mp3', '[{"id": "opt1", "text": "أَسْكُنُ فِي شَقَّةٍ جَمِيلَةٍ", "transliteration": "Askunu fee shaqqah", "text_en": "I live in a beautiful apartment", "text_ru": "Я живу в красивой квартире"}, {"id": "opt2", "text": "أَنَا أَدْرُسُ فِي المَعْهَدِ", "transliteration": "Ana adrusu fil-ma''had", "text_en": "I study at the institute", "text_ru": "Я учусь в институте"}, {"id": "opt3", "text": "أَنَا مُسَافِرٌ غَداً", "transliteration": "Ana musafir", "text_en": "I am traveling tomorrow", "text_ru": "Я уезжаю завтра"}, {"id": "opt4", "text": "اسْمِي خَالِد", "transliteration": "Ismi Khalid", "text_en": "My name is Khalid", "text_ru": "Меня зовут Халид"}]'::jsonb, 'opt1',
    'جواب السؤال عن محل السكن هو: أَسْكُنُ فِي شَقَّةٍ جَمِيلَةٍ.', 'جواب السؤال عن محل السكن هو: أَسْكُنُ فِي شَقَّةٍ جَمِيلَةٍ.', 'The reply to ''Where do you live?'' is ''I live in a beautiful apartment''.', 'Ответ на «Где ты живешь?»: «Я живу в красивой квартире».', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0006-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000006', 'في درس المعهد والتعليم: أين يجلس الطلاب للاستماع إلى المعلم؟', 'في درس المعهد والتعليم: أين يجلس الطلاب للاستماع إلى المعلم؟', 'In the Institute lesson: Where do students sit to listen to the teacher?', 'В уроке об институте: Где сидят студенты, слушая учителя?',
    'فِي الصَّفِّ الدِّرَاسِيِّ', 'Fees-saffid-dirasi', 'In the classroom', 'In the classroom', 'В учебном классе',
    'text_mcq', NULL, '[{"id": "opt1", "text": "فِي الصَّفِّ الدِّرَاسِيِّ", "transliteration": "Fees-saffid-dirasi", "text_en": "In the classroom", "text_ru": "В классе"}, {"id": "opt2", "text": "فِي المَطَارِ", "transliteration": "Fil-mataar", "text_en": "At the airport", "text_ru": "В аэропорту"}, {"id": "opt3", "text": "فِي الفُنْدُقِ", "transliteration": "Fil-funduq", "text_en": "At the hotel", "text_ru": "В отеле"}, {"id": "opt4", "text": "فِي السُّوقِ", "transliteration": "Fis-sooq", "text_en": "In the market", "text_ru": "На рынке"}]'::jsonb, 'opt1',
    'يجلس الطلاب داخل الصف الدراسي في المعهد الأزهري.', 'يجلس الطلاب داخل الصف الدراسي في المعهد الأزهري.', 'Students sit in the classroom (الصَّفّ) during lectures.', 'Студенты сидят в учебном классе.', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0007-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000007', 'أي الحيوانات الآتية من حيوانات البيئة والمزرعة المذكورة في المنهج؟', 'أي الحيوانات الآتية من حيوانات البيئة والمزرعة المذكورة في المنهج؟', 'Which of the following is a domestic farm animal mentioned in the curriculum?', 'Какое из следующих животных является домашним животным фермы?',
    'الجَمَلُ وَالحِصَانُ', 'Al-jamalu wal-hisaan', 'The camel and the horse', 'The camel and the horse', 'Верблюд и лошадь',
    'text_mcq', NULL, '[{"id": "opt1", "text": "الجَمَلُ وَالحِصَانُ", "transliteration": "Al-jamalu wal-hisaan", "text_en": "Camel and Horse", "text_ru": "Верблюд и лошадь"}, {"id": "opt2", "text": "السَّمَكُ وَالحُوتُ", "transliteration": "As-samak wal-hoot", "text_en": "Fish and Whale", "text_ru": "Рыба и кит"}, {"id": "opt3", "text": "القِرْدُ وَالنَّمِرُ", "transliteration": "Al-qirdu wan-namir", "text_en": "Monkey and Leopard", "text_ru": "Обезьяна и леопард"}, {"id": "opt4", "text": "العُصْفُورُ وَالصَّقْرُ", "transliteration": "Al-usfooru was-saqr", "text_en": "Sparrow and Falcon", "text_ru": "Воробей и сокол"}]'::jsonb, 'opt1',
    'الجمل والحصان من أبرز الحيوانات الأليفة في البيئة العربية.', 'الجمل والحصان من أبرز الحيوانات الأليفة في البيئة العربية.', 'The camel and the horse are classic domestic animals taught in unit 2.', 'Верблюд и лошадь — ключевые животные, изучаемые во 2-м модуле.', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0008-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000008', 'في درس الطيور: أين يعيش الطائر الجميل ويبني عشه؟', 'في درس الطيور: أين يعيش الطائر الجميل ويبني عشه؟', 'In the Birds lesson: Where does the bird live and build its nest?', 'В уроке о птицах: Где птица строит свое гнездо?',
    'عَلَى الشَّجَرَةِ', 'Ala ash-shajarah', 'On the tree', 'On the tree', 'На дереве',
    'text_mcq', NULL, '[{"id": "opt1", "text": "عَلَى الشَّجَرَةِ", "transliteration": "Ala ash-shajarah", "text_en": "On the tree", "text_ru": "На дереве"}, {"id": "opt2", "text": "فِي أَعْمَاقِ البَحْرِ", "transliteration": "Fee a''maaqil-bahr", "text_en": "In the deep sea", "text_ru": "В морских глубинах"}, {"id": "opt3", "text": "تَحْتَ الأَرْضِ", "transliteration": "Tahta al-ard", "text_en": "Underground", "text_ru": "Под землей"}, {"id": "opt4", "text": "فِي غُرْفَةِ النَّوْمِ", "transliteration": "Fee ghurfatil-nawm", "text_en": "In the bedroom", "text_ru": "В спальне"}]'::jsonb, 'opt1',
    'يبني الطائر عشه فوق أغصان الشجرة.', 'يبني الطائر عشه فوق أغصان الشجرة.', 'Birds build their nests on tree branches.', 'Птицы строят свои гнезда на ветвях деревьев.', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0009-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000009', 'ما هي وسيلة المواصلات التي تسير على السكة الحديدية؟', 'ما هي وسيلة المواصلات التي تسير على السكة الحديدية؟', 'Which mode of transportation travels on railway tracks?', 'Какой вид транспорта передвигается по железнодорожным путям?',
    'القِطَارُ', 'Al-qitaar', 'The Train', 'The Train', 'Поезд',
    'text_mcq', NULL, '[{"id": "opt1", "text": "القِطَارُ", "transliteration": "Al-qitaar", "text_en": "Train", "text_ru": "Поезд"}, {"id": "opt2", "text": "الطَّائِرَةُ", "transliteration": "At-taa''irah", "text_en": "Airplane", "text_ru": "Самолет"}, {"id": "opt3", "text": "السَّفِينَةُ", "transliteration": "As-safeenah", "text_en": "Ship", "text_ru": "Корабль"}, {"id": "opt4", "text": "الدَّرَّاجَةُ", "transliteration": "Ad-darrajah", "text_en": "Bicycle", "text_ru": "Велосипед"}]'::jsonb, 'opt1',
    'القطار هو وسيلة النقل البرية التي تسير على قضبان السكة الحديد.', 'القطار هو وسيلة النقل البرية التي تسير على قضبان السكة الحديد.', 'The train (القِطَار) runs on railway tracks.', 'Поезд (القِطَار) передвигается по железнодорожным путям.', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0010-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000010', 'ماذا يقول المسافر لموظف الاستقبال في الفندق عند طلب الإقامة؟', 'ماذا يقول المسافر لموظف الاستقبال في الفندق عند طلب الإقامة؟', 'What does the traveler say to the hotel receptionist to book a room?', 'Что говорит путешественник администратору отеля при бронировании номера?',
    'أُرِيدُ حَجْزَ غُرْفَةٍ مِن فَضْلِكَ', 'Ureedu hajza ghurfah min fadlik', 'I would like to book a room please', 'I would like to book a room please', 'Я хотел бы забронировать номер, пожалуйста',
    'text_mcq', NULL, '[{"id": "opt1", "text": "أُرِيدُ حَجْزَ غُرْفَةٍ مِن فَضْلِكَ", "transliteration": "Ureedu hajza ghurfah", "text_en": "I want to book a room please", "text_ru": "Я хочу забронировать номер, пожалуйста"}, {"id": "opt2", "text": "أَيْنَ مَحَطَّةُ القِطَارِ؟", "transliteration": "Ayna mahattatul-qitaar", "text_en": "Where is the train station?", "text_ru": "Где вокзал?"}, {"id": "opt3", "text": "بِكَمْ هَذَا القَمِيصُ؟", "transliteration": "Bikam hadhal-qamees", "text_en": "How much is this shirt?", "text_ru": "Сколько стоит эта рубашка?"}, {"id": "opt4", "text": "إِلَى اللِّقَاءِ يَا أُسْتَاذِي", "transliteration": "Ila al-liqa'' ya ustadh", "text_en": "Goodbye teacher", "text_ru": "До свидания, учитель"}]'::jsonb, 'opt1',
    'العبارة اللبقة لحجز إقامة في الفندق هي: أُرِيدُ حَجْزَ غُرْفَةٍ مِن فَضْلِكَ.', 'العبارة اللبقة لحجز إقامة في الفندق هي: أُرِيدُ حَجْزَ غُرْفَةٍ مِن فَضْلِكَ.', 'The polite request to reserve a room is: أُرِيدُ حَجْزَ غُرْفَةٍ مِن فَضْلِكَ.', 'Вежливая фраза для бронирования: «Я хотел бы забронировать номер, пожалуйста».', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0011-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000011', 'ما هي الوثيقة الرسمية التي يقدمها المسافر لضابط الجوازات في المطار؟', 'ما هي الوثيقة الرسمية التي يقدمها المسافر لضابط الجوازات في المطار؟', 'What official document does the traveler present to the passport officer at the airport?', 'Какой официальный документ путешественник предъявляет офицеру паспортного контроля?',
    'جَوَازُ السَّفَرِ', 'Jawaazul-safar', 'Passport', 'Passport', 'Заграничный паспорт',
    'text_mcq', NULL, '[{"id": "opt1", "text": "جَوَازُ السَّفَرِ وَالتَّأْشِيرَةُ", "transliteration": "Jawaazul-safar wat-ta''sheerah", "text_en": "Passport and Visa", "text_ru": "Паспорт и виза"}, {"id": "opt2", "text": "شَهَادَةُ المِيلَادِ", "transliteration": "Shahadatil-meelaad", "text_en": "Birth certificate", "text_ru": "Свидетельство о рождении"}, {"id": "opt3", "text": "فَاتُورَةُ الشِّرَاءِ", "transliteration": "Fatooratul-shiraa", "text_en": "Purchase invoice", "text_ru": "Чек о покупке"}, {"id": "opt4", "text": "كِتَابُ القِرَاءَةِ", "transliteration": "Kitaabul-qiraa''ah", "text_en": "Reading book", "text_ru": "Книга для чтения"}]'::jsonb, 'opt1',
    'يطلب ضابط الجوازات: جَوَازَ السَّفَرِ وَتَأْشِيرَةَ الدُّخُولِ.', 'يطلب ضابط الجوازات: جَوَازَ السَّفَرِ وَتَأْشِيرَةَ الدُّخُولِ.', 'The immigration officer requests the passport and entry visa.', 'Офицер паспортного контроля запрашивает паспорт и визу.', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0012-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000012', 'بأي عضو من أعضاء الجسم يرى الإنسان الأشياء والألوان؟', 'بأي عضو من أعضاء الجسم يرى الإنسان الأشياء والألوان؟', 'With which organ of the body does a human see objects and colors?', 'С помощью какого органа человеческого тела человек видит предметы и цвета?',
    'بِالعَيْنَيْنِ', 'Bil-''aynayn', 'With the eyes', 'With the eyes', 'Глазами',
    'text_mcq', NULL, '[{"id": "opt1", "text": "بِالعَيْنِ", "transliteration": "Bil-''ayn", "text_en": "With the eye", "text_ru": "Глазом"}, {"id": "opt2", "text": "بِالأُذُنِ", "transliteration": "Bil-udhun", "text_en": "With the ear", "text_ru": "Ухом"}, {"id": "opt3", "text": "بِالأَنْفِ", "transliteration": "Bil-anf", "text_en": "With the nose", "text_ru": "Носом"}, {"id": "opt4", "text": "بِاليَدِ", "transliteration": "Bil-yad", "text_en": "With the hand", "text_ru": "Рукой"}]'::jsonb, 'opt1',
    'حاسة البصر تكون بالعين، وحاسة السمع بالأذن، والشم بالأنف.', 'حاسة البصر تكون بالعين، وحاسة السمع بالأذن، والشم بالأنف.', 'Vision is experienced through the eyes (العَيْن).', 'Зрение осуществляется с помощью глаз (العَيْن).', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0013-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000013', 'ما هو الملبس الذي يرتديه طالب العلم في مناسباته الرسمية؟', 'ما هو الملبس الذي يرتديه طالب العلم في مناسباته الرسمية؟', 'What garment is traditionally worn for formal student gatherings?', 'Какую одежду традиционно носят студенты на официальных встречах?',
    'الثَّوْبُ الأَبْيَضُ النَّظِيفُ', 'Ath-thawbul-abyad', 'The clean white thobe', 'The clean white thobe', 'Чистый белый тоб',
    'text_mcq', NULL, '[{"id": "opt1", "text": "الثَّوْبُ الأَبْيَضُ النَّظِيفُ", "transliteration": "Ath-thawbul-abyad", "text_en": "Clean white garment", "text_ru": "Чистая белая одежда"}, {"id": "opt2", "text": "مَلَابِسُ السِّبَاحَةِ", "transliteration": "Malabisus-sibahah", "text_en": "Swimwear", "text_ru": "Плавки"}, {"id": "opt3", "text": "المِعْطَفُ الثَّقِيلُ صَيْفاً", "transliteration": "Al-mi''taf", "text_en": "Heavy winter coat in summer", "text_ru": "Зимнее пальто летом"}, {"id": "opt4", "text": "الحِذَاءُ فَقَطْ", "transliteration": "Al-hidhaa", "text_en": "Shoes only", "text_ru": "Только обувь"}]'::jsonb, 'opt1',
    'الثوب الأبيض هو اللباس الأنيق لطلاب العلم في الأزهر.', 'الثوب الأبيض هو اللباس الأنيق لطلاب العلم في الأزهر.', 'The white thobe represents elegance and purity for knowledge seekers.', 'Белый тоб — традиционная элегантная одежда студентов.', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0014-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000014', 'كيف تسأل البائع في السوق عن ثمن السلعة في اللغة العربية؟', 'كيف تسأل البائع في السوق عن ثمن السلعة في اللغة العربية؟', 'How do you ask the vendor in the marketplace about the price of an item?', 'Как спросить продавца на рынке о цене товара на арабском языке?',
    'بِكَمْ هَذَا؟', 'Bikam hadha?', 'How much is this?', 'How much is this?', 'Сколько это стоит?',
    'text_mcq', NULL, '[{"id": "opt1", "text": "بِكَمْ هَذَا يَا أَخِي؟", "transliteration": "Bikam hadha ya akhi?", "text_en": "How much is this, brother?", "text_ru": "Сколько это стоит, брат?"}, {"id": "opt2", "text": "أَيْنَ المَطَارُ؟", "transliteration": "Ayna al-mataar?", "text_en": "Where is the airport?", "text_ru": "Где аэропорт?"}, {"id": "opt3", "text": "مَا اسْمُكَ؟", "transliteration": "Mas-muk?", "text_en": "What is your name?", "text_ru": "Как тебя зовут?"}, {"id": "opt4", "text": "كَيْفَ حَالُكَ؟", "transliteration": "Kayfa haluk?", "text_en": "How are you?", "text_ru": "Как твои дела?"}]'::jsonb, 'opt1',
    'أداة الاستفهام عن السعر والثمن هي (بِكَمْ).', 'أداة الاستفهام عن السعر والثمن هي (بِكَمْ).', 'The interrogative particle used for price in Arabic is Bikam (بِكَمْ).', 'Вопросительная частица для цены — «Бикам» (بِكَمْ).', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0015-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000015', 'أي من الأصناف الآتية يعد من الفواكه اللذيذة والغنية بالفيتامينات؟', 'أي من الأصناف الآتية يعد من الفواكه اللذيذة والغنية بالفيتامينات؟', 'Which of the following items is a fruit rich in vitamins?', 'Что из перечисленного является вкусным фруктом, богатым витаминами?',
    'التُّفَّاحُ وَالعِنَبُ', 'At-tuffahu wal-''inab', 'Apples and Grapes', 'Apples and Grapes', 'Яблоки и виноград',
    'text_mcq', NULL, '[{"id": "opt1", "text": "التُّفَّاحُ وَالعِنَبُ", "transliteration": "At-tuffahu wal-''inab", "text_en": "Apples and Grapes", "text_ru": "Яблоки и виноград"}, {"id": "opt2", "text": "البَصَلُ وَالثُّومُ", "transliteration": "Al-basal wath-thawm", "text_en": "Onions and Garlic", "text_ru": "Лук и чеснок"}, {"id": "opt3", "text": "المِلْحُ وَالفُلْفُلُ", "transliteration": "Al-milh wal-fulful", "text_en": "Salt and Pepper", "text_ru": "Соль и перец"}, {"id": "opt4", "text": "الخُبْزُ وَالأَرُزُّ", "transliteration": "Al-khubz wal-aruzz", "text_en": "Bread and Rice", "text_ru": "Хлеб и рис"}]'::jsonb, 'opt1',
    'التفاح والعنب والبرتقال من الفواكه، بينما البصل والثوم من الخضروات.', 'التفاح والعنب والبرتقال من الفواكه، بينما البصل والثوم من الخضروات.', 'Apples and grapes are fruits, whereas onions are vegetables.', 'Яблоки и виноград — это фрукты.', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0016-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000016', 'ما هي العبارة المحببة للترحيب بالصديق عند زيارته في منزلك؟', 'ما هي العبارة المحببة للترحيب بالصديق عند زيارته في منزلك؟', 'What is the welcoming phrase used when receiving a friend at your home?', 'Какую приветственную фразу используют при встрече друга дома?',
    'أَهْلاً وَسَهْلاً يَا صَدِيقِي العَزِيزَ', 'Ahlan wa sahlan ya sadiqi', 'Welcome my dear friend', 'Welcome my dear friend', 'Добро пожаловать, мой дорогой друг',
    'text_mcq', NULL, '[{"id": "opt1", "text": "أَهْلاً وَسَهْلاً يَا صَدِيقِي العَزِيزَ", "transliteration": "Ahlan wa sahlan ya sadiqi", "text_en": "Welcome, my dear friend", "text_ru": "Добро пожаловать, дорогой друг"}, {"id": "opt2", "text": "إِلَى أَيْنَ تَذْهَبُ؟", "transliteration": "Ila ayna tadhhab?", "text_en": "Where are you going?", "text_ru": "Куда ты идешь?"}, {"id": "opt3", "text": "أَنَا مَشْغُولٌ جِدّاً", "transliteration": "Ana mashghool", "text_en": "I am very busy", "text_ru": "Я очень занят"}, {"id": "opt4", "text": "أَعْطِنِي الحِسَابَ", "transliteration": "A''tini al-hisab", "text_en": "Give me the bill", "text_ru": "Дайте мне счет"}]'::jsonb, 'opt1',
    'نرحب بالصديق بعبارة: أَهْلاً وَسَهْلاً يَا صَدِيقِي.', 'نرحب بالصديق بعبارة: أَهْلاً وَسَهْلاً يَا صَدِيقِي.', 'We greet visitors warmly saying: أَهْلاً وَسَهْلاً.', 'Гостей приветствуют фразой: «Ахлян ва сахлян» (Добро пожаловать).', 1
);
INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    'e1000000-0017-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000017', 'في درس النادي والرياضة: ما هي الرياضة المائية المفضلة للصحة والنشاط؟', 'في درس النادي والرياضة: ما هي الرياضة المائية المفضلة للصحة والنشاط؟', 'In the Sports lesson: Which water sport is favored for fitness and vitality?', 'В уроке о спорте: Какой водный вид спорта полезен для здоровья и бодрости?',
    'السِّبَاحَةُ', 'As-sibahah', 'Swimming', 'Swimming', 'Плавание',
    'text_mcq', NULL, '[{"id": "opt1", "text": "السِّبَاحَةُ فِي المَسْبَحِ", "transliteration": "As-sibahatu fil-masbah", "text_en": "Swimming in the pool", "text_ru": "Плавание в бассейне"}, {"id": "opt2", "text": "النَّوْمُ الطَّوِيلُ", "transliteration": "An-nawmul-taweel", "text_en": "Long sleep", "text_ru": "Долгий сон"}, {"id": "opt3", "text": "مُشَاهَدَةُ التِّلْفَازِ", "transliteration": "Mushahadatul-tilfaz", "text_en": "Watching television", "text_ru": "Просмотр телевизора"}, {"id": "opt4", "text": "أَكْلُ الحَلْوَى", "transliteration": "Aklul-halwa", "text_en": "Eating sweets", "text_ru": "Употребление сладостей"}]'::jsonb, 'opt1',
    'السباحة وركوب الخيل والرماية من الرياضات النافعة لبناء الجسم.', 'السباحة وركوب الخيل والرماية من الرياضات النافعة لبناء الجسم.', 'Swimming (السِّبَاحَة) is a praised sport that strengthens the body.', 'Плавание (السِّبَاحَة) — полезный вид спорта, укрепляющий тело.', 1
);
