<template>
  <div class="shop-page">
    <content-page>
        <template v-slot:content>
            <options-content></options-content>
        </template>
    </content-page>
  </div>
</template>

<script>
import contentPage from '@/components/contentPage.vue'
import optionsContent from '@/components/optionsContent.vue'

export default {
    name: 'shopPage',
    components: { contentPage, optionsContent},
    data(){
        return {
            title: 'Menu de Vendas'
        }
    }

}
</script>

<style>

</style>