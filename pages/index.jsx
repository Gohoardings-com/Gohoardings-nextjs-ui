import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const NavbarH = dynamic(() => import("@/components/navbar/navbar"));
const Floatingnavbar = dynamic(() => import("@/components/navbar/flotingnavbar"),{ssr:false});
const Searchmedia = dynamic(() => import("@/components/searchMedia"));
const Ourservices = dynamic(() => import("@/components/ourServices"));
const City = dynamic(() => import("@/components/cityList"));
const Enquire = dynamic(() => import("@/components/enquire/enquire"));
const Trendingcity = dynamic(() => import("@/components/trendingcity"),{ssr:false});

export default function Home() {
  const { asPath } = useRouter();
  return (
    <>
      <Head>
        <link rel="canonical" href={`https://www.gohoardings.com${asPath}`} />
        <title>
         Gohoardings: Indias Largest and Best Outdoor Advertising Agency
        </title>
        <meta charSet="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Discover the power of outdoor advertising with GoHoarding, India's leading OOH advertising agency. Your trusted outdoor media company for impactful campaigns."
        />
        <meta
          name="google-site-verification"
          content="fLT70DRZGdH5FUdrS8w1k2Zg_VTzNJGDF9ie9v4FAzM"
        />
        <meta
          name="keywords"
          content="gohoardings, go hoardings, outdoor advertising, outdoor advertising agency, outdoor advertising company, best advertising company, outdoor media, outdoor media company, ooh advertising, ooh ad agency, best ad agency in india, largest advertising agency in india, bus advertising, airport advertising, metro advertising, transit advertising"
        />
        -------------
        <meta
          property="og:title"
          content="India’s Largest Outdoor Advertising Agency | Gohoarding Solution"
        />
        <meta property="og:siteName" content="www.gohoardings.com" />
        <meta property="og:description" content="India's Largest Outdoor Advertising Agency. We are helping business to grow offline with hoardings, billboards ads, bus shelters, metro pillars, airport, and office brandings | Gohoardings"/>
        <meta property="og:type" content="en_US" />
        <meta property="og:image" href="https://www.gohoardings.com/assets/images/favicon.png" />
        <meta
          property="og:url"
          href={`https://www.gohoardings.com${asPath}`}
        />
        <meta property="og:property" content="en_US" />
        <meta property="twitter:title" content="India’s Largest Outdoor Advertising Agency | Gohoarding Solution" />
        <meta
          property="twitter:siteName"
          content="www.gohoardings.com"/>
        <meta property="twitter:description" content="India's Largest Outdoor Advertising Agency. We are helping business to grow offline with hoardings, billboards ads, bus shelters, metro pillars, airport, and office brandings | Gohoardings" />
        <meta property="twitter:type" content="en_US" />
        <meta property="twitter:image" href="https://www.gohoardings.com/assets/images/favicon.png"  />
        <meta
          property="twitter:url"
          href={`https://www.gohoardings.com${asPath}`}
        />
        <meta property="twitter:property" content="en_US" />
      </Head>
      <main className="animate__animated  animate__fadeIn">
        <NavbarH />
        <Floatingnavbar />
        <Searchmedia />
        <Ourservices />
        <City />
        <Enquire />
        <Trendingcity />
      </main>
    </>
  );
}
