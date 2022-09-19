<template>
  <div class="back">
    <router-view/>
  </div>
</template>

<script>


export default {
  name: "HomeView",
  setup() {

  }
}
</script>

<style scoped>
  .back{
    height: 100%;
    width: 100%;
    background-image: url("../assets/images/home/bg01.jpg");
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>