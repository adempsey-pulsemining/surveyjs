<template>
  <td :headers="cell.question.isVisible ? cell.column.locTitle.renderedHtml : ''">
    <survey-errors v-if="hasErrorsOnTop" :question="cell.question" :location="'top'"/>
    <component v-show="isVisible" :is="getWidgetComponentName(cell.question)" :question="cell.question"/>
    <survey-errors v-if="hasErrorsOnBottom" :question="cell.question" :location="'bottom'"/>
  </td>
</template>

<script lang="ts">
import { default as Question } from "./question";
import { Question as QuestionModel } from "../question"

export default {
  props: {
    cell: Object
  },
  mixins: [Question],
  data() {
    return {
      isVisible: <boolean>false,
    }
  },
  methods: {
    getWidgetComponentName(element: QuestionModel) {
      if (element.customWidget) {
        return "survey-customwidget";
      }
      return "survey-" + element.getType();
    },
    onVisibilityChanged() {
      this.isVisible = this.cell.question.isVisible;
    }
  },
  computed: {
    hasErrorsOnTop: {
      get() {
        return this.cell.question.survey.questionErrorLocation === "top";
      }
    },
    hasErrorsOnBottom: {
      get() {
        return this.cell.question.survey.questionErrorLocation === "bottom";
      }
    }
  },
  mounted(): void {
    if (!this.cell || !this.cell.question || !this.cell.question.survey) return;
    this.onVisibilityChanged();
    var self = this;
    this.cell.question.registerFunctionOnPropertyValueChanged("isVisible", function() {
      self.onVisibilityChanged();
    });
    var options = {
      cell: this.cell,
      cellQuestion: this.cell.question,
      htmlElement: this.$el,
      row: this.cell.row,
      column: this.cell.column
    };
    this.cell.question.survey.matrixAfterCellRender(this.cell.question, options);
  }
}
</script>
