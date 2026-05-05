import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const TABS = ["Forex","Metals","Vegetables","Share Market"];

export default function Finance() {
  const [tab, setTab] = useState("Forex");
  const [forex, setForex]     = useState<any[]>([]);
  const [metals, setMetals]   = useState<any[]>([]);
  const [veggies, setVeggies] = useState<any[]>([]);
  const [shares, setShares]   = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [f, m, v, s] = await Promise.all([
        axios.get("/api/finance/forex").then(r => r.data).catch(() => []),
        axios.get("/api/finance/metals").then(r => r.data).catch(() => []),
        axios.get("/api/finance/vegetables").then(r => r.data).catch(() => []),
        axios.get("/api/finance/shares").then(r => r.data).catch(() => []),
      ]);
      setForex(f); setMetals(m); setVeggies(v); setShares(s);
      setLastUpdated(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
      setLoading(false);
    };
    load();
  }, []);

  const summaryCards = [
    { label:"USD/NPR",    value: forex[0] ? `${forex[0].buy_rate}` : "—",    icon:"💵", change:"+0.12%" },
    { label:"Gold/Tola",  value: metals[0] ? `₨${Number(metals[0].price).toLocaleString()}` : "—", icon:"🥇", change: metals[0] ? `${metals[0].change_pct > 0 ? "+" : ""}${metals[0].change_pct}%` : "—" },
    { label:"NEPSE",      value: "2,184.32", icon:"📈", change:"+1.2%" },
    { label:"Silver/Tola",value: metals[2] ? `₨${Number(metals[2].price).toLocaleString()}` : "—", icon:"🥈", change: metals[2] ? `${metals[2].change_pct}%` : "—" },
  ];

  return (
    <div className="min-h-screen bg-aurora relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-green-600 rounded-full opacity-10 blur-3xl animate-orb" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-aurora-4 rounded-full opacity-10 blur-3xl animate-orb" style={{ animationDelay:"2s" }} />
      </div>
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-6xl relative z-10">
        <div className="flex items-end justify-between mb-8 animate-fadeUp flex-wrap gap-4">
          <div>
            <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-2">Nepal</p>
            <h1 className="text-5xl font-bold text-white mb-2">Finance & Economy</h1>
            <p className="text-white/40">NRB Forex · Bullion · Kalimati · NEPSE</p>
          </div>
          <div className="flex items-center gap-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/40 text-xs">Updated {lastUpdated || "—"}</span>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fadeUp">
          {summaryCards.map((s, i) => (
            <div key={s.label} className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-5 hover:border-white/25 transition-all duration-300 animate-fadeUp" style={{ animationDelay:`${i*80}ms` }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{s.icon}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${s.change.startsWith("+") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{s.change}</span>
              </div>
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-white/40 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap animate-fadeUp">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300
                ${tab === t ? "bg-white text-gray-900 shadow-lg scale-105" : "backdrop-blur-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30"}`}>
              {t}
            </button>
          ))}
        </div>

        {loading && (
          <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-12 text-center animate-pulse">
            <p className="text-white/40">Loading live data...</p>
          </div>
        )}

        {/* Forex */}
        {!loading && tab === "Forex" && (
          <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden animate-fadeUp">
            <div className="px-6 py-3 border-b border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <p className="text-xs text-white/40 uppercase tracking-widest">Nepal Rastra Bank Reference Rates</p>
            </div>
            <div className="grid grid-cols-4 text-xs text-white/30 uppercase tracking-widest px-6 py-3 border-b border-white/10">
              <span>Currency</span><span className="text-center">Code</span><span className="text-right">Buy (NPR)</span><span className="text-right">Sell (NPR)</span>
            </div>
            {forex.map((f, i) => (
              <div key={f.currency_code} className="grid grid-cols-4 items-center px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-colors animate-fadeUp" style={{ animationDelay:`${i*25}ms` }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{f.flag}</span>
                  <span className="text-white/70 text-sm">{f.currency_name}</span>
                </div>
                <span className="text-center font-mono font-bold text-white/80">{f.currency_code}</span>
                <span className="text-right font-mono text-green-400">{Number(f.buy_rate).toFixed(2)}</span>
                <span className="text-right font-mono text-aurora-1">{Number(f.sell_rate).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Metals */}
        {!loading && tab === "Metals" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fadeUp">
            {metals.map((m, i) => (
              <div key={m.metal} className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-8 text-center hover:border-aurora-4/40 hover:shadow-[0_0_40px_rgba(245,166,35,0.2)] transition-all duration-500 animate-fadeUp" style={{ animationDelay:`${i*100}ms` }}>
                <div className="text-6xl mb-4 animate-float" style={{ animationDelay:`${i*0.5}s` }}>{i === 2 ? "🥈" : "🥇"}</div>
                <h3 className="text-white font-bold text-lg mb-1">{m.metal}</h3>
                <p className="text-xs text-white/30 mb-4">{m.unit}</p>
                <p className="text-4xl font-bold text-aurora-4 mb-2">₨{Number(m.price).toLocaleString()}</p>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${Number(m.change_amount) >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                  {Number(m.change_amount) >= 0 ? "▲" : "▼"} ₨{Math.abs(Number(m.change_amount))} ({Number(m.change_pct) >= 0 ? "+" : ""}{m.change_pct}%)
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Vegetables */}
        {!loading && tab === "Vegetables" && (
          <div className="animate-fadeUp">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <p className="text-xs text-white/40 uppercase tracking-widest">Kalimati Fruits & Vegetable Market, Kathmandu</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {veggies.map((v, i) => (
                <div key={v.name} className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-5 text-center hover:border-green-500/30 transition-all duration-300 animate-fadeUp" style={{ animationDelay:`${i*40}ms` }}>
                  <p className="text-white font-semibold text-sm mb-0.5">{v.name}</p>
                  {v.name_np && <p className="text-white/30 text-xs font-devanagari mb-2">{v.name_np}</p>}
                  <p className="text-xs text-white/30 mb-2">{v.unit}</p>
                  <p className="text-green-400 font-bold">₨{v.min_price}–{v.max_price}</p>
                  <p className="text-white/20 text-xs mt-1">avg ₨{v.avg_price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shares */}
        {!loading && tab === "Share Market" && (
          <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden animate-fadeUp">
            <div className="px-6 py-3 border-b border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <p className="text-xs text-white/40 uppercase tracking-widest">NEPSE — Nepal Stock Exchange</p>
            </div>
            <div className="grid grid-cols-5 text-xs text-white/30 uppercase tracking-widest px-6 py-3 border-b border-white/10">
              <span className="col-span-2">Company</span><span className="text-center">Symbol</span><span className="text-right">LTP</span><span className="text-right">Change</span>
            </div>
            {shares.map((s, i) => (
              <div key={s.symbol} className="grid grid-cols-5 items-center px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-colors animate-fadeUp" style={{ animationDelay:`${i*35}ms` }}>
                <div className="col-span-2">
                  <p className="text-white/70 text-sm">{s.company_name}</p>
                  <p className="text-white/30 text-xs">{s.sector}</p>
                </div>
                <span className="text-center font-mono font-bold text-white">{s.symbol}</span>
                <span className="text-right font-mono text-white/80">₨{Number(s.ltp).toLocaleString()}</span>
                <span className={`text-right font-mono font-bold ${Number(s.change_amount) >= 0 ? "text-green-400" : "text-aurora-1"}`}>
                  {Number(s.change_amount) >= 0 ? "▲" : "▼"} {Math.abs(Number(s.change_pct))}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
