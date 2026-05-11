import { useEffect, useState } from "react";
import { Link, ExternalLink, Plus, Trash2, X } from "lucide-react";
import Draggable from "./Draggable";

export default function QuickLinksWidget() {
    const [enabled, setEnabled] = useState(false);
    const [links, setLinks] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [newName, setNewName] = useState("");
    const [newUrl, setNewUrl] = useState("");

    useEffect(() => {
        function loadData() {
            setEnabled(localStorage.getItem("gradiumx-quicklinks-enabled") === "true");
            const saved = localStorage.getItem("gradiumx-links");
            setLinks(saved ? JSON.parse(saved) : [
                { name: "Notion", url: "https://notion.so" },
                { name: "GitHub", url: "https://github.com" },
                { name: "ChatGPT", url: "https://chat.openai.com" }
            ]);
        }

        loadData();
        window.addEventListener("gradiumx-quicklinks-update", loadData);
        return () => window.removeEventListener("gradiumx-quicklinks-update", loadData);
    }, []);

    const saveLinks = (newLinks) => {
        setLinks(newLinks);
        localStorage.setItem("gradiumx-links", JSON.stringify(newLinks));
    };

    const addLink = () => {
        if (!newName || !newUrl) return;
        let url = newUrl;
        if (!url.startsWith("http")) url = "https://" + url;
        const newLinks = [...links, { name: newName, url }];
        saveLinks(newLinks);
        setNewName("");
        setNewUrl("");
        setShowAdd(false);
    };

    const removeLink = (idx) => {
        const newLinks = links.filter((_, i) => i !== idx);
        saveLinks(newLinks);
    };

    if (!enabled) return null;

    return (
        <Draggable defaultPosition={{ x: window.innerWidth - 320, y: window.innerHeight - 340 }}>
            <div className="glass-panel p-5 rounded-[32px] w-64 transition-all duration-300 cursor-move pointer-events-auto flex flex-col max-h-[400px]">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                        <Link size={18} className="text-white" />
                        <span className="gradient-text font-bold tracking-wide text-lg">Quick Links</span>
                    </div>
                    <button 
                        onClick={() => setShowAdd(!showAdd)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${showAdd ? 'bg-red-500/20 text-red-300 rotate-45' : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'}`}
                    >
                        <Plus size={16} />
                    </button>
                </div>
                
                {showAdd && (
                    <div className="space-y-2 mb-4 p-3 rounded-2xl bg-white/5 border border-white/10">
                        <input 
                            type="text" placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-white/30"
                            onMouseDown={e => e.stopPropagation()}
                        />
                        <input 
                            type="text" placeholder="URL" value={newUrl} onChange={e => setNewUrl(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-white/30"
                            onMouseDown={e => e.stopPropagation()}
                        />
                        <button 
                            onClick={addLink}
                            className="w-full bg-white text-black text-[10px] font-bold uppercase tracking-widest py-2 rounded-xl hover:scale-105 transition-transform"
                        >
                            Save Link
                        </button>
                    </div>
                )}

                <div className="space-y-2 overflow-y-auto custom-scrollbar flex-1 pr-1">
                    {links.map((link, idx) => (
                        <div key={idx} className="group relative">
                            <a 
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all text-white/90"
                            >
                                <span className="font-medium text-sm truncate pr-4">{link.name}</span>
                                <ExternalLink size={12} className="text-white/20 group-hover:text-white/60" />
                            </a>
                            <button 
                                onClick={() => removeLink(idx)}
                                className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center text-red-300 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Draggable>
    );
}
