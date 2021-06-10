<template>
  <div class="sv_q_expression">
    <b-form-input type="text"
                  v-model="question.value"
                  readonly>
    </b-form-input>
  </div>
</template>

<script>
  import QuestionMixin from "./mixins/question";
  import { BFormInput } from "bootstrap-vue/src/components/form-input";

  export default Vue.extend({
    mixins: [QuestionMixin],
    name: "survey-expression",
    components: {
      BFormInput
    },
  })
</script>
