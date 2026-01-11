import { useEffect, useState } from "react";

// ✅ Import your icons from src/icons
import pomodoroIcon from "../assets/icons/pomodoro.png";
import notesIcon from "../assets/icons/notes.png";
import tasksIcon from "../assets/icons/tasks.png";
import calendarIcon from "../assets/icons/calendar.png";
import musicIcon from "../assets/icons/music.png";
import settingsIcon from "../assets/icons/settings.png";


const icons = [
    { name: "Pomodoro", icon: pomodoroIcon },
    { name: "Notes", icon: notesIcon },
    { name: "Tasks", icon: tasksIcon },
    { name: "Calendar", icon: calendarIcon },
    { name: "Music", icon: musicIcon },
    { name: "Settings", icon: settingsIcon },
];

export default function Dock({
                                 onPomodoroClick = () => {},
                                 onNotesClick = () => {},
                                 onTodoClick = () => {},
                             }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        function handleMouseMove(e) {
            const screenHeight = window.innerHeight;

            // 👇 Show dock when mouse near bottom 60px
            if (e.clientY > screenHeight - 60) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        }

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",

                // 👇 Auto hide animation
                transform: visible
                    ? "translateY(0)"
                    : "translateY(calc(100% - 12px))",

                transition: "transform 0.3s ease-out",
                zIndex: 9999,
                paddingBottom: 12,
            }}
        >
            <div
                className="flex gap-15 px-8 py-3 rounded-2xl
                   bg-white/10 backdrop-blur-xl
                   border border-white/20 shadow-xl"
            >
                {icons.map((icon, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            if (icon.name === "Pomodoro") onPomodoroClick();
                            if (icon.name === "Notes") onNotesClick();
                            if (icon.name === "Tasks") onTodoClick();
                        }}
                        className="group flex flex-col items-center cursor-pointer
                       transition-all duration-300 ease-out
                       hover:-translate-y-1 hover:scale-125"
                    >
                        {/* ✅ Force icon size */}
                        <img
                            src={icon.icon}
                            alt={icon.name}
                            draggable="false"
                            style={{
                                width: 50,
                                height: 50,
                                objectFit: "cover"
                            }}
                            className="w-8 h-8 object-contain drop-shadow-lg"
                        />

                        <span
                            className="text-[10px] text-white/70 mt-1 opacity-0
                         transition-opacity duration-300
                         group-hover:opacity-100"
                        >
              {icon.name}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
