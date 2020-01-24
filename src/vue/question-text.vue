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

  export default {
    components: {
      "b-form-input": BFormInput
    },
    props: {
      question: Object
    }
  }
</script>
