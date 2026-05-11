import { useEffect, useState } from "react";
import { Timer, Pause, Play, RotateCcw, Plus, Minus, Coffee, Brain } from "lucide-react";
import Draggable from "./Draggable";

export default function PomodoroWidget({ zenMode }) {
    const [enabled, setEnabled] = useState(false);
    const [remaining, setRemaining] = useState(25 * 60);
    const [mode, setMode] = useState("focus");
    const [running, setRunning] = useState(false);

    useEffect(() => {
        function load() {
            const isEnabled = localStorage.getItem("gradiumx-pomodoro-enabled") === "true";
            setEnabled(isEnabled);
            
            const savedMode = localStorage.getItem("gradiumx-pomodoro-mode") || "focus";
            setMode(savedMode);

            const isRunning = localStorage.getItem("gradiumx-pomodoro-running") === "true";
            setRunning(isRunning);

            const end = Number(localStorage.getItem("gradiumx-pomodoro-end")) || 0;
            const now = Date.now();
            
            if (isRunning && end > now) {
                setRemaining(Math.max(0, Math.floor((end - now) / 1000)));
            } else if (!isRunning) {
                setRemaining(Number(localStorage.getItem("gradiumx-pomodoro-remaining")) || (savedMode === "focus" ? 25 * 60 : 5 * 60));
            } else {
                // Timer finished while away
                handleComplete();
            }
        }

        load();
        const interval = setInterval(() => {
            if (localStorage.getItem("gradiumx-pomodoro-running") === "true") {
                const end = Number(localStorage.getItem("gradiumx-pomodoro-end"));
                const now = Date.now();
                const diff = Math.max(0, Math.floor((end - now) / 1000));
                setRemaining(diff);
                if (diff === 0) handleComplete();
            }
        }, 1000);

        window.addEventListener("gradiumx-pomodoro-update", load);
        return () => {
            clearInterval(interval);
            window.removeEventListener("gradiumx-pomodoro-update", load);
        };
    }, []);

    const handleComplete = () => {
        localStorage.setItem("gradiumx-pomodoro-running", "false");
        setRunning(false);
        window.dispatchEvent(new Event("gradiumx-pomodoro-session-complete"));
        
        // Notify user (simple alert for now, can be improved)
        const nextMode = mode === "focus" ? "break" : "focus";
        alert(`Session complete! Time for a ${nextMode}.`);
        
        switchMode(nextMode);
    };

    const toggleTimer = () => {
        const newState = !running;
        setRunning(newState);
        localStorage.setItem("gradiumx-pomodoro-running", String(newState));
        
        if (newState) {
            const end = Date.now() + (remaining * 1000);
            localStorage.setItem("gradiumx-pomodoro-end", String(end));
        } else {
            localStorage.setItem("gradiumx-pomodoro-remaining", String(remaining));
        }
    };

    const resetTimer = () => {
        setRunning(false);
        localStorage.setItem("gradiumx-pomodoro-running", "false");
        const baseTime = mode === "focus" ? 25 * 60 : 5 * 60;
        setRemaining(baseTime);
        localStorage.setItem("gradiumx-pomodoro-remaining", String(baseTime));
    };

    const adjustTime = (amount) => {
        const newTime = Math.max(60, remaining + amount);
        setRemaining(newTime);
        localStorage.setItem("gradiumx-pomodoro-remaining", String(newTime));
        if (running) {
            const end = Date.now() + (newTime * 1000);
            localStorage.setItem("gradiumx-pomodoro-end", String(end));
        }
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        localStorage.setItem("gradiumx-pomodoro-mode", newMode);
        const baseTime = newMode === "focus" ? 25 * 60 : 5 * 60;
        setRemaining(baseTime);
        localStorage.setItem("gradiumx-pomodoro-remaining", String(baseTime));
        setRunning(false);
        localStorage.setItem("gradiumx-pomodoro-running", "false");
    };

    if (!enabled && !zenMode) return null;

    const mins = String(Math.floor(remaining / 60)).padStart(2, "0");
    const secs = String(remaining % 60).padStart(2, "0");

    if (zenMode) {
        return (
            <div className="fixed top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-1000 z-[1000] pointer-events-none">
                <div className="text-xl font-medium tracking-widest text-[#B6E0FF] uppercase mb-4 drop-shadow-md">
                    {mode === 'focus' ? 'Focusing' : 'Break Time'}
                </div>
                <div className="text-[64px] leading-none font-bold tracking-tight text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                    {mins}:{secs}
                </div>
            </div>
        );
    }

    return (
        <Draggable defaultPosition={{ x: window.innerWidth - 240, y: 80 }}>
            <div className="glass-panel p-5 w-52 rounded-[32px] text-center flex flex-col items-center transition-all duration-300 hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)] cursor-move pointer-events-auto">
                {/* Header / Mode Switcher */}
                <div className="flex bg-white/5 rounded-2xl p-1 mb-4 w-full border border-white/10">
                    <button 
                        onClick={() => switchMode("focus")}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${mode === "focus" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/60"}`}
                    >
                        <Brain size={12} /> Focus
                    </button>
                    <button 
                        onClick={() => switchMode("break")}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${mode === "break" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/60"}`}
                    >
                        <Coffee size={12} /> Break
                    </button>
                </div>

                {/* Timer Display */}
                <div className="relative group/timer mb-4">
                    <div className="text-[48px] leading-none font-bold tracking-tight text-white drop-shadow-[0_0_15px_rgba(182,224,255,0.3)]">
                        {mins}:{secs}
                    </div>
                    {/* Tiny Adjustment Buttons on Hover */}
                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover/timer:opacity-100 transition-opacity">
                        <button onClick={() => adjustTime(60)} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white"><Plus size={12} /></button>
                        <button onClick={() => adjustTime(-60)} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white"><Minus size={12} /></button>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 w-full">
                    <button 
                        onClick={toggleTimer}
                        className={`flex-1 h-10 rounded-2xl flex items-center justify-center transition-all ${running ? "bg-white/10 text-white hover:bg-white/20" : "bg-white text-black hover:scale-105"}`}
                    >
                        {running ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                    </button>
                    <button 
                        onClick={resetTimer}
                        className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all"
                    >
                        <RotateCcw size={18} />
                    </button>
                </div>
            </div>
        </Draggable>
    );
}
