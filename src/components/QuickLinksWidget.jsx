import { useEffect, useState } from "react";
import { Link, ExternalLink } from "lucide-react";
import Draggable from "./Draggable";

const links = [
    { name: "Notion", url: "https://notion.so" },
    { name: "GitHub", url: "https://github.com" },
    { name: "ChatGPT", url: "https://chatgpt.com" }
];

export default function QuickLinksWidget() {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        function loadData() {
            setEnabled(localStorage.getItem("gradiumx-quicklinks-enabled") === "true");
        }

        loadData();
        window.addEventListener("gradiumx-quicklinks-update", loadData);

        return () => window.removeEventListener("gradiumx-quicklinks-update", loadData);
    }, []);

    if (!enabled) return null;

    return (
        <Draggable defaultPosition={{ x: window.innerWidth - 320, y: window.innerHeight - 260 }}>
            <div className="glass-panel p-6 rounded-[32px] w-64 transition-all duration-300 cursor-move pointer-events-auto">
                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                    <Link size={18} className="text-white" />
                    <span className="gradient-text font-bold tracking-wide text-lg">Quick Links</span>
                </div>
                
                <div className="space-y-3">
                    {links.map((link, idx) => (
                        <a 
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all text-white/90 group"
                        >
                            <span className="font-medium text-[15px]">{link.name}</span>
                            <ExternalLink size={14} className="text-white/40 group-hover:text-white/80 transition-colors" />
                        </a>
                    ))}
                </div>
            </div>
        </Draggable>
    );
}
