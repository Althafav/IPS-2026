// components/common/SectionHeading.tsx
import React from "react";

interface SectionHeadingProps {
  heading: string;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  heading,
  className = "",
}) => {
  return (
    <h2 className={` text-center text-2xl uppercase mb-10 ${className}`}>
      {heading}
    </h2>
  );
};

export default SectionHeading;
