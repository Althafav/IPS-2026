// components/StatsSection.tsx
import React from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";

import { Homepage2026 } from "@/models/homepage2026";

interface PageDataProps {
  pageData: Homepage2026 | null;
}

const StatsSection: React.FC<PageDataProps> = ({ pageData }) => {
  if (!pageData) return null;

  return (
    <Marquee className="gradient-1 py-10">
      <div className="flex mx-3 gap-5">
        {pageData.statsitems.value.map((item: any, index: number) => {
          return (
            <div
              className="glass-container min-w-[300px] p-5 flex flex-col justify-center items-center gap-2"
              key={index}
            >
              <img
                src={item.image.value[0]?.url}
                alt=""
                className="w-16 object-contain"
              />
              <h4 className="text-4xl  max-w-md text-center text-white">
                {item.count.value}
              </h4>
              <p className="text-center text-white text-xl">
                {item.name.value}
              </p>
            </div>
          );
        })}
      </div>
    </Marquee>
  );
};

export default StatsSection;
