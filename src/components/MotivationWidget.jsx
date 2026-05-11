import { useEffect, useState } from "react";
import { Quote, RefreshCw } from "lucide-react";
import Draggable from "./Draggable";

const quotes = [
    "The obstacle is the way.",
    "Do not let the behavior of others destroy your inner peace.",
    "Waste no more time arguing what a good man should be. Be one.",
    "First say to yourself what you would be; and then do what you have to do.",
    "The secret of getting ahead is getting started.",
    "You have power over your mind - not outside events. Realize this, and you will find strength.",
    "The happiness of your life depends upon the quality of your thoughts.",
    "Think of yourself as dead. You have lived your life. Now, take what's left and live it properly.",
    "It is not death that a man should fear, but he should fear never beginning to live.",
    "Very little is needed to make a happy life; it is all within yourself in your way of thinking."
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

    const shuffle = () => {
        let next;
        do {
            next = quotes[Math.floor(Math.random() * quotes.length)];
        } while (next === quote);
        setQuote(next);
    };

    if (!enabled) return null;

    return (
        <Draggable defaultPosition={{ x: 40, y: window.innerHeight - 200 }}>
            <div className="glass-panel p-5 w-72 rounded-[32px] transition-all duration-300 cursor-move pointer-events-auto group">
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                        <Quote size={18} className="text-white" />
                        <span className="gradient-text font-bold tracking-wide text-lg">Daily Stoic</span>
                    </div>
                    <button 
                        onClick={shuffle}
                        className="p-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all active:rotate-180 duration-500"
                    >
                        <RefreshCw size={14} />
                    </button>
                </div>
                <div className="text-white/90 font-medium leading-relaxed italic text-[15px] px-1">
                    "{quote}"
                </div>
            </div>
        </Draggable>
    );
}
