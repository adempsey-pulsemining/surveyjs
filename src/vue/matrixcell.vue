<template>
	<div class="sv-matrix-cell">
		<component :is="componentName" :question="cell" />
	</div>
</template>

<script>
	import SurveyDropdown from "./question-dropdown.vue";
	import SurveyText from "./question-text.vue";
	import SurveyBoolean from "./question-boolean.vue";
	import SurveyCheckbox from "./question-checkbox.vue";
	import SurveyComment from "./question-comment.vue";
	import SurveyRadio from "./question-radio.vue";

	export default {
		name: "matrix-cell",
		components: {
			SurveyDropdown, 
			SurveyText,
			SurveyBoolean,
			SurveyCheckbox,
			SurveyComment,
			SurveyRadio
		},
		props: {
			cell: {
				type: Object
			},
			question: {
				type: Object
			}
		},
		computed: {
			componentName() {
				return "survey-" + (this.cell.cellType || this.question.cellType);
			}
		}
	}
</script>
