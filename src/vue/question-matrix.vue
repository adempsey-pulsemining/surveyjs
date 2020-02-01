<template>
  <div class="sv_q_matrix table-responsive">
    <table class="table">
			<thead>
				<tr>
					<th></th>
					<th v-for="(column, index) in question.columns" :key="index">{{column.title}}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, rowIndex) in question.rows" :key="rowIndex">
					<td>{{row.title}}</td>
					<td v-for="(column, colIndex) in question.columns" :key="colIndex">
						<b-form-radio v-if="!question.multipleChoice" v-model="row.value" :value="column.name" />
						<matrix-cell v-else :cell="question.getCell(rowIndex, colIndex)" />
					</td>
				</tr>
			</tbody>
    </table>
  </div>
</template>

<script>
	import QuestionMixin from "./mixins/question";
	import { BTable } from "bootstrap-vue/src/components/table";
	import { BFormRadio } from "bootstrap-vue/src/components/form-radio";
	import MatrixCell from "./matrixcell.vue";

  export default Vue.extend({
		mixins: [QuestionMixin],
		name: "survey-multipletext",
		components: {
			BTable, BFormRadio,
			MatrixCell
		}
  });
</script>

<style>
	.sv_q_matrix .table td,
	.sv_q_matrix .table th {
		vertical-align: middle;
		padding: 0;
	}

	.sv_q_matrix .table th {
		border-top: none;
	}

	.sv_q_matrix .table tbody tr td:first-child {
		font-weight: bold;
	}
</style>