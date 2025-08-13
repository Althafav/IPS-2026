import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Globals from "@/modules/Globals";
import { Blogspage2026 } from "@/models/blogspage2026";
import { slugify } from "@/lib/slugify";
import InnerBanner from "@/components/common/InnerBanner";

interface Props {
  pageData: any;
}

export default function BlogsPage({ pageData }: Props) {
  return (
    <>
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
        <meta property="og:url" content="https://www.ipscongress.com/blogs" />
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

        <link rel="canonical" href="https://www.ipscongress.com/blogs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <InnerBanner
        bannerImage={pageData.bannerimage.value[0]?.url}
        bannerHeading={pageData.bannerheading.value}
      />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pageData.blogitems.value.map((blog: any) => (
            <Link
              href={`/blogs/${slugify(blog.heading.value)}`}
              key={blog.system.codename}
              className="bg-white shadow-md rounded-xl overflow-hidden"
            >
              <Image
                src={blog.image.value[0]?.url}
                alt={blog.heading.value}
                width={400}
                height={250}
                className="w-full object-cover aspect-video"
              />
              <div className="p-4">
                <h2 className="text-md font-semibold mb-2">
                  {blog.heading.value}
                </h2>
                {/* <p className="text-muted small">
                  {blog.system.lastModified
                    ? new Date(blog.system.lastModified).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    : ""}
                </p> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response: any = await Globals.KontentClient.item("blog_page_2026")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));

  return {
    props: {
      pageData,
    },
  };
};
