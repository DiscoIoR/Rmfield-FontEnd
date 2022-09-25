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
      <input placeholder="粘贴内容到此处"><br>
      <button type="button">更新</button>
    </div>
  </div>
  <div id="gachaGeneral" class="info-block"></div>
  <div id="gachaByPool" class="info-block"></div>
  <div id="gachaByMonth" class="info-block"></div>
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
        result.gachaByMonthList.forEach(e=>{
          gachaPoolNameList.push(e.pool)
          gachaPoolValList.push(e.count)
        })
        result.gachaByMonthList.forEach(e=>{
          gachaMonthNameList.push(e.month)
          gachaMonthValList.push(e.count)
        })
      })
    }

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
      lastUpdate
    }
  }
}
</script>

<style scoped>
.info-block {
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(3px);
  padding: 0.8em;
  margin: 0.6em;
  width: 17em;
  height: 10em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-family: "Microsoft YaHei UI", sans-serif;
}

.ak-user-info-name{
  font-style: italic;
  font-size: 0.9em;
}

.ak-user-info-val{
  font-style: italic;
}

.info-block input {
  width: 19em;
  height: 1.8em;
  border: rgba(0, 0, 0, 0);
  border-radius: 3px;
  margin-bottom: 0.5em;
  background-color: rgba(255, 255, 255, 0.6);
  transition: 0.2s;
}

.info-block input:hover, .info-block input:focus {
  background-color: rgba(255, 255, 255, 1);
  transition: 0.2s;
  outline: none;
}

.info-block button {
  width: 5em;
  height: 2.1em;
  border: rgba(0, 0, 0, 0);
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.6);
  transition: 0.2s;
}

.info-block button:hover {
  background-color: rgba(255, 255, 255, 0.85);
  transition: 0.2s;
}

.info-block button:active {
  background-color: rgba(255, 255, 255, 1);
}

a {
  text-decoration: none;
  color: rgb(0, 150, 200);
  transition: 0.2s;
}

a:hover {
  color: rgba(80, 180, 255, 1);
  transition: 0.2s;
}
</style>