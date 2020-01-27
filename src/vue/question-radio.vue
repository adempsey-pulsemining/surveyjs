<template>
  <div class="sv_q_radio">
    <b-form-radio-group v-model="question.value"
                           :options="choices"
													 :stacked="!question.inline"
													 value-field="name"
													 text-field="title"
													 :disabled="question.isReadOnly()">
    </b-form-radio-group>
  </div>
</template>

<script>
	import { BFormRadioGroup } from "bootstrap-vue/src/components/form-radio";
	import QuestionMixin from "./mixins/question";

  export default Vue.extend({
		mixins: [QuestionMixin],
		name: "survey-radio",
    components: {
      BFormRadioGroup
    }
  })
</script>
