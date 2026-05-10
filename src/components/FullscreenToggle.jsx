import { useEffect, useState } from "react";
import { Maximize, Minimize } from "lucide-react";

export default function FullscreenToggle() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        function onFullscreenChange() {
            setIsFullscreen(!!document.fullscreenElement);
        }

        document.addEventListener("fullscreenchange", onFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
    }, []);

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    }

    return (
        <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-all"
        >
            {isFullscreen ? <Minimize size={20} strokeWidth={2} /> : <Maximize size={20} strokeWidth={2} />}
        </button>
    );
}
