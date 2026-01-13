import { useState } from "react";

const PANEL_WIDTH = 320;
const TAB_WIDTH = 46;

export default function MusicPanel() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* 🎵 MUSIC PANEL */}
            <div
                style={{
                    position: "fixed",
                    right: open ? TAB_WIDTH + 12 : -PANEL_WIDTH,
                    top: "70%",
                    height:175,
                    transform: "translateY(-30%)",
                    width: PANEL_WIDTH,
                    padding: 22,
                    borderRadius: "22px 0 0 22px",
                    background:
                        "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(0,0,0,0.35))",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "white",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                    transition: "right 0.45s cubic-bezier(.4,0,.2,1)",
                    zIndex: 9997,
                    pointerEvents: open ? "auto" : "none",
                }}
            >
                <img
                    src="src/images/Spotify_Full_Logo_RGB_White.png"
                    alt="Spotify"
                    style={{
                        width: 300,
                        marginBottom: 10,
                        objectFit: "contain",
                        filter: "drop-shadow(0 4px 12px rgba(255,255,255,0.35))",
                    }}
                />


                <div
                    style={{
                        fontSize: 13,
                        fontFamily: "Montreal",
                        opacity: 1.85,
                        lineHeight: 1.5,
                    }}
                >
                    Spotify integration coming soon! Stay tuned for updates. Love y'all! 🎵❤️
                </div>


            </div>

            {/* 📍 MUSIC TAB (RIGHT SIDE) */}
            <div
                onClick={() => setOpen(!open)}
                style={{
                    position: "fixed",
                    right: 0,
                    top: "74.8%",
                    transform: "translateY(-50%)",
                    width: TAB_WIDTH,
                    height: 232,
                    borderRadius: "18px 0 0 18px",
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "white",
                    cursor: "pointer",
                    zIndex: 9998,
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
                    📻
                </div>
            </div>
        </>
    );
}
