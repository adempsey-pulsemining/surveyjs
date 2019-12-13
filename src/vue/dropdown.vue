<template>
  <div class="sv_q_dropdown">
    <div v-if="!question.isReadOnly" class="sv_select_wrapper">
      <select :id="question.inputId" v-model="value" class="sv_q_dropdown_control" v-bind:aria-label="question.locTitle.renderedHtml">
        <option v-if="question.showOptionsCaption" value>{{question.optionsCaption}}</option>
        <option v-for="item in question.visibleChoices" :value="item.value" :disabled="!item.isEnabled">{{item.text}}</option>
      </select>
    </div>
    <div v-else class="sv_q_dropdown_control">{{isOtherSelected ? question.otherText : question.displayValue}}</div>
    <survey-other-choice v-show="isOtherSelected" :question="question"/>
  </div>
</template>

<script lang="ts">
import { default as Question } from "./question";

export default {
  mixins: [Question],
  computed: {
    value: {
      get() {
        return !this.question.isEmpty() ? this.question.renderedValue : "";
      },
      set(newVal: any) {
        this.question.renderedValue = newVal === "" ? undefined : newVal;
      }
    },
    isOtherSelected: {
      get() {
        const question = this.question;
        return question.hasOther && question.isOtherSelected;
      }
    }
  }
}
</script>
