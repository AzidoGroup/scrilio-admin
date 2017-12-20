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
	}
};
</script>

<style lang="scss" scoped>
</style>
