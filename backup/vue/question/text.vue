<template>
  <input :disabled="question.isReadOnly"
         class="sv_q_text"
         :type="question.inputType"
         :maxlength="question.getMaxLength()"
         :size="question.size"
         :id="question.inputId"
         :placeholder="question.placeHolder"
         :value="question.value"
         @change="change"
         v-bind:aria-label="question.locTitle.renderedHtml"
  />
</template>

<script lang="ts">
import { QuestionTextModel } from "../../question_text";

export default {
  props: {
    question: Object as () => QuestionTextModel
  },
  methods: {
    change(event: any) {
      this.question.value = event.target.value
    }
  }
}
</script>
