import Fixednavbar from "@/components/navbar/fixednavbar";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { CityNameImage, mediaApi, getCityDataApi } from "@/allApi/apis";

import MainUi from "@/components/mediaComponents/MainUi";
import dynamic from "next/dynamic";
const Media = (props) => {
  const ErrorPage = dynamic(() => import("../404"));
  const Metatag = props.MetaKeys;
  const Media_content = props.Media_content;
  const Canonicaltag = props.currentPageUrl;
  const [noOfLogo, setnoOfLogo] = useState(16);
  const router = useRouter();
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const [locationData, setlocationData] = useState([]);
  const [mediaData, setMediadata] = useState([]);
  const [categoryData, setcategoryData] = useState([]);
  const [search, setSearch] = useState([]);
  const { category_name } = router.query;

  const SelectServc = async (obj) => {
    CityNameImage.forEach((el) => {
      el.value2 = el.value === obj.value ? true : false;
    });
    router.push(`/${obj.value}`);
  };

  const getData = async () => {
    const noofPage = parseInt(noOfLogo + 3);
    let data = [];
    if (category_name) {
      if (category_name.includes("-")) {
        data = await mediaApi(category_name, noofPage);
        setSearch(data);
      } else {
        data = await getCityDataApi(category_name);
        setSearch(data);
      }
    }
  };

  const apiforFillters = async () => {
    const data = await mediaApi(category_name, noOfLogo);
    setMediadata(data);
    setlocationData(data);
    setcategoryData(data);
  };

  useEffect(() => {
    getData();
    apiforFillters();
  }, [category_name, noOfLogo]);

  const onSearch = async (searchCity) => {
    setValue(searchCity);
    setFocus(false);
    router.push(`/${category_name}/${searchCity}`);
  };
  let city = "";

  const validCategories = [
    "traditional-ooh-media",
    "digital-media",
    "mall-media",
    "office-media",
    "transit-media",
    "airport-media",
    "inflight-media",
    "delhi",
    "pune",
    "chennai",
    "bengaluru",
    "mumbai",
    "hyderabad",
  ];

  if (validCategories.includes(category_name)) {
    return (
      <>
        <Head>
          {Metatag.map((el) => {
            if (category_name === el.value) {
              return (
                <>
                  <link
                    rel="canonical"
                    href={`https://www.gohoardings.com${Canonicaltag}`}
                  />
                  <title>{el.page_titel}</title>
                  <meta charSet="utf-8" />
                  <link
                    rel="icon"
                    href="https://www.gohoardings.com/assets/images/favicon.png"
                  />
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                  />
                  <meta name="theme-color" content="#000000" />
                  <meta name="description" content={el.page_decri} />
                  <meta
                    name="google-site-verification"
                    content="fLT70DRZGdH5FUdrS8w1k2Zg_VTzNJGDF9ie9v4FAzM"
                  />
                  <meta name="keywords" content={el.meta_keyword} />
                  <meta property="og:title" content={el.page_titel} />
                  <meta property="og:siteName" content={el.meta_keyword} />
                  <meta property="og:description" content={el.page_decri} />
                  <meta property="og:type" content="en_US" />
                  <meta property="og:image" href={el.thumb} />
                  <meta
                    property="og:url"
                    href={`https://www.gohoardings.com${Canonicaltag}`}
                  />
                  <meta property="og:property" content="en_US" />
                  <meta property="twitter:title" content={el.page_titel} />
                  <meta property="twitter:siteName" content={el.meta_keyword} />
                  <meta
                    property="twitter:description"
                    content={el.page_decri}
                  />
                  <meta property="twitter:type" content="en_US" />
                  <meta property="twitter:image" href={el.thumb} />
                  <meta
                    property="twitter:url"
                    href={`https://www.gohoardings.com${Canonicaltag}`}
                  />
                  <meta property="twitter:property" content="en_US" />
                </>
              );
            }
          })}
        </Head>
        <Fixednavbar />
        <MainUi
          noOfLogo={noOfLogo}
          setnoOfLogo={setnoOfLogo}
          categoryData={categoryData}
          mediaData={mediaData}
          locationData={locationData}
          setSearch={setSearch}
          category_name={category_name}
          search={search}
          onSearch={onSearch}
          SelectServc={SelectServc}
          value={value}
          focus={focus}
          serviceIcon={CityNameImage}
          city={city}
          setValue={setValue}
          setFocus={setFocus}
          Media_content={Media_content}
        />
      </>
    );
  } else {
    return (
      <>
        <ErrorPage />
      </>
    );
  }
};

Media.getInitialProps = async ({ req, res }) => {
  let currentPageUrl = "";

  if (req) {
    currentPageUrl = req.url;
  } else if (res) {
    currentPageUrl = res.socket.parser.incoming.originalUrl;
  }
  const MetaKeys = [
    {
      value: "traditional-ooh-media",
      page_titel:
        "Gohoardings: Largets Traditional OOH Advertising Agency in India",
      page_decri:
        "Gohoardings - Your Top Choice for Traditional OOH Advertising. We're the Best Outdoor Media Company in India, Offering Unrivaled Solutions to Boost Your Brand's Reach.",
      meta_keyword:
        "traditional ooh advertising, outdoor advertising agency, billboard advertising services, ooh marketing agency, billboard ad company, traditional ooh media planning, traditional outdoor media, outdoor branding, outdoor ad campaign, outdoor advertising specialist, ooh advertising agency",
    },
    {
      value: "digital-media",
      page_titel:
        "Digital Hoarding Advertising Solutions by Gohoardings",
      page_decri:
        "Digital Hoarding Advertising Solutions by the best outdoor advertising agency Gohoardings - Your Partner for Effective Digital Media Advertising Services.",
      meta_keyword:
        "gohoardings, go hoardings, digital media advertising, digital hoarding advertising, digital billboard ads, outdoor digital advertising, digital display advertising, digital hoarding rental, digital media hoardings, digital advertising display board, LED hoarding advertising, digital hoarding marketing, digital hoarding branding, digital media marketing",
    },
    {
      value: "mall-media",
      page_titel:
        "Shopping Mall Advertising with Gohoardings - Best advertising agnecy",
      page_decri:
        "Unlock the Power of Mall Advertising with Gohoardings - Your Trusted Partner for Effective Outdoor Advertising and Branding. Elevate Your Brand Visibility Today!",
      meta_keyword:
        "gohoardings, gohoarding, shopping mall advertising, mall media advertising, mall advertising, shopping mall ad services, mall media solution, mall advertising company, advertising in shopping mall, branding in shopping mall, mall display ad promotion, mall advertising rates, mall event advertising, malll marketing services, mall promotion agency",
    },

    {
      value: "office-media",
      page_titel:
        "Office Branding Services | GoHoardings: Transform Your Workspace",
      page_decri:
        "Elevate your office space with impactful Office Branding and In-Office Advertising solutions from GoHoardings. Enhance your workspace today!",
      meta_keyword:
        "in office media, office branding, office advertising, advertising inside office, in office advertising, inhouse branding, workspace advertisment, office branding agency, office branding company, office media advertisment, office marketing agency, office branding ideas",
    },
    {
      value: "transit-media",
      page_titel:
        "Best Transit Media Advertising Agency | Gohoardings",
      page_decri:
        "Discover the Power of Transit Advertising with Gohoardings - Best Transit Advertising Company! Transform your marketing strategy with our bus advertising solutions.",
      meta_keyword:
        "gohoardings, gohoardings.com, transit advertising, bus advertising, public transport advertising,outdoor advertising, transit media services, transit media advertising, transit media marketing, railway station advertising, transit ad agency, transit media company, airport advertising, transit poster advertising, transit display ads",
    },
    {
      value: "airport-media",
      page_titel:
        "Gohoardings: Elevate Your Brand with Airport Advertising Solutions",
      page_decri:
        "Explore Top-Notch Airport Media Advertising Services with Gohoardings. Reach New Heights by Advertising in Airports Nationwide. Elevate Your Brand Today!",
      meta_keyword:
        "gohoardings, gohoardings.com, airport media, airport media advertising, advertising in airports, airport branding in india, airport display ads, airport advertising solutions, airport branding agency, airport display advertising, airport media marketing, airport digital ads",
    },
    {
      value: "inflight-media",
      page_titel:
        "Inflight Media: Airline Advertising in India | GoHoardings",
      page_decri:
        "Gohoardings: India's Best Airline Advertising Agency – Explore Effective Outdoor Advertising Solutions Nationwide. Get Airline Magazine Advertising in India",
      meta_keyword:
        "airline advertising, airline marketing, inflight advertising, travel magzine advertising, passanger magzine ads, air travell promotional, airplane advertising, branding in airplane, advertising in airplane, airline sponsoeship opportunity, inflight branding agency, inflight ad company",
    },
  ];
  const { Media_content } = await import("@/allApi/mediajson");
  return {
    MetaKeys,
    currentPageUrl,
    Media_content,
  };
};

export default Media;
