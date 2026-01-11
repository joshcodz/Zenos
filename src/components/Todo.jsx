import { useEffect, useState } from "react";

export default function Todo({ onClose }) {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("gradiumx-tasks");
        return saved ? JSON.parse(saved) : [];
    });

    const [input, setInput] = useState("");

    useEffect(() => {
        localStorage.setItem("gradiumx-tasks", JSON.stringify(tasks));
        window.dispatchEvent(new Event("gradiumx-tasks-updated"));
    }, [tasks]);


    function addTask() {
        if (!input.trim()) return;
        setTasks([...tasks, { text: input, done: false }]);
        setInput("");
    }

    function toggleTask(index) {
        const updated = [...tasks];
        updated[index].done = !updated[index].done;
        setTasks(updated);
    }

    function deleteTask(index) {
        const updated = [...tasks];
        updated.splice(index, 1);
        setTasks(updated);
    }

    return (
        <div
            style={{
                position: "fixed",
                bottom: "140px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(20px)",
                padding: "20px",
                borderRadius: "16px",
                color: "white",
                width: "360px",
                zIndex: 9999,
            }}
        >
            <h2 style={{ fontSize: 20, marginBottom: 12 }}>✅ To-Do List</h2>

            {/* Input */}
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add new task..."
                    style={{
                        flex: 1,
                        padding: 8,
                        borderRadius: 6,
                        border: "none",
                        outline: "none",
                    }}
                />

                <button onClick={addTask}>Add</button>
            </div>

            {/* Task List */}
            <div style={{ maxHeight: 200, overflowY: "auto" }}>
                {tasks.length === 0 && (
                    <p style={{ opacity: 0.6 }}>No tasks yet 👀</p>
                )}

                {tasks.map((task, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 6,
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleTask(index)}
                        />

                        <span
                            style={{
                                flex: 1,
                                textDecoration: task.done ? "line-through" : "none",
                                opacity: task.done ? 0.5 : 1,
                            }}
                        >
              {task.text}
            </span>

                        <button onClick={() => deleteTask(index)}>❌</button>
                    </div>
                ))}
            </div>

            <button
                onClick={onClose}
                style={{
                    marginTop: 10,
                    width: "100%",
                }}
            >
                Close
            </button>
        </div>
    );
}
