module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'digglu',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Community based link aggregator site' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vuetify']
  },
  plugins: ['~/plugins/vuetify.js', '~/plugins/main.js'],
  css: [
    { src: '~/assets/style/app.styl', lang: 'styl' }
  ],
  /*
    ** Run ESLINT on save
    */
  extend (config, ctx) {
    if (ctx.dev && ctx.isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      })
    }
  }
}
