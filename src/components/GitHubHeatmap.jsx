import { useEffect, useState, useMemo } from "react";
import { GitBranch, Flame } from "lucide-react";
import Draggable from "./Draggable";

export default function GitHubHeatmap() {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        function loadData() {
            setEnabled(localStorage.getItem("gradiumx-heatmap-enabled") === "true");
        }

        loadData();
        window.addEventListener("gradiumx-heatmap-update", loadData);
        return () => window.removeEventListener("gradiumx-heatmap-update", loadData);
    }, []);

    // Generate a realistic-looking contribution heatmap (simulated)
    const heatData = useMemo(() => {
        const stored = localStorage.getItem("gradiumx-heatmap-data");
        if (stored) return JSON.parse(stored);

        const data = [];
        const today = new Date();
        for (let i = 83; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);

            // Create a realistic-looking pattern (weekdays busier)
            const dayOfWeek = d.getDay();
            const isWeekday = dayOfWeek > 0 && dayOfWeek < 6;
            let intensity;

            if (Math.random() < 0.15) {
                intensity = 0; // some days off
            } else if (isWeekday) {
                intensity = Math.random() < 0.3 ? 3 : Math.random() < 0.5 ? 2 : 1;
            } else {
                intensity = Math.random() < 0.6 ? 0 : 1;
            }

            data.push({ date: d.toISOString().split("T")[0], intensity });
        }

        localStorage.setItem("gradiumx-heatmap-data", JSON.stringify(data));
        return data;
    }, []);

    // Track today's coding activity
    const recordActivity = () => {
        const today = new Date().toISOString().split("T")[0];
        const updatedData = [...heatData];
        const todayEntry = updatedData.find(d => d.date === today);
        if (todayEntry && todayEntry.intensity < 4) {
            todayEntry.intensity = Math.min(4, todayEntry.intensity + 1);
            localStorage.setItem("gradiumx-heatmap-data", JSON.stringify(updatedData));
        }
    };

    useEffect(() => {
        // Listen for pomodoro completions to bump activity
        window.addEventListener("gradiumx-pomodoro-session-complete", recordActivity);
        return () => window.removeEventListener("gradiumx-pomodoro-session-complete", recordActivity);
    }, [heatData]);

    if (!enabled) return null;

    // Calculate current streak
    const streak = (() => {
        let count = 0;
        for (let i = heatData.length - 1; i >= 0; i--) {
            if (heatData[i].intensity > 0) count++;
            else break;
        }
        return count;
    })();

    const totalContributions = heatData.reduce((sum, d) => sum + d.intensity, 0);

    const intensityColor = (level) => {
        switch (level) {
            case 0: return "bg-white/5 border-white/5";
            case 1: return "bg-[#B6E0FF]/20 border-[#B6E0FF]/15";
            case 2: return "bg-[#B6E0FF]/40 border-[#B6E0FF]/25";
            case 3: return "bg-[#B6E0FF]/65 border-[#B6E0FF]/40 shadow-[0_0_6px_rgba(182,224,255,0.3)]";
            case 4: return "bg-[#B6FFDB]/80 border-[#B6FFDB]/50 shadow-[0_0_10px_rgba(182,255,219,0.4)]";
            default: return "bg-white/5 border-white/5";
        }
    };

    // Arrange into weeks (12 weeks x 7 days)
    const weeks = [];
    for (let i = 0; i < heatData.length; i += 7) {
        weeks.push(heatData.slice(i, i + 7));
    }

    return (
        <Draggable defaultPosition={{ x: 40, y: 420 }}>
            <div className="glass-panel p-5 rounded-[32px] w-[340px] transition-all duration-300 cursor-move pointer-events-auto">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                        <GitBranch size={18} className="text-white" />
                        <span className="gradient-text font-bold tracking-wide text-lg">Activity</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        {streak > 0 && <Flame size={16} className="text-[#FFB6FF] drop-shadow-[0_0_10px_rgba(255,182,255,0.8)]" />}
                        <span className="text-sm font-bold text-white/70">{streak}d streak</span>
                    </div>
                </div>

                {/* Heatmap Grid */}
                <div className="flex gap-[3px] justify-center mb-4">
                    {weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                            {week.map((day, di) => (
                                <div
                                    key={di}
                                    className={`w-[18px] h-[18px] rounded-[5px] border transition-all duration-300 ${intensityColor(day.intensity)}`}
                                    title={`${day.date}: ${day.intensity} contributions`}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center text-xs text-white/40 font-medium">
                    <span>{totalContributions} contributions</span>
                    <div className="flex items-center gap-1">
                        <span>Less</span>
                        {[0, 1, 2, 3, 4].map(l => (
                            <div key={l} className={`w-[10px] h-[10px] rounded-[3px] border ${intensityColor(l)}`} />
                        ))}
                        <span>More</span>
                    </div>
                </div>
            </div>
        </Draggable>
    );
}
