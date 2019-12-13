<template>
  <div class="sv_q_boolean">
    <label :class="itemClass">
      <input v-model="question.checkedValue"
             v-bind:aria-label="question.locTitle.renderedHtml"
             type="checkbox"
             :name="question.name"
             :value="question.checkedValue"
             :id="question.inputId"
             :indeterminate.prop="question.isIndeterminate"
             :disabled="question.isReadOnly"/>
      <span class="checkbox-material"><span class="check"></span></span>
      <span><survey-string :locString="question.locDisplayLabel"/></span>
    </label>
  </div>
</template>

<script lang="ts">
import { default as Question } from "./question";

export default {
  mixins: [Question],
  computed: {
    itemClass: {
      get() {
        return "sv_q_checkbox" + (this.question.checkedValue ? " checked" : "");
      }
    }
  }
}
</script>
