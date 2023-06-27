<template>
  <div class="modal-page-qtvlr" v-if="showQtVlr">
    <div class="modal-content-qtvlr">
      <div class="modal-header-qtvlr">
        <span>Definir Quantidades e Valores</span>
      </div>
      <div class="modal-session-qtvlr">
        <div class="session-quantity">
        <label for="">Quantidade</label>
        <input type="number">
        </div>
        <div class="session-vlr">
        <label for="">Valor</label>
        <input type="number">
        </div>
      </div>
      <div class="button-qtvlr-area">
        <button class="save-item">Salvar</button>
        <button class="cancel-item" @click="cancelModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props: {
    showQtVlr: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    cancelModal(){
      this.$emit('cancelModal')
    }
  }


}
</script>

<style>
  .modal-page-qtvlr {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .modal-content-qtvlr {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    font-size: 1rem;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  }

  .modal-session-qtvlr {
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 50px;
  }

  .modal-session-qtvlr input {
    border-radius: 10px;
    padding: 10px;
    border: none;
    outline: none;
    margin-top: 10px;
    background-color: #cedeff;
  }

  .session-quantity, .session-vlr {
    display: flex;
    flex-direction: column;
  }

  .button-qtvlr-area {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
  }

  .save-item, .cancel-item {
    background-color: #fff;
    outline: none;
    border: none;
    font-size: 1.2rem;
    padding: 8px;
    cursor: pointer;
    transition: .2s;
    border-radius: 10px;
  }

  .save-item:hover {
    background-color: #31446e;
    color: #fff;
  }

  .cancel-item:hover {
    background-color: #31446e;
    color: #fff;
  }
</style>