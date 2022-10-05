<template>
<div id="navigation-bar">
  <div class="home">
    <button @click="home" v-if="showHomeButton()">Home</button>
  </div>
  <div class="user-status-ctrl">
    <div class="username">
      {{ username }}
    </div>
    <div class="division">|</div>
    <div>
      <button @click="signout">Sign Out</button>
    </div>
  </div>
</div>
</template>

<script>
import router from "../router";
import axios from "axios";

export default {
  name: "NavigationBar.vue",
  setup(){

    function showHomeButton(){
      return router.currentRoute.value.fullPath !== '/home';
    }
    function home(){
      router.push('/home')
    }

    let token = localStorage.getItem('token')
    let username = localStorage.getItem('username')
    function signout(){
      axios({
        url: '/user-api/user/auth/signout',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        data: JSON.stringify({
          'token': token
        })
      }).then(res=>{
        if (res.data.code===0){
          localStorage.clear()
          router.push('/')
        }
      })
    }

    return{
      showHomeButton,
      home,
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
  justify-content: space-between;
  align-items: center;
}
.home{
  width: 5em;
  margin-left: 2em;
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
button{
  background-color: rgba(0,0,0,0);
  border: none;
  margin: 0;
  padding: 0;
  font-size: 1em;
  color: rgba(255,255,255,1);
  cursor: pointer;
  transition: 0.2s;
}
button:hover{
  color: rgba(130,200,255);
}
</style>