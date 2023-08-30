<template>
  <div id="app">
    <StyleTextPage></StyleTextPage>
  </div>
</template>

<script>
import StyleTextPage from './components/formEditor.vue'

export default {
  name: 'App',
  components: {
    StyleTextPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
