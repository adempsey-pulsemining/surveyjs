<template>
  <div class="sv_q" :id="question.elementId" :class="{ 'page_break_before': question.pageBreakBefore, 'page_break_after': pageBreakAfter }">
    <b-modal ref="modal" hide-header no-fade>
      <b-form-textarea v-model="comment" :disabled="!canEditComment"></b-form-textarea>
      <div slot="modal-footer">
        <v-button v-if="canEditComment" variant="success" icon="check" @click="applyComment">Apply</v-button>
        <v-button variant="danger" icon="times" @click="closeModal">Close</v-button>
      </div>
    </b-modal>
    <div v-if="question.type !== 'html'" class="sv_q_header">
      <div class="sv_q_header_title" :style="{ color: question.titleColour }">
<!--        <span class="sv_q_no" v-if="showQuestionNo">{{questionNo}}</span>-->
        <span class="sv_q_title">{{questionTitle}}</span>
        <div class="flex"></div>
        <b-dropdown v-if="!isPdfRender" dropleft no-caret variant="link">
          <template v-slot:button-content>
            <font-awesome-icon icon="ellipsis-h" size="6x" />
          </template>
          <b-dropdown-item-button @click="editComment">
            <span>Edit comment</span>
          </b-dropdown-item-button>
          <div v-for="option in options">
            <b-dropdown-item-button @click="fireOption(option)">
              <span>{{option.title}}</span>
            </b-dropdown-item-button>
          </div>
        </b-dropdown>
      </div>
      <div v-if="question.description" class="sv_q_description">{{question.description}}</div>
    </div>
    <div class="sv_q_error" v-if="showError">
      <div v-for="error in question.errors"><font-awesome-icon icon="exclamation-triangle" size="8x" style="margin-right:5px;" />{{error}}</div>
    </div>
    <div class="sv_q_body">
      <component v-if="question.isWidget" is="survey-widget" :question="question" />
      <component v-else :is="componentName" :question="question" />
    </div>
    <b-form-textarea v-if="isPdfRender && question.comment" class="sv_q_comment" v-model="question.comment"></b-form-textarea>
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
				comment: "",
				alphabet: "abcdefghijklmnopqrstuvwxyz"
			}
		},
    computed: {
		  showError() {
        return this.question.hasErrors && this.question.showErrors;
      },
		  pageBreakAfter() {
		    return this.question.pageBreakAfter;
      },
		  canEditComment() {
        return this.question.survey && !this.question.survey.readOnly && !this.question.survey.isDisplayMode('read');
      },
			questionTitle() {
				let title = "";
				title = title + (this.question.title || this.question.name || "") + (this.question.required() ? " *" : "");
				return this.showQuestionNo ? this.questionNo + title : title;
			},
      componentName() {
        return "survey-" + this.question.type;
			},
			showQuestionNo() {
				return this.question.survey.showQuestionNumbers
			},
			questionNo() {
				if (this.question.group) {
					return this.question.group.no + this.alphabet.charAt(this.question.group.elements.filter(q => q.type !== 'html').indexOf(this.question)) + ". ";
				}
				return this.question.elementNo + ". ";
			},
      isPdfRender() {
			  return this.question.survey && this.question.survey.isPdfRender;
      },
      options() {
		    return Survey.Question.options;
      }
		},
    methods: {
		  editComment() {
        this.comment = this.question.comment;
        this.$refs["modal"].show();
      },
      applyComment() {
        this.question.comment = this.comment;
        this.$refs["modal"].hide();
      },
      closeModal() {
		    this.comment = this.question.comment;
        this.$refs["modal"].hide();
      },
      fireOption(option) {
		    option.callback(this.question);
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
    align-items: start;
    padding-top: .5rem;
  }

  .sv_q_header_title .dropdown-toggle {
    padding: 0;
    padding-left: .5rem;
  }

  .sv_q_header {
    display: flex;
    flex-direction: column;
    color: var(--darkest-text-color);
    font-weight: bold;
  }

	.sv_q_body {
		padding: 1rem 0;
    overflow-x: scroll;
	}

	.sv_q_no {
		margin-right: 5px;
	}

	.sv_q_description {
		font-size: 75%;
	}

  .sv_q_error > div {
    display: flex;
    align-items: center;
    padding: .75rem;
    border: thin solid red;
    color: white;
    margin-top: .75rem;
    border-radius: .25rem;
    background-color: #F44336
  }
</style>
