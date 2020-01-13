<template>
  <div class="sv_table" :style="{ 'display': 'grid', 'grid-auto-rows': 'max-content' }">
    <div v-if="showHeader" class="sv_trow" :style="{ 'display': 'grid', 'grid-template-columns': 'repeat(' + getColumnsLength() + ', minmax(0, 1fr))' }">
      <div v-if="!isDynamic"></div>
      <div v-for="column in question.visibleColumns">
        <survey-string v-if="column.locTitle" :locString="column.locTitle" />
        <survey-string v-else :locString="column.locText" />
      </div>
      <div v-if="question.canRemoveRow"></div>
    </div>
    <div class="sv_trow" v-for="(row, rowIndex) in rows" :style="{ 'display': 'grid', 'grid-template-columns': 'repeat(' + getColumnsLength() + ', minmax(0, 1fr))' }">
      <div v-if="!isDynamic">
        <survey-string v-if="row.locText" :locString="row.locText" />
        <survey-string v-else :locString="row.locTitle" />
      </div>
      <survey-matrixcell v-if="!isMatrix" :question="question" :cell="cell" v-for="cell in row.cells" :key="rowIndex + '_' + cell.question.id" />
      <div v-if="isMatrix" v-for="(column, columnIndex) in question.visibleColumns">
        <input type="radio" :name="row.fullName" v-model="row.value" :value="column.value" :disabled="question.isReadOnly" :id="question.inputId + '_' + rowIndex + '_' + columnIndex" v-bind:aria-label="question.locTitle.renderedHtml"/>
      </div>
      <div v-if="canRemoveRow" class="sv_matrix_dynamic_button">
        <input type="button" @click="removeRowClick(row)" :value="question.removeRowText" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Question } from "../question";

export default {
  props: {
    question: Object as () => Question
  },
  computed: {
    rows() {
      return this.question.visibleRows;
    },
    showHeader() {
      return this.question.showHeader;
    },
    isDynamic() {
      return this.question.isRowsDynamic;
    },
    canRemoveRow() {
      return this.isDynamic && this.question.canRemoveRow;
    },
    isMatrix() {
      return this.question.getType() === "matrix";
    }
  },
  methods: {
    getCellsByColumn(columnIndex: number) {
      var res = [];
      var rows = this.rows;
      for (var i = 0; i < rows.length; i++) {
        res.push(rows[i].cells[columnIndex]);
      }
      return res;
    },
    removeRowClick(row: any) {
      var rows = this.question.visibleRows;
      var index = rows.indexOf(row);
      if (index > -1) {
        this.question.removeRowUI(index);
      }
    },
    getColumnsLength() {
      let length = this.question.visibleColumns.length;
      if (!this.isDynamic) {
        ++length;
      }
      if (this.question.canRemoveRow) {
        ++length;
      }
      return length;
    }
  }
}
</script>
