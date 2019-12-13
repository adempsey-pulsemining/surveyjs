<template>
  <fieldset class="sv_qcbc">
    <legend v-bind:aria-label="question.locTitle.renderedHtml"></legend>
    <div v-for="(item, index) in question.visibleChoices" :key="item.value" :class="getItemClass(item)">
      <label class="sv_q_radiogroup_label">
        <input type="radio" :name="question.name + '_' + question.id" :value="item.value" :id="question.inputId + '_' + index" v-model="question.renderedValue" :disabled="question.isReadOnly || !item.isEnabled" v-bind:aria-label="item.locText.renderedHtml" class="sv_q_radiogroup_control_item">
        <span class="circle"></span>
        <span class="check"></span>
        <span>
          <survey-string :locString="item.locText"/>
        </span>
        <survey-other-choice v-show="question.hasOther && question.isOtherSelected && index === choicesCount" v-if="index == choicesCount" :question="question"/>
      </label>
    </div>
    <div v-if="question.showClearButton">
      <input type="button" class="sv_q_radiogroup_clear" v-on:click="function() { question.clearValue(); }" :value="question.clearButtonCaption">
    </div>
  </fieldset>
</template>

<script lang="ts">
import { default as Question } from "./question";

export default {
  mixins: [Question],
  computed: {
    choicesCount: {
      get() {
        return this.question.visibleChoices.length - 1;
      }
    }
  },
  methods: {
    getItemClass(item: any) {
      var itemClass = "sv_q_radiogroup" + (this.question.colCount === 0 ? " sv_q_radiogroup_inline" : " sv-q-col-" + this.question.colCount);
      if (item.value === this.question.renderedValue) itemClass += " checked";
      return itemClass;
    }
  }
}
</script>
