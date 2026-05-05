import { useEffect, useState } from "react";
import axios from "axios";
import CalendarGrid from "../components/CalendarGrid";
import Navbar from "../components/Navbar";
import { TithiIcon, VaraIcon, NakshatraIcon, YogaIcon, KaranaIcon } from "../components/PanchangIcons";
import { toNepaliDigits, formatAdDate } from "../utils/dateFormatter";

const BS_MONTH_DAYS: Record<number, number[]> = {
  2000:[30,32,31,32,31,30,30,30,29,30,29,31],2001:[31,31,32,31,31,31,30,29,30,29,30,30],
  2002:[31,31,32,32,31,30,30,29,30,29,30,30],2003:[31,32,31,32,31,30,30,30,29,29,30,31],
  2004:[30,32,31,32,31,30,30,30,29,30,29,31],2005:[31,31,32,31,31,31,30,29,30,29,30,30],
  2006:[31,31,32,32,31,30,30,29,30,29,30,30],2007:[31,32,31,32,31,30,30,30,29,29,30,31],
  2008:[31,31,31,32,31,31,29,30,30,29,29,31],2009:[31,31,32,31,31,31,30,29,30,29,30,30],
  2010:[31,31,32,32,31,30,30,29,30,29,30,30],2011:[31,32,31,32,31,30,30,30,29,29,30,31],
  2012:[31,31,31,32,31,31,29,30,30,29,30,30],2013:[31,31,32,31,31,31,30,29,30,29,30,30],
  2014:[31,31,32,32,31,30,30,29,30,29,30,30],2015:[31,32,31,32,31,30,30,30,29,29,30,31],
  2016:[31,31,31,32,31,31,29,30,30,29,30,30],2017:[31,31,32,31,31,31,30,29,30,29,30,30],
  2018:[31,32,31,32,31,30,30,29,30,29,30,30],2019:[31,32,31,32,31,30,30,30,29,30,29,31],
  2020:[31,31,31,32,31,31,30,29,30,29,30,30],2021:[31,31,32,31,31,31,30,29,30,29,30,30],
  2022:[31,32,31,32,31,30,30,30,29,29,30,30],2023:[31,32,31,32,31,30,30,30,29,30,29,31],
  2024:[31,31,31,32,31,31,30,29,30,29,30,30],2025:[31,31,32,31,31,31,30,29,30,29,30,30],
  2026:[31,32,31,32,31,30,30,30,29,29,30,31],2027:[30,32,31,32,31,30,30,30,29,30,29,31],
  2028:[31,31,32,31,31,31,30,29,30,29,30,30],2029:[31,31,32,31,32,30,30,29,30,29,30,30],
  2030:[31,32,31,32,31,30,30,30,29,29,30,31],2031:[30,32,31,32,31,30,30,30,29,30,29,31],
  2032:[31,31,32,31,31,31,30,29,30,29,30,30],2033:[31,31,32,32,31,30,30,29,30,29,30,30],
  2034:[31,32,31,32,31,30,30,30,29,29,30,31],2035:[30,32,31,32,31,31,29,30,30,29,29,31],
  2036:[31,31,32,31,31,31,30,29,30,29,30,30],2037:[31,31,32,32,31,30,30,29,30,29,30,30],
  2038:[31,32,31,32,31,30,30,30,29,29,30,31],2039:[31,31,31,32,31,31,29,30,30,29,30,30],
  2040:[31,31,32,31,31,31,30,29,30,29,30,30],2041:[31,31,32,32,31,30,30,29,30,29,30,30],
  2042:[31,32,31,32,31,30,30,30,29,29,30,31],2043:[31,31,31,32,31,31,29,30,30,29,30,30],
  2044:[31,31,32,31,31,31,30,29,30,29,30,30],2045:[31,32,31,32,31,30,30,29,30,29,30,30],
  2046:[31,32,31,32,31,30,30,30,29,29,30,31],2047:[31,31,31,32,31,31,30,29,30,29,30,30],
  2048:[31,31,32,31,31,31,30,29,30,29,30,30],2049:[31,32,31,32,31,30,30,30,29,29,30,30],
  2050:[31,32,31,32,31,30,30,30,29,30,29,31],2051:[31,31,31,32,31,31,30,29,30,29,30,30],
  2052:[31,31,32,31,31,31,30,29,30,29,30,30],2053:[31,32,31,32,31,30,30,30,29,29,30,30],
  2054:[31,32,31,32,31,30,30,30,29,30,29,31],2055:[31,31,32,31,31,31,30,29,30,29,30,30],
  2056:[31,31,32,31,32,30,30,29,30,29,30,30],2057:[31,32,31,32,31,30,30,30,29,29,30,31],
  2058:[30,32,31,32,31,30,30,30,29,30,29,31],2059:[31,31,32,31,31,31,30,29,30,29,30,30],
  2060:[31,31,32,32,31,30,30,29,30,29,30,30],2061:[31,32,31,32,31,30,30,30,29,29,30,31],
  2062:[30,32,31,32,31,31,29,30,29,30,29,31],2063:[31,31,32,31,31,31,30,29,30,29,30,30],
  2064:[31,31,32,32,31,30,30,29,30,29,30,30],2065:[31,32,31,32,31,30,30,30,29,29,30,31],
  2066:[31,31,31,32,31,31,29,30,30,29,29,31],2067:[31,31,32,31,31,31,30,29,30,29,30,30],
  2068:[31,31,32,32,31,30,30,29,30,29,30,30],2069:[31,32,31,32,31,30,30,30,29,29,30,31],
  2070:[31,31,31,32,31,31,29,30,30,29,30,30],2071:[31,31,32,31,31,31,30,29,30,29,30,30],
  2072:[31,32,31,32,31,30,30,29,30,29,30,30],2073:[31,32,31,32,31,30,30,30,29,29,30,31],
  2074:[31,31,31,32,31,31,30,29,30,29,30,30],2075:[31,31,32,31,31,31,30,29,30,29,30,30],
  2076:[31,32,31,32,31,30,30,30,29,29,30,30],2077:[31,32,31,32,31,30,30,30,29,30,29,31],
  2078:[31,31,31,32,31,31,30,29,30,29,30,30],2079:[31,31,32,31,31,31,30,29,30,29,30,30],
  2080:[31,32,31,32,31,30,30,30,29,29,30,30],2081:[31,31,32,32,31,30,30,29,30,29,30,30],
  2082:[31,32,31,32,31,30,30,30,29,29,30,31],2083:[31,31,31,32,31,31,29,30,30,29,30,30],
  2084:[31,31,32,31,31,31,30,29,30,29,30,30],2085:[31,32,31,32,31,30,30,29,30,29,30,30],
  2086:[31,32,31,32,31,30,30,30,29,29,30,31],2087:[31,31,31,32,31,31,30,29,30,29,30,30],
  2088:[31,31,32,31,31,31,30,29,30,29,30,30],2089:[31,32,31,32,31,30,30,30,29,29,30,30],
  2090:[31,32,31,32,31,30,30,30,29,30,29,31],
};

const BS_START_AD = new Date(1943, 3, 14);
const BS_START_YEAR = 2000;

function adToBs(adDate: Date) {
  let totalDays = Math.floor((adDate.getTime() - BS_START_AD.getTime()) / 86400000);
  for (let y = BS_START_YEAR; ; y++) {
    const months = BS_MONTH_DAYS[y];
    if (!months) break;
    const yearDays = months.reduce((a, b) => a + b, 0);
    if (totalDays < yearDays) {
      for (let m = 0; m < 12; m++) {
        if (totalDays < months[m]) return { year: y, month: m + 1, day: totalDays + 1 };
        totalDays -= months[m];
      }
    }
    totalDays -= yearDays;
  }
  return { year: 2081, month: 1, day: 1 };
}

function getFirstWeekday(bsYear: number, bsMonth: number): number {
  let totalDays = 0;
  for (let y = BS_START_YEAR; y < bsYear; y++)
    totalDays += BS_MONTH_DAYS[y].reduce((a, b) => a + b, 0);
  for (let m = 0; m < bsMonth - 1; m++)
    totalDays += BS_MONTH_DAYS[bsYear][m];
  const adDate = new Date(BS_START_AD);
  adDate.setDate(adDate.getDate() + totalDays);
  return adDate.getDay();
}

const BS_MONTHS_NP = [
  "बैशाख","जेठ","असार","श्रावण","भाद्र","आश्विन",
  "कार्तिक","मंसिर","पुष","माघ","फाल्गुन","चैत्र",
];

interface Festival {
  id?: number; name: string; bs_date: string; ad_date: string;
  description?: string; category?: string;
  tithi?: string; panchangam?: string; is_public_holiday?: boolean;
}
interface Panchang {
  tithi: string; vara: string; nakshatra: string; yoga: string; karana: string;
}

export default function Home() {
  const todayAd = new Date();
  const todayBs = adToBs(todayAd);

  const [viewYear, setViewYear] = useState(todayBs.year);
  const [viewMonth, setViewMonth] = useState(todayBs.month);
  const [selectedDay, setSelectedDay] = useState(todayBs.day);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [panchang, setPanchang] = useState<Panchang | null>(null);

  useEffect(() => {
    // Fetch live festivals from casualsnek/npEventsAPI via backend
    axios.get("/api/festivals/all")
      .then((r) => {
        const data = r.data?.events;
        setFestivals(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        // fallback to seed endpoint
        axios.get("/api/festivals").then((r) => setFestivals(Array.isArray(r.data) ? r.data : [])).catch(() => {});
      });
    const adStr = todayAd.toISOString().split("T")[0];
    axios.get(`/api/calendar/panchang?date=${adStr}`).then((r) => setPanchang(r.data)).catch(() => {});
  }, []);

  const monthDays = BS_MONTH_DAYS[viewYear]?.[viewMonth - 1] ?? 30;
  const startWeekday = getFirstWeekday(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 1) { setViewYear(y => y - 1); setViewMonth(12); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 12) { setViewYear(y => y + 1); setViewMonth(1); }
    else setViewMonth(m => m + 1);
  };

  const selectedFestival = festivals.find((f) => {
    const [fy, fm, fd] = f.bs_date.split("-").map(Number);
    return fy === viewYear && fm === viewMonth && fd === selectedDay;
  });

  const monthFestivals = festivals.filter((f) => {
    const [fy, fm] = f.bs_date.split("-").map(Number);
    return fy === viewYear && fm === viewMonth;
  });

  const panchangEntries = panchang
    ? [
        { label: "तिथि",    value: panchang.tithi,     Icon: TithiIcon,     desc: "Lunar Day" },
        { label: "वार",     value: panchang.vara,      Icon: VaraIcon,      desc: "Weekday" },
        { label: "नक्षत्र", value: panchang.nakshatra,  Icon: NakshatraIcon, desc: "Nakshatra" },
        { label: "योग",     value: panchang.yoga,      Icon: YogaIcon,      desc: "Yoga" },
        { label: "करण",     value: panchang.karana,    Icon: KaranaIcon,    desc: "Karana" },
      ]
    : [];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(135deg, #080C14 0%, #0D1B2A 40%, #1A0800 100%)" }}>
      {/* Sacred Hindu background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Saffron orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-orb"
          style={{ background: "radial-gradient(circle, rgba(255,107,0,0.18) 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl animate-orb"
          style={{ background: "radial-gradient(circle, rgba(244,196,48,0.12) 0%, transparent 70%)", animationDelay:"3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-orb"
          style={{ background: "radial-gradient(circle, rgba(192,57,43,0.1) 0%, transparent 70%)", animationDelay:"1.5s" }} />
        {/* Mandala rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full animate-mandala"
          style={{ border:"1px solid rgba(255,107,0,0.06)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full animate-mandala_rev"
          style={{ border:"1px solid rgba(244,196,48,0.05)" }} />
        {/* Om watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
          style={{ fontSize:"500px", fontFamily:"'Noto Serif Devanagari',serif", color:"rgba(255,107,0,0.025)", lineHeight:1 }}>ॐ</div>
        {/* Mandala pattern */}
        <div className="absolute inset-0 mandala-pattern opacity-50" />
      </div>

      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Hero today card — Sacred style */}
        <div className="mb-8 animate-fadeUp">
          <div className="relative rounded-3xl overflow-hidden p-8"
            style={{
              background: "linear-gradient(135deg, rgba(255,107,0,0.08), rgba(244,196,48,0.04), rgba(0,0,0,0.6))",
              border: "1px solid rgba(255,107,0,0.25)",
              boxShadow: "0 0 40px rgba(255,107,0,0.08), inset 0 0 40px rgba(255,107,0,0.03)"
            }}>
            {/* Top sacred line */}
            <div className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: "linear-gradient(90deg, transparent, #FF6B00, #F4C430, #FF6B00, transparent)" }} />

            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* Today's date */}
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                  <span className="text-lg animate-diyadance">🪔</span>
                  <p className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color:"rgba(255,107,0,0.7)" }}>आजको मिति</p>
                </div>
                <div className="flex items-baseline gap-2 justify-center lg:justify-start">
                  <p className="text-7xl font-bold font-devanagari leading-none animate-countUp text-gold-gradient">
                    {toNepaliDigits(todayBs.day)}
                  </p>
                  <div>
                    <p className="text-2xl font-devanagari" style={{ color:"rgba(255,165,0,0.9)" }}>{BS_MONTHS_NP[todayBs.month - 1]}</p>
                    <p className="text-sm font-devanagari" style={{ color:"rgba(255,107,0,0.5)" }}>{toNepaliDigits(todayBs.year)}</p>
                  </div>
                </div>
                <p className="text-sm mt-2" style={{ color:"rgba(255,255,255,0.35)" }}>{formatAdDate(todayAd)}</p>
              </div>

              {/* Panchang cards */}
              {panchangEntries.length > 0 && (
                <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {panchangEntries.map((p, i) => (
                    <div key={p.label}
                      className="group relative rounded-2xl p-4 transition-all duration-300 hover:scale-105 animate-fadeUp"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,107,0,0.08), rgba(244,196,48,0.04))",
                        border: "1px solid rgba(255,107,0,0.2)",
                        animationDelay: `${i * 100}ms`
                      }}>
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.15), rgba(244,196,48,0.08))" }} />
                      <div className="relative text-center">
                        <div className="flex justify-center mb-2 animate-float" style={{ animationDelay:`${i*0.5}s` }}>
                          <p.Icon size={44} />
                        </div>
                        <p className="text-[10px] font-devanagari mb-1" style={{ color:"rgba(255,107,0,0.6)" }}>{p.label}</p>
                        <p className="text-xs font-semibold text-white leading-tight">{p.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="xl:col-span-3 space-y-4 animate-fadeUp" style={{ animationDelay:"200ms" }}>
            {/* Month nav */}
            <div className="flex items-center justify-between px-2">
              <button onClick={prevMonth}
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background:"rgba(255,107,0,0.1)", border:"1px solid rgba(255,107,0,0.25)", color:"rgba(255,107,0,0.8)" }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="text-center">
                <p className="text-3xl font-bold font-devanagari text-white mb-1">
                  {BS_MONTHS_NP[viewMonth - 1]}
                </p>
                <p className="text-sm font-devanagari tracking-wider" style={{ color:"rgba(255,107,0,0.5)" }}>{toNepaliDigits(viewYear)}</p>
              </div>

              <button onClick={nextMonth}
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background:"rgba(255,107,0,0.1)", border:"1px solid rgba(255,107,0,0.25)", color:"rgba(255,107,0,0.8)" }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <CalendarGrid
              year={viewYear}
              month={viewMonth}
              monthDays={monthDays}
              startWeekday={startWeekday}
              today={todayBs}
              festivals={festivals}
              onDayClick={setSelectedDay}
              selectedDay={selectedDay}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-4 animate-fadeUp" style={{ animationDelay:"300ms" }}>
            {/* Selected day */}
            <div className="relative rounded-3xl p-6 overflow-hidden group"
              style={{
                background:"linear-gradient(135deg, rgba(255,107,0,0.08), rgba(244,196,48,0.04), rgba(0,0,0,0.5))",
                border:"1px solid rgba(255,107,0,0.2)"
              }}>
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background:"linear-gradient(135deg, rgba(255,107,0,0.12), rgba(244,196,48,0.06))" }} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm animate-diyadance">🪔</span>
                  <p className="text-xs uppercase tracking-[0.2em]" style={{ color:"rgba(255,107,0,0.6)" }}>चयनित दिन</p>
                </div>
                <div className="flex items-baseline gap-3 mb-4">
                  <p className="text-7xl font-bold font-devanagari leading-none animate-countUp text-gold-gradient">
                    {toNepaliDigits(selectedDay)}
                  </p>
                  <div>
                    <p className="text-sm font-devanagari" style={{ color:"rgba(255,165,0,0.8)" }}>{BS_MONTHS_NP[viewMonth - 1]}</p>
                    <p className="text-xs font-devanagari" style={{ color:"rgba(255,107,0,0.4)" }}>{toNepaliDigits(viewYear)}</p>
                  </div>
                </div>

                {selectedFestival && (
                  <div className="relative rounded-2xl p-4 animate-fadeIn"
                    style={{
                      background:"linear-gradient(135deg, rgba(255,107,0,0.15), rgba(244,196,48,0.08))",
                      border:"1px solid rgba(255,107,0,0.3)"
                    }}>
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-2xl animate-diyadance">{selectedFestival.is_public_holiday ? "🪔" : "🪷"}</span>
                      <p className="font-bold text-white text-sm leading-tight font-devanagari">{selectedFestival.name}</p>
                      {selectedFestival.is_public_holiday && (
                        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ background:"rgba(255,107,0,0.2)", color:"#FF9A3C", border:"1px solid rgba(255,107,0,0.3)" }}>बिदा</span>
                      )}
                    </div>
                    {selectedFestival.tithi && (
                      <p className="text-xs text-white/50 font-devanagari mb-1">{selectedFestival.tithi}</p>
                    )}
                    {selectedFestival.description && (
                      <p className="text-xs text-white/60 leading-relaxed">{selectedFestival.description}</p>
                    )}
                    {selectedFestival.panchangam && (
                      <p className="text-xs text-white/30 font-devanagari mt-1 leading-relaxed">{selectedFestival.panchangam}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Month festivals */}
            <div className="relative rounded-3xl p-6 overflow-hidden"
              style={{
                background:"linear-gradient(135deg, rgba(255,107,0,0.06), rgba(244,196,48,0.03), rgba(0,0,0,0.5))",
                border:"1px solid rgba(255,107,0,0.18)"
              }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-base animate-diyadance">🪔</span>
                <p className="text-xs uppercase tracking-[0.2em] font-devanagari"
                  style={{ color:"rgba(255,107,0,0.6)" }}>
                  {BS_MONTHS_NP[viewMonth - 1]} का पर्वहरू
                </p>
              </div>
              {monthFestivals.length === 0 ? (
                <p className="text-sm italic font-devanagari" style={{ color:"rgba(255,255,255,0.25)" }}>यस महिना कुनै पर्व छैन</p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {monthFestivals.map((f, i) => {
                    const fd = parseInt(f.bs_date.split("-")[2]);
                    return (
                      <div key={`${f.bs_date}-${f.name}-${i}`}
                        onClick={() => setSelectedDay(fd)}
                        className="group flex items-start gap-3 cursor-pointer animate-slideRight"
                        style={{ animationDelay:`${i*60}ms` }}>
                        <div className="relative mt-0.5 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                          style={{
                            background: f.is_public_holiday ? "rgba(255,107,0,0.12)" : "rgba(244,196,48,0.08)",
                            border: f.is_public_holiday ? "1px solid rgba(255,107,0,0.3)" : "1px solid rgba(244,196,48,0.2)"
                          }}>
                          <span className="text-sm font-bold font-devanagari text-white">
                            {toNepaliDigits(fd)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-semibold text-white truncate font-devanagari transition-colors duration-300"
                              style={{ color: "rgba(255,255,255,0.85)" }}>
                              {f.name}
                            </p>
                            {f.is_public_holiday && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full flex-shrink-0"
                                style={{ background:"rgba(255,107,0,0.2)", color:"#FF9A3C" }}>बिदा</span>
                            )}
                          </div>
                          <p className="text-[11px]" style={{ color:"rgba(255,107,0,0.4)" }}>{f.tithi || f.bs_date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick action */}
            <button
              onClick={() => { setViewYear(todayBs.year); setViewMonth(todayBs.month); setSelectedDay(todayBs.day); }}
              className="w-full relative rounded-2xl p-4 font-bold text-white transition-all duration-300 hover:scale-105 group overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #FF6B00, #E85D00)",
                boxShadow: "0 0 20px rgba(255,107,0,0.3)"
              }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, #FF9A3C, #FF6B00)" }} />
              <div className="relative flex items-center justify-center gap-2">
                <span className="text-xl animate-diyadance">🪔</span>
                <span>आजको दिनमा जानुहोस्</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
