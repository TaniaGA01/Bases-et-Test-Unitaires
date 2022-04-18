<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Counter />
  <Counter :start="3" title="Comienza en 3 gracias a :start en el App.vue"></Counter>
</template>

<script>
import Counter from './components/Counter.vue'

export default {
  name: 'App',
  components: {
    Counter 
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
