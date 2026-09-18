import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  IconRadio, IconMusic, IconMic, IconPlay, IconPause, IconStop,
  IconVolume, IconWarning, IconX, LotusIcon,
} from "../components/icons";

// Genre → icon component mapping
const GENRE_ICON_MAP: Record<string, React.ComponentType<any>> = {
  "National":   IconRadio,
  "News/Music": IconMusic,
  "Music":      IconMusic,
  "Pop/Hits":   IconMic,
  "News":       IconRadio,
  "Cultural":   LotusIcon,
  "Regional":   LotusIcon,
  "Bhajan":     LotusIcon,
};

const STREAM_URLS: Record<string, string> = {
  "Radio Nepal":   "https://stream1.radionepal.gov.np/live/",
  "Kantipur FM":   "https://radio-broadcast.ekantipur.com/stream/",
  "Image FM":      "https://stream.zeno.fm/fvrx47wpg0quv",
  "Hits FM":       "https://usa15.fastcast4u.com/proxy/hitsfm912?mp=/1",
  "Ujyaalo FM":    "https://stream.zeno.fm/h527zwd11uquv",
  "Sagarmatha FM": "https://stream.zeno.fm/60tx8fw9dd0uv",
  "Annapurna FM":  "https://shoutcast.prixa.live/annapurna",
  "Kalika FM":     "https://stream.hamropatro.com/8783",
};

const PODCASTS = [
  { title: "Nepal Talks",   host: "Rabi Lamichhane", ep: "Ep 142", desc: "Politics & society",       url: "https://open.spotify.com/show/nepal-talks" },
  { title: "Startup Nepal", host: "Saurav Dhakal",   ep: "Ep 89",  desc: "Entrepreneurship stories", url: "https://open.spotify.com/show/startup-nepal" },
  { title: "Hamro Kura",    host: "Various",          ep: "Ep 210", desc: "Culture & lifestyle",      url: "https://open.spotify.com/show/hamro-kura" },
  { title: "Tech Guff",     host: "Anil Shrestha",   ep: "Ep 55",  desc: "Technology in Nepal",      url: "https://open.spotify.com/show/tech-guff" },
];

export default function Radio() {
  const [stations, setStations] = useState<any[]>([]);
  const [bhajans, setBhajans]   = useState<any[]>([]);
  const [playing, setPlaying]   = useState<string | null>(null);
  const [tab, setTab]           = useState<"radio" | "bhajan" | "podcast">("radio");
  const [loading, setLoading]   = useState(true);
  const [volume, setVolume]     = useState(0.8);
  const [error, setError]       = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    Promise.all([
      axios.get("/api/radio/stations").then(r => r.data).catch(() => []),
      axios.get("/api/radio/bhajans").then(r => r.data).catch(() => []),
    ]).then(([s, b]) => { setStations(s); setBhajans(b); setLoading(false); });
  }, []);

  const playStation = (name: string, streamUrl?: string) => {
    setError(null);
    if (playing === name) {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.src = "";
      setPlaying(null);
      return;
    }
    const url = streamUrl || STREAM_URLS[name];
    if (!url) { setError(`No stream URL for ${name}`); return; }
    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio(url);
    audio.volume = volume;
    audio.crossOrigin = "anonymous";
    audio.play()
      .then(() => { audioRef.current = audio; setPlaying(name); })
      .catch(() => {
        const audio2 = new Audio(url);
        audio2.volume = volume;
        audio2.play()
          .then(() => { audioRef.current = audio2; setPlaying(name); })
          .catch(() => setError(`Could not connect to ${name}. The station may be temporarily offline or blocked by your browser.`));
      });
  };

  const changeVolume = (v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const TABS: Array<{ id: "radio" | "bhajan" | "podcast"; Icon: React.ComponentType<any>; label: string }> = [
    { id: "radio",   Icon: IconRadio, label: "Radio" },
    { id: "bhajan",  Icon: LotusIcon, label: "Bhajans" },
    { id: "podcast", Icon: IconMic,   label: "Podcasts" },
  ];

  return (
    <div className="min-h-screen bg-aurora relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-pink-600 rounded-full opacity-10 blur-3xl animate-orb" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl animate-orb" style={{ animationDelay: "2s" }} />
      </div>

      <Navbar />

      <div className="container mx-auto px-4 py-10 max-w-6xl relative z-10">
        <div className="mb-8 animate-fadeUp">
          <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-2">Stream</p>
          <h1 className="text-5xl font-bold text-white mb-2">Radio & Podcasts</h1>
          <p className="text-white/40">Live Nepali FM stations · Bhajans · Podcasts</p>
        </div>

        {/* Now playing bar */}
        {playing && (
          <div className="backdrop-blur-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-2xl px-6 py-4 mb-6 flex items-center gap-4 animate-fadeUp">
            <div className="w-10 h-10 rounded-full bg-pink-500/30 flex items-center justify-center relative flex-shrink-0">
              <IconMusic size={18} color="#f9a8d4" />
              <div className="absolute inset-0 rounded-full border-2 border-pink-400/40 animate-pulse_ring" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">Now Playing</p>
              <p className="text-white/60 text-xs truncate">{playing}</p>
            </div>
            <div className="flex items-center gap-2">
              <IconVolume size={16} className="text-white/40 flex-shrink-0" />
              <input type="range" min="0" max="1" step="0.05" value={volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
                className="w-20 accent-pink-400 cursor-pointer" />
            </div>
            <button onClick={() => playStation(playing)}
              className="text-white/40 hover:text-white transition-colors flex-shrink-0"
              aria-label="Stop">
              <IconStop size={20} />
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/30 rounded-2xl px-5 py-3 mb-4 flex items-center gap-3 animate-fadeUp">
            <IconWarning size={18} className="text-red-400 flex-shrink-0" />
            <p className="text-red-300 text-sm flex-1">{error}</p>
            <button onClick={() => setError(null)} aria-label="Dismiss">
              <IconX size={16} className="text-white/30 hover:text-white transition-colors" />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-8 animate-fadeUp">
          {TABS.map(({ id, Icon, label }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300
                ${tab === id ? "bg-white text-gray-900 shadow-lg scale-105" : "backdrop-blur-xl bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}>
              <Icon size={15} color={tab === id ? "#111" : "rgba(255,255,255,0.6)"} />
              {label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 h-40 animate-pulse" />
            ))}
          </div>
        )}

        {/* Radio stations */}
        {!loading && tab === "radio" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeUp">
            {stations.map((s, i) => {
              const isPlaying = playing === s.name;
              const GenreIcon = GENRE_ICON_MAP[s.genre] ?? IconRadio;
              return (
                <div key={s.name}
                  className={`group relative backdrop-blur-2xl rounded-3xl border p-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fadeUp
                    ${isPlaying ? "bg-pink-500/20 border-pink-400/50 shadow-[0_0_40px_rgba(236,72,153,0.3)]" : "bg-white/5 border-white/10 hover:border-white/25"}`}
                  style={{ animationDelay: `${i * 50}ms` }}
                  onClick={() => playStation(s.name, s.stream_url)}>
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    <GenreIcon size={40} color={isPlaying ? "#f9a8d4" : "#FF6B00"} />
                  </div>
                  <h3 className="text-white font-bold mb-1">{s.name}</h3>
                  <p className="text-white/40 text-xs mb-1">{s.frequency}</p>
                  <p className="text-white/30 text-xs mb-4">{s.description}</p>
                  <div className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl w-fit transition-all duration-300
                    ${isPlaying ? "bg-pink-500/30 text-pink-300" : "bg-white/10 text-white/50 group-hover:bg-white/20 group-hover:text-white"}`}>
                    {isPlaying ? <IconPause size={12} /> : <IconPlay size={12} />}
                    {isPlaying ? "Playing" : "Play"}
                  </div>
                  {s.website && (
                    <a href={s.website} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] text-white/20 hover:text-white/60 transition-colors mt-2 block">
                      Website ↗
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bhajans */}
        {!loading && tab === "bhajan" && (
          <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden animate-fadeUp">
            {bhajans.map((b, i) => {
              const isPlaying = playing === b.title;
              return (
                <div key={b.title}
                  onClick={() => playStation(b.title, b.stream_url)}
                  className={`flex items-center gap-4 px-6 py-5 border-b border-white/5 cursor-pointer transition-all duration-200 hover:bg-white/5 animate-fadeUp
                    ${isPlaying ? "bg-purple-500/10" : ""}`}
                  style={{ animationDelay: `${i * 60}ms` }}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300
                    ${isPlaying ? "bg-purple-500/30 animate-pulse" : "bg-white/10"}`}>
                    <LotusIcon size={26} color={isPlaying ? "#c4b5fd" : "#FF6B00"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold">{b.title}</p>
                    <p className="text-white/40 text-xs">{b.artist}</p>
                  </div>
                  <span className="text-white/30 text-xs font-mono flex-shrink-0">{b.duration}</span>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0
                    ${isPlaying ? "bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]" : "bg-white/10 hover:bg-white/20"}`}>
                    {isPlaying ? <IconPause size={16} color="#fff" /> : <IconPlay size={16} color="rgba(255,255,255,0.5)" />}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Podcasts */}
        {!loading && tab === "podcast" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fadeUp">
            {PODCASTS.map((p, i) => (
              <div key={p.title}
                className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-6 hover:border-white/25 transition-all duration-300 hover:-translate-y-1 animate-fadeUp"
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <IconMic size={28} color="#f9a8d4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-1">{p.title}</h3>
                    <p className="text-white/40 text-xs mb-1">by {p.host}</p>
                    <p className="text-white/30 text-xs mb-3">{p.desc}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-white/10 text-white/50 px-2 py-1 rounded-lg">{p.ep}</span>
                      <a href={p.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs bg-pink-500/20 text-pink-300 border border-pink-500/30 px-3 py-1 rounded-lg hover:bg-pink-500/30 transition-colors">
                        <IconPlay size={10} />
                        Listen on Spotify
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
