import { useRef, useState, useEffect } from "react";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = muted;
    }
  }, [volume, muted]);

  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-2 z-50">
      <audio ref={audioRef} src="/jingle.mp3" loop autoPlay />
      <button
        onClick={() => setMuted((m) => !m)}
        className="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded"
      >
        {muted ? "🔇" : "🔊"}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={muted ? 0 : volume}
        onChange={(e) => {
          setVolume(Number(e.target.value));
          if (e.target.value === "0") setMuted(true);
          else setMuted(false);
        }}
        className="w-24"
      />
    </div>
  );
}
