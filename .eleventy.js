export default function(eleventyConfig) {
    // konfigurasi Anda
  eleventyConfig.addPassthroughCopy("./src/images/");
    eleventyConfig.addPassthroughCopy("./src/js/");
  eleventyConfig.addPassthroughCopy("./src/includes/css/");
  eleventyConfig.addPassthroughCopy({ "src/_includes/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "node_modules/@fortawesome/fontawesome-free/css/all.min.css": "css/fontawesome.css" });
  eleventyConfig.addPassthroughCopy({ "node_modules/@fortawesome/fontawesome-free/webfonts": "webfonts" });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  }
};