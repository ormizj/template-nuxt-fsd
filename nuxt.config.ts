// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    dir: {
        app: 'client/app',
        pages: 'client/app/routes',
        layouts: 'client/app/layouts',
    }
})
