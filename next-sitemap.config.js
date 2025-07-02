/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://imaginify-ai-image-generation.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: './public',
  exclude: ['/sign-in', '/sign-up', '/profile', '/credits'], // exclude private pages

  // ✅ Manually include known routes if auto-discovery fails
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/features'),
    await config.transform(config, '/pricing'),
    await config.transform(config, '/about'),
  ],
};
