<template>
  <div class="modal-page-channel" v-if="showChannel">
    <div class="modal-content-channel">
        <div class="modal-header-channel">
            <span>Confirma seleção?</span>
        </div>
        <div class="modal-session-buttons">
            <button class="confirm-button" @click="confirmChannel">Confirmar</button>
            <button class="cancel-channel-button" @click="cancelModal">Voltar</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        showChannel: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        cancelModal(){
            this.$emit('cancelChannelModal')
        },
        confirmChannel(){
            this.$emit('confirmChannel')
        }
    }
}
</script>
 
<style>
    .modal-page-channel {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 12
    }

    .modal-content-channel {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        font-size: 1.2rem;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    }

    .modal-session-buttons {
        display: flex;
        flex-direction: row;
        gap: 20px;
        padding: 30px;
    }

    .modal-session-buttons button {
        transition: .2s;
        padding: 10px;
        border: none;
        outline: none;
        background-color: #fff;
        border-radius: 10px;
    }

    .modal-session-buttons button:hover {
        background-color: #31446e;
        color: #fff;
        cursor: pointer;
    }
</style>