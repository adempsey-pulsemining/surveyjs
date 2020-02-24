<template>
  <div class="sv_group">
    <div class="sv_group_title" :style="{ 'color': group.titleColour }">{{title}}</div>
		<div class="sv_group_body" :style="getStyle(group.inline)">
			<component v-for="(question, index) in visibleQuestions" :is="componentName" :question="question" :key="index"></component>
		</div>
  </div>
</template>

<script>
  import QuestionVue from "./question.vue";

  export default {
		name: "survey-group",
    components: {
      "survey-question": QuestionVue
    },
    props: {
      survey: {
				type: Object
			},
      group: {
				type: Object,
				required: true
			}
		},
		methods: {
			getStyle(inline) {
				let cols = inline ? "auto-fit" : 1;
				return `display: grid; grid-template-columns: repeat(${cols}, minmax(200px, 1fr))`;
			}
		},
		computed: {
			componentName() {
				return QuestionVue.name;
			},
			title() {
				return this.group.title || this.group.name;
			},
			questions() {
				return this.group.elements;
			},
      visibleQuestions() {
			  return this.group.visibleElements;
      }
		}
  }
</script>

<style>
	.sv_group_title {
		font-weight: bold;
		margin: .5rem 0;
	}

	.sv_group_body {
		grid-column-gap: .75rem;
	}
</style>
