<template>
  <div :style="{overflowX: question.horizontalScroll? 'scroll': ''}">
    <div v-if="question.isAddRowOnTop" :class="question.cssClasses.footer">
      <button type="button" class="sv_matrix_dynamic_button" @click="addRowClick">
        <span>{{question.addRowText}}</span>
        <span></span>
      </button>
    </div>
    <survey-matrixtable :question="question"/>
    <div v-if="question.isAddRowOnBottom">
      <button type="button" class="sv_matrix_dynamic_button" @click="addRowClick">
        <span>{{question.addRowText}}</span>
        <span></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { default as Question } from "./question";

export default {
  mixins: [Question],
  methods: {
    addRowClick() {
      this.question.addRow();
    }
  }
}
</script>
