// components/UI/SlantedSection/SlandedWithImageSection.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SlandedWithImageSectionProps {
  children: React.ReactNode;
  /** URL of the background image */
  imageUrl?: string;
}

export default function SlandedWithImageSection({
  children,
  imageUrl = "",
}: SlandedWithImageSectionProps) {
  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* AnimatePresence handles exit→enter */}
      <AnimatePresence mode="wait">
        {/* Only render when imageUrl changes */}
        <motion.div
          key={imageUrl || "no-image"}
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.9 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="
            absolute inset-0 z-0 overflow-hidden
            [clip-path:polygon(100%_78.93%,_0%_100%,_0%_21.11%,_100%_0.0465%)]
          "
        >
          {/* 1) Photo layer */}
          {imageUrl && (
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url('${imageUrl}')` }}
            />
          )}

          {/* 2) Semi-transparent blue overlay */}
          <div
            className="absolute inset-0 z-5 opacity-90"
            style={{
              background:
                "linear-gradient(180deg, #01839B 0%, #002D35 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* CONTENT ALWAYS ON TOP */}
      <div className="relative z-10  py-16 px-4">
        {children}
      </div>
    </section>
  );
}
