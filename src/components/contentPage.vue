<template>
    <div class="content-page">
        <div class="header-content">
            <span>{{ title }}</span>
            <i :class="['fas', icon]"></i>
        </div>
        <hr>
        <div class="scrollable-content">
            <div class="options-content">
                <slot name="content"></slot>
            </div>
        </div>
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

    .header-content {
        display: flex;
        padding: 30px;
        font-size: 2em;
        gap: 10px;
    }

    .options-content {
        display: flex;
        flex-direction: row;
        font-size: 1.5em;
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