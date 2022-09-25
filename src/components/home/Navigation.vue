<template>
  <div class="navigation">
    <div class="last-block route-block route-text" @click="lastN"  v-if="nLog.length>1">
      &lt;
    </div>
    <div class="next">
      <template v-for="(value,key) in nLog[nLog.length-1]" :key="key">
        <div class="next-block route-block route-text" @click="doRoute(value)" v-if="getRouteText(key, value)==='string'" v-show="key!=='__displayTag__'">
          {{ key }}
        </div>
        <div class="next-block route-block route-text" @click="nextN(value)" v-else>
          {{ value.__displayTag__===undefined? key:value.__displayTag__ }}
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
    let rootN = {Arknights: "/arknights/general"}
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
@import "../../assets/css/home/navigation.css";
</style>