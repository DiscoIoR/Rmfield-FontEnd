<template>
  <table>
    <thead>
    <tr>
      <th class="column1">时间</th>
      <th class="column2">卡池</th>
      <th class="column3">角色</th>
      <th class="column4">
        <select v-model="filterRatiry" class="rarity-select">
          <option value='0'>All</option>
          <option value='5'>6星</option>
          <option value='4'>5星</option>
          <option value='3'>4星</option>
          <option value='2'>3星</option>
        </select>
      </th>
    </tr>
    </thead>
    <tbody>
    <template v-for="(item) in gachaList">
      <tr v-if="item.rarity===parseInt(filterRatiry) || parseInt(filterRatiry)===0"
          :class="[
              {six_rarity:item.rarity===5},
              {five_rarity:item.rarity===4},
              {four_rarity:item.rarity===3},
              {three_rarity:item.rarity===2}]">
        <td class="column1">{{ ts2Date(item.ts * 1000) }}</td>
        <td class="column2">{{ item.pool }}</td>
        <td class="column3">{{ item.name }}<span class="new-tag">{{ item.isNew ? '【New】' : '' }}</span></td>
        <td class="column4">{{ item.rarity + 1 }}星</td>
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
  name: "Gacha",
  setup() {

    let token = localStorage.getItem('token')
    let gachaList = ref([])
    axios({
      url: '/user-api/ak/gacha',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    }).then(res => {
      if (res.data.code === 0) {
        gachaList.value = res.data.data.gachaList
      }
    })

    let filterRatiry = ref(0)

    return {
      ts2Date,
      gachaList,
      filterRatiry
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


.column1 {
  font-size: 0.9em;
}

.column2 {

}

.column3 {

}

.column4 {
  width: 20%;
}

.rarity-select {
  color: rgba(0, 0, 0, 1);
  border-radius: 3px;
  font-size: 0.9em;
  background-color: rgba(0, 0, 0, 0.1);
}

.new-tag {
  font-size: 0.7em;
  color: rgba(255, 0, 0, 1);
}

.six_rarity {
  color: rgba(255, 91, 32, 1);
  text-shadow: 0.04em 0.02em rgba(0, 0, 0, 0.1);
}

.five_rarity {
  color: rgb(255, 224, 34);
  text-shadow: 0.04em 0.02em rgba(0, 0, 0, 0.1);
}

.four_rarity {
  color: rgba(130, 90, 255);
  text-shadow: 0.04em 0.02em rgba(0, 0, 0, 0.1);
}

.three_rarity {
  color: rgba(0, 0, 0, 1);
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