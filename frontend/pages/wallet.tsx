import { useState } from "react";
import Navbar from "../components/Navbar";

const SERVICES = [
  { icon: "💡", label: "Electricity", color: "from-yellow-500/20 to-yellow-900/10 border-yellow-500/20" },
  { icon: "💧", label: "Water", color: "from-blue-500/20 to-blue-900/10 border-blue-500/20" },
  { icon: "📱", label: "Mobile Top-up", color: "from-green-500/20 to-green-900/10 border-green-500/20" },
  { icon: "📺", label: "Cable TV", color: "from-purple-500/20 to-purple-900/10 border-purple-500/20" },
  { icon: "🌐", label: "Internet", color: "from-teal-500/20 to-teal-900/10 border-teal-500/20" },
  { icon: "🏦", label: "Bank Transfer", color: "from-indigo-500/20 to-indigo-900/10 border-indigo-500/20" },
  { icon: "🏥", label: "Insurance", color: "from-red-500/20 to-red-900/10 border-red-500/20" },
  { icon: "✈️", label: "Flight", color: "from-sky-500/20 to-sky-900/10 border-sky-500/20" },
];

const TRANSACTIONS = [
  { icon: "💡", label: "NEA Electricity", amount: -1450, date: "Today, 10:32 AM", status: "success" },
  { icon: "📱", label: "NTC Top-up", amount: -500, date: "Yesterday, 3:15 PM", status: "success" },
  { icon: "💰", label: "Received from Hari", amount: +2000, date: "Dec 12, 9:00 AM", status: "success" },
  { icon: "🌐", label: "WorldLink Internet", amount: -1200, date: "Dec 10, 11:45 AM", status: "success" },
  { icon: "🏦", label: "Bank Withdrawal", amount: -5000, date: "Dec 8, 2:30 PM", status: "success" },
];

export default function Wallet() {
  const [tab, setTab] = useState<"home" | "pay" | "send" | "history">("home");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState("NTC");
  const [selectedService, setSelectedService] = useState("");
  const [billAccount, setBillAccount] = useState("");
  const [billPaid, setBillPaid] = useState(false);
  const [copied, setCopied] = useState(false);

  const balance = 12450;

  return (
    <div className="min-h-screen bg-aurora relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-green-600 rounded-full opacity-10 blur-3xl animate-orb" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-600 rounded-full opacity-10 blur-3xl animate-orb" style={{ animationDelay: "2s" }} />
      </div>
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-4xl relative z-10">
        <div className="mb-8 animate-fadeUp">
          <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-2">Digital</p>
          <h1 className="text-5xl font-bold text-white mb-2">Namo Pay</h1>
          <p className="text-white/40">Nepal's digital wallet — pay, send, receive</p>
        </div>

        {/* Balance card */}
        <div className="relative backdrop-blur-2xl bg-gradient-to-br from-green-500/20 to-teal-900/20 rounded-3xl border border-green-500/20 p-8 mb-6 overflow-hidden animate-fadeUp">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
          <div className="relative">
            <p className="text-xs text-white/40 uppercase tracking-[0.2em] mb-2">Available Balance</p>
            <p className="text-5xl font-bold text-white mb-1">₨ {balance.toLocaleString()}</p>
            <p className="text-white/40 text-sm">Namo Pay Wallet</p>
            <div className="flex gap-3 mt-6">
              {[["➕","Add Money"],["➖","Withdraw"],["📤","Send"],["📥","Request"]].map(([icon, label]) => (
                <button key={label} className="flex flex-col items-center gap-1 backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl px-4 py-3 hover:bg-white/20 transition-all duration-200 hover:scale-105">
                  <span className="text-xl">{icon}</span>
                  <span className="text-[10px] text-white/60">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 animate-fadeUp">
          {[["home","🏠 Services"],["pay","📱 Pay Bill"],["send","💸 Send Money"],["history","📋 History"]].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t as any)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300
                ${tab === t ? "bg-white text-gray-900 shadow-lg scale-105" : "backdrop-blur-xl bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}>
              {l}
            </button>
          ))}
        </div>

        {tab === "home" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fadeUp">
            {SERVICES.map((s, i) => (
              <button key={s.label}
                className={`group backdrop-blur-2xl bg-gradient-to-br ${s.color} rounded-3xl border p-6 text-center hover:border-white/30 transition-all duration-300 hover:-translate-y-1 animate-fadeUp`}
                style={{ animationDelay: `${i * 50}ms` }}>
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                <p className="text-white font-semibold text-sm">{s.label}</p>
              </button>
            ))}
          </div>
        )}

        {tab === "pay" && (
          <div className="max-w-md mx-auto backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-8 animate-fadeUp">
            <h2 className="text-xl font-bold text-white mb-6">Pay Utility Bill</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Service</p>
                <select className="w-full backdrop-blur-xl bg-[#1a0a2e] border border-white/10 rounded-2xl px-4 py-4 text-white outline-none focus:border-white/30 transition-all">
                  {SERVICES.map((s) => <option key={s.label}>{s.icon} {s.label}</option>)}
                </select>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Account / Phone</p>
                <input value={billAccount} onChange={(e) => setBillAccount(e.target.value)} placeholder="Enter account number..."
                  className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white placeholder-white/20 outline-none focus:border-white/30 transition-all" />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Amount (NPR)</p>
                <input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)}
                  className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white text-2xl font-bold placeholder-white/20 outline-none focus:border-white/30 transition-all" />
              </div>
              {!billPaid ? (
                <button onClick={() => billAccount && amount && setBillPaid(true)} disabled={!billAccount || !amount}
                  className="w-full relative overflow-hidden rounded-2xl py-4 font-bold text-white group disabled:opacity-40">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500" />
                  <span className="relative text-lg">💳 Pay Now {amount ? `₨${amount}` : ""}</span>
                </button>
              ) : (
                <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 text-center animate-fadeIn">
                  <p className="text-green-400 font-bold">✅ Payment Successful!</p>
                  <p className="text-white/50 text-sm mt-1">₨{amount} paid</p>
                  <p className="text-white/30 text-xs mt-1">Ref: PAY{Math.random().toString(36).substring(2,10).toUpperCase()}</p>
                  <button onClick={() => { setBillPaid(false); setAmount(""); setBillAccount(""); }}
                    className="mt-3 text-xs text-white/50 hover:text-white underline">Pay another bill</button>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "send" && (
          <div className="max-w-md mx-auto animate-fadeUp">
            {!sent ? (
              <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-8">
                <h2 className="text-xl font-bold text-white mb-6">Send Money</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Recipient Phone</p>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98XXXXXXXX"
                      className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white font-mono placeholder-white/20 outline-none focus:border-white/30 transition-all" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Amount (NPR)</p>
                    <input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)}
                      className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white text-2xl font-bold placeholder-white/20 outline-none focus:border-white/30 transition-all" />
                  </div>
                  <button onClick={() => phone && amount && setSent(true)} disabled={!phone || !amount}
                    className="w-full relative overflow-hidden rounded-2xl py-4 font-bold text-white group disabled:opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500" />
                    <span className="relative text-lg">💸 Send ₨{amount || "0"}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="backdrop-blur-2xl bg-gradient-to-br from-green-500/20 to-teal-900/20 rounded-3xl border border-green-500/30 p-10 text-center animate-fadeUp">
                <div className="text-7xl mb-4 animate-float">✅</div>
                <h2 className="text-2xl font-bold text-white mb-2">Sent Successfully!</h2>
                <p className="text-white/50 mb-2">₨{amount} sent to {phone}</p>
                <p className="text-white/30 text-xs mb-6">Transaction ID: TXN{Math.random().toString(36).substring(2,10).toUpperCase()}</p>
                <button onClick={() => { setSent(false); setAmount(""); setPhone(""); }}
                  className="backdrop-blur-xl bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 transition-all">
                  Send Again
                </button>
              </div>
            )}
          </div>
        )}

        {tab === "history" && (
          <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden animate-fadeUp">
            {TRANSACTIONS.map((t, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-5 border-b border-white/5 hover:bg-white/5 transition-colors animate-fadeUp" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0">{t.icon}</div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{t.label}</p>
                  <p className="text-white/30 text-xs">{t.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold font-mono ${t.amount > 0 ? "text-green-400" : "text-white/70"}`}>
                    {t.amount > 0 ? "+" : ""}₨{Math.abs(t.amount).toLocaleString()}
                  </p>
                  <span className="text-[10px] text-green-400/70">✓ {t.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
