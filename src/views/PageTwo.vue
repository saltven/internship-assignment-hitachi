<template>
    <div id="app">
        <HeaderPT/>
        <BodyPT/>
    </div>
</template>

<script>
import HeaderPT from '../components/PT/HeaderPT.vue'
import BodyPT from '../components/PT/BodyPT.vue'

export default {
    setup() {
        return {
            HeaderPT,
            BodyPT,
        }
    }
}

</script>

<style>
</style>