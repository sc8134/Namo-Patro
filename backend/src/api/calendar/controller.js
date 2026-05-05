const { adToBs, bsToAd } = require("../../services/calendarService");
const db = require("../../config/db");

const PANCHANG_DATA = {
  tithi:     ["Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Purnima/Amavasya"],
  vara:      ["Aaitabar","Sombar","Mangalbar","Budhabar","Bihibar","Sukrabar","Sanibar"],
  nakshatra: ["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishtha","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"],
  yoga:      ["Vishkambha","Priti","Ayushman","Saubhagya","Shobhana","Atiganda","Sukarma","Dhriti","Shula","Ganda","Vriddhi","Dhruva","Vyaghata","Harshana","Vajra","Siddhi","Vyatipata","Variyana","Parigha","Shiva","Siddha","Sadhya","Shubha","Shukla","Brahma","Indra","Vaidhriti"],
  karana:    ["Bava","Balava","Kaulava","Taitila","Garaja","Vanija","Vishti","Shakuni","Chatushpada","Naga","Kimstughna"],
};

function getPanchangForDate(adDate) {
  const d = new Date(adDate);
  const dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
  const weekday = d.getDay();
  return {
    tithi:     PANCHANG_DATA.tithi[dayOfYear % 15],
    vara:      PANCHANG_DATA.vara[weekday],
    nakshatra: PANCHANG_DATA.nakshatra[dayOfYear % 27],
    yoga:      PANCHANG_DATA.yoga[dayOfYear % 27],
    karana:    PANCHANG_DATA.karana[dayOfYear % 11],
    sunrise:   "06:05",
    sunset:    "18:12",
    moon_phase: dayOfYear % 30 < 15 ? "Waxing" : "Waning",
  };
}

const convertAdToBs = (req, res) => {
  const { ad } = req.query;
  if (!ad) return res.status(400).json({ error: "AD date required" });
  try {
    const bs = adToBs(new Date(ad));
    res.json({ bs });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const convertBsToAd = (req, res) => {
  const { year, month, day } = req.query;
  if (!year || !month || !day)
    return res.status(400).json({ error: "BS year, month, day required" });
  try {
    const ad = bsToAd(Number(year), Number(month), Number(day));
    res.json({ ad });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getPanchang = async (req, res) => {
  const { date } = req.query;
  const adDate = date || new Date().toISOString().split("T")[0];
  try {
    const r = await db.query("SELECT * FROM panchang WHERE ad_date = $1", [adDate]);
    if (r.rows.length) return res.json(r.rows[0]);
  } catch {}
  res.json({ date: adDate, ...getPanchangForDate(adDate) });
};

module.exports = { convertAdToBs, convertBsToAd, getPanchang };
