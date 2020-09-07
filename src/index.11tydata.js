var json = require("./_data/siteData.json");
// data.* will be available throughout the code
// You can access it with ${data.*} in the HTML

module.exports = function() {
  return {
		"eleventyExcludeFromCollections": true,
		"layout": "layouts/base",
		"data": json
	};
};