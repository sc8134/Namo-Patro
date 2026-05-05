import { useState } from "react";
import Navbar from "../components/Navbar";

const DOCTORS = [
  { name: "Dr. Ramesh Sharma", specialty: "General Physician", exp: "15 years", fee: 500, rating: 4.8, available: true, icon: "👨‍⚕️" },
  { name: "Dr. Sita Rai", specialty: "Pediatrician", exp: "12 years", fee: 600, rating: 4.9, available: true, icon: "👩‍⚕️" },
  { name: "Dr. Anil Thapa", specialty: "Cardiologist", exp: "20 years", fee: 1000, rating: 4.7, available: false, icon: "🩺" },
  { name: "Dr. Maya Gurung", specialty: "Dermatologist", exp: "10 years", fee: 700, rating: 4.6, available: true, icon: "👩‍⚕️" },
  { name: "Dr. Bikash Shrestha", specialty: "Orthopedic", exp: "18 years", fee: 900, rating: 4.8, available: true, icon: "👨‍⚕️" },
  { name: "Dr. Sunita Karki", specialty: "Gynecologist", exp: "14 years", fee: 800, rating: 4.9, available: false, icon: "👩‍⚕️" },
];

const SERVICES = [
  { icon: "💊", label: "Pharmacy", desc: "Order medicines online" },
  { icon: "🧪", label: "Lab Tests", desc: "Book diagnostic tests" },
  { icon: "🏥", label: "Hospital", desc: "Find nearby hospitals" },
  { icon: "🚑", label: "Emergency", desc: "24/7 ambulance service" },
];

export default function Health() {
  const [selected, setSelected] = useState<typeof DOCTORS[0] | null>(null);
  const [booked, setBooked] = useState(false);

  return (
    <div className="min-h-screen bg-aurora relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-red-600 rounded-full opacity-10 blur-3xl animate-orb" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600 rounded-full opacity-10 blur-3xl animate-orb" style={{ animationDelay: "2s" }} />
      </div>
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-6xl relative z-10">
        <div className="mb-8 animate-fadeUp">
          <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-2">Telehealth</p>
          <h1 className="text-5xl font-bold text-white mb-2">Namo Patro Health</h1>
          <p className="text-white/40">Online consultations · Pharmacy · Lab tests</p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fadeUp">
          {SERVICES.map((s, i) => (
            <button key={s.label} className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-6 text-center hover:border-white/25 transition-all duration-300 hover:-translate-y-1 animate-fadeUp" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="text-4xl mb-3">{s.icon}</div>
              <p className="text-white font-semibold text-sm mb-1">{s.label}</p>
              <p className="text-white/30 text-xs">{s.desc}</p>
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-4 animate-fadeUp">Available Doctors</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeUp">
          {DOCTORS.map((d, i) => (
            <div key={d.name} className={`backdrop-blur-2xl rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fadeUp
              ${d.available ? "bg-white/5 border-white/10 hover:border-white/25" : "bg-white/5 border-white/5 opacity-50"}`}
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => d.available && setSelected(d)}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/30 to-pink-500/30 border border-white/10 flex items-center justify-center text-3xl flex-shrink-0">{d.icon}</div>
                <div className="flex-1">
                  <h3 className="text-white font-bold mb-1">{d.name}</h3>
                  <p className="text-white/40 text-xs mb-1">{d.specialty}</p>
                  <div className="flex items-center gap-1 text-xs text-yellow-400">
                    <span>⭐</span>
                    <span>{d.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">{d.exp} exp</span>
                <span className="text-white font-bold">₨{d.fee}</span>
              </div>
              <div className={`mt-3 text-center py-2 rounded-xl text-xs font-semibold ${d.available ? "bg-green-500/20 text-green-400" : "bg-white/5 text-white/30"}`}>
                {d.available ? "🟢 Available Now" : "⚫ Offline"}
              </div>
            </div>
          ))}
        </div>

        {/* Booking modal */}
        {selected && !booked && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setSelected(null)}>
            <div className="backdrop-blur-2xl bg-white/10 rounded-3xl border border-white/20 p-8 max-w-md w-full animate-fadeUp" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-bold text-white mb-4">Book Consultation</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">{selected.icon}</div>
                <div>
                  <p className="text-white font-bold">{selected.name}</p>
                  <p className="text-white/40 text-sm">{selected.specialty}</p>
                  <p className="text-yellow-400 text-sm">⭐ {selected.rating}</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-xs text-white/40 mb-1">Consultation Fee</p>
                  <p className="text-2xl font-bold text-white">₨{selected.fee}</p>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-xs text-white/40 mb-1">Available Slots</p>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {["10:00 AM","11:30 AM","2:00 PM","4:30 PM"].map((t) => (
                      <button key={t} className="text-xs bg-white/10 border border-white/10 text-white px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors">{t}</button>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => setBooked(true)} className="w-full relative overflow-hidden rounded-2xl py-4 font-bold text-white group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500" />
                <span className="relative text-lg">📅 Confirm Booking</span>
              </button>
            </div>
          </div>
        )}

        {booked && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => { setBooked(false); setSelected(null); }}>
            <div className="backdrop-blur-2xl bg-gradient-to-br from-green-500/20 to-teal-900/20 rounded-3xl border border-green-500/30 p-10 max-w-md text-center animate-fadeUp" onClick={(e) => e.stopPropagation()}>
              <div className="text-7xl mb-4 animate-float">✅</div>
              <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
              <p className="text-white/50 mb-6">Your consultation with {selected?.name} is scheduled</p>
              <button onClick={() => { setBooked(false); setSelected(null); }} className="backdrop-blur-xl bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 transition-all">
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
