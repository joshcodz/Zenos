import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Timer, CheckSquare, Settings2, Compass, PenTool, Focus, Quote, Link, 
    CloudSun, Activity, Code, BookOpen, HeartPulse, Target, Clock, 
    Volume2, Image as ImageIcon, ChevronRight, X
} from "lucide-react";

const SPACES = [
    { name: "Lofi Girl", video: "https://youtu.be/umYE_5LYg5I", thumb: "https://img.youtube.com/vi/umYE_5LYg5I/maxresdefault.jpg" },
    { name: "BMW M3 E46", video: "https://youtu.be/IUfA_J4eES0", thumb: "https://img.youtube.com/vi/IUfA_J4eES0/maxresdefault.jpg" },
    { name: "Nissan Skyline", video: "https://youtu.be/MObXBiYC_6Y", thumb: "https://img.youtube.com/vi/MObXBiYC_6Y/maxresdefault.jpg" },
    { name: "Study with Iron Man", video: "https://youtu.be/U5oshAjfEYY", thumb: "https://img.youtube.com/vi/U5oshAjfEYY/maxresdefault.jpg" },
    { name: "Ambient Night", video: "https://youtu.be/hMxlDbv-rec", thumb: "https://img.youtube.com/vi/hMxlDbv-rec/maxresdefault.jpg" },
    { name: "City Rain", video: "https://youtu.be/2UxbnP-6ZlM", thumb: "https://img.youtube.com/vi/2UxbnP-6ZlM/maxresdefault.jpg" },
    { name: "Evening Drive", video: "https://youtu.be/31RokLEvUhg", thumb: "https://img.youtube.com/vi/31RokLEvUhg/maxresdefault.jpg" },
    { name: "Cyberpunk City", video: "https://youtu.be/1hsVWbcnEyc", thumb: "https://img.youtube.com/vi/1hsVWbcnEyc/maxresdefault.jpg" },
    { name: "Mountain View", video: "https://youtu.be/Z90rTdVoomY", thumb: "https://img.youtube.com/vi/Z90rTdVoomY/maxresdefault.jpg" },
    { name: "Quiet Room", video: "https://youtu.be/E8fiyj1hNwk", thumb: "https://img.youtube.com/vi/E8fiyj1hNwk/maxresdefault.jpg" },
    { name: "Starry Night", video: "https://youtu.be/Yz-pDiVo6ZQ", thumb: "https://img.youtube.com/vi/Yz-pDiVo6ZQ/maxresdefault.jpg" },
];

export default function CommandCapsule({ zenMode, setZenMode, settingsOpen, setSettingsOpen }) {
    const [hovered, setHovered] = useState(false);
    const [spacesOpen, setSpacesOpen] = useState(false);
    const [volume, setVolume] = useState(Number(localStorage.getItem("gradiumx-volume")) || 50);

    const toggleWidget = (key) => {
        const current = localStorage.getItem(key) === "true";
        localStorage.setItem(key, String(!current));
        
        if (key.includes("pomodoro")) window.dispatchEvent(new Event("gradiumx-pomodoro-update"));
        if (key.includes("todo")) window.dispatchEvent(new Event("gradiumx-todo-update"));
        if (key.includes("weather")) window.dispatchEvent(new Event("gradiumx-weather-update"));
        if (key.includes("analytics")) window.dispatchEvent(new Event("gradiumx-analytics-update"));
        if (key.includes("showclock")) window.location.reload();
        if (key.includes("codescratchpad")) window.dispatchEvent(new Event("gradiumx-codescratchpad-update"));
        if (key.includes("flashcards")) window.dispatchEvent(new Event("gradiumx-flashcards-update"));
        if (key.includes("breathing")) window.dispatchEvent(new Event("gradiumx-breathing-update"));
        if (key.includes("intention")) window.dispatchEvent(new Event("gradiumx-intention-update"));
        if (key.includes("heatmap")) window.dispatchEvent(new Event("gradiumx-heatmap-update"));
        if (key.includes("study")) window.dispatchEvent(new Event("gradiumx-study-update"));
        if (key.includes("motivation")) window.dispatchEvent(new Event("gradiumx-motivation-update"));
        if (key.includes("quicklinks")) window.dispatchEvent(new Event("gradiumx-quicklinks-update"));
    };

    const handleVolumeChange = (e) => {
        const val = Number(e.target.value);
        setVolume(val);
        window.dispatchEvent(new CustomEvent("gradiumx-volume-update", { detail: val }));
    };

    const setSpace = (video) => {
        localStorage.setItem("bg", video);
        window.location.reload();
    };

    return (
        <div 
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[10001]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                setSpacesOpen(false);
            }}
        >
            <motion.div 
                layout
                initial={{ borderRadius: 9999 }}
                animate={{
                    width: hovered ? "min(95vw, 920px)" : 160,
                    height: hovered ? 92 : 48,
                    borderRadius: hovered ? 32 : 9999,
                    backgroundColor: zenMode ? (hovered ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0)") : "rgba(255,255,255,0.15)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`glass-drop overflow-visible flex items-center relative custom-scrollbar ${!hovered ? 'justify-center' : 'justify-start'} ${zenMode && !hovered ? '!border-transparent !shadow-none' : ''}`}
            >
                <AnimatePresence mode="wait">
                    {!hovered ? (
                        <motion.div 
                            key="collapsed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-white/90"
                        >
                            {zenMode ? (
                                <><Focus size={16} className="text-[#B6E0FF]" /> <span className="text-sm font-semibold tracking-wider uppercase text-[#B6E0FF]">Zen Mode</span></>
                            ) : (
                                <><Compass size={16} /> <span className="text-sm font-semibold tracking-widest uppercase">Command</span></>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="expanded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center h-full px-8 gap-8 whitespace-nowrap min-w-max pb-1"
                        >
                            {/* Workspaces */}
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => {
                                        localStorage.setItem("gradiumx-intent", "Coding");
                                        window.dispatchEvent(new Event("gradiumx-intent-update"));
                                    }}
                                    className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all ${localStorage.getItem("gradiumx-intent") === "Coding" ? 'bg-[#B6E0FF]/20 text-[#B6E0FF]' : 'text-white/40 hover:text-white/70'}`}
                                >
                                    <Code size={18} />
                                    <span className="text-[8px] font-black uppercase tracking-tighter">Code</span>
                                </button>
                                <button 
                                    onClick={() => {
                                        localStorage.setItem("gradiumx-intent", "Studying");
                                        window.dispatchEvent(new Event("gradiumx-intent-update"));
                                    }}
                                    className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all ${localStorage.getItem("gradiumx-intent") === "Studying" ? 'bg-[#B6FFDB]/20 text-[#B6FFDB]' : 'text-white/40 hover:text-white/70'}`}
                                >
                                    <BookOpen size={18} />
                                    <span className="text-[8px] font-black uppercase tracking-tighter">Study</span>
                                </button>
                                <button 
                                    onClick={() => {
                                        localStorage.setItem("gradiumx-intent", "Deep Work");
                                        window.dispatchEvent(new Event("gradiumx-intent-update"));
                                    }}
                                    className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all ${localStorage.getItem("gradiumx-intent") === "Deep Work" ? 'bg-[#FFB6FF]/20 text-[#FFB6FF]' : 'text-white/40 hover:text-white/70'}`}
                                >
                                    <Target size={18} />
                                    <span className="text-[8px] font-black uppercase tracking-tighter">Deep</span>
                                </button>
                            </div>

                            <div className="w-[1px] h-8 bg-white/10 mx-1" />

                            {/* Spaces Trigger */}
                            <div className="relative">
                                <button 
                                    onClick={() => setSpacesOpen(!spacesOpen)}
                                    className={`flex flex-col items-center gap-1 transition-all ${spacesOpen ? 'text-[#B6E0FF]' : 'text-white/70 hover:text-white'}`}
                                >
                                    <ImageIcon size={18} />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Spaces</span>
                                </button>

                                {/* Spaces Preview Dropdown */}
                                <AnimatePresence>
                                    {spacesOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 glass-panel p-4 w-[480px] grid grid-cols-3 gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[10002]"
                                        >
                                            {SPACES.map((space) => (
                                                <button
                                                    key={space.video}
                                                    onClick={() => setSpace(space.video)}
                                                    className={`group relative overflow-hidden rounded-2xl h-24 border transition-all ${localStorage.getItem("bg") === space.video ? 'border-[#B6E0FF] scale-105 z-10' : 'border-white/10 hover:border-white/30 hover:scale-[1.02]'}`}
                                                >
                                                    <img src={space.thumb} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={space.name} />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-2">
                                                        <span className="text-[9px] font-black uppercase tracking-tighter text-white drop-shadow-md">{space.name}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="w-[1px] h-8 bg-white/10 mx-1" />

                            {/* Volume */}
                            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                                <Volume2 size={18} className="text-white/60" />
                                <input 
                                    type="range"
                                    min="0" max="100"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="w-24 h-1 bg-white/20 rounded-full appearance-none accent-white cursor-pointer"
                                />
                                <span className="text-[10px] font-bold text-white/40 w-6">{volume}%</span>
                            </div>

                            <div className="w-[1px] h-8 bg-white/10 mx-1" />

                            {/* Standard Tools */}
                            <div className="flex items-center gap-4">
                                <button onClick={() => toggleWidget("gradiumx-showclock")} className={`flex flex-col items-center gap-1 transition-colors ${localStorage.getItem("gradiumx-showclock") === "false" ? 'text-white/20' : 'text-white/70 hover:text-white'}`}>
                                    <Clock size={18} />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Clock</span>
                                </button>
                                <button onClick={() => toggleWidget("gradiumx-pomodoro-enabled")} className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                                    <Timer size={18} />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Focus</span>
                                </button>
                                <button onClick={() => toggleWidget("gradiumx-todo-enabled")} className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                                    <CheckSquare size={18} />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Tasks</span>
                                </button>
                                <button onClick={() => toggleWidget("gradiumx-motivation-enabled")} className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                                    <Quote size={18} />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Quote</span>
                                </button>
                                <button onClick={() => toggleWidget("gradiumx-quicklinks-enabled")} className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                                    <Link size={18} />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Links</span>
                                </button>
                            </div>

                            <div className="w-[1px] h-8 bg-white/10 mx-1" />

                            {/* System */}
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setZenMode(!zenMode)}
                                    className={`flex flex-col items-center gap-1 transition-all ${zenMode ? 'text-[#B6E0FF]' : 'text-white/70 hover:text-white'}`}
                                >
                                    <Focus size={18} />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">{zenMode ? 'Exit' : 'Zen'}</span>
                                </button>
                                <button 
                                    onClick={() => setSettingsOpen(true)}
                                    className={`flex flex-col items-center gap-1 transition-all ${settingsOpen ? 'text-white' : 'text-white/70 hover:text-white'}`}
                                >
                                    <Settings2 size={18} />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Settings</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
