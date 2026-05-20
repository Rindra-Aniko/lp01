export default function(eleventyConfig) {
    // konfigurasi Anda
  eleventyConfig.addPassthroughCopy("./src/images/");
    eleventyConfig.addPassthroughCopy("./src/js/");
  eleventyConfig.addPassthroughCopy("./src/includes/css/");
  eleventyConfig.addPassthroughCopy({ "src/_includes/fonts": "fonts" });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  }
};