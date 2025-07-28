
import { Aboutpage2026 } from "@/models/aboutpage2026";
import { Blogitem2026 } from "@/models/blogitem2026";
import { Blogspage2026 } from "@/models/blogspage2026";
import { Conferencepage } from "@/models/conferencepage";
import { Formpage2026 } from "@/models/formpage2026";
import { Homepage2026 } from "@/models/homepage2026";



const KontentDelivery = require("@kentico/kontent-delivery");


export const TypeResolver = [
  new KontentDelivery.TypeResolver("Homepage2026", (rawData: any) => new Homepage2026()),
  new KontentDelivery.TypeResolver("Aboutpage2026", (rawData: any) => new Aboutpage2026()),
    new KontentDelivery.TypeResolver("Conferencepage", (rawData: any) => new Conferencepage()),
   new KontentDelivery.TypeResolver("Blogspage2026", (rawData: any) => new Blogspage2026()),
      new KontentDelivery.TypeResolver("Blogitem2026", (rawData: any) => new Blogitem2026()),
   new KontentDelivery.TypeResolver("Formpage2026", (rawData: any) => new Formpage2026()),
 
];
