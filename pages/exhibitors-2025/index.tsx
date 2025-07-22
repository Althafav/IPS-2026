import { GetServerSideProps } from "next";
import Head from "next/head";
import ExhibitorModel from "@/sysModels/exhibitorModel";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { slugify } from "@/lib/slugify";

interface Props {
  exhibitors: ExhibitorModel[];
}

export default function ExhibitorsPage({ exhibitors }: Props) {
  const [selectedCountry, setSelectedCountry] = useState("All");

  // 🔹 Get unique countries
  const countries = useMemo(() => {
    const unique = new Set(exhibitors.map((e) => e.country).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [exhibitors]);

  // 🔹 Filter by country
  const filteredExhibitors = useMemo(() => {
    return selectedCountry === "All"
      ? exhibitors
      : exhibitors.filter((e) => e.country === selectedCountry);
  }, [selectedCountry, exhibitors]);

  return (
    <>
      <Head>
        <title>Exhibitors</title>
      </Head>

      <div className="max-w-7xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6 ">Exhibitors</h1>

        {/* 🔸 Country Filter Dropdown */}
        <div className="mb-6">
          <label className="text-gray-800 font-semibold mr-3">
            Filter by Country:
          </label>
          <select
            className="p-2 rounded-md border border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExhibitors.map((exhibitor, index) => (
            <div
              key={index}
              className="rounded-2xl p-2 shadow-md exhibitor-card hover:shadow-lg transition relative min-h-[480px]"
            >
              <div>
                <div className="bg-white p-5 rounded-2xl flex justify-center items-center h-[250px]">
                  <Image
                    width={160}
                    height={160}
                    src={exhibitor.company_logo}
                    alt={exhibitor.company_name}
                    className="h-24 mx-auto object-contain mb-4 aspect-square"
                  />
                </div>

                <div className="p-5">
                  <h4 className="text-white text-md font-bold uppercase leading-tight max-w-[200px] mb-3">
                    {exhibitor.company_name}
                  </h4>
                  {exhibitor.stand_no && (
                    <p className="text-md text-white mb-1">
                      Stand No: {exhibitor.stand_no}
                    </p>
                  )}
                  {exhibitor.country && (
                    <p className="text-md text-white line-clamp-3">
                      {exhibitor.country}
                    </p>
                  )}
                </div>

                <div className="p-5 absolute bottom-2 right-2">
                  <Link
                    href={`/exhibitors-2025/${slugify(exhibitor.company_name)}`}
                    className="flex items-center gap-3 text-white"
                  >
                    VIEW DETAILS{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                    >
                      <circle cx="14.5" cy="14.5" r="14.5" fill="white" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.3016 7.07324L21.2198 15.2074L13.3016 23.3415L11.3174 21.308L17.2607 15.2074L11.3174 9.10678L13.3016 7.07324Z"
                        fill="#E37C39"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    "https://api.aimcongress.com/api/website/getexhibitors?eventid=cfc66726-6b7d-467f-8453-f0ee21b035f2"
  );

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const exhibitors: ExhibitorModel[] = await res.json();

  return {
    props: { exhibitors },
  };
};
