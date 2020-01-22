<template>
  <div class="sv_q_matrix">
    <survey-matrixtable :question="question"></survey-matrixtable>
  </div>
</template>

<script lang="ts">
import { QuestionMatrixModel } from "../../question_matrix";

export default {
  props: {
    question: Object as () => QuestionMatrixModel
  }
}
</script>
