<template>
  <div class="sv_q_expression">{{question.displayValue}}</div>
</template>

<script lang="ts">
import { QuestionExpressionModel } from '../../question_expression'

export default {
  props: {
    question: Object as () => QuestionExpressionModel
  }
}
</script>
