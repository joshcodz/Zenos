import { useEffect, useRef, useState } from "react";
import { Search, Command, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setOpen(o => !o);
            }
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
            setSearch("");
        }
    }, [open]);

    // Simulated commands
    const setWorkspace = (intent) => {
        localStorage.setItem("gradiumx-intent", intent);
        // Reset widgets for the new workspace
        if (intent === "Coding") {
            localStorage.setItem("gradiumx-codescratchpad-enabled", "true");
            localStorage.setItem("gradiumx-heatmap-enabled", "true");
            localStorage.setItem("gradiumx-flashcards-enabled", "false");
            localStorage.setItem("gradiumx-study-enabled", "false");
            localStorage.setItem("gradiumx-breathing-enabled", "false");
            localStorage.setItem("gradiumx-intention-enabled", "false");
        } else if (intent === "Studying") {
            localStorage.setItem("gradiumx-codescratchpad-enabled", "false");
            localStorage.setItem("gradiumx-heatmap-enabled", "false");
            localStorage.setItem("gradiumx-flashcards-enabled", "true");
            localStorage.setItem("gradiumx-study-enabled", "true");
            localStorage.setItem("gradiumx-breathing-enabled", "false");
            localStorage.setItem("gradiumx-intention-enabled", "false");
        } else if (intent === "Deep Work") {
            localStorage.setItem("gradiumx-codescratchpad-enabled", "false");
            localStorage.setItem("gradiumx-heatmap-enabled", "false");
            localStorage.setItem("gradiumx-flashcards-enabled", "false");
            localStorage.setItem("gradiumx-study-enabled", "false");
            localStorage.setItem("gradiumx-breathing-enabled", "true");
            localStorage.setItem("gradiumx-intention-enabled", "true");
        }
        window.dispatchEvent(new Event("gradiumx-intent-update"));
        setOpen(false);
    };

    const commands = [
        { name: "Toggle Zen Mode", action: () => window.dispatchEvent(new Event("gradiumx-toggle-zen")) },
        { name: "Switch to Coding Workspace", action: () => setWorkspace("Coding") },
        { name: "Switch to Studying Workspace", action: () => setWorkspace("Studying") },
        { name: "Switch to Deep Work Workspace", action: () => setWorkspace("Deep Work") },
        { name: "Toggle Focus Timer", action: () => toggleWidget("gradiumx-pomodoro-enabled") },
        { name: "Toggle Weather", action: () => toggleWidget("gradiumx-weather-enabled") },
        { name: "Toggle Analytics", action: () => toggleWidget("gradiumx-analytics-enabled") },
        { name: "Toggle Code Scratchpad", action: () => toggleWidget("gradiumx-codescratchpad-enabled") },
        { name: "Toggle GitHub Heatmap", action: () => toggleWidget("gradiumx-heatmap-enabled") },
        { name: "Toggle Flashcards", action: () => toggleWidget("gradiumx-flashcards-enabled") },
        { name: "Toggle Study Tracker", action: () => toggleWidget("gradiumx-study-enabled") },
        { name: "Toggle Breathing Guide", action: () => toggleWidget("gradiumx-breathing-enabled") },
        { name: "Toggle Intention Setter", action: () => toggleWidget("gradiumx-intention-enabled") },
        { name: "Mute Background Audio", action: () => window.dispatchEvent(new Event("gradiumx-toggle-mute")) }
    ];

    function toggleWidget(key) {
        const current = localStorage.getItem(key) === "true";
        localStorage.setItem(key, String(!current));
        
        const eventName = key.replace("-enabled", "-update");
        window.dispatchEvent(new Event(eventName));
        setOpen(false);
    }

    const filtered = commands.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-xl glass-panel rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
                    >
                        <div className="flex items-center px-4 py-4 border-b border-white/10">
                            <Search size={22} className="text-white/50 mr-3" />
                            <input 
                                ref={inputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Type a command or search..."
                                className="flex-1 bg-transparent border-none outline-none text-xl text-white placeholder:text-white/30"
                            />
                            <div className="flex items-center gap-1 text-xs font-medium text-white/40 bg-white/10 px-2 py-1 rounded-md">
                                <Command size={12} /> K
                            </div>
                        </div>

                        <div className="max-h-[300px] overflow-y-auto p-2">
                            {filtered.length === 0 ? (
                                <div className="p-4 text-center text-white/50">No results found.</div>
                            ) : (
                                filtered.map((cmd, i) => (
                                    <button
                                        key={i}
                                        onClick={cmd.action}
                                        className="w-full text-left px-4 py-3 rounded-2xl hover:bg-white/10 text-white/90 transition-colors flex items-center gap-3 group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                            <Command size={14} className="text-white/60 group-hover:text-white" />
                                        </div>
                                        <span className="font-medium text-lg">{cmd.name}</span>
                                    </button>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
