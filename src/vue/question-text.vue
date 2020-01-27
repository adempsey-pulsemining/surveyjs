<template>
  <div class="sv_q_text">
    <b-form-input :type="question.inputType"
                  :placeholder="question.placeHolder"
                  v-model.lazy="question.value"
                  :disabled="question.isReadOnly()">
    </b-form-input>
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
    }
  })
</script>
