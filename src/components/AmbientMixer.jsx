import { useEffect, useRef, useState } from "react";
import { Headphones, Volume2 } from "lucide-react";

/* 🎵 Matches your exact filenames */
const sounds = [
    { id: "rain", label: "🌧 Rain", file: "/ambient/rain.mp3" },
    { id: "cafe", label: "☕ Cafe", file: "/ambient/cafe.mp3" },
    { id: "wind", label: "🌬 Wind", file: "/ambient/wind.mp3" },
    { id: "fire", label: "🔥 Fire", file: "/ambient/fire.mp3" },
    { id: "ocean", label: "🌊 Ocean", file: "/ambient/ocean%20waves.mp3" },
];

export default function AmbientMixer() {
    const audioRefs = useRef({});

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
                audio.play().catch(() => {});
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

    const activeSounds = sounds.filter((s) => state[s.id].enabled);

    return (
        <div className="flex flex-col w-full h-[300px]">
            {/* 🎯 Sound Selectors */}
            <div className="flex flex-wrap gap-2 mb-6">
                {sounds.map((s) => {
                    const active = state[s.id].enabled;
                    return (
                        <button
                            key={s.id}
                            onClick={() => toggleSound(s.id)}
                            className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full border ${
                                active 
                                    ? "bg-white/20 border-white/50 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/30"
                            }`}
                        >
                            {s.label}
                        </button>
                    );
                })}
            </div>

            {/* 🎚 Volume Controls */}
            <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2">
                {activeSounds.length === 0 && (
                    <div className="text-white/40 text-sm italic text-center py-4">
                        Select a sound above to mix
                    </div>
                )}

                {activeSounds.map((s) => (
                    <div key={s.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10">
                        <div className="w-16 text-sm font-medium text-white/90 truncate">
                            {s.label.split(' ')[1]}
                        </div>
                        <Volume2 size={16} className="text-white/60 shrink-0" />
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={state[s.id].volume}
                            onChange={(e) => setVolume(s.id, Number(e.target.value))}
                            className="flex-1 accent-white h-1.5 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer hover:[&::-webkit-slider-thumb]:scale-125 [&::-webkit-slider-thumb]:transition-transform"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
