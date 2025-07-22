// StickyStackSections.tsx
import React from "react";

const sections = [
  { color: "#0ea5e9", label: "Section 1" },
  { color: "#10b981", label: "Section 2" },
  { color: "#f59e42", label: "Section 3" },
  { color: "#ec4899", label: "Section 4" },
];

export default function StickyStackSections() {
  return (
    <div className="w-full relative">
      {sections.map((section, idx) => (
        <div
          key={idx}
          className="sticky-stack-section flex items-center justify-center text-white text-5xl font-extrabold"
          style={{
            background: section.color,
            position: "sticky",
            top: 0,
            height: "100vh",
            zIndex: idx + 1,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}
        >
          {section.label}
        </div>
      ))}
    </div>
  );
}
