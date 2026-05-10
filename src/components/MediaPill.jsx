import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListVideo, Headphones, Music, ChevronDown } from "lucide-react";
import BackgroundSelector from "./BackgroundSelector";
import AmbientMixer from "./AmbientMixer";
import MusicPanel from "./MusicPanel";

export default function MediaPill({ currentBg, onChangeBg, zenMode }) {
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState("spaces");

    if (zenMode) return null;

    return (
        <div className="fixed bottom-8 left-10 z-[10001]">
            <motion.div 
                layout
                initial={{ borderRadius: 9999 }}
                animate={{
                    width: open ? 380 : 64,
                    height: open ? 480 : 64,
                    borderRadius: open ? 32 : 9999,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="glass-drop overflow-hidden flex flex-col relative"
            >
                <AnimatePresence mode="wait">
                    {!open ? (
                        <motion.button 
                            key="collapsed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            onClick={() => setOpen(true)}
                            className="w-full h-full flex items-center justify-center hover:bg-white/10 transition-colors group text-white/90"
                        >
                            <ListVideo size={24} className="group-hover:scale-110 transition-transform" />
                        </motion.button>
                    ) : (
                        <motion.div 
                            key="expanded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-full h-full flex flex-col"
                        >
                            {/* Header Tabs */}
                            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10 shrink-0">
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => setTab("spaces")}
                                        className={`transition-colors font-semibold tracking-wide uppercase text-sm ${tab === "spaces" ? "text-white" : "text-white/40 hover:text-white/70"}`}
                                    >
                                        Spaces
                                    </button>
                                    <button 
                                        onClick={() => setTab("ambient")}
                                        className={`transition-colors font-semibold tracking-wide uppercase text-sm ${tab === "ambient" ? "text-white" : "text-white/40 hover:text-white/70"}`}
                                    >
                                        Mixer
                                    </button>
                                    <button 
                                        onClick={() => setTab("music")}
                                        className={`transition-colors font-semibold tracking-wide uppercase text-sm ${tab === "music" ? "text-white" : "text-white/40 hover:text-white/70"}`}
                                    >
                                        Music
                                    </button>
                                </div>
                                <button 
                                    onClick={() => setOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                                >
                                    <ChevronDown size={18} />
                                </button>
                            </div>

                            {/* Content Area */}
                            <div className="p-6 flex-1 overflow-hidden">
                                {tab === "spaces" && <BackgroundSelector current={currentBg} onChange={onChangeBg} />}
                                {tab === "ambient" && <AmbientMixer />}
                                {tab === "music" && <MusicPanel />}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
