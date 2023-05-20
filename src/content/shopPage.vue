<template>
  <div class="shop-page">
    <content-page :title="title" :icon="iconName">
        <template v-slot:content>
            <options-content :optiontitle="optiontitle1" @goTo="navigateTo('/shop_register')"></options-content>
            <options-content :optiontitle="optiontitle2" @goTo="navigateTo('/sell_channel')"></options-content>
            <options-content :optiontitle="optiontitle3"></options-content>
        </template>
    </content-page>
  </div>
</template>

<script>
import contentPage from '@/components/contentPage.vue'
import optionsContent from '@/components/optionsContent.vue'
import { goToLink } from '@/utils/utils.js'

export default {
    name: 'shopPage',
    components: { contentPage, optionsContent},
    data(){
        return {
            title: 'Menu de Vendas',
            iconName: 'fas fa-cash-register',
            optiontitle1: 'Pedido de Venda',
            optiontitle2: 'Canal de Venda',
            optiontitle3: 'Cadastro de Clientes',
        }
    },
    methods: {
        navigateTo(link){
            goToLink(link, this)
        }
    }

}
</script>

<style>

</style>