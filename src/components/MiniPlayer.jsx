import { useEffect, useState } from "react";
import {
    play,
    pause,
    next,
    seek,
    getAudio,
    playlist,
    getIndex,
} from "../audioEngine";

export default function MiniPlayer() {
    const audio = getAudio();

    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(1);
    const [playing, setPlaying] = useState(false);
    const [trackIndex, setTrackIndex] = useState(getIndex());

    /* Sync audio */
    useEffect(() => {
        const id = setInterval(() => {
            setProgress(audio.currentTime || 0);
            setDuration(audio.duration || 1);
            setPlaying(!audio.paused);
            setTrackIndex(getIndex());
        }, 200);

        return () => clearInterval(id);
    }, []);

    function formatTime(t) {
        if (!t || isNaN(t)) return "0:00";
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    }

    const track = playlist[trackIndex];

    return (
        <>
            {/* 🎵 Floating Reactive Button */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className={`music-fab ${playing ? "playing" : ""}`}
                >
                    🎵
                    <span className="pulse-ring" />
                </button>
            )}

            {/* 🎛 Player Panel */}
            <div
                style={{
                    position: "fixed",
                    right: 20,
                    bottom: 80,
                    width: 560,
                    padding: "20px 26px",
                    borderRadius: 30,
                    background:
                        "linear-gradient(180deg, rgba(20,20,30,0.55), rgba(10,10,15,0.55))",
                    backdropFilter: "blur(30px)",
                    boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
                    color: "white",
                    zIndex: 9999,
                    transform: open ? "translateX(0)" : "translateX(120%)",
                    transition: "transform 0.45s cubic-bezier(.4,0,.2,1)",
                    pointerEvents: open ? "auto" : "none",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 12,
                    }}
                >
                    <div>
                        <div style={{ fontSize: 20, fontWeight: 600 }}>
                            {track?.title}
                        </div>
                        <div style={{ fontSize: 13, opacity: 0.6 }}>
                            Now Playing
                        </div>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "white",
                            fontSize: 20,
                            cursor: "pointer",
                            opacity: 0.7,
                        }}
                    >
                        ➤
                    </button>
                </div>

                {/* Controls */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 20,
                        marginBottom: 14,
                    }}
                >
                    <button className="icon-btn">⏮</button>

                    <button
                        className="play-btn"
                        onClick={() => (playing ? pause() : play())}
                    >
                        {playing ? "⏸" : "▶"}
                    </button>

                    <button className="icon-btn" onClick={next}>
                        ⏭
                    </button>
                </div>

                {/* Progress */}
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={progress}
                    onChange={(e) => seek(Number(e.target.value))}
                    className="progress"
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 11,
                        opacity: 0.6,
                        marginTop: 6,
                    }}
                >
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* 🎨 Styles */}
            <style>{`
        /* Floating button */
        .music-fab {
          position: fixed;
          right: 16px;
          bottom: 90px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(14px);
          color: white;
          font-size: 24px;
          cursor: pointer;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 18px rgba(255,255,255,0.35);
          transition: transform 0.25s ease;
          overflow: hidden;
        }

        .music-fab:hover {
          transform: scale(1.1);
        }

        /* Pulse ring */
        .pulse-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.6);
          opacity: 0;
          pointer-events: none;
        }

        /* Active animation */
        .music-fab.playing {
          animation: beat 1.2s infinite ease-in-out;
          box-shadow: 0 0 28px rgba(255,255,255,0.7);
        }

        .music-fab.playing .pulse-ring {
          animation: ripple 1.5s infinite ease-out;
        }

        @keyframes beat {
          0% { transform: scale(1); }
          50% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        /* Player buttons */
        .play-btn {
          width: 62px;
          height: 62px;
          border-radius: 50%;
          border: none;
          background: white;
          color: black;
          font-size: 22px;
          cursor: pointer;
          box-shadow: 0 12px 35px rgba(0,0,0,0.6);
          transition: 0.2s;
        }

        .play-btn:hover { transform: scale(1.12); }

        .icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          color: white;
          cursor: pointer;
          font-size: 15px;
          transition: 0.2s;
        }

        .icon-btn:hover { transform: scale(1.15); }

        .progress {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(90deg, #ffffff, #dddddd);
        }

        .progress::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 14px rgba(255,255,255,0.9);
        }
      `}</style>
        </>
    );
}
