import { useEffect, useState } from "react";

export default function DigitalClock({ timeFormat = "12h", showGreeting = true, zenMode = false }) {
    const [time, setTime] = useState(new Date());
    const [userName, setUserName] = useState("Guest");

    useEffect(() => {
        setUserName(localStorage.getItem("gradiumx-username") || "Guest");
        
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    let hoursNum = time.getHours();
    const ampm = hoursNum >= 12 ? "PM" : "AM";
    
    if (timeFormat === "12h") {
        hoursNum = hoursNum % 12 || 12;
    }

    const hours = String(hoursNum).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
    
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateStr = time.toLocaleDateString('en-US', dateOptions);

    let greeting = "Good Evening";
    const h = time.getHours();
    if (h >= 5 && h < 12) greeting = "Good Morning";
    else if (h >= 12 && h < 17) greeting = "Good Afternoon";

    return (
        <div className={`fixed z-[1000] pointer-events-none drop-shadow-2xl flex flex-col transition-all duration-1000 ${zenMode ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center' : 'top-8 left-10'}`}>
            {showGreeting && (
                <div className={`text-xl font-semibold text-white/80 tracking-wide mb-2 drop-shadow-lg select-none transition-all duration-1000 ${zenMode ? 'text-2xl mb-4' : 'ml-2'}`}>
                    {greeting}, {userName}.
                </div>
            )}
            <div className={`leading-none font-bold text-white tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-baseline select-none transition-all duration-1000 ${zenMode ? 'text-[140px]' : 'text-[96px]'}`}>
                {hours}<span className="opacity-70 mx-1 font-light">:</span>{minutes}
                {!zenMode && <span className="text-4xl text-white/60 ml-4 font-semibold tracking-normal">:{seconds}</span>}
                {timeFormat === "12h" && zenMode && <span className="text-4xl text-white/50 ml-6 font-medium tracking-wide">{ampm}</span>}
            </div>
            <div className={`font-semibold text-white/80 tracking-[0.2em] uppercase drop-shadow-lg select-none transition-all duration-1000 ${zenMode ? 'text-2xl mt-6' : 'text-xl mt-4 ml-3'}`}>
                {dateStr}
            </div>
        </div>
    );
}
