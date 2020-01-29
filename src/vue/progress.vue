<template>
	<div class="sv_progress">
		<span>{{progressText}}</span>
		<b-progress :max="survey.pages.length" :value="survey.currentPageIndex + 1" height="5px"></b-progress>
	</div>
</template>

<script>
	import { BProgressBar } from "bootstrap-vue/src/components/progress";
	import { BProgress } from "bootstrap-vue/src/components/progress";

	export default {
		name: "survey-progress",
		components: {
			BProgress,
			BProgressBar
		},
		props: {
			survey: {
				type: Object
			}
		},
		computed: {
			progressText() {
				return "Page " + (this.survey.currentPageIndex + 1) + " of " + this.survey.pages.length;
			}
		}
	}
</script>

<style>
	.sv_progress div[role="progressbar"] {
		transition: none;
	}

	.sv_progress > span {
		padding: 5px;
	}
</style>
