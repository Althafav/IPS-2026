import React, { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css/bundle";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import Image from "next/image";
import { Aboutpage2026 } from "@/models/aboutpage2026";

interface PageDataProps {
  pageData: Aboutpage2026 | null;
}

const TestimonialSection: React.FC<PageDataProps> = ({ pageData }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  if (!pageData) return null;

  return (
    <div className="testimonial-wrapper w-full relative py-10">
      <Image
        width={1080}
        height={600}
        src={pageData.testimonialbackgroundimage.value[0]?.url}
        alt={pageData.testimonialbackgroundimage.value[0]?.name}
        className="absolute bg-black/80 inset-0 w-full h-full aspect-video"
      />

      <div className="relative z-10">
        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto ">
            <div className="flex justify-between gap-3 mb-4">
              <button
                ref={prevRef}
                className="swiper-custom-prev  absolute left-0 top-1/2 -translate-y-1/2 z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="57"
                  height="46"
                  viewBox="0 0 57 46"
                  fill="none"
                  style={{ transform: "scaleX(-1)" }}
                >
                  <path
                    d="M54.2812 22.1885L54.2822 22.1895C54.3158 22.225 54.3725 22.3024 54.4209 22.4326C54.4692 22.5624 54.5 22.7208 54.5 22.8926C54.5 23.0643 54.4692 23.2227 54.4209 23.3525C54.3725 23.4827 54.3158 23.5601 54.2822 23.5957L54.2812 23.5967L36.458 42.5078C36.4372 42.4605 36.4169 42.4056 36.4004 42.3428C36.3649 42.2081 36.3497 42.0566 36.3594 41.9023C36.3691 41.7482 36.4028 41.6108 36.4482 41.5C36.4939 41.3888 36.544 41.3221 36.5742 41.29L36.5752 41.2891L49.2969 27.791L53.2686 23.5762H2.70117C2.70017 23.575 2.69928 23.5735 2.69824 23.5723C2.61516 23.4694 2.50001 23.2375 2.5 22.8926C2.5 22.5476 2.61516 22.3158 2.69824 22.2129C2.69927 22.2116 2.70018 22.2102 2.70117 22.209H53.2686L49.2969 17.9941L36.5752 4.49609L36.5742 4.49512L36.5166 4.41992C36.4947 4.38541 36.471 4.34068 36.4482 4.28516C36.4028 4.17436 36.3691 4.037 36.3594 3.88281C36.3497 3.72856 36.3649 3.57704 36.4004 3.44238C36.417 3.37926 36.4371 3.32388 36.458 3.27637L54.2812 22.1885Z"
                    fill="white"
                    stroke="#F08640"
                    strokeWidth="5"
                  />
                </svg>
              </button>
              <button
                ref={nextRef}
                className="swiper-custom-next  absolute right-0 top-1/2 -translate-y-1/2 z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="57"
                  height="46"
                  viewBox="0 0 57 46"
                  fill="none"
                >
                  <path
                    d="M54.2812 22.1885L54.2822 22.1895C54.3158 22.225 54.3725 22.3024 54.4209 22.4326C54.4692 22.5624 54.5 22.7208 54.5 22.8926C54.5 23.0643 54.4692 23.2227 54.4209 23.3525C54.3725 23.4827 54.3158 23.5601 54.2822 23.5957L54.2812 23.5967L36.458 42.5078C36.4372 42.4605 36.4169 42.4056 36.4004 42.3428C36.3649 42.2081 36.3497 42.0566 36.3594 41.9023C36.3691 41.7482 36.4028 41.6108 36.4482 41.5C36.4939 41.3888 36.544 41.3221 36.5742 41.29L36.5752 41.2891L49.2969 27.791L53.2686 23.5762H2.70117C2.70017 23.575 2.69928 23.5735 2.69824 23.5723C2.61516 23.4694 2.50001 23.2375 2.5 22.8926C2.5 22.5476 2.61516 22.3158 2.69824 22.2129C2.69927 22.2116 2.70018 22.2102 2.70117 22.209H53.2686L49.2969 17.9941L36.5752 4.49609L36.5742 4.49512L36.5166 4.41992C36.4947 4.38541 36.471 4.34068 36.4482 4.28516C36.4028 4.17436 36.3691 4.037 36.3594 3.88281C36.3497 3.72856 36.3649 3.57704 36.4004 3.44238C36.417 3.37926 36.4371 3.32388 36.458 3.27637L54.2812 22.1885Z"
                    fill="white"
                    stroke="#F08640"
                    strokeWidth="5"
                  />
                </svg>
              </button>
            </div>
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              loop
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
            >
              {pageData.testimonialitems.value.map(
                (item: any, index: number) => {
                  return (
                    <SwiperSlide>
                      <div className="glass-container p-5  " key={index}>
                        <div className="mb-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="51"
                            height="39"
                            viewBox="0 0 51 39"
                            fill="none"
                          >
                            <path
                              d="M23.7505 3.39178L20.3937 0.606445C7.75622 7.76875 1.83242 15.9258 0.252737 25.0776C-0.932023 32.6379 2.02988 38.6064 9.53337 38.6064C14.8648 38.6064 19.9988 35.0253 21.1835 29.0567C22.1708 22.0934 18.2216 17.9153 13.2851 16.9206C15.2597 10.1562 23.553 3.39178 23.7505 3.39178ZM40.7321 16.5227C42.9041 9.95724 50.8025 3.39178 51 3.39178L47.6432 0.606445C35.0057 7.76875 29.0819 15.9258 27.5022 25.0776C26.3175 32.6379 29.2794 38.6064 36.7829 38.6064C42.1143 38.6064 47.2483 35.0253 48.2356 29.0567C49.4203 22.0934 45.6686 17.5175 40.7321 16.5227Z"
                              fill="url(#paint0_radial_461_843)"
                            />
                            <defs>
                              <radialGradient
                                id="paint0_radial_461_843"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(14.5714 7.12073) rotate(60.9542) scale(36.0153 43.268)"
                              >
                                <stop stopColor="#FFA800" />
                                <stop offset="1" stopColor="#FF4D00" />
                              </radialGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className="flex flex-col gap-5 items-center">
                          <div
                            className="prose prose-invert text-center"
                            dangerouslySetInnerHTML={{
                              __html: item.content.value,
                            }}
                          />
                          <div className="bg-white border-[#FF6704] border-4 h-20 w-20 rounded-full p-2 flex justify-center items-center">
                            <Image
                              width={400}
                              height={500}
                              src={item.image.value[0]?.url}
                              alt=""
                              className="object-contain"
                            />
                          </div>
                          <div className="relative z-10">
                            <h4 className=" text-white text-xl font-bold uppercase leading-tight text-center mb-2">
                              {item.name.value}
                            </h4>
                            <p className=" text-center text-sm text-primary-blue">
                              {item.designation.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
