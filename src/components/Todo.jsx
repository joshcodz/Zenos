import { useEffect, useState } from "react";

export default function Todo({ onClose, embedded = false }) {
    const fonts = {
        body: "'Inter', system-ui, sans-serif",
    };

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

    const panelStyle = {
        width: embedded ? 360 : 440,
        minHeight: embedded ? 240 : 320,
        padding: embedded ? 16 : 26,
        borderRadius: 18,
        background: "rgba(20,20,20,0.55)",
        backdropFilter: "blur(18px)",
        color: "white",
        fontFamily: fonts.body,
        display: "flex",
        flexDirection: "column",
    };

    const inputStyle = {
        height: 34,
        padding: "4px 12px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.25)",
        outline: "none",
        background: "rgba(255,255,255,0.14)",
        color: "white",
        fontSize: 13,
        backdropFilter: "blur(6px)",
        marginBottom: 12,
    };

    const checkboxOuter = {
        width: 26,
        height: 26,
        borderRadius: 8,
        border: "1.5px solid rgba(255,255,255,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(6px)",
        transition: "all 0.2s ease",
    };

    const checkboxInner = {
        width: 14,
        height: 14,
        borderRadius: 4,
        background: "linear-gradient(135deg, #4ade80, #22c55e)",
    };

    const trashButton = {
        fontSize: 16,
        cursor: "pointer",
        background: "transparent",
        border: "none",
        opacity: 0.8,
    };

    const minimizeButton = {
        marginTop: "auto",
        height: 36,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.25)",
        background: "rgba(255,255,255,0.12)",
        color: "white",
        cursor: "pointer",
        fontSize: 14,
        backdropFilter: "blur(10px)",
    };

    return (
        <div style={panelStyle}>
            {/* Input */}
            <input
                placeholder="Type task + Enter"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                style={inputStyle}
            />

            {/* Tasks */}
            <div style={{ flex: 1, overflowY: "auto" }}>
                {tasks.map((task, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 10,
                            opacity: task.done ? 0.55 : 1,
                        }}
                    >
                        {/* Checkbox */}
                        <div
                            style={{
                                ...checkboxOuter,
                                borderColor: task.done
                                    ? "#4ade80"
                                    : "rgba(255,255,255,0.45)",
                            }}
                            onClick={() => toggleDone(index)}
                        >
                            {task.done && <div style={checkboxInner} />}
                        </div>

                        {/* Text */}
                        <span
                            style={{
                                flex: 1,
                                fontSize: 14,
                                textDecoration: task.done ? "line-through" : "none",
                            }}
                        >
              {task.text}
            </span>

                        {/* Delete */}
                        <button
                            style={trashButton}
                            onClick={() => removeTask(index)}
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>

            {/* Minimize */}
            <button style={minimizeButton} onClick={onClose}>
                Close
            </button>
        </div>
    );
}
