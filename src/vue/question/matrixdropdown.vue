<template>
  <div class="sv_q_matrixdropdown" :style="{overflowX: question.horizontalScroll? 'scroll': ''}">
    <survey-matrixtable :question="question" />
  </div>
</template>

<script lang="ts">
import { QuestionMatrixDropdownModel } from "../../question_matrixdropdown";

export default {
  props: {
    question: Object as () => QuestionMatrixDropdownModel
  }
}
</script>
