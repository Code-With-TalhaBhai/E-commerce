import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';


type Props = {}

function Footer({}: Props) {
  return (
    <div className='footer-container text-main mt-10 py-8 px-5 font-bold justify-center flex flex-col items-center gap-4'>
      <p>2022 &#169; by TechVision. All Rights Reserved.</p>
      <p className="icons flex text-3xl gap-3">
      <AiFillInstagram/>
      <AiOutlineTwitter/>
      </p>
    </div>
  )
}

export default Footer