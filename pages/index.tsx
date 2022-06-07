import Head from 'next/head'
// import Image from 'next/image';
import { Cart, Footer, FooterBanner, HeroBanner, Product } from '../components'
import styles from '../styles/Home.module.css'

import {client} from '../libs/client'
import {bannerType} from '../Types/index'
import {productType} from '../Types/index'
// import { groq } from 'next-sanity';

type Props = {
  products : productType[];
  bannerData: bannerType[];
}

export default function Home({products,bannerData}:Props) {
  // console.log(products)
  // const ban = bannerData[0];
  return (
    <div>
      <div>
        <HeroBanner heroBanner={bannerData[0]}/>
        <div className='text-center my-10 mx-10 text-main'>
         <h2 className='sm:text-5xl text-3xl font-extrabold'>Best Selling Products</h2>
         <p className='text-base font-light py-4'>Speakers of many variations</p>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-4 mt-6 w-full">
          {products?.map((product)=><Product key={product._id} product={product}/>)}
        </div>
        <FooterBanner footerBanner={bannerData[0]}/>
      </div>
      </div>
  )
}

export async function getServerSideProps() {
  // const productQuery =  groq`*[_type == "products"]`
  const productQuery =  '*[_type == "products"] | order(_createdAt asc)'
  const products = await client.fetch(productQuery)

  // const bannerQuery = groq`*[_type == "banner"] | order(_createdAt asc)`
  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)
  return {
    props: {products,bannerData}, // will be passed to the page component as props
  }
}