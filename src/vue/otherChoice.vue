<template>
  <div class="sv_q_other">
    <input v-if="!question.isReadOnly"
           type="text"
           v-model="question.comment"
           :maxlength="question.getOthersMaxLength()"
           v-bind:aria-label="question.locTitle.renderedHtml"
    />
    <div v-else>{{question.comment}}</div>
  </div>
</template>

<script lang="ts">
import { Question } from "../question";

export default {
  props: {
    question: Object as () => Question
  }
}
</script>
