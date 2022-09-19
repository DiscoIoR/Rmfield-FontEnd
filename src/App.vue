<template>
  <router-view/>
</template>

<script>
import {slideshowBackground} from "./assets/js/slideshowBackground";
import {onMounted} from "vue";

export default {
  setup() {
    onMounted(() => {
      slideshowBackground()
    })
  }
}

</script>

<style>
@import "assets/css/background.css";

html {
  width: 100%;
  height: 100%;
}

body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, 1);
}

#app {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0);
}

</style>


  