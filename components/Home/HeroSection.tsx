// components/HeroSection.tsx
import React from "react";
import Link from "next/link";

import { Homepage2026 } from "@/models/homepage2026";
import Image from "next/image";

interface PageDataProps {
  pageData: Homepage2026 | null;
}

const HeroSection: React.FC<PageDataProps> = ({ pageData }) => {
  if (!pageData) return null;

  return (
    <div className="herosection-wrapper-home relative w-full sm:h-[90vh] overflow-hidden">
      <Image priority  width={1080} height={600} src={pageData.bannerimage.value[0]?.url} alt="" className="absolute inset-0 w-full h-full object-cover brightness-40 aspect-video" />
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={pageData.bannerimage.value[0]?.url}
        className="absolute inset-0 w-full h-full object-cover brightness-40 aspect-video "
      >
        <source src={pageData.bannervideolink.value} type="video/mp4" />
      </video> */}
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-end py-20">
        <div className="flex gap-5 items-center flex-col lg:flex-row ">
          <img
            className="w-[120px] lg:w-[280px] object-contain"
            src={pageData.bannerlogo.value[0]?.url}
            alt={pageData.bannerheading.value}
          />

          <div className="w-px h-16 bg-white hidden lg:block"></div>

          <h1 className="text-white lg:text-left text-3xl text-center  lg:text-5xl font-bold max-w-md leading-tight mb-2">
            {pageData.bannerheading.value}
          </h1>
        </div>

        <p className="text-center text-white text-xl lg:text-2xl uppercase">
          {pageData.bannersubheading.value}
        </p>

        {pageData.bannercta.value.map((item: any, index: number) => {
          return (
            <div className="mt-5" key={index}>
              <Link
                href={item.link.value}
                className="px-4 py-2 bg-primary-orange text-white rounded-full text-xl"
              >
                <span>{item.name.value}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
