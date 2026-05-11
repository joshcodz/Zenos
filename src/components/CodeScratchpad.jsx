import { useEffect, useState } from "react";
import { Code2, Copy, Check, Trash2 } from "lucide-react";
import Draggable from "./Draggable";

export default function CodeScratchpad() {
    const [enabled, setEnabled] = useState(false);
    const [code, setCode] = useState("");
    const [copied, setCopied] = useState(false);
    const [language, setLanguage] = useState("js");

    useEffect(() => {
        function loadData() {
            setEnabled(localStorage.getItem("gradiumx-scratchpad-enabled") === "true");
            setCode(localStorage.getItem("gradiumx-scratchpad-code") || "// Write your code here...\n");
            setLanguage(localStorage.getItem("gradiumx-scratchpad-lang") || "js");
        }

        loadData();
        window.addEventListener("gradiumx-scratchpad-update", loadData);
        return () => window.removeEventListener("gradiumx-scratchpad-update", loadData);
    }, []);

    useEffect(() => {
        localStorage.setItem("gradiumx-scratchpad-code", code);
    }, [code]);

    if (!enabled) return null;

    const lineCount = code.split("\n").length;

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const langs = ["js", "py", "html", "css", "rust"];

    return (
        <Draggable defaultPosition={{ x: window.innerWidth - 400, y: 120 }}>
            <div className="glass-panel p-5 rounded-[32px] w-[340px] transition-all duration-300 cursor-move pointer-events-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                        <Code2 size={18} className="text-white" />
                        <span className="gradient-text font-bold tracking-wide text-lg">Scratchpad</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={handleCopy}
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 transition-colors text-white/60 hover:text-white"
                            title="Copy Code"
                        >
                            {copied ? <Check size={14} className="text-[#B6FFDB]" /> : <Copy size={14} />}
                        </button>
                        <button
                            onClick={() => setCode("// Write your code here...\n")}
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/20 transition-colors text-white/60 hover:text-red-300"
                            title="Clear"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>

                {/* Language Selector */}
                <div className="flex gap-1.5 mb-3">
                    {langs.map(l => (
                        <button
                            key={l}
                            onClick={() => { setLanguage(l); localStorage.setItem("gradiumx-scratchpad-lang", l); }}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${language === l
                                ? "bg-white/20 text-white border border-white/30 shadow-[0_0_12px_rgba(182,224,255,0.2)]"
                                : "bg-white/5 text-white/40 border border-white/10 hover:text-white/70"
                                }`}
                        >
                            {l}
                        </button>
                    ))}
                </div>

                {/* Code Editor */}
                <div className="relative rounded-2xl bg-black/40 border border-white/10 overflow-hidden">
                    <div className="flex">
                        {/* Line Numbers */}
                        <div className="py-3 px-2 text-right select-none border-r border-white/10 bg-white/5">
                            {Array.from({ length: lineCount }, (_, i) => (
                                <div key={i} className="text-[11px] text-white/20 leading-[1.6] font-mono">{i + 1}</div>
                            ))}
                        </div>
                        {/* Textarea */}
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck={false}
                            className="flex-1 bg-transparent text-[13px] text-[#B6E0FF] font-mono leading-[1.6] p-3 resize-none outline-none min-h-[160px] max-h-[280px] overflow-y-auto placeholder:text-white/20 cursor-text custom-scrollbar"
                            onMouseDown={(e) => e.stopPropagation()}
                        />
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex items-center justify-between px-3 py-1.5 border-t border-white/10 bg-white/5">
                        <span className="text-[10px] text-white/30 font-mono">{lineCount} lines</span>
                        <span className="text-[10px] text-white/30 font-mono">{code.length} chars</span>
                    </div>
                </div>
            </div>
        </Draggable>
    );
}
