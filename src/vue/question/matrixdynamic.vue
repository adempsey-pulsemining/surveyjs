<template>
  <div class="sv_q_matrixdynamic" :style="{overflowX: question.horizontalScroll ? 'scroll': ''}">
    <div v-if="question.isAddRowOnTop" class="sv_matrix_dynamic_button">
      <input type="button" @click="addRowClick" :value="question.addRowText" />
    </div>
    <survey-matrixtable :question="question" />
    <div v-if="question.isAddRowOnBottom" class="sv_matrix_dynamic_button">
      <input type="button" @click="addRowClick" :value="question.addRowText" />
    </div>
  </div>
</template>

<script lang="ts">
import { QuestionMatrixDynamicModel } from "../../question_matrixdynamic";

export default {
  props: {
    question: Object as () => QuestionMatrixDynamicModel
  },
  methods: {
    addRowClick() {
      this.question.addRow();
    }
  }
}
</script>
