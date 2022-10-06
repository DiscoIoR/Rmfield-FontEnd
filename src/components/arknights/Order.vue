<template>
  <table>
    <thead>
    <tr>
      <th class="column1">时间</th>
      <th>项目</th>
      <th>平台</th>
      <th>金额</th>
    </tr>
    </thead>
    <tbody>
    <template v-for="(item) in orderList">
      <tr>
        <td class="column1">{{ ts2Date(item.payTime * 1000) }}</td>
        <td>{{ item.productName }}</td>
        <td>{{ item.platform }}</td>
        <td>¥{{ (item.amount/100).toFixed(2) }}</td>
      </tr>
    </template>
    </tbody>
  </table>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import {ts2Date} from "../../assets/js/timestampUtil";

export default {
  name: "Order",
  setup(){
    let token = localStorage.getItem('token')
    let orderList = ref([])
    axios({
      url: '/user-api/ak/order',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    }).then(res => {
      if (res.data.code === 0) {
        orderList.value = res.data.data.orderList
      }
    })

    console.log(orderList.value)

    return{
      ts2Date,
      orderList
    }
  }
}
</script>

<style scoped>
@import "@/assets/css/arknights/akHistoryTable.css";

.column1 {
  font-size: 0.9em;
}
</style>