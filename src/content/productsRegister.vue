<template>
<div class="products-register">
    <content-page :title='title' :icon='icon'> TESTE
        <div class="button-content" slot="buttons">
            <div class="button-area">
                <button class="add-product">Cadastrar</button>
                <button class="edit-product">Editar</button>
                <button class="erase-product">Excluir</button>
            </div>
        </div>
        <div class="product-content" slot="content">
            <div class="product-box">
                <div class="input-area">
                    <div class="first-line">
                        <div class="product-name">
                            <span>Nome do Item</span>
                            <input type="text">
                        </div>
                        <div class="product-name2">
                            <span>Nome Completo</span>
                            <input type="text">
                        </div>
                        <div class="product-type">
                            <span>Família de Produto</span>
                            <select id="product-select">
                                <option value="V">Videogames</option>
                                <option value="E">Esculturas</option>
                                <option value="U">Utilidades</option>
                            </select>
                        </div>
                    </div>
                    <div class="second-line">
                        <div class="product-type">
                            <span>Montável</span>
                            <select id="product-select2">
                                <option value="S">Sim</option>
                                <option value="N">Não</option>
                            </select>
                        </div>
                        <div class="product-type2">
                            <span>Tinta</span>
                            <select id="product-select3">
                                <option value="S">Sim</option>
                                <option value="N">Não</option>
                            </select>
                        </div>
                        <div class="product-type3">
                            <div class="product-material">
                                <span>Material</span>
                                <select id="product-material">
                                    <option value="P">PLA</option>
                                    <option value="PG">PETG</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="third-line">
                        <div class="product-time">
                            <span>Tempo de Impressão</span>
                            <input type="text" class="time-input" placeholder="HH:MM">
                        </div>
                        <div class="product-cost-material">
                            <span>Material Gasto</span>
                            <input type="number" name="" id="">
                        </div>
                        <div class="product-cost-value">
                            <span>Custo</span>
                            <input type="text">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </content-page>
</div>
</template>

<script>
import contentPage from '@/components/contentPage.vue'

export default {
    name: 'productsRegister',
    components: { contentPage },
    data(){
        return {
            title: 'Cadastro de Produtos',
            icon: 'fas fa-box',
            product: {
            }
        }
    },
    methods: {

    }
}
</script>

<style>
    .button-area {
        display: flex;
        gap: 10px;
    }

    .add-product, .edit-product, .erase-product {
        padding: 10px;
        border-radius: 10px;
        outline: none;
        border: none;
        cursor: pointer;
        transition: .2s;
        font-size: 1.2rem;
        background-color: #fff;
        color: #31446e;
    }

    .add-product:hover, 
    .edit-product:hover,
    .erase-product:hover {
        transform: scale(1.1) translateY(-5px);
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
        transition: .2s;
    }

    .add-product:hover {
        background-color: #1c905b;
        color: #fff;
    }

    .edit-product:hover {
        background-color: #1c5a90;
        color: #fff;
    }

    .erase-product:hover {
        background-color: #901c1c;
        color: #fff;
    }

    .product-content {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        flex-direction: column;
    }

    .product-box {
        display: flex;
        justify-content: center;
        background-color: #fff;
        border-radius: 10px;
        margin: 20px;
        width: 80vh;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
        order: -1;
    }

    .input-area {
        display: flex;
        padding: 10px;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-evenly;
    }

    .input-area input {
        border-radius: 10px;
        padding: 10px;
        border: none;
        outline: none;
        margin-top: 10px;
        background-color: #cedeff;
    }

    #product-select, #product-select2, #product-select3, #product-material {
        border-radius: 10px;
        padding: 10px;
        margin-top: 10px;
        width: 200px;
        height: 35px;
        border: none;
        outline: none;
        background-color: #cedeff;
        cursor: pointer;
    }
</style>