const atom = require('atomically'); // https://github.com/fabiospampinato/atomically#readme
const glob = require("fast-glob") // https://www.npmjs.com/package/fast-glob

module.exports = (function () {
    const SM = {};

    // TODO: Dynamically get last modified and set priority;
    SM.generate = async function (siteAddress, lastModified, priority, changefreq) {
        const fileList = await glob("./dist/**/*.html") // glob(patterns, [options])
        const prependString = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
        const appendString = "</urlset>";
        let siteMapString = `${prependString}`;

        for (let i = 0; i < fileList.length; i++) {
            const trimmedFilePath = fileList[i].replace("./dist/", "")

            const url = `<url><loc>https://${siteAddress}/${trimmedFilePath}</loc><lastmod>${lastModified}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
            siteMapString += url;
            if (i === fileList.length-1) siteMapString += appendString;

        }

        await atom.writeFile( "./dist/sitemap.xml", siteMapString );
    }

    return SM;
})();