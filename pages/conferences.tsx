import SpinnerComponent from "@/components/UI/SpinnerComponent";

import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import React, { useState } from "react";

import PillarSectionSticky from "@/components/About/PillarSectionSticky";
import SectionHeading from "@/components/common/SectionHeading";
import Image from "next/image";
import { Conferencepage } from "@/models/conferencepage";
import { Conferenceitem } from "@/models/conferenceitem";
import Head from "next/head";

type PageProps = {
  pageData: Conferencepage | null;
};

export default function Page({ pageData }: PageProps) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div>
      <Head>
        <title>{pageData.metadataPagetitle.value}</title>
        <meta name="title" content={pageData.metadataMetatitle.value} />
        <meta
          name="description"
          content={pageData.metadataMetadescription.value}
        />

        <meta property="og:title" content={pageData.metadataPagetitle.value} />
        <meta
          property="og:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta
          property="og:url"
          content="https://www.ipscongress.com/conferences"
        />
        <meta property="og:site_name" content={Globals.SITE_NAME} />
        <meta
          property="og:image"
          content="https://www.ipscongress.com/assets/logos/ips-logo-thumbnail.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.metadataPagetitle.value} />
        <meta
          name="twitter:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta
          name="twitter:image"
          content="https://www.ipscongress.com/assets/logos/ips-logo-thumbnail.jpg"
        />

        <link rel="canonical" href="https://www.ipscongress.com/conferences" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
            <div className="grid grid-cols-1 gap-20">
              {pageData.conferenceitems.value.map(
                (item: any, index: number) => {
                  return (
                    <div>
                    
                      <h2 className="text-2xl uppercase mb-3">{item.heading.value}</h2>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.content.value }}
                      />

                      <div>
                        <h4 className="mb-4 text-2xl">
                          {item.galleryheading.value}
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                        {item.galleryimages.value.map(
                          (image: any, index: number) => {
                            return (
                              <div className="">
                                <Image
                                  width={400}
                                  height={300}
                                  src={image.url}
                                  alt={image.name}
                                  key={index}
                                  className="rounded-2xl aspect-video object-cover"
                                />
                              </div>
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
