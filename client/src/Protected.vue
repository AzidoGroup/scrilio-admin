<template>
	<div id="main">
		<h1>This should be protected</h1>
		<p>
			{{message}}
		</p>
	</div>
</template>

<script>
export default {
	data() {
		return {
			message: 'Some silly message'
		};
	},
	beforeCreate() {
		this.$http.get('http://localhost:8090/user')
			.then(result => {
				console.log(result.body);
			})
	}
};
</script>

<style lang="scss" scoped>
</style>
