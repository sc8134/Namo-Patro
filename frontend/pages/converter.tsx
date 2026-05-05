import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toNepaliDigits } from "../utils/dateFormatter";

const NAV = [
  { href: "/", label: "नमो पात्रो", icon: "🗓" },
  { href: "/converter", label: "Converter", icon: "🔄" },
  { href: "/festivals", label: "Festivals", icon: "🎊" },
  { href: "/panchang", label: "Panchang", icon: "🌙" },
];

const BS_MONTHS = [
  "Baisakh","Jestha","Ashadh","Shrawan","Bhadra","Ashwin",
  "Kartik","Mangsir","Poush","Magh","Falgun","Chaitra",
];
const BS_MONTHS_NP = [
  "बैशाख","जेठ","असार","श्रावण","भाद्र","आश्विन",
  "कार्तिक","मंसिर","पुष","माघ","फाल्गुन","चैत्र",
];

export default function Converter() {
  const [mode, setMode] = useState<"ad2bs" | "bs2ad">("ad2bs");
  const [adDate, setAdDate] = useState("");
  const [bsYear, setBsYear] = useState("");
  const [bsMonth, setBsMonth] = useState("1");
  const [bsDay, setBsDay] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const convert = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      if (mode === "ad2bs") {
        const r = await axios.get(`/api/calendar/convert?ad=${adDate}`);
        setResult(r.data.bs);
      } else {
        const r = await axios.get(`/api/calendar/convert-bs?year=${bsYear}&month=${bsMonth}&day=${bsDay}`);
        setResult(r.data.ad);
      }
    } catch {
      setError("Conversion failed. Check your input.");
    }
    setLoading(false);
  };

  const parsedResult = result ? result.split("-") : null;

  return (
    <div className="min-h-screen bg-aurora relative overflow-hidden flex flex-col">
      {/* Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-aurora-3 rounded-full opacity-20 blur-3xl animate-orb" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-aurora-4 rounded-full opacity-15 blur-3xl animate-orb" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-aurora-1 rounded-full opacity-10 blur-3xl animate-orb" style={{ animationDelay: "4s" }} />
      </div>

      <Navbar />

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-2xl">
          {/* Title */}
          <div className="text-center mb-10 animate-fadeUp">
            <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-3">Date</p>
            <h1 className="text-5xl font-bold text-white mb-3">Converter</h1>
            <p className="text-white/40">Bikram Sambat ↔ Anno Domini</p>
          </div>

          {/* Mode toggle */}
          <div className="flex justify-center mb-8 animate-fadeUp" style={{ animationDelay: "100ms" }}>
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-1.5 flex gap-1">
              {(["ad2bs", "bs2ad"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setResult(null); setError(""); }}
                  className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
                    ${mode === m ? "text-white" : "text-white/40 hover:text-white/70"}`}
                >
                  {mode === m && (
                    <div className="absolute inset-0 bg-gradient-to-r from-nepali-red to-aurora-1 rounded-xl" />
                  )}
                  <span className="relative">
                    {m === "ad2bs" ? "AD → BS" : "BS → AD"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Input card */}
          <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/15 p-8 mb-6 animate-fadeUp" style={{ animationDelay: "200ms" }}>
            {mode === "ad2bs" ? (
              <div className="space-y-4">
                <label className="block text-xs text-white/40 uppercase tracking-[0.2em] mb-2">
                  Enter AD Date
                </label>
                <div className="relative group">
                  <input
                    type="date"
                    value={adDate}
                    onChange={(e) => setAdDate(e.target.value)}
                    className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-5 py-4
                      text-white text-lg font-mono placeholder-white/20 outline-none
                      focus:border-white/30 focus:bg-white/10 transition-all duration-300
                      [color-scheme:dark]"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <label className="block text-xs text-white/40 uppercase tracking-[0.2em] mb-2">
                  Enter BS Date
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-white/30 mb-2">Year</p>
                    <input
                      type="number"
                      placeholder="2081"
                      value={bsYear}
                      onChange={(e) => setBsYear(e.target.value)}
                      className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-4
                        text-white text-lg font-mono placeholder-white/20 outline-none
                        focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-2">Month</p>
                    <select
                      value={bsMonth}
                      onChange={(e) => setBsMonth(e.target.value)}
                      className="w-full backdrop-blur-xl bg-[#1a0a2e] border border-white/10 rounded-2xl px-4 py-4
                        text-white text-sm outline-none focus:border-white/30 transition-all duration-300"
                    >
                      {BS_MONTHS.map((m, i) => (
                        <option key={i} value={i + 1}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-2">Day</p>
                    <input
                      type="number"
                      placeholder="1"
                      min="1"
                      max="32"
                      value={bsDay}
                      onChange={(e) => setBsDay(e.target.value)}
                      className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-4
                        text-white text-lg font-mono placeholder-white/20 outline-none
                        focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Convert button */}
            <button
              onClick={convert}
              disabled={loading || (mode === "ad2bs" ? !adDate : !bsYear || !bsDay)}
              className="mt-6 w-full relative group overflow-hidden rounded-2xl py-4 font-bold text-white
                transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed
                hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-nepali-red via-aurora-1 to-aurora-3 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-aurora-3 via-aurora-1 to-nepali-red opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center justify-center gap-2 text-lg">
                {loading ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <span className="text-xl">🔄</span>
                    Convert {mode === "ad2bs" ? "to BS" : "to AD"}
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="backdrop-blur-xl bg-aurora-1/10 border border-aurora-1/30 rounded-2xl p-4 text-center text-white/70 text-sm animate-fadeUp">
              ⚠️ {error}
            </div>
          )}

          {/* Result */}
          {parsedResult && (
            <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/20 p-8 text-center animate-fadeUp overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-nepali-red/10 via-transparent to-aurora-3/10" />
              <div className="relative">
                <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-6">Result</p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  {parsedResult.map((part, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="text-center animate-countUp" style={{ animationDelay: `${i * 100}ms` }}>
                        <p className="text-5xl font-bold font-devanagari text-white leading-none">
                          {mode === "ad2bs" ? toNepaliDigits(part) : part}
                        </p>
                        <p className="text-xs text-white/30 mt-2 uppercase tracking-widest">
                          {i === 0 ? "Year" : i === 1 ? "Month" : "Day"}
                        </p>
                      </div>
                      {i < parsedResult.length - 1 && (
                        <span className="text-white/20 text-3xl font-thin">—</span>
                      )}
                    </div>
                  ))}
                </div>
                {mode === "ad2bs" && parsedResult.length === 3 && (
                  <p className="text-white/40 text-sm mt-2">
                    {BS_MONTHS_NP[parseInt(parsedResult[1]) - 1]} {toNepaliDigits(parsedResult[0])}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-center gap-3">
                  <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                    <span className="text-white/40 text-xs font-mono">{result}</span>
                  </div>
                  <button onClick={() => navigator.clipboard?.writeText(result || "")}
                    className="backdrop-blur-xl bg-white/10 border border-white/10 hover:bg-white/20 text-white/60 hover:text-white px-3 py-2 rounded-xl text-xs transition-all duration-200">
                    📋 Copy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
