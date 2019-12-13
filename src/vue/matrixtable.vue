<template>
  <table class="sv_q_matrix">
    <thead v-if="showHeader">
      <tr>
        <td v-if="!isDynamic"></td>
        <th v-for="column in question.visibleColumns" :style="{ minWidth: question.getColumnWidth(column) }">
          <survey-string :locString="column.locTitle"/>
        </th>
        <td v-if="question.canRemoveRow"></td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="question.inputId + '_' + rowIndex">
        <td v-if="!isDynamic">
          <survey-string :locString="row.locText"/>
        </td>
        <survey-matrixcell :question="question" :cell="cell" v-for="cell in row.cells" :key="rowIndex + '_' + cell.question.id"/>
        <td v-if="canRemoveRow">
          <button type="button" class="sv_matrix_dynamic_button" @click="removeRowClick(row)">
            <span>{{question.removeRowText}}</span>
            <span></span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { default as Question } from "./question";

export default {
  mixins: [Question],
  computed: {
    matrixDynamic: {
      get() {
        return this.question;
      }
    },
    rows: {
      get() {
        return this.question.visibleRows;
      }
    },
    showHeader: {
      get() {
        return this.question.showHeader;
      }
    },
    isDynamic: {
      get() {
        return this.question.isRowsDynamic;
      }
    },
    canRemoveRow: {
      get() {
        return this.isDynamic && this.matrixDynamic.canRemoveRow;
      }
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
        this.matrixDynamic.removeRowUI(index);
      }
    }
  }
}
</script>
