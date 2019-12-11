<template>
  <fieldset>
    <legend v-bind:aria-label="question.locTitle.renderedHtml"></legend>
    <table class="sv_q_matrix">
      <thead v-if="question.showHeader">
      <tr>
        <td v-show="question.hasRows"></td>
        <th v-for="column in question.visibleColumns"><survey-string :locString="column.locText"/></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, rowIndex) in question.visibleRows" class="sv_row">
        <td v-show="question.hasRows"><survey-string :locString="row.locText"/></td>
        <td v-if="question.hasCellText" v-for="(column, columnIndex) in question.visibleColumns" :class="getItemClass(row, column)" v-on:click="function() { cellClick(row, column); }">
          <span>{{question.getCellDisplayLocText(row.name, column).renderedHtml}}</span>
        </td>
        <td v-if="!question.hasCellText" v-for="(column, columnIndex) in question.visibleColumns" :headers="column.locText.renderedHtml">
          <label :class="getItemClass(row, column)">
            <input type="radio" :name="row.fullName" v-model="row.value" :value="column.value" :disabled="question.isReadOnly" :id="question.inputId + '_' + row.name + '_' + columnIndex" v-bind:aria-label="question.locTitle.renderedHtml"/>
            <span class="circle"></span>
            <span class="check"></span>
            <span :style="{ 'display': 'none' }">{{question.locTitle.renderedHtml}}</span>
          </label>
          <label class="sv_q_m_cell_label" :for="question.inputId + '_' + row.name + '_' + columnIndex"></label>
        </td>
      </tr>
      </tbody>
    </table>
  </fieldset>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionMatrixModel } from "../question_matrix";

@Component
export class Matrix extends QuestionVue<QuestionMatrixModel> {
  getItemClass(row:any, column:any) {
    var isChecked = row.value == column.value;
    var cellSelectedClass = this.question.hasCellText ? "sv_q_m_cell_selected" : "checked";
    var cellClass = this.question.hasCellText ? "sv_q_m_cell_text" : "sv_q_m_label";
    let itemClass = cellClass + (isChecked ? " " + cellSelectedClass : "");
    return itemClass;
  }

  cellClick(row:any, column:any) {
    if (this.question.isReadOnly) return;
    row.value = column.value;
  }
}
Vue.component("survey-matrix", Matrix);
export default Matrix;
</script>
