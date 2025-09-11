// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',

    /* directories */
    srcDir: 'client/app',
    alias: {
        '@': '../client'
    },
    dir: {
        pages: 'routes',
    },

    /* dev config */
    devtools: {enabled: true},
    sourcemap: true,
})
