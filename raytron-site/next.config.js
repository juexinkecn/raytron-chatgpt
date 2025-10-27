/** next.config.js */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['en.raytron.group', 'cn.raytron.group', 'www.raytron.group'],
  },
  env: {
    SITE_DOMAIN: process.env.SITE_DOMAIN || 'https://en.raytron.group',
    ALT_DOMAIN: process.env.ALT_DOMAIN || 'https://cn.raytron.group',
    LANG: process.env.LANG || 'en'
  }
};
