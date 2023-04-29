<template>
  <div class="finances-page">
    <content-page :title="title">
        <template v-slot:content>
            <options-content :optiontitle="optiontitle1"></options-content>
            <options-content :optiontitle="optiontitle2"></options-content>
            <options-content :optiontitle="optiontitle3"></options-content>
            <options-content :optiontitle="optiontitle4"></options-content>
        </template>
    </content-page>
  </div>
</template>

<script>
import contentPage from '@/components/contentPage.vue'
import optionsContent from '@/components/optionsContent.vue'
export default {
    name: 'financesPage',
    components: { contentPage, optionsContent },
    data(){
        return {
            title: 'Menu Financeiro',
            optiontitle1: 'Títulos a Receber',
            optiontitle2: 'Títulos a Pagar',
            optiontitle3: 'Baixa de Títulos a Receber',
            optiontitle4: 'Baixa de Títulos a Pagar',
        }
    }
}
</script>

<style>

</style>