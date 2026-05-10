import { useEffect, useState } from "react";
import { CloudRain, Sun, Cloud, Thermometer, Wind } from "lucide-react";
import Draggable from "./Draggable";

export default function WeatherWidget() {
    const [enabled, setEnabled] = useState(false);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        function loadData() {
            setEnabled(localStorage.getItem("gradiumx-weather-enabled") === "true");
        }

        loadData();
        window.addEventListener("gradiumx-weather-update", loadData);

        return () => window.removeEventListener("gradiumx-weather-update", loadData);
    }, []);

    useEffect(() => {
        if (!enabled) return;
        
        // Fetch weather from open-meteo (mocking New York for now)
        fetch("https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true")
            .then(res => res.json())
            .then(data => {
                if (data && data.current_weather) {
                    setWeather(data.current_weather);
                }
            })
            .catch(() => console.error("Weather fetch failed"));
    }, [enabled]);

    if (!enabled) return null;

    // Simple weather code mapping based on WMO standards used by Open-Meteo
    const getWeatherIcon = (code) => {
        if (code === undefined) return <Sun size={32} className="text-[#FFB6FF]" />;
        if (code <= 3) return <Sun size={32} className="text-[#FFB6FF]" />; // Clear/Partly Cloudy
        if (code <= 48) return <Cloud size={32} className="text-[#B6E0FF]" />; // Fog/Cloudy
        return <CloudRain size={32} className="text-[#B6E0FF]" />; // Rain/Snow
    };

    const description = (code) => {
        if (code === undefined) return "Clear";
        if (code <= 3) return "Clear & Sunny";
        if (code <= 48) return "Cloudy";
        return "Rainy";
    }

    return (
        <Draggable defaultPosition={{ x: 40, y: 120 }}>
            <div className="glass-panel p-5 w-64 rounded-[32px] transition-all duration-300 cursor-move pointer-events-auto flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-1.5 text-white/70 text-xs font-bold uppercase tracking-widest mb-1">
                        <Thermometer size={14} /> New York
                    </div>
                    <div className="text-3xl font-bold tracking-tighter text-white drop-shadow-md">
                        {weather ? `${Math.round(weather.temperature)}°` : '--°'}
                    </div>
                    <div className="text-sm font-medium text-white/80 mt-1">
                        {weather ? description(weather.weathercode) : 'Loading...'}
                    </div>
                </div>
                
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                    {getWeatherIcon(weather?.weathercode)}
                </div>
            </div>
        </Draggable>
    );
}
