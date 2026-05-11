import { useState } from "react";

const backgrounds = [
    {
        name: "Lofi Girl",
        video: "https://youtu.be/umYE_5LYg5I",
        thumb: "https://img.youtube.com/vi/umYE_5LYg5I/maxresdefault.jpg",
        credits: {
            text: "lofi hip hop radio 📚 - beats to relax/study to",
            link: "https://www.youtube.com/@LofiGirl",
        },
    },
    {
        name: "BMW M3 E46",
        video: "https://youtu.be/IUfA_J4eES0",
        thumb: "https://img.youtube.com/vi/IUfA_J4eES0/maxresdefault.jpg",
        credits: {
            text: "BMW M3 E46 - Aesthetic Drive",
            link: "https://youtu.be/IUfA_J4eES0",
        },
    },
    {
        name: "Nissan Skyline",
        video: "https://youtu.be/MObXBiYC_6Y",
        thumb: "https://img.youtube.com/vi/MObXBiYC_6Y/maxresdefault.jpg",
        credits: {
            text: "Nissan Skyline R34 - Midnight City",
            link: "https://youtu.be/MObXBiYC_6Y",
        },
    },
    {
        name: "Ambient Night",
        video: "https://youtu.be/hMxlDbv-rec",
        thumb: "https://img.youtube.com/vi/hMxlDbv-rec/maxresdefault.jpg",
        credits: {
            text: "Calm Night Atmosphere",
            link: "https://youtu.be/hMxlDbv-rec",
        },
    },
    {
        name: "City Rain",
        video: "https://youtu.be/2UxbnP-6ZlM",
        thumb: "https://img.youtube.com/vi/2UxbnP-6ZlM/maxresdefault.jpg",
        credits: {
            text: "Rainy City Streets",
            link: "https://youtu.be/2UxbnP-6ZlM",
        },
    },
    {
        name: "Study with Iron Man",
        video: "https://youtu.be/U5oshAjfEYY",
        thumb: "https://img.youtube.com/vi/U5oshAjfEYY/maxresdefault.jpg",
        credits: {
            text: "Iron Man - Stark Industries Ambience",
            link: "https://youtu.be/U5oshAjfEYY",
        },
    },
    {
        name: "Evening Drive",
        video: "https://youtu.be/31RokLEvUhg",
        thumb: "https://img.youtube.com/vi/31RokLEvUhg/maxresdefault.jpg",
        credits: {
            text: "Golden Hour Drive",
            link: "https://youtu.be/31RokLEvUhg",
        },
    },
    {
        name: "Cyberpunk City",
        video: "https://youtu.be/1hsVWbcnEyc",
        thumb: "https://img.youtube.com/vi/1hsVWbcnEyc/maxresdefault.jpg",
        credits: {
            text: "Cyberpunk 2077 Night City",
            link: "https://youtu.be/1hsVWbcnEyc",
        },
    },
    {
        name: "Mountain View",
        video: "https://youtu.be/Z90rTdVoomY",
        thumb: "https://img.youtube.com/vi/Z90rTdVoomY/maxresdefault.jpg",
        credits: {
            text: "Alpine Serenity",
            link: "https://youtu.be/Z90rTdVoomY",
        },
    },
    {
        name: "Quiet Room",
        video: "https://youtu.be/E8fiyj1hNwk",
        thumb: "https://img.youtube.com/vi/E8fiyj1hNwk/maxresdefault.jpg",
        credits: {
            text: "Cozy Studio Ambience",
            link: "https://youtu.be/E8fiyj1hNwk",
        },
    },
    {
        name: "Starry Night",
        video: "https://youtu.be/Yz-pDiVo6ZQ",
        thumb: "https://img.youtube.com/vi/Yz-pDiVo6ZQ/maxresdefault.jpg",
        credits: {
            text: "Cosmic Wonder",
            link: "https://youtu.be/Yz-pDiVo6ZQ",
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

                        <div className="absolute bottom-3 left-0 w-full flex items-center justify-center pointer-events-none px-2 text-center">
                            <span className={`text-[10px] font-bold tracking-wide uppercase ${active ? 'text-white' : 'text-white/80'}`} style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                                {bg.name}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
