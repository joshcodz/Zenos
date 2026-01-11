import { useEffect, useState } from "react";
import Draggable from "./Draggable";

export default function Notes({ onClose }) {
    const [text, setText] = useState(
        localStorage.getItem("gradiumx-notes") || ""
    );

    useEffect(() => {
        localStorage.setItem("gradiumx-notes", text);
    }, [text]);

    return (
        <Draggable>
            <div
                style={{
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(20px)",
                    padding: "20px",
                    borderRadius: "16px",
                    color: "white",
                    width: "360px",
                }}
            >
                <h2 style={{ fontSize: 20, marginBottom: 12 }}>📝 Notes</h2>

                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your notes here..."
                    style={{
                        width: "100%",
                        height: "200px",
                        background: "rgba(0,0,0,0.35)",
                        border: "none",
                        borderRadius: 8,
                        padding: 10,
                        color: "white",
                        resize: "none",
                        outline: "none",
                    }}
                />

                <button
                    onClick={onClose}
                    style={{
                        marginTop: 12,
                        width: "100%",
                        padding: "8px",
                    }}
                >
                    Close
                </button>
            </div>
        </Draggable>
    );
}
