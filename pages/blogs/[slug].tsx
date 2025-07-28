import SpinnerComponent from "@/components/UI/SpinnerComponent";
import Globals from "@/modules/Globals";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: heading.value,
              image: articleData.image.value[0]?.url,
              datePublished: system.lastModified,
              dateModified: system.lastModified,
              author: { "@type": "Organization", name: "IPS Congress" },
              publisher: {
                "@type": "Organization",
                name: "IPS Congress",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.ipscongress.com/assets/logo.png",
                },
              },
              description: articleData.metadataMetadescription.value,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://www.ipscongress.com/blogs/${articleData.slug.value}`,
              },
            }),
          }}
        />
      </Head>
      <div className="herosection-wrapper relative w-full sm:h-[300px] overflow-hidden">
        <img
          src={image.value[0]?.url}
          alt={heading.value}
          className="absolute inset-0 w-full h-full object-cover white-linear-to-bottom-mask"
        />
      </div>

      <main className="container mx-auto py-10">
        <article className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {heading.value}
          </h1>
          <p className="text-gray-500 mb-6">{formattedDate}</p>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content.value }}
          />
        </article>
      </main>
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
      .type("blogitem2026")
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
