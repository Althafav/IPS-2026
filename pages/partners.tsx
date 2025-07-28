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
import { Partnerspage } from "@/models/partnerspage";
import { Partneritem } from "@/models/partneritem";
import Link from "next/link";
import { Partners } from "@/models/partners";

type PageProps = {
  pageData: Partnerspage | null;
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
      <div className="partners-page-wrapper">
        <div className="py-10">
          <div className="container mx-auto">
            <div className="partner-wrapper space-y-8">
              {pageData.items.value.map((p: any, idx: number) => {
                const item: Partners = p;
                return (
                  <React.Fragment key={idx}>
                    <div className="text-center">
                      <p className="text-xl font-semibold">
                        {item.heading.value}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
                      {item.items.value.map((i: any, iIdx: number) => {
                        const partner: Partneritem = i;
                        return (
                          <div
                            key={iIdx}
                            className="w-full flex items-center justify-center"
                          >
                            <Image
                              width={300}
                              height={200}
                              src={partner.logo.value[0]?.url}
                              alt={partner.name.value}
                              className="w-full max-h-32 object-contain aspect-video"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item("partners_page")
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
