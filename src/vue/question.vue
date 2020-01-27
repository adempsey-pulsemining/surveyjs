<template>
  <div class="sv_q">
    <div class="sv_q_header">
      <span>{{questionTitle}}</span>
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

  export default {
		name: "survey-question",
    components: {
      SurveyText,
      SurveyBoolean,
			SurveyCheckbox,
			SurveyRadio,
			SurveyDropdown,
			SurveyComment
    },
    props: {
      question: {
				type: Object
			}
    },
    computed: {
			questionTitle() {
				return this.question.no + ". " + (this.question.title || this.question.name);
			},
      componentName() {
        return "survey-" + this.question.type;
      }
    }
  }
</script>
