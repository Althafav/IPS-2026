import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

import Globals from "@/modules/Globals";
import JsLoader from "@/modules/JsLoader";

import SpinnerComponent from "@/components/UI/SpinnerComponent";

import GenericData from "@/constants/countryData";
import { Formpage2026 } from "@/models/formpage2026";

interface CountryData {
  label: string;
  value: string;
}

interface Props {
  mainsource: string;
  subsource: string;
  CountriesCode: CountryData[];
  CountriesData: CountryData[];
  pageData: Formpage2026;
  attendAs: string;
}

export default function RegisterPage({
  mainsource,
  subsource,
  CountriesCode,
  CountriesData,
  pageData,
}: Props) {
  useEffect(() => {
    JsLoader.loadFile(`/assets/js/registerInterest.js`);
  }, []);

  const nationalityRef = useRef<HTMLInputElement>(null);
  const [showOtherSpecialization, setShowOtherSpecialization] = useState(false);

  const handleNationalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (nationalityRef.current) {
      nationalityRef.current.value = e.target.value;
    }
  };

  const handleSpecializationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setShowOtherSpecialization(e.target.value === "Other");
  };

  const handleCheck = (
    checkboxId: string,
    yesFieldId: string,
    noFieldId: string
  ) => {
    const checkbox = document.getElementById(
      checkboxId
    ) as HTMLInputElement | null;
    const yesInput = document.getElementById(
      yesFieldId
    ) as HTMLInputElement | null;
    const noInput = document.getElementById(
      noFieldId
    ) as HTMLInputElement | null;
    if (!checkbox || !yesInput || !noInput) return;

    if (checkbox.checked) {
      yesInput.checked = true;
      noInput.checked = false;
    } else {
      yesInput.checked = false;
      noInput.checked = true;
    }
  };

  if (!pageData) return <SpinnerComponent />;

  return (
    <>
      <Head>
        <title>{pageData.metadataPagetitle.value}</title>
        <meta name="title" content={pageData.metadataMetatitle.value} />
        <meta
          name="description"
          content={pageData.metadataMetadescription.value}
        />
        {/* ...other meta tags... */}
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-primary-blue mb-6">
            {pageData.bannerheading.value}
          </h1>

          <form
            method="POST"
            action="//ac.strategic.ae/proc.php"
            id="_form_400_"
            className="space-y-6"
            noValidate
          >
            <input type="hidden" name="u" value="400" />
            <input type="hidden" name="f" value="400" />
            <input type="hidden" name="s" />
            <input type="hidden" name="c" value="0" />
            <input type="hidden" name="m" value="0" />
            <input type="hidden" name="act" value="sub" />
            <input type="hidden" name="v" value="2" />
            <input
              type="hidden"
              name="or"
              value="afa0e90b181b5113564543437bf2465a"
            />
            <input
              type="hidden"
              name="field[38]"
              value={pageData.formsubmit.value}
            />
            <input type="hidden" name="field[328]" value={mainsource} />
            <input type="hidden" name="field[329]" value={subsource} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name *
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="First Name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name *
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="Last Name"
                />
              </div>

              {/* Company Name (full width) */}
              <div className="md:col-span-2">
                <label
                  htmlFor="customer_account"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name *
                </label>
                <input
                  id="customer_account"
                  name="customer_account"
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="Company Name"
                />
              </div>

              {/* Designation */}
              <div>
                <label
                  htmlFor="field[23]"
                  className="block text-sm font-medium text-gray-700"
                >
                  Designation *
                </label>
                <input
                  id="field[23]"
                  name="field[23]"
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="Designation"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="Email"
                />
              </div>

              {/* Phone Code & Number (full width on mobile) */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label
                    htmlFor="phoneCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Code *
                  </label>
                  <select
                    id="phoneCode"
                    name="phoneCode"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    <option value="">Select Code</option>
                    {CountriesCode.map((code, i) => (
                      <option key={i} value={code.value}>
                        {code.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="field[12]"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile Phone *
                  </label>
                  <input
                    id="field[12]"
                    name="field[12]"
                    type="tel"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    placeholder="Mobile Phone"
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="field[3]"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country *
                </label>
                <select
                  id="field[3]"
                  name="field[3]"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  <option value="">Select Country</option>
                  {CountriesData.map((country, idx) => (
                    <option key={idx} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nationality */}
              <div>
                <label
                  htmlFor="Nationality"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nationality *
                </label>
                <input
                  type="hidden"
                  id="field[99]"
                  name="field[99]"
                  ref={nationalityRef}
                />
                <select
                  id="Nationality"
                  onChange={handleNationalityChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  <option value="">Select Nationality</option>
                  {CountriesData.map((country, idx) => (
                    <option key={idx} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Specialization *
                </label>
                <select
                  name="field[289]"
                  id="field[289]"
                  required
                  onChange={handleSpecializationChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  <option value="">Select Specialization</option>
                  {[
                    "Developer",
                    "Real Estate Agency",
                    "Holiday Homes",
                    "Timeshare",
                    "Immigration",
                    "Proptech Startup",
                    "Property Technology",
                    "Property Consultant",
                    "Bank and Mortgage Company",
                    "Other",
                  ].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {showOtherSpecialization && (
                  <input
                    type="text"
                    name="field[290]"
                    placeholder="Please specify"
                    required
                    className="mt-3 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                )}
              </div>

              {/* How did you hear about us */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  How did you hear about us? *
                </label>
                <select
                  name="field[348]"
                  id="field[348]"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  <option value="">Select an option</option>
                  {[
                    "Email Newsletter",
                    "Industry Event",
                    "IPS Global Ambassadors",
                    "IPS Website",
                    "Media Coverage (e.g. magazines / online articles)",
                    "Online Advertisement",
                    "Partner Organization",
                    "Referral from a Colleague",
                    "Search Engine (e.g. Google)",
                    "Social media (e.g. LinkedIn/ Instagram/ Facebook)",
                    "Word of mouth",
                    "Other",
                  ].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Post Show Report Checkbox */}
            <div className="flex items-center">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="psr"
                  onClick={() => handleCheck("psr", "field_241Yes", "field_241No")}
                  className="form-checkbox h-5 w-5 text-primary-blue"
                />
                <span className="ml-2 text-gray-700">Post Show Report</span>
                <input type="hidden" id="field_241Yes" name="field[241][]" value="Yes" />
                <input type="hidden" id="field_241No" name="field[241][]" value="No" />
              </label>
            </div>

            {/* Google reCAPTCHA */}
            <div>
              <div
                className="g-recaptcha"
                data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
              ></div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-primary-orange hover:bg-primary-orange-dark text-white font-medium py-3 rounded-full transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const params = context.query;
  const mainsource = params.mainsource || "/";
  const subsource = params.subsource || "/";
  const attendAs = params.attend || "";

  const [CountriesCode, CountriesData] = await Promise.all([
    GenericData.countryCodes(),
    GenericData.countries(),
  ]);

  const datasourceStr: string = await Globals.KontentClient.item(
    "book_your_stand___form"
  )
    .languageParameter(Globals.CURRENT_LANG_CODENAME)
    .withParameter("depth", "4")
    .toObservable()
    .toPromise()
    .then((r: any) => JSON.stringify(r.item));

  const pageData: Formpage2026 = JSON.parse(datasourceStr);
  return {
    props: {
      mainsource,
      subsource,
      CountriesCode,
      CountriesData,
      pageData,
      attendAs,
    },
  };
}
