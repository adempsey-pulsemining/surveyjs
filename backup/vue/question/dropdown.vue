<template>
  <div class="sv_q_dropdown">
    <div v-if="!question.isReadOnly">
      <select :id="question.inputId" v-model="value" class="sv_q_dropdown_select" v-bind:aria-label="question.locTitle.renderedHtml">
        <option v-if="question.showOptionsCaption" value>{{question.optionsCaption}}</option>
        <option v-for="item in question.visibleChoices" :value="item.value" :disabled="!item.isEnabled">{{item.text}}</option>
      </select>
    </div>
    <div v-else class="readonly">{{isOtherSelected ? question.otherText : question.displayValue}}</div>
    <survey-other-choice v-show="isOtherSelected" :question="question"></survey-other-choice>
  </div>
</template>

<script lang="ts">
import { QuestionDropdownModel } from "../../question_dropdown";

export default {
  props: {
    question: Object as () => QuestionDropdownModel
  },
  computed: {
    value: {
      get() {
        return !this.question.isEmpty() ? this.question.renderedValue : "";
      },
      set(newVal: any) {
        this.question.renderedValue = newVal === "" ? undefined : newVal;
      }
    },
    isOtherSelected() {
      return this.question.hasOther && this.question.isOtherSelected;
    }
  }
}
</script>
