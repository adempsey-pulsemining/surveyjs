<template>
  <div class="sv_page" :class="{ 'page_break_before': pageBreak }">
		<b-modal ref="modal" hide-header no-fade>
			<div>You can't undo this action. Are you sure?</div>
			<div slot="modal-footer">
				<v-button variant="success" icon="check" @click="clearSurvey">Yes</v-button>
				<v-button variant="danger" icon="times" @click="closeModal">No</v-button>
			</div>
		</b-modal>
    <div class="sv_page_title">
			<div>{{title}}</div>
			<div class="flex"></div>
			<b-dropdown v-if="!survey.isPdfRender && !survey.readOnly" dropleft no-caret variant="link">
				<template v-slot:button-content>
					<font-awesome-icon icon="cog" size="6x" />
				</template>
				<b-dropdown-item-button @click="showModal">
					<span>Clear unsaved data</span>
				</b-dropdown-item-button>
			</b-dropdown>
		</div>
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
	import { BDropdown, BDropdownItem, BDropdownItemButton } from "bootstrap-vue/src/components/dropdown";
	import { BModal } from "bootstrap-vue/src/components/modal";
	import VButton from "../components/v-button.vue";

  export default {
		name: "survey-page",
    components: {
      SurveyGroup,
      SurveyQuestion,
			BDropdown, BDropdownItem, BDropdownItemButton,
			BModal,
			VButton
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
			},
			pageBreak() {
				return this.survey.visiblePages.indexOf(this.page) > 0;
			}
		},
    methods: {
			isGroup(element) {
				return Element.isGroup(element);
			},
			clearSurvey() {
				this.survey.clear();
				this.$refs["modal"].hide();
			},
			closeModal() {
				this.$refs["modal"].hide();
			},
			showModal() {
				this.$refs["modal"].show();
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
		display: flex;
		flex-direction: row;
		align-items: center;
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
