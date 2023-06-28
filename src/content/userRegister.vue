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
        <div class="user-content" slot="content" v-if="mode === 'save' || mode==='edit'" :class="{ 'slide-down': showContent}">
          <div class="user-box">
            <div class="input-area-user">
              <div class="first-line">
                <div class="user-name">
                  <span>Name</span>
                  <input type="text" v-model="user.name">
                </div>
                <div class="user-email">
                  <span>E-mail</span>
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
                  <span>Senha</span>
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
        <div class="options-table" slot="table">
          <table>
            <thead class="table-header">
              <tr>
                <th v-for="header in headers" :key="header.id">{{ header.label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user,id) in users" :key="id" @click="selectUser(id)">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.cnpjcpf }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </content-page>
  </div>
</template> 

<script>
import { goToLink } from '@/utils/utils'
import contentPage from '@/components/contentPage.vue'
import "@/style/table.css"
import { mapState } from 'vuex'

export default {
    name: 'userRegister',
    components: { contentPage },
    computed: mapState(['isLoading']),
    data(){
      return {
        title: 'Cadastro de Usuários',
        iconName: 'fas fa-user-gear',
        mode: '',
        id: '',
        showContent: false,
        headers:[
          { id: 1, label: 'Código'},
          { id: 2, label: 'Name'},
          { id: 3, label: 'E-mail'},
          { id: 4, label: 'CNPJ/CPF'},
        ],
        users: {},
        user: {
          id: '',
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          situacao: '',
          cnpjcpf: '',
          selected: false
        },
        selectedUser: null, 
        userCnpjcpf: ''
      }
    },
    methods: {
        loadUsers(id){
          this.$store.commit('setLoading', true)
          this.id=id
          this.$http('asusu.json').then(res => {
            this.$store.commit('setLoading', false)
            const obj = Object.keys(res.data).map(key => {
              return{ id:key, ...res.data[key]}
            })
            this.users=obj.map(obj=>{
              return { ...obj, selected: false }
            })
          })
        },
        selectUser(id,mode="edit"){
          this.users.map(obj => {
            obj.selected=false
          })
          this.user={...this.users[id]}
          this.id=id
          this.users[id].selected=!this.users[id].selected
          this.mode=mode
        },
        saveUser(){
          this.$store.commit('setLoading', true)
          if(this.user.id){
            const userId=this.user.id
            const updatedUser={ ...this.user }
            delete updatedUser.id

            this.$http.put(`asusu/${userId}.json`, updatedUser)
              .then(res=> {
                this.$store.commit('setLoading', false)
                console.log('Usuario atualizado com sucesso', res)
                this.loadUsers()
                this.mode=''
              })
              .catch(error => {
                console.error('Erro ao atualizar usuario', error)
              })
          } else {
            this.$http.post('asusu.json', this.product)
              .then(res => {
                this.$store.commit('setLoading', false)
                console.log('Usuario cadastrado com sucesso', res)
                this.loadUsers()
                this.mode=''
              })
              .catch(error => {
                console.error('Erro ao cadastrar Usuario', error)
              })
          }
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
      this.loadUsers()
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

  .input-area-user {
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .input-area-user input  {
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