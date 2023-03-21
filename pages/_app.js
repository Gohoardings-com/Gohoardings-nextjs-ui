
import React, { useEffect } from "react";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import store from '@/redux/store';
import { Auth0Provider } from "@auth0/auth0-react";
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
    <Auth0Provider
    domain={process.env.REACT_APP_LINKDIN_DOMIN}
    clientId={process.env.REACT_APP_LINKDIN_CLINET_ID}
  >
    <Provider store={store}>
    <SSRProvider>
    <AccountProvider>
      <Component {...pageProps} />
      </AccountProvider>
    </SSRProvider>
    </Provider> 
    </Auth0Provider>
  );
}  
