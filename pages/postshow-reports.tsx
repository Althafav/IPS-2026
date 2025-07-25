import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useMemo, useState } from "react";
import Globals from "@/modules/Globals";
import Link from "next/link";
import { Reportitem } from "@/models/reportitem";



interface Props {
  pageData: {
    reportitems: { value: Reportitem[] };
  };
}

export default function Page({ pageData }: Props) {
  const allReports = pageData.reportitems.value;

  const years = useMemo(() => {
    return Array.from(
      new Set(
        allReports.flatMap(
          (item) =>
            item.year?.value?.map((choice) => choice.name) || []
        )
      )
    ).sort((a, b) => b.localeCompare(a));
  }, [allReports]);

  const [selectedYear, setSelectedYear] = useState<string>("All");

  const filteredReports = useMemo(() => {
    if (selectedYear === "All") return allReports;
    return allReports.filter((report) =>
      report.year?.value?.some((choice) => choice.name === selectedYear)
    );
  }, [selectedYear, allReports]);

  return (
    <>
      <Head>
        <title>Post Show Reports</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Year Filter Dropdown */}
        <div className="mb-6">
          <label className="mr-2 font-semibold">Filter by Year:</label>
          <select
            className="border border-gray-300 rounded p-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">All</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredReports.map((report, idx) => (
            <div
              key={report.name.value + idx} // Always use a key!
              className="relative rounded-2xl shadow-lg overflow-hidden group bg-white"
              style={{ minHeight: 240, width: 320, maxWidth: "100%" }}
            >
              <div className="relative w-full h-[200px] mask-card-shape overflow-hidden group">
                <Image
                  src={report.image.value[0]?.url || ""}
                  alt={report.image.value[0]?.name || report.name.value || "Report"}
                  fill
                  className="object-cover"
                />

                <Link
                  href={report.reportpdf.value[0]?.url || "#"}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition"
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 3v12m0 0l4-4m-4 4l-4-4m-6 7v2a2 2 0 002 2h16a2 2 0 002-2v-2"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-white mt-2">Download</span>
                </Link>
              </div>
              <div className="relative bg-white pt-5 pb-4 px-4  rounded-b-2xl">
                <span className="font-semibold text-black">
                  {report.name.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response: any = await Globals.KontentClient.item(
    "post_show_report_page"
  )
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));

  return {
    props: {
      pageData,
    },
  };
};
