// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    /* dev config */
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    sourcemap: true,

    /* directories */
    srcDir: 'client/app',
    alias: {
        '@': '../client'
    },
    dir: {
        pages: 'routes',
    }
})
