<template>
  <div class="user-register">

  </div>
</template>

<script>
import { goToLink } from '@/utils/utils'

export default {
    name: 'userRegister',
    methods: {
        navigateTo(link){
            goToLink(link, this)
        }
    }
}
</script>

<style>

</style>