<template>
    <transition name="loading">
    <div class="loading-mask">
        <div class="spinner"> 
            <i class="fas fa-spinner fa-spin text-light custom-spinner"></i>
        </div>
    </div>
    </transition>
</template>

<script>
export default {
    name: 'loadingPage',
}
</script>

<style>
    .loading-mask {
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        border: none;
        }

    .spinner {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .spinner-icon {
        font-size: 100px;
    }

    .loading-enter {
        opacity: 0;
    }

    .loading-leave-active {
        opacity: 0
    }

    .custom-spinner {
        font-size: 60px;
        color: #cedeff;
    }

</style>