import React, { useEffect } from "react";
import Script from "next/script";


export default function ScriptsComponent() {
  return (
    <>
      
      <Script
        type="text/javascript"
        src={`/assets/js/main.js`}
        strategy="beforeInteractive"
      ></Script>
     
    </>
  );
}
