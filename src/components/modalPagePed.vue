<template>
  <div class="modal-page" v-if="show">
    <div class="modal-content">
        <div class="modal-header">
            <div class="modal-title" v-if="selectedOption === 'canal'">
                <span>Canal de Vendas</span>
            </div>
            <div class="modal-title" v-if="selectedOption === 'item'">
                <span>Itens</span>
            </div>
            <div class="modal-title"></div>
        </div>
        <div class="modal-table">
        <table v-if="selectedOption === 'canal'">
            <thead class="table-header">
                <tr>
                    <th v-for="header in channelHeaders" :key="header.id">{{ header.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(channel,id) in channels" :key="id" @click="selectChannel(channel)" :class="{ 'selectedLine': channel.selectedChannel}">
                    <td>{{ channel.id }}</td>
                    <td>{{ channel.name }}</td>
                    <td>{{ channel.account }}</td>
                </tr>
            </tbody>
        </table>
        <table v-if="selectedOption === 'item'">
            <thead class="table-table">
                <tr>
                    <th v-for="header in itemHeaders" :key="header.id">{{ header.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,id) in items" :key="id" @click="selectItem(item)" :class="{ 'selectedLine': item.selectedItem}">
                    <td>{{ item.id }}</td>
                    <td>{{ item.des }}</td>
                    <td>{{ item.gru === 'V' ? 'Videogame ' :
                           item.gru === 'E' ? 'Esculturas' :
                           item.gru === 'U' ? 'Utilidades' :
                           item.gru }}</td>
                    <td><input name="qt" id="quantity-input"></td>
                    <td><input name="vlr" id="value-input"></td>
                </tr>
            </tbody>
        </table>
        </div>
        <button class="close-modal" @click="closeModal">Fechar</button>
    </div>
  </div>
</template>

<script>
import '@/style/table.css'

export default {
    data(){
        return {
            channelHeaders: [
                { id: 1, label: 'Código'},
                { id: 2, label: 'Canal de Venda'},
                { id: 3, label: 'Conta'},
            ],
            channels: {},
            itemHeaders: [ 
                { id: 1, label: 'Código'},
                { id: 2, label: 'Descrição'},
                { id: 3, label: 'Família'},
                { id: 4, label: 'Quantidade'},
                { id: 5, label: 'Valor'},
            ],
            items: {},
            selectedItemIndex: null
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        selectedOption: {
            type: String,
            default: ''
        },
        selectedItem: {
            type: Object,
            default: null
        },
        value: {
            type: Object,
            default: null
        }
    },
    methods: {
        closeModal(){
            this.$emit('close')
        },
        loadChannels(id){
        this.id=id
        this.$http('channel.json').then(res => {
            const obj = Object.keys(res.data).map(key => {
                return{id: key, ...res.data[key]}
            })
            this.channels = obj.map(obj => {
                return {...obj, selected: false, selectedChannel: false }
            })
        })
        console.log(this.channels)
        },
        loadItems(id){
            this.id=id
            this.$http('mpalmo.json').then(res => {
                const obj = Object.keys(res.data).map(key => {
                    return{id: key, ...res.data[key]}
                })
                this.items=obj.map(obj => {
                    return { ...obj, selected: false, selectedItem: false}
                })
            })
        },
        selectChannel(channel){
            this.channels.forEach(ch => {
                ch.selectedChannel = false
            });
            channel.selectedChannel = true
            this.$emit('channel-selected', channel)
        },
        selectItem(item){
            this.items.forEach(it => {
                it.selectedItem = false
            })
            item.selectedItem = true
            this.$emit('item-selected', item)
        }
    },
    mounted(){
        this.loadChannels()
        this.loadItems()
    }
}   
</script>

<style>
    .modal-page {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .modal-header {
        font-size: 1.5rem;
    }

    .modal-content {
        background-color: #cedeff;
        padding: 20px;
        border-radius: 10px;
        font-size: 1rem;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    .close-modal {
        margin-top: 10px;
        padding: 10px;
        border-radius: 10px;
        outline: none;
        border: none;
        background-color: #fff;
        color: #31446e;
        cursor: pointer;
        font-size: 1.2rem;
        transition: .2s;
    }

    .close-modal:hover {
        transform: scale(1.1) translateY(-5px);
        transition: .2s;
        background-color: #901c1c;
        color: #fff;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    }

</style>