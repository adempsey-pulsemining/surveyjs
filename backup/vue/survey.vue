<template>
  <div class="sv_main">
    <div v-if="hasTitle" class="sv_header">
      <h3><survey-string :locString="survey.locTitle"/></h3>
    </div>
    <div class="sv_body">
      <survey-navigation v-if="survey.isNavigationButtonsShowing === 'top'" :survey="survey"></survey-navigation>
      <survey-page :id="survey.currentPage.id" :survey="survey" :page="survey.currentPage" />
      <survey-timerpanel v-if="survey.isTimerPanelShowingOnBottom" :survey="survey" />
      <survey-progress style="margin-top: 1em" v-if="survey.isShowProgressBarOnBottom" :survey="survey" />
      <survey-navigation v-if="survey.isNavigationButtonsShowing === 'bottom'" :survey="survey"></survey-navigation>
    </div>
  </div>
</template>

<script lang="ts">
import { VueSurveyModel } from "./surveyModel"

export default {
  props: {
    survey: Object as () => VueSurveyModel
  },
  methods: {
    forceUpdate() {
      this.$forceUpdate();
    }
  },
  mounted(): void {
    var el = this.$el;
    if (el && this.survey) this.survey.doAfterRenderSurvey(el);
    this.survey.renderCallback = this.forceUpdate;
    this.survey.startTimerFromUI();
  },
  beforeDestroy(): void {
    this.survey.stopTimer();
    this.survey.renderCallback = undefined;
  },
  computed: {
    hasTitle() {
      return !!this.survey.title && this.survey.locTitle && this.survey.showTitle;
    }
  }
}
</script>
