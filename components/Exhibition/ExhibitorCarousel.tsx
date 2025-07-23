// components/ExhibitorCarousel.tsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/autoplay";
import "swiper/css/free-mode";

import SectionHeading from "../common/SectionHeading";
import ExhibitorCard from "../UI/Card/ExhibitorCard";
import Link from "next/link";

const ExhibitorCarousel: React.FC = () => {
  const [exhibitors, setExhibitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const res = await fetch(
          "https://api.aimcongress.com/api/website/getexhibitors?eventid=cfc66726-6b7d-467f-8453-f0ee21b035f2"
        );
        const data = await res.json();
        setExhibitors(data);
      } catch (error) {
        console.error("Failed to fetch exhibitors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitors();
  }, []);

  if (loading || exhibitors.length === 0) return null;

  return (
    <div className="exhibitor-wrapper w-full">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <h2 className="text-2xl uppercase">Exhibitors 2025</h2>
          <Link href="/exhibitors-2025">
            <span className="px-4 py-2 bg-primary-orange text-white rounded-full">View All</span>
          </Link>
        </div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          loop
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 4 },
          }}
        >
          {exhibitors.slice(0, 10).map((exhibitor: any, index: number) => (
            <SwiperSlide key={index}>
              <ExhibitorCard exhibitor={exhibitor} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ExhibitorCarousel;
