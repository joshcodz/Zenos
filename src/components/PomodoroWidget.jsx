import { useEffect, useState } from "react";
import Draggable from "./Draggable";

export default function PomodoroWidget() {
    const [enabled, setEnabled] = useState(false);
    const [remaining, setRemaining] = useState(0);
    const [mode, setMode] = useState("focus");
    const [running, setRunning] = useState(false);

    function load() {
        setEnabled(localStorage.getItem("gradiumx-pomodoro-enabled") === "true");
        setMode(localStorage.getItem("gradiumx-pomodoro-mode") || "focus");
        setRunning(localStorage.getItem("gradiumx-pomodoro-running") === "true");

        const end = Number(localStorage.getItem("gradiumx-pomodoro-end")) || 0;
        const now = Date.now();
        const diff = Math.max(0, Math.floor((end - now) / 1000));
        setRemaining(diff);
    }

    useEffect(() => {
        load();

        const tick = setInterval(load, 1000);

        function sync() {
            load();
        }

        window.addEventListener("gradiumx-pomodoro-update", sync);

        return () => {
            clearInterval(tick);
            window.removeEventListener("gradiumx-pomodoro-update", sync);
        };
    }, []);

    if (!enabled) return null;

    const mins = String(Math.floor(remaining / 60)).padStart(2, "0");
    const secs = String(remaining % 60).padStart(2, "0");

    return (
        <Draggable>
            <div
                style={{
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(16px)",
                    padding: 12,
                    borderRadius: 12,
                    color: "white",
                    width: 170,
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                    ⏱ {mode.toUpperCase()}
                </div>

                <div style={{ fontSize: 28, fontFamily: "monospace" }}>
                    {mins}:{secs}
                </div>

                {!running && (
                    <div style={{ fontSize: 10, opacity: 0.6 }}>
                        Paused
                    </div>
                )}
            </div>
        </Draggable>
    );
}
