import imageUrlBuilder from '@sanity/image-url'
import { createClient } from "next-sanity";
//... 


export const client = createClient({
  projectId: "9b3lv311",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) =>{
  return builder.image(source)
}