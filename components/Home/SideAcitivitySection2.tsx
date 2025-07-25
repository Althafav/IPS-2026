// StickyStackSections.tsx
import Image from "next/image";
import React from "react";

export default function SideAcitivitySection2({ items }: any) {
  return (
    <div className="w-full relative">
      {items.map((item: any, idx: number) => (
        <div
          key={idx}
          className=" sticky-stack-section flex items-center justify-center py-40"
          style={{
            position: "sticky",
            top: 0,

            zIndex: idx + 1,
          }}
        >
          <div className="absolute inset-0 z-0">
            <img
              src={item.backgroundimage.value[0]?.url}
              alt=""
              className="w-full h-full aspect-video object-cover "
            />
          </div>

          <div className="max-w-4xl   mx-auto">
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
