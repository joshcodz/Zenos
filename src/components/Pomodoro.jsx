import { useEffect, useState } from "react";
import { Play, Pause, Eye, EyeOff } from "lucide-react";

export default function Pomodoro({ onClose, embedded = false }) {
    const [focusMin, setFocusMin] = useState(Number(localStorage.getItem("gradiumx-focus")) || 25);
    const [breakMin, setBreakMin] = useState(Number(localStorage.getItem("gradiumx-break")) || 5);
    const [running, setRunning] = useState(localStorage.getItem("gradiumx-pomodoro-running") === "true");
    const [enabled, setEnabled] = useState(localStorage.getItem("gradiumx-pomodoro-enabled") === "true");

    const FOCUS = focusMin * 60;
    const BREAK = breakMin * 60;

    useEffect(() => {
        localStorage.setItem("gradiumx-focus", focusMin);
        localStorage.setItem("gradiumx-break", breakMin);
    }, [focusMin, breakMin]);

    function startTimer() {
        const endTime = Date.now() + FOCUS * 1000;
        localStorage.setItem("gradiumx-pomodoro-end", String(endTime));
        localStorage.setItem("gradiumx-pomodoro-running", "true");
        window.dispatchEvent(new Event("gradiumx-pomodoro-update"));
        setRunning(true);
    }

    function pauseTimer() {
        localStorage.setItem("gradiumx-pomodoro-running", "false");
        window.dispatchEvent(new Event("gradiumx-pomodoro-update"));
        setRunning(false);
    }

    function toggleWidget() {
        const next = !enabled;
        setEnabled(next);
        localStorage.setItem("gradiumx-pomodoro-enabled", String(next));
        window.dispatchEvent(new Event("gradiumx-pomodoro-update"));
    }

    return (
        <div className="flex flex-col text-white">
            <div className="text-[64px] text-center font-light tracking-tight mb-8 mt-2 drop-shadow-xl">
                25:00
            </div>

            {/* Inputs */}
            <div className="flex gap-4 mb-8">
                <div className="flex-1 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/50 font-semibold">Focus</span>
                    <input
                        type="number"
                        value={focusMin}
                        onChange={(e) => setFocusMin(Number(e.target.value))}
                        className="w-full h-12 pl-16 pr-4 rounded-full bg-white/10 border border-white/20 outline-none text-white text-base focus:bg-white/20 transition-all font-medium text-right shadow-inner"
                    />
                </div>
                <div className="flex-1 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/50 font-semibold">Break</span>
                    <input
                        type="number"
                        value={breakMin}
                        onChange={(e) => setBreakMin(Number(e.target.value))}
                        className="w-full h-12 pl-16 pr-4 rounded-full bg-white/10 border border-white/20 outline-none text-white text-base focus:bg-white/20 transition-all font-medium text-right shadow-inner"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
                <button
                    className="flex-1 h-12 flex items-center justify-center gap-2 rounded-full bg-white/20 border border-white/30 hover:bg-white/30 transition-all font-semibold text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    onClick={() => (running ? pauseTimer() : startTimer())}
                >
                    {running ? <Pause size={18} /> : <Play size={18} />}
                    {running ? "Pause" : "Start"}
                </button>

                <button 
                    className={`flex-1 h-12 flex items-center justify-center gap-2 rounded-full border transition-all font-medium text-sm ${enabled ? 'bg-white/20 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-transparent border-white/20 text-white/70 hover:bg-white/10'}`} 
                    onClick={toggleWidget}
                >
                    {enabled ? <Eye size={18} /> : <EyeOff size={18} />}
                    Widget
                </button>

                <button 
                    className="flex-1 h-12 rounded-full bg-transparent border border-transparent hover:bg-white/10 transition-all font-medium text-sm text-white/70 hover:text-white"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
