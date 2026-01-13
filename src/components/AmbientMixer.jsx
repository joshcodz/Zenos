import { useEffect, useRef, useState } from "react";

/* 🎵 Matches your exact filenames */
const sounds = [
    { id: "rain", label: "🌧 Rain", file: "/ambient/rain.mp3" },
    { id: "cafe", label: "☕ Cafe", file: "/ambient/cafe.mp3" },
    { id: "wind", label: "🌬 Wind", file: "/ambient/wind.mp3" },
    { id: "fire", label: "🔥 Fire", file: "/ambient/fire.mp3" },
    { id: "ocean", label: "🌊 Ocean", file: "/ambient/ocean%20waves.mp3" },
];

const PANEL_WIDTH = 360;
const TAB_WIDTH = 46;

export default function AmbientMixer() {
    const audioRefs = useRef({});
    const [open, setOpen] = useState(false);

    const [state, setState] = useState(() =>
        Object.fromEntries(
            sounds.map((s) => [
                s.id,
                { enabled: false, volume: 0.5 },
            ])
        )
    );

    /* Initialize players */
    useEffect(() => {
        sounds.forEach((s) => {
            const audio = new Audio(s.file);
            audio.loop = true;
            audio.volume = state[s.id].volume;
            audioRefs.current[s.id] = audio;
        });

        return () => {
            Object.values(audioRefs.current).forEach((a) => a.pause());
        };
    }, []);

    function toggleSound(id) {
        const audio = audioRefs.current[id];

        setState((prev) => {
            const enabled = !prev[id].enabled;

            if (enabled) {
                audio.currentTime = 0;
                audio.play();
            } else {
                audio.pause();
            }

            return {
                ...prev,
                [id]: { ...prev[id], enabled },
            };
        });
    }

    function setVolume(id, volume) {
        audioRefs.current[id].volume = volume;

        setState((prev) => ({
            ...prev,
            [id]: { ...prev[id], volume },
        }));
    }

    const activeSounds = sounds.filter(
        (s) => state[s.id].enabled
    );

    return (
        <>
            {/* 🎚 Mixer Panel */}
            <div
                style={{
                    position: "fixed",
                    right: open ? TAB_WIDTH + 12 : -PANEL_WIDTH,
                    top: "32%",
                    transform: "translateY(-50%)",
                    width: PANEL_WIDTH,
                    padding: 20,
                    borderRadius: "22px 0 0 22px",
                    background:
                        "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(0,0,0,0.35))",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "white",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                    transition: "right 0.45s cubic-bezier(.4,0,.2,1)",
                    zIndex: 9998,
                    pointerEvents: open ? "auto" : "none",
                }}
            >
                <div style={{ fontSize: 16, marginBottom: 14 }}>
                    🎧 Ambient Sounds
                </div>

                {/* 🎯 Sound Selectors */}
                <div
                    style={{
                        display: "flex",
                        gap: 10,
                        flexWrap: "wrap",
                        marginBottom: 18,
                    }}
                >
                    {sounds.map((s) => {
                        const active = state[s.id].enabled;

                        return (
                            <button
                                key={s.id}
                                onClick={() => toggleSound(s.id)}
                                style={{
                                    padding: "8px 14px",
                                    borderRadius: 18,
                                    fontSize: 14,
                                    cursor: "pointer",
                                    border: "1px solid rgba(255,255,255,0.25)",
                                    background: active
                                        ? "rgba(255,255,255,0.85)"
                                        : "rgba(255,255,255,0.15)",
                                    color: active ? "#000" : "#fff",
                                    transition: "0.2s ease",
                                }}
                            >
                                {s.label}
                            </button>
                        );
                    })}
                </div>

                {/* 🎚 Volume Controls */}
                {activeSounds.length === 0 && (
                    <div
                        style={{
                            fontSize: 12,
                            opacity: 0.6,
                            textAlign: "center",
                        }}
                    >
                        Select a sound above 🎵
                    </div>
                )}

                {activeSounds.map((s) => (
                    <div
                        key={s.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 12,
                        }}
                    >
                        <div style={{ width: 90, fontSize: 13 }}>
                            {s.label}
                        </div>

                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={state[s.id].volume}
                            onChange={(e) =>
                                setVolume(
                                    s.id,
                                    Number(e.target.value)
                                )
                            }
                            style={{
                                flex: 1,
                                accentColor: "white",
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* 📍 RIGHT TAB BUTTON */}
            <div
                onClick={() => setOpen(!open)}
                style={{
                    position: "fixed",
                    right: 0,
                    top: "32%",
                    transform: "translateY(-50%)",
                    width: TAB_WIDTH,
                    height: 200,
                    borderRadius: "18px 0 0 18px",
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "white",
                    cursor: "pointer",
                    zIndex: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 22px rgba(255,255,255,0.35)",
                    userSelect: "none",
                }}
            >
                <div
                    style={{
                        writingMode: "vertical-rl",
                        textOrientation: "upright",
                        fontSize: 14,
                        letterSpacing: 3,
                        fontWeight: 500,
                        opacity: 0.9,
                    }}
                >
                    SOUNDS
                </div>
            </div>
        </>
    );
}
