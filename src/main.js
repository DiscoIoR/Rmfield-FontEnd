import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

let token = localStorage.getItem('token')
if(token !== null && localStorage.getItem('username') !== null) {
    await axios({
        url: '/user-api/user/auth/status',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    }).then(res => {
        if (res.data.code !== 0) {
            localStorage.clear()
        }
    })
}
const app = createApp(App);

app.use(router);

app.mount("#app");
