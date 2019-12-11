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
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionMatrixDynamicModel } from "../question_matrixdynamic";
import { MatrixDropdownRowModelBase } from "../question_matrixdropdownbase";

@Component
export class MatrixDynamic extends QuestionVue<QuestionMatrixDynamicModel> {
  addRowClick() {
    this.question.addRow();
  }
}
Vue.component("survey-matrixdynamic", MatrixDynamic);
export default MatrixDynamic;
</script>
