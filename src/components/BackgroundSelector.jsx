import { useState } from "react";

const backgrounds = [
    { name: "Skyline background", file: "/backgrounds/skyline.mp4" },
    { name: "Rain Window", file: "/backgrounds/rain.mp4" },
    { name: "Forest", file: "/backgrounds/forest.mp4" },
    { name: "Night City", file: "/backgrounds/night-city.mp4" },
    { name: "Cafe", file: "/backgrounds/cafe.mp4" },
];

export default function BackgroundSelector({ current, onChange }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* 🎨 Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                style={{
                    position: "fixed",
                    left: 16,
                    bottom: 90,
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "white",
                    fontSize: 20,
                    cursor: "pointer",
                    zIndex: 10000,
                }}
            >
                🎨
            </button>

            {/* 🎥 Selector Panel */}
            {open && (
                <div
                    style={{
                        position: "fixed",
                        left: 16,
                        bottom: 150,
                        width: 220,
                        padding: 12,
                        borderRadius: 16,
                        background: "rgba(20,20,20,0.75)",
                        backdropFilter: "blur(18px)",
                        color: "white",
                        zIndex: 10000,
                    }}
                >
                    <div style={{ fontSize: 14, marginBottom: 8 }}>
                        Choose Background
                    </div>

                    {backgrounds.map((bg) => (
                        <div
                            key={bg.file}
                            onClick={() => {
                                onChange(bg.file);
                                setOpen(false);
                            }}
                            style={{
                                padding: "8px 10px",
                                borderRadius: 10,
                                cursor: "pointer",
                                marginBottom: 6,
                                background:
                                    current === bg.file
                                        ? "rgba(255,255,255,0.18)"
                                        : "transparent",
                            }}
                        >
                            🎬 {bg.name}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
