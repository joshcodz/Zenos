import { useEffect, useState } from "react";

export default function FullscreenToggle() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const onChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", onChange);
        return () =>
            document.removeEventListener("fullscreenchange", onChange);
    }, []);

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    return (
        <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            style={{
                position: "fixed",
                right: 18,
                top: 18,
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                fontSize: 18,
                cursor: "pointer",
                zIndex: 10000,
                boxShadow: "0 0 20px rgba(255,255,255,0.35)",
                transition: "0.25s ease",
            }}
        >
            {isFullscreen ? "🡼" : "⛶"}
        </button>
    );
}
