<template>
  <div class="main">
    <header id="header">
      <h1>Rmfield</h1>
      <p>A personal site.<br/>
        Maintained by <a href="https://github.com/DiscoIoR">DiscoloR</a>.</p>
    </header>

    <form id="signup-form" method="post" action="#">
      <input type="text" name="email" id="username" placeholder="Username"/>
      <input type="password" name="email" id="password" placeholder="Password"/>
      <button type="button">Sign Up</button>
    </form>

    <footer id="footer">
<!--#gitignoreline_start-->
<!--#gitignoreline_end-->
    </footer>
  </div>

	<div id="bg"></div>
</template>

<script>
import "../assets/css/index.css"
import {onMounted} from "vue";
import {slideshowBackground} from "../assets/js/SlideshowBackground";

export default {
	name: "",
	setup() {



    onMounted(()=>{
      slideshowBackground()
    })

		return {
			
		}
	}
}

</script>


