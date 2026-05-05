import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const NEWS_PORTALS = [
  { name:"Kantipur",           url:"https://ekantipur.com",                        icon:"📰", desc:"Nepal's largest daily newspaper",    category:"newspaper" },
  { name:"Ratopati",           url:"https://ratopati.com",                         icon:"🔴", desc:"Breaking news & politics",           category:"news" },
  { name:"Setopati",           url:"https://setopati.com",                         icon:"⚪", desc:"In-depth reporting & analysis",      category:"news" },
  { name:"OnlineKhabar",       url:"https://onlinekhabar.com",                     icon:"🌐", desc:"Digital news portal",                category:"news" },
  { name:"Nagarik",            url:"https://nagariknews.nagariknetwork.com",       icon:"📄", desc:"National daily",                     category:"newspaper" },
  { name:"Gorkhapatra",        url:"https://gorkhapatraonline.com",                icon:"🏛", desc:"Government official daily",          category:"newspaper" },
  { name:"Annapurna Post",     url:"https://annapurnapost.com",                    icon:"🏔", desc:"Himalayan news coverage",            category:"newspaper" },
  { name:"Nepal Samacharpatra",url:"https://nepalsam.com",                         icon:"📋", desc:"National news",                      category:"newspaper" },
  { name:"Himalkhabar",        url:"https://himalkhabar.com",                      icon:"⛰", desc:"Himal Media Group",                  category:"magazine" },
  { name:"Nepali Times",       url:"https://nepalitimes.com",                      icon:"🕐", desc:"English weekly magazine",            category:"magazine" },
  { name:"Republica",          url:"https://myrepublica.nagariknetwork.com",       icon:"🗞", desc:"English daily",                      category:"newspaper" },
  { name:"The Himalayan Times",url:"https://thehimalayantimes.com",               icon:"🏔", desc:"English broadsheet",                 category:"newspaper" },
];

const CATEGORIES = ["all", "newspaper", "news", "magazine"];
const CAT_COLORS: Record<string, string> = {
  newspaper: "from-blue-500/20 to-blue-900/10 border-blue-500/20",
  news: "from-aurora-1/20 to-red-900/10 border-aurora-1/20",
  magazine: "from-aurora-4/20 to-yellow-900/10 border-aurora-4/20",
};

export default function News() {
  const [filter, setFilter] = useState("all");
  const [portals, setPortals] = useState(NEWS_PORTALS);

  useEffect(() => {
    // Try to fetch from backend, fall back to static list
    axios.get("/api/utilities/news-portals")
      .then(r => { if (Array.isArray(r.data) && r.data.length) setPortals(r.data); })
      .catch(() => {});
  }, []);

  const filtered = filter === "all" ? portals : portals.filter((n) => n.category === filter);

  return (
    <div className="min-h-screen bg-aurora relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-blue-600 rounded-full opacity-10 blur-3xl animate-orb" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-aurora-1 rounded-full opacity-10 blur-3xl animate-orb" style={{ animationDelay: "3s" }} />
      </div>
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-6xl relative z-10">
        <div className="mb-10 animate-fadeUp">
          <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-2">Nepal</p>
          <h1 className="text-5xl font-bold text-white mb-2">News & Media</h1>
          <p className="text-white/40">Verified Nepali news portals, blogs & literature</p>
        </div>

        {/* Breaking news ticker */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-5 py-3 mb-8 flex items-center gap-4 overflow-hidden animate-fadeUp">
          <span className="flex-shrink-0 bg-aurora-1 text-white text-xs font-bold px-3 py-1 rounded-lg">LIVE</span>
          <div className="overflow-hidden flex-1">
            <p className="text-white/60 text-sm whitespace-nowrap animate-shimmer">
              📡 Stay updated with the latest from Nepal — Click any portal below to read full news coverage
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 flex-wrap animate-fadeUp">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-2xl text-sm font-semibold capitalize transition-all duration-300
                ${filter === cat ? "bg-white text-gray-900 shadow-lg scale-105" : "backdrop-blur-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30"}`}>
              {cat === "all" ? "✦ All" : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((portal, i) => (
            <a key={portal.name} href={portal.url} target="_blank" rel="noopener noreferrer"
              className={`group relative backdrop-blur-2xl bg-gradient-to-br ${CAT_COLORS[portal.category] ?? "from-white/5 to-transparent border-white/10"}
                rounded-3xl border p-6 hover:border-white/30 transition-all duration-500 hover:-translate-y-2
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-fadeUp`}
              style={{ animationDelay: `${i * 50}ms` }}>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{portal.icon}</div>
              <h3 className="text-white font-bold text-lg mb-1 group-hover:text-aurora-4 transition-colors duration-300">{portal.name}</h3>
              <p className="text-white/40 text-xs leading-relaxed mb-4">{portal.desc}</p>
              <div className="flex items-center gap-1 text-white/30 text-xs group-hover:text-white/60 transition-colors duration-300">
                <span>🔗</span>
                <span className="truncate">{portal.url.replace("https://", "")}</span>
              </div>
              <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 group-hover:text-white group-hover:bg-white/20 transition-all duration-300">
                ↗
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
