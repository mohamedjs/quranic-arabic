import json

exercises = [
    # 6. Lesson 4: My Institute (b1000000-0000-0000-0000-000000000006)
    {
        "id": "e1000000-0006-0000-0000-000000000001",
        "lesson_id": "b1000000-0000-0000-0000-000000000006",
        "question_text": "في درس المعهد والتعليم: أين يجلس الطلاب للاستماع إلى المعلم؟",
        "question_ar": "في درس المعهد والتعليم: أين يجلس الطلاب للاستماع إلى المعلم؟",
        "question_en": "In the Institute lesson: Where do students sit to listen to the teacher?",
        "question_ru": "В уроке об институте: Где сидят студенты, слушая учителя?",
        "arabic_text": "فِي الصَّفِّ الدِّرَاسِيِّ",
        "transliteration": "Fees-saffid-dirasi",
        "translation": "In the classroom",
        "translation_en": "In the classroom",
        "translation_ru": "В учебном классе",
        "question_type": "audio_mcq",
        "audio_url": "/audio/words/kitaab.mp3",
        "options_json": [
            {"id": "opt1", "text": "فِي الصَّفِّ الدِّرَاسِيِّ", "transliteration": "Fees-saffid-dirasi", "text_en": "In the classroom", "text_ru": "В классе"},
            {"id": "opt2", "text": "فِي المَطَارِ", "transliteration": "Fil-mataar", "text_en": "At the airport", "text_ru": "В аэропорту"},
            {"id": "opt3", "text": "فِي الفُنْدُقِ", "transliteration": "Fil-funduq", "text_en": "At the hotel", "text_ru": "В отеле"},
            {"id": "opt4", "text": "فِي السُّوقِ", "transliteration": "Fis-sooq", "text_en": "In the market", "text_ru": "На рынке"}
        ],
        "correct_answer": "opt1",
        "explanation": "يجلس الطلاب داخل الصف الدراسي في المعهد الأزهري.",
        "explanation_ar": "يجلس الطلاب داخل الصف الدراسي في المعهد الأزهري.",
        "explanation_en": "Students sit in the classroom (الصَّفّ) during lectures.",
        "explanation_ru": "Студенты сидят в учебном классе.",
        "order_index": 1
    },

    # 7. Lesson 5: Animals (b1000000-0000-0000-0000-000000000007)
    {
        "id": "e1000000-0007-0000-0000-000000000001",
        "lesson_id": "b1000000-0000-0000-0000-000000000007",
        "question_text": "أي الحيوانات الآتية من حيوانات البيئة والمزرعة المذكورة في المنهج؟",
        "question_ar": "أي الحيوانات الآتية من حيوانات البيئة والمزرعة المذكورة في المنهج؟",
        "question_en": "Which of the following is a domestic farm animal mentioned in the curriculum?",
        "question_ru": "Какое из следующих животных является домашним животным фермы?",
        "arabic_text": "الجَمَلُ وَالحِصَانُ",
        "transliteration": "Al-jamalu wal-hisaan",
        "translation": "The camel and the horse",
        "translation_en": "The camel and the horse",
        "translation_ru": "Верблюд и лошадь",
        "question_type": "audio_mcq",
        "audio_url": "/audio/letters/jeem.mp3",
        "options_json": [
            {"id": "opt1", "text": "الجَمَلُ وَالحِصَانُ", "transliteration": "Al-jamalu wal-hisaan", "text_en": "Camel and Horse", "text_ru": "Верблюд и лошадь"},
            {"id": "opt2", "text": "السَّمَكُ وَالحُوتُ", "transliteration": "As-samak wal-hoot", "text_en": "Fish and Whale", "text_ru": "Рыба и кит"},
            {"id": "opt3", "text": "القِرْدُ وَالنَّمِرُ", "transliteration": "Al-qirdu wan-namir", "text_en": "Monkey and Leopard", "text_ru": "Обезьяна и леопард"},
            {"id": "opt4", "text": "العُصْفُورُ وَالصَّقْرُ", "transliteration": "Al-usfooru was-saqr", "text_en": "Sparrow and Falcon", "text_ru": "Воробей и сокол"}
        ],
        "correct_answer": "opt1",
        "explanation": "الجمل والحصان من أبرز الحيوانات الأليفة في البيئة العربية.",
        "explanation_ar": "الجمل والحصان من أبرز الحيوانات الأليفة في البيئة العربية.",
        "explanation_en": "The camel and the horse are classic domestic animals taught in unit 2.",
        "explanation_ru": "Верблюд и лошадь — ключевые животные, изучаемые во 2-м модуле.",
        "order_index": 1
    },

    # 8. Lesson 6: Birds (b1000000-0000-0000-0000-000000000008)
    {
        "id": "e1000000-0008-0000-0000-000000000001",
        "lesson_id": "b1000000-0000-0000-0000-000000000008",
        "question_text": "في درس الطيور: أين يعيش الطائر الجميل ويبني عشه؟",
        "question_ar": "في درس الطيور: أين يعيش الطائر الجميل ويبني عشه؟",
        "question_en": "In the Birds lesson: Where does the bird live and build its nest?",
        "question_ru": "В уроке о птицах: Где птица строит свое гнездо?",
        "arabic_text": "عَلَى الشَّجَرَةِ",
        "transliteration": "Ala ash-shajarah",
        "translation": "On the tree",
        "translation_en": "On the tree",
        "translation_ru": "На дереве",
        "question_type": "audio_mcq",
        "audio_url": "/audio/letters/haa.mp3",
        "options_json": [
            {"id": "opt1", "text": "عَلَى الشَّجَرَةِ", "transliteration": "Ala ash-shajarah", "text_en": "On the tree", "text_ru": "На дереве"},
            {"id": "opt2", "text": "فِي أَعْمَاقِ البَحْرِ", "transliteration": "Fee a'maaqil-bahr", "text_en": "In the deep sea", "text_ru": "В морских глубинах"},
            {"id": "opt3", "text": "تَحْتَ الأَرْضِ", "transliteration": "Tahta al-ard", "text_en": "Underground", "text_ru": "Под землей"},
            {"id": "opt4", "text": "فِي غُرْفَةِ النَّوْمِ", "transliteration": "Fee ghurfatil-nawm", "text_en": "In the bedroom", "text_ru": "В спальне"}
        ],
        "correct_answer": "opt1",
        "explanation": "يبني الطائر عشه فوق أغصان الشجرة.",
        "explanation_ar": "يبني الطائر عشه فوق أغصان الشجرة.",
        "explanation_en": "Birds build their nests on tree branches.",
        "explanation_ru": "Птицы строят свои гнезда на ветвях деревьев.",
        "order_index": 1
    },

    # 9. Lesson 7: Transportation (b1000000-0000-0000-0000-000000000009)
    {
        "id": "e1000000-0009-0000-0000-000000000001",
        "lesson_id": "b1000000-0000-0000-0000-000000000009",
        "question_text": "ما هي وسيلة المواصلات التي تسير على السكة الحديدية؟",
        "question_ar": "ما هي وسيلة المواصلات التي تسير على السكة الحديدية؟",
        "question_en": "Which mode of transportation travels on railway tracks?",
        "question_ru": "Какой вид транспорта передвигается по железнодорожным путям?",
        "arabic_text": "القِطَارُ",
        "transliteration": "Al-qitaar",
        "translation": "The Train",
        "translation_en": "The Train",
        "translation_ru": "Поезд",
        "question_type": "audio_mcq",
        "audio_url": "/audio/letters/qaaf.mp3",
        "options_json": [
            {"id": "opt1", "text": "القِطَارُ", "transliteration": "Al-qitaar", "text_en": "Train", "text_ru": "Поезд"},
            {"id": "opt2", "text": "الطَّائِرَةُ", "transliteration": "At-taa'irah", "text_en": "Airplane", "text_ru": "Самолет"},
            {"id": "opt3", "text": "السَّفِينَةُ", "transliteration": "As-safeenah", "text_en": "Ship", "text_ru": "Корабль"},
            {"id": "opt4", "text": "الدَّرَّاجَةُ", "transliteration": "Ad-darrajah", "text_en": "Bicycle", "text_ru": "Велосипед"}
        ],
        "correct_answer": "opt1",
        "explanation": "القطار هو وسيلة النقل البرية التي تسير على قضبان السكة الحديد.",
        "explanation_ar": "القطار هو وسيلة النقل البرية التي تسير على قضبان السكة الحديد.",
        "explanation_en": "The train (القِطَار) runs on railway tracks.",
        "explanation_ru": "Поезд (القِطَار) передвигается по железнодорожным путям.",
        "order_index": 1
    },

    # 10. Lesson 8: At the Hotel (b1000000-0000-0000-0000-000000000010)
    {
        "id": "e1000000-0010-0000-0000-000000000001",
        "lesson_id": "b1000000-0000-0000-0000-000000000010",
        "question_text": "ماذا يقول المسافر لموظف الاستقبال في الفندق عند طلب الإقامة؟",
        "question_ar": "ماذا يقول المسافر لموظف الاستقبال في الفندق عند طلب الإقامة؟",
        "question_en": "What does the traveler say to the hotel receptionist to book a room?",
        "question_ru": "Что говорит путешественник администратору отеля при бронировании номера?",
        "arabic_text": "أُرِيدُ حَجْزَ غُرْفَةٍ مِن فَضْلِكَ",
        "transliteration": "Ureedu hajza ghurfah min fadlik",
        "translation": "I would like to book a room please",
        "translation_en": "I would like to book a room please",
        "translation_ru": "Я хотел бы забронировать номер, пожалуйста",
        "question_type": "audio_mcq",
        "audio_url": "/audio/tuhfa/ayna_taskun.mp3",
        "options_json": [
            {"id": "opt1", "text": "أُرِيدُ حَجْزَ غُرْفَةٍ مِن فَضْلِكَ", "transliteration": "Ureedu hajza ghurfah", "text_en": "I want to book a room please", "text_ru": "Я хочу забронировать номер, пожалуйста"},
            {"id": "opt2", "text": "أَيْنَ مَحَطَّةُ القِطَارِ؟", "transliteration": "Ayna mahattatul-qitaar", "text_en": "Where is the train station?", "text_ru": "Где вокзал?"},
            {"id": "opt3", "text": "بِكَمْ هَذَا القَمِيصُ؟", "transliteration": "Bikam hadhal-qamees", "text_en": "How much is this shirt?", "text_ru": "Сколько стоит эта рубашка?"},
            {"id": "opt4", "text": "إِلَى اللِّقَاءِ يَا أُسْتَاذِي", "transliteration": "Ila al-liqa' ya ustadh", "text_en": "Goodbye teacher", "text_ru": "До свидания, учитель"}
        ],
        "correct_answer": "opt1",
        "explanation": "العبارة اللبقة لحجز إقامة في الفندق هي: أُرِيدُ حَجْزَ غُرْفَةٍ مِن فَضْلِكَ.",
        "explanation_ar": "العبارة اللبقة لحجز إقامة في الفندق هي: أُرِيدُ حَجْزَ غُرْفَةٍ مِن فَضْلِكَ.",
        "explanation_en": "The polite request to reserve a room is: أُرِيدُ حَجْزَ غُرْفَةٍ مِن فَضْلِكَ.",
        "explanation_ru": "Вежливая фраза для бронирования: «Я хотел бы забронировать номер, пожалуйста».",
        "order_index": 1
    },

    # 11. Lesson 9: Airport & Passports (b1000000-0000-0000-0000-000000000011)
    {
        "id": "e1000000-0011-0000-0000-000000000001",
        "lesson_id": "b1000000-0000-0000-0000-000000000011",
        "question_text": "ما هي الوثيقة الرسمية التي يقدمها المسافر لضابط الجوازات في المطار؟",
        "question_ar": "ما هي الوثيقة الرسمية التي يقدمها المسافر لضابط الجوازات في المطار؟",
        "question_en": "What official document does the traveler present to the passport officer at the airport?",
        "question_ru": "Какой официальный документ путешественник предъявляет офицеру паспортного контроля?",
        "arabic_text": "جَوَازُ السَّفَرِ",
        "transliteration": "Jawaazul-safar",
        "translation": "Passport",
        "translation_en": "Passport",
        "translation_ru": "Заграничный паспорт",
        "question_type": "audio_mcq",
        "audio_url": "/audio/tuhfa/bilad.mp3",
        "options_json": [
            {"id": "opt1", "text": "جَوَازُ السَّفَرِ وَالتَّأْشِيرَةُ", "transliteration": "Jawaazul-safar wat-ta'sheerah", "text_en": "Passport and Visa", "text_ru": "Паспорт и виза"},
            {"id": "opt2", "text": "شَهَادَةُ المِيلَادِ", "transliteration": "Shahadatil-meelaad", "text_en": "Birth certificate", "text_ru": "Свидетельство о рождении"},
            {"id": "opt3", "text": "فَاتُورَةُ الشِّرَاءِ", "transliteration": "Fatooratul-shiraa", "text_en": "Purchase invoice", "text_ru": "Чек о покупке"},
            {"id": "opt4", "text": "كِتَابُ القِرَاءَةِ", "transliteration": "Kitaabul-qiraa'ah", "text_en": "Reading book", "text_ru": "Книга для чтения"}
        ],
        "correct_answer": "opt1",
        "explanation": "يطلب ضابط الجوازات: جَوَازَ السَّفَرِ وَتَأْشِيرَةَ الدُّخُولِ.",
        "explanation_ar": "يطلب ضابط الجوازات: جَوَازَ السَّفَرِ وَتَأْشِيرَةَ الدُّخُولِ.",
        "explanation_en": "The immigration officer requests the passport and entry visa.",
        "explanation_ru": "Офицер паспортного контроля запрашивает паспорт и визу.",
        "order_index": 1
    },

    # 12. Lesson 10: Human Body (b1000000-0000-0000-0000-000000000012)
    {
        "id": "e1000000-0012-0000-0000-000000000001",
        "lesson_id": "b1000000-0000-0000-0000-000000000012",
        "question_text": "بأي عضو من أعضاء الجسم يرى الإنسان الأشياء والألوان؟",
        "question_ar": "بأي عضو من أعضاء الجسم يرى الإنسان الأشياء والألوان؟",
        "question_en": "With which organ of the body does a human see objects and colors?",
        "question_ru": "С помощью какого органа человеческого тела человек видит предметы и цвета?",
        "arabic_text": "بِالعَيْنَيْنِ",
        "transliteration": "Bil-'aynayn",
        "translation": "With the eyes",
        "translation_en": "With the eyes",
        "translation_ru": "Глазами",
        "question_type": "audio_mcq",
        "audio_url": "/audio/letters/ayn.mp3",
        "options_json": [
            {"id": "opt1", "text": "بِالعَيْنِ", "transliteration": "Bil-'ayn", "text_en": "With the eye", "text_ru": "Глазом"},
            {"id": "opt2", "text": "بِالأُذُنِ", "transliteration": "Bil-udhun", "text_en": "With the ear", "text_ru": "Ухом"},
            {"id": "opt3", "text": "بِالأَنْفِ", "transliteration": "Bil-anf", "text_en": "With the nose", "text_ru": "Носом"},
            {"id": "opt4", "text": "بِاليَدِ", "transliteration": "Bil-yad", "text_en": "With the hand", "text_ru": "Рукой"}
        ],
        "correct_answer": "opt1",
        "explanation": "حاسة البصر تكون بالعين، وحاسة السمع بالأذن، والشم بالأنف.",
        "explanation_ar": "حاسة البصر تكون بالعين، وحاسة السمع بالأذن، والشم بالأنف.",
        "explanation_en": "Vision is experienced through the eyes (العَيْن).",
        "explanation_ru": "Зрение осуществляется с помощью глаз (العَيْن).",
        "order_index": 1
    },

    # 13. Lesson 11: Clothes (b1000000-0000-0000-0000-000000000013)
    {
        "id": "e1000000-0013-0000-0000-000000000001",
        "lesson_id": "b1000000-0000-0000-0000-000000000013",
        "question_text": "ما هو الملبس الذي يرتديه طالب العلم في مناسباته الرسمية؟",
        "question_ar": "ما هو الملبس الذي يرتديه طالب العلم في مناسباته الرسمية؟",
        "question_en": "What garment is traditionally worn for formal student gatherings?",
        "question_ru": "Какую одежду традиционно носят студенты на официальных встречах?",
        "arabic_text": "الثَّوْبُ الأَبْيَضُ النَّظِيفُ",
        "transliteration": "Ath-thawbul-abyad",
        "translation": "The clean white thobe",
        "translation_en": "The clean white thobe",
        "translation_ru": "Чистый белый тоб",
        "question_type": "audio_mcq",
        "audio_url": "/audio/letters/thaa.mp3",
        "options_json": [
            {"id": "opt1", "text": "الثَّوْبُ الأَبْيَضُ النَّظِيفُ", "transliteration": "Ath-thawbul-abyad", "text_en": "Clean white garment", "text_ru": "Чистая белая одежда"},
            {"id": "opt2", "text": "مَلَابِسُ السِّبَاحَةِ", "transliteration": "Malabisus-sibahah", "text_en": "Swimwear", "text_ru": "Плавки"},
            {"id": "opt3", "text": "المِعْطَفُ الثَّقِيلُ صَيْفاً", "transliteration": "Al-mi'taf", "text_en": "Heavy winter coat in summer", "text_ru": "Зимнее пальто летом"},
            {"id": "opt4", "text": "الحِذَاءُ فَقَطْ", "transliteration": "Al-hidhaa", "text_en": "Shoes only", "text_ru": "Только обувь"}
        ],
        "correct_answer": "opt1",
        "explanation": "الثوب الأبيض هو اللباس الأنيق لطلاب العلم في الأزهر.",
        "explanation_ar": "الثوب الأبيض هو اللباس الأنيق لطلاب العلم في الأزهر.",
        "explanation_en": "The white thobe represents elegance and purity for knowledge seekers.",
        "explanation_ru": "Белый тоб — традиционная элегантная одежда студентов.",
        "order_index": 1
    },

    # 14. Lesson 12: In the Market (b1000000-0000-0000-0000-000000000014)
    {
        "id": "e1000000-0014-0000-0000-000000000001",
        "lesson_id": "b1000000-0000-0000-0000-000000000014",
        "question_text": "كيف تسأل البائع في السوق عن ثمن السلعة في اللغة العربية؟",
        "question_ar": "كيف تسأل البائع في السوق عن ثمن السلعة في اللغة العربية؟",
        "question_en": "How do you ask the vendor in the marketplace about the price of an item?",
        "question_ru": "Как спросить продавца на рынке о цене товара на арабском языке?",
        "arabic_text": "بِكَمْ هَذَا؟",
        "transliteration": "Bikam hadha?",
        "translation": "How much is this?",
        "translation_en": "How much is this?",
        "translation_ru": "Сколько это стоит?",
        "question_type": "audio_mcq",
        "audio_url": "/audio/letters/seen.mp3",
        "options_json": [
            {"id": "opt1", "text": "بِكَمْ هَذَا يَا أَخِي؟", "transliteration": "Bikam hadha ya akhi?", "text_en": "How much is this, brother?", "text_ru": "Сколько это стоит, брат?"},
            {"id": "opt2", "text": "أَيْنَ المَطَارُ؟", "transliteration": "Ayna al-mataar?", "text_en": "Where is the airport?", "text_ru": "Где аэропорт?"},
            {"id": "opt3", "text": "مَا اسْمُكَ؟", "transliteration": "Mas-muk?", "text_en": "What is your name?", "text_ru": "Как тебя зовут?"},
            {"id": "opt4", "text": "كَيْفَ حَالُكَ؟", "transliteration": "Kayfa haluk?", "text_en": "How are you?", "text_ru": "Как твои дела?"}
        ],
        "correct_answer": "opt1",
        "explanation": "أداة الاستفهام عن السعر والثمن هي (بِكَمْ).",
        "explanation_ar": "أداة الاستفهام عن السعر والثمن هي (بِكَمْ).",
        "explanation_en": "The interrogative particle used for price in Arabic is Bikam (بِكَمْ).",
        "explanation_ru": "Вопросительная частица для цены — «Бикам» (بِكَمْ).",
        "order_index": 1
    },

    # 15. Lesson 13: Vegetables & Fruits (b1000000-0000-0000-0000-000000000015)
    {
        "id": "e1000000-0015-0000-0000-000000000001",
        "lesson_id": "b1000000-0000-0000-0000-000000000015",
        "question_text": "أي من الأصناف الآتية يعد من الفواكه اللذيذة والغنية بالفيتامينات؟",
        "question_ar": "أي من الأصناف الآتية يعد من الفواكه اللذيذة والغنية بالفيتامينات؟",
        "question_en": "Which of the following items is a fruit rich in vitamins?",
        "question_ru": "Что из перечисленного является вкусным фруктом, богатым витаминами?",
        "arabic_text": "التُّفَّاحُ وَالعِنَبُ",
        "transliteration": "At-tuffahu wal-'inab",
        "translation": "Apples and Grapes",
        "translation_en": "Apples and Grapes",
        "translation_ru": "Яблоки и виноград",
        "question_type": "audio_mcq",
        "audio_url": "/audio/letters/taa.mp3",
        "options_json": [
            {"id": "opt1", "text": "التُّفَّاحُ وَالعِنَبُ", "transliteration": "At-tuffahu wal-'inab", "text_en": "Apples and Grapes", "text_ru": "Яблоки и виноград"},
            {"id": "opt2", "text": "البَصَلُ وَالثُّومُ", "transliteration": "Al-basal wath-thawm", "text_en": "Onions and Garlic", "text_ru": "Лук и чеснок"},
            {"id": "opt3", "text": "المِلْحُ وَالفُلْفُلُ", "transliteration": "Al-milh wal-fulful", "text_en": "Salt and Pepper", "text_ru": "Соль и перец"},
            {"id": "opt4", "text": "الخُبْزُ وَالأَرُزُّ", "transliteration": "Al-khubz wal-aruzz", "text_en": "Bread and Rice", "text_ru": "Хлеб и рис"}
        ],
        "correct_answer": "opt1",
        "explanation": "التفاح والعنب والبرتقال من الفواكه، بينما البصل والثوم من الخضروات.",
        "explanation_ar": "التفاح والعنب والبرتقال من الفواكه، بينما البصل والثوم من الخضروات.",
        "explanation_en": "Apples and grapes are fruits, whereas onions are vegetables.",
        "explanation_ru": "Яблоки и виноград — это фрукты.",
        "order_index": 1
    },

    # 16. Lesson 14: Friends (b1000000-0000-0000-0000-000000000016)
    {
        "id": "e1000000-0016-0000-0000-000000000001",
        "lesson_id": "b1000000-0000-0000-0000-000000000016",
        "question_text": "ما هي العبارة المحببة للترحيب بالصديق عند زيارته في منزلك؟",
        "question_ar": "ما هي العبارة المحببة للترحيب بالصديق عند زيارته في منزلك؟",
        "question_en": "What is the welcoming phrase used when receiving a friend at your home?",
        "question_ru": "Какую приветственную фразу используют при встрече друга дома?",
        "arabic_text": "أَهْلاً وَسَهْلاً يَا صَدِيقِي العَزِيزَ",
        "transliteration": "Ahlan wa sahlan ya sadiqi",
        "translation": "Welcome my dear friend",
        "translation_en": "Welcome my dear friend",
        "translation_ru": "Добро пожаловать, мой дорогой друг",
        "question_type": "audio_mcq",
        "audio_url": "/audio/tuhfa/salam_intro.mp3",
        "options_json": [
            {"id": "opt1", "text": "أَهْلاً وَسَهْلاً يَا صَدِيقِي العَزِيزَ", "transliteration": "Ahlan wa sahlan ya sadiqi", "text_en": "Welcome, my dear friend", "text_ru": "Добро пожаловать, дорогой друг"},
            {"id": "opt2", "text": "إِلَى أَيْنَ تَذْهَبُ؟", "transliteration": "Ila ayna tadhhab?", "text_en": "Where are you going?", "text_ru": "Куда ты идешь?"},
            {"id": "opt3", "text": "أَنَا مَشْغُولٌ جِدّاً", "transliteration": "Ana mashghool", "text_en": "I am very busy", "text_ru": "Я очень занят"},
            {"id": "opt4", "text": "أَعْطِنِي الحِسَابَ", "transliteration": "A'tini al-hisab", "text_en": "Give me the bill", "text_ru": "Дайте мне счет"}
        ],
        "correct_answer": "opt1",
        "explanation": "نرحب بالصديق بعبارة: أَهْلاً وَسَهْلاً يَا صَدِيقِي.",
        "explanation_ar": "نرحب بالصديق بعبارة: أَهْلاً وَسَهْلاً يَا صَدِيقِي.",
        "explanation_en": "We greet visitors warmly saying: أَهْلاً وَسَهْلاً.",
        "explanation_ru": "Гостей приветствуют фразой: «Ахлян ва сахлян» (Добро пожаловать).",
        "order_index": 1
    },

    # 17. Lesson 15: Sports & The Club (b1000000-0000-0000-0000-000000000017)
    {
        "id": "e1000000-0017-0000-0000-000000000001",
        "lesson_id": "b1000000-0000-0000-0000-000000000017",
        "question_text": "في درس النادي والرياضة: ما هي الرياضة المائية المفضلة للصحة والنشاط؟",
        "question_ar": "في درس النادي والرياضة: ما هي الرياضة المائية المفضلة للصحة والنشاط؟",
        "question_en": "In the Sports lesson: Which water sport is favored for fitness and vitality?",
        "question_ru": "В уроке о спорте: Какой водный вид спорта полезен для здоровья и бодрости?",
        "arabic_text": "السِّبَاحَةُ",
        "transliteration": "As-sibahah",
        "translation": "Swimming",
        "translation_en": "Swimming",
        "translation_ru": "Плавание",
        "question_type": "audio_mcq",
        "audio_url": "/audio/letters/seen.mp3",
        "options_json": [
            {"id": "opt1", "text": "السِّبَاحَةُ فِي المَسْبَحِ", "transliteration": "As-sibahatu fil-masbah", "text_en": "Swimming in the pool", "text_ru": "Плавание в бассейне"},
            {"id": "opt2", "text": "النَّوْمُ الطَّوِيلُ", "transliteration": "An-nawmul-taweel", "text_en": "Long sleep", "text_ru": "Долгий сон"},
            {"id": "opt3", "text": "مُشَاهَدَةُ التِّلْفَازِ", "transliteration": "Mushahadatul-tilfaz", "text_en": "Watching television", "text_ru": "Просмотр телевизора"},
            {"id": "opt4", "text": "أَكْلُ الحَلْوَى", "transliteration": "Aklul-halwa", "text_en": "Eating sweets", "text_ru": "Употребление сладостей"}
        ],
        "correct_answer": "opt1",
        "explanation": "السباحة وركوب الخيل والرماية من الرياضات النافعة لبناء الجسم.",
        "explanation_ar": "السباحة وركوب الخيل والرماية من الرياضات النافعة لبناء الجسم.",
        "explanation_en": "Swimming (السِّبَاحَة) is a praised sport that strengthens the body.",
        "explanation_ru": "Плавание (السِّبَاحَة) — полезный вид спорта, укрепляющий тело.",
        "order_index": 1
    }
]

def escape_sql(val):
    if val is None:
        return "NULL"
    if isinstance(val, (int, float, bool)):
        return str(val)
    if isinstance(val, (dict, list)):
        s = json.dumps(val, ensure_ascii=False)
        return "'" + s.replace("'", "''") + "'::jsonb"
    return "'" + str(val).replace("'", "''") + "'"

with open("scripts/exercises_part2.sql", "w", encoding="utf-8") as f:
    for ex in exercises:
        sql = f"""INSERT INTO exercises (
    id, lesson_id, question_text, question_ar, question_en, question_ru,
    arabic_text, transliteration, translation, translation_en, translation_ru,
    question_type, audio_url, options_json, correct_answer,
    explanation, explanation_ar, explanation_en, explanation_ru, order_index
) VALUES (
    {escape_sql(ex['id'])}, {escape_sql(ex['lesson_id'])}, {escape_sql(ex['question_text'])}, {escape_sql(ex['question_ar'])}, {escape_sql(ex['question_en'])}, {escape_sql(ex['question_ru'])},
    {escape_sql(ex['arabic_text'])}, {escape_sql(ex['transliteration'])}, {escape_sql(ex['translation'])}, {escape_sql(ex['translation_en'])}, {escape_sql(ex['translation_ru'])},
    {escape_sql(ex['question_type'])}, {escape_sql(ex['audio_url'])}, {escape_sql(ex['options_json'])}, {escape_sql(ex['correct_answer'])},
    {escape_sql(ex['explanation'])}, {escape_sql(ex['explanation_ar'])}, {escape_sql(ex['explanation_en'])}, {escape_sql(ex['explanation_ru'])}, {ex['order_index']}
);\n"""
        f.write(sql)

print(f"Regenerated exercises_part2.sql with {len(exercises)} audio_mcq exercises.")
