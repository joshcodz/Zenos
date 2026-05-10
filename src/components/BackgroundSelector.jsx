import { useState } from "react";

const PANEL_WIDTH = 320;

const backgrounds = [
    {
        name: "Skyline",
        video: "/backgrounds/skyline.mp4",
        thumb: "/backgrounds/thumbs/Skyline.png",
        credits: {
            text: "Nissan Skyline Pink Petals \n" + "π Wallpapers",
            link: "https://www.youtube.com/@Pi_Wallpapers",
        },

    },
    {
        name: "Rain Window",
        video: "/backgrounds/Rain Window.mp4",
        thumb: "/backgrounds/thumbs/Rain Window.png",
        credits: {
            text: "Sleep Better on a Rainy Day",
            link: "https://www.youtube.com/channel/UCWL-S-7ihaYtaPPbR1zehJg",
        },
    },
    {
        name: "Forest",
        video: "/backgrounds/Forest.mp4",
        thumb: "/backgrounds/thumbs/Forest.png",
        credits: {
            text:
                "Gentle Woodland Stream",
            link: "https://www.youtube.com/@NaturescapesYouTube",
        },
    },
    {
        name: "Night City",
        video: "/backgrounds/Tokyo Night Ride🏯.mp4",
        thumb: "/backgrounds/thumbs/Tokyo Night Ride 🏯.png",
        credits: {
            text:
                "☔️Driving on the highway leading from Tokyo",
            link: "https://www.youtube.com/@RainMan_JP",
        },
    },
    {
        name: "Cafe",
        video: "/backgrounds/cafe.mp4",
        thumb: "/backgrounds/thumbs/Cafe.png",
        credits: {
            text:
                "Starbucks real coffee shop sounds",
            link: "https://www.youtube.com/@ryzalyusoff",
        },
    },
    {
        name: "Lofi Girl",
        video: "https://youtu.be/umYE_5LYg5I",
        thumb: "https://img.youtube.com/vi/umYE_5LYg5I/maxresdefault.jpg",
        credits: {
            text: "lofi hip hop radio 📚 - beats to relax/study to",
            link: "https://www.youtube.com/@LofiGirl",
        },
    },
];

export default function BackgroundSelector({ current, onChange }) {
    return (
        <div className="grid grid-cols-2 gap-3 w-full h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {backgrounds.map((bg) => {
                const active = current === bg.video;

                return (
                    <div
                        key={bg.video}
                        onClick={() => {
                            onChange(bg.video, bg.credits);
                        }}
                        className={`glass-panel overflow-hidden cursor-pointer ${active ? 'scale-105 shadow-[0_0_30px_rgba(255,255,255,0.4)] border-white/60' : 'scale-100 hover:scale-[1.02] border-white/20 hover:border-white/40'}`}
                        style={{ position: "relative", height: 110, borderRadius: 24, transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)" }}
                    >
                        <img
                            src={bg.thumb}
                            draggable={false}
                            alt={bg.name}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                opacity: active ? 1 : 0.8,
                                transition: "opacity 0.3s ease",
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%)",
                            }}
                        />

                        {/* Label */}
                        <div className="absolute bottom-3 left-0 w-full flex items-center justify-center pointer-events-none">
                            <span className={`text-xs font-bold text-center tracking-wide uppercase ${active ? 'text-white' : 'text-white/80'}`} style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                                {bg.name}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
