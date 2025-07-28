import SpinnerComponent from "@/components/UI/SpinnerComponent";
import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import React from "react";

import Head from "next/head";

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
      <Head>
        <title>{articleData.metadataPagetitle.value}</title>
        <meta name="title" content={articleData.metadataMetatitle.value} />
        <meta
          name="description"
          content={articleData.metadataMetadescription.value}
        />

        <meta
          property="og:title"
          content={articleData.metadataPagetitle.value}
        />
        <meta
          property="og:description"
          content={articleData.metadataMetadescription.value}
        />
        <meta
          property="og:url"
          content={`https://www.ipscongress.com/blogs/${articleData.slug.value}`}
        />
        <meta property="og:site_name" content={Globals.SITE_NAME} />
        <meta property="og:image" content={articleData.image.value[0]?.url} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={articleData.metadataPagetitle.value}
        />
        <meta
          name="twitter:description"
          content={articleData.metadataMetadescription.value}
        />
        <meta name="twitter:image" content={articleData.image.value[0]?.url} />

        <link
          rel="canonical"
          href={`https://www.ipscongress.com/blogs/${articleData.slug.value}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;

  try {
    const response = await Globals.KontentClient.items()
      .type("blogitem2026")
      .equalsFilter("elements.slug", slug)
      .withParameter("depth", "4")
      .toPromise();

    const articleItem = response.items[0] || null;

    return {
      props: {
        articleData: JSON.parse(JSON.stringify(articleItem)),
      },
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return {
      props: {
        articleData: null,
      },
    };
  }
};
