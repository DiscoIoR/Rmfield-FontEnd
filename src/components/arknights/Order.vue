<template>
  <table>
    <thead>
    <tr>
      <th>时间</th>
      <th>项目</th>
      <th>平台</th>
      <th>金额</th>
    </tr>
    </thead>
    <tbody>
    <template v-for="(item) in orderList">
      <tr>
        <td>{{ ts2Date(item.payTime * 1000) }}</td>
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
table {
  height: 94%;
  min-height: 25.6em;
  width: 58.2em;
  margin: 0.6em;
  display: inline-block;
  overflow: hidden;
  text-align: center;
}

table thead, tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

td {
  font-size: 0.95em;
  height: 1.6em;
}

table thead {
  background-color: rgba(255, 255, 255, 0.7);
  height: 2em;
  margin-bottom: 0.2em;
}

table tbody {
  background-color: rgba(255, 255, 255, 0.55);
  display: block;
  height: calc(100% - 2em);
  overflow-y: overlay;
  overflow-x: hidden;
}

table {
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
}

*::-webkit-scrollbar {
  position: absolute;
  right: 5px;
  width: 5px;
  height: 5px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: rgba(100, 100, 100, 0.8);
}
</style>