<template>
    <div class="content-page">
        <div class="header-content">
            <div class="page-name">
                <span>{{ title }}</span>
                <i :class="['fas', icon]"></i>
            </div>
            <button class="back-button" @click="goBack()">
                <span>Voltar</span>
                <i class="fas fa-door-open"></i>
            </button>
        </div>
        <div class="button-content">
            <slot name="buttons"></slot>
        </div>
        <hr>
        <div class="scrollable-content">
            <div class="options-content">
                <slot name="content"></slot>
            </div>
            <div class="options-table-area">
                <slot name="table"></slot>
            </div>
        </div>
        <div class="end-of-page">end</div>
    </div>
</template>

<script>

export default {
    name: 'contentPage',
    props: {
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            default: ''
        }

    },
    methods: {
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>

<style>
    .content-page {
        display: flex;
        flex-direction: column;
        background-color: #cedeff;
        width: 100%;
        height: 865px;
        border-radius: 10px;
    } 

    .end-of-page {
        color: #cedeff;
    }

    .header-content {
        display: flex;
        padding: 30px;
        justify-content: space-between;
        /* font-size: 2em;
        gap: 10px; */
    }

    .page-name {
        display: flex;
        /* padding: 30px; */
        /* font-size: 2em; */
        gap: 10px;
    }

    .back-button {
        display: flex;
        gap: 8px;
        border-radius: 10px;
        padding: 10px;
        font-size: 0.5em;
        cursor: pointer;
        border: none;
        outline: none;
        background-color: #cedeff;
        color: #31446e;
        transition: .2s;
    }

    .back-button .fas.fa-door-open {
        display: none;
    }

    .back-button:hover {
        background-color: #bb3737;
        color: #fff;
        transition: .2s;
    }

    .back-button:hover .fas.fa-door-closed {
        display: none;
    }

    .back-button:hover .fas.fa-door-open {
        display: inline-block;
    }

    .button-content {
        display: flex;
        padding-left: 10px;
    }

    .options-content {
        display: flex;
        flex-direction: column;
        font-size: 1.5em;
    }

    .options-table-content {
        display: flex;
        ;
    }

    .scrollable-content {
        overflow-y: auto;
        }
        
    @keyframes slide-in {
    from { transform: translateY(10px) translateX(0px); opacity: 0}
    to { transform: translateY(0px) translateX(0px); opacity: 1}
}

@keyframes slide-out {
    from { transform: translateY(0px); opacity: 1;}
    to { transform: translateY(0px) translateX(0px); opacity: 0;}
}

.slide-enter-active {
    animation: slide-in .2s ease;
}

.slide-leave-active {
    animation: slide-out .2s ease;
}


</style>