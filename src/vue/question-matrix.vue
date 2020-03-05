<template>
  <div class="sv_q_matrix">
		<div class="table-responsive">
			<table class="table">
				<thead>
				<tr>
					<th v-if="!question.dynamic"></th>
					<th v-for="(column, index) in question.columns" :key="index">{{getTitle(column, index)}}</th>
					<th v-if="question.dynamic && !question.isReadOnly()"></th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(row, rowIndex) in question.rows" :key="rowIndex">
					<td v-if="!question.dynamic">{{getTitle(row,rowIndex)}}</td>
					<td v-for="(column, colIndex) in question.columns" :key="rowIndex + ',' + colIndex">
						<b-form-radio v-if="!question.multipleChoice && !question.dynamic" v-model="row.value" :value="column.name" :disabled="question.isReadOnly()" />
						<matrix-cell v-if="question.multipleChoice || question.dynamic" :cell="question.getCell(rowIndex, colIndex)" :question="question" :key="rowIndex + ',' + colIndex + ',' + cellKey" />
					</td>
					<td v-if="question.dynamic && !question.isReadOnly()">
						<v-button class="sv_remove_row_btn" variant="primary" @click="removeRow(rowIndex)">
							<span>Remove Row</span>
						</v-button>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
		<v-button class="sv_add_row_btn" v-if="question.dynamic && !question.isReadOnly()" variant="primary" @click="addRow">
			<span>Add Row</span>
		</v-button>
  </div>
</template>

<script>
	import QuestionMixin from "./mixins/question";
	import { BTable } from "bootstrap-vue/src/components/table";
	import { BFormRadio } from "bootstrap-vue/src/components/form-radio";
	import MatrixCell from "./matrixcell.vue";
	import VButton from "../components/v-button";

  export default Vue.extend({
		mixins: [QuestionMixin],
		name: "survey-matrix",
		data() {
			return {
				cellKey: 0
			}
		},
		components: {
			VButton,
			BTable, BFormRadio,
			MatrixCell
		},
		methods: {
			addRow() {
				this.question.addRow();
			},
			removeRow(rowIndex) {
				this.question.removeRow(rowIndex);
				++this.cellKey;
			},
			getTitle(obj, index) {
				return this.question.getSequenceCharacter(index).toUpperCase() + ". " + (obj.title || obj.name);
			}
		}
  });
</script>

<style>
	.sv_q_matrix .sv_add_row_btn {
		margin-top: 10px;
	}

	.sv_q_matrix > div.table-responsive {
		margin-bottom: 0;
	}

	.sv_q_matrix .table td,
	.sv_q_matrix .table th {
		vertical-align: middle;
		padding: .75rem;
		white-space: nowrap;
	}

	.sv_q_matrix .table td input[type="text"],
	.sv_q_matrix .table td select {
		min-width: 200px;
	}

	.sv_q_matrix .table th {
		border-top: none;
		font-weight: normal;
	}

	.sv_q_matrix .table {
		border: thin solid lightgrey;
	}

	.sv_q_matrix tr td:first-child {
		max-width: 100%;
	}
</style>
