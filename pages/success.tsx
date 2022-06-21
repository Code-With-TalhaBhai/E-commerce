import Link from 'next/link';
import React, { useEffect } from 'react';
import {BsFillBagCheckFill} from 'react-icons/bs';
import runFireWorks from '../libs/utils';

const success = () => {

    useEffect(() => {
      runFireWorks();
      // console.log('running')
    }, [])
    

  return (
    <div className='success-wrapper flex justify-center bg-white' style={{minHeight:'60vh'}}>
        <div className="success sm:w-3/4 w-full mt-40 bg-bannerContainer p-14 rounded-2xl flex flex-col items-center">
            <p className="icon text-green-700" style={{fontSize:'40px'}}>
            <BsFillBagCheckFill/>
            </p>
            <h2 className='md:text-5xl sm:text-3xl text-base font-black pt-5 text-main capitalize'>Thank You for your purchase!</h2>
            <p className='email-msg sm:font-semibold font-normal text-center'>Check your email box for the receipt.</p>
            <p className="description py-5 font-semibold text-center">
            If you have any questions, please email &nbsp; 
            <a className='email text-primary' href='mailto:orders@example.com'>
                 orders@example.com
            </a>
            </p>
            <Link href="/">
            <button type='button' className="btn max-w-sm mt-10 text-xl uppercase border-none rounded-2xl bg-layoutColor text-white cursor-pointer scale-100 transition-transform duration-500 ease-linear hover:scale-110" style={{padding:'10px 12px',width:'300px'}}>
                Continue Shopping
              </button>
              </Link>
        </div>
    </div>
  )
}

export default success