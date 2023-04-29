<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Bem vindo!</h1>
    <transition name="slide">
      <div class="data-credentials">
        <div class="login-credentials" v-if="mode==='login'">
          <input class="email-credentials" type="email" placeholder="E-mail">
          <input class="password-credentials" type="password" placeholder="Senha">
        </div>
        <div class="signin-credentials" v-else>
          <input class="signin-name" type="text" placeholder="Nome">
          <input class="signin-email" type="email" placeholder="E-mail">
          <input class="signin-password" type="password" placeholder="Senha">
          <input class="signin-confirmpassword" type="password" placeholder="Confirme a Senha">
        </div>
      </div>
    </transition>
      <div class="action-login">
        <div class="login-buttons" v-if="mode==='login'">
          <button class="enter-button" @click="loginButton()">Entrar</button>
          <button class="create-button" @click="createUser()">Criar Conta</button>
        </div>
        <div class="signin-buttons" v-else>
          <button class="back-login" @click="backToLogin()">Voltar</button>
          <button class="save-user">Salvar</button>
        </div>
        <a class="forget-login" href="">Esqueceu a senha?</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginPage',
  data(){
    return {
      mode: 'login',
    }
  },
  methods: {
    createUser(mode='create'){
      this.mode=mode
    },
    backToLogin(mode='login'){
      this.mode=mode
    },
    loginButton(){
      this.$router.push('/home')
    }
  }
}
</script>

<style>
  .login-page {
    background-color: #c2e3ff;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    height: 98vh;
    overflow: auto;
  }

  .login-container {
    padding-top: 50px;
    border-radius: 10px;
    background-color: #2d496d;
    color: #c2e3ff;
    height: 50vh;
    margin-top: 10%;
    padding-bottom: 0;
    margin-bottom: 0;
    width: 40vh
  }

  .login-container h1 {
    margin: 60px;
    margin-bottom: 80px;
  }

  .login-credentials,
  .signin-credentials {
    display: flex;
    flex-direction: column;
    padding-left: 50px;
    padding-right: 50px;
    align-items: center;
    margin-bottom: 50px;
  }

  .email-credentials,
  .signin-name {
    margin: 10px;
  }

  .signin-password,
  .signin-confirmpassword {
    margin-top: 10px;
  }

  .email-credentials, 
  .password-credentials,
  .signin-name,
  .signin-email,
  .signin-password,
  .signin-confirmpassword {
    padding-left: 10px;
    width: 200px;
    height: 30px;
    border-radius: 10px;
    border: none;
    outline: none;
  }

  .action-login {
    /* width: 30%;
    padding: 10px; */
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .action-login button {
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border: none;
    outline: none;
    background-color: #263847;
    color: #c2e3ff;
    cursor: pointer;
  }

  .enter-button,
  .back-login {
    margin-right: 5px;
    transition: 0.2s;
  }

  .enter-button:hover {
    background-color: #2c8647;
    transition: 0.2s;
  }

  .create-button:hover {
    transition: 0.2s;
    background-color: #2c72cc;
  }

  .action-login a {
    text-decoration: none;
    color: #c2e3ff;
    text-transform: lowercase;
    font-size: 0.8rem;
  }

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>