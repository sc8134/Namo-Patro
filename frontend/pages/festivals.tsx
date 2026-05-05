import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

interface Festival {
  name: string;
  bs_date: string;
  ad_date: string;
  tithi?: string;
  panchangam?: string;
  is_public_holiday: boolean;
  bs_year?: number;
  category?: string;
}

const CATEGORY_CONFIG: Record<string, { color: string; glow: string; icon: string; gradient: string }> = {
  public_holiday: { color:"text-aurora-1",  glow:"shadow-[0_0_30px_rgba(196,30,58,0.4)]",   icon:"🎉", gradient:"from-aurora-1/20 to-aurora-2/10" },
  major:          { color:"text-aurora-1",  glow:"shadow-[0_0_30px_rgba(196,30,58,0.4)]",   icon:"🎊", gradient:"from-aurora-1/20 to-aurora-2/10" },
  cultural:       { color:"text-aurora-3",  glow:"shadow-[0_0_30px_rgba(108,99,255,0.4)]",  icon:"🎭", gradient:"from-aurora-3/20 to-purple-900/10" },
  religious:      { color:"text-aurora-4",  glow:"shadow-[0_0_30px_rgba(245,166,35,0.4)]",  icon:"🙏", gradient:"from-aurora-4/20 to-yellow-900/10" },
  event:          { color:"text-teal-300",  glow:"shadow-[0_0_20px_rgba(45,212,191,0.3)]",  icon:"📅", gradient:"from-teal-500/10 to-teal-900/10" },
};

const BS_MONTHS_NP = ["बैशाख","जेठ","असार","श्रावण","भाद्र","आश्विन","कार्तिक","मंसिर","पुष","माघ","फाल्गुन","चैत्र"];

export default function Festivals() {
  const [events, setEvents]       = useState<Festival[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [filter, setFilter]       = useState("all");
  const [search, setSearch]       = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [source, setSource]       = useState("");
  const [total, setTotal]         = useState(0);
  const [expanded, setExpanded]   = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/festivals/all")
      .then((r) => { if (!r.ok) throw new Error(`${r.status}`); return r.json(); })
      .then((d) => {
        setEvents(Array.isArray(d.events) ? d.events : []);
        setSource(d.source || "");
        setTotal(d.total || 0);
        setLoading(false);
      })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  // Derive unique BS years
  const bsYears = [...new Set(events.map((e) => e.bs_year).filter(Boolean))].sort();

  // Filter
  const filtered = events.filter((e) => {
    const cat = e.is_public_holiday ? "public_holiday" : "event";
    const matchFilter = filter === "all" || (filter === "holiday" ? e.is_public_holiday : cat === filter);
    const matchYear   = yearFilter === "all" || String(e.bs_year) === yearFilter;
    const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchYear && matchSearch;
  });

  // Group by BS month label
  const grouped: Record<string, Festival[]> = {};
  filtered.forEach((e) => {
    const parts = e.bs_date.split("-");
    const monthIdx = parseInt(parts[1]) - 1;
    const year = parts[0];
    const key = `${year}-${String(monthIdx + 1).padStart(2,"0")}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(e);
  });
  const groupKeys = Object.keys(grouped).sort();

  const getCfg = (e: Festival) => {
    if (e.is_public_holiday) return CATEGORY_CONFIG.public_holiday;
    return CATEGORY_CONFIG.event;
  };

  return (
    <div className="min-h-screen bg-aurora relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-20 w-80 h-80 bg-aurora-1 rounded-full opacity-15 blur-3xl animate-orb" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-aurora-3 rounded-full opacity-10 blur-3xl animate-orb" style={{ animationDelay:"3s" }} />
      </div>
      <Navbar />

      <div className="container mx-auto px-4 py-10 max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-8 animate-fadeUp">
          <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-2">Nepal</p>
          <h1 className="text-5xl font-bold text-white mb-2">Festivals & Events</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-white/40">Panchang-based · Lunar calendar · All regions</p>
            {source && (
              <span className="flex items-center gap-1.5 text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                Live · {source}
              </span>
            )}
          </div>
        </div>

        {/* Stats bar */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 animate-fadeUp">
            {[
              { label:"Total Events",    value: total,                                          icon:"📅" },
              { label:"Public Holidays", value: events.filter(e => e.is_public_holiday).length, icon:"🎉" },
              { label:"BS Years",        value: bsYears.join(", "),                             icon:"🗓" },
              { label:"This Month",      value: events.filter(e => {
                const today = new Date();
                return e.ad_date.startsWith(`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}`);
              }).length, icon:"⭐" },
            ].map((s) => (
              <div key={s.label} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <p className="text-2xl mb-1">{s.icon}</p>
                <p className="text-white font-bold text-lg">{s.value}</p>
                <p className="text-white/30 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        {!loading && !error && (
          <div className="flex flex-wrap gap-3 mb-6 animate-fadeUp items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">🔍</span>
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events..."
                className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-white/20 outline-none focus:border-white/30 transition-all" />
            </div>

            {/* Category filter */}
            {[["all","✦ All"],["holiday","🎉 Holidays"],["event","📅 Events"]].map(([v, l]) => (
              <button key={v} onClick={() => setFilter(v)}
                className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300
                  ${filter === v ? "bg-white text-gray-900 shadow-lg scale-105" : "backdrop-blur-xl bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}>
                {l}
              </button>
            ))}

            {/* Year filter */}
            <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}
              className="backdrop-blur-xl bg-[#1a0a2e] border border-white/10 rounded-2xl px-4 py-2.5 text-white text-sm outline-none focus:border-white/30 transition-all">
              <option value="all">All Years</option>
              {bsYears.map((y) => <option key={y} value={String(y)}>BS {y}</option>)}
            </select>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-6">
            {Array.from({length:3}).map((_,i) => (
              <div key={i} className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-6 animate-pulse">
                <div className="h-5 bg-white/10 rounded-xl w-32 mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Array.from({length:6}).map((_,j) => (
                    <div key={j} className="h-20 bg-white/5 rounded-2xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="backdrop-blur-xl bg-aurora-1/10 border border-aurora-1/30 rounded-3xl p-8 text-center animate-fadeUp">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-white font-semibold mb-1">Could not load live festival data</p>
            <p className="text-white/40 text-sm">Make sure the backend is running on port 5000</p>
          </div>
        )}

        {/* No results */}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-white/30 py-16 text-lg">No events found for your filters.</p>
        )}

        {/* Grouped by month */}
        {!loading && !error && groupKeys.map((key, gi) => {
          const [yr, mo] = key.split("-");
          const monthIdx = parseInt(mo) - 1;
          const monthLabel = BS_MONTHS_NP[monthIdx] || mo;
          const monthEvents = grouped[key];
          const holidays = monthEvents.filter(e => e.is_public_holiday);

          return (
            <div key={key} className="mb-8 animate-fadeUp" style={{ animationDelay:`${gi * 60}ms` }}>
              {/* Month header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-5 py-2.5 flex items-center gap-3">
                  <span className="text-2xl font-bold font-devanagari text-white">{monthLabel}</span>
                  <span className="text-white/30 text-sm">{yr} BS</span>
                  {holidays.length > 0 && (
                    <span className="text-xs bg-aurora-1/20 text-aurora-1 border border-aurora-1/30 px-2 py-0.5 rounded-full">
                      {holidays.length} holidays
                    </span>
                  )}
                  <span className="text-xs text-white/20">{monthEvents.length} events</span>
                </div>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              {/* Event cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {monthEvents.map((e, i) => {
                  const cfg = getCfg(e);
                  const cardKey = `${e.bs_date}-${e.name}`;
                  const isExpanded = expanded === cardKey;

                  return (
                    <div
                      key={cardKey}
                      onClick={() => setExpanded(isExpanded ? null : cardKey)}
                      className={`group relative backdrop-blur-2xl bg-gradient-to-br ${cfg.gradient}
                        rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden animate-fadeUp
                        ${e.is_public_holiday ? "border-aurora-1/30 hover:border-aurora-1/60" : "border-white/10 hover:border-white/25"}
                        ${isExpanded ? "shadow-lg" : "hover:-translate-y-0.5"}
                        ${isExpanded ? cfg.glow : ""}`}
                      style={{ animationDelay:`${i * 30}ms` }}
                    >
                      {/* Top accent */}
                      {e.is_public_holiday && (
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-aurora-1 to-transparent" />
                      )}

                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <span className="text-xl flex-shrink-0 mt-0.5">{cfg.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm leading-tight font-devanagari mb-1">{e.name}</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="text-white/40 font-mono">{e.bs_date} BS</span>
                              <span className="text-white/20">·</span>
                              <span className="text-white/40 font-mono">{e.ad_date}</span>
                            </div>
                            {e.tithi && (
                              <p className="text-white/30 text-xs mt-1 font-devanagari">{e.tithi}</p>
                            )}
                          </div>
                          {e.is_public_holiday && (
                            <span className="flex-shrink-0 text-[10px] bg-aurora-1/20 text-aurora-1 border border-aurora-1/30 px-2 py-0.5 rounded-full font-semibold">
                              बिदा
                            </span>
                          )}
                        </div>

                        {/* Expanded details */}
                        {isExpanded && e.panchangam && (
                          <div className="mt-3 pt-3 border-t border-white/10 animate-fadeIn">
                            <p className="text-xs text-white/30 uppercase tracking-widest mb-1">पञ्चाङ्ग</p>
                            <p className="text-white/60 text-xs font-devanagari leading-relaxed">{e.panchangam}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Footer */}
        {!loading && !error && (
          <p className="text-center text-white/20 text-xs mt-8 animate-fadeUp">
            ✦ Data sourced from <span className="text-white/40">casualsnek/npEventsAPI</span> · Panchang-based Nepali calendar events ✦
          </p>
        )}
      </div>
    </div>
  );
}
