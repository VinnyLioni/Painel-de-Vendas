<template>
  <div class="user-register">
    <content-page :title="title" :icon="iconName">
      <div class="button-content" slot="buttons">
        <div class="button-area">
          <button class="add-user">Cadastrar</button>
          <button class="edit-user">Editar</button>
          <button class="erase-user">Excluir</button>
        </div>
      </div>
      <div class="user-content" slot="content">
        <div class="user-box">
          <div class="input-area">
            <div class="first-line">
              <div class="user-name">
                <span>Nome do Usuário</span>
                <input type="text">
              </div>
              <div class="user-email">
                <span>E-mail do Usuário</span>
                <input type="text">
              </div>
            </div>
            <div class="second-line">
              <div class="user-password">
                <span>Senha do Usuário</span>
                <input type="text">
              </div>
              <div class="user-confirmPassword">
                <span>Confirme a Senha</span>
                <input type="text">
              </div>
            </div>
            <div class="third-line">
              <div class="finish-session">
                <button class="save-button">Salvar</button>
                <button class="erase-button">Excluir</button>
                <button class="cancel-button">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="user-table" slot="table">
        <!-- <div class="options-table">
          <table>
            <thead class="table-header">
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Situação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Teste</td>
                <td>Teste@gmail.com</td>
                <td>Ativo</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Teste</td>
                <td>Teste@gmail.com</td>
                <td>Ativo</td>
              <tr>
                <td>1</td>
                <td>Teste</td>
                <td>Teste@gmail.com</td>
                <td>Ativo</td>
              <tr>
                <td>1</td>
                <td>Teste</td>
                <td>Teste@gmail.com</td>
                <td>Ativo</td>
              <tr>
                <td>1</td>
                <td>Teste</td>
                <td>Teste@gmail.com</td>
                <td>Ativo</td>
              <tr>
                <td>1</td>
                <td>Teste</td>
                <td>Teste@gmail.com</td>
                <td>Ativo</td>
              <tr>
                <td>1</td>
                <td>Teste</td>
                <td>Teste@gmail.com</td>
                <td>Ativo</td>
              <tr>
                <td>1</td>
                <td>Teste</td>
                <td>Teste@gmail.com</td>
                <td>Ativo</td>
              </tr>
            </tbody>
          </table>
        </div> -->
        <table-page :headers="tableHeaders" :rows="tableRows" :columns="tableColumns"></table-page>
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
          { id: 1,  nome: 'Teste', email: 'teste@gmail.com', situacao: 'Ativo'},
          { id: 1,  nome: 'Teste', email: 'teste@gmail.com', situacao: 'Ativo'},
          { id: 1,  nome: 'Teste', email: 'teste@gmail.com', situacao: 'Ativo'},
          { id: 1,  nome: 'Teste', email: 'teste@gmail.com', situacao: 'Ativo'},
          { id: 1,  nome: 'Teste', email: 'teste@gmail.com', situacao: 'Ativo'},
          { id: 1,  nome: 'Teste', email: 'teste@gmail.com', situacao: 'Ativo'},
          { id: 1,  nome: 'Teste', email: 'teste@gmail.com', situacao: 'Ativo'},
          { id: 1,  nome: 'Teste', email: 'teste@gmail.com', situacao: 'Ativo'},
        ],
        tableColumns: [ 'id','nome','email','situacao']
      }
    },
    methods: {
        navigateTo(link){
            goToLink(link, this)
        }
    }
}
</script>

<style>
  .button-area {
    display: flex;
    gap: 10px;
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

  .input-area input {
    border-radius: 10px;
    padding: 10px;
    border: none;
    outline: none;
    margin-top: 10px;
    background-color: #cedeff;
  }

  .first-line, .second-line {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 100px;
  }

  .first-line {
    padding-top: 30px;
  }

  .second-line {
    padding-top: 50px;
  }

  .third-line {
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

  .user-name, .user-email, .user-password, .user-confirmPassword {
    display: flex;
    flex-direction: column;
    align-content: center;
  }

</style>