import Link from 'next/link'
import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='navbar-container flex justify-between relative my-3 mx-5'>
      <p className='logo text-lg text-gray-400'>
        <Link href="/">Sony Enterprises</Link>
      </p>
      <button type='button' className='cart-icon text-2xl border-none text-gray-400 pointer relative scale-100 tranistion-transform ease duration-500 bg:transparent hover:scale-110'>
        <AiOutlineShopping/>
        <span className='cart-item-qty text-center text-xs text-bannerContainer bg-layoutColor' style={{width:'18px',height:'18px',borderRadius:'50%',position:'absolute',top:'-2%',right:'-34%'}}>2</span>
      </button>
    </div>
  )
}

export default Navbar