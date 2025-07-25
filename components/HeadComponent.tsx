import Head from "next/head";
import React, { useEffect } from "react";

export default function HeadComponent() {
  // useEffect(() => {
  //   const link = document.createElement("link");
  //   link.rel = "stylesheet";
  //   link.href = "/assets/css/main.min.css";
  //   document.head.appendChild(link);
  // }, []);

  return (
    <>
      <link href={`/assets/css/main.min.css`} rel="stylesheet" media="all" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </>
  );
}
