<template>
  <div role="alert" v-show="isShow" :class="classes">
    <div v-for="error in question.errors">
      <span class="panel-error-icon" aria-hidden="true"></span>
      <span class="panel-error-item">
        <survey-string :locString="error.locText"/>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Question } from "../question";
import { SurveyError } from "../base";

@Component
export class Errors extends Vue {
  @Prop() question: Question;
  @Prop() location: String;

  get isShow() {
    return !!this.question.errors && this.question.errors.length > 0
  }

  get classes() {
    let classes = "sv_q_erbox";
    if (this.location === "top") {
      classes += " sv_qstn_error_top";
    } else if (this.location === "bottom") {
      classes += " sv_qstn_error_bottom";
    }
    return classes;
  }
}
Vue.component("survey-errors", Errors);
export default Errors;
</script>
