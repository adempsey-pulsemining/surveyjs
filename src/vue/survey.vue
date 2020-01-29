<template>
  <div class="sv_main">
		<div class="sv_body" v-if="hasPages">
			<survey-navigation v-if="!survey.isPdfRender" :survey="survey"></survey-navigation>
			<survey-page :survey="survey" :page="survey.currentPage"></survey-page>
			<survey-progress v-if="survey.showProgressBar && !survey.isPdfRender" :survey="survey"></survey-progress>
			<survey-controls v-if="!survey.isPdfRender" :survey="survey"></survey-controls>
		</div>
		<div v-else class="sv_empty">
			<span>There are no pages in the survey.</span>
		</div>
  </div>
</template>

<script>
  import SurveyNavigation from "./navigation.vue";
  import SurveyPage from "./page.vue";
	import SurveyControls from "./controls.vue";
	import SurveyProgress from "./progress.vue";

  export default {
		name: "survey",
    components: {
      SurveyNavigation,
      SurveyPage,
			SurveyControls,
			SurveyProgress
    },
    props: {
			survey: {  
				type: Object,
				required: true
			}
		},
		computed: {
			hasPages() {
				return this.survey.pages && this.survey.pages.length;
			}
		}
  }
</script>

<style>
	.sv_main {
		height: 100%;
	}

	.sv_main .sv_body {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
