<template>
  <div class="bodyHeader">
    <div class="graphic">
      <img src="@/assets/header.png">
    </div>
    <div class="header2">
      <img class="chevron" value="PageOne" src="@/assets/back-chevron.png" @click="onFirstPage">
      <div class="menu1">
        <h1>Add</h1>
      </div>
      <img class="profile-pic" src="@/assets/profile.png">
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      
    }
  },
  methods: {
    onFirstPage() {
      this.$router.push("/");
    },
  }
  
}
</script>


<style scoped>

.graphic {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -90%;
  overflow-x: hidden;
  z-index: -1;
}

.header2 {
    left: 0;
    right: 0;
    margin-top: -70px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
}

h1 {
    font-family: 'Helvetica';
    font-weight: 600;
    color: white;
    font-size: 18px;
}

.chevron {
    width: 20px;
    height: 20px;
}

.menu1 {
  margin: 0px 110px 0px;
  padding-top: 5px;
}


</style>
