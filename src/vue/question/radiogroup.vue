<template>
  <div class="sv_q_radio">
    <div class="sv_q_radio_grid" :style="{ 'display': 'grid', 'grid-template-columns': 'repeat(' + question.colCount + ', 1fr' }">
      <label v-for="(item, index) in question.visibleChoices" :key="item.value" :class="getItemClass(item)">
        <input type="radio"
               :name="question.name + '_' + question.id"
               :value="item.value"
               :id="question.inputId + '_' + index"
               v-model="question.renderedValue"
               :disabled="question.isReadOnly || !item.isEnabled"
               v-bind:aria-label="item.locText.renderedHtml"
        />
        <span><survey-string :locString="item.locText"/></span>
        <survey-other-choice v-show="question.hasOther && question.isOtherSelected && index === choicesCount"
                             v-if="index == choicesCount"
                             :question="question">
        </survey-other-choice>
      </label>
    </div>
    <div v-if="question.showClearButton">
      <input type="button" class="sv_q_radiogroup_clear" v-on:click="function() { question.clearValue(); }" :value="question.clearButtonCaption">
    </div>
  </div>
</template>

<script lang="ts">
import { QuestionRadiogroupModel } from "../../question_radiogroup";

export default {
  props: {
    question: Object as () => QuestionRadiogroupModel
  },
  computed: {
    choicesCount() {
      return this.question.visibleChoices.length - 1;
    }
  },
  methods: {
    getItemClass(item: any) {
      var itemClass = "sv_q_radiogroup_item";
      return (item.value === this.question.renderedValue) ? itemClass + " checked" : itemClass;
    }
  }
}
</script>
