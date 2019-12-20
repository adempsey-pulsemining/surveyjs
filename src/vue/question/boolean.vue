<template>
  <div class="sv_q_boolean">
    <label :class="itemClass">
      <input type="checkbox"
             v-model="question.checkedValue"
             v-bind:aria-label="question.locTitle.renderedHtml"
             :name="question.name"
             :value="question.checkedValue"
             :id="question.inputId"
             :indeterminate.prop="question.isIndeterminate"
             :disabled="question.isReadOnly"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { QuestionBooleanModel } from "../../question_boolean";

export default {
  props: {
    question: Object as () => QuestionBooleanModel,
  },
  computed: {
    itemClass() {
      return "sv_q_boolean_label" + (this.question.checkedValue ? " checked" : "");
    }
  }
}
</script>
