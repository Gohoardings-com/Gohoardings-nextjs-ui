import instance from "@/allApi/axios";

function generateSiteMap(data) {
    const	date = new Date().toISOString()
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
     <loc>${process.env.URL}</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
    
     <url>
     <loc>${process.env.URL}/sitemapDigital.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
  
     <url>
     <loc>${process.env.URL}/sitemapAirport.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
 
     <url>
     <loc >${process.env.URL}/sitemapMall.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
     <url>
     <loc>${process.env.URL}/sitemapTraditional.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
     <url>
     <loc>${process.env.URL}/sitemaptransit.xml</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.9</priority>
     </url>
     <url>
     <loc>${process.env.URL}/about-us</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>${process.env.URL}/team</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>${process.env.URL}/media-and-news</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>${process.env.URL}/contact-us</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>${process.env.URL}/testimonial</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>https://www.gohoardings.com/blog/</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     <url>
     <loc>https://www.gohoardings.com/faqs</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
<priority>0.8</priority>
     </url>
     ${data
       .map(({ name}) => {
         return `
       <url>
           <loc>${`${process.env.URL}/traditional-ooh-media/${name}`}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>daily</changefreq>
<priority>0.8</priority>
       </url>
       <url>
           <loc>${`${process.env.URL}/mall-media/${name}`}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>daily</changefreq>
<priority>0.8</priority>
       </url>
       <url>
           <loc>${`${process.env.URL}/airport-media/${name}`}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>daily</changefreq>
<priority>0.8</priority>
       </url>
       <url>
           <loc>${`${process.env.URL}/office-media/${name}`}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>daily</changefreq>
<priority>0.8</priority>
       </url>
       <url>
           <loc>${`${process.env.URL}/digital-media/${name}`}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>daily</changefreq>
<priority>0.8</priority>
       </url>
       <url>
           <loc>${`${process.env.URL}/transit-media/${name}`}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>daily</changefreq>
<priority>0.8</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const {data} = await instance.get("sitemapdata")


  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(data);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;