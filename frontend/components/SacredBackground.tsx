// Sacred Hindu background with mandala, Om, and saffron orbs
export default function SacredBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep saffron orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-orb"
        style={{ background: "radial-gradient(circle, rgba(255,107,0,0.18) 0%, transparent 70%)" }} />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl animate-orb"
        style={{ background: "radial-gradient(circle, rgba(244,196,48,0.12) 0%, transparent 70%)", animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-orb"
        style={{ background: "radial-gradient(circle, rgba(192,57,43,0.1) 0%, transparent 70%)", animationDelay: "1.5s" }} />

      {/* Mandala rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full animate-mandala"
        style={{ border: "1px solid rgba(255,107,0,0.06)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full animate-mandala_rev"
        style={{ border: "1px solid rgba(244,196,48,0.05)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full animate-mandala"
        style={{ border: "1px solid rgba(255,107,0,0.04)", animationDuration: "25s" }} />

      {/* Mandala dot pattern */}
      <div className="absolute inset-0 mandala-pattern opacity-60" />

      {/* Giant Om watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{ fontSize: "500px", fontFamily: "'Noto Serif Devanagari', serif", color: "rgba(255,107,0,0.025)", lineHeight: 1, userSelect: "none" }}>
        ॐ
      </div>

      {/* Corner lotus decorations */}
      <div className="absolute top-4 left-4 text-4xl opacity-10 animate-float" style={{ animationDelay: "0s" }}>🪷</div>
      <div className="absolute top-4 right-4 text-4xl opacity-10 animate-float" style={{ animationDelay: "1s" }}>🪷</div>
      <div className="absolute bottom-4 left-4 text-4xl opacity-10 animate-float" style={{ animationDelay: "2s" }}>🪷</div>
      <div className="absolute bottom-4 right-4 text-4xl opacity-10 animate-float" style={{ animationDelay: "0.5s" }}>🪷</div>
    </div>
  );
}
