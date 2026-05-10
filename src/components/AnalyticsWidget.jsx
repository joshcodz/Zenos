import { useEffect, useState } from "react";
import { Activity, Flame, Target } from "lucide-react";
import Draggable from "./Draggable";

export default function AnalyticsWidget() {
    const [enabled, setEnabled] = useState(false);
    const [sessions, setSessions] = useState(0);

    const goal = 8; // 8 sessions a day

    useEffect(() => {
        function loadData() {
            setEnabled(localStorage.getItem("gradiumx-analytics-enabled") === "true");
            setSessions(Number(localStorage.getItem("gradiumx-pomodoro-sessions")) || 0);
        }

        loadData();
        window.addEventListener("gradiumx-analytics-update", loadData);
        window.addEventListener("gradiumx-pomodoro-session-complete", loadData);

        return () => {
            window.removeEventListener("gradiumx-analytics-update", loadData);
            window.removeEventListener("gradiumx-pomodoro-session-complete", loadData);
        };
    }, []);

    if (!enabled) return null;

    const progress = Math.min((sessions / goal) * 100, 100);

    return (
        <Draggable defaultPosition={{ x: 40, y: 250 }}>
            <div className="glass-panel p-6 w-64 rounded-[32px] transition-all duration-300 cursor-move pointer-events-auto">
                <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                        <Activity size={18} className="text-white" />
                        <span className="gradient-text font-bold tracking-wide text-lg">Analytics</span>
                    </div>
                    {sessions > 0 && <Flame size={18} className="text-[#FFB6FF] drop-shadow-[0_0_10px_rgba(255,182,255,0.8)]" />}
                </div>

                <div className="flex justify-between items-end mb-2">
                    <div className="text-4xl font-bold tracking-tighter text-white">
                        {sessions}
                    </div>
                    <div className="text-sm font-medium text-white/60 mb-1 flex items-center gap-1">
                        <Target size={14} /> / {goal} Sessions
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/5 relative shadow-inner">
                    <div 
                        className="h-full bg-gradient-to-r from-[#B6E0FF] to-[#B6FFDB] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="mt-3 text-xs font-semibold text-center text-white/50 tracking-wider uppercase">
                    {sessions >= goal ? 'Goal Met! Incredible.' : 'Keep Pushing'}
                </div>
            </div>
        </Draggable>
    );
}
