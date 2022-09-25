<template>
  <div class="back">
    <NavigationBar/>
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";

export default {
  name: "HomeView",
  components: {
    NavigationBar
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