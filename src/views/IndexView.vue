<template>
  <div class="main">
    <header id="header">
      <h1>Rmfield</h1>
      <p>A personal site.<br/>
        Maintained by <a href="https://github.com/DiscoIoR">DiscoloR</a>.</p>
    </header>

    <form id="signin-form" >
      <input type="text" id="username" v-model="username" placeholder="username"/>
      <input type="password" id="password" v-model="password" placeholder="password"/>
      <button type="button" @click="signin">Sign In</button>
    </form>

    <footer id="footer">
<!--#gitignoreline_start-->
<!--#gitignoreline_end-->
    </footer>
  </div>
  <div id="bg"></div>
</template>

<script>

import {onMounted, ref} from "vue";
import axios from 'axios'
import {slideshowBackground} from "../assets/js/slideshowBackground";

export default {
	name: "",
	setup() {

    let username = ref()
    let password = ref()
    async function signin(){
      await axios({
        url: '/user-api/user/auth/signin',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          username: username.value,
          password: password.value
        })
      }).then(res=>{
        if(res.status===200 && res.data.code===0){
          localStorage.setItem('token', res.data.data.token)
        }
      })
    }

    onMounted(() => {
      slideshowBackground()
    })

		return {
			signin,
      username,
      password
		}
	}
}

</script>

<style scoped>
@import "../assets/css/index.css";
</style>
<style>
@import "../assets/css/background.css";
</style>
