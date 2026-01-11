import { useEffect, useState } from "react";
import Draggable from "./Draggable";

export default function TodoWidget() {
    const [tasks, setTasks] = useState([]);

    function loadTasks() {
        const saved = localStorage.getItem("gradiumx-tasks");
        setTasks(saved ? JSON.parse(saved) : []);
    }

    useEffect(() => {
        loadTasks();

        function handleUpdate() {
            loadTasks();
        }

        window.addEventListener("gradiumx-tasks-updated", handleUpdate);
        return () =>
            window.removeEventListener("gradiumx-tasks-updated", handleUpdate);
    }, []);

    const pendingTasks = tasks.filter((t) => !t.done);

    if (pendingTasks.length === 0) return null;

    return (
        <Draggable>
            <div
                style={{
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(16px)",
                    padding: 14,
                    borderRadius: 14,
                    color: "white",
                    fontSize: 13,
                    width: 260,
                }}
            >
                <h4 style={{ marginBottom: 8 }}>📋 Tasks</h4>

                {pendingTasks.slice(0, 6).map((task, index) => (
                    <div
                        key={index}
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            opacity: 0.9,
                            marginBottom: 4,
                        }}
                    >
                        • {task.text}
                    </div>
                ))}

                {pendingTasks.length > 6 && (
                    <div style={{ opacity: 0.6 }}>
                        +{pendingTasks.length - 6} more...
                    </div>
                )}
            </div>
        </Draggable>
    );
}
