<template>
  <div class="user-register">
    <content-page :title="title" :icon="iconName">
      <div class="button-content" slot="buttons">
        <div class="button-area">
          <button class="add-user" @click="addUser()">Cadastrar</button>
          <button class="edit-user">Editar</button>
          <button class="erase-user">Excluir</button>
        </div>
      </div>
      <div class="user-content" slot="content" v-if="mode === 'save'" :class="{ 'slide-down': showContent}">
        <div class="user-box">
          <div class="input-area">
            <div class="first-line">
              <div class="user-name">
                <span>Nome do Usuário</span>
                <input type="text" v-model="user.name">
              </div>
              <div class="user-email">
                <span>E-mail do Usuário</span>
                <input type="text" v-model="user.email">
              </div> 
              <div class="user-cpfcnpj">
                <span>CNPJ/CPF</span>
                <input type="text" v-model="user.cnpjcpf" @input="formatCnpjcpf">
              </div>
            </div>
            <div class="second-line">
            </div>
            <div class="third-line">
              <div class="user-password">
                <span>Senha do Usuário</span>
                <input type="text" v-model="user.password">
              </div>
              <div class="user-confirmPassword">
                <span>Confirme a Senha</span>
                <input type="text" v-model="user.confirmPassword">
              </div>
              <div class="user-situation">
                <span>Situação</span>
                <select class="custom-select" v-model="user.situation">
                  <option value="A">Ativo</option>
                  <option value="I">Inativo</option>
                </select>
              </div>
            </div>
            <div class="fourth-line">
              <div class="finish-session">
                <button class="save-button" @click="saveUser">Salvar</button>
                <button class="erase-button">Excluir</button>
                <button class="cancel-button" @click="cancelAddUser">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="user-table" slot="table">
        <table-page :headers="tableHeaders" :rows="tableRows" :columns="tableColumns" @selectUser="selectUser()"></table-page>
      </div>
    </content-page>
  </div>
</template>

<script>
import { goToLink } from '@/utils/utils'
import contentPage from '@/components/contentPage.vue'
import tablePage from '@/components/tablePage.vue'

export default {
    name: 'userRegister',
    components: { contentPage, tablePage },
    data(){
      return {
        title: 'Cadastro de Usuários',
        iconName: 'fas fa-user-gear',
        tableHeaders: [ 'Código','Nome','E-mail','Situação'],
        tableRows: [
        ],
        tableColumns: [ 'id','nome','email','situacao'],
        mode: '',
        showContent: false,
        users: {},
        user: {
          id: '',
          nome: '',
          email: '',
          password: '',
          confirmPassword: '',
          situacao: '',
          cnpjcpf: '',
          selected: false
        },
        selectedUser: null, 
      }
    },
    methods: {
        fetchUsers(){
          this.$http.get('/asusu.json')
            .then(response =>{
              const users = Object.values(response.data || {})
              this.tableRows = users
              console.log(users)
            })
            .catch(error => {
              console.log(error)
            })
        },

        navigateTo(link){
            goToLink(link, this)
        },
        addUser(mode='save'){
          this.mode=mode
        },
        cancelAddUser(mode=''){
          this.mode=mode
          this.showContent=false
        },
        formatCnpjcpf(){
          this.userCnpjcpf = this.userCnpjcpf.replace(/\D/g, '')

          if (this.userCnpjcpf.length <= 11) {
            this.userCnpjcpf = this.userCnpjcpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Máscara para CPF
          } else {
            this.userCnpjcpf = this.userCnpjcpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'); // Máscara para CNPJ
          }

          this.userCnpjcpf = this.userCnpjcpf.substring(0, 14)
        }
    },
    mounted(){
      this.fetchUsers()
    }
}
</script>

<style>
  .button-area {
    display: flex;
    gap: 10px;
  }

  .slide-down {
    transition: transform 0.5s;
  }

  .add-user, .edit-user, .erase-user {
    padding: 10px;
    border-radius: 10px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: .2s;
    font-size: 1.2rem;
    background-color: #fff;
    color: #31446e;
  }

  .add-user:hover,
  .edit-user:hover,
  .erase-user:hover {
    transform: scale(1.1) translateY(-5px);
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    transition: .2s;
  }

  .add-user:hover {
    background-color: #1c905b;
    color: #fff;
  }

  .edit-user:hover {
    background-color: #1c5a90;
    color: #fff;
  }

  .erase-user:hover {
    background-color: #901c1c;
    color: #fff;
  }

  .user-content {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    flex-direction: column;
  }

  .user-box {
    display: flex;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;
    margin: 20px;
    width: 80vh;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    order: -1
  }

  .input-area {
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .input-area input  {
    border-radius: 10px;
    padding: 10px;
    border: none;
    outline: none;
    margin-top: 10px;
    background-color: #cedeff;
  }

  .custom-select {
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
    width: 200px;
    height: 35px;
    border: none;
    outline: none;
    background-color: #cedeff;
    cursor: pointer;
  }

  .first-line, .second-line, .third-line {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 50px;
  }

  .first-line {
    padding-top: 30px;
  }

  .second-line {
    padding-top: 50px;
  }

  .third-line {
    padding-top: 50px;
  }

  .fourth-line {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 50px;
  }

  .finish-session {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }

  .finish-session button {
    padding: 10px;
    border-radius: 10px;
    font-size: 1.2rem;
    outline: none;
    border: none;
    transition: .2s;
    background-color: #fff;
    color: #31446e;
    cursor: pointer;
  }

  .finish-session button:hover {
    transform: scale(1.1) translateY(-5px);
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    transition: .2s;
  }

  .save-button:hover {
    background-color: #1c905b;
    color: #fff;
  }

  .erase-button:hover {
    background-color: #901c1c;
    color: #fff;
  }

  .cancel-button:hover {
    background-color: #707070;
    color: #fff;
  }

  .user-name, .user-email, .user-password, .user-confirmPassword, .user-situation, .user-cpfcnpj{
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  tr.selected {
    background-color: #a7a7a7;
  }

</style>