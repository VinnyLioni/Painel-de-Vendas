<template>
  <div class="modal-wrapper-quantity">
    <div class="modal-content-quantity">
      <span>Preencha os Campos</span>
      <hr>
      <div class="form-group-quantity">
        <label for="quantity">Quantidade:</label>
        <input type="number" v-model="quantity" id="quantity" min="0" step="0.01" required>
      </div>
      <div class="form-group-quantity">
        <label for="value">Valor:</label>
        <input type="number" v-model="value" id="value" min="0" step="0.01" required>
      </div>
      <div class="button-group">
        <button class="finish-button" @click="confirm">Confirmar</button>
        <button class="cancel-button-modal" @click="cancel">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      quantity: 0,
      value: 0
    }
  },
  methods: {
    cancel(){
      this.$emit('cancel')
    },
    confirm(){
      if (this.quantity !== null && this.value !== null) {
        const item = {
          quantity: parseFloat(this.quantity),
          value: parseFloat(this.value)
        }
      this.$emit('confirm', item)
      }
    }
  }
}
</script>

<style>
  .modal-wrapper-quantity {
    position: fixed;
    top: 0;
    left: 0; 
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.2); */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99
    }

    .modal-content-quantity {
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      font-size: 1.1rem;
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
      max-width: 400px;
    }

    .form-group-quantity {
      margin-bottom: 10px;
    }

    .form-group-quantity label {
      display: block;
      margin-bottom: 5px;
    }

    .form-group-quantity input {
      background-color: #cedeff;
      border-radius: 5px;
      padding: 5px;
      border: none;
      outline: none;
      width: 100%;
    }

    .button-group {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }

    .cancel-button-modal,
    .finish-button {
      border-radius: 5px;
      padding: 5px 10px;
      font-size: 1.1rem;
      cursor: pointer;
      border: none;
      outline: none;
      transition: .2s;
      background-color: #fff;
      color: #31446e;
    }

    .cancel-button:hover-modal {
      background-color: #bb3737;
      color: #fff;
    }

    .finish-button:hover {
      background-color: #31446e;
      color: #fff;
    }

</style>