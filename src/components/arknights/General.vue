<template>
  <div class="info-block">
    <div><span class="ak-user-info-name">Dr.</span><span class="ak-user-info-val">{{ akNickName }}</span></div>
    <div><span class="ak-user-info-name">uid:</span><span class="ak-user-info-val">{{ akUid }}</span></div>
    <div><span class="ak-user-info-name">源石收入: </span><span class="ak-user-info-val">{{ diamondEarning }}</span></div>
    <div><span class="ak-user-info-name">源石支出: </span><span class="ak-user-info-val">{{ diamondCost }}</span></div>
    <div><span class="ak-user-info-name">充值总额: </span><span class="ak-user-info-val">{{ amount }}</span></div>
    <div><span class="ak-user-info-name">数据更新时间: </span><span class="ak-user-info-val">{{ lastUpdate }}</span></div>
  </div>
  <div class="info-block">
    <div>
      <div>
        Step1, <a href="https://ak.hypergryph.com/" target="_blank">官网</a>登录<br>
        Setp2, <a href="https://web-api.hypergryph.com/account/info/hg" target="_blank">获取token</a><br>
        复制全部文本或content
      </div>
    </div>
    <div>
      <input placeholder="粘贴内容到此处" v-model="akTokenStr"><br>
      <div id="do-update">
        <button type="button" @click="updateAkData">更新</button>
        <span id="update-status">{{ updateStatus }}</span></div>
    </div>
  </div>
  <div :id="gachaGeneralId" class="info-block"></div>
  <div :id="gachaByPoolId" class="info-block"></div>
  <div :id="gachaByMonthId" class="info-block"></div>
</template>

<script>
import {onMounted, ref} from "vue";
import {setGachaByMonth, setGachaByPool, setGachaGeneral} from "../../assets/js/akEchartsOption";
import axios from "axios";
import {ts2Date} from "../../assets/js/timestampUtil";

export default {
  name: "General",
  setup() {

    let token = localStorage.getItem('token')

    let akNickName = ref(), akUid = ref(), diamondEarning = ref(), diamondCost = ref(), amount = ref(), lastUpdate = ref(),
        charsCount, gachaPoolNameList = [], gachaPoolValList = [], gachaMonthNameList = [], gachaMonthValList = []
    async function getGeneralData() {
      await axios({
        url: '/user-api/ak/general',
        method: 'get',
        headers: {
          'token': token
        }
      }).then(res => {
        let result = res.data.data
        akNickName.value = result.akNickName
        akUid.value = result.akUid
        diamondEarning.value = result.diamondSum.earning
        diamondCost.value = -result.diamondSum.cost
        amount.value = (result.amount/100).toFixed(2)
        lastUpdate.value = ts2Date(result.lastUpdateTs)
        charsCount = result.charsCount
        gachaPoolNameList = []
        gachaPoolValList = []
        result.gachaByPoolList.forEach(e=>{
          gachaPoolNameList.push(e.pool)
          gachaPoolValList.push(e.count)
        })
        gachaMonthNameList = []
        gachaMonthValList = []
        result.gachaByMonthList.forEach(e=>{
          gachaMonthNameList.push(e.month)
          gachaMonthValList.push(e.count)
        })
      })
    }

    let akTokenStr = ref()
    let updateStatus = ref('')
    function updateAkData(){

      updateStatus.value = '更新中...'

      let akToken
      if (akTokenStr.value[0]==='{'){
        akToken = JSON.parse(akTokenStr.value).data.content
      }else if (akTokenStr.value.substring(0,9)==='\"content\"'){
        akToken = JSON.parse('{'+akTokenStr.value+'}').content
      }else if (akTokenStr.value[0]==='\"' && akTokenStr.value[akTokenStr.value.length-1]==='\"'){
        akToken = akTokenStr.value.substring(1, akTokenStr.value.length-1)
      }else {
        akToken = akTokenStr.value
      }
      axios({
        url: '/user-api/ak',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        data: JSON.stringify({
          'token': akToken
        })
      }).then(res=>{
        if (res.data.code===0){
          updateStatus.value = '数据已更新'
          setDiplayData()
        }
      })

    }

    let gachaGeneralId = ref('gachaGeneral');
    let gachaByPoolId = ref('gachaByPool');
    let gachaByMonthId = ref('gachaByMonth');

    let gachaGeneral;
    let gachaByPool;
    let gachaByMonth;
    async function setDiplayData() {
      await getGeneralData()
      gachaGeneral.setOption({
        series: [
          {
            label: {
              show: true,
              position: 'center',
              formatter: '{total|total}' + '\n\r' + '{active|' + (charsCount.six + charsCount.five + charsCount.four + charsCount.three) + '}',
              rich: {
                total: {
                  fontSize: 16,
                  color: '#00000073'
                },
                active: {
                  fontSize: 20,
                  color: '#000',
                  lineHeight: 44,
                },
              }
            },
            data: [
              {value: charsCount.six, name: '6星'},
              {value: charsCount.five, name: '5星'},
              {value: charsCount.four, name: '4星'},
              {value: charsCount.three, name: '3星'}
            ]
          }
        ]
      })
      gachaByPool.setOption({
        xAxis: [
          {
            data: gachaPoolNameList,
          }
        ],
        series: [
          {
            data: gachaPoolValList
          }
        ]
      })
      gachaByMonth.setOption({
        xAxis: [
          {
            data: gachaMonthNameList,
          }
        ],
        series: [
          {
            data: gachaMonthValList
          }
        ]
      })
    }

    onMounted(() => {
      gachaGeneral = setGachaGeneral()
      gachaByPool = setGachaByPool()
      gachaByMonth = setGachaByMonth()
      setDiplayData()
    })

    return{
      akNickName,
      akUid,
      diamondEarning,
      diamondCost,
      amount,
      lastUpdate,
      akTokenStr,
      updateAkData,
      updateStatus,
      gachaGeneralId,
      gachaByPoolId,
      gachaByMonthId
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/arknights/general.css";
</style>