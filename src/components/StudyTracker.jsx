import { useEffect, useState } from "react";
import { BookOpen, TrendingUp, Clock } from "lucide-react";
import Draggable from "./Draggable";

export default function StudyTracker() {
    const [enabled, setEnabled] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [todayMinutes, setTodayMinutes] = useState(0);
    const [weeklyGoal] = useState(20); // 20 hours per week

    useEffect(() => {
        function loadData() {
            setEnabled(localStorage.getItem("gradiumx-study-enabled") === "true");
            const saved = localStorage.getItem("gradiumx-study-sessions");
            const parsed = saved ? JSON.parse(saved) : [];
            setSessions(parsed);

            // Calculate today's minutes
            const today = new Date().toISOString().split("T")[0];
            const todayTotal = parsed
                .filter(s => s.date === today)
                .reduce((sum, s) => sum + s.minutes, 0);
            setTodayMinutes(todayTotal);
        }

        loadData();
        window.addEventListener("gradiumx-study-update", loadData);

        // Listen for pomodoro completions to auto-log study time
        const handlePomodoroComplete = () => {
            const today = new Date().toISOString().split("T")[0];
            const saved = localStorage.getItem("gradiumx-study-sessions");
            const parsed = saved ? JSON.parse(saved) : [];
            parsed.push({ date: today, minutes: 25 });
            localStorage.setItem("gradiumx-study-sessions", JSON.stringify(parsed));
            loadData();
        };

        window.addEventListener("gradiumx-pomodoro-session-complete", handlePomodoroComplete);

        return () => {
            window.removeEventListener("gradiumx-study-update", loadData);
            window.removeEventListener("gradiumx-pomodoro-session-complete", handlePomodoroComplete);
        };
    }, []);

    if (!enabled) return null;

    // Calculate weekly hours
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weeklyMinutes = sessions
        .filter(s => new Date(s.date) >= weekStart)
        .reduce((sum, s) => sum + s.minutes, 0);
    const weeklyHours = (weeklyMinutes / 60).toFixed(1);
    const weeklyProgress = Math.min((weeklyMinutes / (weeklyGoal * 60)) * 100, 100);

    // Last 7 days data for mini bar chart
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        const mins = sessions
            .filter(s => s.date === dateStr)
            .reduce((sum, s) => sum + s.minutes, 0);
        last7Days.push({ day: d.toLocaleDateString("en", { weekday: "short" }).charAt(0), mins, dateStr });
    }
    const maxMins = Math.max(...last7Days.map(d => d.mins), 1);

    return (
        <Draggable defaultPosition={{ x: 40, y: 420 }}>
            <div className="glass-panel p-5 rounded-[32px] w-[280px] transition-all duration-300 cursor-move pointer-events-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                        <BookOpen size={18} className="text-white" />
                        <span className="gradient-text font-bold tracking-wide text-lg">Study Log</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={14} className="text-white/50" />
                        <span className="text-sm font-bold text-white/70">{todayMinutes}m today</span>
                    </div>
                </div>

                {/* Mini Bar Chart */}
                <div className="flex items-end justify-between gap-2 h-[60px] mb-4 px-1">
                    {last7Days.map((day, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 flex-1">
                            <div
                                className="w-full rounded-t-lg bg-gradient-to-t from-[#B6E0FF]/30 to-[#B6FFDB]/50 transition-all duration-500 min-h-[4px]"
                                style={{ height: `${Math.max((day.mins / maxMins) * 48, 4)}px` }}
                            />
                            <span className="text-[9px] text-white/30 font-bold">{day.day}</span>
                        </div>
                    ))}
                </div>

                {/* Weekly Progress */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5 text-xs text-white/50 font-medium">
                            <TrendingUp size={12} />
                            <span>Weekly Progress</span>
                        </div>
                        <span className="text-xs font-bold text-white/70">{weeklyHours}h / {weeklyGoal}h</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
                        <div
                            className="h-full bg-gradient-to-r from-[#FFB6FF] to-[#B6E0FF] rounded-full transition-all duration-1000"
                            style={{ width: `${weeklyProgress}%` }}
                        />
                    </div>
                </div>
            </div>
        </Draggable>
    );
}
