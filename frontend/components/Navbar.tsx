import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

// Hindu/Nepali culturally accurate icons
const NAV_GROUPS = [
  {
    label: "पात्रो",
    items: [
      { href: "/",           label: "नमो पात्रो", icon: "🪷", sub: "Calendar",  title: "Lotus — sacred to Lakshmi & Brahma" },
      { href: "/converter",  label: "Converter",  icon: "☸️", sub: "BS↔AD",    title: "Dharma Chakra — cycle of time" },
      { href: "/festivals",  label: "Festivals",  icon: "🪔", sub: "Events",    title: "Diya — festival of lights" },
      { href: "/panchang",   label: "Panchang",   icon: "🌙", sub: "Daily",     title: "Chandra — lunar calendar" },
    ],
  },
  {
    label: "जानकारी",
    items: [
      { href: "/news",       label: "News",       icon: "📿", sub: "Media",     title: "Mala — sacred beads, knowledge" },
      { href: "/finance",    label: "Finance",    icon: "🪙", sub: "Rates",     title: "Gold coin — Lakshmi's blessing" },
      { href: "/health",     label: "Health",     icon: "🌿", sub: "Tele",      title: "Tulsi — sacred healing herb" },
    ],
  },
  {
    label: "जीवनशैली",
    items: [
      { href: "/astrology",  label: "Jyotish",    icon: "🔯", sub: "Rashifal",  title: "Star of David / Shatkona — Vedic astrology" },
      { href: "/radio",      label: "Radio",      icon: "🎵", sub: "Stream",    title: "Bhajan & sacred music" },
      { href: "/entertainment",label:"Fun",        icon: "🎪", sub: "Games",     title: "Entertainment & celebration" },
    ],
  },
  {
    label: "सेवा",
    items: [
      { href: "/wallet",     label: "Namo Pay",   icon: "🪙", sub: "Wallet",    title: "Coin — Lakshmi's prosperity" },
      { href: "/meet",       label: "CharGhare",  icon: "🏠", sub: "Guff",      title: "Chargharey — home gathering" },
      { href: "/utilities",  label: "Utilities",  icon: "📜", sub: "Tools",     title: "Sacred scroll — knowledge tools" },
    ],
  },
];

// Sacred Om SVG logo
function OmLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <defs>
        <radialGradient id="omGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="60%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#C0392B" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="19" fill="url(#omGrad)" opacity="0.15" />
      <circle cx="20" cy="20" r="19" fill="none" stroke="url(#omGrad)" strokeWidth="1.5" />
      <text x="20" y="27" textAnchor="middle" fontSize="22" fontFamily="Noto Serif Devanagari, serif"
        fill="url(#omGrad)" fontWeight="700">ॐ</text>
    </svg>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b" style={{
      background: "linear-gradient(135deg, rgba(8,12,20,0.97), rgba(26,8,0,0.97))",
      borderColor: "rgba(255,107,0,0.25)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 2px 30px rgba(255,107,0,0.08)"
    }}>
      {/* Sacred top line */}
      <div className="h-0.5 w-full" style={{
        background: "linear-gradient(90deg, transparent, #FF6B00, #F4C430, #FF6B00, transparent)"
      }} />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative animate-saffron_glow">
              <OmLogo />
            </div>
            <div>
              <h1 className="text-lg font-bold font-devanagari leading-none text-gold-gradient">
                नमो पात्रो
              </h1>
              <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,107,0,0.5)" }}>
                Namo Patro
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_GROUPS.flatMap((g) => g.items).map((item) => {
              const active = router.pathname === item.href;
              return (
                <Link key={item.href} href={item.href} title={item.title}
                  className={`group relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex flex-col items-center gap-0.5
                    ${active
                      ? "text-white"
                      : "text-white/40 hover:text-white"}`}
                  style={active ? {
                    background: "linear-gradient(135deg, rgba(255,107,0,0.2), rgba(244,196,48,0.1))",
                    border: "1px solid rgba(255,107,0,0.3)",
                  } : {}}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.1), rgba(244,196,48,0.05))" }} />
                  <span className="text-lg leading-none relative z-10">{item.icon}</span>
                  <span className="text-[9px] leading-none relative z-10 font-devanagari">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Premium + hamburger */}
          <div className="flex items-center gap-3">
            <Link href="/pricing"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl hover:scale-105 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #FF6B00, #F4C430)",
                color: "#0D0500",
                boxShadow: "0 0 20px rgba(255,107,0,0.4)"
              }}>
              <span className="text-base">👑</span> Premium
            </Link>
            <button onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.2)", color: "rgba(255,107,0,0.8)" }}>
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-4 animate-fadeUp">
            {/* Sacred divider */}
            <div className="sacred-divider mb-3" />
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="mb-3">
                <p className="text-[10px] uppercase tracking-widest px-2 mb-1 font-devanagari"
                  style={{ color: "rgba(255,107,0,0.4)" }}>{group.label}</p>
                <div className="grid grid-cols-4 gap-1">
                  {group.items.map((item) => {
                    const active = router.pathname === item.href;
                    return (
                      <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                        className="flex flex-col items-center gap-1 p-2 rounded-xl text-center transition-all duration-200"
                        style={active ? {
                          background: "linear-gradient(135deg, rgba(255,107,0,0.2), rgba(244,196,48,0.1))",
                          border: "1px solid rgba(255,107,0,0.3)",
                          color: "white"
                        } : { color: "rgba(255,255,255,0.4)" }}>
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-[9px] font-devanagari">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sacred bottom line */}
      <div className="h-px w-full" style={{
        background: "linear-gradient(90deg, transparent, rgba(255,107,0,0.15), transparent)"
      }} />
    </nav>
  );
}
