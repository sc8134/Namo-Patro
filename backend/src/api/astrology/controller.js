const https = require("https");

// ─── Translate English → Nepali via Google Translate (free, no key) ──────────
function translateToNepali(text) {
  return new Promise((resolve) => {
    const encoded = encodeURIComponent(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ne&dt=t&q=${encoded}`;
    https.get(url, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        try {
          const json = JSON.parse(body);
          // Response is nested arrays: [[["translated","original",...], ...], ...]
          const translated = json[0]
            .map((chunk) => chunk[0])
            .join("")
            .trim();
          resolve(translated || null);
        } catch {
          resolve(null);
        }
      });
    }).on("error", () => resolve(null));
  });
}

// ─── Rashi metadata ───────────────────────────────────────────────────────────
const RASHIS = [
  { rashi:"Mesh",     rashi_np:"मेष",     icon:"♈", en:"Aries",       apiSign:"aries",       element:"Fire",  element_np:"अग्नि",  lord:"Mars",    lord_np:"मंगल",    lucky_number:"3, 9", lucky_color:"Red",       lucky_color_np:"रातो",        lucky_gem:"Ruby",        lucky_gem_np:"माणिक" },
  { rashi:"Brish",    rashi_np:"वृष",     icon:"♉", en:"Taurus",      apiSign:"taurus",      element:"Earth", element_np:"पृथ्वी", lord:"Venus",   lord_np:"शुक्र",   lucky_number:"2, 6", lucky_color:"Green",     lucky_color_np:"हरियो",       lucky_gem:"Emerald",     lucky_gem_np:"पन्ना" },
  { rashi:"Mithun",   rashi_np:"मिथुन",   icon:"♊", en:"Gemini",      apiSign:"gemini",      element:"Air",   element_np:"वायु",   lord:"Mercury", lord_np:"बुध",     lucky_number:"5, 7", lucky_color:"Yellow",    lucky_color_np:"पहेँलो",      lucky_gem:"Topaz",       lucky_gem_np:"पुखराज" },
  { rashi:"Karkat",   rashi_np:"कर्कट",   icon:"♋", en:"Cancer",      apiSign:"cancer",      element:"Water", element_np:"जल",     lord:"Moon",    lord_np:"चन्द्र",  lucky_number:"2, 7", lucky_color:"White",     lucky_color_np:"सेतो",        lucky_gem:"Pearl",       lucky_gem_np:"मोती" },
  { rashi:"Singha",   rashi_np:"सिंह",    icon:"♌", en:"Leo",         apiSign:"leo",         element:"Fire",  element_np:"अग्नि",  lord:"Sun",     lord_np:"सूर्य",   lucky_number:"1, 5", lucky_color:"Gold",      lucky_color_np:"सुनौलो",      lucky_gem:"Diamond",     lucky_gem_np:"हीरा" },
  { rashi:"Kanya",    rashi_np:"कन्या",   icon:"♍", en:"Virgo",       apiSign:"virgo",       element:"Earth", element_np:"पृथ्वी", lord:"Mercury", lord_np:"बुध",     lucky_number:"3, 8", lucky_color:"Brown",     lucky_color_np:"खैरो",        lucky_gem:"Sapphire",    lucky_gem_np:"नीलम" },
  { rashi:"Tula",     rashi_np:"तुला",    icon:"♎", en:"Libra",       apiSign:"libra",       element:"Air",   element_np:"वायु",   lord:"Venus",   lord_np:"शुक्र",   lucky_number:"6, 9", lucky_color:"Blue",      lucky_color_np:"नीलो",        lucky_gem:"Opal",        lucky_gem_np:"ओपल" },
  { rashi:"Brischik", rashi_np:"वृश्चिक", icon:"♏", en:"Scorpio",     apiSign:"scorpio",     element:"Water", element_np:"जल",     lord:"Mars",    lord_np:"मंगल",    lucky_number:"1, 8", lucky_color:"Maroon",    lucky_color_np:"मरुन",        lucky_gem:"Coral",       lucky_gem_np:"मूंगा" },
  { rashi:"Dhanu",    rashi_np:"धनु",     icon:"♐", en:"Sagittarius", apiSign:"sagittarius", element:"Fire",  element_np:"अग्नि",  lord:"Jupiter", lord_np:"बृहस्पति",lucky_number:"3, 9", lucky_color:"Purple",    lucky_color_np:"बैजनी",       lucky_gem:"Turquoise",   lucky_gem_np:"फिरोजा" },
  { rashi:"Makar",    rashi_np:"मकर",     icon:"♑", en:"Capricorn",   apiSign:"capricorn",   element:"Earth", element_np:"पृथ्वी", lord:"Saturn",  lord_np:"शनि",     lucky_number:"6, 8", lucky_color:"Black",     lucky_color_np:"कालो",        lucky_gem:"Garnet",      lucky_gem_np:"गार्नेट" },
  { rashi:"Kumbha",   rashi_np:"कुम्भ",   icon:"♒", en:"Aquarius",    apiSign:"aquarius",    element:"Air",   element_np:"वायु",   lord:"Saturn",  lord_np:"शनि",     lucky_number:"4, 7", lucky_color:"Sky Blue",  lucky_color_np:"आकाशी नीलो", lucky_gem:"Amethyst",    lucky_gem_np:"जामुनी रत्न" },
  { rashi:"Meen",     rashi_np:"मीन",     icon:"♓", en:"Pisces",      apiSign:"pisces",      element:"Water", element_np:"जल",     lord:"Jupiter", lord_np:"बृहस्पति",lucky_number:"3, 7", lucky_color:"Sea Green", lucky_color_np:"समुद्री हरियो",lucky_gem:"Aquamarine",  lucky_gem_np:"एक्वामेरिन" },
];

// ─── Compatibility map (Vedic) ────────────────────────────────────────────────
const COMPAT = {
  "♈":["♌","♐","♊","♒"], "♉":["♍","♑","♋","♏"], "♊":["♎","♒","♈","♌"],
  "♋":["♏","♓","♉","♍"], "♌":["♐","♈","♊","♎"], "♍":["♑","♉","♋","♏"],
  "♎":["♒","♊","♌","♐"], "♏":["♓","♋","♉","♑"], "♐":["♈","♌","♎","♒"],
  "♑":["♉","♍","♏","♓"], "♒":["♊","♎","♐","♈"], "♓":["♋","♏","♑","♉"],
};

// ─── Nepali fallback predictions (used if API is down) ───────────────────────
const NP_FALLBACK = {
  Mesh:     "आज तपाईंको दिन उत्साहजनक छ। नयाँ कार्यको शुरुआत गर्न उत्तम समय। आर्थिक लाभको सम्भावना छ।",
  Brish:    "आर्थिक मामिलामा सावधानी अपनाउनुहोस्। परिवारसँग समय बिताउनुहोस्। स्वास्थ्यमा ध्यान दिनुहोस्।",
  Mithun:   "संचारमा स्पष्टता राख्नुहोस्। नयाँ सम्बन्ध बन्न सक्छ। व्यापारमा सफलता मिल्छ।",
  Karkat:   "भावनात्मक स्थिरता महत्त्वपूर्ण छ। घरेलु कार्यमा सफलता। प्रेम सम्बन्धमा मिठास।",
  Singha:   "नेतृत्व क्षमता प्रदर्शन गर्ने अवसर। आत्मविश्वास राख्नुहोस्। करियरमा उन्नति।",
  Kanya:    "विस्तृत कार्यमा ध्यान दिनुहोस्। स्वास्थ्यमा सचेत रहनुहोस्। बचत गर्नुहोस्।",
  Tula:     "सन्तुलन कायम राख्नुहोस्। साझेदारीमा लाभ हुन सक्छ। सामाजिक जीवन सक्रिय।",
  Brischik: "गहन अनुसन्धानमा सफलता। गोपनीय कुरा सुरक्षित राख्नुहोस्। आर्थिक स्थिति सुधार।",
  Dhanu:    "यात्रा र शिक्षामा शुभ। दार्शनिक विचारमा समय बिताउनुहोस्। भाग्य साथ छ।",
  Makar:    "व्यावसायिक लक्ष्यमा अग्रसर हुनुहोस्। अनुशासन कायम राख्नुहोस्। मेहनत फल दिन्छ।",
  Kumbha:   "नवीन विचारहरू कार्यान्वयन गर्नुहोस्। मित्रहरूसँग सहयोग लिनुहोस्। सफलता नजिक।",
  Meen:     "आध्यात्मिक चिन्तनमा शान्ति पाउनुहोस्। कलात्मक कार्यमा सफलता। मन शान्त राख्नुहोस्।",
};

// ─── In-memory daily cache ────────────────────────────────────────────────────
// Structure: { date: "YYYY-MM-DD", data: [...12 rashis...] }
let _cache = { date: null, data: null };

// ─── Fetch one sign from live API ─────────────────────────────────────────────
function fetchSign(sign) {
  return new Promise((resolve, reject) => {
    const url = `https://freehoroscopeapi.com/api/v1/get-horoscope/daily?sign=${sign}`;
    https.get(url, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(body);
          resolve(json?.data?.horoscope || null);
        } catch {
          resolve(null);
        }
      });
    }).on("error", () => resolve(null));
  });
}

// ─── Fetch all 12 signs concurrently, cache for the day ──────────────────────
async function fetchAllRashifal() {
  const today = new Date().toISOString().split("T")[0];

  // Return cache if still valid for today
  if (_cache.date === today && _cache.data) {
    console.log(`[Rashifal] Serving from cache (${today})`);
    return _cache.data;
  }

  console.log(`[Rashifal] Fetching live data from freehoroscopeapi.com for ${today}...`);

  // Fetch all 12 signs in parallel
  const results = await Promise.all(
    RASHIS.map(async (r) => {
      const horoscope_en = await fetchSign(r.apiSign);

      // Translate to Nepali if we got a live prediction
      let prediction = NP_FALLBACK[r.rashi];
      let source = "fallback";

      if (horoscope_en) {
        const translated = await translateToNepali(horoscope_en);
        prediction = translated || NP_FALLBACK[r.rashi];
        source = translated ? "live" : "fallback";
      }

      return {
        ...r,
        prediction,           // Nepali (translated from live or fallback)
        prediction_en: horoscope_en || null,  // original English kept for reference
        source,
        date: today,
      };
    })
  );

  const liveCount = results.filter((r) => r.source === "live").length;
  console.log(`[Rashifal] ${liveCount}/12 signs fetched live, ${12 - liveCount} from fallback`);

  // Store in cache
  _cache = { date: today, data: results };
  return results;
}

// ─── Controllers ─────────────────────────────────────────────────────────────
const getRashifal = async (req, res) => {
  try {
    const data = await fetchAllRashifal();
    res.json(data);
  } catch (e) {
    console.error("[Rashifal] Error:", e.message);
    const today = new Date().toISOString().split("T")[0];
    res.json(RASHIS.map((r) => ({ ...r, prediction: NP_FALLBACK[r.rashi], source: "fallback", date: today })));
  }
};

const getRashifalByRashi = async (req, res) => {
  const { rashi } = req.params;
  try {
    const data = await fetchAllRashifal();
    const found = data.find((r) => r.rashi === rashi);
    if (!found) return res.status(404).json({ error: "Rashi not found" });
    res.json(found);
  } catch {
    const base = RASHIS.find((r) => r.rashi === rashi);
    if (!base) return res.status(404).json({ error: "Rashi not found" });
    res.json({ ...base, prediction: NP_FALLBACK[rashi], source: "fallback" });
  }
};

const getCompatibility = (req, res) => {
  const { r1, r2 } = req.query;
  if (!r1 || !r2) return res.status(400).json({ error: "r1 and r2 required" });
  const compatible = COMPAT[r1]?.includes(r2) ?? false;
  const score = compatible ? Math.floor(Math.random() * 15) + 80 : Math.floor(Math.random() * 20) + 40;
  res.json({
    r1, r2, compatible, score,
    message: compatible
      ? "These signs share great harmony, understanding, and mutual respect."
      : "This combination requires extra effort, patience, and understanding.",
    aspects: {
      love: compatible ? "High" : "Moderate",
      friendship: compatible ? "Excellent" : "Good",
      career: "Good",
      communication: compatible ? "Excellent" : "Moderate",
    },
  });
};

module.exports = { getRashifal, getRashifalByRashi, getCompatibility };
