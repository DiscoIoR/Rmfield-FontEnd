<template>
<div id="navigation-bar">
  <div class="user-status-ctrl">
    <div class="username">
      {{ username }}
    </div>
    <div class="division">|</div>
    <div>
      <button class="signout-button" @click="signout">sign out</button>
    </div>
  </div>
</div>
</template>

<script>
import router from "../router";

export default {
  name: "NavigationBar.vue",
  setup(){
    let token = localStorage.getItem('token')
    let username = localStorage.getItem('username')
    function signout(){
      // TODO 发送登出请求

      router.push('/')
    }

    return{
      signout,
      username
    }
  }
}
</script>

<style scoped>
#navigation-bar{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3em;
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(15px);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.user-status-ctrl{
  width: 15em;
  margin-right: 1em;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: rgba(255,255,255,1);
}
.division{
  width: 1em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.username{

}
.signout-button{
  background-color: rgba(0,0,0,0);
  border: none;
  margin: 0;
  padding: 0;
  font-size: 1em;
  color: rgba(255,255,255,1);
  cursor: pointer;
  transition: 0.2s;
}
.signout-button:hover{
  color: rgba(130,200,255);
}
</style>