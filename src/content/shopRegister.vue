<template>
  <div class="shop-register">
    <content-page :title="title" :icon="icon">
      <div class="button-content" slot="buttons">
        <div class="button-area">
          <button class="add-paped" @click="openModalPedite">Novo Pedido</button>
          <!-- <button class="edit-paped">Editar Pedido</button>
          <button class="erase-paped">Excluir Pedido</button> -->
        </div>
      </div>
      <div class="paped-content" slot="content">
        <!-- <div class="paped-box">
          <div class="input-area-shop">
            <div class="first-line">
              <div class="select-channel">
                <span>Canal de Venda</span>
                <div class="input-channel">
                  <input type="text" v-model="paped.canal">
                  <button class="open-modal" @click="openModal('canal')">...</button>
                </div>
              </div>
              <div class="select-item">
                <span>Item</span>
                <div class="input-item">
                  <input type="text" v-model="paped.itens.des">
                  <button class="open-modal" @click="openModal('item')">...</button>
                </div>
              </div>
            </div> -->
            <modal-page-pedite
                        v-if="pedShow"
                        :channel="paped.canal"
                        :pedido="papedite"
                        @closePed="closeModalPed"
                        @addItem="openModal('item')"
                        @chooseChannel="openModal('canal')"
                        @savePaped="savePaped"
                        @updatedPaped="updatedPaped">
            </modal-page-pedite>
          <!-- </div>
        </div> -->
      </div>
      <div class="options-table" slot="table">
        <table>
          <thead class="table-header">
            <tr>
              <th v-for="header in pedHeaders" :key="header.id">{{ header.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(paped,id) in paped" :key="id" @click="selectPaped(id)">
              <td>{{ paped.id }}</td>
              <td>{{ paped.dt }}</td>
              <td>{{ paped.canal }}</td>
              <td>{{ formatCurrency(paped.total)}}</td>
              <td>{{ paped.st === 'A' ? 'Aberto' :
                     paped.st === 'C' ? 'Cancelado' :
                     paped.st === 'F' ? 'Faturado' :
                     paped.st }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </content-page>
  </div>
</template>

<script>
import contentPage from '@/components/contentPage.vue'
import modalPagePedite from '@/components/modalPagePedite.vue'
import '@/style/table.css'
import { mapState } from 'vuex'

export default {
  name: 'shopRegister',
  components: { contentPage, modalPagePedite },
  computed: mapState(['isLoading']),
  data(){
    return {
      title: 'Pedido de Venda',
      icon: 'fas fa-cart-shopping',
      showModal: false,
      showModalPed: false,
      selectedOption: '',
      pedShow: false,
      papedite: {},
      blankPapedite: {
        canal: null,
        dt: '',
        itens: [],
        total: 0
      },
      paped: {
      },
      pedHeaders: [
        { id: 1, label: 'Código'},
        { id: 2, label: 'Data'},
        { id: 3, label: 'Canal de Venda'},
        { id: 4, label: 'Valor'},
        { id: 5, label: 'Situação'},
      ]
    }
  },
  methods:{
    closeModalPed(){
      this.pedShow=false
      this.showModalPed=false
    },
    openModalPedite(){
      this.papedite=this.blankPapedite
      this.pedShow=true
      this.showModalPed=true
      console.log(this.localPaped)
    },
    savePaped(){
      this.pedShow=false
      this.loadPaped()
    },
    updatedPaped(){
      this.pedShow=false
      this.loadPaped()
    },
    loadPaped(id){
        this.$store.commit('setLoading', true)
        console.log('setLoading')
        this.id=id
        this.$http.get('paped.json').then(res => {
            this.$store.commit('setLoading', false)
            const obj = Object.keys(res.data).map(key => {
                return{id: key, ...res.data[key]}
            })
            this.paped=obj.map(obj => {
                return { ...obj, selected: false}
            })
        })
        this.$emit('loadPaped')
    },
    selectPaped(id){
      this.pedShow=true
      this.papedite=this.paped[id]
      console.log(this.paped[id])
    },
    formatCurrency(value){
        const formattedValue = value.toFixed(2);
        return `R$ ${formattedValue.replace('.', ',')}`;
    },

  },
  created(){
    },
  mounted(){
    this.localPaped = { ...this.pedido }
    console.log(this.localPaped)
    this.loadPaped()
  }
}
</script>

<style>
  .button-area {
    display: flex;
    gap: 10px;
  }

  .add-paped, .edit-paped, .erase-paped {
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

  .add-paped:hover,
  .edit-paped:hover,
  .erase-paped:hover {
    transform: scale(1.1) translateY(-2px);
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    transition: .2s;
  }

  .add-paped:hover {
    background-color: #1c905b;
    color: #fff;
}

  .edit-paped:hover {
    background-color: #1c5a90;
    color: #fff;
  }

  .erase-paped:hover {
    background-color: #901c1c;
    color: #fff;
  }

  .paped-content {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    flex-direction: column;
  }

  .paped-box {
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

  .open-modal {
    background-color: #cedeff;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-weight: bolder;
    transition: .2s;
  }

  .open-modal:hover {
    transition: .2s;
    background-color: #31446e;
    color: #fff;
  }

</style>