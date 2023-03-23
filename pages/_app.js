
import React, { useEffect } from "react";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import store from '@/redux/store';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { SSRProvider } from "react-bootstrap";
import AccountProvider from "@/allApi/apicontext";


export default function App({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
  }, []);
  return (
    <Provider store={store}>
    <SSRProvider>
    <AccountProvider>
      <Component {...pageProps} />
      </AccountProvider>
    </SSRProvider>
    </Provider> 
  );
}  
