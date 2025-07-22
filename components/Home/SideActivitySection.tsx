// components/SideActivitySection.tsx
import React, { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import { Homepage2026 } from "@/models/homepage2026";
import SlandedWithImageSection from "../UI/SlantedSection/SlandedWithImageSection";

import "swiper/css";
import Image from "next/image";
import SectionHeading from "../common/SectionHeading";

interface PageDataProps {
  pageData: Homepage2026 | null;
}

const SideActivitySection: React.FC<PageDataProps> = ({ pageData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = pageData?.sideactivitiesitems?.value ?? [];

  const images = useMemo(
    () => items.map((it: any) => it.image.value[0]?.url || ""),
    [items]
  );
  if (!pageData) return null;

  return (
    <SlandedWithImageSection imageUrl={images[activeIndex]}>
      <div className="py-60">
        <div className="container mx-auto">
          <SectionHeading
            heading={pageData.sideactivitesheading.value}
            className="text-white"
          />
        </div>
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="lg:max-w-5xl w-full">
              <Swiper
                modules={[Autoplay, FreeMode]}
                spaceBetween={20}
                slidesPerView={1}
                centeredSlides
                speed={1000}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              >
                {items.map((item: any, idx: number) => (
                  <SwiperSlide key={item.system.id || idx}>
                    <div className="overflow-hidden">
                      <div className="activity-card relative rounded-2xl flex flex-col md:flex-row gap-5">
                        {/* Image section */}
                        <div className="w-full md:w-1/2 h-64 md:h-auto rounded-2xl overflow-hidden">
                          <Image
                            width={400}
                            height={400}
                            src={images[idx]}
                            alt={item.name.value}
                            className="w-full h-full object-cover aspect-video"
                          />
                        </div>

                        {/* Text content */}
                        <div className="glass-container w-full md:w-1/2 text-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
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
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </SlandedWithImageSection>
  );
};

export default SideActivitySection;
