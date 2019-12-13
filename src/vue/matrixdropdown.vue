<template>
  <div :style="{overflowX: question.horizontalScroll? 'scroll': ''}">
    <survey-matrixtable :question="question" />
  </div>
</template>

<script lang="ts">
import { default as Question } from "./question";

export default {
  mixins: [Question]
}
</script>
