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
            <div class="paped-box-pedite">
            <div class="total-ped">
                <span>Total: </span>
                <input class="input-total" :value="formatCurrencyTotal(calculateTotal())" disabled>
            </div>
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
        <div class="options-table" v-show="localPaped.itens.length > 0">
            <table>
                <thead class="table-header">
                    <tr>
                        <th v-for="header in pedHeaders" :key="header.id">{{ header.label }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in localPaped.itens" :key="index">
                        <td>{{ item.id }}</td>
                        <td>{{ item.des }}</td>
                        <td>{{ item.qt }}</td>
                        <td>{{ formatCurrency(item.vlr) }}</td>
                        <td>
                            <button class="remove-item-button" @click="removeItem">
                                <i class="fas fa-trash-can"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="footer-pedite-content">
            <button class="save-paped" @click="savePaped">Salvar</button>
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
    <quantity-modal
            v-if="showQuantityModal"
            @cancel="handleQuantityModalCancel"
            @confirm="handleQuantityModalConfirm"
            v-model="showQuantityModal">
    </quantity-modal>
  </div>
</template>

<script>
import ModalPagePed from '@/components/modalPagePed.vue'
import quantityModal from '@/components/itemModal.vue'
import { mapState } from 'vuex'

export default {
    components: { ModalPagePed, quantityModal },
    name: 'modalPagePedite',
    computed: mapState(['isLoading']),
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
            localPaped: { 
                canal: '',
                dt: '',
                itens: [],
                total: 0
             },
            blankLocalPaped: { 
                canal: '',
                dt: '',
                itens: [],
                total: 0
            },
            pedId: null,
            localSelectedChannel: { ...this.selectedChannel },
            form: {
                name: ''
            },
            showModal: false,
            selectedOption: '',
            paped: {},
            showQuantityModal: false,
            selectedItem: null,
            id: null
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
            this.localPaped=this.blankLocalPaped
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
            this.form.name=channel.name
            console.log(channel)
                const evento = new CustomEvent('setChannel', { detail: channel });
                window.dispatchEvent(evento);
        },
        handleItemSelected(item){
            this.selectedItem=item
            this.showQuantityModal=true
        },
        handleQuantityModalCancel(){
            this.showQuantityModal=false
        },
        handleQuantityModalConfirm(item){
            this.selectedItem.qt = item.quantity
            this.selectedItem.vlr = item.value
            this.localPaped.canal=this.form.name
            this.localPaped.itens.push(this.selectedItem)
            this.showQuantityModal=false
            this.localPaped.total=this.calculateTotal()

            const evento = new CustomEvent('setItem', { detail: this.selectedItem})
            window.dispatchEvent(evento)
        },
        cancelChannelSelection(){
            this.localPaped.canal=null
        },
        removeItem(index){
            this.localPaped.itens.splice(index, 1)
        },
        formatCurrency(value){
            const formattedValue = value.toFixed(2); // Limita o número de casas decimais a 2
            return `R$ ${formattedValue.replace('.', ',')}`; // Substitui o ponto decimal por vírgula
        },
        formatCurrencyTotal(value){
            if (typeof value !== 'number') {
                return value
            }

            return 'R$' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2})
        },
        calculateTotal(){
            let total = 0
            for (const item of this.localPaped.itens) {
                total += item.vlr
            }

            return total
        },
        savePaped(){
            this.localPaped.dt = new Date().toLocaleDateString()
            this.localPaped.st = 'A'
            if (this.localPaped.id) {
                const papedId = this.localPaped.id
                this.localPaped.canal=this.form.name
                const updatedPaped = { ...this.localPaped }
                delete updatedPaped.id

                this.$http.put(`paped/${papedId}.json`, updatedPaped)
                    .then(() => {
                        this.$emit('updatedPaped')
                        console.log(updatedPaped)
                    })
            } else {
                this.$http.post('paped.json', this.localPaped)
                    .then(res => {
                        this.pedId=res.data.name
                        console.log('salvo!')
                        this.$emit('savePaped')
                        const ctrecData = {
                            data: this.localPaped.dt,
                            valor: this.localPaped.total,
                            canal: this.localPaped.canal,
                            pedidoId: this.pedId,
                            situacao: this.localPaped.st
                        }
                        this.$http.post('ctrec.json', ctrecData)
                    })
            }
            this.loadPaped()
            console.log(this.updatedPaped)
        },
        loadPaped(id){
            this.id=id
            this.$http.get('paped.json').then(res => {
                const obj = Object.keys(res.data).map(key => {
                    return{id: key, ...res.data[key]}
                })
                this.paped=obj.map(obj => {
                    return { ...obj, selected: false}
                })
            })
            this.$emit('loadPaped')
        }
    },
    mounted(){
        this.localPaped = this.pedido
        console.log(this.localPaped)
        console.log(this.form)
        window.addEventListener('setChannel', function(event) {
        // Manipular o evento aqui
        // this.form.name = event.detail.name
        console.log('Evento personalizado disparado!', event.detail);
        });
        // window.addEventListener('setItem', function(event) {
        //     console.log('evento personalizado disparado!', event.detail)
        // })
    }
}
</script>

<style>

    .total-ped {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        gap: 10px;
    }

    .input-total {
        background-color: #cedeff;
        border: none;
        outline: none;
        border-radius: 10px;
        padding: 10px;
        font-size: 1.2rem;
        color: #bb3737;
        font-weight: bold;
    }

    .paped-box-pedite {
        display: flex;
        justify-content: cente;
        background-color: #fff;
        border-radius: 10px;
        margin: 20px;
        width: 80vh;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
        order: -1;
        padding: 20px;
        flex-direction: column;
    }

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

    .remove-item-button {
        background-color: #fff;
        outline: none;
        border: none;
        color: #31446e;
        padding: 5px;
        border-radius: 5px;
        transition: .2s;
        cursor: pointer;
    }

    .remove-item-button:hover {
        background-color:#31446e ;
        color: #fff;
    }

    .save-paped {
        background-color: #cedeff;
        transition: .2s;
        outline: none;
        border: none;
        border-radius: 10px;
        padding: 10px;
        font-size: 1.2rem;
        cursor: pointer;
    }

    .save-paped:hover {
        background-color: #316e50;
        color: #fff;
    }
</style>