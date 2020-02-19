<template>
  <div class="sv_group">
    <div class="sv_group_title">{{title}}</div>
		<div class="sv_group_body">
			<component v-for="(question, index) in questions" :is="componentName" :question="question" :key="index"></component>
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
		computed: {
			componentName() {
				return QuestionVue.name;
			},
			title() {
				return this.group.title || this.group.name;
			},
			questions() {
				return this.group.elements;
			}
		}
  }
</script>

<style>
	.sv_group_title {
		font-weight: bold;
		margin: .5rem 0;
	}
</style>
