
import { Aboutpage2026 } from "@/models/aboutpage2026";
import { Basiccontentpage } from "@/models/basiccontentpage";
import { Blogitem2026 } from "@/models/blogitem2026";
import { Blogspage2026 } from "@/models/blogspage2026";
import { Conferencepage } from "@/models/conferencepage";
import { Exhibitionpage2026 } from "@/models/exhibitionpage2026";
import { Formpage2026 } from "@/models/formpage2026";
import { Homepage2026 } from "@/models/homepage2026";
import { Partnerspage } from "@/models/partnerspage";



const KontentDelivery = require("@kentico/kontent-delivery");


export const TypeResolver = [
  new KontentDelivery.TypeResolver("Homepage2026", (rawData: any) => new Homepage2026()),
  new KontentDelivery.TypeResolver("Aboutpage2026", (rawData: any) => new Aboutpage2026()),
    new KontentDelivery.TypeResolver("Conferencepage", (rawData: any) => new Conferencepage()),
     new KontentDelivery.TypeResolver("Exhibitionpage2026", (rawData: any) => new Exhibitionpage2026()),
   new KontentDelivery.TypeResolver("Blogspage2026", (rawData: any) => new Blogspage2026()),
      new KontentDelivery.TypeResolver("Blogitem2026", (rawData: any) => new Blogitem2026()),

         new KontentDelivery.TypeResolver("Partnerspage", (rawData: any) => new Partnerspage()),
   new KontentDelivery.TypeResolver("Formpage2026", (rawData: any) => new Formpage2026()),
      new KontentDelivery.TypeResolver("Basiccontentpage", (rawData: any) => new Basiccontentpage()),
 
];
