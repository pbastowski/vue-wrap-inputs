import Vue from 'vue'
import App from './app.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify)

Vue.prototype.log = console.log
Vue.prototype.json = (...args) =>
    console.log(...args.map(a => JSON.stringify(a, null, 4)))

window.log = console.log
window.json = Vue.prototype.json

new Vue({
    el: '#app',
    render: h => h(App)
})
