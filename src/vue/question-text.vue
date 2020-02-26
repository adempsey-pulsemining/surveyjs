<template>
  <div class="sv_q_text">
    <b-form-input :type="question.inputType"
                  :placeholder="question.placeHolder"
                  v-model="question.value" lazy
                  v-if="!isReadMode"
                  :disabled="question.isReadOnly()">
    </b-form-input>
    <div class="text_display" v-else>{{question.value || question.placeHolder}}</div>
  </div>
</template>

<script>
	import { BFormInput } from "bootstrap-vue/src/components/form-input";
	import QuestionMixin from "./mixins/question";

  export default Vue.extend({
		mixins: [QuestionMixin],
		name: "survey-text",
    components: {
      BFormInput
		},
    computed: {
      isReadMode() {
        return this.question.survey && this.question.survey.isDisplayMode('read');
      }
    }
  })
</script>
