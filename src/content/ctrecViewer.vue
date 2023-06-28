<template>
  <div class="ctrec-viewer">
    <content-page :title="title" :icon="icon">
    <div class="button-content" slot="buttons">
      <div class="button-area">
        <button class="show-sta">Listar Abertos</button>
        <button class="show-stb">Listar Baixados</button>
        <button class="show-st">Listar Todos</button>
      </div>
    </div>
    <div class="ctrec-content" slot="content">
      <div class="sta-content">
        <span>Valor Aberto</span>
        <hr>
        <div class="vlr-sta">
          {{ formatCurrency(this.ctrecTotalAb) }}
        </div>
      </div>
      <div class="sta-content">
        <span>Valor Baixado</span>
        <hr>
        <div class="vlr-stb">
          {{ formatCurrency(this.ctrecTotalBai)}}
        </div>
      </div>
      <div class="sta-content">
        <span>Valor Total</span>
        <hr>
        <div class="vlr-st">
          {{ formatCurrency(this.ctrecTotal) }}
        </div>
      </div>
    </div>
    </content-page>
  </div>
</template>

<script>
import contentPage from '@/components/contentPage.vue'
import { mapState } from 'vuex'

export default {
  name: 'ctrecViewer',
  components: { contentPage },
  computed: mapState(['isLoading']),
  data(){
    return {
      title: 'Relatório CR',
      icon: 'fas fa-money-bills',
      ctrecs: {},
      ctrecTotal: 0,
      ctrecTotalAb: 0,
      ctrecTotalBai: 0,
    }
  },
  methods: {
    loadCtrec(){
      this.$store.commit('setLoading', true)
      this.$http('ctrec.json').then(res => {
        this.$store.commit('setLoading', false)
        const obj = Object.keys(res.data).map(key => {
          return{id: key, ...res.data[key]}
        })
        this.ctrecs = obj.map(obj => {
          return { ...obj, selected: false}
        })
        this.somaValoresCtrecs()
      })
    },
    somaValoresCtrecs() {
      this.ctrecTotal = this.ctrecs.reduce((total, ctrec) => total + ctrec.valor, 0);
      this.ctrecTotalAb = this.ctrecs
        .filter(ctrec => ctrec.situacao === 'A')
        .reduce((total, ctrec) => total + ctrec.valor, 0)
      this.ctrecTotalBai = this.ctrecs
        .filter(ctrec => ctrec.situacao === 'B')
        .reduce((total, ctrec) => total + ctrec.valor,  0)
    },
    formatCurrency(value){
        const formattedValue = value.toFixed(2);
        return `R$ ${formattedValue.replace('.', ',')}`;
    },
  },
  mounted(){
    this.loadCtrec()
  }

}
</script>

<style>
  .sta-content {
    border-top: 100px;
    background-color: #fff;
    padding: 30px;
    width: 300px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    transition: .2s;
  }

  .sta-content:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  .vlr-sta, .vlr-st, .vlr-stb {
    color: #b90000;
    font-weight: bold;
    font-size: 2rem;
  }

  .ctrec-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    border-top: 30px;
    height: 200px;
  }

  .button-content button {
    padding: 10px;
    border-radius: 10px;
    font-size: 1.2rem;
    outline: none;
    border: none;
    background-color: #fff;
    color: #1c5a90;
    cursor: pointer;
    transition: .2s;
  }

  .button-content button:hover {
    transform: scale(1.1) translate(-2px);
    background-color: #1c5a90;
    color: #fff;
  }
</style>