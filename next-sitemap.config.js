/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://imaginify-ai-image-generation.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: './public', // This ensures output goes to /public
};
