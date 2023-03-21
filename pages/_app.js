
import React, { useEffect } from "react";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import store from '@/redux/store';
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { SSRProvider } from "react-bootstrap";


export default function App({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
  }, []);
  return (
    <UserProvider
    domain={process.env.REACT_APP_LINKDIN_DOMIN}
    clientId={process.env.REACT_APP_LINKDIN_CLINET_ID}
  >
    <Provider store={store}>
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
    </Provider> 
    </UserProvider>
  );
}  
