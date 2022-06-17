import Link from 'next/link';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import {TiDeleteOutline} from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux';
import { Stripe } from 'stripe';
import { urlFor } from '../libs/client';
import getStripe from '../libs/getStripe';
import { buyTimeDec, buyTimeInc, priceCalculator, removeItem, showCartBag, totalQty } from '../store/CartFunctions';
import {RootState,AppDispatch} from '../store/store';
import styles from '../styles/Home.module.css';

type Props = {}

const Cart = (props: Props) => {
  const cart = useSelector((state:RootState)=>state.cart);
  const dispatch:AppDispatch = useDispatch();
  console.log(cart.showCart);
  const commonfunctions = ()=>{
    dispatch(priceCalculator());
     dispatch(totalQty())
  }
  const handleCheckout = async()=>{
    // console.log(cart)
    const stripe = await getStripe();

    const response = await fetch('/api/stripe',{
      headers: {'Content-Type':'application/json'},
      method: 'POST',
      body: JSON.stringify(cart),
    });

    if((response as any).statusCode  === 500) return;

    const data:any = await response.json();
    console.log(data);

    toast.loading('Redirecting...');

    const check = stripe?.redirectToCheckout({sessionId: data?.id});
  };

  
  // const redirectCheck = async()=>{
  //   const stripe = await getStripe();
  //   const result = await stripe?.redirectToCheckout({
  //     mode: 'payment',
  //     lineItems: [{price: 'price_1LAuKUGqtzPacEjzyCjGjyMK', quantity: 2}],
  //     successUrl: 'https://buy.stripe.com/test_cN215iaZLcmmaPu8ww',
  //     cancelUrl: 'http://localhost:3000/?cancelled=true'
  //   })
  // }
  
  return (
    <div className='cart-wrapper z-50 w-full fixed right-0 top-0 transition-all duration-1000 ease-in-out' style={{background: 'rgba(0,0,0,0.5)'}}>
      <div className={`${styles.cartContainer} h-screen bg-white float-right py-10 px-3 relative`}>
        <button type="button" className='cart-heading flex items-center text-lg font-medium cursor-pointer gap-2 ml-3 border-none bg-transparent'>
          <AiOutlineLeft onClick={()=>dispatch(showCartBag())}/>
          <span className='heading ml-3'>Your Cart</span>
          <span className='cart-num-items ml-2 text-layoutColor'>({cart.qty} items)</span>
        </button>

        {
        cart.qty === 0 && (
          <div className='empty-cart m-10 mt-32 text-center flex flex-col items-center justify-between'>
            <AiOutlineShopping className='text-center' size={150}/>
            <h3 className='text-xl font-semibold'>Your Shopping bag is empty</h3>
            <Link href="/">
              <button type='button'
              onClick={()=>dispatch(showCartBag())}
              className="btn w-full max-w-sm mt-10 text-xl uppercase border-none rounded-2xl bg-layoutColor text-white cursor-pointer scale-100 transition-transform duration-500 ease-linear hover:scale-110" style={{padding:'10px 12px'}}>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container mt-4 overflow-auto px-1 py-5 sm:px-3" style={{maxHeight:'70vh'}}>
          {cart.qty >=1 && (
            cart.order.map((singleItem,index)=>(
              <div className='product flex gap-4 md:gap-8 p-5' key={index}>
                <img src={urlFor(singleItem?.image).toString()}
                className="cart-product-image rounded-2xl bg-productbgColor md:w-44 md:h-40" style={{width:'35%',height:'35%'}}
                alt="" />
                <div className={`${styles.itemDesc}`}>
                {/* <div className='itemDesc'> */}
                  <div className="flex flex-col md:flex-row justify-between w-80 top">
                    <h5 className='text-lg md:text-2xl text-main font-bold'>{singleItem.title}</h5>
                    <h4 className='text-lg md:text-xl font-bold py-2 sm:p-0 '>${singleItem.ItemPrice}</h4>
                  </div>
                  <div className="flex justify-between w-52 sm:w-80 mt-2 sm:mt-8 md:mt-16 text-main bottom">
                    <div>
                      <div className='flex mt-4 items-center justify-evenly w-28 h-8 md:w-36 md:h-10' style={{border:'1px solid black'}}>
            <button onClick={()=>{dispatch(buyTimeDec({index,price:singleItem.ItemPrice}));commonfunctions()}} className='text-2xl font-thin cursor-pointer'><span className='text-layoutColor'><AiOutlineMinus/></span></button>
            <p className='text-2xl py-0 sm:p-1 px-2 sm:px-3 align-middle' style={{borderLeft:'1px solid black',borderRight:'1px solid black'}}>{singleItem.singleItemQty}</p>
            <button onClick={()=>{dispatch(buyTimeInc({index,price:singleItem.ItemPrice}));commonfunctions()}} className='text-2xl font-thin cursor-pointer'><span style={{color:'#31a831'}}><AiOutlinePlus/></span></button>
                    </div>
                    </div>
                    <button onClick={()=>{dispatch(removeItem(index));commonfunctions()}} type='button' className='remove-item text-2xl cursor-pointer border-none text-layoutColor'><TiDeleteOutline/></button>
                  </div>
                </div>
              </div>
            ))
          )}  
        {cart.qty >= 1 && (
          <div className="cart-bottom bg-transparent w-full absolute bottom-3 right-1 py-8 px-16">
            <div className="total flex justify-between">
          <h3 className='text-2xl font-bold'>Subtotal:</h3>
          <h3 className='text-2xl font-bold'>${cart.price}</h3>
            </div>
            <div className="btn-container w-72 sm:w-96 mx-auto">
              <button type='button' onClick={handleCheckout} className="btn w-full max-w-sm mt-10 text-xl uppercase border-none rounded-2xl bg-layoutColor text-white cursor-pointer scale-100 transition-transform duration-500 ease-linear hover:scale-110" style={{padding:'10px 12px'}}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default Cart