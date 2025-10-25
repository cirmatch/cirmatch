import axios from "axios";

const BASE_URL = "https://api.cirmatch.com/api/v1"; // Backend API URL
const FRONTEND_URL = "https://cirmatch.com";        // Frontend URL

export default {
  siteUrl: FRONTEND_URL,
  generateRobotsTxt: true,       // automatically generate robots.txt
  changefreq: "weekly",          // default change frequency
  priority: 0.7,                 // default priority
  sitemapSize: 5000,             // max URLs per sitemap

  // Exclude admin & auth pages
  exclude: [
    "/adminDashboard/*",
  ],

  transform: async (config, path) => ({
    loc: path,                   // page path
    changefreq: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1.0 : 0.7,
    lastmod: new Date().toISOString(), // last modified for static pages
  }),

  additionalPaths: async (config) => {
    try {
      // Fetch all products from backend
      const res = await axios.get(`${BASE_URL}/getAlllistings`);
      const products = res.data.data;

      // Map products to sitemap format
      return products.map(product => ({
        loc: `/product/${product._id}`, // frontend route for product
        changefreq: "weekly",
        priority: 0.8,
        lastmod: product.updatedAt || new Date().toISOString(),
      }));
    } catch (err) {
      console.error("Error fetching products for sitemap:", err.message);
      return [];
    }
  },
};
