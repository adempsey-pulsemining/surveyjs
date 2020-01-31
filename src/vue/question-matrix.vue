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
				<tr v-for="(row, index) in question.rows" :key="index">
					<td>{{row.title}}</td>
					<td v-for="(column, index) in question.columns" :key="index">
						<b-form-radio v-model="row.value" :value="column.name" />
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

  export default Vue.extend({
		mixins: [QuestionMixin],
		name: "survey-multipletext",
		components: {
			BTable, BFormRadio
		}
  });
</script>