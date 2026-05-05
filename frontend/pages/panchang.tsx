import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { TithiIcon, VaraIcon, NakshatraIcon, YogaIcon, KaranaIcon } from "../components/PanchangIcons";

interface Panchang {
  tithi: string; vara: string; nakshatra: string; yoga: string; karana: string;
}

const NAV = [
  { href: "/", label: "नमो पात्रो", icon: "🗓" },
  { href: "/converter", label: "Converter", icon: "🔄" },
  { href: "/festivals", label: "Festivals", icon: "🎊" },
  { href: "/panchang", label: "Panchang", icon: "🌙" },
];

const PANCHANG_META: Record<string, { Icon: (p:{size?:number})=>JSX.Element; label: string; labelNp: string; desc: string; color: string; glow: string }> = {
  tithi:    { Icon: TithiIcon,     label: "Tithi",    labelNp: "तिथि",   desc: "Lunar day — चन्द्र तिथि",           color: "from-blue-900/30 to-indigo-900/20",   glow: "shadow-[0_0_40px_rgba(99,102,241,0.3)]" },
  vara:     { Icon: VaraIcon,      label: "Vara",     labelNp: "वार",    desc: "Day of the week — सूर्य वार",        color: "from-orange-900/30 to-red-900/20",    glow: "shadow-[0_0_40px_rgba(255,107,0,0.4)]" },
  nakshatra:{ Icon: NakshatraIcon, label: "Nakshatra",labelNp: "नक्षत्र", desc: "Lunar mansion — चन्द्र नक्षत्र",   color: "from-purple-900/30 to-violet-900/20", glow: "shadow-[0_0_40px_rgba(168,85,247,0.3)]" },
  yoga:     { Icon: YogaIcon,      label: "Yoga",     labelNp: "योग",    desc: "Auspicious period — शुभ योग",        color: "from-red-900/30 to-orange-900/20",    glow: "shadow-[0_0_40px_rgba(255,107,0,0.4)]" },
  karana:   { Icon: KaranaIcon,    label: "Karana",   labelNp: "करण",    desc: "Half lunar day — अर्ध तिथि",         color: "from-yellow-900/30 to-amber-900/20",  glow: "shadow-[0_0_40px_rgba(244,196,48,0.4)]" },
};

export default function Panchang() {
  const [panchang, setPanchang] = useState<Panchang | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);

  const fetchPanchang = (date: string) => {
    setLoading(true);
    axios.get(`/api/calendar/panchang?date=${date}`)
      .then((r) => { setPanchang(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchPanchang(selectedDate); }, []);

  const today = new Date();
  const dateLabel = new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="min-h-screen bg-aurora relative overflow-hidden">
      {/* Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-600 rounded-full opacity-15 blur-3xl animate-orb" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-600 rounded-full opacity-15 blur-3xl animate-orb" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-aurora-4 rounded-full opacity-10 blur-3xl animate-orb" style={{ animationDelay: "1.5s" }} />
        {/* Spinning mandala ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-spin_slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full animate-spin_slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
      </div>

      <Navbar />

      <div className="container mx-auto px-4 py-10 max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fadeUp">
          <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-3">Daily</p>
          <h1 className="text-5xl font-bold text-white mb-3">पञ्चाङ्ग</h1>
          <p className="text-white/40 mb-8">The five limbs of the Hindu calendar</p>

          {/* Date picker */}
          <div className="inline-flex items-center gap-4 backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl px-6 py-4">
            <span className="text-white/40 text-sm">{dateLabel}</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => { setSelectedDate(e.target.value); fetchPanchang(e.target.value); }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-4 py-2
                text-white text-sm outline-none focus:border-white/40 transition-all duration-300
                [color-scheme:dark]"
            />
            <button
              onClick={() => { const t = today.toISOString().split("T")[0]; setSelectedDate(t); fetchPanchang(t); }}
              className="text-xs text-white/50 hover:text-white transition-colors duration-200 border border-white/10 hover:border-white/30 rounded-xl px-3 py-2"
            >
              Today
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 animate-pulse">
                <div className="w-16 h-16 bg-white/10 rounded-2xl mx-auto mb-4" />
                <div className="h-4 bg-white/10 rounded-xl w-1/2 mx-auto mb-3" />
                <div className="h-6 bg-white/10 rounded-xl w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        )}

        {/* Panchang cards — pentagon layout */}
        {!loading && panchang && (
          <>
            {/* Top row: 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
              {(["tithi", "vara", "nakshatra"] as const).map((key, i) => {
                const meta = PANCHANG_META[key];
                const isHov = hovered === key;
                return (
                  <div
                    key={key}
                    onMouseEnter={() => setHovered(key)}
                    onMouseLeave={() => setHovered(null)}
                    className={`group relative backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10
                      hover:border-white/25 transition-all duration-500 overflow-hidden cursor-default
                      animate-fadeUp hover:-translate-y-2 ${isHov ? meta.glow : ""}`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${meta.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative p-8 text-center">
                      <div className="flex justify-center mb-4 animate-float" style={{ animationDelay: `${i * 0.7}s` }}>
                        <meta.Icon size={72} />
                      </div>
                      <p className="text-xs text-white/30 uppercase tracking-[0.2em] mb-1">{meta.label}</p>
                      <p className="text-xs text-white/20 font-devanagari mb-3">{meta.labelNp}</p>
                      <p className="text-2xl font-bold text-white mb-2">{panchang[key]}</p>
                      <p className="text-xs text-white/30">{meta.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom row: 2 cards centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
              {(["yoga", "karana"] as const).map((key, i) => {
                const meta = PANCHANG_META[key];
                const isHov = hovered === key;
                return (
                  <div
                    key={key}
                    onMouseEnter={() => setHovered(key)}
                    onMouseLeave={() => setHovered(null)}
                    className={`group relative backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10
                      hover:border-white/25 transition-all duration-500 overflow-hidden cursor-default
                      animate-fadeUp hover:-translate-y-2 ${isHov ? meta.glow : ""}`}
                    style={{ animationDelay: `${(i + 3) * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${meta.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative p-8 text-center">
                      <div className="flex justify-center mb-4 animate-float" style={{ animationDelay: `${(i + 3) * 0.7}s` }}>
                        <meta.Icon size={72} />
                      </div>
                      <p className="text-xs text-white/30 uppercase tracking-[0.2em] mb-1">{meta.label}</p>
                      <p className="text-xs text-white/20 font-devanagari mb-3">{meta.labelNp}</p>
                      <p className="text-2xl font-bold text-white mb-2">{panchang[key]}</p>
                      <p className="text-xs text-white/30">{meta.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom note */}
            <p className="text-center text-white/20 text-xs mt-10 animate-fadeUp" style={{ animationDelay: "600ms" }}>
              ✦ Panchang data is indicative. Consult a Jyotishi for precise calculations. ✦
            </p>
          </>
        )}
      </div>
    </div>
  );
}
