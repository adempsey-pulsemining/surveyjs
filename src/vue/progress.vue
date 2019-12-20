<template>
  <div class="sv_progress">
    <div class="sv_progress_bar" :style="{width: progress}" role="progressbar" aria-valuemin="0" aria-valuemax="100">
      <span>{{survey.progressText}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { VueSurveyModel } from "./surveyModel"

export default {
  props: {
    survey: Object as () => VueSurveyModel
  },
  computed: {
    progress() {
      return this.survey.getProgress() + '%';
    }
  }
}
</script>
