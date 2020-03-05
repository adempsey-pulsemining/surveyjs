<template>
  <div class="sv_main">
		<div class="sv_body" v-if="hasPages">
			<survey-navigation v-if="!survey.isPdfRender && !survey.singlePage && survey.visiblePages.length > 1" :survey="survey"></survey-navigation>
			<div class="sv_page_container" v-if="!survey.singlePage && survey.currentPage.visible">
				<survey-page :survey="survey" :page="survey.currentPage"></survey-page>
			</div>
			<div class="sv_page_container" v-else>
				<survey-page v-for="(page, index) in survey.visiblePages" :key="index" :page="survey.visiblePages[index]" :survey="survey"></survey-page>
			</div>			
			<survey-progress v-if="survey.showProgressBar && !survey.isPdfRender && !survey.singlePage" :survey="survey"></survey-progress>
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
				return this.survey.visiblePages && this.survey.visiblePages.length;
			}
		}
  }
</script>

<style>
	.sv_main {
		height: 100%;
	}

	.sv_page_container {
		overflow-y: scroll;
		flex: 1 1 auto;
		border-bottom: thin solid lightgrey;
	}

	.sv_main .sv_body {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	@media print {
		.sv_main .sv_body {
			display: block;
		}
	}
</style>
