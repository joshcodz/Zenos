import { Settings2, X, Sun, Moon, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsWidget({ 
    auroraIntensity, setAuroraIntensity, 
    timeFormat, setTimeFormat, 
    showGreeting, setShowGreeting, 
    showClock, setShowClock,
    onClose 
}) {
    return (
        <div className="fixed inset-0 z-[10002] flex items-center justify-center bg-black/40 backdrop-blur-md pointer-events-auto transition-all duration-500">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="glass-panel p-8 rounded-[40px] w-[400px] shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Settings2 size={24} className="text-white" />
                        <span className="gradient-text text-2xl font-bold tracking-wide">Settings</span>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Aurora Intensity */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-white/90 font-medium">
                            <span>Aurora Intensity</span>
                            <span className="text-white/50 text-sm">{Math.round(auroraIntensity * 100)}%</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" max="1" step="0.05"
                            value={auroraIntensity}
                            onChange={(e) => setAuroraIntensity(Number(e.target.value))}
                            className="w-full accent-white h-2 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer hover:[&::-webkit-slider-thumb]:scale-125 [&::-webkit-slider-thumb]:transition-transform"
                        />
                    </div>

                    {/* Time Format */}
                    <div className="flex items-center justify-between">
                        <span className="text-white/90 font-medium">Time Format</span>
                        <div className="flex bg-white/10 rounded-full p-1 border border-white/20">
                            <button 
                                onClick={() => setTimeFormat("12h")}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${timeFormat === '12h' ? 'bg-white text-black shadow-md' : 'text-white/60 hover:text-white'}`}
                            >
                                12h
                            </button>
                            <button 
                                onClick={() => setTimeFormat("24h")}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${timeFormat === '24h' ? 'bg-white text-black shadow-md' : 'text-white/60 hover:text-white'}`}
                            >
                                24h
                            </button>
                        </div>
                    </div>

                    {/* Show Clock Toggle */}
                    <div className="flex items-center justify-between">
                        <span className="text-white/90 font-medium">Display Clock</span>
                        <button 
                            onClick={() => setShowClock(!showClock)}
                            className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 border ${showClock ? 'bg-white/30 border-white/50' : 'bg-white/10 border-white/20'}`}
                        >
                            <motion.div 
                                animate={{ x: showClock ? 24 : 0 }}
                                className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-black"
                            >
                                <Clock size={14} />
                            </motion.div>
                        </button>
                    </div>

                    {/* Greeting Toggle */}
                    <div className="flex items-center justify-between">
                        <span className="text-white/90 font-medium">Show Greeting</span>
                        <button 
                            onClick={() => setShowGreeting(!showGreeting)}
                            className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 border ${showGreeting ? 'bg-white/30 border-white/50' : 'bg-white/10 border-white/20'}`}
                        >
                            <motion.div 
                                animate={{ x: showGreeting ? 24 : 0 }}
                                className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-black"
                            >
                                {showGreeting ? <Sun size={14} /> : <Moon size={14} />}
                            </motion.div>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
