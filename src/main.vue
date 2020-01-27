<template>
  <survey v-if="survey" :survey="survey"></survey>
</template>

<script>
  export default {
    props: {
      survey: Object
		}
  }
</script>

<style>
  @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
  @import "../node_modules/bootstrap-vue/dist/bootstrap-vue.min.css";
	@import "main.scss";
	
	:host {
		display: block;
	}
</style>
