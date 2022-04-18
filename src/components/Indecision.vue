<template>
  <img v-if="img" :src="img" />
  <!-- los dos puntos reemplazan v-bind -->
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <input type="text" placeholder="Hazme une pregunta" v-model="newQuestion" />
    <p>Recuerda terminar con un punto de interrogación (?)</p>
    <div v-if="isValideQuestion">
      <h2>{{ newQuestion }}</h2>
      <h1>{{ answer }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newQuestion: null,
      answer: null, // este answer como tal viene del API https://yesno.wtf/api
      img: null,
      isValideQuestion: false,
    };
  },
  methods: {
    async getAnswer() {

      try {

        this.answer = "Attendez...";
        const { answer, image } = await fetch('https://yesno.wtf/api').then( r => r.json() )

        this.answer = answer === 'yes' ? 'Oui !' : 'Non !'// la primera answer es el return de data la segunda es la const
        this.img = image // la primera img es el return de data la segunda image es la const
        
      } catch (error) {

        console.log('Indecision Component:', error)
        this.answer = 'Impossible de charger de l\'API'
        this.img = null

      }
    },
  },
  watch: {
    newQuestion(value) {
      this.isValideQuestion = false;
      console.log({ value });
      if (!value.includes("?")) return;
      console.log({ value });
      this.getAnswer();

      this.isValideQuestion = true;
    },
  },
};
</script>

<style scoped>
/* Scoped : css dedicado únicamente a este componente */

img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}
input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 0px;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>