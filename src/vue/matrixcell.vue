<template>
	<div class="sv-matrix-cell">
		<component :is="componentName" :question="cell" />
	</div>
</template>

<script>
	import SurveyDropdown from "./question-dropdown.vue";

	export default {
		name: "matrix-cell",
		components: {
			SurveyDropdown
		},
		props: {
			cell: {
				type: Object
			},
		},
		computed: {
			componentName() {
				return "survey-" + this.cell.type;
			}
		}
	}
</script>