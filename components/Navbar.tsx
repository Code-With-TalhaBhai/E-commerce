import Link from 'next/link'
import React,{useEffect, useState} from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { showCartBag,totalQty,addToCart } from '../store/CartFunctions';
import {RootState,AppDispatch} from '../store/store';
import Cart from './Cart';

type Props = {}

const Navbar = (props: Props) => {
  const [qty, setQty] = useState<string | null>('');
  const cart = useSelector((state:RootState)=>state.cart);
  const dispatch:AppDispatch = useDispatch();
  // console.log(cart.showCart);
  // useEffect(() => {
  //   dispatch(totalQty());
  // }, [addToCart])

  useEffect(() => {
    dispatch(totalQty());
  }, [cart.order])
  
  return (
    <div className='navbar-container flex justify-between relative my-3 mx-5'>
      <p className='logo text-lg text-gray-400'>
        <Link className='uppercase' href="/">Sony Enterprises</Link>
      </p>
      <button onClick={()=>dispatch(showCartBag())} type='button' className='cart-icon text-2xl border-none text-gray-400 pointer relative scale-100 tranistion-transform ease duration-500 bg:transparent hover:scale-110'>
        <AiOutlineShopping/>
        <span className='cart-item-qty text-center text-xs text-white bg-layoutColor' style={{width:'18px',height:'18px',borderRadius:'50%',position:'absolute',top:'-2%',right:'-34%'}}>
          {qty?qty:cart.qty}
          </span>
      </button>

    {cart.showCart && 
      <Cart/>
    }
    </div>
  )
}

export default Navbar