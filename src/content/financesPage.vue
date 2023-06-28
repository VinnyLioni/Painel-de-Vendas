<template>
  <div class="finances-page">
    <content-page :title="title" :icon="iconName">
        <template v-slot:content>
            <options-content :optiontitle="optiontitle1" @goTo="navigateTo('/ctrec_page')"></options-content>
            <options-content :optiontitle="optiontitle2"></options-content>
            <!-- <options-content :optiontitle="optiontitle3"></options-content>
            <options-content :optiontitle="optiontitle4"></options-content> -->
        </template>
    </content-page>
  </div>
</template>

<script>
import contentPage from '@/components/contentPage.vue'
import optionsContent from '@/components/optionsContent.vue'
import { goToLink } from '@/utils/utils.js'

export default {
    name: 'financesPage',
    components: { contentPage, optionsContent },
    data(){
        return {
            title: 'Menu Financeiro',
            iconName: "fas fa-coins",
            optiontitle1: 'Títulos a Receber',
            optiontitle2: 'Títulos a Pagar',
            // optiontitle3: 'Baixa de Títulos a Receber',
            // optiontitle4: 'Baixa de Títulos a Pagar',
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