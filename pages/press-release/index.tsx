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
        <title>Blogs</title>
      </Head>
      <InnerBanner
        bannerImage={pageData.bannerimage.value[0]?.url}
        bannerHeading={pageData.bannerheading.value}
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pageData.pressreleaseitems.value.map((blog: any) => (
            <Link
              href={`/news/${slugify(blog.heading.value)}`}
              key={blog.system.codename}
              className="bg-white shadow-md rounded-xl overflow-hidden"
            >
              <Image
                src={blog.image.value[0]?.url || "/placeholder.jpg"}
                alt={blog.heading.value}
                width={400}
                height={250}
                className="w-full object-cover aspect-video"
              />
              <div className="p-4">
                <h2 className="text-md font-semibold mb-2">
                  {blog.heading.value}
                </h2>
                <p className="text-muted small">
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
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response: any = await Globals.KontentClient.item("press_release_page")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));

  return {
    props: {
      pageData,
    },
  };
};
