<template>
  <div class="back">
    <div class="include">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArknightsView"
}
</script>

<style scoped>
.back{
  height: 100%;
  width: 100%;
  background-image: url("../assets/images/arknights/bg01.jpg");
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.include{
  background-color: rgba(0,0,0,0.3);
  backdrop-filter: blur(3px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  max-height: 80%;
  padding: 0.7em 0.4em 0.7em 0.4em;
  width: 59.4em;
  overflow-y: auto;
}
@media (max-width: 960px){
  .include{
    width: 39.6em;
  }
}
@media (max-width: 650px){
  .include{
    width: 19.8em;
  }
}
*::-webkit-scrollbar{
  width: 5px;
  height: 5px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: rgba(255,255,255,0.5);
}
</style>