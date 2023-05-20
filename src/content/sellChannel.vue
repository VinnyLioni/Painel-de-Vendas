<template>
    <div class="channel-register">
        <content-page :title='title' :icon="icon">
            <div class="button-content" slot="buttons">
                <div class="button-area">
                    <button class="add-channel" @click="addChannel" v-if="mode===''">Novo Canal</button>
                    <button class="edit-channel">Editar Canal</button>
                    <button class="erase-channel">Excluir Canal</button>
                </div>
            </div>
            <div class="channel-content" slot="content" v-if="mode==='save' || mode==='edit'">
                <div class="channel-box">
                    <div class="input-area">
                        <div class="first-line">
                            <div class="channel-name">
                                <span>Canal de Venda</span>
                                <input type="text" v-model="channel.name">
                            </div>
                            <div class="channel-account">
                                <span>Conta</span>
                                <input type="text" v-model="channel.account">
                            </div>
                        </div>
                        <div class="second-line">
                            <div class="finish-session">
                                <button class="save-button" @click="saveChannel">Salvar</button>
                                <button class="erase-button">Excluir</button>
                                <button class="cancel-button" @click="cleanPage">Cancelar</button>
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
                        <tr v-for="(channel,id) in channels" :key="id" @click="selectChannel(id)">
                            <td>{{ channel.id }}</td>
                            <td>{{ channel.name }}</td>
                            <td>{{ channel.account }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </content-page>
    </div>
</template>

<script>
import contentPage from '@/components/contentPage.vue'
export default {
    name: 'sellChannel',
    components: { contentPage },
    data(){
        return {
            title: 'Cadastro de Canal de Venda',
            icon: 'fas fa-bag-shopping',
            mode: '',
            id: '',
            headers: [
                {id: 1, label: 'Código'},
                {id: 2, label: 'Canal de Venda'},
                {id: 3, label: 'Conta Utilizada'}
            ],
            channels: {},
            channel: {
                name: '',
                account: '',
                selected: false
            },
            selectedChannel: null
        }
    },
    methods: {
        addChannel(){
            this.mode='save'
        },
        saveChannel(){
            if (this.channel.id) {
                const channelId = this.channel.id;
                const updatedChannel = { ...this.channel }
                delete updatedChannel.id

                this.$http.put(`channel/${channelId}.json`, updatedChannel)
                    .then(res=>{
                        console.log('Canal atualizado com Sucesso', res)
                        this.loadChannels()
                        this.cleanPage()
                        this.mode=''
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar Canal', error)
                    })
            } else {
                this.$http.post('channel.json', this.channel)
                    .then(res=>{
                        console.log('Canal inserido com sucesso', res)
                        this.loadChannels()
                        this.mode=''
                    })
                    .catch(error=>{
                        console.log('Erro ao inserir Canal', error)
                    })
            }
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

        },
        selectChannel(id,mode='edit'){
            this.channels.map(obj => {
                obj.selected=false
            })
            this.channel={...this.channels[id]}
            this.id=id
            this.channels[id].selected=!this.channels[id].selected
            this.mode=mode
        },
        cleanChannel(obj){
            Object.keys(obj).forEach(prop => {
                obj[prop]=null
            })
        },
        cleanPage(){
            this.mode=''
            this.cleanChannel(this.channel)

            this.channels.forEach(obj => {
                obj.selected=false
            })
        }
    },
    mounted(){
        this.loadChannels()
    }
}
</script>

<style>
    .button-area {
        display: flex;
        gap: 10px;
    }

    .add-channel, .edit-channel, .erase-channel {
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

    .add-channel:hover,
    .edit-channel:hover,
    .erase-channel:hover {
        transform: scale(1.1) translateY(-5px);
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
        transition: .2s;
    }

    .add-channel:hover {
        background-color: #1c905c;
        color: #fff;
    }

    .edit-channel:hover {
        background-color: #1c5a90;
        color: #fff;
    }

    .erase-channel:hover {
        background-color: #901c1c;
        color: #fff;
    }

    .channel-content {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        flex-direction: column;
    }

    .channel-box {
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

    .input-area {
        display: flex;
        padding: 10px;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-evenly;
    }

    .first-line {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 50px;
    }

    .channel-name,
    .channel-account {
        display: flex;
        flex-direction: column;
        align-content: center;
    }
</style>