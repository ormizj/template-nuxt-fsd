<script setup lang="ts">
console.log('Running "app.vue"')
</script>

<template>
  <div id="app">
    <dl>
      <NuxtRouteAnnouncer/>
      <h1>App</h1>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </dl>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  justify-content: center;
}
</style>

<style>
body {
  background-color: rgb(25, 25, 25);
  color: rgb(225, 225, 225);
}
</style>