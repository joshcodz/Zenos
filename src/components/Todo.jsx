import { useEffect, useState } from "react";
import { Check, Trash2, Plus } from "lucide-react";

export default function Todo({ onClose }) {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("gradiumx-tasks");
        return saved ? JSON.parse(saved) : [];
    });

    const [text, setText] = useState("");

    useEffect(() => {
        localStorage.setItem("gradiumx-tasks", JSON.stringify(tasks));
        window.dispatchEvent(new Event("gradiumx-tasks-updated"));
    }, [tasks]);

    function addTask() {
        if (!text.trim()) return;
        setTasks([...tasks, { text, done: false }]);
        setText("");
    }

    function toggleDone(index) {
        const copy = [...tasks];
        copy[index].done = !copy[index].done;
        setTasks(copy);
    }

    function removeTask(index) {
        const copy = [...tasks];
        copy.splice(index, 1);
        setTasks(copy);
    }

    return (
        <div className="flex flex-col h-[360px]">
            {/* Input */}
            <div className="relative mb-5">
                <input
                    placeholder="Add a new task..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTask()}
                    className="w-full h-14 pl-5 pr-14 rounded-full bg-white/10 border border-white/20 outline-none text-white text-[15px] focus:bg-white/20 transition-all placeholder:text-white/40 shadow-inner"
                />
                <button 
                    onClick={addTask}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 border border-white/30 hover:bg-white/30 hover:scale-105 transition-all text-white shadow-lg"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Tasks */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {tasks.length === 0 && (
                    <div className="h-full flex items-center justify-center text-white/50 italic text-sm font-medium">
                        You're all caught up!
                    </div>
                )}
                {tasks.map((task, index) => (
                    <div
                        key={index}
                        className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 ${task.done ? 'opacity-50' : ''}`}
                    >
                        {/* Checkbox */}
                        <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${task.done ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'border-white/40 hover:border-white/80'}`}
                            onClick={() => toggleDone(index)}
                        >
                            {task.done && <Check size={14} strokeWidth={4} />}
                        </div>

                        {/* Text */}
                        <span
                            className={`flex-1 text-[15px] font-medium transition-all duration-300 ${task.done ? "line-through text-white/50" : "text-white/90"}`}
                        >
                            {task.text}
                        </span>

                        {/* Delete */}
                        <button
                            className="opacity-0 group-hover:opacity-100 p-2 text-white/40 hover:text-red-400 transition-all rounded-full hover:bg-white/10"
                            onClick={() => removeTask(index)}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Minimize */}
            <button 
                onClick={onClose}
                className="mt-5 h-12 shrink-0 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all font-semibold text-sm text-white shadow-sm"
            >
                Close Tasks
            </button>
            
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.4);
                }
            `}</style>
        </div>
    );
}
