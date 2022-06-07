import Link from 'next/link';
import React from 'react'
import { urlFor } from '../libs/client';
import { bannerType } from '../Types';
import styles from '../styles/Home.module.css'

type Props = {
  footerBanner: bannerType;
}

const FooterBanner = ({footerBanner:{buttontext,desc,discount,image,largeText,largerText,midText,product,saleTime,smallText}}: Props) => {
  return (
    <div className={`${styles.footerBannerContainer} relative py-16 px-10 bg-layoutColor rounded-2xl w-full md:mt-64 sm:mt-44 mt-20 leading-4 text-white`}>
      <div className="banner-desc flex flex-col sm:flex-row justify-between">
        <div className="left w-2/4">
          <p className='m-4'>{discount}</p>
          <p className='md:font-black md:text-8xl sm:text-6xl text-4xl sm:font-bold font-medium ml-6'>{largeText}</p>
          <p className='md:font-black md:text-8xl sm:text-6xl text-4xl sm:font-bold font-medium ml-6'>{largerText}</p>
          <p className='m-4 md:text:base sm:text-sm '>{saleTime}</p>
        </div>
        <div className={`${styles.right} sm:mt-0 mt-12 leading-5`}>
          <p className='md:text-lg text-base'>{smallText}</p>
          <p className='md:text-6xl text-4xl mt-4 mb-3 md:font-extrabold sm:font-bold'>{midText}</p>
          <p className='text-sm font-light'>{desc}</p>
          <Link href={`product/${product}`}>
            <button className='pointer py-3 px-4 bg-white text-layoutColor border-none rounded-2xl mt-10 text-lg font-medium ' type='button'>{buttontext}</button>
          </Link>
          <img className={`${styles.footerBannerImage} absolute`} src={(urlFor(image[0])).toString()} alt="" />
        </div>
      </div>
    </div>
  )
}

export default FooterBanner