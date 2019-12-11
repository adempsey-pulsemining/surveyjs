<template>
  <div class="sv_progress">
    <div class="sv_progress_bar" :style="{width: progress}" role="progressbar" aria-valuemin="0" aria-valuemax="100">
      <span>{{survey.progressText}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {Component, Prop} from 'vue-property-decorator'
import {SurveyModel} from '../survey'

@Component
export class Progress extends Vue {
  @Prop() survey: SurveyModel;

  get progress() {
    return this.survey.getProgress() + '%';
  }
}
Vue.component("survey-progress", Progress);
export default Progress;
</script>
