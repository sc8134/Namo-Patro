// Custom SVG icons for each Panchang element — Hindu sacred iconography

const G = "#F4C430";   // gold
const S = "#FF6B00";   // saffron
const W = "#FFFFFF";   // white
const R = "#C0392B";   // sindoor red

// ── TITHI — Crescent moon with stars, sacred lunar day ──────────────────────
export function TithiIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F4C430" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="moonFace" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FF8C00" />
        </radialGradient>
      </defs>
      {/* Outer glow */}
      <circle cx="28" cy="28" r="26" fill="url(#moonGlow)" />
      {/* Crescent moon */}
      <path d="M28 8 C18 8 10 17 10 28 C10 39 18 48 28 48 C22 44 18 37 18 28 C18 19 22 12 28 8Z"
        fill="url(#moonFace)" opacity="0.9" />
      <path d="M28 8 C34 10 38 18 38 28 C38 38 34 46 28 48 C36 46 44 38 44 28 C44 18 36 10 28 8Z"
        fill="#0D1B2A" />
      {/* Stars */}
      <circle cx="40" cy="14" r="2" fill={G} opacity="0.9" />
      <circle cx="46" cy="22" r="1.5" fill={G} opacity="0.7" />
      <circle cx="44" cy="34" r="1" fill={G} opacity="0.6" />
      <circle cx="14" cy="18" r="1.5" fill={G} opacity="0.5" />
      <circle cx="10" cy="36" r="1" fill={G} opacity="0.4" />
      {/* Tilak dot */}
      <circle cx="22" cy="26" r="1.5" fill={G} opacity="0.8" />
    </svg>
  );
}

// ── VARA — Radiant sun with 8 rays, solar day ────────────────────────────────
export function VaraIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FF4500" />
        </radialGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Outer glow */}
      <circle cx="28" cy="28" r="26" fill="url(#sunGlow)" />
      {/* 8 rays */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 28 + 14 * Math.cos(rad);
        const y1 = 28 + 14 * Math.sin(rad);
        const x2 = 28 + 24 * Math.cos(rad);
        const y2 = 28 + 24 * Math.sin(rad);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={G} strokeWidth={i % 2 === 0 ? "2.5" : "1.5"} strokeLinecap="round" opacity="0.9" />
        );
      })}
      {/* Sun circle */}
      <circle cx="28" cy="28" r="12" fill="url(#sunCore)" />
      <circle cx="28" cy="28" r="12" fill="none" stroke={G} strokeWidth="1" opacity="0.6" />
      {/* Inner detail */}
      <circle cx="28" cy="28" r="6" fill="#FFD700" opacity="0.5" />
      <circle cx="25" cy="25" r="2" fill="white" opacity="0.3" />
    </svg>
  );
}

// ── NAKSHATRA — 27-star constellation with Hasta (hand) ─────────────────────
export function NakshatraIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9B59B6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2C3E50" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="28" cy="28" r="26" fill="url(#starGlow)" />
      {/* Constellation lines */}
      <line x1="28" y1="10" x2="38" y2="20" stroke={G} strokeWidth="0.8" opacity="0.4" />
      <line x1="38" y1="20" x2="46" y2="28" stroke={G} strokeWidth="0.8" opacity="0.4" />
      <line x1="28" y1="10" x2="18" y2="20" stroke={G} strokeWidth="0.8" opacity="0.4" />
      <line x1="18" y1="20" x2="10" y2="28" stroke={G} strokeWidth="0.8" opacity="0.4" />
      <line x1="28" y1="10" x2="28" y2="28" stroke={G} strokeWidth="0.8" opacity="0.3" />
      {/* 5-pointed star (Hasta = hand, 5 fingers) */}
      <polygon
        points="28,8 31,20 44,20 34,28 37,40 28,32 19,40 22,28 12,20 25,20"
        fill="none" stroke={G} strokeWidth="1.5" opacity="0.8" />
      <polygon
        points="28,12 30.5,20 38,20 32,25 34.5,33 28,28 21.5,33 24,25 18,20 25.5,20"
        fill={G} opacity="0.15" />
      {/* Center star */}
      <circle cx="28" cy="28" r="3" fill={G} opacity="0.9" />
      {/* Surrounding stars */}
      {[[38,20],[18,20],[46,28],[10,28],[28,10],[38,38],[18,38]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill={G} opacity={0.4 + i*0.08} />
      ))}
      {/* Twinkle dots */}
      <circle cx="42" cy="14" r="1" fill="white" opacity="0.6" />
      <circle cx="14" cy="14" r="1" fill="white" opacity="0.5" />
      <circle cx="44" cy="42" r="1" fill="white" opacity="0.4" />
    </svg>
  );
}

// ── YOGA — Shatkona (Star of David / Shiva-Shakti) ───────────────────────────
export function YogaIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="yogaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#C0392B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="triUp" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F4C430" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="triDown" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C0392B" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <circle cx="28" cy="28" r="26" fill="url(#yogaGlow)" />
      {/* Outer circle */}
      <circle cx="28" cy="28" r="22" fill="none" stroke={S} strokeWidth="0.8" opacity="0.3" />
      {/* Upward triangle (Shiva / masculine) */}
      <polygon points="28,8 46,38 10,38" fill="url(#triUp)" stroke={G} strokeWidth="1.5" />
      {/* Downward triangle (Shakti / feminine) */}
      <polygon points="28,48 10,18 46,18" fill="url(#triDown)" stroke={S} strokeWidth="1.5" />
      {/* Center bindu */}
      <circle cx="28" cy="28" r="4" fill={G} opacity="0.9" />
      <circle cx="28" cy="28" r="2" fill="white" opacity="0.6" />
      {/* 6 outer dots at triangle points */}
      {[[28,8],[46,38],[10,38],[28,48],[10,18],[46,18]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={G} opacity="0.8" />
      ))}
    </svg>
  );
}

// ── KARANA — Half-moon with sacred flame (half lunar day) ────────────────────
export function KaranaIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="karanaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F4C430" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FF4500" />
          <stop offset="40%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>
      <circle cx="28" cy="28" r="26" fill="url(#karanaGlow)" />
      {/* Half circle (half lunar day) */}
      <path d="M28 10 A18 18 0 0 1 28 46 Z" fill={G} opacity="0.15" />
      <path d="M28 10 A18 18 0 0 1 28 46" stroke={G} strokeWidth="2" fill="none" />
      <line x1="28" y1="10" x2="28" y2="46" stroke={G} strokeWidth="1.5" opacity="0.6" />
      {/* Sacred flame (Agni) */}
      <path d="M28 44 C24 38 20 34 22 28 C24 22 28 20 28 16 C28 20 32 22 34 28 C36 34 32 38 28 44Z"
        fill="url(#flameGrad)" opacity="0.9" />
      <path d="M28 40 C26 36 24 33 25 29 C26 25 28 23 28 20 C28 23 30 25 31 29 C32 33 30 36 28 40Z"
        fill="#FFD700" opacity="0.6" />
      <path d="M28 36 C27 33 26 31 27 29 C27.5 27 28 26 28 24 C28 26 28.5 27 29 29 C30 31 29 33 28 36Z"
        fill="white" opacity="0.4" />
      {/* Dots */}
      <circle cx="18" cy="28" r="2" fill={G} opacity="0.5" />
      <circle cx="14" cy="20" r="1.5" fill={G} opacity="0.4" />
      <circle cx="14" cy="36" r="1.5" fill={G} opacity="0.4" />
    </svg>
  );
}

// ── SUNRISE — for Sunrise time ───────────────────────────────────────────────
export function SunriseIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="srGlow" cx="50%" cy="70%" r="60%">
          <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="28" cy="56" r="26" fill="url(#srGlow)" />
      {/* Horizon line */}
      <line x1="6" y1="36" x2="50" y2="36" stroke={G} strokeWidth="1.5" opacity="0.6" />
      {/* Sun half */}
      <path d="M16 36 A12 12 0 0 1 40 36Z" fill={S} opacity="0.9" />
      <path d="M16 36 A12 12 0 0 1 40 36" stroke={G} strokeWidth="1.5" fill="none" />
      {/* Rays above horizon */}
      {[-60,-30,0,30,60].map((a,i) => {
        const rad = ((a - 90) * Math.PI) / 180;
        return <line key={i} x1={28 + 13*Math.cos(rad)} y1={36 + 13*Math.sin(rad)}
          x2={28 + 22*Math.cos(rad)} y2={36 + 22*Math.sin(rad)}
          stroke={G} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />;
      })}
    </svg>
  );
}

// Map of panchang keys to their icons
export const PANCHANG_ICON_MAP: Record<string, (props: { size?: number }) => JSX.Element> = {
  tithi:     TithiIcon,
  vara:      VaraIcon,
  nakshatra: NakshatraIcon,
  yoga:      YogaIcon,
  karana:    KaranaIcon,
  sunrise:   SunriseIcon,
  sunset:    SunriseIcon,
};
