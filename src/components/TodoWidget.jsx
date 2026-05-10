import { useEffect, useState } from "react";
import { CheckSquare, Circle, CheckCircle2 } from "lucide-react";
import Draggable from "./Draggable";

export default function TodoWidget() {
    const [tasks, setTasks] = useState([]);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        function loadData() {
            const saved = localStorage.getItem("gradiumx-tasks");
            setTasks(saved ? JSON.parse(saved) : []);
            setEnabled(localStorage.getItem("gradiumx-todo-enabled") === "true");
        }

        loadData();
        
        window.addEventListener("gradiumx-tasks-updated", loadData);
        window.addEventListener("gradiumx-todo-update", loadData);

        return () => {
            window.removeEventListener("gradiumx-tasks-updated", loadData);
            window.removeEventListener("gradiumx-todo-update", loadData);
        };
    }, []);

    if (!enabled) return null;

    return (
        <Draggable defaultPosition={{ x: window.innerWidth - 320, y: 250 }}>
            <div className="glass-panel p-6 rounded-[32px] min-w-[260px] transition-all duration-300 cursor-move pointer-events-auto">
                {/* Title */}
                <div className="text-lg font-bold tracking-wide flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                    <CheckSquare size={18} className="text-white" />
                    <span className="gradient-text">Tasks</span>
                </div>

                {/* Task List */}
                {tasks.length === 0 && (
                    <div className="text-white/50 text-sm italic py-2">
                        All caught up!
                    </div>
                )}

                <div className="space-y-3">
                    {tasks.slice(0, 5).map((task, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 text-[15px] font-medium transition-all duration-300 ${
                                task.done ? "opacity-40 line-through" : "opacity-90"
                            }`}
                        >
                            <div className="mt-[2px] shrink-0 text-white/80">
                                {task.done ? (
                                    <CheckCircle2 size={16} />
                                ) : (
                                    <Circle size={16} />
                                )}
                            </div>
                            <span className="leading-tight">{task.text}</span>
                        </div>
                    ))}
                </div>
                
                {tasks.length > 5 && (
                    <div className="mt-4 pt-2 text-xs text-white/60 font-medium italic border-t border-white/10">
                        + {tasks.length - 5} more tasks
                    </div>
                )}
            </div>
        </Draggable>
    );
}
