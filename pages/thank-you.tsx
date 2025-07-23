import Link from "next/link";
import React, { useEffect, useState } from "react";
import Head from "next/head";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";

import Globals from "@/modules/Globals";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import Helper from "@/modules/Helper";
import { useRouter } from "next/router";
import { Thankyoupage } from "@/models/thankyoupage";

export default function ThankYouPage() {
  const lowerText =
    "Stay tuned for more updates and information here on our website and social media.";

  const [pageData, setPageData] = useState<Thankyoupage | null>(null);
  const router = useRouter();
  const { user } = router.query;
  useEffect(() => {
    var languageCode = Helper.getLanguageCode();
    Globals.KontentClient.item("thankyou_page")
      .languageParameter(Helper.getLanguageName(languageCode))
      .toObservable()
      .subscribe((response: any) => {
        console.log("API Response:", response);
        setPageData(response.item);
      });
  }, []);

  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <div className="thankyou-page-wrapper whiteBg card container my-20 rounded">
        <div className="max-w-4xl">
          {user && (
            <h1 className="text-xl font-semibold mt-2">
              Thank you, <span className="text-primary">{user}</span>!
            </h1>
          )}
          <p
            className="mt-2"
            dangerouslySetInnerHTML={{ __html: pageData.content.value }}
          />

          <p className="my-3">{lowerText}</p>

          <div className="flex gap-3 ">
            <Link href={pageData.facebooklink.value} target="_blank">
              <FaFacebook color="black" size={20} />
            </Link>

            <Link href={pageData.whatsapplink.value} target="_blank">
              <FaWhatsapp color="black" size={20} />
            </Link>

            <Link href={pageData.linkinlink.value} target="_blank">
              <FaLinkedin color="black" size={20} />
            </Link>

            <Link href={pageData.instagramlink.value} target="_blank">
              <FaInstagram color="black" size={20} />
            </Link>

            <Link href={pageData.youtubelink.value} target="_blank">
              <FaYoutube color="black" size={20} />
            </Link>

            <Link href={pageData.xlink.value} target="_blank">
              <FaXTwitter color="black" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
