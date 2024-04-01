import { writeFileSync } from 'fs';
import fetch from 'node-fetch';

export async function getStaticProps() {
    try {
        const response = await fetch('https://gohoardings.com/api/blogs');
        const blogs = await response.json();

        let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        const changefreq="daily";
        const priority="0.8";

        blogs.data.forEach(blog => {
            xmlContent += `<url>\n`;
            xmlContent += `<loc>${blog.url}</loc>\n`;
            xmlContent += `<lastmod>${blog.UpdatedOn}</lastmod>\n`;
            xmlContent += `<changefreq>${changefreq}</changefreq>\n`;
            xmlContent += `<priority>${priority}</priority>\n`;
            xmlContent += `</url>\n`;
        });

        xmlContent += '</urlset>';

        // Write the XML content to a file
        writeFileSync('public/blog-sitemap.xml', xmlContent);

        return { props: {} };
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return { props: { error: true } };
    }
}

// This is a dummy component, Next.js will serve this as /sitemap.xml
export default function Sitemap() {
    return null;
}
