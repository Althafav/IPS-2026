import HeadComponent from "@/components/HeadComponent";
import Globals from "@/modules/Globals";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";


export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />
        <HeadComponent />
      </Head>
      <body className="">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
