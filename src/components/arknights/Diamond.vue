<template>
  <table>
    <thead>
    <tr>
      <th class="column1">时间</th>
      <th class="column2">项目</th>
      <th class="column3">平台</th>
      <th class="column4">变更</th>
      <th class="column5">剩余</th>
    </tr>
    </thead>
    <tbody>
    <template v-for="(item) in diamondList">
      <tr>
        <td class="column1">{{ ts2Date(item.ts * 1000) }}</td>
        <td class="column2">{{ item.operation }}</td>
        <td class="column3">{{ item.platform }}</td>
        <td class="column4">{{ item.changeNum }}</td>
        <td class="column5">{{ item.afterNum }}</td>
      </tr>
    </template>
    </tbody>
  </table>
</template>

<script>
import {ts2Date} from "../../assets/js/timestampUtil";
import {ref} from "vue";
import axios from "axios";

export default {
  name: "Diamond",
  setup(){

    let token = localStorage.getItem('token')
    let diamondList = ref([])
    axios({
      url: '/user-api/ak/diamond',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    }).then(res => {
      if (res.data.code === 0) {
        diamondList.value = res.data.data.diamondList
      }
    })

    return{
      ts2Date,
      diamondList
    }
  }
}
</script>

<style scoped>
@import "@/assets/css/arknights/akHistoryTable.css";

.column1 {
  font-size: 0.9em;
  width: 25%;
}
.column2 {
  width: 28%;
}
.column3{
  width: 20%;
}
.column4{
  width: 12%;
}
.column5{
  width: 15%;
}
</style>