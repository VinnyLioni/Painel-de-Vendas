<template>
  <div class="shop-register">
    <content-page :title="title" :icon="icon">
      <div class="button-content" slot="buttons">
        <div class="button-area">
          <button class="add-paped">Novo Pedido</button>
          <button class="edit-paped">Editar Pedido</button>
          <button class="erase-paped">Excluir Pedido</button>
        </div>
      </div>
      <div class="paped-content" slot="content">
        <div class="paped-box">
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
            </div>
            <modal-page 
                        :show="showModal" @close="closeModal" 
                        :selected-option="selectedOption" 
                        @channel-selected="handleChannelSelected"
                        @item-selected="handleItemSelected">
            </modal-page>
          </div>
        </div>
      </div>
      <div class="options-table" slot="table">
        <table>
          <thead class="table-header">
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <table></table>
            </tr>
          </tbody>
        </table>
      </div>
    </content-page>
  </div>
</template>

<script>
import contentPage from '@/components/contentPage.vue'
import modalPage from '@/components/modalPage.vue'
import '@/style/table.css'

export default {
  name: 'shopRegister',
  components: { contentPage, modalPage },
  data(){
    return {
      title: 'Pedido de Venda',
      icon: 'fas fa-cart-shopping',
      showModal: false,
      selectedOption: '',
      papeds: {},
      paped: {
        canal: null,
        itens: {
          id: null,
          des: null,
          qt: null,
          vlr: null
        },
        total: 0
      }
    }
  },
  methods:{
    openModal(option){
        this.showModal=true
        this.selectedOption=option
        console.log(option)
    },
    closeModal(){
      this.showModal=false
    },
    handleChannelSelected(channel){
      this.paped.canal=channel.name
      // this.closeModal()
      console.log(channel)
    },
    handleItemSelected(item){
      this.paped.itens= {
        id: item.id,
        des: item.des,
        qt: item.qt,
        vlr: item.vlr
      }
      // this.closeModal()
      console.log(item)
    }
  },
  created(){
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
    transform: scale(1.1) translateY(-5px);
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

  .input-area-shop {
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-evenly;  
  }

  .input-area-shop input {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 10px;
    border: none;
    outline: none;
    margin-top: 10px;
    background-color: #cedeff;
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