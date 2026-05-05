/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sacred Hindu color palette
        "saffron":      "#FF6B00",   // Bhagwa — most sacred Hindu color
        "saffron-deep": "#E85D00",   // Deep saffron
        "saffron-light":"#FF9A3C",   // Light saffron
        "sindoor":      "#C0392B",   // Sindoor red
        "sindoor-deep": "#922B21",   // Deep sindoor
        "kumkum":       "#DC143C",   // Kumkum crimson
        "haldi":        "#F4C430",   // Turmeric gold
        "haldi-deep":   "#D4A017",   // Deep turmeric
        "tulsi":        "#2D6A4F",   // Tulsi green
        "gangajal":     "#1A3A5C",   // Ganga blue-dark
        "akash":        "#0D1B2A",   // Deep sky/night
        "raat":         "#080C14",   // Night sky
        "chandan":      "#F5DEB3",   // Sandalwood cream
        "marigold":     "#FFA500",   // Marigold orange
        // Keep compat
        "nepali-red":   "#C41E3A",
        "nepali-blue":  "#003893",
        "nepali-gold":  "#F5A623",
        "aurora-1":     "#C0392B",
        "aurora-2":     "#922B21",
        "aurora-3":     "#8B4513",
        "aurora-4":     "#F4C430",
      },
      fontFamily: {
        devanagari: ["Noto Sans Devanagari", "sans-serif"],
        serif:      ["Noto Serif Devanagari", "Georgia", "serif"],
      },
      backgroundImage: {
        // Sacred Hindu backgrounds
        "aurora":       "linear-gradient(135deg, #080C14 0%, #0D1B2A 40%, #1A0A0A 100%)",
        "saffron-night":"linear-gradient(135deg, #0D0500 0%, #1A0800 50%, #0D1B2A 100%)",
        "mandala-bg":   "radial-gradient(ellipse at center, #1A0800 0%, #080C14 70%)",
        "glass":        "linear-gradient(135deg, rgba(255,107,0,0.06), rgba(255,255,255,0.02))",
        "gold-shine":   "linear-gradient(90deg, #F4C430, #FFD700, #F4C430)",
        "saffron-glow": "radial-gradient(circle, rgba(255,107,0,0.3) 0%, transparent 70%)",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%":   { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideLeft: {
          "0%":   { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        diyadance: {
          "0%, 100%": { transform: "translateY(0) rotate(-3deg)", filter: "brightness(1)" },
          "25%":      { transform: "translateY(-4px) rotate(3deg)", filter: "brightness(1.3)" },
          "75%":      { transform: "translateY(-2px) rotate(-2deg)", filter: "brightness(1.1)" },
        },
        orb: {
          "0%, 100%": { transform: "scale(1) translate(0,0)" },
          "33%":      { transform: "scale(1.1) translate(20px,-15px)" },
          "66%":      { transform: "scale(0.95) translate(-10px,10px)" },
        },
        mandala_spin: {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        mandala_spin_rev: {
          "0%":   { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        saffron_glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,107,0,0.4), 0 0 40px rgba(244,196,48,0.2)" },
          "50%":      { boxShadow: "0 0 40px rgba(255,107,0,0.8), 0 0 80px rgba(244,196,48,0.4)" },
        },
        pulse_ring: {
          "0%":   { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        countUp: {
          "0%":   { opacity: "0", transform: "translateY(10px) scale(0.8)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        spin_slow: {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        fadeUp:        "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        fadeIn:        "fadeIn 0.4s ease both",
        slideRight:    "slideRight 0.5s cubic-bezier(0.16,1,0.3,1) both",
        slideLeft:     "slideLeft 0.5s cubic-bezier(0.16,1,0.3,1) both",
        float:         "float 4s ease-in-out infinite",
        diyadance:     "diyadance 2s ease-in-out infinite",
        orb:           "orb 8s ease-in-out infinite",
        mandala:       "mandala_spin 30s linear infinite",
        mandala_rev:   "mandala_spin_rev 20s linear infinite",
        shimmer:       "shimmer 3s linear infinite",
        saffron_glow:  "saffron_glow 2s ease-in-out infinite",
        spin_slow:     "spin_slow 20s linear infinite",
        pulse_ring:    "pulse_ring 1.5s ease-out infinite",
        countUp:       "countUp 0.4s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};
