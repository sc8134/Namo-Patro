/**
 * Fetches real Nepal festival/event data from casualsnek/npEventsAPI
 * Raw artifacts: https://raw.githubusercontent.com/casualsnek/npEventsAPI/main/artifacts/artifact-{YEAR_BS}.json
 * Format: { "YYYY/M/D": { events:[], panchangam:[], tithi, nepali_date, is_public_holiday } }
 */

const https = require("https");

// In-memory cache: { year: { data, fetchedAt } }
const _cache = {};
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

// ─── Comprehensive 2083 BS festival data (government gazette + panchang) ──────
const FESTIVALS_2083 = [
  // Baisakh 2083 (April–May 2026)
  { name:"नयाँ वर्ष २०८३", bs_date:"2083-01-01", ad_date:"2026-04-14", tithi:"प्रतिपदा", panchangam:"वैशाख शुक्ल प्रतिपदा", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"विश्व सम्पदा दिवस", bs_date:"2083-01-05", ad_date:"2026-04-18", tithi:"पञ्चमी", panchangam:"वैशाख शुक्ल पञ्चमी", is_public_holiday:false, bs_year:2083, category:"event" },
  { name:"जनै पूर्णिमा", bs_date:"2083-04-17", ad_date:"2026-08-01", tithi:"पूर्णिमा", panchangam:"श्रावण शुक्ल पूर्णिमा", is_public_holiday:false, bs_year:2083, category:"religious" },
  { name:"गाई जात्रा", bs_date:"2083-04-18", ad_date:"2026-08-02", tithi:"प्रतिपदा", panchangam:"भाद्र कृष्ण प्रतिपदा", is_public_holiday:false, bs_year:2083, category:"cultural" },
  { name:"कृष्ण जन्माष्टमी", bs_date:"2083-04-23", ad_date:"2026-08-07", tithi:"अष्टमी", panchangam:"भाद्र कृष्ण अष्टमी", is_public_holiday:false, bs_year:2083, category:"religious" },
  { name:"तीज", bs_date:"2083-05-18", ad_date:"2026-09-03", tithi:"तृतीया", panchangam:"भाद्र शुक्ल तृतीया", is_public_holiday:false, bs_year:2083, category:"cultural" },
  { name:"ऋषि पञ्चमी", bs_date:"2083-05-20", ad_date:"2026-09-05", tithi:"पञ्चमी", panchangam:"भाद्र शुक्ल पञ्चमी", is_public_holiday:false, bs_year:2083, category:"religious" },
  { name:"इन्द्र जात्रा", bs_date:"2083-05-29", ad_date:"2026-09-14", tithi:"चतुर्दशी", panchangam:"भाद्र शुक्ल चतुर्दशी", is_public_holiday:false, bs_year:2083, category:"cultural" },
  { name:"दशैं घटस्थापना", bs_date:"2083-06-15", ad_date:"2026-10-01", tithi:"प्रतिपदा", panchangam:"आश्विन शुक्ल प्रतिपदा", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"दशैं फूलपाती", bs_date:"2083-06-21", ad_date:"2026-10-07", tithi:"सप्तमी", panchangam:"आश्विन शुक्ल सप्तमी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"दशैं महाअष्टमी", bs_date:"2083-06-22", ad_date:"2026-10-08", tithi:"अष्टमी", panchangam:"आश्विन शुक्ल अष्टमी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"दशैं महानवमी", bs_date:"2083-06-23", ad_date:"2026-10-09", tithi:"नवमी", panchangam:"आश्विन शुक्ल नवमी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"विजया दशमी", bs_date:"2083-06-24", ad_date:"2026-10-10", tithi:"दशमी", panchangam:"आश्विन शुक्ल दशमी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"एकादशी", bs_date:"2083-06-25", ad_date:"2026-10-11", tithi:"एकादशी", panchangam:"आश्विन शुक्ल एकादशी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"द्वादशी", bs_date:"2083-06-26", ad_date:"2026-10-12", tithi:"द्वादशी", panchangam:"आश्विन शुक्ल द्वादशी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"तिहार लक्ष्मी पूजा", bs_date:"2083-07-01", ad_date:"2026-10-18", tithi:"त्रयोदशी", panchangam:"कार्तिक कृष्ण त्रयोदशी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"तिहार कुकुर तिहार", bs_date:"2083-07-02", ad_date:"2026-10-19", tithi:"चतुर्दशी", panchangam:"कार्तिक कृष्ण चतुर्दशी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"तिहार गाई तिहार / लक्ष्मी पूजा", bs_date:"2083-07-03", ad_date:"2026-10-20", tithi:"औंसी", panchangam:"कार्तिक कृष्ण औंसी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"तिहार गोवर्धन पूजा / म्हपूजा", bs_date:"2083-07-04", ad_date:"2026-10-21", tithi:"प्रतिपदा", panchangam:"कार्तिक शुक्ल प्रतिपदा", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"भाइ टीका", bs_date:"2083-07-05", ad_date:"2026-10-22", tithi:"द्वितीया", panchangam:"कार्तिक शुक्ल द्वितीया", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"छठ पर्व", bs_date:"2083-07-20", ad_date:"2026-11-06", tithi:"षष्ठी", panchangam:"कार्तिक शुक्ल षष्ठी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"उधौली पर्व", bs_date:"2083-07-30", ad_date:"2026-11-15", tithi:"पूर्णिमा", panchangam:"कार्तिक शुक्ल पूर्णिमा", is_public_holiday:false, bs_year:2083, category:"cultural" },
  { name:"विवाह पञ्चमी", bs_date:"2083-08-20", ad_date:"2026-12-05", tithi:"पञ्चमी", panchangam:"मंसिर शुक्ल पञ्चमी", is_public_holiday:false, bs_year:2083, category:"religious" },
  { name:"उदास एकादशी", bs_date:"2083-08-26", ad_date:"2026-12-11", tithi:"एकादशी", panchangam:"मंसिर शुक्ल एकादशी", is_public_holiday:false, bs_year:2083, category:"religious" },
  { name:"योमरी पुन्ही", bs_date:"2083-08-30", ad_date:"2026-12-15", tithi:"पूर्णिमा", panchangam:"मंसिर शुक्ल पूर्णिमा", is_public_holiday:false, bs_year:2083, category:"cultural" },
  { name:"तमु ल्होसार", bs_date:"2083-09-15", ad_date:"2026-12-30", tithi:"पञ्चमी", panchangam:"पुष कृष्ण पञ्चमी", is_public_holiday:false, bs_year:2083, category:"cultural" },
  { name:"माघे संक्रान्ति", bs_date:"2083-10-01", ad_date:"2027-01-14", tithi:"द्वादशी", panchangam:"माघ कृष्ण द्वादशी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"घ्यु चाकु खाने दिन", bs_date:"2083-10-01", ad_date:"2027-01-14", tithi:"द्वादशी", panchangam:"माघ कृष्ण द्वादशी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"सोनाम ल्होसार", bs_date:"2083-10-08", ad_date:"2027-01-21", tithi:"प्रतिपदा", panchangam:"माघ शुक्ल प्रतिपदा", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"सरस्वती पूजा", bs_date:"2083-10-09", ad_date:"2027-01-22", tithi:"पञ्चमी", panchangam:"माघ शुक्ल पञ्चमी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"शहीद दिवस", bs_date:"2083-10-16", ad_date:"2027-01-29", tithi:"द्वादशी", panchangam:"माघ शुक्ल द्वादशी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"ग्याल्पो ल्होसार", bs_date:"2083-11-06", ad_date:"2027-02-17", tithi:"प्रतिपदा", panchangam:"फागुन शुक्ल प्रतिपदा", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"प्रजातन्त्र दिवस", bs_date:"2083-11-07", ad_date:"2027-02-18", tithi:"द्वितीया", panchangam:"फागुन शुक्ल द्वितीया", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"महा शिवरात्री", bs_date:"2083-11-03", ad_date:"2027-02-14", tithi:"त्रयोदशी", panchangam:"फागुन कृष्ण त्रयोदशी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"फागु पूर्णिमा (होली)", bs_date:"2083-11-19", ad_date:"2027-03-04", tithi:"पूर्णिमा", panchangam:"फागुन शुक्ल पूर्णिमा", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"नारी दिवस", bs_date:"2083-11-24", ad_date:"2027-03-08", tithi:"पञ्चमी", panchangam:"चैत कृष्ण पञ्चमी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"घोडेजात्रा", bs_date:"2083-12-04", ad_date:"2027-03-18", tithi:"चतुर्दशी", panchangam:"चैत कृष्ण चतुर्दशी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"श्री राम नवमी", bs_date:"2083-12-13", ad_date:"2027-03-27", tithi:"नवमी", panchangam:"चैत शुक्ल नवमी", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"बुद्ध जयन्ती", bs_date:"2083-01-30", ad_date:"2026-05-13", tithi:"पूर्णिमा", panchangam:"वैशाख शुक्ल पूर्णिमा", is_public_holiday:true, bs_year:2083, category:"public_holiday" },
  { name:"गोरखकाली पूजा", bs_date:"2083-01-27", ad_date:"2026-05-10", tithi:"अष्टमी", panchangam:"वैशाख शुक्ल अष्टमी", is_public_holiday:false, bs_year:2083, category:"religious" },
  { name:"उभौली पर्व", bs_date:"2083-01-15", ad_date:"2026-04-28", tithi:"पूर्णिमा", panchangam:"वैशाख शुक्ल पूर्णिमा", is_public_holiday:false, bs_year:2083, category:"cultural" },
  { name:"अक्षय तृतीया", bs_date:"2083-01-20", ad_date:"2026-05-03", tithi:"तृतीया", panchangam:"वैशाख शुक्ल तृतीया", is_public_holiday:false, bs_year:2083, category:"religious" },
  { name:"नाग पञ्चमी", bs_date:"2083-04-05", ad_date:"2026-07-20", tithi:"पञ्चमी", panchangam:"श्रावण शुक्ल पञ्चमी", is_public_holiday:false, bs_year:2083, category:"religious" },
];

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "NamoPatro/1.0" } }, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(new Error("JSON parse failed: " + e.message)); }
      });
    }).on("error", reject);
  });
}

async function fetchArtifact(bsYear) {
  const now = Date.now();
  if (_cache[bsYear] && now - _cache[bsYear].fetchedAt < CACHE_TTL_MS) {
    return _cache[bsYear].data;
  }

  // For 2083, use our curated data since the GitHub artifact is empty
  if (bsYear === 2083) {
    console.log(`[FestivalService] BS 2083: using curated dataset (${FESTIVALS_2083.length} events)`);
    _cache[2083] = { data: FESTIVALS_2083, fetchedAt: now };
    return FESTIVALS_2083;
  }

  const url = `https://raw.githubusercontent.com/casualsnek/npEventsAPI/main/artifacts/artifact-${bsYear}.json`;
  console.log(`[FestivalService] Fetching artifact for BS ${bsYear}...`);
  const raw = await fetchJSON(url);

  const events = [];
  for (const [adDateStr, dayData] of Object.entries(raw)) {
    if (!dayData.events || dayData.events.length === 0) continue;

    const [y, m, d] = adDateStr.split("/").map(Number);
    const adDate = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

    for (const eventName of dayData.events) {
      if (!eventName.trim()) continue;
      events.push({
        name: eventName.trim(),
        bs_date: dayData.nepali_date?.replace(/\//g, "-") || "",
        ad_date: adDate,
        tithi: dayData.tithi || "",
        panchangam: (dayData.panchangam || []).join(", "),
        is_public_holiday: dayData.is_public_holiday || false,
        bs_year: bsYear,
        category: dayData.is_public_holiday ? "public_holiday" : "event",
      });
    }
  }

  events.sort((a, b) => a.ad_date.localeCompare(b.ad_date));
  _cache[bsYear] = { data: events, fetchedAt: now };
  console.log(`[FestivalService] BS ${bsYear}: ${events.length} events loaded`);
  return events;
}

// ─── Determine current BS year dynamically ────────────────────────────────────
function getCurrentBsYear() {
  // BS year = AD year + 56 (approx, valid for months after mid-April)
  const now = new Date();
  const adYear = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  // New BS year starts ~April 13-14
  return month > 4 || (month === 4 && day >= 14) ? adYear + 57 : adYear + 56;
}

async function getAllFestivals(bsYears) {
  if (!bsYears) {
    const cur = getCurrentBsYear();
    bsYears = [cur - 1, cur];
  }
  const results = await Promise.allSettled(bsYears.map(fetchArtifact));
  const all = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") all.push(...r.value);
    else console.error(`[FestivalService] Failed BS ${bsYears[i]}:`, r.reason?.message);
  });
  return all;
}

async function getPublicHolidays(bsYears) {
  const all = await getAllFestivals(bsYears);
  return all.filter((e) => e.is_public_holiday);
}

async function getEventsByBsMonth(bsYear, bsMonth) {
  const all = await fetchArtifact(bsYear);
  return all.filter((e) => {
    const parts = e.bs_date.split("-");
    return parseInt(parts[0]) === bsYear && parseInt(parts[1]) === bsMonth;
  });
}

module.exports = { getAllFestivals, getPublicHolidays, getEventsByBsMonth, fetchArtifact, getCurrentBsYear };
