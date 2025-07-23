import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Partners } from "@/models/partners";
import Globals from "@/modules/Globals";
import { Partneritem } from "@/models/partneritem";
import { Partnerspage } from "@/models/partnerspage";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../common/SectionHeading";

export default function SupportingPartnerComponent() {
  const [pageData, setPageData] = useState<Partnerspage | null>(null);

  useEffect(() => {
    Globals.KontentClient.item("partners_page")
      .withParameter("depth", "4")
      .toObservable()
      .subscribe((res: any) => setPageData(res.item));
  }, []);

  if (!pageData) return null;

  return (
    <section className="supporting-partner-section py-20">
      <div className="container mx-auto">
        <SectionHeading
          heading="Partners & Sponsors"
          className="text-primary-blue"
        />

        <div className="">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={4}
            loop
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            className=""
          >
            {pageData.items.value.map((m: any, idx: number) => {
              const item: Partners = m;

              return (
                <div>
                  {item.items.value.map((p: any, index: number) => {
                    const partner: Partneritem = p;
                    return (
                      <SwiperSlide className="partner-item bg-white p-10 rounded-2xl flex items-center justify-center shadow-md">
                        <Link href={partner.website.value}>
                          <Image
                            width={300}
                            height={200}
                            src={partner.logo.value[0]?.url}
                            alt={partner.name.value}
                            className=" w-full object-contain aspect-video"
                          />
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </div>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
