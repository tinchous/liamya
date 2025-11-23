import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

let audio = null;

export default function JinglePlayer() {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);

  useEffect(() => {
    // Creamos el audio UNA SOLA VEZ
    if (!audio) {
      audio = new Audio("/jingle.mp3");
      audio.loop = true;
      audio.volume = volume;
      audio.play().catch(() => {}); // Autoplay puede fallar en algunos navegadores
    }

    return () => {
      // Nunca se destruye
    };
  }, []);

  useEffect(() => {
    if (audio) {
      audio.volume = muted ? 0 : volume;
    }
  }, [muted, volume]);

  // No se muestra en admin
  if (window.location.pathname.includes("/admin")) return null;

  return (
    <div className="fixed bottom-8 left-8 z-50 bg-black/90 border-4 border-orange-500 rounded-3xl p-6 shadow-2xl flex items-center gap-6">
      <button onClick={() => setMuted(!muted)} className="text-orange-500 hover:text-orange-400 transition">
        {muted ? <VolumeX className="w-12 h-12" /> : <Volume2 className="w-12 h-12" />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-48 accent-orange-500 h-3"
      />
      <span className="text-orange-400 font-bold text-xl"></span>
    </div>
  );
}
