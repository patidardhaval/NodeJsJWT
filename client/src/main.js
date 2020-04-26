import Vue from 'vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';


Vue.use(new VueSocketIO({
    debug: false,
    connection: SocketIO('https://nseind.herokuapp.com', { transports: ['websocket'], upgrade: false }), //options object is Optional
    // connection: 'http://localhost:3000',
    vuex: {
        store
    }
}))

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')