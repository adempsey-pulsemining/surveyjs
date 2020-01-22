<template>
  <div class="sv_q_multipletext" :style="{ 'display': 'grid', 'grid-template-columns': 'repeat(auto-fit, minmax(200px, 1fr))' }">
    <div v-for="(item, index) in question.items" class="sv_q_multipletext_item" :key="question.inputId + '_' + index">
      <survey-string :locString="item.locTitle" />
      <div :key="item.editor.id">
        <survey-errors :question="item.editor" />
        <component :is="getWidgetComponentName(item.editor)" :question="item.editor" />
      </div>
    </div>
  </div>
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
