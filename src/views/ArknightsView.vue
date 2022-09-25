<template>
  <div class="back">
    <NavigationBar/>
    <div class="include mid-layer">
      <router-view/>
    </div>
    <div class="ak-navigation mid-layer">
      <router-link to="/arknights/general" class="ak-route-button left-button">概览</router-link>
      <router-link to="/arknights/gacha" class="ak-route-button">寻访</router-link>
      <router-link to="/arknights/diamond" class="ak-route-button">源石</router-link>
      <router-link to="/arknights/order" class="ak-route-button right-button">充值</router-link>
    </div>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";

export default {
  name: "ArknightsView",
  components: {
    NavigationBar
  }
}
</script>

<style scoped>
@import "../assets/css/arknights/akIndex.css";
</style>