<template>
  <div class="form-group">
    <input v-if="!question.isReadOnly" type="text" class="sv_q_other" v-model="question.comment" :maxlength="question.getOthersMaxLength()" v-bind:aria-label="question.locTitle.renderedHtml"/>
    <div v-else class="sv_q_other">{{question.comment}}</div>
  </div>
</template>

<script lang="ts">
import { default as Question } from "./question";

export default {
  mixins: [Question]
}
</script>
