import React, { useEffect, useState } from "react";
import Branding from "@/components/branding";
import Fixednavbar from "@/components/navbar/fixednavbar";
import Head from "next/head";
import Image from "next/image";
import { goh_media_and_newsApi } from "@/allApi/apis";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/router";

const Newsmedia = () => {
  const route = useRouter();
  const [posts, setPosts] = useState([]);
  const staff = async () => {
    const data = await goh_media_and_newsApi();
    setPosts(data);
  };

  useEffect(() => {
    staff();
  }, []);
  const { asPath } = useRouter();
  return (
    <>
      <Head>
        <link rel="canonical" href={`https://www.gohoardings.com${asPath}`} />
        <title>
          Gohoardings | Hoarding Advertising Agency | News and Media
        </title>
        <meta charSet="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Gohoardings: Your Premier Hoarding Company in India. Stay Informed with News and Media Updates. Elevate Your Outdoor Advertising Strategy Today"
        />
        <meta
          name="google-site-verification"
          content="fLT70DRZGdH5FUdrS8w1k2Zg_VTzNJGDF9ie9v4FAzM"
        />
        <meta
          name="keywords"
          content="gohoardings, gohoarding, outdoor advertising agency in, outdoor advertising agency, outdoor advertising agencies, outdoor ad agency, outdoor advertising companies in delhi, outdoor advertising agencies in delhi, outdoor advertising delhi, outdoor advertising agency in delhi, outdoor media agency, ad agency in delhi, outdoor advertising agencies in gurgaon, outdoor marketing companies, top 5 advertising agencies in delhi, outdoor advertising mumbai, advertising agencies in delhi ncr"
        />

        <meta
          property="og:title"
          content="  News and Media | Gohoardings.com"
        />
        <meta
          property="og:siteName"
          content="www.gohoardings.com/media-and-news"
        />
        <meta
          property="og:description"
          content="Gohoardings: Your Premier Hoarding Company in India. Stay Informed with News and Media Updates. Elevate Your Outdoor Advertising Strategy Today"
        />
        <meta property="og:type" content="en_US" />
        <meta property="og:url" href={`https://www.gohoardings.com${asPath}`} />
        <meta property="og:property" content="en_US" />
        <meta
          property="twitter:title"
          content="  News and Media | Gohoardings.com"
        />
        <meta
          property="twitter:siteName"
          content="www.gohoardings.com/media-and-news"
        />
        <meta
          property="twitter:description"
          content="Gohoardings: Your Premier Hoarding Company in India. Stay Informed with News and Media Updates. Elevate Your Outdoor Advertising Strategy Today"
        />
        <meta property="twitter:type" content="en_US" />
        <meta
          property="twitter:url"
          href={`https://www.gohoardings.com${asPath}`}
        />
        <meta property="twitter:property" content="en_US" />
      </Head>
      <Fixednavbar />
      <div className="d-hide drop-nd"></div>
      <Branding title="News & Media" />
      <section className="mt-5">
        <div className="container-fluid px-5 news pt-3">
          <h6>
            <span onClick={() => route.push("/")} className="bredcamp">
              Home
            </span>
            <MdKeyboardArrowRight />
            <span className="bredcamp text-secondary">Media-And-News</span>
          </h6>
          <h5 className=" p-2 ps-3 news-heading ">Latest News</h5>
          <div className="card mb-3">
            {posts &&
              posts.map((el, i) => (
                <>
                  <div className="row" key={i}>
                    <div className="col-md-4">
                      <Image
                        width={500}
                        height={500}
                        //  src={`https://www.gohoardings.com/gohadmin/uploads/news_events/listing-16.jpg`}
                        src={`https://www.gohoardings.com/gohadmin/uploads/news_events/${el.featured_image}`}
                        className="img-fluid rounded-start"
                        alt="..."
                        id="news_events"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{el.title}</h5>
                        <p className="card-text">
                          <small className="text-muted">
                            {`  Last updated ${el.modified_datetime.split(
                              "T",
                              1
                            )} `}
                          </small>
                        </p>
                        <p
                          className="card-text"
                          dangerouslySetInnerHTML={{
                            __html: el.description.split(".", 3),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
          </div>
        </div>
      </section>
      <style jsx>
        {`
          .news-heading {
            color: $white;
            font-weight: 650;
            background-color: $dark-blue;
          }
          #news-img {
            height: 220px;
          }
        `}
      </style>
    </>
  );
};

export default Newsmedia;
