<template>
  <div class="sv_q_empty"></div>
</template>

<script lang="ts">
import { QuestionEmptyModel } from '../../question_empty'

export default {
  props: {
    question: Object as () => QuestionEmptyModel
  }
}
</script>
