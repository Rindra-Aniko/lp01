export default function(eleventyConfig) {
    // konfigurasi Anda
  eleventyConfig.addPassthroughCopy("./src/images/");
    eleventyConfig.addPassthroughCopy("./src/js/");
    eleventyConfig.addPassthroughCopy("./src/css/");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  }
};