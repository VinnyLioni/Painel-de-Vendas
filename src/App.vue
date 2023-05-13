<template>
  <div id="app">
      <home-view />
  </div>
</template>

<script>
  import HomeView from '@/views/HomeView.vue'
  // import transitionComp from '@/components/transitionComp.vue'

  export default {
    components: {
      HomeView,
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
