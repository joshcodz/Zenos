import { useEffect, useState, useRef } from "react";
import { Wind, Play, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "./Draggable";

const PHASES = [
    { label: "Breathe In", duration: 4, scale: 1.4, color: "#B6E0FF" },
    { label: "Hold", duration: 7, scale: 1.4, color: "#FFB6FF" },
    { label: "Breathe Out", duration: 8, scale: 0.8, color: "#B6FFDB" },
];

export default function BreathingWidget() {
    const [enabled, setEnabled] = useState(false);
    const [active, setActive] = useState(false);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [countdown, setCountdown] = useState(PHASES[0].duration);
    const [cycles, setCycles] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        function loadData() {
            setEnabled(localStorage.getItem("gradiumx-breathing-enabled") === "true");
        }

        loadData();
        window.addEventListener("gradiumx-breathing-update", loadData);
        return () => window.removeEventListener("gradiumx-breathing-update", loadData);
    }, []);

    useEffect(() => {
        if (!active) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    setPhaseIndex(pi => {
                        const next = (pi + 1) % PHASES.length;
                        if (next === 0) setCycles(c => c + 1);
                        return next;
                    });
                    // We'll set the new duration in the next tick
                    return -1; // Signal to update
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [active]);

    // Update countdown when phase changes
    useEffect(() => {
        if (active) {
            setCountdown(PHASES[phaseIndex].duration);
        }
    }, [phaseIndex, active]);

    const toggleActive = () => {
        if (active) {
            setActive(false);
            setPhaseIndex(0);
            setCountdown(PHASES[0].duration);
        } else {
            setActive(true);
            setCycles(0);
            setPhaseIndex(0);
            setCountdown(PHASES[0].duration);
        }
    };

    if (!enabled) return null;

    const currentPhase = PHASES[phaseIndex];

    return (
        <Draggable defaultPosition={{ x: window.innerWidth - 320, y: window.innerHeight - 340 }}>
            <div className="glass-panel p-5 rounded-[32px] w-[260px] transition-all duration-300 cursor-move pointer-events-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                        <Wind size={18} className="text-white" />
                        <span className="gradient-text font-bold tracking-wide text-lg">Breathe</span>
                    </div>
                    {cycles > 0 && (
                        <span className="text-[11px] font-bold text-white/40">{cycles} cycles</span>
                    )}
                </div>

                {/* Breathing Circle */}
                <div className="flex flex-col items-center justify-center py-4">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        {/* Outer ring */}
                        <motion.div
                            animate={{
                                scale: active ? currentPhase.scale : 1,
                                boxShadow: active 
                                    ? `0 0 40px ${currentPhase.color}30, 0 0 80px ${currentPhase.color}15`
                                    : "0 0 0px transparent",
                            }}
                            transition={{ duration: currentPhase.duration, ease: "easeInOut" }}
                            className="absolute w-28 h-28 rounded-full border-2 transition-colors duration-1000"
                            style={{ borderColor: active ? `${currentPhase.color}60` : "rgba(255,255,255,0.1)" }}
                        />

                        {/* Inner glow */}
                        <motion.div
                            animate={{
                                scale: active ? currentPhase.scale * 0.7 : 0.7,
                                opacity: active ? 0.6 : 0.1,
                            }}
                            transition={{ duration: currentPhase.duration, ease: "easeInOut" }}
                            className="absolute w-20 h-20 rounded-full"
                            style={{ backgroundColor: active ? `${currentPhase.color}20` : "rgba(255,255,255,0.05)" }}
                        />

                        {/* Center content */}
                        <div className="relative z-10 flex flex-col items-center">
                            {active ? (
                                <>
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={currentPhase.label}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className="text-[11px] font-bold uppercase tracking-widest mb-1"
                                            style={{ color: currentPhase.color }}
                                        >
                                            {currentPhase.label}
                                        </motion.span>
                                    </AnimatePresence>
                                    <span className="text-3xl font-light text-white tracking-tight">{countdown}</span>
                                </>
                            ) : (
                                <span className="text-sm font-medium text-white/40">4-7-8</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Control */}
                <div className="flex justify-center">
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleActive(); }}
                        onMouseDown={(e) => e.stopPropagation()}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                            active
                                ? "bg-red-500/15 text-red-300 border-red-500/30 hover:bg-red-500/25"
                                : "bg-white/10 text-white/70 border-white/20 hover:bg-white/20 hover:text-white"
                        }`}
                    >
                        {active ? <><Square size={12} /> Stop</> : <><Play size={12} /> Start</>}
                    </button>
                </div>

                {/* Method Label */}
                <div className="text-center mt-3 text-[10px] text-white/25 font-medium tracking-wider">
                    4-7-8 RELAXATION METHOD
                </div>
            </div>
        </Draggable>
    );
}
