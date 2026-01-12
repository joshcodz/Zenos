import { useEffect, useRef, useState } from "react";

/* ✅ MASTER PLAYLIST */
const playlist = [
    { title: "Aurai - Our Dawn", file: "/music/Aurai - Our Dawn.mp3" },
    { title: "Lookz - Childhood Dreams", file: "/music/Chillstep  Lookz - Childhood Dreams.mp3" },
    { title: "Wiljan & cluda - The Unknown", file: "/music/Wiljan & cluda - The Unknown.mp3" },
];

export default function Music({ onClose }) {
    const audioRef = useRef(null);

    const [index, setIndex] = useState(
        Number(localStorage.getItem("music-index")) || 0
    );
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(
        Number(localStorage.getItem("music-volume")) || 0.75
    );
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(1);

    /* ---------------- Load Track ---------------- */

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.src = playlist[index].file;
        audio.volume = volume;
        audio.load();
        localStorage.setItem("music-index", index);
    }, [index]);

    /* ---------------- Sync Progress ---------------- */

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const id = setInterval(() => {
            setProgress(audio.currentTime || 0);
            setDuration(audio.duration || 1);
            setPlaying(!audio.paused);
        }, 200);

        return () => clearInterval(id);
    }, []);

    function togglePlay() {
        const audio = audioRef.current;
        if (!audio) return;
        audio.paused ? audio.play() : audio.pause();
    }

    function nextTrack() {
        setIndex((prev) => (prev + 1) % playlist.length);
    }

    function seek(t) {
        audioRef.current.currentTime = t;
    }

    function changeVolume(v) {
        audioRef.current.volume = v;
        setVolume(v);
        localStorage.setItem("music-volume", v);
    }

    /* ---------------- Styles ---------------- */

    const panel = {
        width: 390,
        padding: 22,
        borderRadius: 26,
        background:
            "linear-gradient(180deg, rgba(35,35,40,0.75), rgba(10,10,15,0.75))",
        backdropFilter: "blur(26px)",
        color: "white",
        boxShadow:
            "0 30px 60px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.06)",
    };

    const title = {
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: 0.4,
        opacity: 0.92,
        marginBottom: 14,
    };

    const controlsRow = {
        display: "flex",
        justifyContent: "center",
        gap: 14,
        marginTop: 18,
    };

    const controlButton = {
        minWidth: 50,
        height: 42,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.25)",
        background:
            "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))",
        backdropFilter: "blur(14px)",
        color: "white",
        cursor: "pointer",
        fontSize: 18,
        transition: "all 0.2s ease",
        boxShadow: "0 8px 18px rgba(0,0,0,0.35)",
    };

    return (
        <div style={panel}>
            <audio ref={audioRef} />

            {/* 🎧 Track Title */}
            <div style={title}>🎧 {playlist[index].title}</div>

            {/* ⏱ Progress */}
            <div className="slider-wrap">
                <input
                    className="glass-slider"
                    type="range"
                    min="0"
                    max={duration}
                    value={progress}
                    onChange={(e) => seek(Number(e.target.value))}
                />
            </div>

            {/* 🔊 Volume */}
            <div className="slider-wrap small">
                <input
                    className="glass-slider volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => changeVolume(Number(e.target.value))}
                />
            </div>

            {/* 🎛 Controls */}
            <div style={controlsRow}>
                <button
                    style={controlButton}
                    className="glass-btn"
                    onClick={togglePlay}
                >
                    {playing ? "⏸" : "▶"}
                </button>

                <button
                    style={controlButton}
                    className="glass-btn"
                    onClick={nextTrack}
                >
                    ⏭
                </button>

                <button
                    style={controlButton}
                    className="glass-btn"
                    onClick={onClose}
                >
                    ⬇
                </button>
            </div>

            {/* 🎨 Custom Slider Styling */}
            <style>{`
        .slider-wrap {
          margin-bottom: 12px;
        }

        .slider-wrap.small {
          margin-bottom: 4px;
          opacity: 0.85;
        }

        .glass-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            #3b82f6,
            #60a5fa,
            #93c5fd
          );
          outline: none;
          cursor: pointer;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
        }

        .glass-slider.volume {
          height: 6px;
          background: linear-gradient(
            90deg,
            #22c55e,
            #4ade80
          );
        }

        .glass-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          box-shadow: 
            0 0 16px rgba(96,165,250,1),
            0 4px 10px rgba(0,0,0,0.5);
          border: none;
        }

        .glass-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: none;
        }

        .glass-btn:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 14px 30px rgba(0,0,0,0.55);
        }

        .glass-btn:active {
          transform: scale(0.94);
        }
      `}</style>
        </div>
    );
}
