import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import ExhibitorModel from "@/sysModels/exhibitorModel";
import { slugify } from "@/lib/slugify";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

interface Props {
  exhibitor: ExhibitorModel | null;
}

export default function ExhibitorDetail({ exhibitor }: Props) {
  if (!exhibitor)
    return <div className="p-10 text-red-600">Exhibitor not found.</div>;

  return (
    <>
      <Head>
        <title>{exhibitor.company_name} - Exhibitor</title>
      </Head>

      <div className="max-w-5xl mx-auto py-10">
        <div className="bg-gray-100 rounded-2xl p-6 md:p-10 flex sm:flex-col flex-col-reverse md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
          {/* LEFT CONTENT */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              {exhibitor.company_name}
            </h1>

            <div className="text-gray-700 mb-4 leading-relaxed">
              {exhibitor.stand_no && (
                <p>
                  <strong>Stand No:</strong> {exhibitor.stand_no}
                </p>
              )}
              {exhibitor.country && (
                <p>
                  <strong>Country:</strong> {exhibitor.country}
                </p>
              )}
              {exhibitor.company_address && (
                <p className="whitespace-pre-line">
                  {exhibitor.company_address}
                </p>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              {exhibitor.company_website && (
                <Link
                  href={exhibitor.company_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded transition"
                >
                  Visit Website
                </Link>
              )}

              {exhibitor.linkedin && (
                <Link
                  href={exhibitor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded transition"
                >
                  <FaLinkedin /> LinkedIn
                </Link>
              )}
            </div>
          </div>

          {/* RIGHT LOGO */}
          <div className="w-full md:w-auto md:flex-shrink-0">
            <div className="bg-white rounded-xl p-4 flex items-center justify-center shadow-sm">
              <Image
                src={exhibitor.company_logo}
                alt={exhibitor.company_name}
                width={160}
                height={160}
                className="object-contain h-24 w-24"
              />
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-8 text-gray-800 text-base leading-7">
          <p className="whitespace-pre-line">{exhibitor.company_brief}</p>
        </div>

        {/* PRODUCTS */}
        {exhibitor.products?.length > 0 && (
          <div className="py-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {exhibitor.products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-xl p-4 bg-white shadow-sm"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-40 object-contain mb-3"
                  />
                  <p className="text-gray-700 font-medium text-center">
                    {product.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {exhibitor.brochures?.length > 0 && (
          <div className="py-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Brochures
            </h2>
            <ul className="list-disc list-inside space-y-2 text-blue-700">
              {exhibitor.brochures.map((brochure) => (
                <li key={brochure.id}>
                  <a
                    href={brochure.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {brochure.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* PRESS RELEASES */}
        {exhibitor.press_releases?.length > 0 && (
          <div className="py-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Press Releases
            </h2>
            <ul className="list-disc list-inside space-y-2 text-blue-700">
              {exhibitor.press_releases.map((release) => (
                <li key={release.id}>
                  <a
                    href={release.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {release.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  const res = await fetch(
    "https://api.aimcongress.com/api/website/getexhibitors?eventid=cfc66726-6b7d-467f-8453-f0ee21b035f2"
  );

  if (!res.ok) return { notFound: true };

  const exhibitors: ExhibitorModel[] = await res.json();
  const exhibitor =
    exhibitors.find((e) => slugify(e.company_name) === slug) || null;

  return { props: { exhibitor } };
};
