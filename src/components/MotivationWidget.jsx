import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import Draggable from "./Draggable";

const quotes = [
    "The obstacle is the way.",
    "Do not let the behavior of others destroy your inner peace.",
    "Waste no more time arguing what a good man should be. Be one.",
    "First say to yourself what you would be; and then do what you have to do.",
    "The secret of getting ahead is getting started."
];

export default function MotivationWidget() {
    const [enabled, setEnabled] = useState(false);
    const [quote, setQuote] = useState(quotes[0]);

    useEffect(() => {
        function loadData() {
            setEnabled(localStorage.getItem("gradiumx-motivation-enabled") === "true");
        }

        loadData();
        window.addEventListener("gradiumx-motivation-update", loadData);

        return () => window.removeEventListener("gradiumx-motivation-update", loadData);
    }, []);

    useEffect(() => {
        // Change quote every hour
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, [enabled]);

    if (!enabled) return null;

    return (
        <Draggable defaultPosition={{ x: 40, y: window.innerHeight - 160 }}>
            <div className="glass-panel p-6 w-72 rounded-[32px] transition-all duration-300 cursor-move pointer-events-auto">
                <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-3">
                    <Quote size={18} className="text-white" />
                    <span className="gradient-text font-bold tracking-wide text-lg">Daily Stoic</span>
                </div>
                <div className="text-white/90 font-medium leading-relaxed italic text-[15px]">
                    "{quote}"
                </div>
            </div>
        </Draggable>
    );
}
