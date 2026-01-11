import { useState } from "react";

export default function Draggable({ children }) {
    const [pos, setPos] = useState({ x: window.innerWidth / 2 - 160, y: 200 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    function onMouseDown(e) {
        setDragging(true);
        setOffset({
            x: e.clientX - pos.x,
            y: e.clientY - pos.y,
        });
    }

    function onMouseMove(e) {
        if (!dragging) return;
        setPos({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    }

    function onMouseUp() {
        setDragging(false);
    }

    return (
        <div
            style={{
                position: "fixed",
                left: pos.x,
                top: pos.y,
                cursor: dragging ? "grabbing" : "grab",
                zIndex: 9999,
            }}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
        >
            <div onMouseDown={onMouseDown}>{children}</div>
        </div>
    );
}
