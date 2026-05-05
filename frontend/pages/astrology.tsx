import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ZodiacIcon from "../components/ZodiacIcon";

export default function Astrology() {
  const [rashifal, setRashifal] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [tab, setTab] = useState<"rashifal" | "compat">("rashifal");
  const [r1, setR1] = useState("");
  const [r2, setR2] = useState("");
  const [compat, setCompat] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/astrology/rashifal")
      .then(r => { setRashifal(Array.isArray(r.data) ? r.data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const checkCompat = async () => {
    if (!r1 || !r2 || r1 === r2) return;
    const r = await axios.get(`/api/astrology/compatibility?r1=${r1}&r2=${r2}`).catch(() => null);
    if (r) setCompat(r.data);
  };

  return (
    <div className="min-h-screen bg-aurora relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-purple-600 rounded-full opacity-15 blur-3xl animate-orb" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600 rounded-full opacity-15 blur-3xl animate-orb" style={{ animationDelay:"3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full animate-spin_slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full animate-spin_slow" style={{ animationDirection:"reverse", animationDuration:"25s" }} />
      </div>
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-6xl relative z-10">
        <div className="mb-8 animate-fadeUp">
          <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-2">Vedic</p>
          <h1 className="text-5xl font-bold text-white mb-2">Jyotish & Astrology</h1>
          <p className="text-white/40">Daily Rashifal · Compatibility · Kundali — curated by Nepali astrologers</p>
        </div>

        <div className="flex gap-2 mb-8 animate-fadeUp">
          {[["rashifal","🌟 Daily Rashifal"],["compat","💞 Compatibility"]].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t as any)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300
                ${tab === t ? "bg-white text-gray-900 shadow-lg scale-105" : "backdrop-blur-xl bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}>
              {l}
            </button>
          ))}
        </div>

        {tab === "rashifal" && (
          <>
            {loading ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {Array.from({length:12}).map((_,i) => (
                  <div key={i} className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-4 animate-pulse h-32" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8 animate-fadeUp">
                {rashifal.map((r, i) => (
                  <button key={r.rashi} onClick={() => setSelected(selected?.rashi === r.rashi ? null : r)}
                    className={`group relative backdrop-blur-2xl rounded-3xl border p-4 text-center transition-all duration-300 hover:-translate-y-1 animate-fadeUp
                      ${selected?.rashi === r.rashi ? "bg-purple-500/20 border-purple-400/50 shadow-[0_0_30px_rgba(168,85,247,0.4)]" : "bg-white/5 border-white/10 hover:border-white/25"}`}
                    style={{ animationDelay:`${i*40}ms` }}>
                    <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <ZodiacIcon rashi={r.rashi} size={64} />
                    </div>
                    <p className="text-white font-bold text-xs font-devanagari">{r.rashi_np}</p>
                    <p className="text-white/30 text-[10px]">{r.en}</p>
                  </button>
                ))}
              </div>
            )}

            {selected && (
              <div className="backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 to-indigo-900/10 rounded-3xl border border-purple-400/20 p-8 animate-fadeUp">
                <div className="flex items-start gap-6 flex-wrap">
                  <div className="flex-shrink-0 animate-float">
                    <ZodiacIcon rashi={selected.rashi} size={100} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h2 className="text-3xl font-bold text-white font-devanagari">{selected.rashi_np}</h2>
                      <span className="text-white/40 text-lg">({selected.en})</span>
                      <span className="text-xs bg-white/10 text-white/50 px-3 py-1 rounded-full">{selected.element_np || selected.element} · {selected.lord_np || selected.lord}</span>
                      {selected.source === "live" && (
                        <span className="flex items-center gap-1 text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                          Live
                        </span>
                      )}
                    </div>
                    <p className="text-white/70 text-base leading-relaxed mb-4 font-devanagari">{selected.prediction}</p>
                    {selected.prediction_en && selected.source === "live" && (
                      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
                        <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Original English</p>
                        <p className="text-white/40 text-xs leading-relaxed italic">{selected.prediction_en}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 gap-4 mt-2">

                      {/* शुभ अंक — Lucky Numbers */}
                      <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-900/10 rounded-2xl p-5 border border-green-500/20">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">🍀</span>
                          <p className="text-sm font-bold text-green-300 font-devanagari">शुभ अंक</p>
                          <span className="text-xs text-white/30 ml-auto">Lucky Numbers</span>
                        </div>
                        <div className="flex gap-3 flex-wrap mb-3">
                          {selected.lucky_number.split(",").map((n: string) => (
                            <div key={n} className="w-12 h-12 rounded-2xl bg-green-500/20 border border-green-400/30 flex items-center justify-center">
                              <span className="text-xl font-bold text-green-300 font-devanagari">{n.trim()}</span>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                            <p className="text-white/30 mb-0.5 font-devanagari">शुभ दिन</p>
                            <p className="text-white/70 font-devanagari">{
                              { Mesh:"मंगलवार", Brish:"शुक्रवार", Mithun:"बुधवार", Karkat:"सोमवार",
                                Singha:"आइतवार", Kanya:"बुधवार", Tula:"शुक्रवार", Brischik:"मंगलवार",
                                Dhanu:"बिहीवार", Makar:"शनिवार", Kumbha:"शनिवार", Meen:"बिहीवार"
                              }[selected.rashi] || "—"
                            }</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                            <p className="text-white/30 mb-0.5 font-devanagari">शुभ समय</p>
                            <p className="text-white/70">{
                              { Mesh:"बिहान ६–८", Brish:"दिउँसो २–४", Mithun:"बिहान ७–९", Karkat:"साँझ ५–७",
                                Singha:"दिउँसो १२–२", Kanya:"बिहान ८–१०", Tula:"साँझ ६–८", Brischik:"राति ९–११",
                                Dhanu:"बिहान ५–७", Makar:"बिहान ७–९", Kumbha:"दिउँसो ३–५", Meen:"साँझ ७–९"
                              }[selected.rashi] || "—"
                            }</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                            <p className="text-white/30 mb-0.5 font-devanagari">अंक ज्योतिष</p>
                            <p className="text-white/70 font-devanagari">मूल अंक: {selected.lucky_number.split(",")[0].trim()}</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                            <p className="text-white/30 mb-0.5 font-devanagari">ग्रह स्वामी</p>
                            <p className="text-white/70 font-devanagari">{selected.lord_np || selected.lord}</p>
                          </div>
                        </div>
                      </div>

                      {/* शुभ रंग — Lucky Color */}
                      <div className="backdrop-blur-xl bg-gradient-to-br from-pink-500/10 to-purple-900/10 rounded-2xl p-5 border border-pink-500/20">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">🎨</span>
                          <p className="text-sm font-bold text-pink-300 font-devanagari">शुभ रंग</p>
                          <span className="text-xs text-white/30 ml-auto">Lucky Color</span>
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                          {/* Color swatch */}
                          <div className="w-16 h-16 rounded-2xl border-2 border-white/20 flex-shrink-0 shadow-lg" style={{
                            background: {
                              Red:"#e53e3e", Green:"#38a169", Yellow:"#d69e2e", White:"#f7fafc",
                              Gold:"#d4af37", Brown:"#8b4513", Blue:"#3182ce", Maroon:"#800000",
                              Purple:"#805ad5", Black:"#1a202c", "Sky Blue":"#87ceeb", "Sea Green":"#2e8b57"
                            }[selected.lucky_color] || "#805ad5"
                          }} />
                          <div>
                            <p className="text-2xl font-bold text-white font-devanagari">{selected.lucky_color_np || selected.lucky_color}</p>
                            <p className="text-white/40 text-xs">{selected.lucky_color}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                            <p className="text-white/30 mb-0.5 font-devanagari">रंगको प्रभाव</p>
                            <p className="text-white/70 font-devanagari">{
                              { Red:"ऊर्जा र साहस", Green:"समृद्धि र शान्ति", Yellow:"बुद्धि र खुशी",
                                White:"शुद्धता र शान्ति", Gold:"सम्पत्ति र सफलता", Brown:"स्थिरता र विश्वास",
                                Blue:"सत्य र ज्ञान", Maroon:"शक्ति र दृढता", Purple:"आध्यात्म र रहस्य",
                                Black:"अनुशासन र गम्भीरता", "Sky Blue":"स्वतन्त्रता र सपना", "Sea Green":"उपचार र वृद्धि"
                              }[selected.lucky_color] || "सकारात्मक ऊर्जा"
                            }</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                            <p className="text-white/30 mb-0.5 font-devanagari">कहाँ प्रयोग गर्ने</p>
                            <p className="text-white/70 font-devanagari">लुगा, घर सजावट</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-2 border border-white/10 col-span-2">
                            <p className="text-white/30 mb-0.5 font-devanagari">सहायक रंगहरू</p>
                            <div className="flex gap-2 mt-1">
                              {(({
                                Red:["#ff6b6b","#ff9f43"], Green:["#55efc4","#00b894"], Yellow:["#fdcb6e","#e17055"],
                                White:["#dfe6e9","#b2bec3"], Gold:["#f9ca24","#f0932b"], Brown:["#cd853f","#deb887"],
                                Blue:["#74b9ff","#0984e3"], Maroon:["#c0392b","#922b21"], Purple:["#a29bfe","#6c5ce7"],
                                Black:["#636e72","#2d3436"], "Sky Blue":["#81ecec","#00cec9"], "Sea Green":["#00b894","#55efc4"]
                              } as Record<string,string[]>)[selected.lucky_color] || ["#a29bfe","#6c5ce7"]).map((c: string) => (
                                <div key={c} className="w-6 h-6 rounded-lg border border-white/20" style={{ background: c }} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* शुभ रत्न — Lucky Gem */}
                      <div className="backdrop-blur-xl bg-gradient-to-br from-aurora-4/10 to-yellow-900/10 rounded-2xl p-5 border border-aurora-4/20">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">💎</span>
                          <p className="text-sm font-bold text-yellow-300 font-devanagari">शुभ रत्न</p>
                          <span className="text-xs text-white/30 ml-auto">Lucky Gemstone</span>
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-16 h-16 rounded-2xl border border-aurora-4/30 bg-aurora-4/10 flex items-center justify-center text-4xl flex-shrink-0">
                            {{"Ruby":"🔴","Emerald":"💚","Topaz":"🟡","Pearl":"⚪","Diamond":"💎",
                              "Sapphire":"🔵","Opal":"🌈","Coral":"🪸","Turquoise":"🩵","Garnet":"🟤",
                              "Amethyst":"🟣","Aquamarine":"🩵"}[selected.lucky_gem] || "💎"}
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-white font-devanagari">{selected.lucky_gem_np || selected.lucky_gem}</p>
                            <p className="text-white/40 text-xs">{selected.lucky_gem}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                            <p className="text-white/30 mb-0.5 font-devanagari">रत्नको शक्ति</p>
                            <p className="text-white/70 font-devanagari">{
                              { Ruby:"आत्मविश्वास बढाउँछ", Emerald:"बुद्धि र स्मृति", Topaz:"सकारात्मकता",
                                Pearl:"भावनात्मक शान्ति", Diamond:"स्पष्टता र शक्ति", Sapphire:"ज्ञान र सत्य",
                                Opal:"रचनात्मकता", Coral:"साहस र ऊर्जा", Turquoise:"सुरक्षा र भाग्य",
                                Garnet:"प्रेम र निष्ठा", Amethyst:"आध्यात्मिक शान्ति", Aquamarine:"साहस र स्पष्टता"
                              }[selected.lucky_gem] || "सकारात्मक ऊर्जा"
                            }</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                            <p className="text-white/30 mb-0.5 font-devanagari">कसरी लगाउने</p>
                            <p className="text-white/70 font-devanagari">{
                              { Ruby:"औँठीमा, दाहिने हात", Emerald:"औँठीमा, दाहिने हात", Topaz:"लकेटमा",
                                Pearl:"औँठी वा माला", Diamond:"औँठीमा", Sapphire:"औँठीमा, दाहिने हात",
                                Opal:"लकेटमा", Coral:"औँठी वा माला", Turquoise:"कंगनमा",
                                Garnet:"औँठीमा", Amethyst:"लकेटमा", Aquamarine:"औँठी वा माला"
                              }[selected.lucky_gem] || "औँठीमा"
                            }</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                            <p className="text-white/30 mb-0.5 font-devanagari">धातु</p>
                            <p className="text-white/70 font-devanagari">{
                              { Ruby:"सुन", Emerald:"सुन वा चाँदी", Topaz:"सुन", Pearl:"चाँदी",
                                Diamond:"सुन वा प्लेटिनम", Sapphire:"चाँदी", Opal:"चाँदी",
                                Coral:"चाँदी वा तामा", Turquoise:"चाँदी", Garnet:"चाँदी",
                                Amethyst:"चाँदी", Aquamarine:"चाँदी वा सुन"
                              }[selected.lucky_gem] || "सुन"
                            }</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                            <p className="text-white/30 mb-0.5 font-devanagari">लगाउने दिन</p>
                            <p className="text-white/70 font-devanagari">{selected.lucky_number.split(",")[0].trim() === "1" ? "आइतवार" :
                              selected.lucky_number.split(",")[0].trim() === "2" ? "सोमवार" :
                              selected.lucky_number.split(",")[0].trim() === "3" ? "बिहीवार" :
                              selected.lucky_number.split(",")[0].trim() === "4" ? "शनिवार" :
                              selected.lucky_number.split(",")[0].trim() === "5" ? "बुधवार" :
                              selected.lucky_number.split(",")[0].trim() === "6" ? "शुक्रवार" :
                              "मंगलवार"}</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {tab === "compat" && (
          <div className="max-w-2xl mx-auto animate-fadeUp">
            <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Rashi Compatibility</h2>
              <div className="grid grid-cols-2 gap-6 mb-6">
                {[["Your Rashi", r1, setR1],["Partner's Rashi", r2, setR2]].map(([label, val, setter]: any) => (
                  <div key={String(label)}>
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-3">{label}</p>
                    <div className="grid grid-cols-4 gap-2">
                      {rashifal.map((r) => (
                        <button key={r.rashi} onClick={() => setter(r.icon)}
                          className={`p-1.5 rounded-xl text-center transition-all duration-200 flex justify-center
                            ${val === r.icon ? "bg-purple-500/30 border border-purple-400/50 scale-110" : "bg-white/5 border border-white/10 hover:border-white/25"}`}
                          title={r.en}>
                          <ZodiacIcon rashi={r.rashi} size={36} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={checkCompat} disabled={!r1 || !r2 || r1 === r2}
                className="w-full relative overflow-hidden rounded-2xl py-3 font-bold text-white group disabled:opacity-40 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500" />
                <span className="relative">Check Compatibility</span>
              </button>

              {compat && (
                <div className={`rounded-3xl p-8 text-center border animate-fadeIn
                  ${compat.compatible ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}>
                  <div className="text-5xl mb-4">{compat.compatible ? "💚" : "💔"}</div>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <ZodiacIcon rashi={rashifal.find(r => r.icon === compat.r1)?.rashi ?? ""} size={56} />
                    <span className="text-white/40 text-2xl">+</span>
                    <ZodiacIcon rashi={rashifal.find(r => r.icon === compat.r2)?.rashi ?? ""} size={56} />
                  </div>
                  <p className={`text-3xl font-bold mb-2 ${compat.compatible ? "text-green-400" : "text-red-400"}`}>{compat.score}%</p>
                  <p className={`text-lg font-semibold mb-3 ${compat.compatible ? "text-green-400" : "text-red-400"}`}>
                    {compat.compatible ? "Highly Compatible! ✨" : "Challenging Match"}
                  </p>
                  <p className="text-white/50 text-sm mb-4">{compat.message}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(compat.aspects || {}).map(([k, v]) => (
                      <div key={k} className="backdrop-blur-xl bg-white/5 rounded-xl p-3 border border-white/10">
                        <p className="text-xs text-white/30 capitalize mb-1">{k}</p>
                        <p className="text-white font-semibold text-sm">{String(v)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
