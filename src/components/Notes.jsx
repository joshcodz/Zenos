import { useEffect, useState } from "react";

export default function Notes({ onClose }) {
    const [text, setText] = useState(
        localStorage.getItem("gradiumx-notes") || ""
    );

    /* Auto save */
    useEffect(() => {
        localStorage.setItem("gradiumx-notes", text);
    }, [text]);

    return (
        <div className="flex flex-col h-[360px]">
            {/* Text Area */}
            <textarea
                placeholder="Jot down some notes..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 resize-none rounded-[24px] border border-white/20 outline-none p-6 bg-white/10 text-white text-[15px] font-medium leading-relaxed placeholder:text-white/40 focus:bg-white/[0.15] focus:border-white/40 transition-colors custom-scrollbar shadow-inner"
            />

            {/* Minimize */}
            <button 
                onClick={onClose}
                className="mt-5 h-12 shrink-0 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all font-semibold text-sm text-white shadow-sm"
            >
                Close Notes
            </button>
        </div>
    );
}
