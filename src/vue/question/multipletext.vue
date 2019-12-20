<template>
  <pms-grid-layout class="sv_q_multipletext">
    <div v-for="(item, index) in question.items" class="sv_q_multipletext_item" :key="question.inputId + '_' + index">
      <survey-string :locString="item.locTitle" />
      <div :key="item.editor.id">
        <survey-errors :question="item.editor" />
        <component :is="getWidgetComponentName(item.editor)" :question="item.editor" />
      </div>
    </div>
  </pms-grid-layout>
</template>

<script lang="ts">
import { QuestionMultipleTextModel } from "../../question_multipletext";

export default {
  props: {
    question: Object as () => QuestionMultipleTextModel
  },
  methods: {
    getWidgetComponentName(question: QuestionMultipleTextModel) {
      return question.customWidget ? "survey-customwidget" : "survey-text";
    }
  }
}
</script>
