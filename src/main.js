import Vue from 'vue'
import App from './App.vue'

import "./assets/index.scss"

import BigDataTree from "./components/ve-tree.vue";
Vue.component('BigDataTree', BigDataTree)

new Vue({
    el: '#app',
    render: h => h(App)
})