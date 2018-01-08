
require('./sass/global.scss');

import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import App from './App.vue';
import router from './router.js';
import Store from './store/index.js';

import {api, admin} from './lib/http-clients.js';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Store);

// add the http clients to the Vue prototype so they can be accessed from the components
Vue.prototype.$api = api;
Vue.prototype.$admin = admin;

new Vue({
	el: '#app',
	router,
	render: cnxt => cnxt(App)
});
