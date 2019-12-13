<template>
  <div class="sv_q_text_root">{{question.displayValue}}</div>
</template>

<script lang="ts">
import { default as Question } from './question'

export default {
  mixins: [Question]
}
</script>
