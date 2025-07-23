// components/PillarSection.tsx
import React from "react";
import Link from "next/link";

import { Homepage2026 } from "@/models/homepage2026";
import SlantedSection from "../UI/SlantedSection/SlantedSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css/bundle";
import "swiper/css/autoplay";
import "swiper/css/free-mode";

import Image from "next/image";
import SectionHeading from "../common/SectionHeading";

interface PageDataProps {
  pageData: Homepage2026 | null;
}

const PillarSection: React.FC<PageDataProps> = ({ pageData }) => {
  if (!pageData) return null;

  return (
    <div className="pillarsection-wrapper   w-full ">
      <SlantedSection className="pillarsection-bg-black">
        <div className="py-60">
          <div className="container mx-auto">
            <SectionHeading
              heading={pageData.pillarsheading.value}
              className="text-secondary-blue"
            />
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={2}
              loop
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 4 },
              }}
              className=""
            >
              {pageData.pillarsitems.value.map((item: any, index: number) => {
                return (
                  <SwiperSlide>
                    <div
                      className="pillar-card hover-shadow relative rounded-2xl overflow-hidden h-[350px] p-5 flex flex-col justify-end gap-5"
                      key={index}
                    >
                      <div className="absolute inset-0">
                        <Image
                          width={400}
                          height={500}
                          src={item.image.value[0]?.url}
                          alt=""
                          className=" h-full object-cover "
                        />
                      </div>
                      <div className="relative z-10">
                        <h4 className=" text-white text-md font-bold uppercase leading-tight max-w-[200px]">
                          {item.name.value}
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </SlantedSection>
    </div>
  );
};

export default PillarSection;
