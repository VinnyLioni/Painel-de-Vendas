<template>
  <div class="ctrec-register">
    <content-page :title="title" :icon="icon">
      <div class="button-content" slot="buttons">
        <div class="button-area">
          <button class="edit-title">Editar</button>
          <button class="confirm-title">Baixar</button>
          <!-- <button class=""></button> -->
        </div>
      </div>
      <div class="ctrec-content" slot="content" v-if="mode === 'edit' || mode === 'confirm'">
        <div class="ctrec-box">
          <div class="input-area-ctrec">
            <div class="first-line">
              <div class="ctrec-pedId">
                <span>ID do Pedido</span>
                <input type="text" disabled>
              </div>
              <div class="ctrec-dt">
                <span>Data do Pedido</span>
                <input type="text" disabled>
              </div>
              <div class="ctrec-canal">
                <span>Canal De Venda</span>
                <input type="text" disabled>
              </div>
            </div>
            <div class="second-line">
              <div class="ctrec-valor">
                <span>Valor da Venda</span>
                <input type="text" disabled>
              </div>
              <div class="ctrec-status">
                <span>Status</span>
                <input type="text" disabled>
              </div>
            </div>
            <div class="third-line">
              <div class="finish-session">
                <button class="confirm-title">Baixar Título</button>
                <button class="cancel-operation">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="options-table" slot="table">
        <table>
          <thead class="table-header">
            <tr>
              <th v-for="(header, id) in ctrecHeaders" :key="id">{{ header.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(title, id) in localCtrec" :key="id">
              <td>{{ title.id }}</td>
              <td>{{ title.data }}</td>
              <td>{{ formatCurrency(title.valor) }}</td>
              <td>{{ formatSituation(title.situacao) }}</td>
              <td>{{ title.canal }}</td>
              <td>{{ title.pedidoId }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </content-page>
  </div>
</template>

<script>
import contentPage from '@/components/contentPage.vue'
import "@/style/table.css"
import { mapState } from 'vuex'

export default {
    name: 'ctrecRegister',
    components: { contentPage },
    computed: mapState(['isLoading']),
    data(){
        return {
            title: 'Títulos a Receber',
            icon: 'fas fa-coins',
            mode: '',
            id: null,
            ctrecHeaders: [
              { id: 1, label: 'Código'},
              { id: 2, label: 'Data'},
              { id: 3, label: 'Valor'},
              { id: 4, label: 'Situação'},
              { id: 5, label: 'Canal'},
              { id: 6, label: 'Pedido'},
            ],
            localCtrec: {}
        }
    },
    methods: {
      loadCtrec(id){
        this.$store.commit('setLoading', true)
        this.id=id
        this.$http('ctrec.json').then(res => {
          this.$store.commit('setLoading', false)
          const obj = Object.keys(res.data).map(key => {
            return{id: key, ...res.data[key]}
          })
          this.localCtrec=obj.map(obj => {
            return { ...obj, selected: false}
          })
        })
      },
      formatCurrency(value){
        const formattedValue = value.toFixed(2);
        return `R$ ${formattedValue.replace('.', ',')}`;
      },
      formatSituation(situation){
        if (situation === 'A'){
          return 'Aberto'
        } else if (situation === 'B'){
          return 'Baixado'
        }
      }
    },
    mounted(){
      this.loadCtrec()
    }
}
</script>

<style>
  .button-area {
    display: flex;
    gap: 10px;
  }

  .edit-title, .confirm-title {
    padding: 10px;
    border-radius: 10px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: .2s;
    font-size: 1.2rem;
    background-color: #fff;
    color: #31446e;
    transition: .2s;
  }

  .edit-title:hover,
  .confirm-title:hover {
    transform: scale(1.1) translateY(-5px);
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  }

  .edit-title:hover {
    background-color: #31446e;
    color: #fff;
  }

  .confirm-title:hover {
    background-color: #1c905b;
    color: #fff;
  }

  .cancel-operation:hover {
    background-color: #6f7d9d;
    color: #fff;
  }

  .ctrec-content {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    flex-direction: column;
  }

  .ctrec-box {
    display: flex;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;
    margin: 20px;
    width: 80vh;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    order: -1;
    padding: 20px;
  }

  .ctrec-valor, .ctrec-status, .ctrec-pedId, .ctrec-dt, .ctrec-canal {
    display: flex;
    flex-direction: column;
  }

  .input-area-ctrec span {
    margin: 10px;
  }

  .input-area-ctrec input {
    background-color: #cedeff;
    outline: none;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }

  .input-area-ctrec .finish-session {
    display: flex;
    gap: 20px;
  }
</style>