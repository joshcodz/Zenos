import { useEffect, useState } from "react";

export default function VideoCreditToast({ credit }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!credit) return;

        setVisible(true);

        const t = setTimeout(() => {
            setVisible(false);
        }, 3500);

        return () => clearTimeout(t);
    }, [credit]);

    if (!credit) return null;

    function openLink() {
        if (credit.link) {
            window.open(credit.link, "_blank");
        }
    }

    return (
        <div
            onClick={openLink}
            style={{
                position: "fixed",
                left: "50%",
                bottom: 120,
                transform: `translateX(-50%) translateY(${visible ? 0 : 20}px)`,
                opacity: visible ? 1 : 0,
                padding: "12px 22px",
                borderRadius: 18,
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(0,0,0,0.25))",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                fontSize: 13,
                letterSpacing: 0.3,
                boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                cursor: credit.link ? "pointer" : "default",
                transition: "all 0.4s ease",
                zIndex: 9999,
                userSelect: "none",
            }}
        >
            🎬 {credit.text}
            {credit.link && (
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>
                    🔗 Click to visit source
                </div>
            )}
        </div>
    );
}
