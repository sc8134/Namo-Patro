
// Gold & Navy Blue illustrated zodiac SVG icons matching the Namo Patro style

const G = "#F5A623"; // gold
const N = "#003893"; // navy blue
const D = "#001a5e"; // dark navy
const L = "#FFD700"; // light gold highlight

const ICONS: Record<string, JSX.Element> = {
  // MESH (Aries) — Ram head
  Mesh: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill={D} stroke={G} strokeWidth="2"/>
      {/* Ram horns */}
      <path d="M20 38 Q10 20 22 18 Q30 16 28 30" stroke={G} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M60 38 Q70 20 58 18 Q50 16 52 30" stroke={G} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Ram face */}
      <ellipse cx="40" cy="44" rx="14" ry="16" fill={N} stroke={G} strokeWidth="1.5"/>
      {/* Eyes */}
      <circle cx="35" cy="40" r="2.5" fill={G}/>
      <circle cx="45" cy="40" r="2.5" fill={G}/>
      <circle cx="35.8" cy="39.2" r="0.8" fill={D}/>
      <circle cx="45.8" cy="39.2" r="0.8" fill={D}/>
      {/* Nose */}
      <ellipse cx="40" cy="47" rx="4" ry="3" fill={D} stroke={G} strokeWidth="1"/>
      <circle cx="38" cy="47" r="1" fill={G} opacity="0.6"/>
      <circle cx="42" cy="47" r="1" fill={G} opacity="0.6"/>
      {/* Forehead tuft */}
      <path d="M36 30 Q40 24 44 30" stroke={G} strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Chin */}
      <path d="M34 56 Q40 60 46 56" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),

  // BRISH (Taurus) — Bull head
  Brish: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill={D} stroke={G} strokeWidth="2"/>
      {/* Horns */}
      <path d="M26 32 Q16 14 24 12 Q32 10 30 26" fill={N} stroke={G} strokeWidth="2"/>
      <path d="M54 32 Q64 14 56 12 Q48 10 50 26" fill={N} stroke={G} strokeWidth="2"/>
      {/* Bull face */}
      <ellipse cx="40" cy="46" rx="16" ry="17" fill={N} stroke={G} strokeWidth="1.5"/>
      {/* Eyes */}
      <circle cx="34" cy="41" r="3" fill={G}/>
      <circle cx="46" cy="41" r="3" fill={G}/>
      <circle cx="34.8" cy="40.2" r="1" fill={D}/>
      <circle cx="46.8" cy="40.2" r="1" fill={D}/>
      {/* Snout */}
      <ellipse cx="40" cy="52" rx="7" ry="5" fill={D} stroke={G} strokeWidth="1.5"/>
      <circle cx="37" cy="52" r="1.5" fill={G} opacity="0.5"/>
      <circle cx="43" cy="52" r="1.5" fill={G} opacity="0.5"/>
      {/* Ears */}
      <ellipse cx="24" cy="38" rx="4" ry="5" fill={N} stroke={G} strokeWidth="1.5" transform="rotate(-15 24 38)"/>
      <ellipse cx="56" cy="38" rx="4" ry="5" fill={N} stroke={G} strokeWidth="1.5" transform="rotate(15 56 38)"/>
    </svg>
  ),

  // MITHUN (Gemini) — Two faces
  Mithun: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill={D} stroke={G} strokeWidth="2"/>
      {/* Left face */}
      <ellipse cx="30" cy="42" rx="11" ry="14" fill={N} stroke={G} strokeWidth="1.5"/>
      <circle cx="27" cy="39" r="2" fill={G}/>
      <circle cx="27.6" cy="38.4" r="0.7" fill={D}/>
      <path d="M26 46 Q30 49 34 46" stroke={G} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* Left hair */}
      <path d="M20 36 Q22 24 30 26 Q38 28 36 34" fill={N} stroke={G} strokeWidth="1.5"/>
      <path d="M20 36 Q18 30 22 26" stroke={G} strokeWidth="1.5" fill="none"/>
      {/* Right face */}
      <ellipse cx="50" cy="42" rx="11" ry="14" fill={N} stroke={G} strokeWidth="1.5"/>
      <circle cx="53" cy="39" r="2" fill={G}/>
      <circle cx="53.6" cy="38.4" r="0.7" fill={D}/>
      <path d="M46 46 Q50 49 54 46" stroke={G} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* Right hair */}
      <path d="M60 36 Q58 24 50 26 Q42 28 44 34" fill={N} stroke={G} strokeWidth="1.5"/>
      <path d="M60 36 Q62 30 58 26" stroke={G} strokeWidth="1.5" fill="none"/>
      {/* Flowers */}
      <circle cx="28" cy="28" r="3" fill={G} opacity="0.8"/>
      <circle cx="52" cy="28" r="3" fill={G} opacity="0.8"/>
    </svg>
  ),

  // KARKAT (Cancer) — Crab
  Karkat: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill={D} stroke={G} strokeWidth="2"/>
      {/* Crab body */}
      <ellipse cx="40" cy="44" rx="16" ry="12" fill={N} stroke={G} strokeWidth="2"/>
      {/* Shell pattern */}
      <path d="M28 44 Q40 36 52 44" stroke={G} strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M30 48 Q40 42 50 48" stroke={G} strokeWidth="1" fill="none" opacity="0.6"/>
      {/* Claws */}
      <path d="M24 40 Q14 32 12 38 Q10 44 18 44" fill={N} stroke={G} strokeWidth="1.8"/>
      <path d="M56 40 Q66 32 68 38 Q70 44 62 44" fill={N} stroke={G} strokeWidth="1.8"/>
      {/* Claw pincers left */}
      <path d="M12 38 Q8 34 10 30" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M12 38 Q8 42 10 46" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Claw pincers right */}
      <path d="M68 38 Q72 34 70 30" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M68 38 Q72 42 70 46" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Legs */}
      <path d="M30 52 Q26 60 22 58" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M36 54 Q34 62 30 62" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M44 54 Q46 62 50 62" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M50 52 Q54 60 58 58" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Eyes */}
      <circle cx="35" cy="40" r="2.5" fill={G}/>
      <circle cx="45" cy="40" r="2.5" fill={G}/>
      <circle cx="35.7" cy="39.3" r="0.8" fill={D}/>
      <circle cx="45.7" cy="39.3" r="0.8" fill={D}/>
    </svg>
  ),

  // SINGHA (Leo) — Lion
  Singha: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill={D} stroke={G} strokeWidth="2"/>
      {/* Mane */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => (
        <ellipse key={i} cx={40 + 20*Math.cos(a*Math.PI/180)} cy={40 + 20*Math.sin(a*Math.PI/180)}
          rx="6" ry="9" fill={G} opacity="0.7"
          transform={`rotate(${a} ${40 + 20*Math.cos(a*Math.PI/180)} ${40 + 20*Math.sin(a*Math.PI/180)})`}/>
      ))}
      {/* Face */}
      <circle cx="40" cy="42" r="16" fill={N} stroke={G} strokeWidth="2"/>
      {/* Eyes */}
      <circle cx="34" cy="39" r="3.5" fill={G}/>
      <circle cx="46" cy="39" r="3.5" fill={G}/>
      <circle cx="34.8" cy="38.2" r="1.2" fill={D}/>
      <circle cx="46.8" cy="38.2" r="1.2" fill={D}/>
      {/* Nose */}
      <path d="M37 45 L40 43 L43 45" stroke={G} strokeWidth="1.5" fill="none"/>
      <ellipse cx="40" cy="46" rx="3" ry="2" fill={D} stroke={G} strokeWidth="1"/>
      {/* Mouth */}
      <path d="M36 50 Q40 54 44 50" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Ears */}
      <path d="M26 28 L30 36 L34 28 Z" fill={G} opacity="0.8"/>
      <path d="M46 28 L50 36 L54 28 Z" fill={G} opacity="0.8"/>
    </svg>
  ),

  // KANYA (Virgo) — Woman with flowers
  Kanya: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill={D} stroke={G} strokeWidth="2"/>
      {/* Hair */}
      <path d="M24 38 Q22 20 40 18 Q58 20 56 38 Q54 28 40 26 Q26 28 24 38Z" fill={G} opacity="0.8"/>
      {/* Flowing hair */}
      <path d="M24 38 Q20 50 22 62" stroke={G} strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M56 38 Q60 50 58 62" stroke={G} strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Face */}
      <ellipse cx="40" cy="44" rx="14" ry="17" fill={N} stroke={G} strokeWidth="1.5"/>
      {/* Eyes */}
      <path d="M33 40 Q35 37 37 40" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M43 40 Q45 37 47 40" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="35" cy="40" r="1.5" fill={G}/>
      <circle cx="45" cy="40" r="1.5" fill={G}/>
      {/* Nose */}
      <path d="M39 44 Q40 46 41 44" stroke={G} strokeWidth="1" fill="none"/>
      {/* Lips */}
      <path d="M36 50 Q40 53 44 50" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Flowers in hair */}
      <circle cx="28" cy="26" r="4" fill={G} opacity="0.9"/>
      <circle cx="28" cy="26" r="2" fill={D}/>
      <circle cx="52" cy="26" r="4" fill={G} opacity="0.9"/>
      <circle cx="52" cy="26" r="2" fill={D}/>
    </svg>
  ),

  // TULA (Libra) — Scales
  Tula: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill={D} stroke={G} strokeWidth="2"/>
      {/* Center pole */}
      <line x1="40" y1="20" x2="40" y2="62" stroke={G} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Base */}
      <path d="M30 62 Q40 58 50 62" stroke={G} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <line x1="34" y1="62" x2="46" y2="62" stroke={G} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Beam */}
      <line x1="16" y1="32" x2="64" y2="32" stroke={G} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Top ornament */}
      <circle cx="40" cy="22" r="3" fill={G}/>
      {/* Left pan chains */}
      <line x1="20" y1="32" x2="18" y2="44" stroke={G} strokeWidth="1.5"/>
      <line x1="20" y1="32" x2="26" y2="44" stroke={G} strokeWidth="1.5"/>
      {/* Left pan */}
      <path d="M14 44 Q22 50 28 44" fill={N} stroke={G} strokeWidth="2"/>
      {/* Right pan chains */}
      <line x1="60" y1="32" x2="54" y2="44" stroke={G} strokeWidth="1.5"/>
      <line x1="60" y1="32" x2="62" y2="44" stroke={G} strokeWidth="1.5"/>
      {/* Right pan */}
      <path d="M52 44 Q60 50 66 44" fill={N} stroke={G} strokeWidth="2"/>
      {/* Beam center pivot */}
      <circle cx="40" cy="32" r="3" fill={G}/>
    </svg>
  ),

  // BRISCHIK (Scorpio) — Scorpion
  Brischik: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill={D} stroke={G} strokeWidth="2"/>
      {/* Body segments */}
      <ellipse cx="40" cy="36" rx="10" ry="8" fill={N} stroke={G} strokeWidth="1.8"/>
      <ellipse cx="40" cy="46" rx="8" ry="6" fill={N} stroke={G} strokeWidth="1.5"/>
      <ellipse cx="40" cy="54" rx="6" ry="5" fill={N} stroke={G} strokeWidth="1.5"/>
      {/* Tail curl */}
      <path d="M40 58 Q50 62 56 56 Q62 50 58 44 Q56 40 60 36" stroke={G} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Stinger */}
      <path d="M60 36 L64 30" stroke={G} strokeWidth="2" strokeLinecap="round"/>
      <path d="M60 36 L66 36" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Claws */}
      <path d="M32 32 Q22 24 16 28 Q12 32 18 36" fill={N} stroke={G} strokeWidth="1.8"/>
      <path d="M18 36 Q14 38 16 42" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M18 36 Q14 34 14 30" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M48 32 Q58 24 64 28 Q68 32 62 36" fill={N} stroke={G} strokeWidth="1.8"/>
      <path d="M62 36 Q66 38 64 42" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M62 36 Q66 34 66 30" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Eyes */}
      <circle cx="36" cy="34" r="2" fill={G}/>
      <circle cx="44" cy="34" r="2" fill={G}/>
      {/* Legs */}
      <path d="M32 40 Q24 38 20 42" stroke={G} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M32 44 Q24 44 20 48" stroke={G} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M48 40 Q56 38 60 42" stroke={G} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M48 44 Q56 44 60 48" stroke={G} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  ),

  // DHANU (Sagittarius) — Bow and arrow
  Dhanu: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill={D} stroke={G} strokeWidth="2"/>
      {/* Bow */}
      <path d="M20 18 Q10 40 20 62" stroke={G} strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Bowstring */}
      <line x1="20" y1="18" x2="20" y2="62" stroke={G} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7"/>
      {/* Arrow shaft */}
      <line x1="22" y1="40" x2="66" y2="40" stroke={G} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Arrowhead */}
      <path d="M62 34 L70 40 L62 46 L64 40 Z" fill={G}/>
      {/* Arrow fletching */}
      <path d="M22 40 L18 34 L26 38" fill={G} opacity="0.8"/>
      <path d="M22 40 L18 46 L26 42" fill={G} opacity="0.8"/>
      {/* Bow decorations */}
      <circle cx="20" cy="18" r="3" fill={G}/>
      <circle cx="20" cy="62" r="3" fill={G}/>
      {/* Grip */}
      <rect x="17" y="36" width="6" height="8" rx="2" fill={N} stroke={G} strokeWidth="1"/>
    </svg>
  ),

  // MAKAR (Capricorn) — Sea-goat / Goat head
  Makar: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill={D} stroke={G} strokeWidth="2"/>
      {/* Horns */}
      <path d="M28 30 Q24 16 32 14 Q38 12 36 26" fill={N} stroke={G} strokeWidth="2"/>
      <path d="M52 30 Q56 16 48 14 Q42 12 44 26" fill={N} stroke={G} strokeWidth="2"/>
      {/* Goat face */}
      <ellipse cx="40" cy="46" rx="15" ry="17" fill={N} stroke={G} strokeWidth="1.8"/>
      {/* Eyes */}
      <ellipse cx="34" cy="41" rx="3" ry="2.5" fill={G}/>
      <ellipse cx="46" cy="41" rx="3" ry="2.5" fill={G}/>
      <ellipse cx="34.6" cy="40.5" rx="1" ry="1.2" fill={D}/>
      <ellipse cx="46.6" cy="40.5" rx="1" ry="1.2" fill={D}/>
      {/* Snout */}
      <ellipse cx="40" cy="52" rx="7" ry="5" fill={D} stroke={G} strokeWidth="1.5"/>
      <circle cx="37.5" cy="52" r="1.5" fill={G} opacity="0.5"/>
      <circle cx="42.5" cy="52" r="1.5" fill={G} opacity="0.5"/>
      {/* Beard */}
      <path d="M36 58 Q40 64 44 58" stroke={G} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M38 60 Q40 66 42 60" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Ears */}
      <ellipse cx="25" cy="40" rx="4" ry="5" fill={N} stroke={G} strokeWidth="1.5" transform="rotate(-20 25 40)"/>
      <ellipse cx="55" cy="40" rx="4" ry="5" fill={N} stroke={G} strokeWidth="1.5" transform="rotate(20 55 40)"/>
    </svg>
  ),

  // KUMBHA (Aquarius) — Water bearer / Waves
  Kumbha: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill={D} stroke={G} strokeWidth="2"/>
      {/* Pot/Urn */}
      <path d="M28 38 Q26 52 30 58 Q40 64 50 58 Q54 52 52 38Z" fill={N} stroke={G} strokeWidth="2"/>
      {/* Pot neck */}
      <rect x="32" y="30" width="16" height="10" rx="3" fill={N} stroke={G} strokeWidth="1.8"/>
      {/* Pot rim */}
      <ellipse cx="40" cy="30" rx="10" ry="4" fill={N} stroke={G} strokeWidth="1.8"/>
      {/* Pot handle */}
      <path d="M52 38 Q60 38 60 44 Q60 50 52 50" stroke={G} strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Water waves pouring */}
      <path d="M20 22 Q26 18 32 22 Q38 26 44 22 Q50 18 56 22" stroke={G} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M16 30 Q22 26 28 30 Q34 34 40 30 Q46 26 52 30 Q58 34 64 30" stroke={G} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Stars */}
      <circle cx="22" cy="20" r="1.5" fill={G}/>
      <circle cx="58" cy="20" r="1.5" fill={G}/>
      <circle cx="40" cy="16" r="2" fill={G}/>
    </svg>
  ),

  // MEEN (Pisces) — Two fish
  Meen: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill={D} stroke={G} strokeWidth="2"/>
      {/* Outer circle */}
      <circle cx="40" cy="40" r="28" stroke={G} strokeWidth="1.5" fill="none" opacity="0.4"/>
      {/* Fish 1 (top-right going right) */}
      <ellipse cx="50" cy="28" rx="12" ry="7" fill={N} stroke={G} strokeWidth="1.8" transform="rotate(30 50 28)"/>
      <path d="M60 22 L68 16 L64 24 L70 26 L62 28Z" fill={G} opacity="0.8" transform="rotate(30 60 22)"/>
      <circle cx="44" cy="24" r="2" fill={G}/>
      <circle cx="44.6" cy="23.4" r="0.7" fill={D}/>
      {/* Fish 1 fins */}
      <path d="M48 22 Q52 16 56 20" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Fish 2 (bottom-left going left) */}
      <ellipse cx="30" cy="52" rx="12" ry="7" fill={N} stroke={G} strokeWidth="1.8" transform="rotate(-150 30 52)"/>
      <path d="M20 58 L12 64 L16 56 L10 54 L18 52Z" fill={G} opacity="0.8" transform="rotate(-150 20 58)"/>
      <circle cx="36" cy="56" r="2" fill={G}/>
      <circle cx="36.6" cy="55.4" r="0.7" fill={D}/>
      {/* Fish 2 fins */}
      <path d="M32 58 Q28 64 24 60" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Center connecting line */}
      <path d="M38 34 Q40 40 42 46" stroke={G} strokeWidth="1.5" fill="none" strokeDasharray="2,2" opacity="0.6"/>
    </svg>
  ),
};

interface ZodiacIconProps {
  rashi: string;
  size?: number;
  className?: string;
}

export default function ZodiacIcon({ rashi, size = 72, className = "" }: ZodiacIconProps) {
  const icon = ICONS[rashi];
  if (!icon) {
    // Fallback: styled symbol
    return (
      <div
        className={`flex items-center justify-center rounded-full ${className}`}
        style={{ width: size, height: size, background: "linear-gradient(135deg, #001a5e, #003893)", border: "2px solid #F5A623" }}
      >
        <span style={{ fontSize: size * 0.45, lineHeight: 1 }}>⭐</span>
      </div>
    );
  }
  return (
    <div className={className} style={{ width: size, height: size }}>
      {icon}
    </div>
  );
}

export { ICONS };
