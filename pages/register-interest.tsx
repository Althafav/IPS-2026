// pages/register.tsx

import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

import Globals from "@/modules/Globals";
import JsLoader from "@/modules/JsLoader";

import SpinnerComponent from "@/components/UI/SpinnerComponent";

import GenericData from "@/constants/countryData";
import { Formpage2026 } from "@/models/formpage2026";
import { NatureOfBusiness } from "@/constants/NatureOfBusiness";

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

  const handleNationalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (nationalityRef.current) {
      nationalityRef.current.value = e.target.value;
    }
  };

  const [showOtherSpecialization, setShowOtherSpecialization] = useState(false);

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
    if (!checkbox || !yesInput || !noInput) {
      console.warn("Missing checkbox or hidden input fields.");
      return;
    }

    if (checkbox.checked) {
      yesInput.checked = true;
      noInput.checked = false;
    } else {
      yesInput.checked = false;
      noInput.checked = true;
    }
  };

  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div className="form-2026">
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
        <meta
          property="og:url"
          content="https://www.ipscongress.com/book-your-stand"
        />
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

        <link
          rel="canonical"
          href="https://www.ipscongress.com/book-your-stand"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <div className="register-interest-form-wrapper-2026 py-10 bg-white relative">
          <div className="">
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <form
                    method="POST"
                    action="//ac.strategic.ae/proc.php"
                    id="_form_400_"
                    className="_form _form_400 _inline-form  _dark"
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

                    <div className="_form-content form-grid">
                      <h1 className="text-primary-blue text-2xl mb-5">
                        {pageData.bannerheading.value}
                      </h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="">
                          <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            className="custom-input"
                            placeholder="First Name *"
                            required
                          />
                        </div>

                        <div className="">
                          <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            className="custom-input"
                            placeholder="Last Name *"
                            required
                          />
                        </div>

                        <div className="">
                          <input
                            type="text"
                            id="customer_account"
                            name="customer_account"
                            className="custom-input"
                            placeholder="Company Name *"
                            required
                          />
                        </div>

                        <div className="">
                          <input
                            type="text"
                            id="field[23]"
                            name="field[23]"
                            className="custom-input"
                            placeholder="Designation *"
                            required
                          />
                        </div>

                        <div className="">
                          <input
                            type="text"
                            itemID="email"
                            name="email"
                            className="custom-input"
                            placeholder="Email *"
                            required
                          />
                        </div>

                        <div className="">
                          <div className="row">
                            <div className="phone-wrapper">
                              <select
                                name="phoneCode"
                                required
                                className="custom-select"
                              >
                                <option value="">Code</option>
                                {CountriesCode.map((code, i) => (
                                  <option key={i} value={code.value}>
                                    {code.label}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="number"
                                name="field[12]"
                                placeholder="Mobile Phone *"
                                required
                                className="custom-input phone"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <select
                            name="field[3]"
                            id="field[3]"
                            className="custom-select"
                            required
                          >
                            <option value="">Select Country*</option>

                            {CountriesData.map(
                              (country: any, index: number) => {
                                return (
                                  <option
                                    key={`country-${index}`}
                                    value={country.value}
                                  >
                                    {country.label}
                                  </option>
                                );
                              }
                            )}
                          </select>
                        </div>

                        <div className="_form_element _field3 _full_width form-group">
                          <div className="_field-wrapper">
                            <input
                              type="text"
                              id="field[99]"
                              className="nationality"
                              name="field[99]"
                              hidden
                              ref={nationalityRef}
                            />
                            <select
                              id="Nationality"
                              className="custom-select"
                              onChange={handleNationalityChange}
                              required
                            >
                              <option value="">Select Nationality</option>
                              {CountriesData.map(
                                (country: any, index: number) => {
                                  return (
                                    <option
                                      key={`country-${index}`}
                                      value={country.value}
                                    >
                                      {country.label}
                                    </option>
                                  );
                                }
                              )}
                            </select>
                          </div>
                        </div>

                        <div className="">
                          <div className="_form_element _field3 _full_width form-group">
                            <select
                              name="field[4]"
                              id="field[4]"
                              className="custom-select"
                              required
                            >
                              <option value=""> Nature of Business</option>
                              {NatureOfBusiness.map(
                                (nob: any, index: number) => (
                                  <option
                                    value={nob.value}
                                    key={`nob-${index}`}
                                  >
                                    {nob.label}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                        <div></div>

                        <div className="">
                          <div className="_form_element _x30773478 _full_width form-group">
                            <label className="_form-label">
                              Interested in
                              <span className="text-danger"> *</span>
                            </label>
                            <div className="_field-wrapper">
                              <div className="row">
                                <div className="col-12">
                                  <fieldset className="_form-fieldset">
                                    <input
                                      data-autofill="false"
                                      type="hidden"
                                      id="field[235][]"
                                      name="field[235][]"
                                      value="~|"
                                    />
                                    <div className="_row _checkbox-radio">
                                      <input
                                        id="field_235Exhibitor"
                                        type="checkbox"
                                        name="field[235][]"
                                        value="Exhibitor"
                                        className="any mx-2"
                                        required
                                      />
                                      <span>
                                        <label>Exhibitor</label>
                                      </span>
                                    </div>
                                    <div className="_row _checkbox-radio">
                                      <input
                                        id="field_235Sponsor"
                                        type="checkbox"
                                        name="field[235][]"
                                        value="Sponsor"
                                        className="mx-2"
                                      />
                                      <span>
                                        <label>Sponsor</label>
                                      </span>
                                    </div>
                                    <div className="_row _checkbox-radio">
                                      <input
                                        id="field_235Event Partner"
                                        type="checkbox"
                                        name="field[235][]"
                                        value="Event Partner"
                                        className="mx-2"
                                      />
                                      <span>
                                        <label>Event Partner</label>
                                      </span>
                                    </div>
                                    <div className="_row _checkbox-radio">
                                      <input
                                        id="field_235Media Partner"
                                        type="checkbox"
                                        name="field[235][]"
                                        value="Media Partner"
                                        className="mx-2"
                                      />
                                      <span>
                                        <label>Media Partner</label>
                                      </span>
                                    </div>
                                    <div className="_row _checkbox-radio">
                                      <input
                                        id="field_235Attend Workshop"
                                        type="checkbox"
                                        name="field[235][]"
                                        value="Attend Workshop"
                                        className="mx-2"
                                      />
                                      <span>
                                        <label>Attend Workshop</label>
                                      </span>
                                    </div>
                                    <div className="_row _checkbox-radio">
                                      <input
                                        id="field_235Attend Conference"
                                        type="checkbox"
                                        name="field[235][]"
                                        value="Attend Conference"
                                        className="mx-2"
                                      />
                                      <span>
                                        <label>Attend Conference</label>
                                      </span>
                                    </div>
                                    <div className="_row _checkbox-radio">
                                      <input
                                        id="field_235Visitor"
                                        type="checkbox"
                                        name="field[235][]"
                                        value="Visitor"
                                        className="mx-2"
                                      />
                                      <span>
                                        <label>Visitor</label>
                                      </span>
                                    </div>
                                  </fieldset>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="options-row px-2">
                        <label className="custom-checkbox">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="psr"
                            onClick={() =>
                              handleCheck("psr", "field_241Yes", "field_241No")
                            }
                          />
                          <span>Post Show Report</span>
                        </label>
                      </div>

                      <div className="_form_element _x60048877 _full_width ">
                        <div
                          className="g-recaptcha"
                          data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
                        ></div>
                      </div>

                      <div className="_button-wrapper _full_width">
                        <button
                          id="_form_400_submit"
                          className="_submit form-btn-blue bg-primary-orange px-4 py-2 rounded-full text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                      <div className="_clear-element"></div>
                    </div>
                    <div
                      className="_form-thank-you"
                      style={{ display: "none" }}
                    ></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    "register_interest___form"
  )
    .languageParameter(Globals.CURRENT_LANG_CODENAME)
    .withParameter("depth", "4")
    .toObservable()
    .toPromise()
    .then((r: any) => {
      return JSON.stringify(r.item);
    });
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
