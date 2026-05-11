import { useEffect, useState } from "react";
import { CheckSquare, Circle, CheckCircle2, Plus, Trash2, X } from "lucide-react";
import Draggable from "./Draggable";

export default function TodoWidget() {
    const [tasks, setTasks] = useState([]);
    const [enabled, setEnabled] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        function loadData() {
            const saved = localStorage.getItem("gradiumx-tasks");
            setTasks(saved ? JSON.parse(saved) : []);
            setEnabled(localStorage.getItem("gradiumx-todo-enabled") === "true");
        }

        loadData();
        window.addEventListener("gradiumx-todo-update", loadData);
        return () => window.removeEventListener("gradiumx-todo-update", loadData);
    }, []);

    const saveTasks = (newTasks) => {
        setTasks(newTasks);
        localStorage.setItem("gradiumx-tasks", JSON.stringify(newTasks));
    };

    const addTask = (e) => {
        if (e) e.preventDefault();
        if (!inputValue.trim()) return;
        const newTasks = [{ text: inputValue, done: false, id: Date.now() }, ...tasks];
        saveTasks(newTasks);
        setInputValue("");
    };

    const toggleTask = (id) => {
        const newTasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
        saveTasks(newTasks);
    };

    const deleteTask = (id) => {
        const newTasks = tasks.filter(t => t.id !== id);
        saveTasks(newTasks);
    };

    const clearCompleted = () => {
        const newTasks = tasks.filter(t => !t.done);
        saveTasks(newTasks);
    };

    if (!enabled) return null;

    return (
        <Draggable defaultPosition={{ x: window.innerWidth - 320, y: 250 }}>
            <div className="glass-panel p-5 rounded-[32px] w-[280px] transition-all duration-300 cursor-move pointer-events-auto flex flex-col max-h-[400px]">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                        <CheckSquare size={18} className="text-white" />
                        <span className="gradient-text font-bold tracking-wide text-lg">Focus Tasks</span>
                    </div>
                    {tasks.some(t => t.done) && (
                        <button onClick={clearCompleted} className="text-[10px] uppercase tracking-widest font-bold text-white/30 hover:text-white/60 transition-colors">
                            Clear
                        </button>
                    )}
                </div>

                {/* Input Field */}
                <form onSubmit={addTask} className="relative mb-4 group">
                    <input 
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="What's next?"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-4 pr-10 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                        onMouseDown={(e) => e.stopPropagation()}
                    />
                    <button 
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
                    >
                        <Plus size={16} />
                    </button>
                </form>

                {/* Task List */}
                <div className="space-y-2 overflow-y-auto custom-scrollbar flex-1 pr-1">
                    {tasks.length === 0 ? (
                        <div className="text-center py-8 opacity-20 flex flex-col items-center gap-2">
                            <CheckSquare size={32} />
                            <span className="text-xs font-medium">No active tasks</span>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className={`group flex items-center gap-3 p-2 rounded-xl border border-transparent hover:bg-white/5 hover:border-white/5 transition-all ${task.done ? "opacity-50" : "opacity-100"}`}
                            >
                                <button 
                                    onClick={() => toggleTask(task.id)}
                                    className="shrink-0 text-white/60 hover:text-white transition-colors"
                                >
                                    {task.done ? <CheckCircle2 size={18} className="text-[#B6FFDB]" /> : <Circle size={18} />}
                                </button>
                                <span className={`flex-1 text-sm font-medium leading-tight ${task.done ? "line-through" : "text-white/90"}`}>
                                    {task.text}
                                </span>
                                <button 
                                    onClick={() => deleteTask(task.id)}
                                    className="opacity-0 group-hover:opacity-100 p-1 text-white/20 hover:text-red-400 transition-all"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Draggable>
    );
}
