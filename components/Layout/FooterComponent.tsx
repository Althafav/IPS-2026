import { Globalcomponent } from "@/models/globalcomponent";

import Globals from "@/modules/Globals";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import SupportingPartnerComponent from "../Home/PartnersComponent";
import { Menuitem } from "@/models/menuitem";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { IoMdPin } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import SlantedSection from "../UI/SlantedSection/SlantedSection";
import JsLoader from "@/modules/JsLoader";

export default function FooterComponent() {
  const [pageData, setPageData] = useState<Globalcomponent | null>(null);

  useEffect(() => {
    Globals.KontentClient.item("global_component")
      .withParameter("depth", "4")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, []);

  useEffect(() => {
    if (!pageData) return;
    JsLoader.loadFile(`/assets/js/newsLetter.js`);
  }, [pageData]);

  if (!pageData) {
    return null;
  }

  const menuItems = pageData.menuitems.value as unknown as Menuitem[];
  return (
    <div className="relative ">
      <SlantedSection className="bg-[#333333] absolute -bottom-80 " />
      <footer className="footer-component-wrapper ">
        <div className="container mx-auto   ">
          <div className="py-10">
            <form
              method="POST"
              action="//ac.strategic.ae/proc.php"
              id="_form_235_"
              className="_form _form_235 _inline-form  _dark m-b-30 w-full max-w-xl mx-auto "
              noValidate
            >
              <input type="hidden" name="u" value="235" />
              <input type="hidden" name="f" value="235" />
              <input type="hidden" name="s" />
              <input type="hidden" name="c" value="0" />
              <input type="hidden" name="m" value="0" />
              <input type="hidden" name="act" value="sub" />
              <input type="hidden" name="v" value="2" />
              <input
                type="hidden"
                name="or"
                value="9243508e4fec06bbf20d1c5a63ea74ae"
              />
              <div className="_form-content">
                <h2 className="mb-5 text-2xl md:text-4xl font-semibold tracking-tight text-white text-center">
                  Subscribe to our Newsletter
                </h2>
                <div className="">
                  <input
                    type="text"
                    className="form-control newsletter-field mt-1 block w-full rounded-full newsletter-field border border-primary-orange bg-transparent px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                    id="email"
                    name="email"
                    placeholder="Enter your mail"
                    required
                  />
                </div>

                <div className="my-3 flex justify-center">
                  <div
                    className="g-recaptcha"
                    data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
                  ></div>
                </div>

                <div className="flex justify-center">
                  <input
                    type="submit"
                    id="_form_235_submit"
                    className="newsletter-submit items-center justify-center rounded-full bg-primary-orange px-5 py-3 text-sm font-medium text-white transition hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-blue-800"
                    value="Submit"
                  />
                </div>
              </div>
              <div
                className="_form-newsletter-thank-you text-white text-center w-full"
                style={{ display: "none" }}
              ></div>
            </form>
          </div>
          <div className="w-full h-[1px] bg-black" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
            <div className="flex-shrink-0">
              <p className="text-white mb-5">
                {pageData.organizedbytext.value}
              </p>
              <Link href="/">
                {pageData.organizedbylogo.value[0] && (
                  <img
                    src={pageData.organizedbylogo.value[0].url}
                    alt="Logo"
                    className="w-48 object-contain"
                  />
                )}
              </Link>

              <div className="flex gap-3 mt-10">
                <Link href={pageData.linkedinlink.value} target="_blank">
                  <FaLinkedinIn
                    className="text-primary-orange hover:scale-75 transition duration-75 ease-in"
                    size={32}
                  />
                </Link>

                <Link href={pageData.facebooklink.value}>
                  <FaFacebookF
                    className="text-primary-orange hover:scale-75 transition duration-75 ease-in"
                    size={32}
                  />
                </Link>

                <Link href={pageData.xtwiterlink.value}>
                  <FaXTwitter
                    className="text-primary-orange hover:scale-75 transition duration-75 ease-in"
                    size={32}
                  />
                </Link>

                <Link href={pageData.youtubelink.value}>
                  <FaYoutube
                    className="text-primary-orange hover:scale-75 transition duration-75 ease-in"
                    size={32}
                  />
                </Link>

                <Link href={pageData.instagramlink.value}>
                  <FaInstagram
                    className="text-primary-orange hover:scale-75 transition duration-75 ease-in"
                    size={32}
                  />
                </Link>
              </div>
            </div>

            <div className="flex sm:justify-center">
              <nav className="flex flex-col gap-5">
                {menuItems.map((item) => {
                  const name = item.name.value;
                  const link = item.link.value;
                  const target =
                    item.isexternal.value === "Yes" ? "_blank" : "_self";
                  const children = item.items.value as Menuitem[];

                  return (
                    <div key={item.system.id} className="relative group ">
                      <Link
                        href={link}
                        target={target}
                        className="px-3 py-2 
                    
                   text-white
                   text-md
                     hover:text-primary-orange
                    transition-colors duration-200"
                      >
                        <span className="text-sm"> {name}</span>
                      </Link>
                    </div>
                  );
                })}
              </nav>
            </div>

            <div className="text-white flex flex-col gap-5">
              <div>
                <p className="mb-3 font-bold">Contact Us</p>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <FaPhoneAlt className="text-primary-orange" size={24} />
                    <p>{pageData.mobile.value}</p>
                  </div>

                  <div className="flex gap-2">
                    <IoMail className="text-primary-orange" size={24} />
                    <p>{pageData.email.value}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="my-3 font-bold">Address</p>
                <div className="flex gap-2">
                  <IoMdPin className="text-primary-orange" size={24} />
                  <p className="max-w-[200px]">{pageData.address.value}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-black" />
          <div className="py-10 text-white flex sm:flex-row flex-col gap-5 justify-between">
            <p>{pageData.copyrighttext.value}</p>
            {pageData.policyitems.value.map((item: any, index: number) => {
              return (
                <Link href={item.link.value}>
                  <span>{item.name.value}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
