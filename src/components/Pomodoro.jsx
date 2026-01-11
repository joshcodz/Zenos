import { useEffect, useState } from "react";
import Draggable from "./Draggable";

export default function Pomodoro({ onClose }) {
    const [focusMin, setFocusMin] = useState(
        Number(localStorage.getItem("gradiumx-focus")) || 25
    );
    const [breakMin, setBreakMin] = useState(
        Number(localStorage.getItem("gradiumx-break")) || 5
    );

    const [mode, setMode] = useState(
        localStorage.getItem("gradiumx-pomodoro-mode") || "focus"
    );

    const [running, setRunning] = useState(
        localStorage.getItem("gradiumx-pomodoro-running") === "true"
    );

    const [enabled, setEnabled] = useState(
        localStorage.getItem("gradiumx-pomodoro-enabled") === "true"
    );

    const FOCUS = focusMin * 60;
    const BREAK = breakMin * 60;

    /* Persist settings */
    useEffect(() => {
        localStorage.setItem("gradiumx-focus", focusMin);
        localStorage.setItem("gradiumx-break", breakMin);
    }, [focusMin, breakMin]);

    /* ---------- TIMER CONTROL (BACKGROUND SAFE) ---------- */

    function startTimer() {
        const duration = mode === "focus" ? FOCUS : BREAK;
        const endTime = Date.now() + duration * 1000;

        localStorage.setItem("gradiumx-pomodoro-end", String(endTime));
        localStorage.setItem("gradiumx-pomodoro-running", "true");

        window.dispatchEvent(new Event("gradiumx-pomodoro-update"));
        setRunning(true);
    }

    function pauseTimer() {
        localStorage.setItem("gradiumx-pomodoro-running", "false");
        window.dispatchEvent(new Event("gradiumx-pomodoro-update"));
        setRunning(false);
    }

    function resetTimer() {
        const duration = mode === "focus" ? FOCUS : BREAK;
        const endTime = Date.now() + duration * 1000;

        localStorage.setItem("gradiumx-pomodoro-end", String(endTime));
        window.dispatchEvent(new Event("gradiumx-pomodoro-update"));
    }

    function toggleWidget() {
        const next = !enabled;
        setEnabled(next);
        localStorage.setItem("gradiumx-pomodoro-enabled", String(next));
        window.dispatchEvent(new Event("gradiumx-pomodoro-update"));
    }

    /* ---------- UI HELPERS ---------- */

    function getRemaining() {
        const end = Number(localStorage.getItem("gradiumx-pomodoro-end")) || 0;
        const diff = Math.max(0, Math.floor((end - Date.now()) / 1000));
        return diff;
    }

    const remaining = getRemaining();
    const mins = String(Math.floor(remaining / 60)).padStart(2, "0");
    const secs = String(remaining % 60).padStart(2, "0");

    /* ---------- STYLES ---------- */

    const inputStyle = {
        flex: 1,
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.25)",
        outline: "none",
        background: "rgba(255,255,255,0.15)",
        color: "white",
        fontSize: 14,
    };

    const baseButton = {
        flex: 1,
        padding: "10px 12px",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.25)",
        background: "rgba(255,255,255,0.15)",
        color: "white",
        cursor: "pointer",
        transition: "all 0.2s ease",
        backdropFilter: "blur(6px)",
        fontSize: 14,
    };

    const primaryButton = {
        ...baseButton,
        background: "linear-gradient(135deg, #4ade80, #22c55e)",
        color: "#052e16",
        fontWeight: 600,
    };

    const dangerButton = {
        ...baseButton,
        background: "linear-gradient(135deg, #f87171, #ef4444)",
        color: "#450a0a",
        fontWeight: 600,
    };



    const neutralButton = {
        ...baseButton,
    };

    return (
        <Draggable>
            <div
                style={{
                    background: "rgba(25,25,25,0.75)",
                    backdropFilter: "blur(18px)",
                    padding: 24,
                    borderRadius: 20,
                    color: "white",
                    width: 440,
                }}
            >
                <h2 style={{ marginBottom: 12 }}>
                    ⏱ Pomodoro — {mode.toUpperCase()}
                </h2>

                {/* ⏲ Time */}
                <div
                    style={{
                        fontSize: 56,
                        textAlign: "center",
                        marginBottom: 16,
                        fontFamily: "monospace",
                        letterSpacing: 2,
                    }}
                >
                    {mins}:{secs}
                </div>

                {/* ⌨ Inputs */}
                <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                    <input
                        type="number"
                        placeholder="Focus (minutes)"
                        value={focusMin}
                        onChange={(e) => setFocusMin(Number(e.target.value))}
                        style={inputStyle}
                    />

                    <input
                        type="number"
                        placeholder="Break (minutes)"
                        value={breakMin}
                        onChange={(e) => setBreakMin(Number(e.target.value))}
                        style={inputStyle}
                    />
                </div>

                {/* 🎛 Controls */}
                <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                    <button
                        style={primaryButton}
                        onClick={() => (running ? pauseTimer() : startTimer())}
                    >
                        {running ? "Pause" : "Start"}
                    </button>

                    <button style={neutralButton} onClick={resetTimer}>
                        Reset
                    </button>

                    <button style={neutralButton} onClick={toggleWidget}>
                        {enabled ? "Disable Dashboard" : "Enable Dashboard"}
                    </button>
                </div>

                <button
                    style={{ ...dangerButton, width: "100%" }}
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </Draggable>
    );
}
