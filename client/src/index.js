
require('./sass/global.scss');

import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './App.vue';

import router from './router.js';
import Store from './store.js';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Store);

new Vue({
	el: '#app',
	router,
	render: cnxt => cnxt(App)
});
