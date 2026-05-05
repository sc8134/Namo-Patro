const db = require("../../config/db");
const festivalService = require("../../services/festivalService");

// ─── DB fallback seed data ────────────────────────────────────────────────────
const SEED_FESTIVALS = [
  { id:1,  name:"Dashain (Ghatasthapana)", name_np:"दशैं (घटस्थापना)", bs_date:"2081-06-15", ad_date:"2024-10-02", description:"The biggest Hindu festival in Nepal.", category:"major", region:"nationwide", is_holiday:true },
  { id:2,  name:"Tihar (Laxmi Puja)",      name_np:"तिहार (लक्ष्मी पूजा)", bs_date:"2081-07-01", ad_date:"2024-10-17", description:"Festival of lights.", category:"major", region:"nationwide", is_holiday:true },
  { id:3,  name:"Chhath Parwa",            name_np:"छठ पर्व",          bs_date:"2081-07-20", ad_date:"2024-11-05", description:"Sun worship festival.", category:"major", region:"terai", is_holiday:true },
  { id:4,  name:"Holi",                    name_np:"होली",             bs_date:"2080-11-29", ad_date:"2024-03-25", description:"Festival of colors.", category:"major", region:"nationwide", is_holiday:true },
  { id:5,  name:"Teej",                    name_np:"तीज",              bs_date:"2081-05-18", ad_date:"2024-09-06", description:"Festival for women.", category:"cultural", region:"nationwide", is_holiday:false },
  { id:6,  name:"Buddha Jayanti",          name_np:"बुद्ध जयन्ती",    bs_date:"2081-01-30", ad_date:"2024-05-23", description:"Birthday of Gautama Buddha.", category:"religious", region:"nationwide", is_holiday:true },
  { id:7,  name:"Indra Jatra",             name_np:"इन्द्र जात्रा",   bs_date:"2081-05-29", ad_date:"2024-09-17", description:"Eight-day festival in Kathmandu.", category:"cultural", region:"kathmandu", is_holiday:false },
  { id:8,  name:"Maghe Sankranti",         name_np:"माघे संक्रान्ति", bs_date:"2080-09-01", ad_date:"2024-01-15", description:"Marks end of winter solstice.", category:"religious", region:"nationwide", is_holiday:false },
];

// ─── GET /api/festivals — from DB or seed ─────────────────────────────────────
const getAllFestivals = async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM festivals ORDER BY ad_date ASC");
    res.json(r.rows.length ? r.rows : SEED_FESTIVALS);
  } catch {
    res.json(SEED_FESTIVALS);
  }
};

// ─── GET /api/festivals/month/:month — by AD month ───────────────────────────
const getFestivalsByMonth = async (req, res) => {
  const { month } = req.params;
  try {
    const r = await db.query(
      "SELECT * FROM festivals WHERE EXTRACT(MONTH FROM ad_date) = $1", [month]
    );
    res.json(r.rows.length ? r.rows : SEED_FESTIVALS.filter(
      (f) => new Date(f.ad_date).getMonth() + 1 === parseInt(month)
    ));
  } catch {
    res.json(SEED_FESTIVALS.filter(
      (f) => new Date(f.ad_date).getMonth() + 1 === parseInt(month)
    ));
  }
};

// ─── GET /api/festivals/all — full live data from casualsnek/npEventsAPI ──────
const getAllLiveFestivals = async (req, res) => {
  try {
    const { year, holiday_only } = req.query;
    const cur = festivalService.getCurrentBsYear();
    const bsYears = year
      ? [parseInt(year)]
      : [cur - 1, cur];

    const events = holiday_only === "true"
      ? await festivalService.getPublicHolidays(bsYears)
      : await festivalService.getAllFestivals(bsYears);

    res.json({
      source: "casualsnek/npEventsAPI (GitHub)",
      total: events.length,
      bs_years: bsYears,
      events,
    });
  } catch (e) {
    console.error("[Festivals] Live fetch failed:", e.message);
    res.status(500).json({ error: "Failed to fetch live festival data", detail: e.message });
  }
};

// ─── GET /api/festivals/bs/:year/:month — events for a BS month ───────────────
const getEventsByBsMonth = async (req, res) => {
  const { year, month } = req.params;
  try {
    const events = await festivalService.getEventsByBsMonth(parseInt(year), parseInt(month));
    res.json({ bs_year: parseInt(year), bs_month: parseInt(month), total: events.length, events });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { getAllFestivals, getFestivalsByMonth, getAllLiveFestivals, getEventsByBsMonth };
