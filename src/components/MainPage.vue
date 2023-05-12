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
      <aside>
        <div class="side-menu">
          <div class="user-picture">
            <div class="circle-picture">
              <i id="user-picture" class="fas fa-user"></i>
            </div>
          </div>
          <div class="user-area">
            <div class="user-name">
              Usuario Padrão
            </div>
          </div>
          <hr>
          <ul class="menu-content">
            <li @click='navigateTo("/users")'>
              <span>Usuarios   </span>
              <i class="fas fa-user"></i>
            </li>
            <li @click='navigateTo("/itens")'>
              <span>Produtos   </span>
              <i class="fas fa-box-archive"></i>
            </li>
            <li @click='navigateTo("/shop")'>
              <span>Vendas   </span>
              <i class="fas fa-cash-register"></i>
            </li>
            <li @click='navigateTo("/finances")'>
              <span>Financeiro   </span>
              <i class="fas fa-coins"></i>
            </li>
            <li @click='navigateTo("/reports")'>
              <span>Relatórios   </span>
              <i class="fas fa-book"></i>
            </li>
            <li>
              <span></span>
              <i class=""></i>
            </li>
          </ul>
        </div>
      </aside>
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
import { goToLink } from '@/utils/utils.js'

export default {
  name: 'MainPage',
  methods: {
    // goToLink(link){
    //   const currentPath = this.$route.path;

    //   if (currentPath !== link) {
    //     this.$router.push({
    //       path: link
    //     })
    //   }
    // },
    navigateTo(link){
      goToLink(link, this)
    }
    ,
    goBack(){
      const history = this.$router.history; 

      if (history.current.index > 0) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    }
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

  aside {
    background-color: #31446e;
    width: 15em;
    height: 55.4em;
  }

  .side-menu {
    padding-top: 30px;
  }

  .user-picture {
    display: flex;
    justify-content: center;
  }

  .circle-picture {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #cedeff;
    height: 12vh;
    width: 12vh;
    border-radius: 50%;
    color:#cedeff ;
    cursor: pointer;
    transition: .2s;
  }

  .circle-picture:hover {
    transform: scale(1.1);
    transition: .2s;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  }

  #user-picture {
    font-size: 4em;
    padding: 2px;
  }

  .user-area {
    padding-top: 10px;
    color: #cedeff;
  }

  hr {
    margin: 10px;
    margin-top: 30px;
    background-color: #cedeff;
  }

  .menu-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #cedeff;
    padding: 30px;
    list-style: none;
  }

  .menu-content li {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    margin-top: 2px;
    border-radius: 10px;
    transition: .2s;
  }

  .menu-content li:hover {
    background-color: #cedeff;
    color: #31446e;
    border-radius: 10px;
    transition: .2s;
    cursor: pointer;
    transform: scale(1.1) translateY(-5px);
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
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