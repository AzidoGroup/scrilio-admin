<template>
	<div id="logout">
		<h1>Logout</h1>
	</div>
</template>

<script>

export default {
	name: 'logout',
	mounted: function () {
		this.$store.dispatch('authentication/logout');
		this.$router.push('/log-in');
	}
};

</script>

<style lang="scss" scoped>
</style>
