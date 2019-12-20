<template>
  <div v-html="question.locHtml.renderedHtml" class="sv_q_html"></div>
</template>

<script lang="ts">
import { QuestionHtmlModel } from "../../question_html"

export default {
  props: {
    question: Object as () => QuestionHtmlModel
  }
}
</script>
