<template>
	<div id="site-item-edit">
		<h1>Edit Site: {{site.name}}</h1>
	</div>
</template>

<script>

export default {
	name: 'site-item-edit',
	props: ['id'],
	data() {
		return {
			site: {}
		}
	},
	created() {

		this.$api.get('/api/v1/sites/' +  this.id)
			.then(response => {
				this.site = response.data;
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
