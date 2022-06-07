import { groq } from 'next-sanity';
import React, { useState } from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';
import { FaStarHalfAlt } from 'react-icons/fa';
import { Product } from '../../components';
import { client, urlFor } from '../../libs/client';
import { productType } from '../../Types';
import styles from '../../styles/Home.module.css';

type Props = {
 products: productType[];
 singleProduct: productType;
}

const ProductDetails = ({products,singleProduct:{name,image,rating,price,details}}: Props)=>{
  const [imageIndex, setImageIndex] = useState<number>(0)
  console.log(rating)
  const ratingCalculator = (rate:number)=>{
    const totalRating = [];
    for (let index = 1; index <= Math.ceil(rate); index++) {
      if(index%1==0 && index<= rate){
        totalRating.push(<AiFillStar className='text-layoutColor'/>);
      }
      if(rate%1>0 && index == Math.ceil(rate)){
        // totalRating.push(<BsStarHalf/>)
        totalRating.push(<FaStarHalfAlt className='text-layoutColor text-sm'/>)
      }
      // else{
      //   totalRating.push(<BsStarHalf/>)
      // }
    }

    if(Math.ceil(rate)<5){
      for (let start = 1; start <= (Math.abs(Math.ceil(rate)-5)); start++) {
        totalRating.push(<AiOutlineStar className='text-layoutColor'/>)
      }
    }
    console.log(totalRating)
    return totalRating;
  }
return(
  <div>
    <div className='product-detail-container gap-10 flex flex-col lg:flex-row m-10 mt-16 text-main'>
      <div>
        <div className="image-contain text-center bg-bannerContainer hover:bg-layoutColor rounded-2xl">
          <img src={urlFor(image[imageIndex]).toString()} width={450} alt="" />
        </div>
        <div className='flex mt-8 gap-5'>
        {image.map((element:any,i:number)=>(
           <img onMouseOver={()=>{setImageIndex(i);}} src={urlFor(element).toString()} className={`${imageIndex == i ?'bg-layoutColor': 'bg-bannerContainer'} rounded-lg`} width={70} alt="" />
        ))}
        </div>
      </div>
      <div className='product-detail-desc grow flex flex-col justify-between pb-16' style={{height:'550px'}}>
          <h1 className='text-main text-5xl font-bold'>{name}</h1>
          <div className="review my-4 gap-1 flex items-center">
          <div className='flex items-center'>
          {ratingCalculator(rating)}
          </div>
          <p>(20)</p>
          </div>
          <h4 className='text-main text-xl font-bold'>Details:</h4>
          <p className='text-lg text-black'>{details}</p>
          <p className='text-layoutColor text-4xl font-semibold'>$ {price}</p>
          <div className='quantity flex gap-4'>
            <h3 className='text-xl font-bold'>Quantity:</h3>
            {/* <div className='flex items-center justify-center border-2  border-blue-900'> */}
            <div className='flex items-center justify-evenly w-36 h-10' style={{border:'1px solid black'}}>
            <p className='text-2xl font-thin cursor-pointer'><span className='text-layoutColor'><AiOutlineMinus/></span></p>
            <p className='text-2xl p-1 px-3 align-middle' style={{borderLeft:'1px solid black',borderRight:'1px solid black'}}>1</p>
            <p className='text-2xl font-thin cursor-pointer'><span style={{color:'#31a831'}}><AiOutlinePlus/></span></p>
            </div>
            {/* </div> */}
          </div>
          <div className='buttons flex gap-8'>
            <button className='w-52 h-12 scale-100 cursor-pointer hover:scale-110 transition-transform duration-500 ease text-xl font-medium text-layoutColor border-blue-900' style={{border:`1px solid #f02d34`}} type='button'>Add to cart</button>
            <button className='w-52 h-12 scale-100 cursor-pointer hover:scale-110 transition-transform duration-500 ease border-2 text-xl font-medium bg-layoutColor text-white border-none' type='button'>Buy now</button>
          </div>
      </div>
    </div>

    <div className='my-12'>
      <h2 className='text-5xl mb-24 font-bold text-center capitalize text-main'>You may also like</h2>
      <div className='marquee w-full overflow-x-hidden relative' style={{height:'400px'}}>
          <div className={`${styles.track} whitespace-normal flex justify-start gap-4 mt-12`}>
            {products.map((product,index)=>(
              <Product key={index} product={product}/>
            ))}
          </div>
          </div>
    </div>
  </div>
)
}

export default ProductDetails;

export const getStaticPaths = async()=>{
  const query = `*[_type == 'products']{
    slug{
      current
    }
  }`;

  const slugPages = await client.fetch(query);
  // console.log(slugPages)

  const paths = slugPages?.map((page:any)=>({
    params:{
      slug: page.slug.current
    }
  }));
  
  return {
    paths,
    fallback: false
  }
}

type Slug = {
  params: {
    slug: string;
  }
}

export async function getStaticProps({params:{slug}}:Slug) {
  const singleProductQuery = groq`*[_type == "products" && slug.current == "${slug}"][0]`;
  const singleProduct = await client.fetch(singleProductQuery);

  const productQuery = `*[_type == "products" && slug.current != "${slug}"]`;
  const products = await client.fetch(productQuery);
  console.log(singleProduct);
  return {
    props: {
      singleProduct,
      products
    }, // will be passed to the page component as props
  }
}