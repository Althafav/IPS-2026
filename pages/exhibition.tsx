import SpinnerComponent from "@/components/UI/SpinnerComponent";

import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import React, { useState } from "react";

import Image from "next/image";
import SectionHeading from "@/components/common/SectionHeading";
import { Exhibitionpage2026 } from "@/models/exhibitionpage2026";
import SlantedSection from "@/components/UI/SlantedSection/SlantedSection";
import ExhibitorCarousel from "@/components/Exhibition/ExhibitorCarousel";

type PageProps = {
  pageData: Exhibitionpage2026 | null;
};

export default function Page({ pageData }: PageProps) {
  const [whyExhibitShowAll, setWhyExhibitShowAll] = useState(false);

  if (!pageData) {
    return <SpinnerComponent />;
  }

  const whyExhibitItems = pageData.whyexhibititems.value;
  const wExhibitShowItems = whyExhibitShowAll
    ? whyExhibitItems
    : whyExhibitItems.slice(0, 2);

  return (
    <div>
      <div className="exhibition-page-wrapper">
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
              About the <span className="text-primary-blue">Exhibition</span>
            </h2>

            <div
              className="prose max-w-5xl"
              dangerouslySetInnerHTML={{ __html: pageData.aboutcontent.value }}
            />
          </div>
        </div>

        <SlantedSection className="h3bg">
          <div className="why-exhibit-section py-40 ">
            <SectionHeading
              heading={pageData.whyexhibitheading.value}
              className="text-black"
            />

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 gap-5">
                {wExhibitShowItems.map((item, index) => {
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

                      <div className="flex-auto bg-white rounded-2xl p-5 flex flex-col justify-center">
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

              {!whyExhibitShowAll && whyExhibitItems.length > 2 && (
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setWhyExhibitShowAll(true)}
                    className="underline text-black "
                  >
                    Read More
                  </button>
                </div>
              )}
            </div>
          </div>
        </SlantedSection>

        <div className="benefits-section py-10 ">
          <div className="container mx-auto">
            <SectionHeading
              heading={pageData.benefitheading.value}
              className="text-black"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-5">
              {pageData.benefititems.value.map((item: any, index: number) => {
                return (
                  <div
                    className="benefit-card p-2   border rounded-2xl"
                    key={index}
                  >
                    <div className="image-wrapper bg-primary-blue p-5 flex justify-center h-[200px] rounded-lg">
                      <img
                        className="w-16 object-contain"
                        src={item.image.value[0]?.url}
                        alt=""
                      />
                    </div>
                    <div className="p-5 flex justify-center items-center">
                      <p>{item.name.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="exhibitor-section py-10">
          <ExhibitorCarousel />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item(
      "exhibition_page_2026"
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
