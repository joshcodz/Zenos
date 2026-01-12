import { useEffect, useState } from "react";
import Draggable from "./Draggable";

export default function TodoWidget() {
    /* ---------------- FONT SYSTEM ---------------- */

    const fonts = {
        title: "'Montreal', system-ui, sans-serif",
        body: "'Roboto', system-ui, sans-serif",
    };

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        function loadTasks() {
            const saved = localStorage.getItem("gradiumx-tasks");
            setTasks(saved ? JSON.parse(saved) : []);
        }

        loadTasks();
        window.addEventListener("gradiumx-tasks-updated", loadTasks);

        return () =>
            window.removeEventListener("gradiumx-tasks-updated", loadTasks);
    }, []);

    return (
        <Draggable>
            <div
                style={{
                    background: "rgba(25,25,25,0.65)",
                    backdropFilter: "blur(18px)",
                    padding: 20,
                    borderRadius: 18,
                    minWidth: 260,
                    color: "white",
                    fontFamily: fonts.body,
                }}
            >
                {/* Title */}
                <div
                    style={{
                        fontSize: 20,
                        fontWeight: 600,
                        marginBottom: 12,
                        fontFamily: fonts.title,
                        letterSpacing: 0.3,
                    }}
                >
                    📝 Tasks
                </div>

                {/* Task List */}
                {tasks.length === 0 && (
                    <div style={{ opacity: 0.6, fontSize: 15 }}>
                        No tasks yet
                    </div>
                )}

                {tasks.slice(0, 5).map((task, index) => (
                    <div
                        key={index}
                        style={{
                            fontSize: 16,
                            marginBottom: 8,
                            opacity: task.done ? 0.5 : 1,
                            textDecoration: task.done ? "line-through" : "none",
                            lineHeight: 1.4,
                        }}
                    >
                        • {task.text}
                    </div>
                ))}
            </div>
        </Draggable>
    );
}
