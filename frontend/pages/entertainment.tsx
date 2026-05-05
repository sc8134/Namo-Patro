import { useState } from "react";
import Navbar from "../components/Navbar";

const IPL_TEAMS = [
  { name:"Mumbai Indians",       short:"MI",  color:"from-blue-600 to-blue-900",   icon:"🔵", wins:12, losses:4, pts:24, nrr:"+0.842" },
  { name:"Chennai Super Kings",  short:"CSK", color:"from-yellow-500 to-yellow-800",icon:"🟡", wins:11, losses:5, pts:22, nrr:"+0.621" },
  { name:"Kolkata Knight Riders",short:"KKR", color:"from-purple-600 to-purple-900",icon:"🟣", wins:10, losses:6, pts:20, nrr:"+0.412" },
  { name:"Royal Challengers",    short:"RCB", color:"from-red-600 to-red-900",      icon:"🔴", wins:9,  losses:7, pts:18, nrr:"+0.215" },
  { name:"Delhi Capitals",       short:"DC",  color:"from-blue-400 to-blue-700",    icon:"🔷", wins:8,  losses:8, pts:16, nrr:"-0.102" },
  { name:"Rajasthan Royals",     short:"RR",  color:"from-pink-500 to-pink-800",    icon:"🩷", wins:7,  losses:9, pts:14, nrr:"-0.234" },
  { name:"Sunrisers Hyderabad",  short:"SRH", color:"from-orange-500 to-orange-800",icon:"🟠", wins:6,  losses:10,pts:12, nrr:"-0.445" },
  { name:"Punjab Kings",         short:"PBKS",color:"from-red-400 to-red-700",      icon:"❤️", wins:5,  losses:11,pts:10, nrr:"-0.612" },
];

const QUIZ_QUESTIONS = [
  { q:"Nepal's national bird is?",                opts:["Peacock","Danphe","Eagle","Parrot"],          ans:1 },
  { q:"Highest peak in Nepal?",                   opts:["Kanchenjunga","Lhotse","Everest","Makalu"],   ans:2 },
  { q:"Nepal's national flower?",                 opts:["Rose","Lotus","Rhododendron","Marigold"],     ans:2 },
  { q:"Capital of Nepal?",                        opts:["Pokhara","Biratnagar","Kathmandu","Lalitpur"],ans:2 },
  { q:"Nepal's national animal?",                 opts:["Tiger","Elephant","Cow","Snow Leopard"],      ans:2 },
  { q:"Which river is the longest in Nepal?",     opts:["Koshi","Gandaki","Karnali","Bagmati"],        ans:2 },
  { q:"Nepal became a republic in which year?",   opts:["2006","2007","2008","2009"],                  ans:2 },
  { q:"Lumbini is the birthplace of?",            opts:["Mahavir","Buddha","Ashoka","Chandragupta"],   ans:1 },
  { q:"Nepal's currency is?",                     opts:["Rupee","Taka","Paisa","Dinar"],               ans:0 },
  { q:"Pashupatinath temple is in which city?",   opts:["Pokhara","Bhaktapur","Kathmandu","Lalitpur"], ans:2 },
  { q:"Nepal shares border with how many countries?",opts:["1","2","3","4"],                           ans:1 },
  { q:"Which is Nepal's largest lake?",           opts:["Phewa","Rara","Tilicho","Begnas"],            ans:1 },
];

const ECARDS = [
  { name:"Dashain",    icon:"🎊", bg:"from-red-500/30 to-orange-500/20",   msg:"शुभ दशैंको हार्दिक शुभकामना!" },
  { name:"Tihar",      icon:"🪔", bg:"from-yellow-500/30 to-orange-500/20",msg:"तिहारको हार्दिक शुभकामना!" },
  { name:"Holi",       icon:"🎨", bg:"from-pink-500/30 to-purple-500/20",  msg:"होलीको रंगीन शुभकामना!" },
  { name:"New Year",   icon:"🎆", bg:"from-blue-500/30 to-purple-500/20",  msg:"नयाँ वर्षको हार्दिक शुभकामना!" },
  { name:"Birthday",   icon:"🎂", bg:"from-pink-500/30 to-red-500/20",     msg:"जन्मदिनको हार्दिक शुभकामना!" },
  { name:"Wedding",    icon:"💒", bg:"from-rose-500/30 to-pink-500/20",    msg:"विवाहको हार्दिक शुभकामना!" },
  { name:"Buddha Jayanti",icon:"🙏",bg:"from-yellow-500/30 to-amber-500/20",msg:"बुद्ध जयन्तीको शुभकामना!" },
  { name:"Teej",       icon:"💃", bg:"from-red-500/30 to-pink-500/20",     msg:"तीजको हार्दिक शुभकामना!" },
];

export default function Entertainment() {
  const [tab, setTab] = useState<"ipl"|"quiz"|"ecards">("ipl");
  // Quiz state
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  // E-card state
  const [selectedCard, setSelectedCard] = useState<typeof ECARDS[0] | null>(null);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleAnswer = (i: number) => {
    if (answered !== null) return;
    setAnswered(i);
    if (i === QUIZ_QUESTIONS[qIdx].ans) setScore(s => s + 1);
    setTimeout(() => {
      if (qIdx + 1 < QUIZ_QUESTIONS.length) { setQIdx(q => q + 1); setAnswered(null); }
      else setDone(true);
    }, 1000);
  };

  const resetQuiz = () => { setQIdx(0); setScore(0); setAnswered(null); setDone(false); };

  const sendCard = () => {
    if (!selectedCard || !recipient.trim()) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-aurora relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-orange-600 rounded-full opacity-10 blur-3xl animate-orb" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-600 rounded-full opacity-10 blur-3xl animate-orb" style={{ animationDelay:"2s" }} />
      </div>
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-5xl relative z-10">
        <div className="mb-8 animate-fadeUp">
          <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-2">Fun</p>
          <h1 className="text-5xl font-bold text-white mb-2">Entertainment</h1>
          <p className="text-white/40">IPL 2025 · Nepal Quiz · Festival E-Cards</p>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap animate-fadeUp">
          {[["ipl","🏏 IPL 2025"],["quiz","🧠 Nepal Quiz"],["ecards","🎴 E-Cards"]].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t as any)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300
                ${tab === t ? "bg-white text-gray-900 shadow-lg scale-105" : "backdrop-blur-xl bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}>
              {l}
            </button>
          ))}
        </div>

        {/* IPL */}
        {tab === "ipl" && (
          <div className="animate-fadeUp">
            <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
                <span className="text-2xl">🏏</span>
                <div>
                  <p className="text-white font-bold">IPL 2025 — Points Table</p>
                  <p className="text-white/40 text-xs">Indian Premier League · Season 18</p>
                </div>
                <span className="ml-auto text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />LIVE
                </span>
              </div>
              <div className="grid grid-cols-6 text-xs text-white/30 uppercase tracking-widest px-6 py-3 border-b border-white/10">
                <span className="col-span-2">Team</span><span className="text-center">W</span><span className="text-center">L</span><span className="text-center">Pts</span><span className="text-right">NRR</span>
              </div>
              {IPL_TEAMS.map((t, i) => (
                <div key={t.short} className="grid grid-cols-6 items-center px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-colors animate-fadeUp" style={{ animationDelay:`${i*40}ms` }}>
                  <div className="col-span-2 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-sm flex-shrink-0`}>{t.icon}</div>
                    <div>
                      <p className="text-white font-semibold text-sm">{t.short}</p>
                      <p className="text-white/30 text-[10px] hidden sm:block">{t.name}</p>
                    </div>
                  </div>
                  <span className="text-center text-green-400 font-bold">{t.wins}</span>
                  <span className="text-center text-red-400 font-bold">{t.losses}</span>
                  <span className="text-center text-white font-bold">{t.pts}</span>
                  <span className={`text-right text-xs font-mono ${t.nrr.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{t.nrr}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz */}
        {tab === "quiz" && (
          <div className="max-w-lg mx-auto animate-fadeUp">
            {!done ? (
              <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-white/40 uppercase tracking-widest">Question {qIdx + 1}/{QUIZ_QUESTIONS.length}</span>
                  <span className="text-xs bg-aurora-4/20 text-aurora-4 border border-aurora-4/30 px-3 py-1 rounded-full">Score: {score}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 mb-8">
                  <div className="bg-gradient-to-r from-aurora-4 to-aurora-1 h-1.5 rounded-full transition-all duration-500" style={{ width:`${(qIdx / QUIZ_QUESTIONS.length) * 100}%` }} />
                </div>
                <h2 className="text-xl font-bold text-white mb-6">{QUIZ_QUESTIONS[qIdx].q}</h2>
                <div className="space-y-3">
                  {QUIZ_QUESTIONS[qIdx].opts.map((opt, i) => (
                    <button key={opt} onClick={() => handleAnswer(i)}
                      className={`w-full text-left px-5 py-4 rounded-2xl border font-medium transition-all duration-300
                        ${answered === null ? "bg-white/5 border-white/10 text-white hover:border-white/30 hover:bg-white/10" :
                          i === QUIZ_QUESTIONS[qIdx].ans ? "bg-green-500/20 border-green-500/50 text-green-300" :
                          answered === i ? "bg-red-500/20 border-red-500/50 text-red-300" :
                          "bg-white/5 border-white/5 text-white/30"}`}>
                      <span className="mr-3 text-white/30">{String.fromCharCode(65 + i)}.</span>{opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="backdrop-blur-2xl bg-gradient-to-br from-aurora-4/20 to-orange-900/20 rounded-3xl border border-aurora-4/30 p-10 text-center animate-fadeUp">
                <div className="text-7xl mb-4 animate-float">🏆</div>
                <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
                <p className="text-5xl font-bold text-aurora-4 mb-2">{score}/{QUIZ_QUESTIONS.length}</p>
                <p className="text-white/50 mb-6">
                  {score === QUIZ_QUESTIONS.length ? "Perfect! तपाईं नेपाल विशेषज्ञ हुनुहुन्छ! 🎉" :
                   score >= 8 ? "Excellent! राम्रो ज्ञान! 👍" :
                   score >= 5 ? "Good job! अझ सिक्नुहोस्! 📚" : "Keep learning! नेपाल बारे थप जान्नुहोस्! 🇳🇵"}
                </p>
                <button onClick={resetQuiz} className="backdrop-blur-xl bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 transition-all">
                  Play Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* E-Cards */}
        {tab === "ecards" && (
          <div className="animate-fadeUp">
            {sent ? (
              <div className="max-w-md mx-auto backdrop-blur-2xl bg-gradient-to-br from-green-500/20 to-teal-900/20 rounded-3xl border border-green-500/30 p-10 text-center animate-fadeUp">
                <div className="text-7xl mb-4 animate-float">{selectedCard?.icon}</div>
                <h2 className="text-2xl font-bold text-white mb-2">E-Card Sent!</h2>
                <p className="text-white/50 mb-1">{selectedCard?.name} card sent to <span className="text-white font-semibold">{recipient}</span></p>
                <p className="text-white/30 text-sm mb-2 font-devanagari">{selectedCard?.msg}</p>
                {message && <p className="text-white/40 text-xs italic mb-6">"{message}"</p>}
                <button onClick={() => { setSent(false); setSelectedCard(null); setRecipient(""); setMessage(""); }}
                  className="backdrop-blur-xl bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 transition-all">
                  Send Another
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Card picker */}
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Choose a Card</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
                    {ECARDS.map((c, i) => (
                      <div key={c.name}
                        onClick={() => setSelectedCard(c)}
                        className={`group backdrop-blur-2xl bg-gradient-to-br ${c.bg} rounded-2xl border p-4 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 animate-fadeUp
                          ${selectedCard?.name === c.name ? "border-white/40 scale-105 shadow-lg" : "border-white/10 hover:border-white/25"}`}
                        style={{ animationDelay:`${i*50}ms` }}>
                        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{c.icon}</div>
                        <p className="text-white font-semibold text-sm">{c.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Send form */}
                <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-6">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Send Card</p>
                  {selectedCard && (
                    <div className="flex items-center gap-3 mb-4 backdrop-blur-xl bg-white/5 rounded-2xl p-3 border border-white/10">
                      <span className="text-3xl">{selectedCard.icon}</span>
                      <div>
                        <p className="text-white font-semibold text-sm">{selectedCard.name}</p>
                        <p className="text-white/40 text-xs font-devanagari">{selectedCard.msg}</p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-white/40 mb-1">Recipient Name / Phone</p>
                      <input value={recipient} onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Name or phone number..."
                        className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-white/30 transition-all text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-1">Personal Message (optional)</p>
                      <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                        placeholder="Add a personal message..."
                        rows={3}
                        className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-white/30 transition-all text-sm resize-none" />
                    </div>
                    <button onClick={sendCard} disabled={!selectedCard || !recipient.trim()}
                      className="w-full relative overflow-hidden rounded-2xl py-3 font-bold text-white group disabled:opacity-40 transition-all">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500" />
                      <span className="relative">📨 Send E-Card</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
