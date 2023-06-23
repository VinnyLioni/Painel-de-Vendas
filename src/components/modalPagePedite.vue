<template>
  <div class="modal-page-pedite" v-if="pedShow">
    <div class="modal-content-pedite">
        <div class="modal-header-pedite">
            <div class="modal-title-pedite">
                <span>Manutenção de Pedido</span>
            </div>
        </div>
        <hr>
        <div class="paped-content-pedite">
            <div class="paped-box">
                <div class="input-area-shop-ite">
                    <div class="first-line">
                        <div class="select-channel-ite">
                            <span>Canal de Venda</span>
                            <div class="input-channel-ite">
                                <input type="text">
                                <button class="open-modal">...</button>
                            </div>
                        </div>
                        <div class="select-item-ite">
                            <span>Item</span>
                            <div class="input-item-ite">
                                <input type="text">
                                <button class="open-modal">Acrescentar Item</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="options-table">
            <table>
                <thead class="table-header">
                    <tr>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'modalPagePedite',
    props: {
        pedShow: {
            type: Boolean,
            default: false
        },
    }
}
</script>

<style>
    .modal-page-pedite { 
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba( 0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content-pedite {
        background-color: #cedeff;
        padding: 20px;
        border-radius: 10px;
        font-size: 1rem;
        box-shadow: 2px 2px 8px rgba( 0, 0, 0, 0.2);
    }

    .paped-content-pedite {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        flex-direction: column;
    }
</style>