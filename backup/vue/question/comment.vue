<template>
  <div class="sv_q_comment">
    <textarea v-bind:aria-label="question.locTitle.renderedHtml"
              v-model="question.value"
              :readonly="question.isReadOnly"
              :id="question.inputId"
              :maxlength="question.getMaxLength()"
              :cols="question.cols"
              :rows="question.rows"
              :placeholder="question.placeHolder">
    </textarea>
  </div>
</template>

<script lang="ts">
import { QuestionCommentModel } from "../../question_comment";

export default {
  props: {
    question: Object as () => QuestionCommentModel
  }
}
</script>
