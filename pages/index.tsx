import SpinnerComponent from "@/components/UI/SpinnerComponent";

import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import React from "react";
import dynamic from "next/dynamic";
import { Homepage2026 } from "@/models/homepage2026";
import HeroSection from "@/components/Home/HeroSection";
import StatsSection from "@/components/Home/StatsSection";
import SideAcitivitySection2 from "@/components/Home/SideAcitivitySection2";
import SectionHeading from "@/components/common/SectionHeading";
const PillarSection = dynamic(() => import("@/components/Home/PillarSection"), {
  ssr: false,
});
const FeaturesSection = dynamic(
  () => import("@/components/Home/FeaturesSection"),
  { ssr: false }
);
const SideActivitySection = dynamic(
  () => import("@/components/Home/SideActivitySection"),
  { ssr: false }
);
const PartnersComponent = dynamic(
  () => import("@/components/Home/PartnersComponent"),
  { ssr: false }
);

type PageProps = {
  pageData: Homepage2026 | null;
};

export default function Page({ pageData }: PageProps) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div>
      <div className="homepage ">
        <HeroSection pageData={pageData} />
        <StatsSection pageData={pageData} />
        <div className="about-section-wrapper  relative min-h-[600px]">
          <div className="container mx-auto absolute -bottom-48 left-1/2 transform -translate-x-1/2 z-10 ">
            <h2 className="text-primary-blue text-center lg:text-2xl mb-3">
              {pageData.videoheading.value}
            </h2>
            <p className="text-center max-w-2xl mx-auto text-lg">
              {pageData.videodescription.value}
            </p>

            <div className="mt-10">
              <iframe
                width="100%"
                height="550"
                loading="lazy"
                allowFullScreen
                className="rounded-2xl"
                src={pageData.videolink.value}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        </div>

        <PillarSection pageData={pageData} />
        <FeaturesSection pageData={pageData} />

        <div className="container mx-auto pt-10">
          <SectionHeading heading={pageData.sideactivitesheading.value} />
        </div>
        <SideAcitivitySection2 items={pageData.sideactivitiesitems.value} />
        <PartnersComponent />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item("home_page_2026")
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
