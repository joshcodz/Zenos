import { useEffect, useState } from "react";

export default function Pomodoro({ onClose, embedded = false }) {
    const fonts = {
        body: "'Inter', system-ui, sans-serif",
        mono: "'JetBrains Mono', monospace",
    };

    const [focusMin, setFocusMin] = useState(
        Number(localStorage.getItem("gradiumx-focus")) || 25
    );
    const [breakMin, setBreakMin] = useState(
        Number(localStorage.getItem("gradiumx-break")) || 5
    );
    const [running, setRunning] = useState(
        localStorage.getItem("gradiumx-pomodoro-running") === "true"
    );
    const [enabled, setEnabled] = useState(
        localStorage.getItem("gradiumx-pomodoro-enabled") === "true"
    );

    const FOCUS = focusMin * 60;
    const BREAK = breakMin * 60;

    useEffect(() => {
        localStorage.setItem("gradiumx-focus", focusMin);
        localStorage.setItem("gradiumx-break", breakMin);
    }, [focusMin, breakMin]);

    function startTimer() {
        const endTime = Date.now() + FOCUS * 1000;
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

    function toggleWidget() {
        const next = !enabled;
        setEnabled(next);
        localStorage.setItem("gradiumx-pomodoro-enabled", String(next));
        window.dispatchEvent(new Event("gradiumx-pomodoro-update"));
    }

    const panelStyle = {
        width: embedded ? 340 : 440,
        padding: embedded ? 14 : 26,
        borderRadius: 18,
        background: "rgba(20,20,20,0.55)",
        backdropFilter: "blur(18px)",
        color: "white",
        fontFamily: fonts.body,
    };

    const inputStyle = {
        flex: 1,
        height: 34,
        padding: "4px 10px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.25)",
        outline: "none",
        background: "rgba(255,255,255,0.14)",
        color: "white",
        fontSize: 13,
        fontFamily: fonts.body,
        backdropFilter: "blur(6px)",
    };

    const button = {
        flex: 1,
        height: 34,
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.25)",
        background: "rgba(255,255,255,0.15)",
        color: "white",
        fontSize: 13,
        cursor: "pointer",
        backdropFilter: "blur(8px)",
    };

    return (
        <div style={panelStyle}>
            <div
                style={{
                    fontSize: embedded ? 34 : 52,
                    textAlign: "center",
                    fontFamily: fonts.mono,
                    marginBottom: 10,
                    letterSpacing: 2,
                }}
            >
                25:00
            </div>

            {/* Inputs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <input
                    type="number"
                    value={focusMin}
                    onChange={(e) => setFocusMin(Number(e.target.value))}
                    placeholder="Focus"
                    style={inputStyle}
                />

                <input
                    type="number"
                    value={breakMin}
                    onChange={(e) => setBreakMin(Number(e.target.value))}
                    placeholder="Break"
                    style={inputStyle}
                />
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 8 }}>
                <button
                    style={button}
                    onClick={() => (running ? pauseTimer() : startTimer())}
                >
                    {running ? "Pause" : "Start"}
                </button>

                <button style={button} onClick={toggleWidget}>
                    {enabled ? "Hide Widget" : "Show Widget"}
                </button>

                <button style={button} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}
