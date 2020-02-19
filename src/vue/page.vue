<template>
  <div class="sv_page" :style="pageStyle">
    <div class="sv_page_title">{{title}}</div>
		<div class="sv_page_body" v-if="hasElements">
			<div class="sv_page_row" v-for="(element, index) in elements" :key="index">
				<component v-if="isGroup(element)" is="survey-group" :survey="survey" :group="element" />
				<component v-if="!isGroup(element) && element.isShownInPdf" is="survey-question" :question="element" />
			</div>
		</div>
		<div class="sv_page_empty" v-else>
			<span>There are no visible elements on this page.</span>
		</div>
  </div>
</template>

<script>
  import { Element } from "../core/element";
  import SurveyGroup from "./group.vue";
  import SurveyQuestion from "./question.vue";

  export default {
		name: "survey-page",
    components: {
      SurveyGroup,
      SurveyQuestion
    },
    props: {
      page: {
				type: Object,
				required: true
			}, 
      survey: {
				type: Object
			}
		},
		computed: {
			title() {
				return this.page.title || this.page.name;
			},
			elements() {
				return this.page ? this.page.getElements() : [];
			},
			hasElements() {
				return this.elements.length > 0;
			},
			pageStyle() {
				return !this.survey.singlePage ? "flex: 1 1 auto; overflow: scroll; max-height: 100%" : "";
			}
		},
    methods: {
			isGroup(element) {
				return Element.isGroup(element);
			}
    }
  }
</script>

<style>
	.sv_page .sv_page_title {
		font-weight: bold;
		font-size: 1.1rem;
		margin-bottom: .5rem;
	}
</style>
