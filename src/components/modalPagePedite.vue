<template>
  <div class="modal-page-pedite">
    <div class="modal-content-pedite">
        <div class="modal-header-pedite">
            <div class="modal-title-pedite">
                <span>Manutenção de Pedido</span>
            </div>
            <div class="modal-button-pedite">
                <button class="back-button-ped" @click="closePedModal">
                    Voltar
                </button>
            </div>
        </div>
        <hr>
        <div class="paped-content-pedite">
            <div class="paped-box">
                <div class="input-area-shop-ite">
                    <div class="first-line">
                        <div class="select-channel-ite">
                            <span>Canal de Venda</span>
                            <div class="input-channel-ite">
                                <input type="text" v-model="form.name" disabled>
                                <button class="open-modal" @click="openModal('canal')">...</button>
                            </div>
                        </div>
                        <div class="select-item-ite">
                            <span>Item</span>
                            <div class="input-item-ite">
                                <button class="add-item" @click="openModal('item')">
                                    <span>Acrescentar Item</span>
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="options-table">
            <table>
                <thead class="table-header">
                    <tr>
                        <th v-for="header in pedHeaders" :key="header.id">{{ header.label }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <modal-page-ped 
            v-if="showModal"
            @close="closeModal" 
            :selected-option="selectedOption" 
            @channel-selected="handleChannelSelected"
            @item-selected="handleItemSelected"
            @cancel-channel-modal="cancelChannelSelection">
    </modal-page-ped>
  </div>
</template>

<script>
import ModalPagePed from '@/components/modalPagePed.vue'

export default {
    components: { ModalPagePed },
    name: 'modalPagePedite',
    props: {
        // pedShow: {
        //     type: Boolean,
        //     default: false
        // },
        pedido: {
            canal: null,
            itens: {
                id: null,
                des: null,
                qt: null,
                vlr: null
            },
            total: 0
        },
        selectedItemModal: null,
        channel: {
            name: {
                type: Object,
                default: ''
            }
        },

    },
    data(){
        return {
            pedHeaders: [
                { id: 1, label: 'Código'},
                { id: 2, label: 'Nome'},
                { id: 3, label: 'Quantidade'},
                { id: 4, label: 'Valor'},
                { id: 5, label: 'Opções'}
            ],
            localPaped: { ...this.paped },
            localSelectedChannel: { ...this.selectedChannel },
            form: {
                name: ''
            },
            showModal: false,
            selectedOption: '',
            paped: {
                canal: null,
                itens: {
                    id: null,
                    des: null,
                    qt: null,
                    vlr: null
                },
                total: 0
            },
        }
    },
    methods: {
        closeModal(){
            this.showModal=false
        },
        openModal(option){
            this.showModal=true
            this.selectedOption=option
            console.log(option)
        },
        closePedModal(){
            this.$emit('closePed')
        },
        chooseChannel(){
            this.showModal=true
        },
        addItem(){
            this.$emit('addItem')
        },
        insertItem(){
            this.$emit('insertItem')
        },
        handleChannelSelected(channel){
            this.paped.canal=channel.name
            this.form.name=channel.name
            console.log(channel)
                const evento = new CustomEvent('setChannel', { detail: channel });
                window.dispatchEvent(evento);
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
    },
    cancelChannelSelection(){
      this.paped.canal=null
    },
    },
    mounted(){
        console.log(this.form)
        window.addEventListener('setChannel', function(event) {
        // Manipular o evento aqui
        // this.form.name = event.detail.name
        console.log('Evento personalizado disparado!', event.detail);
        });
    }
}
</script>

<style>

    .input-area-shop-ite {
        display: flex;
        padding: 10px;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-evenly;  
    }

    .input-area-shop-ite input {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        padding: 10px;
        border: none;
        outline: none;
        margin-top: 10px;
        background-color: #cedeff;
    }

    .modal-page-pedite { 
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba( 0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-header-pedite {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .modal-content-pedite {
        background-color: #cedeff;
        padding: 20px;
        border-radius: 10px;
        font-size: 1rem;
        box-shadow: 2px 2px 8px rgba( 0, 0, 0, 0.2);
    }

    .paped-content-pedite {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        flex-direction: column;
    }

    .back-button-ped {
        display: flex;
        gap: 8px;
        border-radius: 10px;
        padding: 10px;
        font-size: 1em;
        cursor: pointer;
        border: none;
        outline: none;
        background-color: #cedeff;
        color: #31446e;
        transition: .2s;
    }

    .back-button-ped:hover {
        background-color: #bb3737;
        color: #fff;
    }

    .add-item:hover {
        background-color: #31446e;
        color: #fff;
    }

    .add-item {
        display: flex;
        gap: 5px;
        justify-content: center;
        padding: 10px;
        border-radius: 10px;
        background-color: #cedeff;
        cursor: pointer;
        outline: none;
        border: none;
        transition: .2s;
        width: 220px;
    }

    .select-item-ite {
        gap: 10px;
        display: flex;
        flex-direction: column;
    }
</style>