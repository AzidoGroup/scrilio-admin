// require('./sass/_global.scss');
require('./sass/index.scss');

import Vue from 'vue';
// import VueResource from 'vue-resource';
// import VueRouter from 'vue-router';
import App from './App.vue';
// import routes from './routes.js';

// Vue.use(VueResource);
// Vue.use(VueRouter);

// const router = new VueRouter({
// routes
// });

new Vue({
	el: '#app',
	render: cnxt => cnxt(App)
});
