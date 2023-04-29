<template>
  <div class="itens-page">
    <content-page :title="title" :icon="iconName">
        <template v-slot:content>
            <options-content :optiontitle="optiontitle1"></options-content>
            <options-content :optiontitle="optiontitle2"></options-content>
            <options-content :optiontitle="optiontitle3"></options-content>
        </template>
    </content-page>
  </div>
</template>

<script>
import contentPage from '@/components/contentPage.vue'
import optionsContent from '@/components/optionsContent.vue'

export default {
    name: 'itensPage',
    components: { contentPage, optionsContent },
    data(){
        return {
            title: 'Menu de Produtos',
            iconName: 'fas fa-box-archive',
            optiontitle1: 'Cadastro de Produtos',
            optiontitle2: 'Grupo de Produtos',
            optiontitle3: 'Materiais de Produtos',
        }
    }
}
</script>

<style>

</style>