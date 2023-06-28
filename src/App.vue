<template>
  <div id="app">
      <loading-page v-if="isLoading" />
      <home-view />
  </div>
</template>

<script>
  import HomeView from '@/views/HomeView.vue'
  // import transitionComp from '@/components/transitionComp.vue'
  import loadingPage from '@/components/loadingPage.vue'
  import { mapState } from 'vuex'

  export default {
    components: {
      HomeView, loadingPage
    },
    methods: {

    },
    computed: mapState(['isLoading', false])
  }
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* display: flex; */
  /* display: flex */
}

html {
  height: 100%
}

* {
  padding: 0;
  margin: 0
}

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
