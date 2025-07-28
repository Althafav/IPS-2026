import SpinnerComponent from "@/components/UI/SpinnerComponent";
import Globals from "@/modules/Globals";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import React from "react";



type Props = {
  articleData: any | null;
};

export default function Page({ articleData }: Props) {
  if (!articleData) {
    return <SpinnerComponent />;
  }

  const { image, heading, content, system } = articleData;
  const formattedDate = system.lastModified
    ? new Date(system.lastModified).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="article-detail-wrapper">
      <div className="herosection-wrapper relative w-full sm:h-[300px] overflow-hidden">
        <img
          src={image.value[0]?.url}
          alt={heading.value}
          className="absolute inset-0 w-full h-full object-cover white-linear-to-bottom-mask"
        />
      </div>

      <div className="container mx-auto py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {heading.value}
          </h1>
          <p className="text-gray-500 mb-6">{formattedDate}</p>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content.value }}
          />
        </div>
      </div>
    </div>
  );
}


export const getStaticPaths: GetStaticPaths = async () => {
  const response = await Globals.KontentClient.items()
    .type("blogitem2026")
    .withParameter("depth", "0")
    .toPromise();

  const paths = response.items.map((item: any) => ({
    params: { slug: item.slug.value },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;

  try {
    const response = await Globals.KontentClient.items()
      .type("pressreleaseitem")
      .equalsFilter("elements.slug", slug)
      .withParameter("depth", "4")
      .toPromise();

    const articleItem = response.items[0] || null;

    if (!articleItem) {
      return { notFound: true };
    }

    return {
      props: {
        articleData: JSON.parse(JSON.stringify(articleItem)),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return { notFound: true };
  }
};
