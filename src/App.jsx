import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

import CommandCapsule from "./components/CommandCapsule";
import PomodoroWidget from "./components/PomodoroWidget";
import TodoWidget from "./components/TodoWidget";
import MotivationWidget from "./components/MotivationWidget";
import QuickLinksWidget from "./components/QuickLinksWidget";
import SettingsWidget from "./components/SettingsWidget";
import WeatherWidget from "./components/WeatherWidget";
import AnalyticsWidget from "./components/AnalyticsWidget";
import CommandPalette from "./components/CommandPalette";
import DigitalClock from "./components/DigitalClock";
import VideoCreditToast from "./components/VideoCreditToast";
import FullscreenToggle from "./components/FullscreenToggle";
import MediaPill from "./components/MediaPill";
import Onboarding from "./components/Onboarding";

// New Workspace Widgets
import GitHubHeatmap from "./components/GitHubHeatmap";
import CodeScratchpad from "./components/CodeScratchpad";
import FlashcardWidget from "./components/FlashcardWidget";
import StudyTracker from "./components/StudyTracker";
import BreathingWidget from "./components/BreathingWidget";
import IntentionWidget from "./components/IntentionWidget";

export default function App() {
    const [onboarded, setOnboarded] = useState(
        localStorage.getItem("gradiumx-onboarded") === "true"
    );

    const [background, setBackground] = useState(
        localStorage.getItem("bg") || "https://youtu.be/umYE_5LYg5I"
    );

    const [credit, setCredit] = useState(null);
    const [isMuted, setIsMuted] = useState(localStorage.getItem("gradiumx-muted") !== "false");
    const [volume, setVolume] = useState(Number(localStorage.getItem("gradiumx-volume")) || 50);

    // Global Settings State
    const [zenMode, setZenMode] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const videoRef = useRef(null);

    const [auroraIntensity, setAuroraIntensity] = useState(
        Number(localStorage.getItem("gradiumx-aurora")) || 0.5
    );
    const [timeFormat, setTimeFormat] = useState(
        localStorage.getItem("gradiumx-timeformat") || "12h"
    );
    const [showGreeting, setShowGreeting] = useState(
        localStorage.getItem("gradiumx-greeting") !== "false"
    );
    const [showClock, setShowClock] = useState(
        localStorage.getItem("gradiumx-showclock") !== "false"
    );

    /* Persist selections */
    useEffect(() => { localStorage.setItem("bg", background); }, [background]);
    useEffect(() => { localStorage.setItem("gradiumx-muted", isMuted); }, [isMuted]);
    useEffect(() => { localStorage.setItem("gradiumx-volume", volume); }, [volume]);
    useEffect(() => { localStorage.setItem("gradiumx-aurora", auroraIntensity); }, [auroraIntensity]);
    useEffect(() => { localStorage.setItem("gradiumx-timeformat", timeFormat); }, [timeFormat]);
    useEffect(() => { localStorage.setItem("gradiumx-greeting", showGreeting); }, [showGreeting]);
    useEffect(() => { localStorage.setItem("gradiumx-showclock", showClock); }, [showClock]);

    const handleSignOut = () => {
        localStorage.removeItem("gradiumx-onboarded");
        localStorage.removeItem("gradiumx-username");
        localStorage.removeItem("gradiumx-intent");
        setOnboarded(false);
    };

    useEffect(() => {
        const handleZenToggle = () => setZenMode(z => !z);
        const handleMuteToggle = () => setIsMuted(m => !m);
        const handleVolumeChange = (e) => setVolume(e.detail);
        const handleIntentUpdate = () => {
            window.location.reload();
        };

        window.addEventListener("gradiumx-toggle-zen", handleZenToggle);
        window.addEventListener("gradiumx-toggle-mute", handleMuteToggle);
        window.addEventListener("gradiumx-volume-update", handleVolumeChange);
        window.addEventListener("gradiumx-intent-update", handleIntentUpdate);

        return () => {
            window.removeEventListener("gradiumx-toggle-zen", handleZenToggle);
            window.removeEventListener("gradiumx-toggle-mute", handleMuteToggle);
            window.removeEventListener("gradiumx-volume-update", handleVolumeChange);
            window.removeEventListener("gradiumx-intent-update", handleIntentUpdate);
        }
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume / 100;
        }
    }, [volume]);

    const isYouTube = background.includes("youtube.com") || background.includes("youtu.be");
    const videoId = isYouTube ? background.match(/(?:youtu\.be\/|v=)([\w-]+)/)?.[1] : null;

    if (!onboarded) {
        return <Onboarding onComplete={() => setOnboarded(true)} />;
    }

    return (
        <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: "black" }}>
            {/* 🎥 Background Video */}
            {isYouTube ? (
                <iframe
                    key={background}
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${videoId}&disablekb=1&modestbranding=1&playsinline=1`}
                    className="youtube-bg"
                    allow="autoplay; encrypted-media"
                    title="YouTube Background"
                    style={{ transition: "filter 1s ease", filter: zenMode ? "brightness(0.4)" : "brightness(1)" }}
                />
            ) : (
                <video
                    ref={videoRef}
                    key={background}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    src={background}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "filter 1s ease",
                        filter: zenMode ? "brightness(0.4)" : "brightness(1)",
                    }}
                />
            )}

            {/* 🌌 Aurora Overlay */}
            <div className="dark-overlay" style={{ opacity: zenMode ? 0.8 : 0.5, transition: "opacity 1s ease" }} />
            <div className="aurora-bg" style={{ opacity: zenMode ? 0 : auroraIntensity, transition: "opacity 1s ease" }} />

            {/* Cinematic Zen Mode Fade Out Container */}
            <div style={{ opacity: zenMode ? 0 : 1, transition: "opacity 0.8s ease", pointerEvents: zenMode ? "none" : "auto" }}>
                
                {/* Unified Media Pill */}
                <MediaPill 
                    currentBg={background} 
                    onChangeBg={(video, creditData) => {
                        setBackground(video);
                        setCredit(creditData);
                    }} 
                    zenMode={zenMode}
                />

                {/* 🎬 Credit Toast */}
                <VideoCreditToast credit={credit} />

                {/* 🖥 Top Right Controls */}
                <div className="fixed top-8 right-10 flex items-center gap-2 z-[10000] glass-drop px-3 py-2">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        title={isMuted ? "Unmute Background" : "Mute Background"}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-all"
                    >
                        {isMuted ? <VolumeX size={20} strokeWidth={2} /> : <Volume2 size={20} strokeWidth={2} />}
                    </button>
                    <div className="w-[1px] h-6 bg-white/20 mx-1" />
                    <FullscreenToggle />
                </div>

                {/* Draggable Widgets */}
                <TodoWidget />
                <MotivationWidget />
                <QuickLinksWidget />
                <WeatherWidget />
                <AnalyticsWidget />
                
                {/* Workspace-specific widgets */}
                <GitHubHeatmap />
                <CodeScratchpad />
                <FlashcardWidget />
                <StudyTracker />
                <BreathingWidget />
                <IntentionWidget />

                {settingsOpen && (
                    <SettingsWidget 
                        auroraIntensity={auroraIntensity} setAuroraIntensity={setAuroraIntensity}
                        timeFormat={timeFormat} setTimeFormat={setTimeFormat}
                        showGreeting={showGreeting} setShowGreeting={setShowGreeting}
                        showClock={showClock} setShowClock={setShowClock}
                        onClose={() => setSettingsOpen(false)}
                        onSignOut={handleSignOut}
                    />
                )}
            </div>

            {/* Elements that stay visible in Zen Mode */}
            {showClock && (
                <DigitalClock timeFormat={timeFormat} showGreeting={showGreeting} zenMode={zenMode} />
            )}
            <PomodoroWidget zenMode={zenMode} />
            <CommandPalette />

            <CommandCapsule 
                zenMode={zenMode} 
                setZenMode={setZenMode} 
                settingsOpen={settingsOpen}
                setSettingsOpen={setSettingsOpen}
            />
        </div>
    );
}
