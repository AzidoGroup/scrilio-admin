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
		this.$store.dispatch('logout');
		this.$router.push('/log-in');
	}
};

</script>

<style lang="scss" scoped>
</style>
