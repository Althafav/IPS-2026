import SpinnerComponent from "@/components/UI/SpinnerComponent";

import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import React, { useState } from "react";

import { Aboutpage2026 } from "@/models/aboutpage2026";
import SecondaryBanner from "@/components/common/SecondaryBanner";
import StickyOverlapSections from "@/components/common/StickyOverlapSections";
import PillarSectionSticky from "@/components/About/PillarSectionSticky";
import SectionHeading from "@/components/common/SectionHeading";
import Image from "next/image";

type PageProps = {
  pageData: Aboutpage2026 | null;
};

export default function Page({ pageData }: PageProps) {
  const [VisitorProfileShowAll, setVisitorProfileShowAll] = useState(false);
  const [ExhibitorProfileShowAll, setExhibitorProfileShowAll] = useState(false);
  if (!pageData) {
    return <SpinnerComponent />;
  }

  const VisitorProfileItems = pageData.visitorprofileitems.value;
  const vProfileShowItems = VisitorProfileShowAll
    ? VisitorProfileItems
    : VisitorProfileItems.slice(0, 2);

  const ExhibitorProfileItems = pageData.exhibitorprofileitems.value;

  const eProfileShowItems = ExhibitorProfileShowAll
    ? ExhibitorProfileItems
    : ExhibitorProfileItems.slice(0, 2);
  return (
    <div>
      <div className="aboutpage">
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

        <div className="about-section py-10">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold uppercase mb-5 text-black">
              Welcome to <span className="text-primary-blue">IPS 2026</span>
            </h2>

            <div
              className="prose max-w-5xl"
              dangerouslySetInnerHTML={{ __html: pageData.aboutcontent.value }}
            />
          </div>
        </div>

        <div className="video-section-wrapper  relative min-h-[600px]">
          <div className="container mx-auto  ">
            <div className="my-10">
              <iframe
                width="100%"
                height="550"
                className="rounded-2xl"
                src={pageData.aboutvideolink.value}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>

            <div
              className="prose max-w-none px-10  text-center"
              dangerouslySetInnerHTML={{ __html: pageData.aboutcontent.value }}
            />
          </div>
        </div>

        <div className="pillar-section-wrapper py-10">
          <PillarSectionSticky items={pageData.pillaritems.value} />
        </div>

        <div className="visitor-profile-section py-10">
          <div className="container max-auto">
            <SectionHeading
              heading={pageData.visitorprofileheading.value}
              className="text-black"
            />

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 gap-5">
                {vProfileShowItems.map((item, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div
                      key={index}
                      className={`
                    flex gap-5
                    flex-col md:flex-row
                    ${!isEven ? "md:flex-row-reverse" : ""}
                    items-stretch
                  `}
                    >
                      <div className="flex-shrink-0 flex flex-col items-center">
                        {item.image.value.length > 0 ? (
                          <Image
                            width={300}
                            height={300}
                            src={item.image.value[0]?.url}
                            alt=""
                            className="w-[300px] aspect-square object-cover  rounded-2xl"
                          />
                        ) : (
                          <div className="w-[300px] aspect-square rounded-2xl bg-slate-400"></div>
                        )}
                      </div>

                      <div className="flex-auto bg-[#CDF5FF] rounded-2xl p-5 flex flex-col justify-center">
                        <h4 className="mb-3">{item.name.value}</h4>
                        <div
                          className="prose"
                          dangerouslySetInnerHTML={{
                            __html: item.content.value,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {!VisitorProfileShowAll && VisitorProfileItems.length > 2 && (
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setVisitorProfileShowAll(true)}
                    className="underline text-black "
                  >
                    Read More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* exhibitor Profile */}

        <div className="exhibitor-profile-section py-10 bg-[#5A5A5A]">
          <div className="container max-auto">
            <SectionHeading
              heading={pageData.exhibitorprofileheading.value}
              className="text-white"
            />

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 gap-5">
                {eProfileShowItems.map((item, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div
                      key={index}
                      className={`
                    flex gap-5
                    flex-col md:flex-row
                    ${!isEven ? "md:flex-row-reverse" : ""}
                    items-stretch
                  `}
                    >
                      <div className="flex-shrink-0 flex flex-col items-center">
                        {item.image.value.length > 0 ? (
                          <Image
                            width={300}
                            src={item.image.value[0]?.url}
                            alt=""
                            className="w-[300px] aspect-square object-cover  rounded-2xl"
                          />
                        ) : (
                          <div className="w-[300px] aspect-square rounded-2xl bg-slate-400"></div>
                        )}
                      </div>

                      <div className="flex-auto bg-[#6C6B6B]  rounded-2xl p-5 flex flex-col justify-center">
                        <h4 className="mb-3 text-white">{item.name.value}</h4>
                        <div
                          className="prose text-white"
                          dangerouslySetInnerHTML={{
                            __html: item.content.value,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {!ExhibitorProfileShowAll && ExhibitorProfileItems.length > 2 && (
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setExhibitorProfileShowAll(true)}
                    className="underline text-white "
                  >
                    Read More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="why-visit-section py-10">
          <div className="container mx-auto">
            <Image
              height={400}
              width={1080}
              className="aspect-video object-cover w-full max-h-[400px] rounded-2xl mb-10"
              src={pageData.whyvisitimage.value[0]?.url}
              alt={pageData.whyvisitimage.value[0]?.name}
            />

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: pageData.whyvisitcontent.value,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item("about_page_2026")
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
