<template>
  <div class="sv_matrix_cell" :headers="cell.question.isVisible ? cell.column.locTitle.renderedHtml : ''">
    <survey-errors v-if="hasErrorsOnTop" :question="cell.question" :location="'top'"/>
    <component v-show="isVisible" :is="getWidgetComponentName(cell.question)" :question="cell.question" />
    <survey-errors v-if="hasErrorsOnBottom" :question="cell.question" :location="'bottom'"/>
  </div>
</template>

<script lang="ts">
import { Question as QuestionModel } from "../question"

export default {
  props: {
    cell: Object,
    question: Object as () => QuestionModel
  },
  data() {
    return {
      isVisible: <boolean>false,
    }
  },
  methods: {
    getWidgetComponentName(element: QuestionModel) {
      return element.customWidget ? "survey-customwidget" : "survey-" + element.getType();
    },
    onVisibilityChanged() {
      this.isVisible = this.cell.question.isVisible;
    }
  },
  computed: {
    hasErrorsOnTop() {
      return this.cell.question.survey.questionErrorLocation === "top";
    },
    hasErrorsOnBottom() {
      return this.cell.question.survey.questionErrorLocation === "bottom";
    }
  },
  mounted(): void {
    if (!this.cell || !this.cell.question || !this.cell.question.survey) return;
    this.onVisibilityChanged();
    this.cell.question.registerFunctionOnPropertyValueChanged("isVisible", () => {
      this.onVisibilityChanged();
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
