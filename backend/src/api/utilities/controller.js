const db = require("../../config/db");

const DICT_FALLBACK = [
  { word_np:"नमस्ते",      word_en:"Namaste",       definition:"A respectful greeting",                          category:"greeting" },
  { word_np:"धन्यवाद",     word_en:"Thank you",     definition:"Expression of gratitude",                        category:"greeting" },
  { word_np:"माफ गर्नुस्", word_en:"Excuse me",     definition:"Polite way to apologize or get attention",       category:"greeting" },
  { word_np:"राम्रो",      word_en:"Good / Nice",   definition:"Adjective meaning good, nice, or beautiful",     category:"adjective" },
  { word_np:"खाना",        word_en:"Food / Meal",   definition:"General term for food or a meal",                category:"noun" },
  { word_np:"पानी",        word_en:"Water",         definition:"The liquid essential for life",                  category:"noun" },
  { word_np:"घर",          word_en:"House / Home",  definition:"A building where people live",                   category:"noun" },
  { word_np:"देश",         word_en:"Country",       definition:"A nation or territory",                          category:"noun" },
  { word_np:"मान्छे",      word_en:"Person",        definition:"A human being",                                  category:"noun" },
  { word_np:"काम",         word_en:"Work / Job",    definition:"An activity involving effort",                   category:"noun" },
  { word_np:"प्रेम",       word_en:"Love",          definition:"Deep affection or romantic feeling",             category:"noun" },
  { word_np:"सुन्दर",      word_en:"Beautiful",     definition:"Pleasing to the senses",                         category:"adjective" },
  { word_np:"साथी",        word_en:"Friend",        definition:"A person with whom one has a bond of affection", category:"noun" },
  { word_np:"आकाश",        word_en:"Sky",           definition:"The region of the atmosphere above the earth",   category:"noun" },
  { word_np:"पहाड",        word_en:"Mountain / Hill",definition:"A large natural elevation of earth",            category:"noun" },
];

const NEWS_PORTALS = [
  { name:"Kantipur",         url:"https://ekantipur.com",                          icon:"📰", desc:"Nepal's largest daily newspaper",    category:"newspaper" },
  { name:"Ratopati",         url:"https://ratopati.com",                           icon:"🔴", desc:"Breaking news & politics",           category:"news" },
  { name:"Setopati",         url:"https://setopati.com",                           icon:"⚪", desc:"In-depth reporting & analysis",      category:"news" },
  { name:"OnlineKhabar",     url:"https://onlinekhabar.com",                       icon:"🌐", desc:"Digital news portal",                category:"news" },
  { name:"Nagarik",          url:"https://nagariknews.nagariknetwork.com",         icon:"📄", desc:"National daily",                     category:"newspaper" },
  { name:"Gorkhapatra",      url:"https://gorkhapatraonline.com",                  icon:"🏛", desc:"Government official daily",          category:"newspaper" },
  { name:"Annapurna Post",   url:"https://annapurnapost.com",                      icon:"🏔", desc:"Himalayan news coverage",            category:"newspaper" },
  { name:"Himalkhabar",      url:"https://himalkhabar.com",                        icon:"⛰", desc:"Himal Media Group",                  category:"magazine" },
  { name:"Nepali Times",     url:"https://nepalitimes.com",                        icon:"🕐", desc:"English weekly magazine",            category:"magazine" },
  { name:"Republica",        url:"https://myrepublica.nagariknetwork.com",         icon:"🗞", desc:"English daily",                      category:"newspaper" },
  { name:"The Himalayan Times",url:"https://thehimalayantimes.com",               icon:"🏔", desc:"English broadsheet",                 category:"newspaper" },
  { name:"Nepal Samacharpatra",url:"https://nepalsam.com",                         icon:"📋", desc:"National news",                      category:"newspaper" },
];

const searchDictionary = async (req, res) => {
  const { q } = req.query;
  try {
    const query = q
      ? "SELECT * FROM dictionary WHERE word_np ILIKE $1 OR word_en ILIKE $1 OR definition ILIKE $1 LIMIT 30"
      : "SELECT * FROM dictionary ORDER BY word_np LIMIT 50";
    const params = q ? [`%${q}%`] : [];
    const r = await db.query(query, params);
    if (r.rows.length) return res.json(r.rows);
  } catch {}
  const filtered = q
    ? DICT_FALLBACK.filter((d) => d.word_np.includes(q) || d.word_en.toLowerCase().includes(q.toLowerCase()))
    : DICT_FALLBACK;
  res.json(filtered);
};

const getNewsPortals = (req, res) => res.json(NEWS_PORTALS);

module.exports = { searchDictionary, getNewsPortals };
