// import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { urlFor } from '../libs/client';
import {bannerType} from '../Types/index'
import styles from '../styles/Home.module.css'


type Props = {
  heroBanner: bannerType;
}

const HeroBanner = ({heroBanner:{buttontext,desc,discount,image,largeText,midText,product,saleTime,smallText}}: Props) => {
// const HeroBanner = ({bannerData}: Props) => {
  // console.log(buttontext)
  // const headphoneImage = image[0];
  return (
    // <div className={`${styles.heroBannerContainer} py-24 px-10 bg-bannerContainer rounded-xl relative w-full leading-3`}>
    <div className={`${styles.heroBannerContainer} py-24 px-10 md:block flex flex-col bg-bannerContainer rounded-xl relative w-full leading-3`}>
      <div>
        <p className='text-xl'>{smallText}</p>
      </div>
      <h3 className='md:text-6xl sm:text-5xl text-3xl font-bold'>{midText}</h3>
      <h1 className='md:text-9xl sm:text-8xl text-5xl font-black tracking-wide uppercase text-white'>{largeText}</h1>
      <img src={urlFor(image[0]).toString()} alt="headphones" className={`${styles.heroBannerImage}`} />
      {/* <Image src={urlFor(headphoneImage)} alt="headphones" className='absolute top-0 right-1/4 w-[28rem] h-[28rem]' /> */}

      <div>
        <Link href={`/product/${product.toLowerCase()}`}>
          <button className='bg-primary z-10 text-lg rounded-2xl mt-4 font-medium pointer py-2 px-4 text-white' type='button'>{buttontext}</button>
        </Link>
      </div>
      <div className="absolute flex flex-col w-80 leading-5 mb-3" style={{right:'7%',bottom:'5%'}}>
        <h5 className='font-bold text-main text-base self-end mb-3'>Description</h5>
        <p className='text-sm text-right text-descriptionColor'>{desc}</p>
      </div>
    </div>
  )
}

export default HeroBanner
