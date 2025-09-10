// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    sourcemap: true,
    srcDir: 'client/app',
    dir: {
        pages: 'routes',
    }
})
