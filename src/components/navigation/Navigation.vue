<template>
  <div class="navigation">
    <div class="last-block route-block route-text" @click="lastN"  v-if="nLog.length>1">
      &lt;
    </div>
    <div class="next">
      <template v-for="(value,key) in nLog[nLog.length-1]" :key="key">
        <div class="next-block route-block route-text" @click="doRoute(value)" v-if="getRouteText(key, value)==='string'">
          {{ key }}
        </div>
        <div class="next-block route-block route-text" @click="nextN(value)" v-else>
          {{ key }}
        </div>
      </template>
    </div>

  </div>
</template>

<script>
import router from "../../router";
import {ref} from "vue";

export default {
  name: "Navigation",
  setup() {
    let abcd = {xxx:"/ffff"}
    let Toolbox = {TimestampTool : "/tstool", HttpTool: "/httptool", abcd}
    let rootN = {Arknights: "/ark", Toolbox}
    let nLog = ref([rootN])

    function getRouteText(key, value) {
      if (typeof value === "string") {
        return "string"
      } else {
        return "obj"
      }
    }

    function nextN(value) {
      nLog.value.push(value)
    }

    function lastN(){
      nLog.value.pop()
    }

    function doRoute(path) {
      router.push(path)
    }

    return {
      nLog,
      getRouteText,
      nextN,
      lastN,
      doRoute
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/navigation.css";
</style>