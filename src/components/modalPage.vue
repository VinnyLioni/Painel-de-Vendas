<template>
  <div class="modal-page" v-if="show">
    <div class="modal-content">
        <table v-if="selectedOption === 'canal'">
            <thead class="table-header">
                <tr>
                    <th v-for="header in channelHeaders" :key="header.id">{{ header.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(channel,id) in channels" :key="id" @click="selectChannel(id)">
                    <td>{{ channel.id }}</td>
                    <td>{{ channel.name }}</td>
                    <td>{{ channel.account }}</td>
                </tr>
            </tbody>
        </table>
        <table v-if="selectedOption === 'item'">
            <thead class="options-table">
                <tr>
                    <th v-for="header in channelHeaders" :key="header.id">{{ header.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                </tr>
            </tbody>
        </table>
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
                { id: 3, label: 'Código'},
            ],
            channels: {}
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
                return {...obj, selected: false}
            })
        })
        console.log(this.channels)
        },
    },
    mounted(){
        this.loadChannels()
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

    .modal-content {
        background-color: #cedeff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    .close-modal {
        padding: 10px;
        border-radius: 10px;
        outline: none;
        border: none;
        background-color: #fff;
        color: #31446e;
        cursor: pointer;
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