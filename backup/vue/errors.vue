<template>
  <div role="alert" v-show="isShow" :class="classes">
    <div v-for="error in question.errors">
      <span class="panel-error-icon" aria-hidden="true"></span>
      <span class="panel-error-item"><survey-string :locString="error.locText"/></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Question } from "../question"

export default {
  props: {
    question: Object as () => Question,
    location: String
  },
  computed: {
    isShow() {
      return !!this.question.errors && this.question.errors.length > 0;
    },
    classes() {
      let classes = "sv_q_erbox";
      return (this.location === "top" || this.location === "bottom") ? classes + " sv_qstn_error_" + this.location : classes;
    }
  }
}
</script>
