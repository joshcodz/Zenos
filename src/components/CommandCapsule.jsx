import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, CheckSquare, Settings2, Compass, PenTool, Focus, Quote, Link, CloudSun, Activity } from "lucide-react";

export default function CommandCapsule({ zenMode, setZenMode, settingsOpen, setSettingsOpen }) {
    const [hovered, setHovered] = useState(false);

    function toggleWidget(key) {
        const current = localStorage.getItem(key) === "true";
        localStorage.setItem(key, String(!current));
        
        // Dispatch the corresponding event to update the widget
        if (key.includes("pomodoro")) window.dispatchEvent(new Event("gradiumx-pomodoro-update"));
        if (key.includes("motivation")) window.dispatchEvent(new Event("gradiumx-motivation-update"));
        if (key.includes("quicklinks")) window.dispatchEvent(new Event("gradiumx-quicklinks-update"));
        if (key.includes("todo")) window.dispatchEvent(new Event("gradiumx-todo-update"));
        if (key.includes("weather")) window.dispatchEvent(new Event("gradiumx-weather-update"));
        if (key.includes("analytics")) window.dispatchEvent(new Event("gradiumx-analytics-update"));
    }

    return (
        <div 
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[10001]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <motion.div 
                layout
                initial={{ borderRadius: 9999 }}
                animate={{
                    width: hovered ? 600 : 160,
                    height: hovered ? 80 : 48,
                    borderRadius: hovered ? 32 : 9999,
                    backgroundColor: zenMode ? (hovered ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0)") : "rgba(255,255,255,0.15)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`glass-drop overflow-hidden flex items-center justify-center relative ${zenMode && !hovered ? '!border-transparent !shadow-none' : ''}`}
            >
                <AnimatePresence mode="wait">
                    {!hovered ? (
                        <motion.div 
                            key="collapsed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
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
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-6 w-full px-8 justify-between"
                        >
                            {/* Focus/Zen Mode Toggle */}
                            <button 
                                onClick={() => setZenMode(!zenMode)}
                                className={`flex flex-col items-center gap-1 transition-all ${zenMode ? 'text-[#B6E0FF]' : 'text-white/70 hover:text-white'}`}
                            >
                                <Focus size={24} />
                                <span className="text-[10px] font-bold tracking-widest uppercase">{zenMode ? 'Exit Zen' : 'Zen'}</span>
                            </button>

                            <div className="w-[1px] h-8 bg-white/20 mx-1" />

                            <button onClick={() => toggleWidget("gradiumx-pomodoro-enabled")} className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                                <Timer size={24} />
                                <span className="text-[10px] font-bold tracking-widest uppercase">Focus</span>
                            </button>
                            <button onClick={() => toggleWidget("gradiumx-todo-enabled")} className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                                <CheckSquare size={24} />
                                <span className="text-[10px] font-bold tracking-widest uppercase">Tasks</span>
                            </button>
                            <button onClick={() => toggleWidget("gradiumx-motivation-enabled")} className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                                <Quote size={24} />
                                <span className="text-[10px] font-bold tracking-widest uppercase">Quote</span>
                            </button>
                            <button onClick={() => toggleWidget("gradiumx-quicklinks-enabled")} className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                                <Link size={24} />
                                <span className="text-[10px] font-bold tracking-widest uppercase">Links</span>
                            </button>
                            <button onClick={() => toggleWidget("gradiumx-weather-enabled")} className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                                <CloudSun size={24} />
                                <span className="text-[10px] font-bold tracking-widest uppercase">Weather</span>
                            </button>
                            <button onClick={() => toggleWidget("gradiumx-analytics-enabled")} className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                                <Activity size={24} />
                                <span className="text-[10px] font-bold tracking-widest uppercase">Stats</span>
                            </button>

                            <div className="w-[1px] h-8 bg-white/20 mx-1" />

                            {/* Settings */}
                            <button onClick={() => setSettingsOpen(!settingsOpen)} className={`flex flex-col items-center gap-1 transition-all ${settingsOpen ? 'text-[#B6FFDB]' : 'text-white/70 hover:text-white'}`}>
                                <Settings2 size={24} />
                                <span className="text-[10px] font-bold tracking-widest uppercase">Set</span>
                            </button>

                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
