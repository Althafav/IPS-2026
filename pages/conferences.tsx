import SpinnerComponent from "@/components/UI/SpinnerComponent";

import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import React, { useState } from "react";

import PillarSectionSticky from "@/components/About/PillarSectionSticky";
import SectionHeading from "@/components/common/SectionHeading";
import Image from "next/image";
import { Conferencepage } from "@/models/conferencepage";
import { Conferenceitem } from "@/models/conferenceitem";

type PageProps = {
  pageData: Conferencepage | null;
};

export default function Page({ pageData }: PageProps) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div>
      <div className="conference-page-wrapper">
        <div className="banner-wrapper">
          <div
            className="relative"
            style={{
              width: "100%",
              height: "500px",

              backgroundSize: "cover",
              backgroundPosition: "center",
              clipPath:
                "polygon(50% 0%, 100% 0, 100% 83%, 50% 100%, 0 82%, 0 0)",
            }}
          >
            <Image
              width={1080}
              height={500}
              className="absolute inset-0 aspect-video w-full h-full object-cover"
              src={pageData.bannerimage.value[0]?.url}
              alt=""
            />
          </div>
        </div>

        <div className="py-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-10">
              {pageData.conferenceitems.value.map(
                (item: any, index: number) => {
                  return (
                    <div>
                      <SectionHeading
                        heading={item.heading.value}
                        className="text-left"
                      />
                      <div
                        dangerouslySetInnerHTML={{ __html: item.content.value }}
                      />

                      <div>
                        <h4 className="mb-4 text-2xl">
                          {item.galleryheading.value}
                        </h4>
                      </div>
                      <div className="grid grid-cols-4 gap-5">
                        {item.galleryimages.value.map(
                          (image: any, index: number) => {
                            return (
                              <img
                                src={image.url}
                                alt={image.name}
                                key={index}
                                className="rounded-2xl aspect-video object-cover"
                              />
                            );
                          }
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item(
      "conference_page_2026"
    )
      .withParameter("depth", "4")
      .toPromise();

    const pageData = JSON.parse(JSON.stringify(response.item));

    return {
      props: {
        pageData,
      },
    };
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return {
      props: {
        pageData: null,
      },
    };
  }
};
