import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

export default function Meet() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [mode, setMode] = useState<"create" | "join">("create");
  const [copied, setCopied] = useState(false);
  const jitsiRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<any>(null);

  const generateRoom = () => "NamoPatro-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleStart = () => {
    if (!name.trim()) return;
    const room = mode === "create" ? generateRoom() : roomId.trim();
    if (!room) return;
    setRoomId(room);
    setJoined(true);
  };

  // Load Jitsi Meet API — real WebRTC video conferencing
  useEffect(() => {
    if (!joined || !jitsiRef.current) return;

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => {
      if (!(window as any).JitsiMeetExternalAPI) return;
      apiRef.current = new (window as any).JitsiMeetExternalAPI("meet.jit.si", {
        roomName: roomId,
        parentNode: jitsiRef.current,
        width: "100%",
        height: "100%",
        userInfo: { displayName: name },
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          disableDeepLinking: true,
          prejoinPageEnabled: false,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: ["microphone","camera","closedcaptions","desktop","fullscreen","fodeviceselection","hangup","chat","recording","livestreaming","etherpad","sharedvideo","settings","raisehand","videoquality","filmstrip","invite","feedback","stats","shortcuts","tileview","videobackgroundblur","download","help","mute-everyone"],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          DEFAULT_BACKGROUND: "#0f0c29",
          BRAND_WATERMARK_LINK: "",
        },
      });
      apiRef.current.addEventListener("readyToClose", () => {
        setJoined(false);
        apiRef.current?.dispose();
      });
    };
    document.head.appendChild(script);
    return () => {
      apiRef.current?.dispose();
      document.head.removeChild(script);
    };
  }, [joined, roomId, name]);

  const copyRoomId = () => {
    navigator.clipboard?.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (joined) {
    return (
      <div className="min-h-screen bg-aurora flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col container mx-auto px-4 py-4 max-w-6xl relative z-10">
          {/* Room info bar */}
          <div className="flex items-center gap-4 mb-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-5 py-3 animate-fadeUp">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white font-semibold text-sm">CharGhare Guff — Live</span>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <span className="text-white/40 text-xs">Room:</span>
              <span className="text-white font-mono text-sm">{roomId}</span>
              <button onClick={copyRoomId}
                className="text-xs bg-white/10 hover:bg-white/20 text-white/60 hover:text-white px-2 py-1 rounded-lg transition-all">
                {copied ? "✓ Copied" : "📋 Copy"}
              </button>
            </div>
            <button onClick={() => { setJoined(false); apiRef.current?.dispose(); }}
              className="ml-auto text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-1.5 rounded-xl hover:bg-red-500/30 transition-all">
              ✕ Leave
            </button>
          </div>

          {/* Jitsi container */}
          <div ref={jitsiRef} className="flex-1 rounded-3xl overflow-hidden border border-white/10 bg-black/40 min-h-[500px]">
            <div className="flex items-center justify-center h-full text-white/30 text-sm animate-pulse">
              Connecting to CharGhare Guff...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aurora relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-teal-600 rounded-full opacity-15 blur-3xl animate-orb" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl animate-orb" style={{ animationDelay:"2s" }} />
      </div>
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-lg">
          <div className="text-center mb-10 animate-fadeUp">
            <div className="text-7xl mb-4 animate-float">📹</div>
            <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-2">Free · No time limit · No account needed</p>
            <h1 className="text-5xl font-bold text-white mb-3">CharGhare Guff</h1>
            <p className="text-white/40">Real video conferencing powered by Jitsi Meet</p>
          </div>

          <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/15 p-8 animate-fadeUp" style={{ animationDelay:"100ms" }}>
            {/* Mode toggle */}
            <div className="flex gap-2 mb-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-1.5">
              {(["create","join"] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-300
                    ${mode === m ? "bg-white text-gray-900" : "text-white/50 hover:text-white"}`}>
                  {m === "create" ? "🆕 New Meeting" : "🔗 Join Meeting"}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Your Name</p>
                <input value={name} onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleStart()}
                  placeholder="Enter your name..."
                  className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 outline-none focus:border-white/30 transition-all duration-300" />
              </div>
              {mode === "join" && (
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Room ID</p>
                  <input value={roomId} onChange={(e) => setRoomId(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleStart()}
                    placeholder="e.g. NamoPatro-ABC123"
                    className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-mono placeholder-white/20 outline-none focus:border-white/30 transition-all duration-300" />
                </div>
              )}
              <button onClick={handleStart} disabled={!name.trim() || (mode === "join" && !roomId.trim())}
                className="w-full relative overflow-hidden rounded-2xl py-4 font-bold text-white transition-all duration-300 disabled:opacity-40 hover:scale-[1.02] active:scale-[0.98] group">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative text-lg">{mode === "create" ? "🚀 Start Meeting" : "🔗 Join Meeting"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 animate-fadeUp" style={{ animationDelay:"200ms" }}>
            {[["🔒","Encrypted","End-to-end secure"],["⏱","No Limits","Unlimited duration"],["👥","100+","Participants"]].map(([icon, title, desc]) => (
              <div key={title} className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-4 text-center">
                <div className="text-2xl mb-2">{icon}</div>
                <p className="text-white font-semibold text-sm">{title}</p>
                <p className="text-white/30 text-xs">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-white/20 text-xs mt-4">Powered by Jitsi Meet — open source WebRTC</p>
        </div>
      </div>
    </div>
  );
}
