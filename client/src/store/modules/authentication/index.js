import Vue from 'vue';
import VueLocalStorage from 'vue-ls';

import mutations from './mutations.js';
import getters from './getters.js';
import actions from './actions.js';

const TOKEN_NAME = 'token_key';

Vue.use(VueLocalStorage, {namespace: 'scrl_admin_'});

const state = {
	token: Vue.ls.get(TOKEN_NAME),
	loggedIn: Vue.ls.get(TOKEN_NAME)
};

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
};
