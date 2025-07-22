// components/FeaturesSection.tsx
import React from "react";
import Link from "next/link";


import { Homepage2026 } from "@/models/homepage2026";
import Image from "next/image";
import SectionHeading from "../common/SectionHeading";

interface PageDataProps {
  pageData: Homepage2026 | null;
}

const FeaturesSection: React.FC<PageDataProps> = ({ pageData }) => {
  if (!pageData) return null;

  return (
    <div className="feature-section-wrapper py-20">
      <div className="container mx-auto">
        <SectionHeading
          heading={pageData.featuresheading.value}
          className="text-primary-blue"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-5">
          {pageData.featureitems.value.map((item: any, index: number) => {
            return (
              <div className="feature-card p-2 shadow rounded-2xl" key={index}>
                <div className="image-wrapper">
                  <Image
                    width={400}
                    height={400}
                    src={item.icon.value[0]?.url}
                    alt={item.name.value}
                    className="rounded-xl aspect-video object-cover"
                  />
                </div>

                <div className="p-5 flex flex-col gap-2 items-center  justify-center text-center">
                  <h4 className="text-md font-bold ">{item.name.value}</h4>
                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: item.content.value }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
