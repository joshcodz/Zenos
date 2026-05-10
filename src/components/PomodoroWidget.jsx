import { useEffect, useState } from "react";
import { Timer, Pause } from "lucide-react";
import Draggable from "./Draggable";

export default function PomodoroWidget({ zenMode }) {
    const [enabled, setEnabled] = useState(false);
    const [remaining, setRemaining] = useState(0);
    const [mode, setMode] = useState("focus");
    const [running, setRunning] = useState(false);

    function load() {
        setEnabled(localStorage.getItem("gradiumx-pomodoro-enabled") === "true");
        setMode(localStorage.getItem("gradiumx-pomodoro-mode") || "focus");
        setRunning(localStorage.getItem("gradiumx-pomodoro-running") === "true");

        const end = Number(localStorage.getItem("gradiumx-pomodoro-end")) || 0;
        const now = Date.now();
        const diff = Math.max(0, Math.floor((end - now) / 1000));
        setRemaining(diff);
    }

    useEffect(() => {
        load();

        const tick = setInterval(load, 1000);

        function sync() {
            load();
        }

        window.addEventListener("gradiumx-pomodoro-update", sync);

        return () => {
            clearInterval(tick);
            window.removeEventListener("gradiumx-pomodoro-update", sync);
        };
    }, []);

    if (!enabled && !zenMode) return null;

    const mins = String(Math.floor(remaining / 60)).padStart(2, "0");
    const secs = String(remaining % 60).padStart(2, "0");

    // If zen mode is active, we force it to show up, but un-draggable and placed elegantly below the clock
    if (zenMode) {
        return (
            <div className="fixed top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-1000 z-[1000] pointer-events-none">
                <div className="text-xl font-medium tracking-widest text-[#B6E0FF] uppercase mb-4 drop-shadow-md">
                    {mode === 'focus' ? 'Deep Work' : 'Resting'}
                </div>
                <div className="text-[64px] leading-none font-bold tracking-tight text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                    {mins}:{secs}
                </div>
            </div>
        );
    }

    return (
        <Draggable defaultPosition={{ x: window.innerWidth - 220, y: 80 }}>
            <div className="glass-panel p-6 w-48 rounded-[32px] text-center flex flex-col items-center justify-center transition-all duration-300 hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)] cursor-move pointer-events-auto">
                <div className="text-sm font-semibold tracking-wide text-white/80 flex items-center gap-2 mb-2">
                    <Timer size={16} className="text-white" /> <span className="capitalize">{mode}</span>
                </div>

                <div className="text-[44px] leading-tight font-light tracking-tight text-white">
                    {mins}:{secs}
                </div>

                {!running && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white/60 bg-white/10 border border-white/20 px-3 py-1 rounded-full mt-3 shadow-inner">
                        <Pause size={12} /> Paused
                    </div>
                )}
            </div>
        </Draggable>
    );
}
