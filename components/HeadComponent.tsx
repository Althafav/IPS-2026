import Head from "next/head";
import React from "react";

export default function HeadComponent() {
  return (
    <>
      <link href={`/assets/css/main.min.css`} rel="stylesheet" media="all" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </>
  );
}
