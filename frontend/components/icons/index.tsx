/**
 * NamoIcons — Custom SVG icon library for Namo Patro
 *
 * Two layers:
 *  1. Culturally-themed hand-crafted SVG icons (Hindu / Nepali motifs)
 *  2. Re-exported lucide-react icons aliased to semantic names used across the app
 *
 * Color tokens (match tailwind.config.js):
 *   Saffron  #FF6B00   – primary accent
 *   Gold     #F4C430   – secondary / highlight
 *   Sindoor  #C0392B   – holiday / danger
 *   White    #FFFFFF
 */

import {
  // Calendar / time
  CalendarDays,
  CalendarRange,
  Clock,
  Sunrise,
  Sunset,
  Moon,
  Sun,
  Star,
  // Finance
  DollarSign,
  TrendingUp,
  TrendingDown,
  Coins,
  BarChart2,
  ShoppingBasket,
  // Navigation / UI
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  // Media / entertainment
  Radio,
  Mic2,
  Music,
  Music2,
  Play,
  Pause,
  Square,
  Volume2,
  // Communication
  Newspaper,
  Globe,
  Link2,
  // Health
  Stethoscope,
  Pill,
  TestTube,
  Hospital,
  Ambulance,
  // Utilities / tools
  BookOpen,
  Keyboard,
  Smartphone,
  Copy,
  Search,
  Wrench,
  // Wallet / payment
  Wallet,
  CreditCard,
  SendHorizonal,
  History,
  PlusCircle,
  MinusCircle,
  // Auth / people
  User,
  Users,
  // Meeting / video
  Video,
  Lock,
  Timer,
  // Misc / status
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Crown,
  Gem,
  Heart,
  Sparkles,
  Filter,
  // Settings
  Settings,
  X,
  Menu,
  // Zap / bolt
  Zap,
} from "lucide-react";

// ─── Re-export lucide icons with semantic aliases ─────────────────────────────

export {
  CalendarDays      as IconCalendar,
  CalendarRange     as IconCalendarRange,
  Clock             as IconClock,
  Sunrise           as IconSunrise,
  Sunset            as IconSunset,
  Moon              as IconMoon,
  Sun               as IconSun,
  Star              as IconStar,

  DollarSign        as IconCurrency,
  TrendingUp        as IconTrendingUp,
  TrendingDown      as IconTrendingDown,
  Coins             as IconCoins,
  BarChart2         as IconChart,
  ShoppingBasket    as IconBasket,

  ChevronLeft       as IconChevronLeft,
  ChevronRight      as IconChevronRight,
  ChevronDown       as IconChevronDown,
  ArrowRight        as IconArrowRight,
  ArrowLeft         as IconArrowLeft,
  ArrowUpRight      as IconExternalArrow,
  ExternalLink      as IconExternalLink,

  Radio             as IconRadio,
  Mic2              as IconMic,
  Music             as IconMusic,
  Music2            as IconMusic2,
  Play              as IconPlay,
  Pause             as IconPause,
  Square            as IconStop,
  Volume2           as IconVolume,

  Newspaper         as IconNewspaper,
  Globe             as IconGlobe,
  Link2             as IconLink,

  Stethoscope       as IconDoctor,
  Pill              as IconPharmacy,
  TestTube          as IconLab,
  Hospital          as IconHospital,
  Ambulance         as IconAmbulance,

  BookOpen          as IconDictionary,
  Keyboard          as IconKeyboard,
  Smartphone        as IconPhone,
  Copy              as IconCopy,
  Search            as IconSearch,
  Wrench            as IconTools,

  Wallet            as IconWallet,
  CreditCard        as IconCard,
  SendHorizonal     as IconSend,
  History           as IconHistory,
  PlusCircle        as IconAdd,
  MinusCircle       as IconMinus,

  User              as IconUser,
  Users             as IconUsers,

  Video             as IconVideo,
  Lock              as IconLock,
  Timer             as IconTimer,

  CheckCircle2      as IconCheck,
  AlertTriangle     as IconWarning,
  Loader2           as IconLoader,
  Crown             as IconCrown,
  Gem               as IconGem,
  Heart             as IconHeart,
  Sparkles          as IconSparkles,
  Filter            as IconFilter,
  Settings          as IconSettings,
  X                 as IconX,
  Menu              as IconMenu,
  Zap               as IconZap,
};

// ─── Icon prop type ───────────────────────────────────────────────────────────
// Kept broad so both lucide icons (size: string|number) and our SVGs (size: number) are compatible.

export interface IconProps {
  size?: number | string;
  className?: string;
  color?: string;
}

// ─── Custom culturally-themed SVG icons ──────────────────────────────────────

const S = "#FF6B00"; // saffron
const G = "#F4C430"; // gold
const R = "#C0392B"; // sindoor red
const W = "#FFFFFF";

/**
 * DiyaIcon — oil lamp (दीप), used for home / aajako miti / festivals
 */
export function DiyaIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || S;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Diya">
      {/* Flame */}
      <path d="M12 2C12 2 10 5 10 7C10 8.1 10.9 9 12 9C13.1 9 14 8.1 14 7C14 5 12 2 12 2Z"
        fill={G} opacity="0.9" />
      <path d="M12 3.5C12 3.5 11 5.5 11 7C11 7.55 11.45 8 12 8C12.55 8 13 7.55 13 7C13 5.5 12 3.5 12 3.5Z"
        fill={W} opacity="0.7" />
      {/* Wick */}
      <rect x="11.5" y="9" width="1" height="2" rx="0.5" fill={G} opacity="0.8" />
      {/* Bowl */}
      <path d="M7 13C7 11.34 9.24 10 12 10C14.76 10 17 11.34 17 13C17 15.21 14.76 16 12 16C9.24 16 7 15.21 7 13Z"
        fill={c} opacity="0.85" />
      <path d="M7 13C7 13 7.5 16 12 16C16.5 16 17 13 17 13" stroke={G} strokeWidth="0.6" fill="none" opacity="0.5" />
      {/* Base */}
      <path d="M6 17H18C18 17 17 20 12 20C7 20 6 17 6 17Z" fill={c} opacity="0.7" />
      {/* Oil shimmer */}
      <ellipse cx="11" cy="12.5" rx="1.5" ry="0.6" fill={G} opacity="0.3" />
    </svg>
  );
}

/**
 * LotusIcon — sacred lotus (कमल), used for home nav / SacredBackground
 */
export function LotusIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || S;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Lotus">
      {/* Petals — outer */}
      <path d="M12 18C12 18 7 16 6 11C6 11 9 13 12 13C15 13 18 11 18 11C17 16 12 18 12 18Z"
        fill={c} opacity="0.5" />
      <path d="M12 18C12 18 5 15 4 9C4 9 8 12 12 12C16 12 20 9 20 9C19 15 12 18 12 18Z"
        fill={c} opacity="0.3" />
      {/* Petals — mid */}
      <path d="M12 16C12 16 8.5 14 8 10C8 10 10 12 12 12C14 12 16 10 16 10C15.5 14 12 16 12 16Z"
        fill={c} opacity="0.75" />
      <path d="M12 16C12 16 10 11 12 8C14 11 12 16 12 16Z"
        fill={G} opacity="0.8" />
      {/* Center */}
      <circle cx="12" cy="13" r="1.5" fill={G} opacity="0.9" />
      <circle cx="12" cy="13" r="0.7" fill={W} opacity="0.6" />
      {/* Stem */}
      <path d="M12 18V22" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/**
 * DharmaChakraIcon — wheel of dharma (धर्मचक्र), used for Converter nav
 */
export function DharmaChakraIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || S;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Dharma Chakra">
      <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.5" fill="none" opacity="0.7" />
      <circle cx="12" cy="12" r="2.5" fill={G} opacity="0.9" />
      <circle cx="12" cy="12" r="1" fill={W} opacity="0.7" />
      {/* 8 spokes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 12 + 2.8 * Math.cos(angle);
        const y1 = 12 + 2.8 * Math.sin(angle);
        const x2 = 12 + 9.5 * Math.cos(angle);
        const y2 = 12 + 9.5 * Math.sin(angle);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        );
      })}
      {/* Rim dots */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = ((i * 45 + 22.5) * Math.PI) / 180;
        return (
          <circle key={i} cx={12 + 9.2 * Math.cos(angle)} cy={12 + 9.2 * Math.sin(angle)}
            r="0.8" fill={G} opacity="0.6" />
        );
      })}
    </svg>
  );
}

/**
 * ChandraMoonIcon — crescent moon (चन्द्र), used for Panchang nav
 */
export function ChandraMoonIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || G;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Chandra Moon">
      <path d="M20 13.5C20 17.64 16.64 21 12.5 21C8.36 21 5 17.64 5 13.5C5 9.36 8.36 6 12.5 6C11.06 7.9 10.5 10.1 10.5 12C10.5 15.58 12.92 18.5 16 18.5C17.5 18.5 18.87 17.9 20 16.9C20 15.83 20 14.67 20 13.5Z"
        fill={c} opacity="0.85" />
      <circle cx="17" cy="8" r="1" fill={G} opacity="0.7" />
      <circle cx="19" cy="11" r="0.6" fill={W} opacity="0.5" />
      <circle cx="15" cy="6" r="0.5" fill={G} opacity="0.6" />
    </svg>
  );
}

/**
 * MalaIcon — prayer beads (माला), used for News nav
 */
export function MalaIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || S;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Mala">
      {/* Circle of beads */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const cx = 12 + 8.5 * Math.cos(angle);
        const cy = 12 + 8.5 * Math.sin(angle);
        return (
          <circle key={i} cx={cx} cy={cy} r="1.4"
            fill={i % 3 === 0 ? G : c} opacity={i % 3 === 0 ? 0.9 : 0.65} />
        );
      })}
      {/* String */}
      <circle cx="12" cy="12" r="8.5" stroke={c} strokeWidth="0.5"
        fill="none" strokeDasharray="2 1.5" opacity="0.3" />
      {/* Guru bead */}
      <circle cx="12" cy="3.5" r="2" fill={G} opacity="0.9" />
      <circle cx="12" cy="3.5" r="1" fill={W} opacity="0.5" />
      {/* Tassel */}
      <line x1="12" y1="5.5" x2="11.3" y2="8" stroke={c} strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      <line x1="12" y1="5.5" x2="12" y2="8.2" stroke={c} strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      <line x1="12" y1="5.5" x2="12.7" y2="8" stroke={c} strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/**
 * SuryaCoinIcon — sun coin (लक्ष्मी सिक्का), used for Finance / Wallet nav
 */
export function SuryaCoinIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || G;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Surya Coin">
      {/* Outer glow ring */}
      <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="0.6" fill="none" opacity="0.3" />
      {/* Coin body */}
      <circle cx="12" cy="12" r="8.5" fill={c} opacity="0.12" />
      <circle cx="12" cy="12" r="8.5" stroke={c} strokeWidth="1.5" fill="none" opacity="0.8" />
      {/* Sun rays inside */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <line key={i}
            x1={12 + 4 * Math.cos(a)} y1={12 + 4 * Math.sin(a)}
            x2={12 + 7 * Math.cos(a)} y2={12 + 7 * Math.sin(a)}
            stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.55" />
        );
      })}
      {/* Center sun */}
      <circle cx="12" cy="12" r="3" fill={c} opacity="0.85" />
      <circle cx="12" cy="12" r="1.5" fill={W} opacity="0.6" />
      {/* ₨ symbol */}
      <text x="12" y="13.5" textAnchor="middle" fontSize="4"
        fontFamily="system-ui,sans-serif" fill={W} fontWeight="bold" opacity="0.85">₨</text>
    </svg>
  );
}

/**
 * TulsiIcon — sacred Tulsi leaf (तुलसी), used for Health nav
 */
export function TulsiIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || "#22c55e";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Tulsi">
      {/* Stem */}
      <path d="M12 22V10" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      {/* Main leaf */}
      <path d="M12 10C12 10 6 8 6 4C6 4 10 6 12 10Z"
        fill={c} opacity="0.8" />
      <path d="M12 10C12 10 18 8 18 4C18 4 14 6 12 10Z"
        fill={c} opacity="0.8" />
      {/* Mid leaf pair */}
      <path d="M12 14C12 14 8 13 7 10C7 10 10 12 12 14Z"
        fill={c} opacity="0.6" />
      <path d="M12 14C12 14 16 13 17 10C17 10 14 12 12 14Z"
        fill={c} opacity="0.6" />
      {/* Small leaf pair */}
      <path d="M12 17C12 17 9 16 9 14C9 14 11 16 12 17Z"
        fill={c} opacity="0.5" />
      <path d="M12 17C12 17 15 16 15 14C15 14 13 16 12 17Z"
        fill={c} opacity="0.5" />
      {/* Veins */}
      <path d="M12 6 Q10 7 9 9" stroke={W} strokeWidth="0.5" fill="none" opacity="0.4" />
      <path d="M12 6 Q14 7 15 9" stroke={W} strokeWidth="0.5" fill="none" opacity="0.4" />
      {/* Tiny flowers */}
      <circle cx="12" cy="9.5" r="0.8" fill={G} opacity="0.7" />
    </svg>
  );
}

/**
 * ShatkhonaIcon — hexagram star / Shatkona (षट्कोण), used for Astrology / Jyotish nav
 */
export function ShatkhonaIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || G;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Shatkona">
      {/* Upward triangle */}
      <path d="M12 3L21.39 19.5H2.61L12 3Z"
        stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.12" strokeLinejoin="round" />
      {/* Downward triangle */}
      <path d="M12 21L2.61 4.5H21.39L12 21Z"
        stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.12" strokeLinejoin="round" />
      {/* Center dot */}
      <circle cx="12" cy="12" r="1.5" fill={c} opacity="0.9" />
      {/* Corner stars */}
      {[[12,3],[21.39,19.5],[2.61,19.5],[12,21],[21.39,4.5],[2.61,4.5]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="0.9" fill={G} opacity="0.7" />
      ))}
    </svg>
  );
}

/**
 * ScrollIcon — sacred scroll (पोथी), used for Utilities nav
 */
export function ScrollIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || G;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Scroll">
      {/* Scroll body */}
      <rect x="5" y="4" width="14" height="17" rx="2" fill={c} fillOpacity="0.12"
        stroke={c} strokeWidth="1.3" />
      {/* Top curl */}
      <path d="M5 4C5 4 4 4 4 6C4 8 5 8 5 8" stroke={c} strokeWidth="1.2"
        fill="none" strokeLinecap="round" />
      <path d="M19 4C19 4 20 4 20 6C20 8 19 8 19 8" stroke={c} strokeWidth="1.2"
        fill="none" strokeLinecap="round" />
      {/* Bottom curl */}
      <path d="M5 21C5 21 4 21 4 19C4 17 5 17 5 17" stroke={c} strokeWidth="1.2"
        fill="none" strokeLinecap="round" />
      <path d="M19 21C19 21 20 21 20 19C20 17 19 17 19 17" stroke={c} strokeWidth="1.2"
        fill="none" strokeLinecap="round" />
      {/* Lines of text */}
      <line x1="8" y1="9" x2="16" y2="9" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="8" y1="12" x2="16" y2="12" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="8" y1="15" x2="13" y2="15" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      {/* Om glyph hint */}
      <text x="12" y="12.5" textAnchor="middle" fontSize="5"
        fontFamily="Noto Serif Devanagari,serif" fill={c} opacity="0.4">ॐ</text>
    </svg>
  );
}

/**
 * HomeGharIcon — traditional Nepali house (घर), used for Meet / CharGhare nav
 */
export function HomeGharIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || S;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Ghar">
      {/* Roof */}
      <path d="M12 3L3 10H5V20H19V10H21L12 3Z"
        fill={c} fillOpacity="0.15" stroke={c} strokeWidth="1.3" strokeLinejoin="round" />
      {/* Roof ridge decoration */}
      <path d="M12 3L10 6H14L12 3Z" fill={G} fillOpacity="0.7" />
      <circle cx="12" cy="3.5" r="0.8" fill={G} opacity="0.9" />
      {/* Door */}
      <rect x="9.5" y="14" width="5" height="6" rx="2.5"
        fill={c} fillOpacity="0.3" stroke={c} strokeWidth="1" />
      {/* Window */}
      <rect x="7" y="12" width="3.5" height="3" rx="0.5"
        fill={G} fillOpacity="0.2" stroke={G} strokeWidth="0.8" opacity="0.7" />
      <rect x="13.5" y="12" width="3.5" height="3" rx="0.5"
        fill={G} fillOpacity="0.2" stroke={G} strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}

/**
 * OmIcon — Om / Aum symbol (ॐ), standalone icon
 */
export function OmIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || G;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Om">
      <circle cx="12" cy="12" r="10.5" stroke={c} strokeWidth="1" fill="none" opacity="0.25" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="14"
        fontFamily="Noto Serif Devanagari,serif" fill={c} fontWeight="700" opacity="0.9">ॐ</text>
    </svg>
  );
}

/**
 * FestivalIcon — celebration burst, used for Festivals nav
 */
export function FestivalIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || S;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Festival">
      {/* Firework bursts */}
      {[
        [12, 5], [19, 10], [5, 10], [16, 18], [8, 18],
      ].map(([cx, cy], i) => (
        <g key={i}>
          {Array.from({ length: 6 }).map((_, j) => {
            const a = (j * 60 * Math.PI) / 180;
            const r = i === 0 ? 3 : 2;
            return (
              <line key={j}
                x1={cx} y1={cy}
                x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)}
                stroke={j % 2 === 0 ? c : G} strokeWidth="0.9"
                strokeLinecap="round" opacity="0.8" />
            );
          })}
          <circle cx={cx} cy={cy} r={i === 0 ? 1.2 : 0.8}
            fill={i % 2 === 0 ? c : G} opacity="0.9" />
        </g>
      ))}
      {/* Diya silhouette at center */}
      <path d="M10.5 14C10.5 13.17 11.17 12.5 12 12.5C12.83 12.5 13.5 13.17 13.5 14C13.5 15.1 12 16.5 12 16.5C12 16.5 10.5 15.1 10.5 14Z"
        fill={G} opacity="0.7" />
    </svg>
  );
}

/**
 * EntertainmentIcon — game / fun icon (IPL, Quiz, E-Cards)
 */
export function EntertainmentIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || S;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Entertainment">
      {/* Joker / circus top */}
      <path d="M12 3C9 3 7 5 7 8C7 12 12 15 12 15C12 15 17 12 17 8C17 5 15 3 12 3Z"
        fill={c} fillOpacity="0.2" stroke={c} strokeWidth="1.2" />
      {/* Stars */}
      <circle cx="10" cy="7" r="1" fill={G} opacity="0.8" />
      <circle cx="14" cy="7" r="1" fill={G} opacity="0.8" />
      <path d="M10 10C10 10 11 11.5 12 11.5C13 11.5 14 10 14 10" stroke={c} strokeWidth="1"
        strokeLinecap="round" fill="none" />
      {/* Confetti */}
      <rect x="4" y="15" width="2" height="2" rx="0.3" fill={G} opacity="0.6"
        transform="rotate(20 4 15)" />
      <rect x="18" y="16" width="2" height="2" rx="0.3" fill={c} opacity="0.6"
        transform="rotate(-15 18 16)" />
      <rect x="6" y="18" width="1.5" height="1.5" rx="0.3" fill={c} opacity="0.5"
        transform="rotate(35 6 18)" />
      <rect x="16" y="13" width="1.5" height="1.5" rx="0.3" fill={G} opacity="0.5"
        transform="rotate(-25 16 13)" />
      {/* Bottom ribbon */}
      <path d="M7 21C7 21 9.5 19 12 20C14.5 21 17 19 17 19" stroke={c} strokeWidth="1.2"
        strokeLinecap="round" fill="none" opacity="0.6" />
    </svg>
  );
}

/**
 * PremiumCrownIcon — styled crown with gems, used for Premium button
 */
export function PremiumCrownIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || G;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Premium">
      {/* Crown body */}
      <path d="M3 17L5 9L9 13L12 6L15 13L19 9L21 17H3Z"
        fill={c} fillOpacity="0.85" stroke={c} strokeWidth="1" strokeLinejoin="round" />
      {/* Base band */}
      <rect x="3" y="17" width="18" height="2.5" rx="1"
        fill={c} fillOpacity="0.7" stroke={c} strokeWidth="0.8" />
      {/* Gem points */}
      <circle cx="12" cy="6" r="1.5" fill={W} opacity="0.9" />
      <circle cx="5" cy="9" r="1.2" fill={R} opacity="0.8" />
      <circle cx="19" cy="9" r="1.2" fill={R} opacity="0.8" />
      <circle cx="8.5" cy="17.8" r="0.8" fill={W} opacity="0.6" />
      <circle cx="12" cy="17.8" r="0.8" fill={W} opacity="0.6" />
      <circle cx="15.5" cy="17.8" r="0.8" fill={W} opacity="0.6" />
    </svg>
  );
}

/**
 * SuccessCheckIcon — confirmation tick in a circle
 */
export function SuccessCheckIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || "#22c55e";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Success">
      <circle cx="12" cy="12" r="10" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="1.5" />
      <path d="M7 12.5L10.5 16L17 9" stroke={c} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * VideoCallIcon — camera / video conferencing
 */
export function VideoCallIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || S;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Video Call">
      <rect x="2" y="6" width="14" height="12" rx="2"
        fill={c} fillOpacity="0.15" stroke={c} strokeWidth="1.3" />
      <path d="M16 10L22 7V17L16 14V10Z"
        fill={c} fillOpacity="0.3" stroke={c} strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="8" cy="11" r="2" fill={G} opacity="0.6" />
    </svg>
  );
}

/**
 * ConverterArrowIcon — bidirectional calendar swap, used for Converter page
 */
export function ConverterArrowIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || S;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Converter">
      {/* Two calendar sheets */}
      <rect x="2" y="4" width="9" height="11" rx="1.5" fill={c} fillOpacity="0.12"
        stroke={c} strokeWidth="1.2" />
      <rect x="13" y="9" width="9" height="11" rx="1.5" fill={G} fillOpacity="0.12"
        stroke={G} strokeWidth="1.2" />
      {/* Swap arrows */}
      <path d="M11 8L13 10L11 12" stroke={c} strokeWidth="1.3"
        strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 16L11 14L13 12" stroke={G} strokeWidth="1.3"
        strokeLinecap="round" strokeLinejoin="round" />
      {/* Lines on calendars */}
      <line x1="4" y1="8" x2="9" y2="8" stroke={c} strokeWidth="0.8" opacity="0.5" />
      <line x1="4" y1="11" x2="9" y2="11" stroke={c} strokeWidth="0.8" opacity="0.5" />
      <line x1="15" y1="13" x2="20" y2="13" stroke={G} strokeWidth="0.8" opacity="0.5" />
      <line x1="15" y1="16" x2="20" y2="16" stroke={G} strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

/**
 * CricketIcon — cricket bat and ball (IPL / entertainment)
 */
export function CricketIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || S;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Cricket">
      {/* Bat */}
      <rect x="5" y="3" width="4" height="14" rx="2"
        fill={c} fillOpacity="0.7" stroke={c} strokeWidth="1" />
      <rect x="6" y="17" width="2" height="4" rx="1"
        fill={c} fillOpacity="0.5" stroke={c} strokeWidth="0.8" />
      {/* Ball */}
      <circle cx="17" cy="8" r="4" fill={R} fillOpacity="0.8" stroke={R} strokeWidth="1" />
      <path d="M14 6.5 Q17 8 20 9.5" stroke={W} strokeWidth="0.7" fill="none" opacity="0.5"
        strokeLinecap="round" />
      <path d="M14 9.5 Q17 8 20 6.5" stroke={W} strokeWidth="0.7" fill="none" opacity="0.5"
        strokeLinecap="round" />
    </svg>
  );
}

/**
 * QuizBrainIcon — brain / knowledge icon (Nepal Quiz)
 */
export function QuizBrainIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || G;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Quiz">
      <path d="M9 3C6.24 3 4 5.24 4 8C4 9.5 4.6 10.85 5.56 11.83C4.62 12.5 4 13.68 4 15C4 17.21 5.79 19 8 19H16C18.21 19 20 17.21 20 15C20 13.68 19.38 12.5 18.44 11.83C19.4 10.85 20 9.5 20 8C20 5.24 17.76 3 15 3C14.1 3 13.24 3.26 12.5 3.7C11.76 3.26 10.9 3 10 3"
        stroke={c} strokeWidth="1.3" fill={c} fillOpacity="0.1" strokeLinejoin="round" />
      <line x1="12" y1="7" x2="12" y2="15" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <line x1="8" y1="10" x2="16" y2="10" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <circle cx="9" cy="14" r="1" fill={G} opacity="0.7" />
      <circle cx="15" cy="14" r="1" fill={G} opacity="0.7" />
    </svg>
  );
}

/**
 * ECardIcon — decorative greeting card
 */
export function ECardIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || S;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="E-Card">
      <rect x="2" y="5" width="20" height="14" rx="2"
        fill={c} fillOpacity="0.1" stroke={c} strokeWidth="1.3" />
      {/* Fold line */}
      <path d="M2 5L12 13L22 5" stroke={c} strokeWidth="1.2"
        fill="none" strokeLinejoin="round" opacity="0.6" />
      {/* Flower decoration */}
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i * 72 * Math.PI) / 180;
        return <circle key={i} cx={12 + 1.5 * Math.cos(a)} cy={15 + 1.5 * Math.sin(a)}
          r="0.8" fill={i % 2 === 0 ? G : R} opacity="0.7" />;
      })}
      <circle cx="12" cy="15" r="0.7" fill={W} opacity="0.8" />
    </svg>
  );
}

/**
 * NepseIcon — stock chart / NEPSE icon
 */
export function NepseIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || G;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="NEPSE">
      {/* Axes */}
      <line x1="3" y1="20" x2="21" y2="20" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <line x1="3" y1="20" x2="3" y2="4" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      {/* Chart line */}
      <polyline points="3,18 6,14 9,16 12,10 15,12 18,6 21,8"
        stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Fill under chart */}
      <path d="M3 18L6 14L9 16L12 10L15 12L18 6L21 8V20H3Z"
        fill={c} fillOpacity="0.08" />
      {/* Data points */}
      {[[3,18],[6,14],[9,16],[12,10],[15,12],[18,6],[21,8]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill={c} opacity="0.8" />
      ))}
    </svg>
  );
}

/**
 * ForexIcon — currency exchange arrows
 */
export function ForexIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || G;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Forex">
      {/* Dollar symbol */}
      <text x="5.5" y="13" fontSize="9" fontFamily="system-ui,sans-serif"
        fill={c} fontWeight="bold" opacity="0.85">$</text>
      {/* Rupee symbol */}
      <text x="14" y="15" fontSize="8" fontFamily="system-ui,sans-serif"
        fill={S} fontWeight="bold" opacity="0.85">₨</text>
      {/* Swap arrows */}
      <path d="M10 8L14 8L12 6" stroke={c} strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 16L10 16L12 18" stroke={S} strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round" />
      {/* Circle border */}
      <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1"
        fill="none" opacity="0.2" />
    </svg>
  );
}

/**
 * GoldIcon — gold bar icon for metals/bullion
 */
export function GoldIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || G;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Gold">
      {/* Bar body */}
      <rect x="3" y="9" width="18" height="9" rx="1.5"
        fill={c} fillOpacity="0.75" stroke={c} strokeWidth="1.2" />
      {/* Top face */}
      <path d="M3 9L6 5H18L21 9H3Z"
        fill={c} fillOpacity="0.5" stroke={c} strokeWidth="1" strokeLinejoin="round" />
      {/* Shine */}
      <line x1="6" y1="12" x2="10" y2="12" stroke={W} strokeWidth="1.2"
        strokeLinecap="round" opacity="0.4" />
      {/* Stamp text */}
      <text x="12" y="15.5" textAnchor="middle" fontSize="4.5"
        fontFamily="system-ui,sans-serif" fill={W} fontWeight="bold" opacity="0.7">Au</text>
    </svg>
  );
}

/**
 * SilverIcon — silver bar icon
 */
export function SilverIcon({ size = 24, className = "", color }: IconProps) {
  const c = color ?? "#e2e8f0";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Silver">
      <rect x="3" y="9" width="18" height="9" rx="1.5"
        fill={c} fillOpacity="0.35" stroke={c} strokeWidth="1.2" />
      <path d="M3 9L6 5H18L21 9H3Z"
        fill={c} fillOpacity="0.2" stroke={c} strokeWidth="1" strokeLinejoin="round" />
      <line x1="6" y1="12" x2="10" y2="12" stroke={W} strokeWidth="1.2"
        strokeLinecap="round" opacity="0.35" />
      <text x="12" y="15.5" textAnchor="middle" fontSize="4.5"
        fontFamily="system-ui,sans-serif" fill={W} fontWeight="bold" opacity="0.6">Ag</text>
    </svg>
  );
}

/**
 * VegetableIcon — fresh produce / Kalimati
 */
export function VegetableIcon({ size = 24, className = "", color }: IconProps) {
  const c = color || "#22c55e";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Vegetables">
      {/* Carrot */}
      <path d="M14 14L18 8C18 8 20 6 19 5C18 4 16 6 16 6L10 10L14 14Z"
        fill="#f97316" fillOpacity="0.8" stroke="#f97316" strokeWidth="0.8" />
      {/* Carrot leaves */}
      <path d="M16 6C16 6 15 3 13 3C13 3 14 5 15 6" fill={c} fillOpacity="0.7" />
      <path d="M17.5 5C17.5 5 17 2.5 15 3C15 3 16.5 4.5 17 5.5" fill={c} fillOpacity="0.6" />
      {/* Leafy green */}
      <path d="M6 14C6 14 4 10 7 8C7 8 7 11 9 12C9 12 6 12 6 14Z"
        fill={c} fillOpacity="0.75" />
      <path d="M5 16C5 16 3 13 5 11C5 11 6 13.5 8 14C8 14 5 14 5 16Z"
        fill={c} fillOpacity="0.6" />
      {/* Stem */}
      <path d="M8 14L6 20" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/**
 * LiveDotIcon — animated live indicator (not SVG-only, uses CSS)
 */
export function LiveBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full ${className}`}>
      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
      Live
    </span>
  );
}

/**
 * HamburgerIcon — menu / close toggle
 */
export function HamburgerIcon({ size = 24, open = false, className = "", color }: IconProps & { open?: boolean }) {
  const c = color || S;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} aria-label={open ? "Close" : "Menu"}>
      {open ? (
        <>
          <line x1="5" y1="5" x2="19" y2="19" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <line x1="19" y1="5" x2="5" y2="19" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <line x1="4" y1="12" x2="20" y2="12" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <line x1="4" y1="17" x2="20" y2="17" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
