<template>
  <div class="sv_q_boolean">
    <b-form-checkbox v-model="question.value" :disabled="question.isReadOnly()" />
  </div>
</template>

<script>
  import { BFormCheckbox } from "bootstrap-vue/src/components/form-checkbox";
  import QuestionMixin from "./mixins/question";

  export default Vue.extend({
		mixins: [QuestionMixin],
		name: "survey-boolean",
    components: {
		  BFormCheckbox
    }
  });
</script>
