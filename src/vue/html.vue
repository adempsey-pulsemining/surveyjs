<template>
  <div v-html="question.locHtml.renderedHtml" class="sv_q_html"></div>
</template>

<script lang="ts">
import { default as Question } from "./question"

export default {
  mixins: [Question]
}
</script>
