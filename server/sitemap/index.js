const express = require("express")
const	{ SitemapStream, streamToPromise } = require('sitemap')
const db = require('../../server/conn/conn')
const	date = new Date().toISOString()
const	zlib = require("zlib")
const	router = express.Router();

let sitemap;

router.get('/', async function (req, res) {
	res.header('Content-Type', 'application/xml');
	res.header('Content-Encoding', 'gzip');

	// If we have a cached entry send it
	if (sitemap) return res.send(sitemap)

	try {
        db.changeUser({database: "gohoardi_goh"})

    db.query("SELECT name FROM goh_cities ", async(err,result) => {
        if (err) throw err;
      
     return data(result)
    })
 
async function data(result) {
   const fff = await result

   

todos = fff.map(({ name }) => `/cities/${name}`),
    
        smStream = new SitemapStream({
				hostname: 'http://localhost:8080/' }),
			pipeline = smStream.pipe(zlib.createGzip());

		// Write todo URL to the stream
        todos.forEach(
            item => smStream.write({
                url: item, lastmod: date,
                changefreq: 'daily', priority: 0.7
            }));

		// Manually add all the other important URLs
		smStream.write({
			url: '/about', lastmod: date,
			changefreq: 'monthly', priority: 0.9
		})
		smStream.write({
			url: '/contact', lastmod: date,
			changefreq: 'monthly', priority: 0.9
		})

		// Cache the response
		streamToPromise(pipeline).then(sm => sitemap = sm);
		smStream.end()

		// Stream write the response
		pipeline.pipe(res).on('error', e => { throw e });
}
	} catch (err) {
		
		res.status(500).end()
	}
});

module.exports = router;
