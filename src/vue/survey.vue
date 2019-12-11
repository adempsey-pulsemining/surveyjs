<template>
  <div class="sv_main">
    <div class="sv_container">
      <div v-if="hasTitle" class="sv_header"><h3><survey-string :locString="survey.locTitle"/></h3></div>
      <div class="sv_body">
        <survey-page :id="survey.currentPage.id" :survey="survey" :page="survey.currentPage" />
        <survey-timerpanel v-if="survey.isTimerPanelShowingOnBottom" :survey="survey" />
        <survey-progress style="margin-top: 1em" v-if="survey.isShowProgressBarOnBottom" :survey="survey" />
        <input type="button" :value="survey.pagePrevText" v-show="!survey.isFirstPage && survey.isShowPrevButton" class="sv_prev_btn" @click="prevPage"/>
        <input type="button" :value="survey.pageNextText" v-show="!survey.isLastPage" class="sv_next_btn" @click="nextPage"/>
        <input v-if="survey.isEditMode" type="button" :value="survey.completeText" v-show="survey.isLastPage" class="sv_complete_btn" @click="completeLastPage"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { VueSurveyModel as SurveyModel } from "./surveyModel";

@Component
export class Survey extends Vue {
  @Prop() survey: SurveyModel;

  forceUpdate() {
    this.$forceUpdate();
  }

  constructor() {
    super();
  }

  mounted() {
    var el = this.$el;
    if (el && this.survey) this.survey.doAfterRenderSurvey(el);
    this.survey.renderCallback = this.forceUpdate;
    this.survey.startTimerFromUI();
  }

  beforeDestroy() {
    this.survey.stopTimer();
    this.survey.renderCallback = undefined;
  }

  get hasTitle() {
    return !!this.survey.title && this.survey.locTitle && this.survey.showTitle;
  }

  get hasCompletedPage() {
    return this.survey.showCompletedPage && this.survey.state === "completed";
  }

  start() {
    this.survey.start();
  }

  prevPage() {
    this.survey.prevPage();
  }

  nextPage() {
    this.survey.nextPage();
  }

  completeLastPage() {
    this.survey.completeLastPage();
  }

  doTrySaveAgain() {
    this.survey.doComplete();
  }
}

Vue.component("survey", Survey);
export default Survey;
</script>
