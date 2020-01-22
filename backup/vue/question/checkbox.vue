<template>
  <div class="sv_q_checkbox">
    <div class="sv_q_checkbox_grid" :style="{ 'display': 'grid', 'grid-template-columns': 'repeat(' + question.colCount + ', 1fr' }">
      <label v-for="(item, index) in question.visibleChoices" :key="item.value" :class="getItemClass(item)">
        <input v-if="item == question.selectAllItem"
               v-bind:aria-label="item.locText.renderedHtml"
               v-model="question.isAllSelected"
               type="checkbox"
               :name="question.name"
               :value="question.isAllSelected"
               :id="question.inputId + '_' + index"
               :disabled="question.isReadOnly"
        />
        <input v-if="item != question.selectAllItem"
               v-bind:aria-label="item.locText.renderedHtml"
               v-model="question.renderedValue"
               type="checkbox"
               :name="question.name"
               :value="item.value"
               :id="question.inputId + '_' + index"
               :disabled="question.isReadOnly || !item.isEnabled"
        />
        <span><survey-string :locString="item.locText"/></span>
        <survey-other-choice v-show="question.hasOther && question.renderedValue && question.isOtherSelected"
                             v-if="item.value == question.otherItem.value"
                             :question="question">
        </survey-other-choice>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { QuestionCheckboxModel } from "../../question_checkbox";

export default {
  props: {
    question: Object as () => QuestionCheckboxModel
  },
  methods: {
    getItemClass(item: any) {
      const itemClass = "sv_q_checkbox_item";
      return (this.question.isItemSelected(item)) ? (itemClass + " checked") : itemClass;
    }
  }
}
</script>
