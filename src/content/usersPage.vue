<template> 
    <div class="users-page">
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
    name: 'usersPage',
    components: { contentPage, optionsContent },
    data(){
        return {
            title: 'Menu de Usuários',
            iconName: 'fas fa-user-gear',
            optiontitle1: 'Cadastro de Usuários',
            optiontitle2: 'Grupo de Usuários',
            optiontitle3: 'Nível de Usuários',
        }
    }
}
</script>

<style>
    .users-page {
        display: flex;
        width: 100%;
        height: 865px;
        background-color: #cedeff;
        border-radius: 10px;
    }

    .content-page {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .header-content {
        display: flex;
        padding: 20px;
        font-size: 2em;
    }

    .header-content i {
        padding: 10px;
    }

    .options-content {
        display: flex;
        flex-direction: column;
        font-size: 1.5em;

    }

    .first-option, .second-option, .third-option {
        padding: 40px;
        margin: 10px;
        background-color: #ffffff;
        border-radius: 10px;
        cursor: pointer;
        transition: .2s;
    }

    .first-option:hover, .second-option:hover, .third-option:hover {
        background-color: #31446e;
        color: #cedeff;
        transform: translateY(-5px);
        transition: .2s;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    }

    .first-option {
        margin-bottom: 20px;
    }

    .first-row, .second-row {
        width: 100%;
    }

    

</style>