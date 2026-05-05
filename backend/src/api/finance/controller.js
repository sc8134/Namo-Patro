const db = require("../../config/db");

// Fallback static data when DB unavailable
const FOREX_FALLBACK = [
  { currency_code:"USD", currency_name:"US Dollar",          flag:"🇺🇸", buy_rate:133.45, sell_rate:134.05, unit:1 },
  { currency_code:"EUR", currency_name:"Euro",               flag:"🇪🇺", buy_rate:144.20, sell_rate:144.90, unit:1 },
  { currency_code:"GBP", currency_name:"British Pound",      flag:"🇬🇧", buy_rate:168.50, sell_rate:169.30, unit:1 },
  { currency_code:"INR", currency_name:"Indian Rupee",       flag:"🇮🇳", buy_rate:1.59,   sell_rate:1.61,   unit:1 },
  { currency_code:"AUD", currency_name:"Australian Dollar",  flag:"🇦🇺", buy_rate:86.20,  sell_rate:86.80,  unit:1 },
  { currency_code:"CAD", currency_name:"Canadian Dollar",    flag:"🇨🇦", buy_rate:97.80,  sell_rate:98.40,  unit:1 },
  { currency_code:"JPY", currency_name:"Japanese Yen",       flag:"🇯🇵", buy_rate:0.88,   sell_rate:0.90,   unit:1 },
  { currency_code:"CHF", currency_name:"Swiss Franc",        flag:"🇨🇭", buy_rate:148.60, sell_rate:149.40, unit:1 },
  { currency_code:"SGD", currency_name:"Singapore Dollar",   flag:"🇸🇬", buy_rate:98.50,  sell_rate:99.10,  unit:1 },
  { currency_code:"QAR", currency_name:"Qatari Riyal",       flag:"🇶🇦", buy_rate:36.60,  sell_rate:36.90,  unit:1 },
  { currency_code:"SAR", currency_name:"Saudi Riyal",        flag:"🇸🇦", buy_rate:35.50,  sell_rate:35.80,  unit:1 },
  { currency_code:"AED", currency_name:"UAE Dirham",         flag:"🇦🇪", buy_rate:36.30,  sell_rate:36.60,  unit:1 },
  { currency_code:"MYR", currency_name:"Malaysian Ringgit",  flag:"🇲🇾", buy_rate:28.90,  sell_rate:29.20,  unit:1 },
  { currency_code:"CNY", currency_name:"Chinese Yuan",       flag:"🇨🇳", buy_rate:18.40,  sell_rate:18.60,  unit:1 },
];

const METALS_FALLBACK = [
  { metal:"Gold (Fine)",   unit:"per tola", price:148500, change_amount:1200,  change_pct:0.81 },
  { metal:"Gold (Tejabi)", unit:"per tola", price:147800, change_amount:1100,  change_pct:0.75 },
  { metal:"Silver",        unit:"per tola", price:1820,   change_amount:-15,   change_pct:-0.82 },
];

const VEGGIES_FALLBACK = [
  { name:"Tomato",      name_np:"गोलभेडा",  unit:"per kg",    min_price:40, max_price:60, avg_price:50 },
  { name:"Potato",      name_np:"आलु",      unit:"per kg",    min_price:25, max_price:35, avg_price:30 },
  { name:"Onion",       name_np:"प्याज",    unit:"per kg",    min_price:50, max_price:70, avg_price:60 },
  { name:"Cauliflower", name_np:"काउली",    unit:"per piece", min_price:30, max_price:50, avg_price:40 },
  { name:"Cabbage",     name_np:"बन्दा",    unit:"per kg",    min_price:20, max_price:30, avg_price:25 },
  { name:"Carrot",      name_np:"गाजर",     unit:"per kg",    min_price:40, max_price:55, avg_price:47 },
  { name:"Spinach",     name_np:"पालुंगो",  unit:"per bundle",min_price:15, max_price:25, avg_price:20 },
  { name:"Radish",      name_np:"मूला",     unit:"per kg",    min_price:20, max_price:30, avg_price:25 },
  { name:"Cucumber",    name_np:"काक्रो",   unit:"per kg",    min_price:30, max_price:45, avg_price:37 },
  { name:"Pumpkin",     name_np:"फर्सी",    unit:"per kg",    min_price:25, max_price:40, avg_price:32 },
  { name:"Green Beans", name_np:"सिमी",     unit:"per kg",    min_price:50, max_price:70, avg_price:60 },
  { name:"Bitter Gourd",name_np:"करेला",    unit:"per kg",    min_price:60, max_price:80, avg_price:70 },
];

const SHARES_FALLBACK = [
  { symbol:"NABIL",  company_name:"Nabil Bank Limited",            sector:"Commercial Bank", ltp:1245, change_amount:18,  change_pct:1.47,  volume:12450 },
  { symbol:"NICA",   company_name:"NIC Asia Bank Limited",         sector:"Commercial Bank", ltp:892,  change_amount:-12, change_pct:-1.33, volume:8920  },
  { symbol:"SCB",    company_name:"Standard Chartered Bank Nepal", sector:"Commercial Bank", ltp:2340, change_amount:45,  change_pct:1.96,  volume:3200  },
  { symbol:"ADBL",   company_name:"Agricultural Dev Bank Limited", sector:"Dev Bank",        ltp:445,  change_amount:5,   change_pct:1.14,  volume:22100 },
  { symbol:"NLIC",   company_name:"Nepal Life Insurance Company",  sector:"Life Insurance",  ltp:1890, change_amount:-22, change_pct:-1.15, volume:5600  },
  { symbol:"SHIVM",  company_name:"Shiva Shree Hydropower",        sector:"Hydropower",      ltp:312,  change_amount:8,   change_pct:2.63,  volume:45000 },
  { symbol:"UPPER",  company_name:"Upper Tamakoshi Hydropower",    sector:"Hydropower",      ltp:285,  change_amount:3,   change_pct:1.06,  volume:38000 },
  { symbol:"GBIME",  company_name:"Global IME Bank",               sector:"Commercial Bank", ltp:380,  change_amount:-5,  change_pct:-1.30, volume:18000 },
  { symbol:"SANIMA", company_name:"Sanima Bank Limited",           sector:"Commercial Bank", ltp:420,  change_amount:7,   change_pct:1.69,  volume:9800  },
  { symbol:"PRVU",   company_name:"Prabhu Bank Limited",           sector:"Commercial Bank", ltp:295,  change_amount:-3,  change_pct:-1.01, volume:14200 },
];

const getForex = async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM forex_rates ORDER BY currency_code");
    res.json(r.rows.length ? r.rows : FOREX_FALLBACK);
  } catch { res.json(FOREX_FALLBACK); }
};

const getMetals = async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM metal_prices ORDER BY id");
    res.json(r.rows.length ? r.rows : METALS_FALLBACK);
  } catch { res.json(METALS_FALLBACK); }
};

const getVegetables = async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM vegetable_rates ORDER BY name");
    res.json(r.rows.length ? r.rows : VEGGIES_FALLBACK);
  } catch { res.json(VEGGIES_FALLBACK); }
};

const getShares = async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM share_market ORDER BY change_pct DESC");
    res.json(r.rows.length ? r.rows : SHARES_FALLBACK);
  } catch { res.json(SHARES_FALLBACK); }
};

module.exports = { getForex, getMetals, getVegetables, getShares };
