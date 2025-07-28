import Image from "next/image";
import React from "react";

export default function InnerBanner(props: any) {
  return (
    <div className="banner-wrapper relative bg-black h-[220px] flex items-center justify-center">
      <Image
        width={1080}
        height={700}
        src={props.bannerImage}
        alt="International Property Show"
        className="w-full bg-black aspect-video h-[220px] object-cover absolute inset-0"
      />

      <div className="container relative z-10">
        <h1 className="text-white text-2xl font-bold uppercase">
          {props.bannerHeading}
        </h1>
      </div>
    </div>
  );
}
