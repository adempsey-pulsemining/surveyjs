<template>
  <div class="sv_q_dropdown">
    <b-form-select v-model="question.value"
									 v-if="!isReadMode"
									 value-field="name"
									 text-field="title"
									 :disabled="question.isReadOnly()"
									 :options="choices">
			<template v-slot:first>
        <b-form-select-option value="" disabled>-- Please select an option --</b-form-select-option>
      </template>
		</b-form-select>
		<div class="text_display" v-else>{{question.value}}</div>
  </div>
</template>

<script>
	import { BFormSelect, BFormSelectOption } from "bootstrap-vue/src/components/form-select";
	import QuestionMixin from "./mixins/question";

  export default Vue.extend({
		mixins: [QuestionMixin],
		name: "survey-dropdown",
    components: {
			BFormSelect, 
			BFormSelectOption
    },
		computed: {
			isReadMode() {
				return this.question.survey && this.question.survey.isDisplayMode('read');
			}
		}
  })
</script>
