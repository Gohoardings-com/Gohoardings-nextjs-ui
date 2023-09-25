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
  const [isLoading, setIsLoading] = useState(false);
  const { category_name } = router.query;

  const SelectServc = async (obj) => {
    CityNameImage.forEach((el) => {
      el.value2 = el.value === obj.value ? true : false;
    });
    router.push(`/${obj.value}`);
  };

  const getData = async () => {
    setIsLoading(true)
    const noofPage = parseInt(noOfLogo + 3);
    let data = [];
    if (category_name) {
      if (category_name.includes("-")) {
        data = await mediaApi(category_name, noofPage);
        setSearch(data);
        setIsLoading(false)
      } else {
        data = await getCityDataApi(category_name);
        setSearch(data);
        setIsLoading(false)
      }
    }
  };

  const apiforFillters = async () => {
    setIsLoading(true)
    const data = await mediaApi(category_name, noOfLogo);
    setMediadata(data);
    setlocationData(data);
    setcategoryData(data);
    setIsLoading(false)
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
          isLoading={isLoading}
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
        "Outdoor Advertising Agency in India | OOH in India | Gohoardings",
      page_decri:
        "Gohoarding is the leading company of OOH Advertising agency in India. Gohoardings provide Hoardings across  India at best price. | Gohoardings Solution LLP",
      meta_keyword:
        "OOH Advertising in India, Outdoor Advertising in India, Hoardings Company in India, OOH Branding in India, Hoardings Agency in India, Billboard Advertising in India, Hoarding Rates in India, Outdoor Publicity Company in India, Unipole Advertising in India. Bus Shelter, Pole Kiosk Advertising, Gohoardings Solution in India",
    },
    {
      value: "digital-media",
      page_titel:
        "Digital OOH Advertising Agency | Digital OOH in India | Gohoardings",
      page_decri:
        "Gohoarding is the Leading Company of Digital OOH Advertising Agency in India. Gohoardings provides Digital Hoarding across India at best price | Gohoardings Solution",
      meta_keyword:
        "Digital OOH Advertising in India, Outdoor Advertising in India, Digital Billboard Agency in India, Digital OOH Advertising details, Rates, And services in India, Digital OOH, Outdoor Advertising, Traditional OOH, Internet Advertising, OOH news India, OOH Industry",
    },
    {
      value: "mall-media",
      page_titel:
        "Mall Advertising Agency in India, Advertising in Malls | Gohoardings",
      page_decri:
        "Gohoardings is one of the leading Mall Advertising Agency in India, Which helps brands to grow their brands with Advertising in Malls and supermarkets. | Gohoardings",
      meta_keyword:
        "Mall Advertising in India, Mall Ads India, Mall Marketing In India, Advertising in Malls India, Mall Branding India, Mall Promotions India, Mall Events India, Mall Activations India, Digital Mall Advertising in India, Retail Mall Advertising in India, Mall Advertising Solutions in India, Mall Signage India, Mall Advertising Rates India",
    },

    {
      value: "office-media",
      page_titel:
        "Office Branding Company in India, Office Hoardings | Gohoardings",
      page_decri:
        "Office Branding Company in India, It is helpful for business for brand awareness, Office Space Advertising, Office Branding in India | Gohoardings Solution LLP",
      meta_keyword:
        "Office Space Advertising, Tech Park Branding,Software Offices,Office Branding, Co-woking office space branding, Office Branding Agency in Mumbai, India, Branding agencies in India",
    },
    {
      value: "transit-media",
      page_titel:
        "Transit Advertising company in Delhi | Gohoardings Solution LLP",
      page_decri:
        "Go Hoardings offers a wide range of transit media advertising solutions to help you reach your target audience, Train, Mobile Van, State Roadways Buses, Auto Rickshaws, Metro and local train Advertising.",
      meta_keyword:
        "Transit Media Advertising Company Delhi, Transit Media Company Mumbai, Transportation Ads Company India, Transit Media Advertising Agency, Transportation Ads Company, Advertising in Auto Rickshaws, Advertising in State Roadways Buses, Advertising in Metro Feeder Buses, Advertising in Tarmac Coaches, Advertising in Cabs, Advertising in Delhi Metro",
    },
    {
      value: "airport-media",
      page_titel:
        "Airport Advertising Company in India, Airport Branding | Gohoardings",
      page_decri:
        "Airport Advertising Company in India, Showcase your brand in Airports. Get the more attention on you brands with help of Airport & Airlines ads | Gohoardings.com",
      meta_keyword:
        "Airport Advertising, Airlines Advertising, Airport Advertising Rates, Airport Advertising Company in Noida, India, Airport Ad Company in Delhi, Airport Branding Agency in India, Indian Airport Advertising Company in Delhi, Delhi Airport Branding, Airlines Advertising",
    },
    {
      value: "inflight-media",
      page_titel:
        "Inflight Advertising Agency in Noida, India | Gohoardings Solution",
      page_decri:
        "India's Leading Inflight Advertising Agency in Noida, India, We are in contact with many airlines in India providing the solution for Inflight Advertising Options. We surely help you to achieve this by displaying your ad on boarding passes and baggage tags. | Gohoardings Solutions.",
      meta_keyword:
        "Inflight Advertising, Advertising in Hello 6E Magazine, Advertising in Indigo In-flight Magazine, Advertising in Spice Route Magazine, Advertising in Spice Jet In-flight Magazine, Advertising in Go Air In-flight Magazine, Advertising in Jet Wings Magazine, Advertising in Jet Airways Inflight Magazine, Advertising in Air India Inflight Magazine, Advertising in Shubh Yatra Magazine, Advertising in Go Getter Inflight Magazine, Advertising on Airport  Luggage Trolleys, Advertising on Meal Tray in Airlines, Advertising on Seat Back Devices, Advertising in Vistara inflight Magazine",
    },
    {
      value: "delhi",
      page_titel:
        "Top Advertising Agency in Delhi | Outdoor Advertising Agency",
      page_decri:
        "Unlock Success with Gohoardings, Delhi's Premier Outdoor Advertising Agency. Harness the Power of Outdoors for Your Brand. Contact Us Now",
      meta_keyword:
        "gohoardings, gohoarding, top advertising agency in delhi, top advertising agency in noida, outdoor advertising, hoarding site in delhi, hoardings for rent in delhi, transit advertising in delhi, airport branding company in delhi, advertising agency, digital hoardings agency, branding agency, marketing agency, outdoor promotion",
    },
    {
      value: "hyderabad",
      page_titel:
        "Gohoardings: Best Outdoor Advertising Agency in Hyderabad",
      page_decri:
        "Experience Excellence with Gohoardings: Hyderabad's Top Outdoor Advertising Agency. Maximize Your Brand's Impact. Contact Us Today",
      meta_keyword:
        "gohoardings, gohoarding, outdoor advertising agency, outdoor advertising in hyderabad, top advertising companies in hyderabad, outdoor hoarding advertising, ad companies in hyderabad, advertising companies in hyderabad, top advertising agencies in hyderabad, advertising agencies hyderabad",
    },
    {
      value: "pune",
      page_titel:
        "Gohoarding the best outdoor advertising agency in Pune",
      page_decri:
        "Elevate Your Brand with Gohoarding, the Top Outdoor Advertising Agency in Pune. Experience Excellence in Outdoor Promotion. Contact Us Today",
      meta_keyword:
        "gohoardings, gohoarding, best advertising agency in pune, outdoor advertising agency in pune, hoardings company in pune, outdoor branding agency in pune, top advertising company in pune, hoardings for rent in pune, hoardings site in pune, transit advertising in pune, airport advertising in pune, outdoor marketing company in pune, pune advertisingss agenccy, outdoor advertising ",
    },
    {
      value: "mumbai",
      page_titel:
        "Hoardings Advertising Agency in Mumbai | Outdoor Advertising",
      page_decri:
        "Maximize Visibility with Mumbai's Top Outdoor Advertising Agency. Unleash the Power of Hoardings for Effective Brand Promotion. Contact Us Today",
      meta_keyword:
        "gohoardings, gohoarding, advertising, advertising agency, advertising agency in mumbai, advertising company in mumbai, mumbai best advertising agency, hoarding company in mumbai, hoardings site in mumbai, transit advertising in mumbai, branding company in mumbai, top marketing company, advertisment price in airport, airport branding company, airport hoarding site on rent",
    },
    {
      value: "chennai",
      page_titel:
        "Top Outdoor Advertising Agency in Chennai | Gohoardings",
      page_decri:
        "Elevate Your Brand with the Top Outdoor Advertising Agency in Chennai. Discover Effective Outdoor Marketing Solutions. Contact Us Today",
      meta_keyword:
        "gohoardings, gohoarding, top advertising agency in chennai, chennai advertising agency, best advertising company in chennai, hoardings company in chennai, advertising agency, hoarding site in chennai, marketing company in chennai, transit advertising company, mall media company in chennai, chennai airport advertising, vehicle advertisment",
    },
    {
      value: "bengaluru",
      page_titel:
        "Outdoor Advertising Agency in Bangalore | Gohoardings",
      page_decri:
        "Discover the Best Outdoor Advertising Agency in Bangalore - Gohoardings. Elevate your brand with our innovative outdoor ad solutions in the vibrant city.",
      meta_keyword:
        "gohoardings, gohoarding, outdoor advertising agency bangalore, outdoor advertising agency in bangalore, best advertising agency, outdoor media agency in bangalore, billboard advertising agency, hoarding advertising  agency, banaglore outdoor marketig company, digital outdoor advertising in bangalore, hoarding advertising company in bangalore, branding company, marketing company, transit media agency, airport advertising agency in bangalore",
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
