import Vue from 'vue';
import Vuex from 'vuex';
import authenticationModule from './modules/authentication';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		authentication: authenticationModule,
		food: {
			namespaced: true,
			actions: {
				eat({commit}) {
					commit('EAT');
				},
				stop({commit}) {
					commit('STOP');
				}
			},
			getters: {
				eating: (state) => {
					return state.eating;
				}
			},
			state: {
				eating: false
			},
			mutations: {
				EAT(state) {
					state.eating = true;
				},
				STOP(state) {
					state.eating = false;
				}
			}
		}
	},
	actions: {},
	state: {},
	getters: {},
	mutations: {}
});

const install = (Vue) => {
	Vue.prototype.$store = store;
};

export default {
	store,
	install
};
