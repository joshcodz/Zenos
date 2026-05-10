import { motion } from "framer-motion";

export default function Draggable({ children, defaultPosition = { x: window.innerWidth / 2 - 160, y: 200 } }) {
    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={{ ...defaultPosition, opacity: 0, y: defaultPosition.y + 20 }}
            animate={{ opacity: 1, y: defaultPosition.y }}
            whileDrag={{ 
                scale: 1.05, 
                rotate: 2,
                cursor: "grabbing",
                filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.5))"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed cursor-grab touch-none z-[9900]"
        >
            {children}
        </motion.div>
    );
}
