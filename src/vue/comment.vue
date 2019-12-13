<template>
  <div class="sv_q_comment">
    <textarea v-bind:aria-label="question.locTitle.renderedHtml"
              v-model="question.value"
              :readonly="question.isReadOnly"
              :id="question.inputId"
              :maxlength="question.getMaxLength()"
              :cols="question.cols"
              :rows="question.rows"
              :placeholder="question.placeHolder"
              class="panel-comment-root"></textarea>
  </div>
</template>

<script lang="ts">
import { default as Question } from "./question";

export default {
  mixins: [Question]
}
</script>

<style scoped>
  textarea {
    width: 100%;
  }
</style>
