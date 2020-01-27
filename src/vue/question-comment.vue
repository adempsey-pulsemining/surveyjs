<template>
  <div class="sv_q_comment">
    <b-form-textarea v-model="question.value"
		                 :disabled="question.isReadOnly()">
		</b-form-textarea>
  </div>
</template>

<script>
	import { BFormTextarea } from "bootstrap-vue/src/components/form-textarea";
	import QuestionMixin from "./mixins/question";

  export default Vue.extend({
		mixins: [QuestionMixin],
		name: "survey-comment",
    components: {
      BFormTextarea
    }
  })
</script>
