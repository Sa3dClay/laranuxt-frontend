import colors from 'vuetify/es5/util/colors'

export default {
  // Mode
  // mode: 'spa',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - laranuxt',
    title: 'laranuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: "http://localhost/projects/laranuxt/public/api",
    // proxy: true
  },
  // proxy: {
  //   '/laravel': {
  //     target: 'http://localhost/projects/laranuxt/public/api',
  //     pathRewrite: { '^/laravel': '/' }
  //   }
  // },

  // Auth
  auth: {
    strategies: {
      'local': {
        token: {
          property: 'token',
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: 'login', method: 'post' },
          logout: { url: 'logout', method: 'post' },
          user: { url: 'user', method: 'get' }
        }
      },
      // 'laravelJWT': {
      //   provider: 'laravel/jwt',
      //   url: 'http://localhost/projects/laranuxt/public/api/',
      //   endpoints: {
      //     login: { url: 'login', method: 'post' },
      //     logout: { url: 'logout', method: 'post' },
      //     user: { url: 'user', method: 'get' }
      //   },
      //   token: {
      //     property: 'access_token',
      //     maxAge: 60 * 60
      //   },
      //   refreshToken: {
      //     maxAge: 20160 * 60
      //   }
      // }
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          secondary: colors.amber.darken3,
          accent: colors.grey.darken3,
          error: colors.deepOrange.accent4,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          success: colors.green.accent3
        },
        light: {
          primary: colors.blue.darken2,
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
