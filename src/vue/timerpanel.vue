<template>
  <div>{{text}}</div>
</template>

<script lang="ts">
import { VueSurveyModel } from "./surveyModel"

export default {
  props: {
    survey: Object as () => VueSurveyModel
  },
  computed: {
    text() {
      return this.survey.timerInfoText;
    }
  }
}
</script>
