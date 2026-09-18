import { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import {
  PremiumCrownIcon, IconCheck, IconX, LotusIcon,
  ShatkhonaIcon, IconSparkles, IconGem,
} from "../components/icons";

// Plan icon components
const PLAN_ICONS = {
  Free:         LotusIcon,
  Basic:        ShatkhonaIcon,
  Premium:      IconGem,
  "Premium Plus": PremiumCrownIcon,
};

const PLANS = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    color: "from-gray-500/20 to-gray-900/10 border-gray-500/20",
    glow: "",
    features: [
      "Nepali Calendar & Panchang",
      "Festival listings",
      "Basic date converter",
      "News portal links",
      "Basic Rashifal",
    ],
    missing: ["Ad-free experience","Premium Rashifal","Kundali creation","HD Radio streaming","Priority health booking"],
    cta: "Current Plan",
    ctaStyle: "bg-white/10 border border-white/20 text-white/60",
  },
  {
    name: "Basic",
    price: 10,
    original: 199,
    period: "month",
    color: "from-blue-500/20 to-blue-900/10 border-blue-500/30",
    glow: "shadow-[0_0_40px_rgba(59,130,246,0.3)]",
    badge: "Hot Deal",
    badgeColor: "bg-blue-500 text-white",
    features: [
      "Everything in Free",
      "Ad-free experience",
      "Full Rashifal access",
      "Radio streaming",
      "Finance rates",
      "E-cards",
    ],
    missing: ["Kundali creation","Video consultations","Priority support"],
    cta: "Get Basic",
    ctaStyle: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
  },
  {
    name: "Premium",
    price: 299,
    period: "month",
    yearlyPrice: 3000,
    color: "from-aurora-1/20 to-red-900/10 border-aurora-1/30",
    glow: "shadow-[0_0_50px_rgba(196,30,58,0.4)]",
    badge: "Popular",
    badgeColor: "bg-aurora-1 text-white",
    features: [
      "Everything in Basic",
      "Kundali creation",
      "Compatibility checker",
      "Telehealth consultations",
      "CharGhare Guff HD",
      "Namo Pay wallet",
      "Priority support",
    ],
    missing: ["Astrologer consultations"],
    cta: "Get Premium",
    ctaStyle: "bg-gradient-to-r from-nepali-red to-aurora-1 text-white",
  },
  {
    name: "Premium Plus",
    price: 599,
    period: "month",
    yearlyPrice: 6000,
    color: "from-aurora-4/20 to-yellow-900/10 border-aurora-4/30",
    glow: "shadow-[0_0_60px_rgba(245,166,35,0.4)]",
    badge: "Best",
    badgeColor: "bg-aurora-4 text-gray-900",
    features: [
      "Everything in Premium",
      "Live astrologer consultations",
      "Personalized Kundali",
      "Unlimited video calls",
      "Exclusive content",
      "Family plan (5 users)",
      "24/7 VIP support",
    ],
    missing: [],
    cta: "Get Premium Plus",
    ctaStyle: "bg-gradient-to-r from-aurora-4 to-yellow-500 text-gray-900",
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-aurora relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-aurora-4 rounded-full opacity-10 blur-3xl animate-orb" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-aurora-1 rounded-full opacity-10 blur-3xl animate-orb" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-spin_slow" />
      </div>

      <Navbar />

      <div className="container mx-auto px-4 py-10 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeUp">
          <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-3">Subscription</p>
          <h1 className="text-5xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-white/40 mb-8">Unlock the full power of Namo Patro</p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-2">
            <button onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${!yearly ? "bg-white text-gray-900" : "text-white/50"}`}>
              Monthly
            </button>
            <button onClick={() => setYearly(true)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${yearly ? "bg-white text-gray-900" : "text-white/50"}`}>
              Yearly
              <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {PLANS.map((plan, i) => {
            const PlanIcon = PLAN_ICONS[plan.name as keyof typeof PLAN_ICONS];
            return (
              <div key={plan.name}
                className={`relative backdrop-blur-2xl bg-gradient-to-br ${plan.color} rounded-3xl border p-6 transition-all duration-500 hover:-translate-y-2 animate-fadeUp ${plan.glow}`}
                style={{ animationDelay: `${i * 100}ms` }}>

                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg ${plan.badgeColor}`}>
                    {plan.badge}
                  </div>
                )}

                {/* Plan icon */}
                <div className="mb-4 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                  <PlanIcon size={40} color={i === 3 ? "#F4C430" : i === 2 ? "#C0392B" : i === 1 ? "#60a5fa" : "#FF6B00"} />
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>

                {/* Price */}
                <div className="mb-6">
                  {plan.price === 0 ? (
                    <p className="text-4xl font-bold text-white">Free</p>
                  ) : (
                    <div>
                      {(plan as any).original && !yearly && (
                        <p className="text-white/30 text-sm line-through">₨{(plan as any).original}/mo</p>
                      )}
                      <p className="text-4xl font-bold text-white">
                        ₨{yearly && (plan as any).yearlyPrice
                          ? Math.round((plan as any).yearlyPrice / 12)
                          : plan.price}
                        <span className="text-sm text-white/40 font-normal">/mo</span>
                      </p>
                      {yearly && (plan as any).yearlyPrice && (
                        <p className="text-xs text-green-400 mt-1">₨{(plan as any).yearlyPrice}/year</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm">
                      <IconCheck size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/70">{f}</span>
                    </div>
                  ))}
                  {plan.missing.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm">
                      <IconX size={14} className="text-white/20 mt-0.5 flex-shrink-0" />
                      <span className="text-white/20">{f}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-3 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 ${plan.ctaStyle}`}>
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-white/20 text-xs mt-10 animate-fadeUp" style={{ animationDelay: "500ms" }}>
          All prices in Nepali Rupees (NPR) · Cancel anytime · Secure payment via Namo Pay
        </p>
      </div>
    </div>
  );
}
