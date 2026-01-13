import { useEffect, useState } from "react";

import Dock from "./components/Dock";
import PomodoroWidget from "./components/PomodoroWidget";
import TodoWidget from "./components/TodoWidget";
import DigitalClock from "./components/DigitalClock";
import MiniPlayer from "./components/MiniPlayer";
import BackgroundSelector from "./components/BackgroundSelector";
import VideoCreditToast from "./components/VideoCreditToast";
import FullscreenToggle from "./components/FullscreenToggle";

export default function App() {
    const [background, setBackground] = useState(
        localStorage.getItem("bg") || "/backgrounds/thumbs/skyline.mp4"
    );

    const [credit, setCredit] = useState(null);

    /* Persist selected background */
    useEffect(() => {
        localStorage.setItem("bg", background);
    }, [background]);

    return (
        <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
            {/* 🎥 Background Video */}
            <video
                key={background}
                autoPlay
                loop
                muted
                playsInline
                src={background}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />

            {/* 🌑 Overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.45)",
                }}
            />

            {/* 🧭 Spaces Selector */}
            <BackgroundSelector
                current={background}
                onChange={(video, creditData) => {
                    setBackground(video);
                    setCredit(creditData);
                }}
            />

            {/* 🎬 Credit Toast */}
            <VideoCreditToast credit={credit} />

            {/* 🖥 Fullscreen Toggle */}
            <FullscreenToggle />

            {/* Widgets */}
            <DigitalClock />
            <PomodoroWidget />
            <TodoWidget />
            <MiniPlayer />

            {/* Dock */}
            <Dock />
        </div>
    );
}
