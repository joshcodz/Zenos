import { useEffect, useState } from "react";
import { Layers, ChevronLeft, ChevronRight, Eye, EyeOff, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "./Draggable";

const defaultDecks = {
    "General Knowledge": [
        { front: "What is the Pomodoro Technique?", back: "A time management method using 25-minute focused work intervals separated by short breaks." },
        { front: "Who wrote 'Meditations'?", back: "Marcus Aurelius, Roman Emperor and Stoic philosopher." },
        { front: "What is neuroplasticity?", back: "The brain's ability to reorganize itself by forming new neural connections throughout life." },
    ],
    "Science": [
        { front: "What is the speed of light?", back: "299,792,458 meters per second (approximately 3×10⁸ m/s)." },
        { front: "What is mitochondria?", back: "The powerhouse of the cell — organelles that generate most of the cell's ATP energy." },
        { front: "What is Heisenberg's Uncertainty Principle?", back: "You cannot simultaneously know the exact position and momentum of a particle." },
    ],
    "Vocabulary": [
        { front: "Ephemeral", back: "Lasting for a very short time. 'The ephemeral beauty of cherry blossoms.'" },
        { front: "Ubiquitous", back: "Present, appearing, or found everywhere." },
        { front: "Serendipity", back: "The occurrence of events by chance in a happy or beneficial way." },
    ]
};

export default function FlashcardWidget() {
    const [enabled, setEnabled] = useState(false);
    const [currentDeck, setCurrentDeck] = useState("General Knowledge");
    const [cardIndex, setCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [decks, setDecks] = useState(defaultDecks);
    const [mastered, setMastered] = useState({});

    useEffect(() => {
        function loadData() {
            setEnabled(localStorage.getItem("gradiumx-flashcards-enabled") === "true");
            const saved = localStorage.getItem("gradiumx-flashcards-mastered");
            if (saved) setMastered(JSON.parse(saved));
        }

        loadData();
        window.addEventListener("gradiumx-flashcards-update", loadData);
        return () => window.removeEventListener("gradiumx-flashcards-update", loadData);
    }, []);

    if (!enabled) return null;

    const deck = decks[currentDeck] || [];
    const card = deck[cardIndex];
    const deckNames = Object.keys(decks);
    const key = `${currentDeck}-${cardIndex}`;
    const isMastered = mastered[key];

    const totalMastered = Object.values(mastered).filter(Boolean).length;
    const totalCards = Object.values(decks).flat().length;

    const nextCard = () => {
        setFlipped(false);
        setTimeout(() => setCardIndex((cardIndex + 1) % deck.length), 150);
    };

    const prevCard = () => {
        setFlipped(false);
        setTimeout(() => setCardIndex((cardIndex - 1 + deck.length) % deck.length), 150);
    };

    const toggleMastered = () => {
        const updated = { ...mastered, [key]: !isMastered };
        setMastered(updated);
        localStorage.setItem("gradiumx-flashcards-mastered", JSON.stringify(updated));
    };

    return (
        <Draggable defaultPosition={{ x: window.innerWidth - 400, y: 120 }}>
            <div className="glass-panel p-5 rounded-[32px] w-[320px] transition-all duration-300 cursor-move pointer-events-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                        <Layers size={18} className="text-white" />
                        <span className="gradient-text font-bold tracking-wide text-lg">Flashcards</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#B6FFDB]/70 bg-[#B6FFDB]/10 px-2 py-0.5 rounded-full border border-[#B6FFDB]/20">
                        {totalMastered}/{totalCards} mastered
                    </span>
                </div>

                {/* Deck Selector */}
                <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1 scrollbar-hide">
                    {deckNames.map(name => (
                        <button
                            key={name}
                            onClick={() => { setCurrentDeck(name); setCardIndex(0); setFlipped(false); }}
                            className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${currentDeck === name
                                ? "bg-white/20 text-white border border-white/30 shadow-[0_0_12px_rgba(182,224,255,0.2)]"
                                : "bg-white/5 text-white/40 border border-white/10 hover:text-white/70"
                            }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>

                {/* Card */}
                {card && (
                    <div
                        onClick={(e) => { e.stopPropagation(); setFlipped(!flipped); }}
                        className="cursor-pointer select-none"
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${key}-${flipped}`}
                                initial={{ opacity: 0, rotateY: 90 }}
                                animate={{ opacity: 1, rotateY: 0 }}
                                exit={{ opacity: 0, rotateY: -90 }}
                                transition={{ duration: 0.25 }}
                                className={`rounded-2xl p-5 min-h-[120px] flex flex-col items-center justify-center text-center transition-all ${
                                    flipped
                                        ? "bg-[#B6E0FF]/10 border border-[#B6E0FF]/20"
                                        : "bg-white/5 border border-white/10"
                                } ${isMastered ? "ring-2 ring-[#B6FFDB]/30" : ""}`}
                            >
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">
                                    {flipped ? "Answer" : "Question"}
                                </span>
                                <p className={`text-[15px] font-medium leading-relaxed ${flipped ? "text-[#B6E0FF]" : "text-white/90"}`}>
                                    {flipped ? card.back : card.front}
                                </p>
                                {!flipped && (
                                    <span className="text-[10px] text-white/20 mt-3 italic">Tap to reveal</span>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

                {/* Controls */}
                <div className="flex items-center justify-between mt-4">
                    <button
                        onClick={(e) => { e.stopPropagation(); prevCard(); }}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 transition-colors text-white/60"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleMastered(); }}
                            onMouseDown={(e) => e.stopPropagation()}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                isMastered 
                                    ? "bg-[#B6FFDB]/15 text-[#B6FFDB] border-[#B6FFDB]/30" 
                                    : "bg-white/5 text-white/40 border-white/10 hover:text-white/70"
                            }`}
                        >
                            {isMastered ? <Eye size={12} /> : <EyeOff size={12} />}
                            {isMastered ? "Mastered" : "Mark Known"}
                        </button>

                        <span className="text-[11px] text-white/30 font-mono">{cardIndex + 1}/{deck.length}</span>
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); nextCard(); }}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 transition-colors text-white/60"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </Draggable>
    );
}
