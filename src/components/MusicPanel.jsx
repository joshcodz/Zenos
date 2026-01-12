import { playlist, setTrack, getIndex } from "../audioEngine";
import { useState } from "react";

export default function MusicPanel({ onClose }) {
    const [current, setCurrent] = useState(getIndex());

    return (
        <div
            style={{
                width: 360,
                padding: 18,
                borderRadius: 20,
                background: "rgba(20,20,20,0.6)",
                backdropFilter: "blur(18px)",
                color: "white",
            }}
        >
            <div style={{ fontSize: 16, marginBottom: 12 }}>🎵 Playlist</div>

            {playlist.map((track, i) => (
                <div
                    key={i}
                    onClick={() => {
                        setTrack(i);
                        setCurrent(i);
                    }}
                    style={{
                        padding: "10px 12px",
                        borderRadius: 10,
                        cursor: "pointer",
                        marginBottom: 6,
                        background:
                            current === i
                                ? "rgba(255,255,255,0.18)"
                                : "transparent",
                    }}
                >
                    {track.title}
                </div>
            ))}

            <button
                onClick={onClose}
                style={{
                    marginTop: 12,
                    width: "100%",
                    height: 36,
                    borderRadius: 12,
                    border: "none",
                    background: "rgba(255,255,255,0.15)",
                    color: "white",
                    cursor: "pointer",
                }}
            >
                ⬇ Minimize
            </button>
        </div>
    );
}
