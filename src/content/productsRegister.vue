<template>
<div class="products-register">
    <content-page :title='title' :icon='icon'> TESTE
        <div class="button-content" slot="buttons">
            <div class="button-area">
                <button class="add-product" @click="addProduct" v-if="mode===''">Cadastrar</button>
                <button class="edit-product">Editar</button>
                <button class="erase-product">Excluir</button>
            </div>
        </div>
        <div class="product-content" slot="content" v-if="mode==='save' || mode==='edit'">
            <div class="product-box">
                <div class="input-area-product">
                    <div class="first-line">
                        <div class="product-name">
                            <span>Nome do Item</span>
                            <input type="text" v-model="product.des">
                        </div>
                        <div class="product-name2">
                            <span>Nome Completo</span>
                            <input type="text" v-model="product.des2">
                        </div>
                        <div class="product-type">
                            <span>Família de Produto</span>
                            <select id="product-select" v-model="product.gru">
                                <option value="V">Videogames</option>
                                <option value="E">Esculturas</option>
                                <option value="U">Utilidades</option>
                            </select>
                        </div>
                    </div>
                    <div class="second-line">
                        <div class="product-type">
                            <span>Montável</span>
                            <select id="product-select2" v-model="product.mount">
                                <option value="S">Sim</option>
                                <option value="N">Não</option>
                            </select>
                        </div>
                        <div class="product-type2">
                            <span>Tinta</span>
                            <select id="product-select3" v-model="product.paint">
                                <option value="S">Sim</option>
                                <option value="N">Não</option>
                            </select>
                        </div>
                        <div class="product-type3">
                            <div class="product-material">
                                <span>Material</span>
                                <select id="product-material" v-model="product.material">
                                    <option value="P">PLA</option>
                                    <option value="PG">PETG</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="third-line">
                        <div class="product-time">
                            <span>Tempo</span>
                            <input type="text" class="time-input" placeholder="HH:MM" v-model="product.time">
                        </div>
                        <div class="product-cost-material">
                            <span>Material (g)</span>
                            <input type="number" v-model="product.materialCost">
                        </div>
                        <div class="product-cost-value">
                            <span>Custo</span>
                            <input type="text" v-model="product.cost">
                        </div>
                    </div>
                    <div class="fourth-line">
                        <div class="finish-session">
                            <button class="save-button" @click="saveProduct">Salvar</button>
                            <button class="erase-button" v-if="mode === 'edit'" @click="deleteProduct">Excluir</button>
                            <button class="cancel-button" @click="cleanPage">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="options-table" slot="table">
            <table>
                <thead class="table-header">
                    <tr>
                        <th v-for="header in headers" :key="header.id">{{ header.label }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product,id) in products" :key="id" @click="selectProduct(id)">
                        <td>{{ product.id }}</td>
                        <td>{{ product.des }}</td>
                        <td>
                            {{  product.gru === 'V' ? 'Videogame' :
                                product.gru === 'E' ? 'Esculturas' :
                                product.gru === 'U' ? 'Utilidades' :
                                product.gru
                            }}
                        </td>
                        <td>
                            {{
                                product.material === 'P' ? 'PLA' :
                                product.material === 'PG' ? 'PETG' :
                                product.material
                            }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </content-page>
</div>
</template>

<script>
import contentPage from '@/components/contentPage.vue'
import "@/style/table.css"

export default {
    name: 'productsRegister',
    components: { contentPage },
    data(){
        return {
            title: 'Cadastro de Produtos',
            icon: 'fas fa-box',
            mode: '',
            id: null,
            selected: false,
            product: {
                des: null,
                des2: null,
                gru: null,
                mount: null,
                paint: null,
                material: null,
                time: null,
                materialCost: null,
                cost: null,
                selected: false
            },
            products: {},
            headers: [
                { id: 1, label: 'Código'},
                { id: 2, label: 'Descrição'},
                { id: 3, label: 'Família'},
                { id: 4, label: 'Material'},
            ]
        }
    },
    methods: {
        addProduct(){
            this.mode='save'
        },
        saveProduct(){
            if (this.product.id) {
                const productId = this.product.id;
                const updatedProduct = { ...this.product }
                delete updatedProduct.id

                this.$http.put(`mpalmo/${productId}.json`, updatedProduct)
                    .then(res=>{
                        console.log('Item atualizado com Sucesso', res)
                        this.loadProducts()
                        this.mode=''
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar item', error)
                    })
            } else {
                this.$http.post('mpalmo.json', this.product)
                    .then(res=>{
                        console.log('Item inserido com sucesso', res)
                        this.loadProducts()
                        this.mode=''
                    })
                    .catch(error=>{
                        console.log('Erro ao inserir item', error)
                    })
            }
        },
        loadProducts(id){
            this.id=id
            this.$http('mpalmo.json').then(res => {
                const obj = Object.keys(res.data).map(key => {
                    return{id: key, ...res.data[key]}
                })
                this.products = obj.map(obj => {
                    return {...obj, selected: false}
                })
            })

        },
        selectProduct(id,mode='edit'){
            this.products.map(obj => {
                obj.selected = false
            })
            this.product = { ...this.products[id]}
            this.id=id
            this.products[id].selected=!this.products[id].selected
            this.mode=mode
        },
        deleteProduct(){
            const finalUrl = `/${this.product.id}.json`
            this.$http.delete(`/mpalmo${finalUrl}`)
                .then(()=>{
                    this.loadProducts()
                    this.cleanPage()
                })
        },
        cleanProduct(obj) {
            Object.keys(obj).forEach(prop => {
                obj[prop]=null
            })
        },
        cleanPage(){
            this.mode=''
            this.cleanProduct(this.product)

            this.products.forEach(obj => {
                obj.selected=false
            })
        }
    },
    mounted(){
        this.loadProducts()
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
        padding: 20px
    }

    .input-area-product {
        display: flex;
        padding: 10px;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-evenly;
    }

    .input-area-product input {
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
        width: 182px;
        height: 35px;
        border: none;
        outline: none;
        background-color: #cedeff;
        cursor: pointer;
    }

    .product-name, .product-name2, .product-type,
     .product-type2, .product-type3, .product-type3,
      .product-time, .product-cost-material, .product-cost-value, .product-material {
        display: flex;
        flex-direction: column;
        align-content: center;
      }

</style>