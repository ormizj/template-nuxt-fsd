<script setup lang="ts">
console.log('Running "app.vue"')
</script>

<template>
  <div>
    <NuxtRouteAnnouncer/>
    <dl>
      <h1>App</h1>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </dl>
  </div>
</template>

<style scoped>

</style>