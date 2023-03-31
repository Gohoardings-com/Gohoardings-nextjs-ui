import React,{useState,useEffect} from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import Ourservices from "@/components/ourServices";
import City from "@/components/cityList";
import Enquire from "@/components/enquire/enquire";
import Searchmedia from "@/components/searchMedia";
import Trendingcity from "@/components/trendingcity";
import { mediawithcity } from "@/redux/adminAction";
import NavbarH from "@/components/navbar/navbar";
import dynamic from "next/dynamic";

const MyComponent = dynamic(() => import("@/components/navbar/flotingnavbar"), {
  ssr: false,
});

export default function Home() {
  // const dispatch = useDispatch();
  // const [city, setCity] = useState();
  // var items = ["delhi", "mumbai", "bengaluru", "hyderabad", "chennai"];
  // function random_item() {
  //   return setCity(items[Math.floor(Math.random() * items.length)]);
  // }
  // const data = async () => {
  //   const category_name = "traditional-ooh-media";
  //   const city_name = city;
  //   const limit = 9
  //   dispatch(mediawithcity(category_name, city_name, limit));
  // };
  // useEffect(() => {
  //   random_item()
  //   data()
      // },[city])
  return (
    <>
      <Head>
        <title>
          Gohoardings is one of the leading outdoor advertising agency in India.
          We provide the finest advertising solutions for all your business
          needs.
        </title>
        <meta charSet="utf-8" />

        <link
          rel="icon"
          href="https://www.gohoardings.com/assets/images/favicon.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Gohoardings is one of the leading outdoor advertising agency in India. We provide the finest advertising solutions for all your business needs."
        />
        <meta
          name="google-site-verification"
          content="fLT70DRZGdH5FUdrS8w1k2Zg_VTzNJGDF9ie9v4FAzM"
        />
      </Head>
      <main>
        <NavbarH />
        <MyComponent />
        <section>
          <Searchmedia />
        </section>
        <section>
          <Ourservices />
        </section>
        <section>
          <City />
        </section>
        <section>
          <Enquire />
        </section>
        <section>
          <Trendingcity/>
        </section>
      </main>
    </>
  );
}
