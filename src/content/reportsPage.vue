<template>
  <div class="reports-page">
    <content-page :title="title" :icon="iconName">
        <template v-slot:content>
            <options-content :optiontitle="optiontitle1" @goTo="navigateToLink('/ctrec_viewer')"></options-content>
            <!-- <options-content :optiontitle="optiontitle2"></options-content>
            <options-content :optiontitle="optiontitle3"></options-content>
            <options-content :optiontitle="optiontitle4"></options-content>
            <options-content :optiontitle="optiontitle5"></options-content>
            <options-content :optiontitle="optiontitle6"></options-content>
            <options-content :optiontitle="optiontitle7"></options-content>
            <options-content :optiontitle="optiontitle8"></options-content> -->
        </template>
    </content-page>
  </div>
</template>

<script>
import contentPage from '@/components/contentPage.vue'
import optionsContent from '@/components/optionsContent.vue'
import { goToLink } from  '@/utils/utils.js'

export default {
    name: 'reportsPage',
    components: { contentPage, optionsContent },
    data(){
        return {
            title: 'Menu de Relatorios',
            iconName: 'fas fa-book',
            optiontitle1: 'Relatório de Títulos CR',
            // optiontitle2: 'Consulta de Embalagens',
            // optiontitle3: 'Consulta de Bancos',
            // optiontitle4: 'Relatório de Vendas',
            // optiontitle5: 'Relatório de Compras',
            // optiontitle6: 'Relatório de Baixas CR',
            // optiontitle7: 'Relatório de Baixas CP',
            // optiontitle8: 'Relatório de Canal de Venda',
        }
    },
    methods: {
        navigateToLink(link){
            goToLink(link, this)
        }
    }
}
</script>

<style>

</style>