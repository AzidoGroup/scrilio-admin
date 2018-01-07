<template>
	<div id="app">
		<router-link to="/main" >Home</router-link>
		<router-link v-if="!auth()" to="/log-in" >Login</router-link>
		<router-link v-if="auth()" to="/log-out" >Log Out</router-link>

		<router-link v-if="auth()" to="/protected" >Protected</router-link>

		<router-view></router-view>
	</div>
</template>

<script>
export default {
	data() {
		return {

		};
	},
	methods: {
		auth() {
			return this.$store.getters['authentication/loggedIn'];
		}
	}
}
</script>

<style lang="scss" scoped>
</style>
