import { useState } from "react";

const PANEL_WIDTH = 280;
const TAB_WIDTH = 44;

const backgrounds = [
    {
        name:    "Skyline",
        video:   "/backgrounds/skyline.mp4",
        thumb:   "/backgrounds/thumbs/Skyline.png",
        credits : {
            text: "Nissan Skyline Pink Petals \n" + "π Wallpapers",
            link: "https://www.youtube.com/@Pi_Wallpapers",
        },

    },
    {
        name: "Rain Window",
        video: "/backgrounds/Rain Window.mp4",
        thumb: "/backgrounds/thumbs/Rain Window.png",
        credits : {
            text: "Sleep Better on a Rainy Day",
            link: "https://www.youtube.com/channel/UCWL-S-7ihaYtaPPbR1zehJg",
    },
    },
    {
        name: "Forest",
        video: "/backgrounds/Forest.mp4",
        thumb: "/backgrounds/thumbs/Forest.png",
        credits : {
            text:
                "Gentle Woodland Stream",
            link: "https://www.youtube.com/@NaturescapesYouTube",
        },
    },
    {
        name: "Night City",
        video: "/backgrounds/Tokyo Night Ride🏯.mp4",
        thumb: "/backgrounds/thumbs/Tokyo Night Ride 🏯.png",
        credits : {
            text:
                "☔️Driving on the highway leading from Tokyo",
            link: "https://www.youtube.com/@RainMan_JP",
        },
    },
    {
        name: "Cafe",
        video: "/backgrounds/cafe.mp4",
        thumb: "/backgrounds/thumbs/Cafe.png",
        credits : {
            text:
                "Starbucks real coffee shop sounds",
            link: "https://www.youtube.com/@ryzalyusoff",
        },
    },
];

export default function BackgroundSelector({ current, onChange }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* 🌄 Floating Thumbnails Container */}
            <div
                style={{
                    position: "fixed",
                    left: open ? 60 : -PANEL_WIDTH,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: PANEL_WIDTH,
                    padding: 8,
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 12,

                    /* ❌ No background */
                    background: "transparent",

                    transition: "left 0.45s cubic-bezier(.4,0,.2,1)",
                    zIndex: 9998,
                    pointerEvents: open ? "auto" : "none",
                }}
            >
                {backgrounds.map((bg) => {
                    const active = current === bg.video;

                    return (
                        <div
                            key={bg.video}
                            onClick={() => {
                                onChange(bg.video, bg.credits);
                                setOpen(false);
                            }}
                            style={{
                                position: "relative",
                                height: 110,
                                borderRadius: 18,
                                overflow: "hidden",
                                cursor: "pointer",

                                /* ✨ Floating card look */
                                backdropFilter: "blur(10px)",
                                border: active
                                    ? "2px solid rgba(255,255,255,0.9)"
                                    : "1px solid rgba(255,255,255,0.25)",

                                boxShadow: active
                                    ? "0 0 18px rgba(255,255,255,0.8)"
                                    : "0 12px 35px rgba(0,0,0,0.45)",

                                transform: active ? "scale(1.05)" : "scale(1)",
                                transition: "all 0.25s ease",
                            }}
                        >
                            <img
                                src={bg.thumb}
                                draggable={false}
                                alt={bg.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            {/* Soft gradient for text */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
                                }}
                            />

                            {/* Label */}
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 8,
                                    left: 10,
                                    fontSize: 12,
                                    fontWeight: 500,
                                    color: "white",
                                    textShadow: "0 2px 6px rgba(0,0,0,0.7)",
                                }}
                            >
                                {bg.name}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 📍 SPACES TAB */}
            <div
                onClick={() => setOpen(!open)}
                style={{
                    position: "fixed",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: TAB_WIDTH,
                    height: 200,
                    borderRadius: "0 18px 18px 0",
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
                }}
            >
                <div
                    style={{
                        writingMode: "vertical-rl",
                        textOrientation: "upright",
                        fontSize: 15,
                        letterSpacing: 3,
                        fontWeight: 500,
                        opacity: 0.9,
                        userSelect: "none",
                    }}
                >
                    SPACES
                </div>
            </div>
        </>
    );
}
