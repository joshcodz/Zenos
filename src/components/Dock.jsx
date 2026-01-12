import { useEffect, useState } from "react";

import pomodoroIcon from "../assets/icons/pomodoro.png";
import tasksIcon from "../assets/icons/tasks.png";
import notesIcon from "../assets/icons/notes.png";
import musicIcon from "../assets/icons/music.png";

import Pomodoro from "./Pomodoro";
import Todo from "./Todo";
import Notes from "./Notes";
import MusicPanel from "./MusicPanel";

const icons = [
    { name: "Pomodoro", icon: pomodoroIcon },
    { name: "Tasks", icon: tasksIcon },
    { name: "Notes", icon: notesIcon },
    { name: "Music", icon: musicIcon },
];

export default function Dock() {
    const [visible, setVisible] = useState(false);
    const [activePanel, setActivePanel] = useState(null);

    /* Auto hide dock */
    useEffect(() => {
        function handleMouseMove(e) {
            const h = window.innerHeight;
            setVisible(e.clientY > h - 80);
        }

        window.addEventListener("mousemove", handleMouseMove);
        return () =>
            window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    function togglePanel(name) {
        setActivePanel((prev) => (prev === name ? null : name));
    }

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
            }}
        >
            {/* 🚀 Embedded Panel */}
            {activePanel && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 76,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(20,20,20,0.75)",
                        backdropFilter: "blur(22px)",
                        borderRadius: 18,
                        padding: 14,
                        width: 380,
                        animation: "slideUp 0.25s ease-out",
                    }}
                >
                    {activePanel === "Pomodoro" && (
                        <Pomodoro embedded onClose={() => setActivePanel(null)} />
                    )}

                    {activePanel === "Tasks" && (
                        <Todo embedded onClose={() => setActivePanel(null)} />
                    )}

                    {activePanel === "Notes" && (
                        <Notes embedded onClose={() => setActivePanel(null)} />
                    )}

                    {activePanel === "Music" && (
                        <MusicPanel onClose={() => setActivePanel(null)} />
                    )}
                </div>
            )}

            {/* 🧭 Dock */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    transform: visible
                        ? "translateY(0)"
                        : "translateY(calc(100% - 12px))",
                    transition: "transform 0.3s ease",
                    paddingBottom: 12,
                }}
            >
                <div
                    className="flex gap-6 px-8 py-3 rounded-2xl
                     bg-white/10 backdrop-blur-xl
                     border border-white/20 shadow-xl"
                >
                    {icons.map((icon) => {
                        const active = activePanel === icon.name;

                        return (
                            <div
                                key={icon.name}
                                onClick={() => togglePanel(icon.name)}
                                className="group flex flex-col items-center cursor-pointer
                           transition-all duration-300 ease-out
                           hover:-translate-y-1 hover:scale-125"
                            >
                                <img
                                    src={icon.icon}
                                    draggable="false"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        objectFit: "contain",
                                        filter: active
                                            ? "drop-shadow(0 0 6px white)"
                                            : "none",
                                    }}
                                />

                                <span
                                    className="text-[10px] text-white/70 mt-1 opacity-0
                             transition-opacity duration-300
                             group-hover:opacity-100"
                                >
                  {icon.name}
                </span>

                                {active && (
                                    <div
                                        style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: 999,
                                            background: "white",
                                            marginTop: 4,
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 🎞 Animation */}
            <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
        </div>
    );
}
