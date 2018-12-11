const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: { title: pkg.productName, meta: { } },

  /*
   ** Customize the progress-bar color
   */
  loading: false,

  /*
   ** Global CSS
   */
  css: ['~/assets/css/global.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // Extend only webpack config for client-bundle
      if (ctx.isClient) {
        config.target = 'electron-renderer'
      }
    }
  },
  router: {
    base: `file:///${__dirname}/dist/`
  }
// ,env: {
//     baseUrl: 'http://localhost:3000'
//   }
}
