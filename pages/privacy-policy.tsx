import Head from "next/head";
import React from "react";

import { Basiccontentpage } from "../models/basiccontentpage";
import Globals from "@/modules/Globals";

export async function getStaticProps() {
  const datasourceStr: string = await Globals.KontentClient.item(
    "privacy_policy"
  )
    .languageParameter(Globals.CURRENT_LANG_CODENAME)
    .toObservable()
    .toPromise()
    .then((r: any) => {
      return JSON.stringify(r.item);
    });

  const pageData: Basiccontentpage = JSON.parse(datasourceStr);

  return {
    props: {
      pageData,
    },
    revalidate: 120,
  };
}

function ListPage({ pageData }: { pageData: Basiccontentpage }) {
  return (
    <React.Fragment>
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
        <meta property="og:url" content="https://www.ipscongress.com/about" />
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

        <link rel="canonical" href="https://www.ipscongress.com/about" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="basic-content-page py-10">
        <div className="container mx-auto">
          <div className="">
            <div className="col-12">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: pageData.content.value }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ListPage;
