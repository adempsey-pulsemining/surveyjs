<template>
  <div class="sv_q_checkbox">
    <b-form-checkbox-group v-model="question.value"
                           :options="question.choices"
                           value-field="name"
                           text-field="title">
    </b-form-checkbox-group>
  </div>
</template>

<script>
  import { BFormCheckboxGroup } from "bootstrap-vue/src/components/form-checkbox";

  export default {
    components: {
      BFormCheckboxGroup
    },
    props: {
      question: Object
    }
  }
</script>
