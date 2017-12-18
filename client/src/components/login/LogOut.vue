<template>
	<div id="logout">
		<h1>Logout</h1>
	</div>
</template>

<script>
import router from '../../router';

export default {
	name: 'logout',
	mounted: function () {
		localStorage.removeItem('token')
		this.$store.commit('LOGOUT_USER');
		this.$router.push('/log-in');
		// router.redirect('/log-in');
	}
};

</script>

<style lang="scss" scoped>
</style>
