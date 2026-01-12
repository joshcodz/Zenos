import Dock from "./components/Dock";
import PomodoroWidget from "./components/PomodoroWidget";
import TodoWidget from "./components/TodoWidget";
import DigitalClock from "./components/DigitalClock";

export default function App() {
    return (
        <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
            {/* 🎥 Background */}
            <video
                autoPlay
                loop
                muted
                src="/study.mp4"
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

            {/* Widgets */}
            <DigitalClock />
            <PomodoroWidget />
            <TodoWidget />

            {/* Dock */}
            <Dock />
        </div>
    );
}
