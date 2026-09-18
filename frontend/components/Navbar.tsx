import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  LotusIcon,
  DharmaChakraIcon,
  FestivalIcon,
  ChandraMoonIcon,
  MalaIcon,
  SuryaCoinIcon,
  TulsiIcon,
  ShatkhonaIcon,
  ScrollIcon,
  HomeGharIcon,
  PremiumCrownIcon,
  HamburgerIcon,
} from "./icons";
import { IconRadio, IconSparkles } from "./icons";

// Each nav item now carries a React icon component instead of an emoji
const NAV_GROUPS = [
  {
    label: "पात्रो",
    items: [
      { href: "/",            label: "नमो पात्रो", Icon: LotusIcon,        sub: "Calendar",  title: "Lotus — sacred to Lakshmi & Brahma" },
      { href: "/converter",   label: "Converter",  Icon: DharmaChakraIcon, sub: "BS↔AD",    title: "Dharma Chakra — cycle of time" },
      { href: "/festivals",   label: "Festivals",  Icon: FestivalIcon,     sub: "Events",    title: "Diya — festival of lights" },
      { href: "/panchang",    label: "Panchang",   Icon: ChandraMoonIcon,  sub: "Daily",     title: "Chandra — lunar calendar" },
    ],
  },
  {
    label: "जानकारी",
    items: [
      { href: "/news",        label: "News",       Icon: MalaIcon,         sub: "Media",     title: "Mala — sacred beads, knowledge" },
      { href: "/finance",     label: "Finance",    Icon: SuryaCoinIcon,    sub: "Rates",     title: "Gold coin — Lakshmi's blessing" },
      { href: "/health",      label: "Health",     Icon: TulsiIcon,        sub: "Tele",      title: "Tulsi — sacred healing herb" },
    ],
  },
  {
    label: "जीवनशैली",
    items: [
      { href: "/astrology",     label: "Jyotish",  Icon: ShatkhonaIcon,    sub: "Rashifal",  title: "Shatkona — Vedic astrology" },
      { href: "/radio",         label: "Radio",    Icon: IconRadio,        sub: "Stream",    title: "Bhajan & sacred music" },
      { href: "/entertainment", label: "Fun",      Icon: IconSparkles,     sub: "Games",     title: "Entertainment & celebration" },
    ],
  },
  {
    label: "सेवा",
    items: [
      { href: "/wallet",      label: "Namo Pay",   Icon: SuryaCoinIcon,    sub: "Wallet",    title: "Coin — Lakshmi's prosperity" },
      { href: "/meet",        label: "CharGhare",  Icon: HomeGharIcon,     sub: "Guff",      title: "Chargharey — home gathering" },
      { href: "/utilities",   label: "Utilities",  Icon: ScrollIcon,       sub: "Tools",     title: "Sacred scroll — knowledge tools" },
    ],
  },
];

// Sacred Om SVG logo — unchanged, already custom SVG
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
      <text x="20" y="27" textAnchor="middle" fontSize="22"
        fontFamily="Noto Serif Devanagari, serif"
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
      boxShadow: "0 2px 30px rgba(255,107,0,0.08)",
    }}>
      {/* Sacred top line */}
      <div className="h-0.5 w-full" style={{
        background: "linear-gradient(90deg, transparent, #FF6B00, #F4C430, #FF6B00, transparent)",
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
                  className={`group relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300
                    flex flex-col items-center gap-0.5
                    ${active ? "text-white" : "text-white/40 hover:text-white"}`}
                  style={active ? {
                    background: "linear-gradient(135deg, rgba(255,107,0,0.2), rgba(244,196,48,0.1))",
                    border: "1px solid rgba(255,107,0,0.3)",
                  } : {}}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.1), rgba(244,196,48,0.05))" }} />
                  {/* Icon */}
                  <span className="relative z-10 flex items-center justify-center w-[22px] h-[22px]">
                    <item.Icon
                      size={20}
                      color={active ? "#F4C430" : "rgba(255,107,0,0.7)"}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </span>
                  <span className="text-[9px] leading-none relative z-10 font-devanagari">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Premium + hamburger */}
          <div className="flex items-center gap-3">
            <Link href="/pricing"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl
                hover:scale-105 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #FF6B00, #F4C430)",
                color: "#0D0500",
                boxShadow: "0 0 20px rgba(255,107,0,0.4)",
              }}>
              <PremiumCrownIcon size={16} color="#0D0500" />
              Premium
            </Link>

            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              style={{
                background: "rgba(255,107,0,0.1)",
                border: "1px solid rgba(255,107,0,0.2)",
              }}>
              <HamburgerIcon size={20} open={open} color="rgba(255,107,0,0.8)" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-4 animate-fadeUp">
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
                        className="flex flex-col items-center gap-1.5 p-2 rounded-xl text-center
                          transition-all duration-200"
                        style={active ? {
                          background: "linear-gradient(135deg, rgba(255,107,0,0.2), rgba(244,196,48,0.1))",
                          border: "1px solid rgba(255,107,0,0.3)",
                          color: "white",
                        } : { color: "rgba(255,255,255,0.4)" }}>
                        <item.Icon
                          size={22}
                          color={active ? "#F4C430" : "rgba(255,107,0,0.6)"}
                        />
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
        background: "linear-gradient(90deg, transparent, rgba(255,107,0,0.15), transparent)",
      }} />
    </nav>
  );
}
