<template>
  <div class="sv_main">
    <survey-navigation :survey="survey"></survey-navigation>
    <survey-page :survey="survey" :page="survey.currentPage"></survey-page>
    <survey-controls :survey="survey"></survey-controls>
  </div>
</template>

<script>
  import SurveyNavigation from "./navigation.vue";
  import SurveyPage from "./page.vue";
  import SurveyControls from "./controls.vue"

  export default {
    components: {
      "survey-navigation": SurveyNavigation,
      "survey-page": SurveyPage,
      "survey-controls": SurveyControls
    },
    props: {
      survey: Object
    }
  }
</script>
