<template>
	<div id="app">
		<h1 id="main-header">Scrilio</h1>
		<div id="main-content">
			<router-link to="/main" >Home</router-link>
			<router-link v-if="!auth()" to="/log-in" >Login</router-link>
			<router-link v-if="auth()" to="/log-out" >Log Out</router-link>
			<router-link v-if="auth()" to="/sites" >Sites</router-link>
			<router-view></router-view>
		</div>
		<div id="main-menu">
			<h3>Content</h3>
			<ul>
				<li>Sites</li>
				<li>Scenes</li>
				<li>Performers</li>
				<li>Tags</li>
			</ul>
			<h3>Sales</h3>
			<ul>
				<li>Tours</li>
				<li>Billing</li>
				<li>Products</li>
				<li>Reports</li>
			</ul>
			<h3>Members</h3>
			<ul>
				<li>Members</li>
			</ul>
			<h3>Settings</h3>
			<ul>
				<li>Setup</li>
				<li>Affiliates</li>
			</ul>
		</div>
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
#app {
	border: 1px solid green;
	margin: 5px;
	padding: 5px;

	#main-header {
		display: block;
		font-weight: normal;
	}

	#main-content {
		border: 1px solid orange;
	}

	#main-menu {
		float: left;
		border: 1px solid purple;
	}
}
</style>
