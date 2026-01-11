import { useState } from "react";
import Dock from "./components/Dock";
import Pomodoro from "./components/Pomodoro";
import PomodoroWidget from "./components/PomodoroWidget";
import Notes from "./components/Notes";
import Todo from "./components/Todo";
import TodoWidget from "./components/TodoWidget";
import DigitalClock from "./components/DigitalClock";

export default function App() {
    const [showPomodoro, setShowPomodoro] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [showTodo, setShowTodo] = useState(false);

    return (
        <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>

            {/* 🎥 Background */}
            <video
                autoPlay
                loop
                muted
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
                src="/study.mp4"
            />

            {/* 🌑 Overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.4)",
                }}
            />

            {/* ⏰ Clock */}
            <DigitalClock />

            {/* ⏱ Permanent Pomodoro Widget */}
            <PomodoroWidget />

            {/* 📋 Todo Widget */}
            <TodoWidget />

            {/* Panels */}
            {showPomodoro && (
                <Pomodoro onClose={() => setShowPomodoro(false)} />
            )}

            {showNotes && (
                <Notes onClose={() => setShowNotes(false)} />
            )}

            {showTodo && (
                <Todo onClose={() => setShowTodo(false)} />
            )}

            {/* 🚀 Dock */}
            <Dock
                onPomodoroClick={() => setShowPomodoro(true)}
                onNotesClick={() => setShowNotes(true)}
                onTodoClick={() => setShowTodo(true)}
            />
        </div>
    );
}
