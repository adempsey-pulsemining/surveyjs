<template>
  <fieldset class="sv_qcbc sv_qcbx">
    <legend v-bind:aria-label="question.locTitle.renderedHtml"></legend>
    <div v-for="(item, index) in question.visibleChoices" :key="item.value" :class="getItemClass(item)">
      <label class="sv_q_checkbox_label">
        <input v-if="item == question.selectAllItem" type="checkbox" :name="question.name" :value="isAllSelected" v-model="isAllSelected" :id="question.inputId + '_' + index" :disabled="question.isReadOnly" v-bind:aria-label="item.locText.renderedHtml" class="sv_q_checkbox_control_item">
        <input v-if="item != question.selectAllItem" type="checkbox" :name="question.name" :value="item.value" v-model="question.renderedValue" :id="question.inputId + '_' + index" :disabled="question.isReadOnly || !item.isEnabled" v-bind:aria-label="item.locText.renderedHtml" class="sv_q_checkbox_control_item">
        <span class="checkbox-material">
          <span class="check"></span>
        </span>
        <span class="sv_q_checkbox_control_label">
          <survey-string :locString="item.locText"/>
        </span>
        <survey-other-choice v-show="question.hasOther && question.renderedValue && question.isOtherSelected" v-if="item.value == question.otherItem.value" :question="question"/>
      </label>
    </div>
  </fieldset>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionCheckboxModel } from "../question_checkbox";

@Component
export class Checkbox extends QuestionVue<QuestionCheckboxModel> {
  getItemClass(item: any) {
    var itemClass = "sv_q_checkbox" + (this.question.colCount === 0 ? " sv_q_checkbox_inline" : " sv-q-col-" + this.question.colCount);
    return (this.question.isItemSelected(item)) ? (itemClass + " checked") : itemClass;
  }

  get isAllSelected() {
    return this.question.isAllSelected;
  }

  set isAllSelected(val: boolean) {
    this.question.isAllSelected = val;
  }
}
Vue.component("survey-checkbox", Checkbox);
export default Checkbox;
</script>
