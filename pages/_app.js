
import React, { useEffect } from "react";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import store from '@/redux/store';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'animate.css';
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { SSRProvider } from "react-bootstrap";
import AccountProvider from "@/allApi/apicontext";
import Footer from "@/components/footer";
import Feedback from "@/components/feedback";


export default function App({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
  }, []);
  return (
    <Provider store={store}>
    <SSRProvider>
    <AccountProvider>
      <Component {...pageProps} />
    {/* <Feedback/> */}
      <Footer/>
      </AccountProvider>
    </SSRProvider>
    </Provider> 
  );
}  
