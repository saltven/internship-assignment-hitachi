<template>
    <div id="app">
        <Overall/>
    </div>
</template>

<script>

import Overall from '../components/PO/Overall.vue'




export default {
  setup() {
    return {
      Overall,
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
 
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 50px;
}


</style>
