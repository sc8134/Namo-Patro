-- Truncate and re-seed festivals
TRUNCATE TABLE festivals RESTART IDENTITY CASCADE;

INSERT INTO festivals (name, name_np, bs_date, ad_date, description, category, region, is_holiday) VALUES
('Dashain (Ghatasthapana)', 'दशैं (घटस्थापना)', '2081-06-15', '2024-10-02', 'The biggest Hindu festival in Nepal. Celebrates the victory of Goddess Durga over the demon Mahishasura. Spans 15 days.', 'major', 'nationwide', true),
('Dashain (Vijaya Dashami)', 'विजया दशमी', '2081-06-24', '2024-10-11', 'Main day of Dashain. Tika and Jamara ceremony. Family gatherings and blessings from elders.', 'major', 'nationwide', true),
('Tihar (Laxmi Puja)', 'तिहार (लक्ष्मी पूजा)', '2081-07-01', '2024-10-17', 'Festival of lights. Goddess Laxmi is worshipped. Homes are decorated with oil lamps and rangoli.', 'major', 'nationwide', true),
('Tihar (Bhai Tika)', 'भाइ टीका', '2081-07-03', '2024-10-19', 'Sisters apply tika to brothers for long life. One of the most cherished Tihar rituals.', 'major', 'nationwide', true),
('Chhath Parwa', 'छठ पर्व', '2081-07-20', '2024-11-05', 'Sun worship festival. Devotees fast and offer arghya to the rising and setting sun. Major in Terai.', 'major', 'terai', true),
('Holi', 'होली', '2080-11-29', '2024-03-25', 'Festival of colors celebrating the arrival of spring and victory of good over evil.', 'major', 'nationwide', true),
('Teej', 'तीज', '2081-05-18', '2024-09-06', 'Festival for women. Married women fast for the long life of their husbands. Celebrated with dance and song.', 'cultural', 'nationwide', false),
('Buddha Jayanti', 'बुद्ध जयन्ती', '2081-01-30', '2024-05-23', 'Birthday of Gautama Buddha. Celebrated at Lumbini and Swayambhunath with prayers and processions.', 'religious', 'nationwide', true),
('Indra Jatra', 'इन्द्र जात्रा', '2081-05-29', '2024-09-17', 'Eight-day festival in Kathmandu Valley honoring Indra, the god of rain. Features the Kumari chariot procession.', 'cultural', 'kathmandu', false),
('Losar', 'लोसार', '2080-10-01', '2024-02-10', 'Tibetan New Year celebrated by Sherpa, Tamang, and Gurung communities with prayers and feasts.', 'cultural', 'hilly', false),
('Maghe Sankranti', 'माघे संक्रान्ति', '2080-09-01', '2024-01-15', 'Marks the end of the winter solstice. People take holy dips in rivers and eat sesame sweets.', 'religious', 'nationwide', false),
('Janai Purnima', 'जनै पूर्णिमा', '2081-04-17', '2024-08-19', 'Sacred thread ceremony. Hindus change their janai. Raksha Bandhan is also observed.', 'religious', 'nationwide', false),
('Gai Jatra', 'गाई जात्रा', '2081-04-18', '2024-08-20', 'Festival of cows. Families who lost a member in the past year lead a cow or a boy dressed as one through the streets.', 'cultural', 'kathmandu', false),
('Krishna Janmashtami', 'कृष्ण जन्माष्टमी', '2081-04-23', '2024-08-26', 'Birthday of Lord Krishna. Celebrated with fasting, prayers, and midnight worship.', 'religious', 'nationwide', false),
('Nag Panchami', 'नाग पञ्चमी', '2081-04-05', '2024-08-07', 'Worship of serpent gods. Images of snakes are pasted above doorways for protection.', 'religious', 'nationwide', false),
('Rato Machhindranath Jatra', 'रातो मच्छिन्द्रनाथ जात्रा', '2081-01-15', '2024-04-28', 'Longest chariot festival in the world. Held in Lalitpur (Patan) for months.', 'cultural', 'kathmandu', false),
('Bisket Jatra', 'बिस्केट जात्रा', '2081-12-30', '2025-04-13', 'Bhaktapur New Year festival. A massive chariot procession and tug of war.', 'cultural', 'kathmandu', false),
('Ghode Jatra', 'घोडे जात्रा', '2080-12-15', '2024-03-29', 'Horse racing festival at Tundikhel, Kathmandu. Believed to ward off evil spirits.', 'cultural', 'kathmandu', false);
