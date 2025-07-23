// StickyStackSections.tsx
import Image from "next/image";
import React from "react";

export default function PillarSectionSticky({ items }: any) {
  return (
    <div className="w-full relative">
      {items.map((item: any, idx: number) => (
        <div
          key={idx}
          className=" sticky-stack-section flex items-center justify-center "
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            zIndex: idx + 1,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}
        >
          <div className="absolute inset-0 z-0">
            <img
              src={item.image.value[0]?.url}
              alt=""
              className="w-full h-full aspect-video object-cover object-top"
            />
          </div>
          <div
            className="absolute inset-0 h-full"
            style={{ background: item.colorcode.value }}
          />
          
          <div className="max-w-4xl   mx-auto px-4">
            <div className=" relative rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="w-full  h-full  rounded-2xl overflow-hidden">
                <Image
                  width={400}
                  height={400}
                  src={item.image.value[0]?.url}
                  alt={item.name.value}
                  className="w-full h-full object-cover aspect-video"
                />
              </div>

              <div className="glass-container w-full h-full  text-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <h4 className=" text-white text-md font-bold uppercase leading-tight mb-3">
                  {item.name.value}
                </h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.content.value,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
