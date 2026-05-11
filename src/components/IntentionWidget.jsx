import { useEffect, useState } from "react";
import { Target, Pencil, Check, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "./Draggable";

export default function IntentionWidget() {
    const [enabled, setEnabled] = useState(false);
    const [intention, setIntention] = useState("");
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [deepWorkStreak, setDeepWorkStreak] = useState(0);
    const [todayLogged, setTodayLogged] = useState(false);

    useEffect(() => {
        function loadData() {
            setEnabled(localStorage.getItem("gradiumx-intention-enabled") === "true");
            setIntention(localStorage.getItem("gradiumx-daily-intention") || "");
            
            // Check streak
            const streakData = JSON.parse(localStorage.getItem("gradiumx-deepwork-streak") || '{"count":0,"lastDate":""}');
            const today = new Date().toISOString().split("T")[0];
            
            if (streakData.lastDate === today) {
                setDeepWorkStreak(streakData.count);
                setTodayLogged(true);
            } else {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split("T")[0];
                
                if (streakData.lastDate === yesterdayStr) {
                    setDeepWorkStreak(streakData.count);
                } else {
                    setDeepWorkStreak(0);
                }
                setTodayLogged(false);
            }
        }

        loadData();
        window.addEventListener("gradiumx-intention-update", loadData);
        return () => window.removeEventListener("gradiumx-intention-update", loadData);
    }, []);

    const saveIntention = () => {
        if (inputValue.trim()) {
            setIntention(inputValue.trim());
            localStorage.setItem("gradiumx-daily-intention", inputValue.trim());
        }
        setEditing(false);
    };

    const logDeepWork = () => {
        const today = new Date().toISOString().split("T")[0];
        const newCount = deepWorkStreak + 1;
        const streakData = { count: newCount, lastDate: today };
        localStorage.setItem("gradiumx-deepwork-streak", JSON.stringify(streakData));
        setDeepWorkStreak(newCount);
        setTodayLogged(true);
    };

    if (!enabled) return null;

    const timeOfDay = (() => {
        const h = new Date().getHours();
        if (h >= 5 && h < 12) return "morning";
        if (h >= 12 && h < 17) return "afternoon";
        return "evening";
    })();

    return (
        <Draggable defaultPosition={{ x: window.innerWidth - 360, y: 120 }}>
            <div className="glass-panel p-5 rounded-[32px] w-[300px] transition-all duration-300 cursor-move pointer-events-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                        <Target size={18} className="text-white" />
                        <span className="gradient-text font-bold tracking-wide text-lg">Intention</span>
                    </div>
                    {deepWorkStreak > 0 && (
                        <div className="flex items-center gap-1 text-[11px] font-bold text-[#FFB6FF] bg-[#FFB6FF]/10 px-2.5 py-1 rounded-full border border-[#FFB6FF]/20">
                            <Zap size={12} />
                            {deepWorkStreak}d streak
                        </div>
                    )}
                </div>

                {/* Intention Display/Edit */}
                <AnimatePresence mode="wait">
                    {editing ? (
                        <motion.div
                            key="editing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mb-4"
                        >
                            <textarea
                                autoFocus
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); saveIntention(); } }}
                                placeholder={`What's your focus this ${timeOfDay}?`}
                                className="w-full bg-white/5 border border-white/15 rounded-2xl p-3 text-[14px] text-white placeholder:text-white/25 outline-none focus:border-[#B6E0FF]/40 resize-none min-h-[80px] transition-colors cursor-text"
                                onMouseDown={(e) => e.stopPropagation()}
                            />
                            <div className="flex justify-end mt-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); saveIntention(); }}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-all"
                                >
                                    <Check size={12} /> Set
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="display"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mb-4"
                        >
                            {intention ? (
                                <div className="relative group">
                                    <p className="text-[15px] text-white/90 font-medium leading-relaxed italic">
                                        "{intention}"
                                    </p>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setInputValue(intention); setEditing(true); }}
                                        onMouseDown={(e) => e.stopPropagation()}
                                        className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white/50 hover:text-white"
                                    >
                                        <Pencil size={11} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={(e) => { e.stopPropagation(); setEditing(true); }}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    className="w-full py-4 rounded-2xl border border-dashed border-white/15 text-white/30 text-sm font-medium hover:border-white/30 hover:text-white/50 transition-all cursor-text"
                                >
                                    + Set your {timeOfDay} intention
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Log Deep Work Button */}
                {!todayLogged ? (
                    <button
                        onClick={(e) => { e.stopPropagation(); logDeepWork(); }}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#B6E0FF]/10 to-[#B6FFDB]/10 border border-white/10 text-white/70 text-xs font-bold uppercase tracking-widest hover:from-[#B6E0FF]/20 hover:to-[#B6FFDB]/20 hover:text-white transition-all"
                    >
                        ✓ Log Today's Deep Work
                    </button>
                ) : (
                    <div className="w-full py-3 rounded-2xl bg-[#B6FFDB]/10 border border-[#B6FFDB]/20 text-center">
                        <span className="text-xs font-bold text-[#B6FFDB] uppercase tracking-widest">
                            ✓ Deep work logged today
                        </span>
                    </div>
                )}
            </div>
        </Draggable>
    );
}
