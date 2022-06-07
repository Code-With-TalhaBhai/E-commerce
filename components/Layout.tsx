import Head from 'next/head'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import styles from '../styles/Home.module.css'


type Props = {
  children: JSX.Element;
  // children: React.ReactNode;
}

const Layout = ({children}:Props) => {
  return (
    <div className='layout p-3'>
      <Head>
        <title>Ecommerce Store</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout