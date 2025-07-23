import { GetServerSideProps } from "next";
import Head from "next/head";
import ExhibitorModel from "@/sysModels/exhibitorModel";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { slugify } from "@/lib/slugify";
import ExhibitorCard from "@/components/UI/Card/ExhibitorCard";

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
            <div key={index}>
              <ExhibitorCard exhibitor={exhibitor} />
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
