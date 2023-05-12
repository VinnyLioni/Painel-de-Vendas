<template>
  <div class="options-contentvue" @click='setGoTo()'>
    <div class="option-row">
        <span>{{ optiontitle }}</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'optionsContent',
    props: {
        optiontitle: {
            type: String,
            required: true
        }
    },
    methods: {
        setGoTo(){
            this.$emit('goTo')
        }
    }
}
</script>

<style>
    .options-contentvue {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 1.3em;
    }

    .option-row {
        padding: 40px;
        margin: 10px;
        background-color: #ffffffff;
        border-radius: 10px;
        cursor: pointer;
        transition: .2s;
    }

    .option-row:hover {
        background-color: #31446e;
        color: #cedeff;
        transform: translateY(-5px);
        transition: .2s;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
        margin: 10px;
    }
</style>