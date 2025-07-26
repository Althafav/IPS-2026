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

  if (!pageData) {
    return null;
  }

  const menuItems = pageData.menuitems.value as unknown as Menuitem[];
  return (
    <div className="relative">
      <SlantedSection className="bg-[#333333] absolute -bottom-80 " />
      <footer className="footer-component-wrapper pt-20">
        <div className="container mx-auto   ">
          <div className="w-full h-[1px] bg-black" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-20">
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
                  <FaLinkedinIn className="text-primary-orange" size={32} />
                </Link>

                <Link href={pageData.facebooklink.value}>
                  <FaFacebookF className="text-primary-orange" size={32} />
                </Link>

                <Link href={pageData.xtwiterlink.value}>
                  <FaXTwitter className="text-primary-orange" size={32} />
                </Link>

                <Link href={pageData.youtubelink.value}>
                  <FaYoutube className="text-primary-orange" size={32} />
                </Link>

                <Link href={pageData.instagramlink.value}>
                  <FaInstagram className="text-primary-orange" size={32} />
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
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
