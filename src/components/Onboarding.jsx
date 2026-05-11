import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Code, BookOpen, Brain, Terminal } from "lucide-react";

const facts = [
    "Focus is a muscle. The more you work it, the stronger it gets.",
    "Multitasking reduces productivity by up to 40%.",
    "It takes an average of 23 minutes to regain focus after an interruption.",
    "The Pomodoro technique was invented in the late 1980s by Francesco Cirillo.",
    "Stoic wisdom: 'We suffer more often in imagination than in reality.' — Seneca"
];

export default function Onboarding({ onComplete }) {
    const [step, setStep] = useState(0);
    const [name, setName] = useState("");
    const [intent, setIntent] = useState("");
    const [factIndex, setFactIndex] = useState(0);

    const nextStep = () => setStep(s => s + 1);

    useEffect(() => {
        if (step === 3) {
            // Loading sequence
            localStorage.setItem("gradiumx-username", name);
            localStorage.setItem("gradiumx-intent", intent);
            
            // Setup default widgets based on intent
            if (intent === "Coding") {
                localStorage.setItem("gradiumx-todo-enabled", "true");
                localStorage.setItem("gradiumx-pomodoro-enabled", "true");
                localStorage.setItem("gradiumx-codescratchpad-enabled", "true");
                localStorage.setItem("gradiumx-heatmap-enabled", "true");
            } else if (intent === "Studying") {
                localStorage.setItem("gradiumx-pomodoro-enabled", "true");
                localStorage.setItem("gradiumx-flashcards-enabled", "true");
                localStorage.setItem("gradiumx-study-enabled", "true");
            } else if (intent === "Deep Work") {
                localStorage.setItem("gradiumx-motivation-enabled", "true");
                localStorage.setItem("gradiumx-breathing-enabled", "true");
                localStorage.setItem("gradiumx-intention-enabled", "true");
            } else {
                localStorage.setItem("gradiumx-motivation-enabled", "true");
            }

            const interval = setInterval(() => {
                setFactIndex(prev => (prev + 1) % facts.length);
            }, 3000);

            const timer = setTimeout(() => {
                clearInterval(interval);
                localStorage.setItem("gradiumx-onboarded", "true");
                onComplete();
            }, 8000);

            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        }
    }, [step]);

    return (
        <div className="fixed inset-0 bg-black z-[20000] flex items-center justify-center overflow-hidden">
            {/* Ambient Background for Onboarding */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a2e] via-[#0f0f1a] to-black opacity-80" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B6E0FF]/10 blur-[120px] rounded-full pointer-events-none" />

            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div 
                        key="step0"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center z-10 flex flex-col items-center"
                    >
                        <div className="w-20 h-20 glass-panel rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(182,224,255,0.3)]">
                            <Sparkles size={32} className="text-[#B6E0FF]" />
                        </div>
                        <h1 className="text-6xl font-bold tracking-tighter text-white mb-4 drop-shadow-2xl">
                            Welcome to <span className="gradient-text">Zenos</span>
                        </h1>
                        <p className="text-xl text-white/60 mb-12 font-medium tracking-wide max-w-md mx-auto">
                            The intelligent operating system for deep work and uncompromised focus.
                        </p>
                        <button 
                            onClick={nextStep}
                            className="px-8 py-4 glass-drop text-white font-bold tracking-widest uppercase text-sm hover:scale-105 transition-transform flex items-center gap-3 group"
                        >
                            Begin Journey <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div 
                        key="step1"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        transition={{ duration: 0.6 }}
                        className="text-center z-10 w-full max-w-md"
                    >
                        <h2 className="text-4xl font-bold tracking-tight text-white mb-8">What should we call you?</h2>
                        <form onSubmit={(e) => { e.preventDefault(); if (name.trim()) nextStep(); }}>
                            <input 
                                autoFocus
                                type="text" 
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Enter your name..."
                                className="w-full bg-transparent border-b-2 border-white/20 text-center text-3xl text-white outline-none focus:border-[#B6E0FF] transition-colors pb-4 placeholder:text-white/20 font-light"
                            />
                        </form>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                        transition={{ duration: 0.6 }}
                        className="text-center z-10 max-w-3xl w-full px-6"
                    >
                        <h2 className="text-4xl font-bold tracking-tight text-white mb-4">What brings you here, {name}?</h2>
                        <p className="text-white/50 mb-12 text-lg">We will optimize your workspace accordingly.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { id: "Coding", icon: Terminal, desc: "Building the future" },
                                { id: "Studying", icon: BookOpen, desc: "Learning and growing" },
                                { id: "Deep Work", icon: Brain, desc: "Absolute focus" }
                            ].map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => { setIntent(item.id); nextStep(); }}
                                    className="glass-panel p-8 rounded-[32px] flex flex-col items-center gap-4 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(182,224,255,0.15)] transition-all group"
                                >
                                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <item.icon size={28} className="text-white/80 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-white tracking-wide mb-1">{item.id}</div>
                                        <div className="text-sm font-medium text-white/40">{item.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div 
                        key="step3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center z-10 flex flex-col items-center justify-center w-full max-w-2xl px-6"
                    >
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 rounded-full border-t-2 border-b-2 border-[#B6E0FF] mb-12 opacity-80"
                        />
                        <h2 className="text-2xl font-bold tracking-widest text-white/80 uppercase mb-8">Preparing Workspace</h2>
                        
                        <div className="h-24 flex items-center justify-center w-full">
                            <AnimatePresence mode="wait">
                                <motion.p 
                                    key={factIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-xl font-medium text-white/60 italic leading-relaxed"
                                >
                                    "{facts[factIndex]}"
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
