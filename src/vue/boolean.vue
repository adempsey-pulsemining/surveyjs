<template>
  <div class="sv_qcbc sv_qbln">
    <label :class="itemClass">
      <input type="checkbox" :name="question.name" :value="question.checkedValue" v-model="question.checkedValue" :id="question.inputId"  :indeterminate.prop="question.isIndeterminate" :disabled="question.isReadOnly" v-bind:aria-label="question.locTitle.renderedHtml"/>
      <span class="checkbox-material"><span class="check"></span></span>
      <span><survey-string :locString="question.locDisplayLabel"/></span>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionBooleanModel } from "../question_boolean";

@Component
export class Boolean extends QuestionVue<QuestionBooleanModel> {
  get itemClass() {
    let isChecked = this.question.checkedValue;
    let itemClass = "sv_q_checkbox" + (isChecked ? " checked" : "");
    return itemClass;
  }
}
Vue.component("survey-boolean", Boolean);
export default Boolean;
</script>
