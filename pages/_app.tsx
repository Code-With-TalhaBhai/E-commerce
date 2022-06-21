import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components'
import { Provider } from 'react-redux';
import {store} from '../store/store'
import { Toaster } from 'react-hot-toast';
import React from 'react';


function MyApp({ Component, pageProps }: AppProps) {
  return(
    <Provider store={store}>
      <Toaster/>
   <Layout>
   <Component {...pageProps} />
   </Layout>
   </Provider>
)}

export default MyApp
