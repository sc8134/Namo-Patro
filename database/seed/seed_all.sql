-- Panchang data (sample for 2081 BS / 2024 AD)
INSERT INTO panchang (ad_date, bs_date, tithi, vara, nakshatra, yoga, karana, sunrise, sunset, moon_phase) VALUES
('2024-10-02', '2081-06-15', 'Pratipada', 'Budhavar', 'Ashwini', 'Vishkambha', 'Bava', '06:02', '18:08', 'New Moon'),
('2024-10-11', '2081-06-24', 'Dashami', 'Sukravar', 'Hasta', 'Siddha', 'Balava', '06:08', '18:00', 'Waxing Gibbous'),
('2024-10-17', '2081-07-01', 'Purnima', 'Gurubavar', 'Ashwini', 'Vriddhi', 'Bava', '06:12', '17:55', 'Full Moon'),
('2024-11-05', '2081-07-20', 'Saptami', 'Mangalavar', 'Rohini', 'Siddha', 'Kaulava', '06:22', '17:40', 'Waxing Crescent')
ON CONFLICT (ad_date) DO NOTHING;

-- Forex rates (Nepal Rastra Bank reference)
INSERT INTO forex_rates (currency_code, currency_name, flag, buy_rate, sell_rate, unit) VALUES
('USD', 'US Dollar',          '🇺🇸', 133.45, 134.05, 1),
('EUR', 'Euro',               '🇪🇺', 144.20, 144.90, 1),
('GBP', 'British Pound',      '🇬🇧', 168.50, 169.30, 1),
('INR', 'Indian Rupee',       '🇮🇳', 1.59,   1.61,   1),
('AUD', 'Australian Dollar',  '🇦🇺', 86.20,  86.80,  1),
('CAD', 'Canadian Dollar',    '🇨🇦', 97.80,  98.40,  1),
('JPY', 'Japanese Yen',       '🇯🇵', 0.88,   0.90,   1),
('CHF', 'Swiss Franc',        '🇨🇭', 148.60, 149.40, 1),
('SGD', 'Singapore Dollar',   '🇸🇬', 98.50,  99.10,  1),
('QAR', 'Qatari Riyal',       '🇶🇦', 36.60,  36.90,  1),
('SAR', 'Saudi Riyal',        '🇸🇦', 35.50,  35.80,  1),
('AED', 'UAE Dirham',         '🇦🇪', 36.30,  36.60,  1),
('MYR', 'Malaysian Ringgit',  '🇲🇾', 28.90,  29.20,  1),
('KRW', 'South Korean Won',   '🇰🇷', 0.097,  0.099, 1),
('CNY', 'Chinese Yuan',       '🇨🇳', 18.40,  18.60,  1)
ON CONFLICT DO NOTHING;

-- Metal prices
INSERT INTO metal_prices (metal, unit, price, change_amount, change_pct) VALUES
('Gold (Fine)',   'per tola', 148500, 1200,  0.81),
('Gold (Tejabi)', 'per tola', 147800, 1100,  0.75),
('Silver',        'per tola', 1820,   -15,  -0.82)
ON CONFLICT DO NOTHING;

-- Vegetable rates (Kalimati Fruits and Vegetable Market)
INSERT INTO vegetable_rates (name, name_np, unit, min_price, max_price, avg_price) VALUES
('Tomato',      'गोलभेडा',   'per kg',    40,  60,  50),
('Potato',      'आलु',       'per kg',    25,  35,  30),
('Onion',       'प्याज',     'per kg',    50,  70,  60),
('Cauliflower', 'काउली',     'per piece', 30,  50,  40),
('Cabbage',     'बन्दा',     'per kg',    20,  30,  25),
('Carrot',      'गाजर',      'per kg',    40,  55,  47),
('Spinach',     'पालुंगो',   'per bundle',15,  25,  20),
('Radish',      'मूला',      'per kg',    20,  30,  25),
('Bitter Gourd','करेला',     'per kg',    60,  80,  70),
('Pumpkin',     'फर्सी',     'per kg',    25,  40,  32),
('Cucumber',    'काक्रो',    'per kg',    30,  45,  37),
('Green Beans', 'सिमी',      'per kg',    50,  70,  60)
ON CONFLICT DO NOTHING;

-- NEPSE share market
INSERT INTO share_market (symbol, company_name, sector, ltp, change_amount, change_pct, volume) VALUES
('NABIL',  'Nabil Bank Limited',              'Commercial Bank',  1245, 18,  1.47,  12450),
('NICA',   'NIC Asia Bank Limited',           'Commercial Bank',  892, -12, -1.33,  8920),
('SCB',    'Standard Chartered Bank Nepal',   'Commercial Bank',  2340, 45,  1.96,  3200),
('ADBL',   'Agricultural Dev Bank Limited',   'Dev Bank',         445,  5,  1.14,  22100),
('NLIC',   'Nepal Life Insurance Company',    'Life Insurance',   1890,-22, -1.15,  5600),
('SHIVM',  'Shiva Shree Hydropower',          'Hydropower',       312,  8,  2.63,  45000),
('UPPER',  'Upper Tamakoshi Hydropower',      'Hydropower',       285,  3,  1.06,  38000),
('GBIME',  'Global IME Bank',                 'Commercial Bank',  380, -5,  -1.30, 18000),
('SANIMA', 'Sanima Bank Limited',             'Commercial Bank',  420,  7,  1.69,  9800),
('PRVU',   'Prabhu Bank Limited',             'Commercial Bank',  295, -3,  -1.01, 14200)
ON CONFLICT DO NOTHING;

-- Radio stations
INSERT INTO radio_stations (name, frequency, genre, stream_url, website, description) VALUES
('Radio Nepal',      '100 MHz',  'National',    'https://stream.radionepal.gov.np/live', 'https://radionepal.gov.np',    'Official national broadcaster of Nepal'),
('Kantipur FM',      '96.1 MHz', 'News/Music',  'https://stream.kantipurfm.com/live',   'https://kantipurfm.com',       'Nepal''s most popular FM station'),
('Image FM',         '97.9 MHz', 'Music',       'https://stream.imagefm.com.np/live',   'https://imagefm.com.np',       'Hit music and entertainment'),
('Hits FM',          '91.2 MHz', 'Pop/Hits',    'https://stream.hitsfm.com.np/live',    'https://hitsfm.com.np',        'Top hits and Nepali pop'),
('Ujyaalo FM',       '90 MHz',   'News',        'https://stream.ujyaaloonline.com/live', 'https://ujyaaloonline.com',   'News and current affairs'),
('Sagarmatha FM',    '102.4 MHz','Cultural',    'https://stream.sagarmatharadio.com/live','https://sagarmatharadio.com','Cultural and folk music'),
('Annapurna FM',     '93.4 MHz', 'Regional',    'https://stream.annapurnafm.com/live',  'https://annapurnafm.com',      'Regional news and music'),
('Kalika FM',        '88.0 MHz', 'Bhajan',      'https://stream.kalikafm.com/live',     'https://kalikafm.com',         'Devotional and bhajan music')
ON CONFLICT DO NOTHING;

-- Rashifal (daily horoscope for today)
INSERT INTO rashifal (rashi, rashi_np, date, prediction, lucky_number, lucky_color, lucky_gem) VALUES
('Mesh',      'मेष',     CURRENT_DATE, 'आज तपाईंको दिन उत्साहजनक छ। नयाँ कार्यको शुरुआत गर्न उत्तम समय। आर्थिक लाभको सम्भावना छ।', '3, 9', 'Red', 'Ruby'),
('Brish',     'वृष',     CURRENT_DATE, 'आर्थिक मामिलामा सावधानी अपनाउनुहोस्। परिवारसँग समय बिताउनुहोस्। स्वास्थ्यमा ध्यान दिनुहोस्।', '2, 6', 'Green', 'Emerald'),
('Mithun',    'मिथुन',   CURRENT_DATE, 'संचारमा स्पष्टता राख्नुहोस्। नयाँ सम्बन्ध बन्न सक्छ। व्यापारमा सफलता मिल्छ।', '5, 7', 'Yellow', 'Topaz'),
('Karkat',    'कर्कट',   CURRENT_DATE, 'भावनात्मक स्थिरता महत्त्वपूर्ण छ। घरेलु कार्यमा सफलता। प्रेम सम्बन्धमा मिठास।', '2, 7', 'White', 'Pearl'),
('Singha',    'सिंह',    CURRENT_DATE, 'नेतृत्व क्षमता प्रदर्शन गर्ने अवसर। आत्मविश्वास राख्नुहोस्। करियरमा उन्नति।', '1, 5', 'Gold', 'Diamond'),
('Kanya',     'कन्या',   CURRENT_DATE, 'विस्तृत कार्यमा ध्यान दिनुहोस्। स्वास्थ्यमा सचेत रहनुहोस्। बचत गर्नुहोस्।', '3, 8', 'Brown', 'Sapphire'),
('Tula',      'तुला',    CURRENT_DATE, 'सन्तुलन कायम राख्नुहोस्। साझेदारीमा लाभ हुन सक्छ। सामाजिक जीवन सक्रिय।', '6, 9', 'Blue', 'Opal'),
('Brischik',  'वृश्चिक', CURRENT_DATE, 'गहन अनुसन्धानमा सफलता। गोपनीय कुरा सुरक्षित राख्नुहोस्। आर्थिक स्थिति सुधार।', '1, 8', 'Maroon', 'Coral'),
('Dhanu',     'धनु',     CURRENT_DATE, 'यात्रा र शिक्षामा शुभ। दार्शनिक विचारमा समय बिताउनुहोस्। भाग्य साथ छ।', '3, 9', 'Purple', 'Turquoise'),
('Makar',     'मकर',     CURRENT_DATE, 'व्यावसायिक लक्ष्यमा अग्रसर हुनुहोस्। अनुशासन कायम राख्नुहोस्। मेहनत फल दिन्छ।', '6, 8', 'Black', 'Garnet'),
('Kumbha',    'कुम्भ',   CURRENT_DATE, 'नवीन विचारहरू कार्यान्वयन गर्नुहोस्। मित्रहरूसँग सहयोग लिनुहोस्। सफलता नजिक।', '4, 7', 'Sky Blue', 'Amethyst'),
('Meen',      'मीन',     CURRENT_DATE, 'आध्यात्मिक चिन्तनमा शान्ति पाउनुहोस्। कलात्मक कार्यमा सफलता। मन शान्त राख्नुहोस्।', '3, 7', 'Sea Green', 'Aquamarine')
ON CONFLICT (rashi, date) DO NOTHING;

-- Nepali dictionary (sample)
INSERT INTO dictionary (word_np, word_en, definition, example, category) VALUES
('नमस्ते',      'Namaste',       'A respectful greeting used in Nepal and India',                    'नमस्ते, तपाईंलाई कस्तो छ?', 'greeting'),
('धन्यवाद',     'Thank you',     'Expression of gratitude',                                          'तपाईंको सहयोगको लागि धन्यवाद।', 'greeting'),
('माफ गर्नुस्', 'Excuse me',     'Polite way to apologize or get attention',                         'माफ गर्नुस्, यो बाटो कहाँ जान्छ?', 'greeting'),
('राम्रो',      'Good / Nice',   'Adjective meaning good, nice, or beautiful',                       'यो ठाउँ धेरै राम्रो छ।', 'adjective'),
('खाना',        'Food / Meal',   'General term for food or a meal',                                  'खाना खानुभयो?', 'noun'),
('पानी',        'Water',         'The liquid essential for life',                                    'एक गिलास पानी दिनुस्।', 'noun'),
('घर',          'House / Home',  'A building where people live',                                     'मेरो घर काठमाडौंमा छ।', 'noun'),
('देश',         'Country',       'A nation or territory',                                            'नेपाल सुन्दर देश हो।', 'noun'),
('मान्छे',      'Person',        'A human being',                                                    'त्यो मान्छे को हो?', 'noun'),
('काम',         'Work / Job',    'An activity involving effort',                                     'मेरो काम राम्रो छ।', 'noun'),
('प्रेम',       'Love',          'Deep affection or romantic feeling',                               'प्रेम जीवनको आधार हो।', 'noun'),
('सुन्दर',      'Beautiful',     'Pleasing to the senses',                                           'नेपाल सुन्दर देश हो।', 'adjective'),
('ठूलो',        'Big / Large',   'Of great size',                                                    'हिमाल ठूलो छ।', 'adjective'),
('साथी',        'Friend',        'A person with whom one has a bond of mutual affection',            'ऊ मेरो राम्रो साथी हो।', 'noun'),
('आकाश',        'Sky',           'The region of the atmosphere above the earth',                     'आकाश नीलो छ।', 'noun')
ON CONFLICT DO NOTHING;
