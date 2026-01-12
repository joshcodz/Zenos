import { useEffect, useState } from "react";

export default function Notes({ onClose, embedded = false }) {
    const fonts = {
        body: "'Inter', system-ui, sans-serif",
    };

    const [text, setText] = useState(
        localStorage.getItem("gradiumx-notes") || ""
    );

    /* Auto save */
    useEffect(() => {
        localStorage.setItem("gradiumx-notes", text);
    }, [text]);

    const panelStyle = {
        width: embedded ? 360 : 480,
        minHeight: embedded ? 260 : 380,
        padding: embedded ? 16 : 26,
        borderRadius: 18,
        background: "rgba(20,20,20,0.55)",
        backdropFilter: "blur(18px)",
        color: "white",
        fontFamily: fonts.body,
        display: "flex",
        flexDirection: "column",
    };

    const textareaStyle = {
        flex: 1,
        resize: "none",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.25)",
        outline: "none",
        padding: "12px 14px",
        background: "rgba(255,255,255,0.14)",
        color: "white",
        fontSize: 14,
        backdropFilter: "blur(6px)",
        lineHeight: 1.5,
    };

    const minimizeButton = {
        marginTop: 12,
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
            {/* Text Area */}
            <textarea
                placeholder="Write your notes here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={textareaStyle}
            />

            {/* Minimize */}
            <button style={minimizeButton} onClick={onClose}>
                Close
            </button>
        </div>
    );
}
