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
import router, {signinLocalCheck} from "../router";

export default {
	name: "",
	setup() {

    if (signinLocalCheck()){
      router.push('/home');
    }

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
          localStorage.setItem('username', res.data.data.username)
          let to = '/home'
          let redirect = router.currentRoute.value.query.redirect
          if (redirect){
            to = redirect
          }
          router.push(to)
        }
      })
    }



    onMounted(() => {
      slideshowBackground({
        images: {
          [new URL('../assets/images/index/bg01.jpg', import.meta.url)]: 'center 40%',
          [new URL('../assets/images/index/bg02.jpg', import.meta.url)]: 'center 40%',
          [new URL('../assets/images/index/bg03.jpg', import.meta.url)]: 'center 40%',
          [new URL('../assets/images/index/bg04.jpg', import.meta.url)]: 'center 20%'
        },
        delay: 6000
      })
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
@import "../assets/css/index/index.css";
</style>
<style>
@import "../assets/css/index/background.css";
</style>
