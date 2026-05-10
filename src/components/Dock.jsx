import { useEffect, useState } from "react";
import { Timer, CheckSquare, FileText, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Pomodoro from "./Pomodoro";
import Todo from "./Todo";
import Notes from "./Notes";
import MusicPanel from "./MusicPanel";

const dockItems = [
    { name: "Pomodoro", icon: Timer },
    { name: "Tasks", icon: CheckSquare },
    { name: "Notes", icon: FileText },
    { name: "Music", icon: Music },
];

export default function Dock() {
    const [visible, setVisible] = useState(false);
    const [activePanel, setActivePanel] = useState(null);

    useEffect(() => {
        function handleMouseMove(e) {
            const h = window.innerHeight;
            setVisible(e.clientY > h - 140);
        }

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    function togglePanel(name) {
        setActivePanel((prev) => (prev === name ? null : name));
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] flex flex-col items-center pointer-events-none">
            {/* Embedded Panel */}
            <AnimatePresence>
                {activePanel && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="glass-panel rounded-[32px] p-6 w-[440px] mb-8 pointer-events-auto shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                    >
                        {activePanel === "Pomodoro" && <Pomodoro embedded onClose={() => setActivePanel(null)} />}
                        {activePanel === "Tasks" && <Todo embedded onClose={() => setActivePanel(null)} />}
                        {activePanel === "Notes" && <Notes embedded onClose={() => setActivePanel(null)} />}
                        {activePanel === "Music" && <MusicPanel onClose={() => setActivePanel(null)} />}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dock */}
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: visible || activePanel ? 0 : "calc(100% - 10px)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="pb-6 pointer-events-auto"
            >
                <div className="flex gap-4 px-6 py-4 glass-drop rounded-full items-end h-[85px]">
                    {dockItems.map((item) => {
                        const active = activePanel === item.name;
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.name}
                                onClick={() => togglePanel(item.name)}
                                className="group relative flex flex-col items-center justify-end cursor-pointer"
                                whileHover={{ scale: 1.25, y: -8 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                {/* Tooltip */}
                                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-xl text-white text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap pointer-events-none shadow-xl border border-white/30">
                                    {item.name}
                                </div>

                                <div className={`flex items-center justify-center w-[58px] h-[58px] rounded-full transition-all duration-300 ${active ? 'bg-white/20 shadow-[0_0_30px_rgba(255,255,255,0.3)] border border-white/40' : 'bg-white/5 border border-white/10 group-hover:bg-white/15 group-hover:border-white/30'}`}>
                                    <Icon size={28} className={active ? "text-white" : "text-white/80"} strokeWidth={1.5} />
                                </div>
                                
                                <div className={`w-1.5 h-1.5 rounded-full mt-2 transition-all duration-300 ${active ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,1)]' : 'bg-transparent'}`} />
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}
