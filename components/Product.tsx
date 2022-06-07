import Link from 'next/link';
import React from 'react'
import { urlFor } from '../libs/client';
import { productType } from '../Types'


type Props = {
  product: productType;
}

const Product = ({product:{name,image,slug,price}}: Props) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='cursor-pointer text-main scale-100 transition-transform ease-linear duration-500 hover:scale-110'>
          <img className='rounded-2xl bg-productbgColor scale-100 transition-transform ease-linear duration-500' src={urlFor(image[0]).toString()} width={250} height={250} alt="" />
        <div className="font-medium text-main">{name}</div>
        <div className="text-black font-extrabold mt-2">${price}</div>
        </div>
      </Link>
    </div>
  )
}

export default Product;