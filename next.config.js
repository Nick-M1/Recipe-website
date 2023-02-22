/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  experimental: {
    appDir: true
  },

  images: {
    domains: ['upload.wikimedia.org', 'img.icons8.com']
  },




  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
}
