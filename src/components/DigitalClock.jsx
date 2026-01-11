import { useEffect, useState } from "react";

export default function DigitalClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");

    return (
        <div
            style={{
                position: "fixed",
                top: 20,
                left: 20,
                fontSize: 36,
                fontWeight: "600",
                fontFamily: "monospace",
                color: "white",
                letterSpacing: 2,
                zIndex: 1000,
                pointerEvents: "none", // click-through (optional)
                background: "transparent", // fully transparent
            }}
        >
            {hours}:{minutes}:{seconds}
        </div>
    );
}
