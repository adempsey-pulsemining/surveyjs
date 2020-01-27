<template>
  <div class="sv_q">
		<v-modal v-if="showModal">
			<div slot="body">
				<b-form-textarea v-model="question.comment" lazy></b-form-textarea>
			</div>
			<div slot="footer">
				<v-button icon="times" @click="hideModal()">Close</v-button>
			</div>
		</v-modal>
    <div class="sv_q_header">
      <span>{{questionTitle}}</span>
			<div class="flex"></div>
			<b-dropdown size="sm" variant="link" no-caret dropleft>
				<template v-slot:button-content>
					<font-awesome-icon icon="ellipsis-h" size="8x"></font-awesome-icon>
				</template>
				<b-dropdown-item v-for="(item, index) in actions" :key="index" @click="item.handler">
					<div class="sv_dropdown-item">
						<font-awesome-icon icon="edit" size="8x"></font-awesome-icon><span>{{item.description}}</span>
					</div>
				</b-dropdown-item>
			</b-dropdown>
    </div>
    <div class="sv_q_body">
      <component :is="componentName" :question="question" />
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
	import { BDropdown, BDropdownItem } from "bootstrap-vue/src/components/dropdown";
	import VButton from "../components/v-button.vue";
	import VModal from "../components/v-modal.vue";
	import { BFormTextarea } from "bootstrap-vue/src/components/form-textarea";

  export default {
		name: "survey-question",
    components: {
      SurveyText,
      SurveyBoolean,
			SurveyCheckbox,
			SurveyRadio,
			SurveyDropdown,
			SurveyComment,
			BDropdown, BDropdownItem,
			VButton, VModal, BFormTextarea
    },
    props: {
      question: {
				type: Object
			}
		},
		data() {
			return {
				showModal: false,
			}
		},
    computed: {
			actions() {
				return [
					{ handler: () => this.openModal(), description: "Edit comment" }
				]
			},
			questionTitle() {
				let title = "";
				if (this.question.survey.showQuestionNumbers) {
					title = this.question.no + ". ";
				}
				return title + (this.question.title || this.question.name);
			},
      componentName() {
        return "survey-" + this.question.type;
      }
		},
		methods: {
			toggleModal() {
				this.showModal = !this.showModal;
			},
			openModal() {
				this.showModal = true;
			},
			hideModal() {
				this.showModal = false;
			}
		}
  }
</script>