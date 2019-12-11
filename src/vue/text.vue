<template>
  <input :disabled="question.isReadOnly" class="sv_q_text_root" :type="question.inputType" :maxlength="question.getMaxLength()" :size="question.size" :id="question.inputId" :placeholder="question.placeHolder" :value="question.value" @change="change" v-bind:aria-label="question.locTitle.renderedHtml">
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionTextModel } from "../question_text";

@Component
export class SurveyText extends QuestionVue<QuestionTextModel> {
  change(event: any) {
    this.question.value = event.target.value;
  }
}
Vue.component("survey-text", SurveyText);
export default SurveyText;
</script>
