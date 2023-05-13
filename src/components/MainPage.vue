<template>
  <transition name="slide">
  <div class="main-page">
    <header>
      <div class="header">
        <button class="menu-button" @click='navigateTo("/")'>
          Menu Principal
          <i class="fas fa-bars"></i>
        </button>
        <h1>Shop-list.co</h1>
        <button class="notify-button"> 
          Notificações
          <i class="fas fa-bell"></i>
        </button>
      </div>
    </header>
    <div class="body-content">
      <side-menu></side-menu>
      <div class="content-area">
        <body>
          <div class="content">
              <router-view/>
          </div>
        </body>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import sideMenu from '@/components/sideMenu.vue'

export default {
  name: 'MainPage',
  components: { sideMenu },
  methods: {
    // goToLink(link){
    //   const currentPath = this.$route.path;

    //   if (currentPath !== link) {
    //     this.$router.push({
    //       path: link
    //     })
    //   }
    // },

  }
}
</script>

<style>

  /* html, body { 
    display: flex;
  } */

  .main-page {
    display: flex;
    width: 100%;
    flex-direction: column;
  } 

  .content-area {
    width: 100%;
    height: 100%;
  }

  .content {
    /* display: flex; */
    padding: 10px;
  }

  header {
    background-color: #31446e;
    color: #fff;
    padding: 20px;
    /* width: 100%; */
  } 

  .header {
    display: flex;
    justify-content: space-between;
  }

  
  .header button {
    background-color: #31446e;
    color: #fff;
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    transition: .2s;
    cursor: pointer;
  }


  .header button:hover {
    background-color: #cedeff;
    color: #31446e;
    border-radius: 10px;
  }

  .menu-button {
    margin-left: 20px;
    font-size: 1.2rem;
    width: 180px;
  }

  .notify-button {
    margin-right: 20px;
    font-size: 1.2rem;
  }

  .body-content {
    display: flex;
    flex-direction: row;
  }


  

  body{
    background-color: rgb(108, 130, 171); 
  }

  @keyframes slide-in {
    from { transform: translateY(10px) translateX(0px); opacity: 0}
    to { transform: translateY(0px) translateX(0px); opacity: 1}
}

@keyframes slide-out {
    from { transform: translateY(0px); opacity: 1;}
    to { transform: translateY(0px) translateX(0px); opacity: 0;}
}

.slide-enter-active {
    animation: slide-in .2s ease;
}

.slide-leave-active {
    animation: slide-out .2s ease;
}

  /* footer {
    background-color: rgb(55, 91, 139);
    height: 2vh;
  } */
</style>