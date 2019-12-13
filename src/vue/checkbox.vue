<template>
  <fieldset class="sv_q_checkbox">
    <legend v-bind:aria-label="question.locTitle.renderedHtml"></legend>
    <div v-for="(item, index) in question.visibleChoices" :key="item.value" :class="getItemClass(item)">
      <label class="sv_q_checkbox_label">
        <input v-if="item == question.selectAllItem"
               v-bind:aria-label="item.locText.renderedHtml"
               v-model="isAllSelected"
               type="checkbox"
               :name="question.name"
               :value="isAllSelected"
               :id="question.inputId + '_' + index"
               :disabled="question.isReadOnly"
               class="sv_q_checkbox_control_item">
        <input v-if="item != question.selectAllItem"
               v-bind:aria-label="item.locText.renderedHtml"
               v-model="question.renderedValue"
               type="checkbox"
               :name="question.name"
               :value="item.value"
               :id="question.inputId + '_' + index"
               :disabled="question.isReadOnly || !item.isEnabled"
               class="sv_q_checkbox_control_item">
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
import { default as Question } from "./question";

export default {
  mixins: [Question],
  methods: {
    getItemClass(item: any) {
      let itemClass = "sv_q_checkbox" + (this.question.colCount === 0 ? " sv_q_checkbox_inline" : " sv-q-col-" + this.question.colCount);
      return (this.question.isItemSelected(item)) ? (itemClass + " checked") : itemClass;
    }
  },
  computed: {
    isAllSelected: {
      get() {
        return this.question.isAllSelected;
      },
      set(val: boolean) {
        this.question.isAllSelected = val;
      }
    }
  }
}
</script>
