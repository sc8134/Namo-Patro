import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const NP_KEYBOARD_ROWS = [
  ["ट","ठ","ड","ढ","ण","त","थ","द","ध","न"],
  ["प","फ","ब","भ","म","य","र","ल","व","श"],
  ["ष","स","ह","क","ख","ग","घ","ङ","च","छ"],
  ["ज","झ","ञ","अ","आ","इ","ई","उ","ऊ","ए"],
];

export default function Utilities() {
  const [tab, setTab] = useState<"dict"|"keyboard"|"recharge">("dict");
  const [search, setSearch] = useState("");
  const [dictResults, setDictResults] = useState<any[]>([]);
  const [dictLoading, setDictLoading] = useState(false);
  const [typed, setTyped] = useState("");
  const [rechargePhone, setRechargePhone] = useState("");
  const [rechargeAmt, setRechargeAmt] = useState("");
  const [recharged, setRecharged] = useState(false);

  useEffect(() => {
    setDictLoading(true);
    axios.get("/api/utilities/dictionary")
      .then(r => { setDictResults(Array.isArray(r.data) ? r.data : []); setDictLoading(false); })
      .catch(() => setDictLoading(false));
  }, []);

  const searchDict = (q: string) => {
    setSearch(q);
    setDictLoading(true);
    axios.get(`/api/utilities/dictionary?q=${encodeURIComponent(q)}`)
      .then(r => { setDictResults(Array.isArray(r.data) ? r.data : []); setDictLoading(false); })
      .catch(() => setDictLoading(false));
  };

  return (
    <div className="min-h-screen bg-aurora relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-teal-600 rounded-full opacity-10 blur-3xl animate-orb" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-600 rounded-full opacity-10 blur-3xl animate-orb" style={{ animationDelay:"2s" }} />
      </div>
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-4xl relative z-10">
        <div className="mb-8 animate-fadeUp">
          <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-2">Tools</p>
          <h1 className="text-5xl font-bold text-white mb-2">Utilities</h1>
          <p className="text-white/40">Nepali Dictionary · Keyboard · Mobile Recharge</p>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap animate-fadeUp">
          {[["dict","📖 Dictionary"],["keyboard","⌨️ Keyboard"],["recharge","📱 Recharge"]].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t as any)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300
                ${tab === t ? "bg-white text-gray-900 shadow-lg scale-105" : "backdrop-blur-xl bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}>
              {l}
            </button>
          ))}
        </div>

        {/* Dictionary */}
        {tab === "dict" && (
          <div className="animate-fadeUp">
            <div className="relative mb-6">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 text-xl">🔍</span>
              <input value={search} onChange={(e) => searchDict(e.target.value)} placeholder="Search Nepali or English..."
                className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white placeholder-white/20 outline-none focus:border-white/30 transition-all" />
            </div>
            <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
              {dictLoading && <p className="text-center text-white/30 py-8 animate-pulse">Searching...</p>}
              {!dictLoading && dictResults.map((item: any, i: number) => (
                <div key={item.word_np + i} className="flex items-center justify-between px-6 py-5 border-b border-white/5 hover:bg-white/5 transition-colors animate-fadeUp" style={{ animationDelay:`${i*30}ms` }}>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold font-devanagari text-white min-w-[80px]">{item.word_np}</span>
                    <span className="text-white/20 mt-1">→</span>
                    <div>
                      <p className="text-white/70 font-semibold">{item.word_en}</p>
                      {item.definition && <p className="text-white/30 text-xs mt-0.5">{item.definition}</p>}
                      {item.category && <span className="text-[10px] bg-white/10 text-white/40 px-2 py-0.5 rounded-full mt-1 inline-block capitalize">{item.category}</span>}
                    </div>
                  </div>
                  <button onClick={() => navigator.clipboard?.writeText(item.word_np)} className="text-white/20 hover:text-white transition-colors text-sm flex-shrink-0 ml-4">📋</button>
                </div>
              ))}
              {!dictLoading && dictResults.length === 0 && <p className="text-center text-white/30 py-8">No results found</p>}
            </div>
          </div>
        )}

        {/* Keyboard */}
        {tab === "keyboard" && (
          <div className="animate-fadeUp">
            <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-6 mb-4">
              <div className="min-h-[80px] backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-4 mb-4 flex items-center justify-between">
                <p className="text-2xl font-devanagari text-white flex-1">{typed || <span className="text-white/20 text-base not-italic">Type using the keyboard below...</span>}</p>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setTyped(t => t.slice(0,-1))} className="text-white/40 hover:text-white transition-colors px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm">⌫</button>
                  <button onClick={() => navigator.clipboard?.writeText(typed)} className="text-white/40 hover:text-white transition-colors px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm">📋</button>
                  <button onClick={() => setTyped("")} className="text-white/40 hover:text-white transition-colors px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm">✕</button>
                </div>
              </div>
              <div className="space-y-2">
                {NP_KEYBOARD_ROWS.map((row, ri) => (
                  <div key={ri} className="flex gap-2 justify-center flex-wrap">
                    {row.map((char) => (
                      <button key={char} onClick={() => setTyped(t => t + char)}
                        className="w-10 h-10 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white font-devanagari font-bold hover:bg-white/20 hover:border-white/30 hover:scale-110 transition-all duration-200 text-lg">
                        {char}
                      </button>
                    ))}
                  </div>
                ))}
                <div className="flex gap-2 justify-center mt-2">
                  <button onClick={() => setTyped(t => t + " ")} className="px-12 h-10 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white/40 hover:bg-white/20 hover:text-white transition-all duration-200 text-xs">SPACE</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recharge */}
        {tab === "recharge" && (
          <div className="max-w-md mx-auto animate-fadeUp">
            {!recharged ? (
              <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-8">
                <h2 className="text-xl font-bold text-white mb-6">Mobile Recharge</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Operator</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[["📱","NTC"],["📡","Ncell"],["🌐","Smart"]].map(([icon, op]) => (
                        <button key={op} onClick={() => setRechargePhone("")}
                          className={`backdrop-blur-xl border rounded-2xl p-4 text-center transition-all duration-200
                            ${rechargePhone.startsWith(op) || (op === "NTC" && !rechargePhone.startsWith("Ncell") && !rechargePhone.startsWith("Smart"))
                              ? "bg-white/20 border-white/40 scale-105" : "bg-white/5 border-white/10 hover:bg-white/10"}`}>
                          <div className="text-2xl mb-1">{icon}</div>
                          <p className="text-white text-sm font-semibold">{op}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Phone Number</p>
                    <input value={rechargePhone} onChange={(e) => setRechargePhone(e.target.value)} placeholder="98XXXXXXXX"
                      className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white font-mono placeholder-white/20 outline-none focus:border-white/30 transition-all" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Quick Amounts</p>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[50,100,200,500].map((a) => (
                        <button key={a} onClick={() => setRechargeAmt(String(a))}
                          className={`py-2 rounded-xl text-sm font-bold transition-all duration-200 ${rechargeAmt === String(a) ? "bg-white text-gray-900" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"}`}>
                          ₨{a}
                        </button>
                      ))}
                    </div>
                    <input type="number" value={rechargeAmt} onChange={(e) => setRechargeAmt(e.target.value)} placeholder="Custom amount"
                      className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-white/30 transition-all" />
                  </div>
                  <button onClick={() => rechargePhone && rechargeAmt && setRecharged(true)} disabled={!rechargePhone || !rechargeAmt}
                    className="w-full relative overflow-hidden rounded-2xl py-4 font-bold text-white group disabled:opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-indigo-500" />
                    <span className="relative text-lg">⚡ Recharge ₨{rechargeAmt || "0"}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="backdrop-blur-2xl bg-gradient-to-br from-green-500/20 to-teal-900/20 rounded-3xl border border-green-500/30 p-10 text-center animate-fadeUp">
                <div className="text-7xl mb-4 animate-float">✅</div>
                <h2 className="text-2xl font-bold text-white mb-2">Recharge Successful!</h2>
                <p className="text-white/50 mb-2">₨{rechargeAmt} added to {rechargePhone}</p>
                <p className="text-white/30 text-xs mb-6">Ref: RCH{Math.random().toString(36).substring(2,10).toUpperCase()}</p>
                <button onClick={() => { setRecharged(false); setRechargePhone(""); setRechargeAmt(""); }}
                  className="backdrop-blur-xl bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 transition-all">
                  Recharge Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
