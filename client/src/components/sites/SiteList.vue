<template>
	<div id="sitelist">
		<h1>SiteList - {{count}}</h1>
		<li v-for="site in sites">
			{{site.id}} - {{site.name}}
		</li>

	</div>
</template>

<script>

export default {
	name: 'sitelist',
	data() {
		return {
			count: 0,
			sites: []
		}
	},
	created() {
		this.$api.get('/api/v1/sites')
			.then(response => {
				this.count = response.data.length;
				this.sites = response.data;
			});
	}
};
</script>

<style lang="scss" scoped>
#sitelist {
	border: 1px solid blue;
	margin: 5px;
	padding: 5px;
}
</style>
