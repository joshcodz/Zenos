import { useState } from "react";
import { Music } from "lucide-react";

export default function MusicPanel() {
    return (
        <div className="flex flex-col h-[300px] items-center justify-center text-center p-8 w-full">
            <div className="w-16 h-16 flex items-center justify-center mb-6 bg-white/10 border border-white/20 rounded-full text-white/60 shadow-inner">
                <Music size={28} />
            </div>
            <div className="text-white/60 text-sm font-medium tracking-wide leading-relaxed max-w-[200px] mb-8">
                Spotify integration offline. Awaiting uplink.
            </div>
        </div>
    );
}
