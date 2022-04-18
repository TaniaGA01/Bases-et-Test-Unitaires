<template>
  <h2>{{ CustomTitle }}</h2>
  <p>{{ infoMessage }}</p>
  <h3>Raíz cuadrada usando Method</h3>
  <p>{{ counter }}<sup>2</sup> = {{ RaizCuadradaMethod() }}</p>
  <p data-testId="counter">{{ counter }}</p>
  <div class="button-con">
    <button data-testId="counterBtnInc" @click="IncreaseCounter">+1</button>
    <button data-testId="counterBtnDec" @click="DecreaseCounter">-1</button>
  </div>
  <!-- el @ reemplaza el v:on -->
  <!-- <h3>Raíz cuadrada usando Computed</h3>
  <p>{{ counter }}<sup>2</sup> = {{ RaizCuadradaComputed }}</p> no se usa () con computed -->
</template>

<script>
export default {
  props: {
    // propiedades
    title: String,
    start: {
      type: Number,
      default: 100,
    },
    validator(value) {
      // validación del valor de :start en App.vue
      return value >= 0;
    },
  },
  name: "Contador", // nos permite identificar el componente en el navegador Inspecter -> Vue
  data() {
    return {
      counter: this.start,
    };
  },
  //Methods : se utilizan cuando se necesiten cambiar/alterar los datos, entonces la funcion se ejecutará cada vez que se recargue la página
  methods: {
    RaizCuadradaMethod() {
      return this.counter * this.counter;
    },
    IncreaseCounter() {
      this.counter++;
    },
    DecreaseCounter() {
      this.counter--;
    },
  },
  // Computed : son muy similares a los métodos pero son mejores pq los datos se guardan en cache. Se usan para transformar datos de data en la capa de presentación pero NO deben alterar los datos existentes. Entonces no se ejecuta la función cada vez que se recargue la página ya que solo el dato se actualiza https://vueschool.io/lessons/computed-properties-in-vue-3?friend=vuejs
  computed: {
    RaizCuadradaComputed() {
      console.log("RaizCuadradaComputed");
      return this.counter * this.counter;
    },
    CustomTitle() {
      return this.title || "Counter";
    },
    infoMessage() {
      return (
        this.title || "Comienza en 10 gracias al start en las props (propiedad)"
      );
    },
  },
};
</script>

<style>
</style>