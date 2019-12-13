<template>
  <table class="sv_q_multipletext">
    <tr v-for="(row, rowindex) in question.getRows()" :key="question.inputId + 'rowkey' + rowindex" class="sv_q_mt_row">
      <template v-for="item in row">
        <td :key="'label' + item.editor.id" class="sv_q_mt_title"><survey-string :locString="item.locTitle"/></td>
        <td :key="item.editor.id">
          <survey-errors :question="item.editor" />
          <component :is="getWidgetComponentName(item.editor)" :question="item.editor" />
        </td>
      </template>
    </tr>
  </table>
</template>

<script lang="ts">
import { default as Question } from "./question";
import { Question as QuestionModel } from "../question";

export default {
  mixins: [Question],
  methods: {
    getWidgetComponentName(question: QuestionModel) {
      if (question.customWidget) {
        return "survey-customwidget";
      }
      return "survey-text";
    }
  }
}
</script>
