<template>
  <div class="sv_q" :class="{ 'page-break-before': question.pageBreakBefore, 'page-break-after': question.pageBreakAfter }">
    <b-modal ref="modal" hide-header no-fade>
      <b-form-textarea v-model="comment"></b-form-textarea>
      <div slot="modal-footer">
        <v-button variant="success" icon="check" @click="applyComment">Apply</v-button>
        <v-button variant="danger" icon="times" @click="closeModal">Close</v-button>
      </div>
    </b-modal>
    <div class="sv_q_header">
      <div class="sv_q_header_title">
        <span class="sv_q_no" v-if="showQuestionNo">{{questionNo}}</span>
        <span class="sv_q_title">{{questionTitle}}</span>
        <div class="flex"></div>
        <b-dropdown dropleft no-caret variant="link">
          <template v-slot:button-content>
            <font-awesome-icon icon="ellipsis-h" size="6x" />
          </template>
          <b-dropdown-item-button @click="editComment">
            <font-awesome-icon icon="edit" size="8x" /><span>Edit comment</span>
          </b-dropdown-item-button>
        </b-dropdown>
      </div>
      <div v-if="question.description" class="sv_q_description">{{question.description}}</div>
    </div>
    <div class="sv_q_body">
      <component v-if="question.isWidget" is="survey-widget" :question="question" />
      <component v-else :is="componentName" :question="question" />
    </div>
  </div>
</template>

<script>
  import SurveyText from "./question-text.vue";
  import SurveyBoolean from "./question-boolean.vue";
	import SurveyCheckbox from "./question-checkbox.vue";
	import SurveyRadio from "./question-radio.vue";
	import SurveyDropdown from "./question-dropdown.vue";
	import SurveyComment from "./question-comment.vue";
	import SurveyMultipletext from "./question-multipletext.vue";
	import SurveyHtml from "./question-html.vue";
	import SurveyMatrix from "./question-matrix.vue";
	import SurveyWidget from "./question-widget.vue";
	import { BDropdown, BDropdownItem, BDropdownItemButton } from "bootstrap-vue/src/components/dropdown";
	import VButton from "../components/v-button.vue";
	import { BFormTextarea } from "bootstrap-vue/src/components/form-textarea";
	import { BModal } from "bootstrap-vue/src/components/modal";

  export default {
		name: "survey-question",
    components: {
      SurveyText,
      SurveyBoolean,
			SurveyCheckbox,
			SurveyRadio,
			SurveyDropdown,
			SurveyComment,
			SurveyMultipletext,
			SurveyHtml,
			SurveyMatrix,
			SurveyWidget,
			BDropdown, BDropdownItem, BDropdownItemButton, BModal,
			VButton, BFormTextarea
    },
    props: {
      question: {
				type: Object
			}
		},
		data() {
			return {
				comment: ""
			}
		},
    computed: {
			questionTitle() {
				let title = "";
				return title + (this.question.title || this.question.name || "") + (this.question.required() ? " *" : "");
			},
      componentName() {
        return "survey-" + this.question.type;
			},
			showQuestionNo() {
				return this.question.survey.showQuestionNumbers
			},
			questionNo() {
				return this.question.no + ". ";
			}
		},
    methods: {
		  editComment() {
		    this.$refs["modal"].show();
      },
      applyComment() {
        this.question.comment = this.comment;
        this.$refs["modal"].hide();
      },
      closeModal() {
		    this.comment = this.question.comment;
        this.$refs["modal"].hide();
      }
    },
    mounted() {
		  this.comment = this.question.comment;
    }
  }
</script>

<style>
  .sv_q_header_title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .sv_q_header {
    display: flex;
    flex-direction: column;
    color: var(--darkest-text-color);
    font-weight: bold;
  }

	.dropdown button {
		padding-right: 0;
	}

	.sv_q_body {
		padding: 1rem 0;
	}

	.sv_q_no {
		margin-right: 5px;
	}

	.sv_q_description {
		font-size: 75%;
	}
</style>
