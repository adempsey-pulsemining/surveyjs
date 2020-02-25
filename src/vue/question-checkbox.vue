<template>
  <div class="sv_q_checkbox">
    <b-form-checkbox-group v-model="value"
                           :options="choices"
                           value-field="name"
													 text-field="title"
													 :stacked="!question.inline"
													 :disabled="question.isReadOnly()">
    </b-form-checkbox-group>
  </div>
</template>

<script>
	import { BFormCheckboxGroup } from "bootstrap-vue/src/components/form-checkbox";
	import QuestionMixin from "./mixins/question";

  export default Vue.extend({
		mixins: [QuestionMixin],
		name: "survey-checkbox",
    components: {
      BFormCheckboxGroup
    },
    computed: {
		  value: {
        set(val) { this.question.value = val || [] },
        get() { return this.question.value || [] }
      }
    }
  })
</script>
