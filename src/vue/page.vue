<template>
  <div class="sv_page">
    <div class="sv_page_title">{{title}}</div>
		<div class="sv_page_body" v-if="hasElements">
			<div class="sv_page_row" v-for="(element, index) in visibleElements" :key="survey.currentPageIndex + '_' + index">
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
			visibleElements() {
				return this.page ? this.page.visibleElements : [];
			},
			hasElements() {
				return this.elements.length > 0;
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
		font-size: 1.2rem;
		padding: 1rem;
		padding-bottom: 0;
	}

	.sv_page_row:nth-child(even) {
		background-color: #f4f4f4;
	}

	.sv_page_row {
		padding: .5rem 1rem;
		border-bottom: thin solid lightgrey;
	}

	.sv_page_row:last-of-type {
		border-bottom: none;
	}

	.sv_page_empty {
		padding: .5rem 1rem;
		padding-bottom: 2rem;
	}

	.sv_page:last-of-type .sv_page_row:last-of-type {
		padding-bottom: 2rem;
	}
</style>
