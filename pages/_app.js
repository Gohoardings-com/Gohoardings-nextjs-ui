
import React, { useEffect } from "react";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import store from '@/redux/store';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'animate.css';
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { SSRProvider } from "react-bootstrap";
import AccountProvider from "@/allApi/apicontext";
import Footer from "@/components/footer";
import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";

// const MyComponent = dynamic(() => import("@/components//feedback"), {
//   ssr: false,
// });

export default function App({ Component, pageProps,session }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
  }, []);
  
  return (
    <Provider store={store}>

    <SSRProvider>
      <SessionProvider session={session}>
    <AccountProvider>
      <Component {...pageProps} />
    {/* <MyComponent/> */}
      <Footer/>
      </AccountProvider>
      </SessionProvider>
    </SSRProvider>
=
    </Provider> 
  );
}  
