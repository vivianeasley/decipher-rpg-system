const sitemap = require('./sitemap-gen.js');
const atom = require('atomically'); // https://github.com/fabiospampinato/atomically#readme

const robotsTxt = getRobotsTxt();

// TODO: Add Google webmaster identifier
sitemap.generate("www.example.com", "2020-08-3", "0.5", "yearly");
atom.writeFile( "./dist/robots.txt", robotsTxt );
console.log("Attempted to create sitemap and robots files.")

function getRobotsTxt () {
    return `
        User-agent: *
    `
}