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

export default {
  props: {
    question: null,
    location: null
  },
  computed: {
    isShow: {
      get() {
        return !!this.question.errors && this.question.errors.length > 0;
      }
    },
    classes: {
      get() {
        let classes = "sv_q_erbox";
        if (this.location === "top") {
          classes += " sv_qstn_error_top";
        } else if (this.location === "bottom") {
          classes += " sv_qstn_error_bottom";
        }
        return classes;
      }
    }
  }
}
</script>
